const Patient = require('../models/Patient');

// Add a new patient
exports.addPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json({ success: true, data: patient });
    } catch (err) {
        // If phone number is duplicate, MongoDB throws code 11000
        if (err.code === 11000) {
            return res.status(400).json({ success: false, error: 'Phone number already registered' });
        }
        res.status(400).json({ success: false, error: err.message });
    }
};

// Get all patients
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({ success: true, count: patients.length, data: patients });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};