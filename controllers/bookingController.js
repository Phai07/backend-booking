import { getBookings, createBooking } from "../services/bookingService.js";

const bookingsController = async (req, res) => {
    try {
        const bookings = await getBookings();
        res.send(bookings);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const createBookingController = async (req, res) => {
    const { userId ,checkIn, checkOut, name, phone, email } = req.body;
    try {
        const result = await createBooking({ userId, checkIn, checkOut, name, phone, email });
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
};
export { bookingsController, createBookingController };