const Battle = require('../models/Battle');
const Problem = require('../models/Problem');
const Room = require('../models/Room');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const { io } = require('../sockets/socket');

const createRoom = async (req, res) => {
    // console.log(req);
    try {
        const user = await User.findOne({ sub: req.auth.sub });
        const roomId = uuidv4();
        const room = new Room({ roomId, users: [user._id] });
        await room.save();
        res.status(201).json({ roomId: room.roomId });
    } catch (error) {
        res.status(500).json({ error: 'Error creating the room', error });
    }
};

const joinRoom = async (req, res) => {
    try {
        const user = await User.findOne({ sub: req.auth.sub });
        const room = await Room.findOne({ roomId: req.params.roomId });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        const userAlreadyinRoom = room.users.some(userId => userId.equals(user._id));
        if (userAlreadyinRoom)
        {
            return res.json({success: true, message: 'Re-entered the room'});
        }
        if (room.users.length >= 2) {
            return res.status(400).json({ error: 'Room is full' });
        }
        room.users.push(user._id);
        await room.save();
        res.json({ success: true });

        if (room.users.length === 2) {
            if (room.status != 'in_progress') {
                startBattle(room.roomId);
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Error joining the room', error });
    }
}

const roomStatus = async (req, res) => {
    try {
        const room = await Room.findOne({ roomId: req.params.roomId }).populate('users', 'name');
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the room status', error });
    }
}; // returns the room, so room.status would give the status of the room

const startBattle = async (roomId) => {
    try {
        const room = await Room.findOne({ roomId });
        const questions = await getRandomQuestions(2); // here the whole problem is being stored
        room.questions = questions.map(q => q._id); // here only the id of the problem is stored in database
        room.status = 'in_progress';
        const startTime = Date.now();
        room.startTime = startTime;
        await room.save();

        const battle = new Battle({
            room: room._id,
            participants: room.users.map(user => ({ user })), // this is also userID only
        });
        await battle.save();
        io.to(room.roomId).emit('battleStart', {
            questions: questions.map(q => (q)),
            startTime: startTime,
        });

        // setting a timeout of 30 minutes to end the battle
        setTimeout(() => endBattle(room.roomId), 5 * 60 * 1000);
    } catch (error) {
        console.error('Error starting the battle:', error);
    }
};

const endBattle = async (roomId) => {
    try {
        const room = await Room.findOne({ roomId });
        if (!room || room.status !== 'in_progress') {
            return;
        }
        room.status = 'completed';
        room.endTime = new Date();
        await room.save();

        const battle = await Battle.findOne({ room: room._id }).populate('participants.user');
        const winner = determineWinner(battle);
        battle.winner = winner; // setting the winner of the battle, here winner is the user object
        await battle.save();


        io.to(room.roomId).emit('battleEnd', {
            winner: winner ? winner.name : 'Tie',
            results: battle.participants.map(p => ({
                name: p.user.name, // here name would not be there not sure, had to check
                score: p.score,
            }))
        })
    } catch (error) {
        console.error('Error ending the battle:', error);
    }
};

const getRandomQuestions = async (count) => {
    const questions = await Problem.aggregate([{ $sample: { size: count } }]);
    return questions;
}

const determineWinner = (battle) => {
    if (!battle.participants || battle.participants.length < 2) return null;
    const [p1, p2] = battle.participants; // 2 users playing the battle
    if (p1.score > p2.score) return p1.user;
    if (p2.score > p1.score) return p2.user; // this are the mongodb _id
    return null; // indicating its a tie
}

module.exports = { createRoom, joinRoom, roomStatus };