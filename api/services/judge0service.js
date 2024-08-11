const axios = require('axios')

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = 'af34b7c163msheb6c2bee3915e36p19084fjsncd3d119e4e43'

const createSubmission = async (sourceCode, languageId, stdin) =>{
    const response = await axios.post(`${JUDGE0_API_URL}/submissions`, {
        source_code: sourceCode,
        language_id: languageId,
        stdin: stdin
    }, {
        headers: {
            "Content-Type": 'application/json',
            'x-rapidapi-key': JUDGE0_API_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    },{
        params:{base64_encoded: 'true'}
    })

    return response.data.token;
};

const getSubmissionResult = async (token) => {
    const response = await axios.get(`${JUDGE0_API_URL}/submissions/${token}`, {
        headers:{
            'Content-Type' : 'application/json',
            'x-rapidapi-key': JUDGE0_API_KEY,
        }
    }, {
        params:{base64_encoded: 'true'}
    });

    return response.data;
};

module.exports = {createSubmission, getSubmissionResult};

