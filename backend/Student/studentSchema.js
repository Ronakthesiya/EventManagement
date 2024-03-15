const mongoose = require('mongoose');

const schema = mongoose.Schema({
    studentName: {
        type: String
    },
    eventId: [
        {
            type: String
        }
    ],
    studentEmail: {
        type: String
    },
    studentCollage: {
        type: String
    },
    loginOrNot: {
        type: Boolean
    },
    loginName: {
        type: String
    },
    loginPassword: {
        type: String
    },
    ragiteredEventCount: {
        type: Number,
        default:0
    },
    studentEnrollment: {
        type: String,
        default:"None"
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    confirmPassword:{
        type: String
    },
    phoneNumber:{
        type:Number
    },
    gender:{
        type:String
    }
})

Student = mongoose.model('Student', schema);
module.exports = Student;