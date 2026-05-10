const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // This must match the name in your Patient model
        required: true
    },
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory', // This must match the name in your Inventory model
        required: true
    },
    dosage: {
        type: String,
        required: true // e.g., "1 tab 3x daily"
    },
    datePrescribed: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);