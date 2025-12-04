const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    model: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    lastServiceDate: { type: Date, required: true },
    autonomousFeatures: { type: Boolean, default: false }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
