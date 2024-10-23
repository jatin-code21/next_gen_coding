const express = require('express');
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const aiChatRoutes = require('./routes/aichatRoutes');
const aiTestCaseRoute = require('./routes/aiTestCaseRoute');
const roomRoutes = require('./routes/roomRoutes');
const battleSubmissionRoutes = require('./routes/battleSubmissionRoutes');
const {app} = require('./sockets/socket');
const cors = require('cors')

// const app = express()
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json());
app.get('/', (req, res) =>{res.send('Server is up and running')});
app.use('/api/users', userRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ai-chat', aiChatRoutes);
app.use('/api/aitestcases', aiTestCaseRoute);
app.use('/api/rooms', roomRoutes);
app.use('/api/battlesubmissions', battleSubmissionRoutes);

module.exports = app;

// so this is the website that need to be refactoed for a reason.