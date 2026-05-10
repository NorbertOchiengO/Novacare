const Prescription = require('../models/Prescription');
const Inventory = require('../models/Inventory');

exports.addPrescription = async (req, res) => {
    try {
        // 1. Create the prescription
        const prescription = await Prescription.create(req.body);

        // 2. Automatically find the medicine and reduce stock by 1 (or more)
        await Inventory.findByIdAndUpdate(req.body.medicine, {
            $inc: { quantity: -1 } // This subtracts 1 from the stock
        });

        res.status(201).json({ success: true, data: prescription });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};