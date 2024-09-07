const User = require('../models/User');
const Problem = require('../models/Problem')
const Groq = require('groq-sdk');

const groqai = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const getQuestionsLeft = async (req, res) => {
    try {
        const user = await User.findOne({ sub: req.auth.sub });
        const { problemId } = req.query;
        const questionsLeft = user.getQuestionsLeft(problemId);
        // console.log("Question left", questionsLeft);
        res.json({ questionsLeft});
    } catch (error) { 
        console.log("Error fetching question left", error);
        res.status(500).json({ message: 'Error fetching question left' });
    }
};

const askQuestion = async (req, res) => {
    try {
        const user = await User.findOne({ sub: req.auth.sub });
        const { question, problemId } = req.body; // so here question is which is written in the input of message
        const questionsLeft = user.getQuestionsLeft(problemId);
        if (questionsLeft <= 0) {
            return res.status(403).json({ message: 'Daily question exceeded' });
        }
        const problem = await Problem.findOne({ problemId });
        const completion = await groqai.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [
                {
                    role: 'system',
                    content: `you are given a problem in form of json: ${problem}. Now considering the given json fetched from the datebase, answer the question provided by the user only regarding this question itself. If any other question is asked which is not related to this problem you can send the response as "ask question related to this specific problem only"`
                },
                {
                    role: "user",
                    content: question
                }
            ],
            max_tokens: 400,
            temperature: 0,
            top_p: 1,
            stop: null
        });

        const answer = completion.choices[0].message.content;
        user.incrementQuestionCount(problemId);
        await user.save();
 
        res.json({
            answer,
            questionsLeft: user.getQuestionsLeft(problemId)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing question' });
    }
}

module.exports = { getQuestionsLeft, askQuestion };