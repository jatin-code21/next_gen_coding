const axios = require('axios');
const Problem = require('../models/Problem');
const Groq = require('groq-sdk');
const groqai = new Groq({
    apiKey: process.env.GROQ_API_KEY
});
const generateTestCases = async (req, res) => {
    try {
        const { problemId } = req.params;
        const problem = await Problem.findOne({ problemId });
        if (!problem) {
            res.status(404).json({ message: 'Problem not found for generating the testcases' });
        }

        const prompt = `Generate 3 test cases for the provided coding problem which is in form of json:${problem}
                        Please provide 3 test cases in the following format:
                        Input:
                        Expected Output:
                        Test cases:`;

        const groqResponse = await groqai.chat.completions.create({
            model: "mixtral-8x7b-32768",
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful assistant that generates the testcases for the problem given in the form form of json. So generate the provided number of test cases by user, but should not be more than 5. And make sure for the given problem only you had to generate the testcases, any other test cases should not be generated at any condition also make sure the input and expected output are correct, don't generate the incorrect test cases at any cost.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 512,
            temperature: 0,
            top_p: 1,
            stop: null
        });
        // Call to GROQ API to generate test cases
        // const groqResponse = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        //     model: "mixtral-8x7b-32768",
        //     messages: [
        //         {
        //             role: "system",
        //             content: `You are a helpful assistant that generates the testcases for the problem given in the form form of json: ${problem}. So generate the provided number of test cases by user, but should not be more than 5. And make sure for the given problem only you had to generate the testcases, any other test cases should not be generated at any condition also make sure the input and expected output are correct, don't generate the incorrect test cases at any cost.`
        //         },
        //         {
        //             role: "user",
        //             content: prompt
        //         }
        //     ],
        //     max_tokens: 512,
        //     temperature: 0.6,
        // }, {
        //     headers: {
        //         'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        //         'Content-Type': 'application/json',
        //     },
        // });
        const generatedText = groqResponse.choices[0].message.content.trim();
        // console.log('Generated text', generatedText);
        const generatedTestCases = generatedText.split('\n\n').filter(testCase => testCase.trim() !== '');
        // console.log('Generated TestCases:', generatedTestCases);
        res.json({ testCases: generatedTestCases });
    } catch (error) {
        console.log('Error generating the test cases', error);
        res.status(500).json({ message: 'Error generating the test cases' });
    }
};

module.exports = { generateTestCases };