const mongoose = require('mongoose');

const AccidentSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    location: { type: Object, required: true },
    severity: { type: String, enum: ['minor', 'moderate', 'severe'], required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Accident', AccidentSchema);
