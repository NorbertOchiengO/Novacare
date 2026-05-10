const express = require('express');
const router = express.Router();
const { addPrescription } = require('../controllers/prescriptionController');

router.route('/')
    .post(addPrescription);

module.exports = router;