const mongoose = require('mongoose');

const BattleSchema = new mongoose.Schema({
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
    participants:[{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        score: {type: Number, default: 0},
        submissions:[{
            problem: {type: mongoose.Schema.Types.ObjectId, ref: 'Problem'},
            code: String,
            language: String,
            status:{type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING'},
        }]
    }],
    winner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Battle', BattleSchema);