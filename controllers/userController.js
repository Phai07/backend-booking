import { registerUser, loginUser } from "../services/userService.js";

const registerUserController = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const user = await registerUser({ name, email, password, phone });
        res.json({ success: true, user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser({ email, password });
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { registerUserController, loginController };