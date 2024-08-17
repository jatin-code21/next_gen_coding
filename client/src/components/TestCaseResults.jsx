import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from 'react-icons/fa'

const ResultsContainer = styled.div`
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 15px;
  max-height: 200px;
  overflow-y: auto;
`;

const TestCaseResult = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// const TestCaseResult = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
//   padding: 10px;
//   border-radius: 5px;
//   background-color: white;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   }
// `;

const StatusIcon = styled.div`
  margin-right: 10px;
  font-size: 1.2em;
`;

const TestCaseInfo = styled.div`
  flex-grow: 1;
`;

const TestCaseName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const TestCaseStatus = styled.div`
  font-size: 0.9em;
  color: ${props => {
        switch (props.status) {
            case 'accepted': return '#28a745';
            case 'failed': return '#dc3545';
            default: return '#ffc107';
        }
    }};
`;

const getStatusIcon = (status) => {
    switch (status) {
        case 'Passed':
            return <FaCheckCircle color="#28a745" />;
        case 'Failed':
            return <FaTimesCircle color="#dc3545" />;
        case 'Running':
            return <FaSpinner color="#ffc107" />;
        default:
            return <FaClock color="#ffc107" />;
    }
};

const TestCaseResults = ({ results }) => {
    return (
        <>
            <ResultsContainer>
                {results.map((result, index) => (
                    <TestCaseResult key={index}>
                        <StatusIcon>{getStatusIcon(result.status)}</StatusIcon>
                        <TestCaseInfo>
                            <TestCaseName>Test Case {index + 1}</TestCaseName>
                            <TestCaseStatus status={result.status}>
                                {result.status}
                            </TestCaseStatus>
                        </TestCaseInfo>
                    </TestCaseResult>
                ))}
            </ResultsContainer>
        </>
    )
}

export default TestCaseResults
