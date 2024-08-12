import React from 'react';
import styled from 'styled-components';

const TestCaseContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const TestCaseTitle = styled.h3`
  font-size: 1em;
  margin-bottom: 5px;
`;

const TestCaseContent = styled.pre`
  background-color: #e0e0e0;
  padding: 5px;
  border-radius: 2px;
`;

const TestCaseDisplay = ({ testCase, index }) => {
    return (
        <>
            <TestCaseContainer>
                <TestCaseTitle>Test Case {index}</TestCaseTitle>
                <TestCaseContent>Input: {testCase.input}</TestCaseContent>
                <TestCaseContent>Expected Output: {testCase.expectedOutput}</TestCaseContent>
            </TestCaseContainer>
        </>
    )
}

export default TestCaseDisplay
