const mongoose = require('mongoose');

const schema = mongoose.Schema({
    eventId: {
        type: String
    },
    studentId: [
        {
            type: String
        }
    ]
})

Winner = mongoose.model('Winner', schema);
module.exports = Winner;