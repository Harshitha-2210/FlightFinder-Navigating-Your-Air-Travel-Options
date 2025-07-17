import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  departure: String,
  destination: String,
  departureTime: Date,
  arrivalTime: Date,
  price: Number,
  availableSeats: Number,
  createdBy: {           
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Flight', flightSchema);
