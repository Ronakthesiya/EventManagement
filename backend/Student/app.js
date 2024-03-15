const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Student = require('./studentSchema');

const app = express();
const PORT = 3001;
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
        const students = await Student.find();
        console.log("GET all Student");
        res.json(students);
    } catch (err) {
        console.error('Error fetching Student:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        console.log("GET Student by ID");
        res.json(student);
    } catch (err) {
        console.error('Error fetching Student by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const deletedstudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedstudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        console.log("DELETE Student by ID");
        res.json(deletedstudent);
    } catch (err) {
        console.error('Error deleting Student:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        console.log("UPDATE Student by ID");
        res.json(updatedStudent);
    } catch (err) {
        console.error('Error updating Student:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// {_id:new mongoose.Types.ObjectId()}

app.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        const newStudent = new Student({
            _id: new mongoose.Types.ObjectId(),
            studentName: req.body.studentName,
            studentEmail: req.body.studentEmail,
            loginName:req.body.loginName,
            loginPassword:req.body.loginPassword
        });
        await newStudent.save();
        console.log("CREATE new Student");
        res.status(200).json(newStudent);
    } catch (err) {
        console.error('Error creating Student:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
