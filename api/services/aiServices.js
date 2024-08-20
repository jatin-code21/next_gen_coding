const OpenAI = require('openai')
const openai = new OpenAI({
    apiKey: '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'
});

const parseSuggestions = (analysis) => {
    const lines = analysis.split('\n');
    const suggestions = [];
    let currentSuggestion = null;

    for (const line of lines) {
        if (line.startsWith('Line')) {
            if (currentSuggestion) {
                suggestions.push(currentSuggestion);
            }
            const [lineInfo, ...messageParts] = line.split(':');
            
            currentSuggestion = {
                line: parseInt(lineInfo.split(' ')[1]),
                message: messageParts.join(':').trim(),
                suggestion: ''
            };
        }else if (currentSuggestion) {
            currentSuggestion.suggestion += line + '\n';
        }
    }

    if (currentSuggestion){
        suggestions.push(currentSuggestion);
    }

    return suggestions;
}
const analyzeCode = async (code, language) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
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

        const analysis = response.choices[0].messages.content;
        const canBeOptimized = analysis.toLowerCase().includes('can be optimised');

        return {
            canBeOptimized,
            suggestions: parseSuggestions(analysis)
        }
    } catch (error) {
        console.error('Error analyzing the code with AI', error);
        return { canBeOptimized: false, suggestions: [] };
    }
}

module.exports = { analyzeCode };