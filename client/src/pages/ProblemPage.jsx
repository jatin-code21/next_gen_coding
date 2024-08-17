import React, { userState, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import ProblemDetails from '../components/ProblemDetails';
import CodeEditor from '../components/CodeEditor';
import RunSubmitButtons from '../components/RunSubmitButtons';
import Navbar from '../components/Navbar';
import TestCaseResults from '../components/TestCaseResults';
import SuccessModal from '../components/SuccessModal';

const api = axios.create({
    baseURL: 'http://localhost:8000',
})

const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  margin-top: 70px;
`;

const LeftPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f5f5;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ResultsPanel = styled.div`
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

// const ResultsPanel = styled.div`
//   position: fixed;
//   bottom: 0;
//   right: 0;
//   width: 50%;
//   background-color: white;
//   box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease-in-out;
//   transform: translateY(${props => props.show ? '0' : '100%'});
// `;

const ProblemPage = () => {
    const { problemId } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [testResults, setTestResults] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [showCaseModal, setShowCaseModal] = useState(false);
    const [mongoUser, setMongoUser] = useState(null);

    console.log('Problem id is:', problemId);

    const { user, isAuthenticated } = useAuth0();
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await api.get(`/api/problems/getProblem/${problemId}`);
                // console.log("Response object",response);
                const data = response.data;
                // console.log("Data",data);
                setProblem(data);
            } catch (error) {
                console.error('Error fetching the problem for the given id', error);
            }
        }
        fetchProblem();
    }, [problemId]);

    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated && user) {
                try {
                    const response = await api.get(`/api/users/${user.sub}`);
                    setMongoUser(response.data);
                } catch (error) {
                    console.error('Error fetching the data from MongoDb', error);
                }
            }
        }
        fetchUser();
    }, [isAuthenticated, user]);

    const getLanguageId = (language) => {
        const languageMap = {
            cpp: 54,
            javascript: 63,
            python: 71,
            java: 62
        };

        return languageMap[language];
    }

    const getResult = async (token) => {
        const options = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': 'af34b7c163msheb6c2bee3915e36p19084fjsncd3d119e4e43',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            }
        };

        // polling the response from the server.
        while (true) {
            const response = await axios.request(options);
            const result = response.data;
            console.log('The status of the code submisson is:', result);
            console.log('The description of the code', result.status.description);
            if (result.status.id <= 2) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                return result;
            }
        }

    }

    const runTestCase = async (testCase, index) => {
        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                wait: 'false',
                fields: '*'
            },
            headers: {
                'x-rapidapi-key': 'af34b7c163msheb6c2bee3915e36p19084fjsncd3d119e4e43',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                language_id: getLanguageId(language),
                source_code: btoa(code),
                stdin: btoa(testCase.input),
                expected_output: btoa(testCase.expectedOutput)
            })
        }
        try {
            const response = await axios.request(options);
            const { token } = response.data;
            const result = await getResult(token);

            return {
                index,
                status: result.status.id === 3 ? 'Passed' : 'Failed'
            };
        } catch (error) {
            console.error('Could not run the testcase'.error);
            return {
                index,
                status: "Error"
            };
        }
    }

    const handleRunCode = async () => {
        console.log('Running code...');
        setIsRunning(true);
        const visibleTestCases = problem.testCases.filter(testCase => !testCase.isHidden);
        setTestResults(visibleTestCases.map(() => ({ status: 'Running' })));

        const testCasePromises = visibleTestCases.map((testCase, index) => runTestCase(testCase, index));

        try {
            const results = await Promise.all(testCasePromises);

            setTestResults(prevResults => {
                const newResults = [...prevResults];
                results.forEach(result => {
                    newResults[result.index] = { status: result.status };
                });
                return newResults;
            })

            const allPassed = results.every(result => result.status === 'Passed');
            console.log(allPassed ? 'The submisison has been accepted' : 'The submission has been rejected');

        } catch (error) {
            console.error('Error running the test cases:', error);
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmitCode = async () => {
        console.log('Submitting code...');
        setIsRunning(true);
        const testCases = problem.testCases;
        // const visibleTestCases = problem.testCases.filter(testCase => !testCase.isHidden);
        setTestResults(testCases.map(() => ({ status: 'Running' })));

        const testCasePromises = testCases.map((testCase, index) => runTestCase(testCase, index));

        try {
            const results = await Promise.all(testCasePromises);

            setTestResults(prevResults => {
                const newResults = [...prevResults];
                results.forEach(result => {
                    newResults[result.index] = { status: result.status };
                });
                return newResults;
            })

            const allPassed = results.every(result => result.status === 'Passed');

            if (allPassed) {
                console.log('The Submission has been ACCEPTED');
                setShowCaseModal(true);
            } else {
                console.log('The submisison has been REJECTED');
            }
            const encodedCode = btoa(code);
            const res = await api.post('/api/submissions/submit', { user: mongoUser, problemId, code: encodedCode, language, status: allPassed ? 'ACCEPTED' : 'REJECTED' });
            console.log('Successfully saved', res);
        } catch (error) {
            console.error('Error running the test cases:', error);
        } finally {
            setIsRunning(false);
        }
    };

    const closeSuccessModal = () => {
        setShowCaseModal(false);
    }

    if (!problem) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <PageContainer>
                <LeftPanel>
                    <ProblemDetails problem={problem} />
                </LeftPanel>
                <RightPanel>
                    <CodeEditor
                        code={code}
                        setCode={setCode}
                        language={language}
                        setLanguage={setLanguage}
                    />
                    <RunSubmitButtons
                        onRun={handleRunCode}
                        onSubmit={handleSubmitCode}
                        isRunning={isRunning}
                    />
                    {testResults.length > 0 && (
                        <ResultsPanel>
                            <TestCaseResults results={testResults} />
                        </ResultsPanel>
                    )}
                </RightPanel>
            </PageContainer>
            {showCaseModal && <SuccessModal onClose={closeSuccessModal} />}
        </>
    )
}

export default ProblemPage
