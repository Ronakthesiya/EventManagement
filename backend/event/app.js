// 'Access-Control-Allow-Origin', '*'
// 'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH'
// const bodyParser = require('body-parser');
// const express = require('express');
// const mongoose = require('mongoose');
// const event = require('./eventSchema')
// var cors = require('cors');

// const DB = 'mongodb+srv://Ronak:GMAMR@cluster0.jxxzuw1.mongodb.net/first?retryWrites=true&w=majority';

// mongoose.connect(DB,{
//     useNewUrlParser : true,
// }).then(()=>{
//     console.log('Connectoin Succ');
    
//     const app = express();

//     app.use(express.json());
//     app.use(bodyParser.urlencoded({extended:false}));
//     app.use(cors());

//     app.get('/',async(req,res)=>{
//         const user = await event.find();
//         console.log("get");
//         res.send(user);
//     })

//     app.get('/:id',async(req,res)=>{
//         const user = await event.findById(req.params.id);
//         console.log("get");
//         res.send(user);
//     })

//     app.delete('/:id',async(req,res)=>{
//         const user = await event.findById(req.params.id);
//         await user.deleteOne();
//         res.send(user);
//     })

//     app.put('/:id',async(req,res)=>{
//         try{
//             const user = await event.findOneAndReplace({_id: req.params.id} , req.body);
//             await user.save();
//             res.json({user});
//         }catch(e){
//             console.log(e.message);
//         }
//     })

//     // app.patch('/:id',async(req,res)=>{
//     //     const user = await event.findById(req.params.id);

//     //     user.eventName = req.body.eventName,
//     //     user.eventDesc = req.body.eventDesc,
//     //     user.limitedSeats = req.body.limitedSeats,
//     //     user.noOfSeat = req.body.noOfSeat,
//     //     user.noOfFildSeat = req.body.noOfFildSeat,
//     //     user.noOfRemainingSeat =req.body.noOfRemainingSeat,
//     //     user.eventDate  =req.body.eventDate ,
//     //     user.eventRule = req.body.eventRule ,
//     //     user.eventImg = req.body.eventImg ,
//     //     user.lengthOfTeam = req.body.lengthOfTeam ,
//     //     user.passedOrNot = req.body.passedOrNot,
//     //     user.memberId=req.body.memberId

//     //     await user.save();
//     //     res.send(user);
//     // })

//     app.post('/',async(req,res)=>{
//         const user = new event({_id : new mongoose.Types.ObjectId()} , req.body);

//         try{
//             await user.save();
//             res.json(user);
//         }catch(e){
//             console.log(e.message);
//         }
//     })

//     // app.post('/',async(req,res)=>{
//     //     const user = new event({
//     //         _id : new mongoose.Types.ObjectId(),
//     //         eventName : req.body.eventName,
//     //         eventDesc : req.body.eventDesc,
//     //         limitedSeats : req.body.limitedSeats,
//     //         noOfSeat : req.body.noOfSeat,
//     //         noOfFildSeat : req.body.noOfFildSeat,
//     //         noOfRemainingSeat : req.body.noOfRemainingSeat,
//     //         eventDate : req.body.eventDate ,
//     //         eventRule : req.body.eventRule ,
//     //         eventImg : req.body.eventImg ,
//     //         lengthOfTeam : req.body.lengthOfTeam ,
//     //         passedOrNot : req.body.passedOrNot,
//     //         memberId : req.body.memberId

//     //     });
//     //     await user.save();
//     //     res.send(user);
//     // })

//     app.listen(3000,()=>{
//         console.log("server Started");
//     });
// }).catch((err)=>console.log('Not connect'));




const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const event = require('./eventSchema');

const app = express();
const PORT = 3004;
const DB_URI = 'mongodb+srv://Ronak:GMAMR@cluster0.jxxzuw1.mongodb.net/first?retryWrites=true&w=majority';

// Connect to MongoDB
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
        const events = await event.find();
        console.log("GET all events");
        res.json(events);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const eventItem = await event.findById(req.params.id);
        if (!eventItem) {
            return res.status(404).json({ error: 'Event not found' });
        }
        console.log("GET event by ID");
        res.json(eventItem);
    } catch (err) {
        console.error('Error fetching event by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        console.log("DELETE event by ID");
        res.json(deletedEvent);
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        console.log("UPDATE event by ID");
        res.json(updatedEvent);
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// {_id:new mongoose.Types.ObjectId()}

app.post('/', async (req, res) => {
    try {
        const newEvent = new event({_id:new mongoose.Types.ObjectId(),...req.body});
        await newEvent.save();
        console.log("CREATE new event");
        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ error: 'Server error' });
    }
});






// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
