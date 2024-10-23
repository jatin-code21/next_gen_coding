const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomId: {type: String, required: true, unique: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    questions : [{type: mongoose.Schema.Types.ObjectId, ref: 'Problem'}],
    startTime: Date,
    endTime: Date,
    status: {type: String, enum: ['waiting', 'in_progress', 'completed'], default: 'waiting'},
});

module.exports = mongoose.model('Room', RoomSchema);