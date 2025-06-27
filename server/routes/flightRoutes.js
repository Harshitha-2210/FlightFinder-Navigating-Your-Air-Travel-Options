import { verifyAdmin,verifyOperator,verifyToken } from '../middleware/authMiddleware.js';
import express from 'express';
import { addFlight, getAllFlights,getFlightsByOperator,getFlightById,updateFlight } from '../controllers/flightController.js';

const router = express.Router();

// POST: Add new flight
router.post('/add', verifyToken,addFlight);

// GET: Get all flights
router.get('/all', verifyToken,getAllFlights);

router.get('/my-flights', verifyOperator, getFlightsByOperator);

router.get('/:flightId', getFlightById);
router.put('/:flightId', verifyOperator, updateFlight);

export default router;
