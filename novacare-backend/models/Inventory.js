const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, 'Please add the item name'],
        trim: true
    },
    category: {
        type: String,
        enum: ['Medicine', 'Equipment', 'Consumable'],
        default: 'Medicine'
    },
    quantity: {
        type: Number,
        required: [true, 'Please add a quantity'],
        min: 0,
        default: 0
    },
    unitPrice: {
        type: Number,
        required: [true, 'Please add the price per unit']
    },
    expiryDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', InventorySchema);