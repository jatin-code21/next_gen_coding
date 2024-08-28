const OpenAI = require('openai')
const Groq = require('groq-sdk')
const dotenv = require('dotenv').config();
const openai = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});
// const openai = new Groq({
//     apiKey: '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'
// });

const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

// const parseSuggestions = (analysis) => {
//     const lines = analysis.split('\n');
//     const suggestions = [];
//     let currentSuggestion = null;

//     for (const line of lines) {
//         if (line.startsWith(isNumeric(line[0]))) {
//             if (currentSuggestion) {
//                 suggestions.push(currentSuggestion);
//             }
//             const [lineInfo, ...messageParts] = line.split(':');

//             currentSuggestion = {
//                 line: parseInt(lineInfo.split(' ')[1]),
//                 message: messageParts.join(':').trim(),
//                 suggestion: ''
//             };
//         }else if (currentSuggestion) {
//             currentSuggestion.suggestion += line + '\n';
//         }
//     }

//     if (currentSuggestion){
//         suggestions.push(currentSuggestion);
//     }

//     return suggestions;
// }
const analyzeCode = async (code, language) => {
    try {
        const response = await openai.chat.completions.create({
            model: "llama3-8b-8192",
            messages: [
                {
                    role: 'system',
                    content: "You are a code optimization expert. Analyze the given code and provide suggestions for optimization. Focus on effeciency, readability, and best practices."
                },
                {
                    role: "user",
                    content: `Analyze this ${language} code and provide optimization suggestions:\n\n${code}`
                }
            ],
            max_tokens: 500
        });
        console.log('Response from ai', response.choices[0].message.content);
        const analysis = response.choices[0].message.content;
        console.log(analysis);
        const canBeOptimized = analysis.toLowerCase().includes('1.');
        const suggestions = analysis
            .split('\n') // Splitting content by new lines
            .filter(line => line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.')) // Keeping only suggestion lines
        console.log("Suggestions:", suggestions);
        return {
            canBeOptimized,
            suggestions
        }
    } catch (error) {
        console.error('Error analyzing the code with AI', error);
        return { canBeOptimized: false, suggestions: [] };
    }
}

module.exports = { analyzeCode };