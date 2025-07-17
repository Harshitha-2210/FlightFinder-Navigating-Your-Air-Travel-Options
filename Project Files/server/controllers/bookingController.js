import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';

// Book a Flight
export const bookFlight = async (req, res) => {
  try {
    const userId = req.user.userId;  // ✅ ✅ Get user id from JWT verified by middleware
    const { flightId, passengers, passengerDetails } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    if (flight.availableSeats < passengers) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    if (!passengerDetails || passengerDetails.length !== passengers) {
      return res.status(400).json({ message: 'Passenger details count does not match number of passengers' });
    }

    const newBooking = new Booking({
      userId,  // ✅ Automatically taken from JWT
      flightId,
      passengers,
      passengerDetails
    });

    await newBooking.save();

    flight.availableSeats -= passengers;
    await flight.save();

    const populatedBooking = await Booking.findById(newBooking._id).populate('flightId');

    res.status(201).json({ message: 'Flight booked successfully', booking: populatedBooking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.userId;

    let bookings;

    if (userRole === 'operator') {
      // Get flight IDs owned by this operator
      const operatorFlights = await Flight.find({ createdBy: userId }, '_id');
      const operatorFlightIds = operatorFlights.map(flight => flight._id);

      bookings = await Booking.find({ flightId: { $in: operatorFlightIds } })
        .populate('userId')
        .populate('flightId');
    } else {
      // Admin sees all bookings
      bookings = await Booking.find()
        .populate('userId')
        .populate('flightId');
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;  // ✅ Get logged-in user id from JWT (verifyUser middleware)

    const bookings = await Booking.find({ userId }).populate('flightId');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getUsersWhoBookedOperatorFlights = async (req, res) => {
  try {
    const operatorId = req.user.userId;

    // Get all flights created by this operator
    const operatorFlights = await Flight.find({ createdBy: operatorId });
    const flightIds = operatorFlights.map(flight => flight._id);

    // Get bookings for these flights with user and flight populated
    const bookings = await Booking.find({ flightId: { $in: flightIds } })
      .populate('userId')
      .populate('flightId');

    // Map each user to their booked flights
    const userFlightMap = {};

    bookings.forEach(booking => {
      const userIdStr = booking.userId._id.toString();

      if (!userFlightMap[userIdStr]) {
        userFlightMap[userIdStr] = {
          _id: booking.userId._id,
          name: booking.userId.name,
          email: booking.userId.email,
          bookedFlights: []
        };
      }

      userFlightMap[userIdStr].bookedFlights.push({
        airline: booking.flightId.airline,
        flightNumber: booking.flightId.flightNumber
      });
    });

    // Convert to array for frontend
    const uniqueUsersWithFlights = Object.values(userFlightMap);

    res.status(200).json(uniqueUsersWithFlights);
  } catch (error) {
    console.error('Error in getUsersWhoBookedOperatorFlights:', error);
    res.status(500).json({ error: error.message });
  }
};


export const getOperatorBookings = async (req, res) => {
  try {
    const operatorId = req.user.userId;

    const operatorFlights = await Flight.find({ createdBy: operatorId });
    const flightIds = operatorFlights.map(f => f._id);

    const bookings = await Booking.find({ flightId: { $in: flightIds } })
      .populate('userId')
      .populate('flightId');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.user.userId; // From JWT (verifyUser middleware)

    const booking = await Booking.findOne({ _id: bookingId, userId });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }

    // Increase flight available seats back
    const flight = await Flight.findById(booking.flightId);
    if (flight) {
      flight.availableSeats += booking.passengers;
      await flight.save();
    }

    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ message: 'Booking canceled successfully' });

  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ error: error.message });
  }
};
