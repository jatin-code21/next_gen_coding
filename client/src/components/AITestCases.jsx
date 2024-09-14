import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const AITestCasesContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`;

const GenerateButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const TestCaseList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TestCaseItem = styled.li`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
`;

const AITestCases = ({ problemId }) => {
    const [testCases, setTestCases] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const generateTestCases = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/api/aitestcases/generate-test-cases/${problemId}`);
            setTestCases(response.data.testCases);
        } catch (error) {
            console.error('Error generating test cases:', error);
        }
        setIsLoading(false);
    };

    return (
        <AITestCasesContainer>
            <h3>AI-Generated Test Cases</h3>
            <GenerateButton onClick={generateTestCases} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Test Cases'}
            </GenerateButton>
            {testCases.length > 0 && (
                <TestCaseList>
                    {testCases.map((testCase, index) => (
                        <TestCaseItem key={index}>{testCase}</TestCaseItem>
                    ))}
                </TestCaseList>
            )}
        </AITestCasesContainer>
    );
};

export default AITestCases;