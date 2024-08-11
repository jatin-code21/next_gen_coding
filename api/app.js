const express = require('express')
const bodyParser = require("body-parser")
const authRoutes = require('./routes/authRoutes')
const problemRoutes = require('./routes/problemRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/api/users', userRoutes);
app.use('/api/submissions', submissionRoutes);

// app.use('/api/auth', authRoutes);
// app.use('/api/problems', problemRoutes);
// app.use('/api/submissions', submissionRoutes);

module.exports = app;

// so this is the website that need to be refactoed for a reason.