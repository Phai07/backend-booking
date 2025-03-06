import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async ({ name, email, password, phone }) => {
    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
        throw new Error("User already exists");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid email");
    }
    // Check if password is strong
    if (password.length < 8) {
        throw new Error("PPlease enter a strong password with more than 8 characters");
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new userModel({
        name,
        email,
        password: hashedPassword,
        phone,
    });
    await user.save();
    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new Error("User doesn't exist");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = createToken(user._id);
    return { user, token };
};

export { registerUser, loginUser };