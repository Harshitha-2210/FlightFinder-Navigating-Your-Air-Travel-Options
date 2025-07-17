import Flight from '../models/Flight.js';

// Add New Flight
export const addFlight = async (req, res) => {
  try {
    const operatorId = req.user.userId;   
    const newFlight = new Flight({
      ...req.body,
      createdBy: operatorId
    });

    await newFlight.save();
    res.status(201).json({ message: 'Flight added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Flights

import mongoose from 'mongoose';  // ✅ Make sure mongoose is imported

export const getAllFlights = async (req, res) => {
  try {
    let flights;
    const userRole = req.user.role;
    const userId = req.user.userId;

    if (userRole === 'admin') {
      flights = await Flight.find();
    } else if (userRole === 'flightoperator') {
      // ✅ FIX: Convert userId string to ObjectId before querying
      flights = await Flight.find({ createdBy: new mongoose.Types.ObjectId(userId) });
    } else {
      flights = await Flight.find();
    }

    res.status(200).json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: error.message });
  }
};



export const getFlightsByOperator = async (req, res) => {
  try {
    const operatorId = req.user.userId;
    const flights = await Flight.find({ createdBy: operatorId });
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const flightId = req.params.flightId;
    const updateData = req.body;

    const updatedFlight = await Flight.findByIdAndUpdate(flightId, updateData, { new: true });

    if (!updatedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ message: 'Flight updated successfully', flight: updatedFlight });
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({ error: error.message });
  }
};
