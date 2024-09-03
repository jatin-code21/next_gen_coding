const Groq = require('groq-sdk')
const dotenv = require('dotenv').config();
const openai = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

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
                    content: "You are a code analyzer expert. Analyze the given code and provide the time and space complexity of the code, suggest the optimization if there that can be done in the code time and space complexity wise, also highlight the part which is not necessary to include in the code and there could be a better way to do that."
                },
                {
                    role: "user",
                    content: `Analyze this ${language} code and generate the report properly: ${code}`
                }
            ],
            max_tokens: 400,
            temperature: 0,
            top_p: 1,
            stop: null
        });
        // console.log('Full response from AI:', response);
        // if (!response || !response.choices || !response.choices[0] || !response.choices[0].message) {
        //     throw new Error('Invalid response from AI');
        // }
        // console.log('Response from ai', response.choices[0]);
        const analysis = response.choices[0].message.content;
        // console.log("Analysis part", analysis);
        const canBeOptimized = analysis.toLowerCase().includes('time complexity');
        const timePart = analysis.match(/Time Complexity:[\s\S]*?(?=\n\n|$)/)?.[0] || '';
        const spacePart = analysis.match(/Space Complexity:[\s\S]*?(?=\n\n|$)/)?.[0] || '';
        const optimizationMatch = analysis.match(/Optimization Suggestions:([\s\S]*?)(?=\n\nCode Optimization:|\n\n(?!Optimization Suggestions:)|$)/);
        const optimizationPart = optimizationMatch ? optimizationMatch[1].trim() : '';
        const suggestions = [
            timePart.trim(),
            spacePart.trim(),
            optimizationPart.trim()
        ].filter(Boolean);
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