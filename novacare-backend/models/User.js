const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['admin', 'staff', 'doctor', 'nurse'], // Expanded roles
        default: 'staff' 
    },
    // --- NEW MEDICAL/HR FIELDS ---
    staffId: { type: String, unique: true, sparse: true },
    department: { type: String },
    designation: { type: String },
    specialization: { type: String },
    employmentType: { type: String, default: 'Full-time' },
    shift: { type: String },
    status: { type: String, default: 'Active' },
    systemAccess: { type: Boolean, default: true }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Added 'return' for safety
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);