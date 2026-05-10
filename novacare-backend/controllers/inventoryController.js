const Inventory = require('../models/Inventory');

// @desc    Add new item to inventory
// @route   POST /api/inventory
exports.addItem = async (req, res) => {
    try {
        const item = await Inventory.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all inventory items
// @route   GET /api/inventory
exports.getItems = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update an item
// @route   PUT /api/inventory/:id
exports.updateItem = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
        res.status(200).json({ success: true, data: item });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete an item
// @route   DELETE /api/inventory/:id
exports.deleteItem = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};