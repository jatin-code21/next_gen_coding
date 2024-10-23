const Submission = require('../models/Submission');
const Battle = require('../models/Battle');
const Problem = require('../models/Problem');
const Room = require('../models/Room');
const { io } = require('../sockets/socket');

const createBattleSubmission = async (req, res) => {
    const { user, problemId, code, language, status, roomId } = req.body;
    const room = await Room.findOne({ roomId });
    const battle = await Battle.findOne({ room: room._id }); // finding the battle using roomId
    if (!battle) {
        return res.status(404).json({ error: 'Battle not found' });
    }
    const participant = battle.participants.find(p => p.user.toString() === user._id.toString()); // finding the participant using _id (this is mongoose object id), user is mongoose  id 
    // in above line we are finding the participant even though we know the user is correct just to make sure that the user is in the battle which increases the security
    if (!participant) {
        return res.status(403).json({ error: 'User not in this battle' });
    }
    const problem = await Problem.findOne({ problemId }); // finding the problem using id
    if (!problem) {
        return res.status(404).json({ error: 'Problem not found with the given problem id' });
    }

    try {
        const submission = new Submission({ problemId, code, language, status });
        participant.submissions.push(submission);
        await battle.save();

        const isAccepted = status === 'ACCEPTED'; // this is coming from the client side when user submits the code
        submission.status = isAccepted ? 'ACCEPTED' : 'REJECTED';
        if (isAccepted) {
            participant.score += 1;
        }
        await battle.save();
        io.to(roomId).emit('submissionResult', {
            user: user._id, // this user is userId
            problemId,
            isAccepted
        });
        res.status(200).json({ message: 'Battle Submission created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the submission', error });
    }
};

module.exports = { createBattleSubmission };