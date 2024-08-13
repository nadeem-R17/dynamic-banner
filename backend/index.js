const express = require('express');
const http = require('http');
const connection = require('./db');
const bannerRoutes = require('./routes/banner');
require('dotenv').config();
const cors = require('cors');
const { initSocket } = require('./socket');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'https://dynamic-banner-kl8h.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Create HTTP server and attach to Express app
const server = http.createServer(app);

// Initialize Socket.IO and pass the database connection
const io = initSocket(server, connection);

app.use(express.json());
app.use('/api/banner', bannerRoutes);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
