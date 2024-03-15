const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventAdmin = require('./eventAdminSchema');

const app = express();
const PORT = 3003;
const DB_URI = 'mongodb+srv://Ronak:GMAMR@cluster0.jxxzuw1.mongodb.net/first?retryWrites=true&w=majority';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
app.get('/', async (req, res) => {
    try {
        const admins = await eventAdmin.find();
        console.log("GET all Admin");
        res.json(admins);
    } catch (err) {
        console.error('Error fetching Admin:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const admin = await eventAdmin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        console.log("GET Admin by ID");
        res.json(admin);
    } catch (err) {
        console.error('Error fetching Admin by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const deletedadmin = await eventAdmin.findByIdAndDelete(req.params.id);
        if (!deletedadmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        console.log("DELETE Admin by ID");
        res.json(deletedadmin);
    } catch (err) {
        console.error('Error deleting Admin:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const updatedadmin = await eventAdmin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedadmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        console.log("UPDATE Admin by ID");
        res.json(updatedadmin);
    } catch (err) {
        console.error('Error updating Admin:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// {_id:new mongoose.Types.ObjectId()}

app.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newadmin = new eventAdmin({
            _id: new mongoose.Types.ObjectId(),
            adminName: req.body.adminName,
            adminEmail: req.body.adminEmail,
            loginPassword:req.body.loginPassword
        });
        await newadmin.save();
        console.log("CREATE new Admin");
        res.status(200).json(newadmin);
    } catch (err) {
        console.error('Error creating Admin:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
