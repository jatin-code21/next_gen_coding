const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User')
const judge0service = require('../services/judge0service');
const webhookUtils = require('../utils/webhookUtils')

const createSubmission = async (req, res) => {
    const { user, problemId, code, language } = req.body; // fron client only probelemId needs to be send so that using id we can fetch the problem

    const problem = await Problem.findOne({ problemId }); // finding the problem using id
    if (!problem) {
        return res.status(404).json({ error: 'Problem not found with the given problem id' });
    }

    const submission = new Submission({ user, problem: problem.problemId, problemId, code, language, status: 'PENDING' });
    try {
        await submission.save();

        let allPassed = true; // assuming initially that all the testcases has been passed
        const processTestCase = async (testCase) => {
            const { input, expectedOutput, isHidden } = testCase;
            const token = await judge0service.createSubmission(code, language, input);

            const result = await judge0service.getSubmissionResult(token);
            const passed = result.stdout.trim() === expectedOutput.trim();

            if (!passed) {
                allPassed = false;
            }

            submission.results.push({ passed, isHidden });

            if (submission.results.length === problem.testCases.length) {
                submission.status = allPassed ? 'ACCEPTED' : 'REJECTED';
                await submission.save();
                await webhookUtils.notifyUser(user.webhookUrl, submission); // Assuming user model has webhookUrl

                return res.status(200).json({ status: submission.status });
            }
        };

        for (const testCase of problem.testCases) {
            setTimeout(() => processTestCase(testCase), 3000); // Delay to give Judge0 time to process the submission
        }

    } catch (error) {
        submission.status = 'ERROR';
        await submission.save();
        res.status(500).json({ error: 'Error processing the submission' });
    }
}

const getSubmissionById = async (req, res) => {
    const { id } = req.params;
    try {
        const submission = Submission.findOne({ submissionId: id }.populate('problem'));
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        return res.status(200).json({ submission });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error fetching the submission' });
    }
}

module.exports = { createSubmission, getSubmissionById }