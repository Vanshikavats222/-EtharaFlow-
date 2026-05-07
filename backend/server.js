const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Routes Import (Jo files humne routes folder mein banayi hain)
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

dotenv.config();
const app = express();

// 2. Middlewares
app.use(express.json()); // JSON data read karne ke liye
app.use(cors()); // Frontend-Backend connectivity ke liye

// 3. Routes Middleware (Backend URLs define karne ke liye)
app.use('/api/auth', authRoutes); // Saare login/signup yahan se honge
app.use('/api/tasks', taskRoutes); // Saare project/task management yahan se honge

// 4. MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// 5. Test Route
app.get('/', (req, res) => {
    res.send("🚀 Ethara API is Running and DB is Connected!");
});

// 6. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});