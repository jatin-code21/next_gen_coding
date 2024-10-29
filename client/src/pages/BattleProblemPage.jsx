import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';
import ProblemDetails from '../components/ProblemDetails';
import CodeEditor from '../components/CodeEditor';
import RunSubmitButtons from '../components/RunSubmitButtons';
import Navbar from '../components/Navbar';
import TestCaseResults from '../components/TestCaseResults';
import SuccessModal from '../components/SuccessModal';
import OptimizationModal from '../components/OptimizationModal';
import Loader from '../components/Loader';
import { useProMode } from '../hooks/useProMode';
import AIChat from '../components/AIChat';
import AITestCases from '../components/AITestCases';
import CodeReport from '../components/CodeReport';
import AIChatAssistant from '../components/AIChatAssistant';
import { set } from 'mongoose';
import { useSocket } from '@/hooks/SocketContext';
import BattleEndModal from '@/components/BattleEndModal';
import useBattleStore from '@/store/battleStore';
import { Timer } from 'lucide-react';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

const PageContainer = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  margin-top: 2.7rem;
`;

const LeftPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #f0f4f8;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f0f4f8;
  background: #494e51;
  width: min-content;
  border-radius: 8px;
`;

const ResultsPanel = styled.div`
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const AIFeaturesContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${props => props.active ? '#fff' : '#f5f5f5'};
  cursor: pointer;
  flex: 1;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#fff' : '#e0e0e0'};
  }
`;

const TabContent = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
`

const BattleProblemPage = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { problemId, roomId } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [testResults, setTestResults] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [showCaseModal, setShowCaseModal] = useState(false);
    const [mongoUser, setMongoUser] = useState(null);
    const [battleResult, setBattleResult] = useState(null);
    const [isProMode] = useProMode();
    const { socket, isConnected, reconnect } = useSocket();
    const [showEndModal, setShowEndModal] = useState(false);
    const { timeleft } = useBattleStore();
    const navigate = useNavigate();

    console.log('Problem id is:', problemId);

    const { user, isAuthenticated } = useAuth0();

    const formatTime = (time) => {
        return `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
    };

    const handleBattleEnd = useCallback((data) => {
        console.log('Battle ended:', data);
        setBattleResult(data);
        setShowEndModal(true);
        setTimeout(() => {
            navigate('/');
        }, 5000);
    }, [navigate]);

    useEffect(() => {
        if (!socket || !isConnected) {
            console.log('Socket not connected, attempting to reconnect...');
            reconnect();
            return;
        }
        socket.emit('joinRoom', roomId);
        socket.on('battleEnd', handleBattleEnd);

        return () => {
            console.log('Leaving room:', roomId);
            socket.emit('leaveRoom', roomId);
            socket.off('battleEnd', handleBattleEnd);
        }
    }, [roomId, socket, isConnected, reconnect]);
    const handleCloseModal = () => {
        setShowEndModal(false);
        navigate('/');
    }
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

    const formatTextWithNewlines = (text) => {
        return text.split('\\n').join('\n');
    };

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
                'x-rapidapi-key': '2ce9d5970cmsh08984c35b4f4c34p1e1b8ejsn38b45ef1857a',
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
                'x-rapidapi-key': '2ce9d5970cmsh08984c35b4f4c34p1e1b8ejsn38b45ef1857a',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                language_id: getLanguageId(language),
                source_code: btoa(code),
                stdin: btoa(formatTextWithNewlines(testCase.input)),
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
            console.error('Could not run the testcase', error);
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
        const token = await getAccessTokenSilently();
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
            const res = await api.post('/api/battlesubmissions', { user: mongoUser, problemId, code: encodedCode, language, status: allPassed ? 'ACCEPTED' : 'REJECTED', roomId });
            console.log('Successfully saved submission', res);

            // if (allPassed) {
            //     const analysisResponse = await api.post('/api/submissions/analyze', {
            //         submissionId: res.data.submission.submissionId,
            //         code: encodedCode,
            //         language,
            //         user: res.data.submission.user
            //     })
            //     console.log('Analysis Respone', analysisResponse);
            //     if (analysisResponse.data.canBeOptimized) {
            //         setOptimizationSuggestions(analysisResponse.data.suggestions);
            //         setShowOptimizationModal(true);
            //     }
            // }
        } catch (error) {
            console.error('Error saving battle submission:', error.response ? error.response.data : error.message);
        } finally {
            setIsRunning(false);
        }
    };

    const closeSuccessModal = () => {
        setShowCaseModal(false);
    }

    if (!problem) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <TimerContainer>
                <Timer size={24} />
                Time Remaining: {formatTime(timeleft)}
            </TimerContainer>
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
            {showEndModal && (
                <BattleEndModal winner={battleResult.winner} onClose={handleCloseModal} showEndModal={showEndModal} />
            )}
        </>
    )
}

export default BattleProblemPage
