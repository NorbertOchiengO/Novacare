const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res) => {
    // We're pulling the fields you defined in your React state
    const { userId, password } = req.body;

    try {
        // 1. Find user by their unique ID
        const user = await User.findOne({ userId });
        if (!user) return res.status(400).json({ success: false, message: 'User not found' });

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        // 3. Create the "Access Card" (Token)
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            token,
            user: {
                name: user.name,
                role: user.role,
                accountName: user.accountName // Including this for your UI
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.registerUser = async (req, res) => {
    const { name, userId, password, role, accountName } = req.body;
    try {
        let user = new User({ name, userId, password, role, accountName });
        await user.save(); // The "pre-save" hook we wrote earlier will hash the password
        res.status(201).json({ success: true, message: "User Created" });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};