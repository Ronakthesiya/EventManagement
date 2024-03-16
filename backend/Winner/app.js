const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Winner = require('./WinnerSchema');

const app = express();
const PORT = 3005;
const DB_URI = 'mongodb+srv://Ronak:GMAMR@cluster0.jxxzuw1.mongodb.net/first?retryWrites=true&w=majority';

mongoose.connect(DB_URI)
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/getallwinner', async (req, res) => {
    try {
        const winner = await Winner.find({});
        console.log("GET all Winner");
        res.json(winner);
    } catch (err) {
        console.error('Error fetching Winner:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/getbyidwinner/:id', async (req, res) => {
    try {
        const winner = await Winner.findById(req.params.id);
        if (!winner) {
            return res.status(404).json({ error: 'Winner not found' });
        }
        console.log("GET Winner by ID");
        res.json(winner);
    } catch (err) {
        console.error('Error fetching Winner by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/deletewinner/:id', async (req, res) => {
    try {
        const deletedwinner = await Winner.findByIdAndDelete(req.params.id);
        if (!deletedwinner) {
            return res.status(404).json({ error: 'Winner not found' });
        }
        console.log("DELETE Winner by ID");
        res.json(deletedwinner);
    } catch (err) {
        console.error('Error deleting Winner:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/putwinner/:id', async (req, res) => {
    try {
        const updatedwinner = await Winner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedwinner) {
            return res.status(404).json({ error: 'Winner not found' });
        }
        console.log("UPDATE Winner by ID");
        res.json(updatedwinner);
    } catch (err) {
        console.error('Error updating Winner:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.post('/postwinner', async (req, res) => {
    console.log(req.body);
    try {
        const newWinner = new Winner({
            _id: new mongoose.Types.ObjectId(),
            eventId: req.body.eventId
        });
        await newWinner.save();
        console.log("CREATE new Winner");
        res.status(200).json(newWinner);
    } catch (err) {
        console.error('Error creating Winner:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
