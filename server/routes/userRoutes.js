import express from 'express';
import { registerUser, loginUser, getAllUsers, getPendingOperators, approveOperator } from '../controllers/userController.js';
import { verifyAdmin , verifyOperator } from '../middleware/authMiddleware.js';
import { getUsersWhoBookedOperatorFlights } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/all', verifyAdmin, getAllUsers);
router.get('/pending-operators', verifyAdmin, getPendingOperators);
router.put('/approve/:operatorId', verifyAdmin, approveOperator);
router.get('/operator/users', verifyOperator, getUsersWhoBookedOperatorFlights);

export default router;
