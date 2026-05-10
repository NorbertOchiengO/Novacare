const express = require('express');
const router = express.Router();
const { addPatient, getPatients } = require('../controllers/patientController');

router.route('/')
    .get(getPatients)
    .post(addPatient);

module.exports = router;