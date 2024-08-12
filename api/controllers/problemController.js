const Problem = require('../models/Problem')

const createProblem = async (req, res) => {
    const { title, description, inputFormat, outputFormat, constraints, difficulty, testCases } = req.body;

    const problem = new Problem({ title, description, inputFormat, outputFormat, constraints, difficulty, testCases })
    try {
        await problem.save();
        res.status(201).json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the problem' })
    }
}

const getAllProblem = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ error: "Error in fetching" })
    }
}

const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await Problem.findOne({ problemId: id });
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' })
        }
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching the problem by id' });
    }
}

module.exports = { createProblem, getAllProblem, getProblemById };