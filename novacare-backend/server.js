const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventoryRoutes');
const patientRoutes = require('./routes/patientRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// dns config

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // This forces the code to use Google DNS

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Routes 
app.use('/api/inventory', inventoryRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('NovaCare API is online and healthy.');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to NovaCare Cloud DB'))
    .catch((err) => console.error('❌ Database Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

