import React, { userState, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ProblemDetails from '../components/ProblemDetails';
import CodeEditor from '../components/CodeEditor';
import RunSubmitButtons from '../components/RunSubmitButtons';
import Navbar from '../components/Navbar';
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

const ProblemPage = () => {
    const { problemId } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    console.log('Problem id is:', problemId);
    
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

    const handleRunCode = async () => {
        // Implement code running logic using Judge0 API
        console.log('Running code...');
    };

    const handleSubmitCode = async () => {
        // Implement code submission logic
        console.log('Submitting code...');
    };

    if (!problem) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar/>
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
                    />
                </RightPanel>
            </PageContainer>
        </>
    )
}

export default ProblemPage
