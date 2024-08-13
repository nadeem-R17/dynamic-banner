const express = require('express');
const router = express.Router();
const connection = require('../db');
const { getIo } = require('../socket'); 

// Get banner data
router.get('/', (req, res) => {
    connection.query('SELECT * FROM banner LIMIT 1', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'No banner data found' });
        }
    });
});

//Update Banner Data
router.put('/', (req, res) => {
    
    const { description, timer, isVisible, link } = req.body;

    const localTime = new Date(timer + ' UTC');
    if (isNaN(localTime.getTime()) || localTime <= new Date()) {
        return res.status(400).json({ error: 'Timer must be set to a future date and time' });
    }

    const formattedTimer = localTime.toISOString().slice(0, 19).replace('T', ' ');
    const isVisibleInt = isVisible ? 1 : 0;

    connection.query(
        'UPDATE banner SET description = ?, timer = ?, isVisible = ?, link = ? WHERE id = 1', 
        [description, formattedTimer, isVisibleInt, link],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows > 0) {
                // Broadcast updated banner data to all connected clients
                const io = getIo();
                io.emit('bannerData', { description, timer: formattedTimer, isVisible, link });
                res.json({ message: 'Banner updated successfully' });
            } else {
                res.status(404).json({ message: 'No banner data found to update' });
            }
        }
    );
});


module.exports = router;
