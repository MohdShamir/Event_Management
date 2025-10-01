const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'booked' }, // booked/paid/cancelled
    paymentId: String
});

module.exports = mongoose.model('Booking', BookingSchema);
