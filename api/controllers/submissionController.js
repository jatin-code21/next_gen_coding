const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User')
const { analyzeCode } = require('../services/aiServices')
const judge0service = require('../services/judge0service');

const createSubmission = async (req, res) => {
    const { user, problemId, code, language, status } = req.body; // fron client only probelemId needs to be send so that using id we can fetch the problem

    const problem = await Problem.findOne({ problemId }); // finding the problem using id
    if (!problem) {
        return res.status(404).json({ error: 'Problem not found with the given problem id' });
    }

    try {
        const submission = new Submission({ user, problem, problemId, code, language, status });
        await submission.save();
        return res.status(200).json({ submission });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the submission', error });
    }

    // try {
    //     await submission.save();

    //     let allPassed = true; // assuming initially that all the testcases has been passed
    //     const processTestCase = async (testCase) => {
    //         const { input, expectedOutput, isHidden } = testCase;
    //         const token = await judge0service.createSubmission(code, language, input);

    //         const result = await judge0service.getSubmissionResult(token);
    //         const passed = result.stdout.trim() === expectedOutput.trim();

    //         if (!passed) {
    //             allPassed = false;
    //         }

    //         submission.results.push({ passed, isHidden });

    //         if (submission.results.length === problem.testCases.length) {
    //             submission.status = allPassed ? 'ACCEPTED' : 'REJECTED';
    //             await submission.save();
    //             await webhookUtils.notifyUser(user.webhookUrl, submission); // Assuming user model has webhookUrl

    //             return res.status(200).json({ status: submission.status });
    //         }
    //     };

    //     for (const testCase of problem.testCases) {
    //         setTimeout(() => processTestCase(testCase), 3000); // Delay to give Judge0 time to process the submission
    //     }

    // } catch (error) {
    //     submission.status = 'ERROR';
    //     await submission.save();
    //     res.status(500).json({ error: 'Error processing the submission' });
    // }
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

const analyzeSubmission = async (req, res) => {
    const { submissionId, code, language, user } = req.body; // from frontend this data would be passed

    if (!submissionId || !code || !language) {
        res.status(400).json({ message: 'Missing required Submission' });
    }

    try {
        // verifying the submission exists and belongs to the user
        const submission = await Submission.findOne({ submissionId, user});
        if (!submission) {
            return res.status(400).json({ message: 'Submission not found or not authorized' });
        }

        // decoding the code
        const decodedCode = Buffer.from(code, 'base64').toString('utf-8');

        // analyzing the code
        const analysis = await analyzeCode(decodedCode, language);

        submission.aiAnalysis = analysis;
        await submission.save();

        res.json(analysis);
    } catch (error) {
        console.error('Error analyzing the submission', error);
        res.status(500).json({ message: 'Error analyzing the message', error: error.message })
    }
}

const getSolvedProblems = async (req, res) => {
    // console.log('The sub is:', req.auth.sub);
    // console.log(req.headers.authorization.split(' ')[1]);
    try{
        const user = await User.findOne({sub: req.auth.sub});
        if (!user){
            res.status(404).json({message: 'User not found'});
        }
        const solvedProblems = await Submission.distinct('problem', {
            user: user._id, // checking for the mongodb id
            status: "ACCEPTED",
        });
        // console.log(solvedProblems);
        res.json({solvedProblems});
    } catch (error) {
        res.status(500).json({message: 'Error Fetching the solved Problem', error: error.message});
    }
};

module.exports = { createSubmission, getSubmissionById, analyzeSubmission, getSolvedProblems}