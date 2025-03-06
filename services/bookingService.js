import bookingModel from './../model/bookingModel.js';
import validator from 'validator';


const getBookings = async () => {
    try {
        const bookings = await bookingModel.find();
        return bookings;
    } catch (err) {
        throw new Error('Error fetching bookings');
    }
};

const createBooking = async (bookingData) => {
    try {
        const { userId, checkIn, checkOut, name, phone, email } = bookingData;

        if (!validator.isEmail(email)) {
            throw new Error('Please enter a valid email');
        }

        
        const overlappingBookings = await bookingModel.find({
            $and: [
                { checkIn: { $lt: checkOut } },
                { checkOut: { $gt: checkIn } }
            ]
        });

        if (overlappingBookings.length > 0) {
            throw new Error('Booking already exists');
        }

        
        const newBooking = new bookingModel({
            userId,
            checkIn,
            checkOut,
            name,
            phone,
            email,
        });
        await newBooking.save();
        return { message: 'Booking created successfully' };
    } catch (err) {
        throw new Error(`Error creating booking: ${err.message}`);
    }
};

export { getBookings, createBooking };