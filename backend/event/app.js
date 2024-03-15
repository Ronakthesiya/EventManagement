// 'Access-Control-Allow-Origin', '*'
// 'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH'
// const bodyParser = require('body-parser');
// const express = require('express');
// const mongoose = require('mongoose');
// const Event = require('./EventSchema')
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
//         const user = await Event.find();
//         console.log("get");
//         res.send(user);
//     })

//     app.get('/:id',async(req,res)=>{
//         const user = await Event.findById(req.params.id);
//         console.log("get");
//         res.send(user);
//     })

//     app.delete('/:id',async(req,res)=>{
//         const user = await Event.findById(req.params.id);
//         await user.deleteOne();
//         res.send(user);
//     })

//     app.put('/:id',async(req,res)=>{
//         try{
//             const user = await Event.findOneAndReplace({_id: req.params.id} , req.body);
//             await user.save();
//             res.json({user});
//         }catch(e){
//             console.log(e.message);
//         }
//     })

//     // app.patch('/:id',async(req,res)=>{
//     //     const user = await Event.findById(req.params.id);

//     //     user.EventName = req.body.EventName,
//     //     user.EventDesc = req.body.EventDesc,
//     //     user.limitedSeats = req.body.limitedSeats,
//     //     user.noOfSeat = req.body.noOfSeat,
//     //     user.noOfFildSeat = req.body.noOfFildSeat,
//     //     user.noOfRemainingSeat =req.body.noOfRemainingSeat,
//     //     user.EventDate  =req.body.EventDate ,
//     //     user.EventRule = req.body.EventRule ,
//     //     user.EventImg = req.body.EventImg ,
//     //     user.lengthOfTeam = req.body.lengthOfTeam ,
//     //     user.passedOrNot = req.body.passedOrNot,
//     //     user.memberId=req.body.memberId

//     //     await user.save();
//     //     res.send(user);
//     // })

//     app.post('/',async(req,res)=>{
//         const user = new Event({_id : new mongoose.Types.ObjectId()} , req.body);

//         try{
//             await user.save();
//             res.json(user);
//         }catch(e){
//             console.log(e.message);
//         }
//     })

//     // app.post('/',async(req,res)=>{
//     //     const user = new Event({
//     //         _id : new mongoose.Types.ObjectId(),
//     //         EventName : req.body.EventName,
//     //         EventDesc : req.body.EventDesc,
//     //         limitedSeats : req.body.limitedSeats,
//     //         noOfSeat : req.body.noOfSeat,
//     //         noOfFildSeat : req.body.noOfFildSeat,
//     //         noOfRemainingSeat : req.body.noOfRemainingSeat,
//     //         EventDate : req.body.EventDate ,
//     //         EventRule : req.body.EventRule ,
//     //         EventImg : req.body.EventImg ,
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
const Event = require('./EventSchema');

const app = express();
const PORT = 3004;
const DB_URI = 'mongodb+srv://Ronak:GMAMR@cluster0.jxxzuw1.mongodb.net/first?retryWrites=true&w=majority';

// Connect to MongoDB
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
app.get('/', async (req, res) => {
    try {
        const Events = await Event.find({});
        console.log("GET all Events ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        res.json(Events);
    } catch (err) {
        console.error('Error fetching Events:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/:id', async (req, res) => {
    try {
        const EventItem = await Event.findById(req.params.id);
        if (!EventItem) {
            return res.status(404).json({ error: 'Event not found' });
        }
        console.log("GET Event by ID");
        res.json(EventItem);
    } catch (err) {
        console.error('Error fetching Event by ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        console.log("DELETE Event by ID");
        res.json(deletedEvent);
    } catch (err) {
        console.error('Error deleting Event:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        console.log("UPDATE Event by ID");
        res.json(updatedEvent);
    } catch (err) {
        console.error('Error updating Event:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// {_id:new mongoose.Types.ObjectId()}

app.post('/', async (req, res) => {
    try {
        const newEvent = new Event({_id:new mongoose.Types.ObjectId(),...req.body});
        await newEvent.save();
        console.log("CREATE new Event");
        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Error creating Event:', err);
        res.status(500).json({ error: 'Server error' });
    }
});






// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
