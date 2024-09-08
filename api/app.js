const express = require('express');
const bodyParser = require("body-parser");
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const aiChatRoutes = require('./routes/aichatRoutes');
const cors = require('cors')

const app = express()

// const allowedOrigins = process.env.NODE_ENV === 'production'
//     ? ['https://next-gen-coding-hm43.vercel.app']
//     : ['http://localhost:5173'];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//     credentials: true,
// }));

app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())
app.get('/', (req, res) =>{res.send('Server is up and running')})
app.use('/api/users', userRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/problems', problemRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/ai-chat', aiChatRoutes)
// app.use('/api/auth', authRoutes); 
// app.use('/api/problems', problemRoutes);
// app.use('/api/submissions', submissionRoutes);

module.exports = app;

// so this is the website that need to be refactoed for a reason.