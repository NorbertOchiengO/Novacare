const User = require('../models/User'); // Adjust the path if your models folder is elsewhere
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
console.log("JWT_SECRET from env:", process.env.JWT_SECRET);

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // 2. Compare the password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // 3. Create a JWT Token (Make sure JWT_SECRET is in your .env)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during login" });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, staffId, department } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // 2. Create the new user with all the medical fields
        user = new User({
            name, // This is the combined string from the frontend
            email,
            password,
            role: role || 'staff',
            staffId,
            department
        });

        await user.save();
        res.status(201).json({ message: "Staff registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// ... keep your existing exports.register code here ...
