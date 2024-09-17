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

const TestCaseContent = styled.div`
  background-color: #e0e0e0;
  padding: 5px;
  border-radius: 2px;
  white-space: pre-wrap; 
  word-wrap: break-word;
`;

const formatTextWithNewlines = (text) => {
  return text.split('\\n').join('\n');
};

const TestCaseDisplay = ({ testCase, index }) => {
  return (
    <>
      <TestCaseContainer>
        <TestCaseTitle>Test Case {index}</TestCaseTitle>
        <TestCaseContent> Input:{'\n'}{formatTextWithNewlines(testCase.input)}</TestCaseContent>
        <TestCaseContent>Expected Output: {testCase.expectedOutput}</TestCaseContent>
      </TestCaseContainer>
    </>
  )
}

export default TestCaseDisplay
