import { verifyAdmin,verifyUser,verifyOperator} from '../middleware/authMiddleware.js';
import express from 'express';
import { bookFlight, getAllBookings ,getUserBookings, getOperatorBookings,cancelBooking} from '../controllers/bookingController.js';

const router = express.Router();

router.get('/user', verifyUser, getUserBookings);


// POST: Book flight
router.post('/book', verifyUser, bookFlight);

// GET: Get all bookings
router.get('/all',verifyAdmin,  getAllBookings);

router.get('/operator/all', verifyOperator, getOperatorBookings);

router.delete('/cancel/:bookingId', verifyUser, cancelBooking);

export default router;
