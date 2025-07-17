import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



const JWT_SECRET = process.env.JWT_SECRET; // Move to .env later

// ✅ User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const isApproved = role === 'flightoperator' ? false : true;  // ✅ FlightOperators need approval

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved,
    });

    await newUser.save();

    if (role === 'flightoperator') {
      return res.status(201).json({ message: 'FlightOperator registration successful. Await admin approval.' });
    }

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // ✅ FlightOperator approval check
    if (user.role === 'flightoperator' && !user.isApproved) {
      return res.status(403).json({ message: 'Your FlightOperator account is pending admin approval.' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Users (Admin only or operator-specific)
export const getAllUsers = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.userId;

    let users;

    if (userRole === 'flightoperator') {
      // ✅ Operator: Users who booked operator's flights
      const operatorFlights = await Flight.find({ createdBy: userId }, '_id');
      const flightIds = operatorFlights.map(f => f._id);

      const bookings = await Booking.find({ flightId: { $in: flightIds } }, 'userId');
      const userIds = bookings.map(b => b.userId);

      users = await User.find({ _id: { $in: userIds } }, '-password');
    } else {
      // ✅ Admin: Get all users
      users = await User.find({}, '-password');
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Pending FlightOperator requests
export const getPendingOperators = async (req, res) => {
  try {
    const operators = await User.find({ role: 'flightoperator', isApproved: false });
    res.status(200).json(operators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Approve a FlightOperator
export const approveOperator = async (req, res) => {
  try {
    const operatorId = req.params.operatorId;
    const operator = await User.findById(operatorId);

    if (!operator) return res.status(404).json({ message: 'Operator not found' });

    operator.isApproved = true;
    await operator.save();

    res.status(200).json({ message: 'Operator approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
