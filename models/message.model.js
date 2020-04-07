const mongoose = require('mongoose');

let messageChema = new mongoose.Schema({
    question: String,
    answer: String
});

let Message = mongoose.model('Message', messageChema, 'message');

module.exports = Message;