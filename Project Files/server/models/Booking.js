import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  bookingDate: { type: Date, default: Date.now },
  passengers: Number,
  passengerDetails: [
    {
      name: String,
      email: String
    }
  ]
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
