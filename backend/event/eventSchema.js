const mongoose = require('mongoose');

const schema = mongoose.Schema({
    eventName : {
        type : String
    },
    eventDesc : {
        type : String
    },
    limitedSeats:{
        type : Boolean
    },
    noOfSeat:{
        type : Number
    },
    noOfFildSeat:{
        type:Number,
        default: 0
    },
    noOfRemainingSeat:{
        type:Number,
        default: 0
    },
    eventDate:{
        type : Date
    },
    eventRule:{
        type:String
    },
    eventImg:{
        type:String
    },
    hasTeam:{
        type:Boolean
    },
    lengthOfTeam:{
        type:Number
    },
    passedOrNot:{
        type:Boolean
    },
    memberId:[
        {
            type : String
        }
    ]

    
})

const Event = mongoose.model('Event',schema);
module.exports = Event;