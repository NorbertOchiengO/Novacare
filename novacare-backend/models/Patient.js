const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add the patient name'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a contact number'],
        unique: true // Prevents duplicate registrations
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    medicalHistory: [{
        condition: String,
        dateDiagnosed: Date,
        notes: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);