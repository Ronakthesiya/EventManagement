const mongoose = require('mongoose');

const schema = mongoose.Schema({
    adminName: {
        type: String
    },
    adminEmail: {
        type: String
    },
    loginPassword: {
        type: String
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
    phoneNumber:{
        type:Number
    },
    gender:{
        type:String
    }
})

module.exports = mongoose.model('eventAdmin', schema);