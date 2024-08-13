const { Server } = require('socket.io');
const cors = require('cors');

let io;

function initSocket(server, dbConnection) {
    io = new Server(server, {
        cors: {
            origin: 'https://dynamic-banner-kl8h.onrender.com',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Send initial banner data
        dbConnection.query('SELECT * FROM banner LIMIT 1', (err, results) => {
            if (err) throw err;
            if (results.length) {
                socket.emit('bannerData', {
                    ...results[0],
                    timer: new Date(results[0].timer)
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
}

function getIo() {
    if (!io) {
        throw new Error('Socket.IO is not initialized');
    }
    return io;
}

module.exports = { initSocket, getIo };
