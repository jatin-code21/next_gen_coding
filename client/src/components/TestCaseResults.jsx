import React, { useState } from 'react';
import styled, {keyframes} from 'styled-components';
import { FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from 'react-icons/fa'
import { Check, X, Loader } from 'lucide-react';

const ResultsContainer = styled.div`
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 15px;
  max-height: 200px;
  overflow-y: auto;
`;

// const TestCaseResult = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
//   padding: 10px;
//   border-radius: 5px;
//   background-color: white;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

// // const TestCaseResult = styled.div`
// //   display: flex;
// //   align-items: center;
// //   margin-bottom: 10px;
// //   padding: 10px;
// //   border-radius: 5px;
// //   background-color: white;
// //   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// //   transition: all 0.3s ease;

// //   &:hover {
// //     transform: translateY(-2px);
// //     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// //   }
// // `;

// const StatusIcon = styled.div`
//   margin-right: 10px;
//   font-size: 1.2em;
// `;

// const TestCaseInfo = styled.div`
//   flex-grow: 1;
// `;

// const TestCaseName = styled.div`
//   font-weight: bold;
//   margin-bottom: 5px;
// `;

// const TestCaseStatus = styled.div`
//   font-size: 0.9em;
//   color: ${props => {
//         switch (props.status) {
//             case 'accepted': return '#28a745';
//             case 'failed': return '#dc3545';
//             default: return '#ffc107';
//         }
//     }};
// `;

// const getStatusIcon = (status) => {
//     switch (status) {
//         case 'Passed':
//             return <FaCheckCircle color="#28a745" />;
//         case 'Failed':
//             return <FaTimesCircle color="#dc3545" />;
//         case 'Running':
//             return <FaSpinner color="#ffc107" />;
//         default:
//             return <FaClock color="#ffc107" />;
//     }
// };

const TestCaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TestCase = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 15px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  ${({ status }) => {
        switch (status) {
            case 'Passed':
                return 'background-color: #e8f5e9;'
            case 'Failed':
                return 'background-color: #ffebee;'
            default:
                return ''
        }
    }}
`

const TestCaseTitle = styled.span`
  font-weight: 600;
  margin-right: 10px;
`

const TestCaseStatus = styled.span`
  font-weight: 500;
  margin-left: auto;
  ${({ status }) => {
        switch (status) {
            case 'passed':
                return 'color: #4caf50;'
            case 'failed':
                return 'color: #f44336;'
            default:
                return 'color: #757575;'
        }
    }}
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingIcon = styled(Loader)`
  animation: ${spin} 1s linear infinite;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
`
const getStatusIcon = (status) => {
    switch (status) {
        case 'Passed':
            return <Check color="#4caf50" />
        case 'Failed':
            return <X color="#f44336" />
        case 'Running':
            return <LoadingIcon color="#757575" size={18} />
        default:
            return null
    }
}

const TestCaseResults = ({ results }) => {
    const [isRunning, setIsRunning] = useState(false)
    return (
        <TestCaseList>
            {results.map((result, index) => (
                <TestCase key={index} status={result.status}>
                    <IconWrapper>{getStatusIcon(result.status)}</IconWrapper>
                    <TestCaseTitle>Test Case {index + 1}</TestCaseTitle>
                    <TestCaseStatus status={result.status}>{result.status === 'Running' ? 'Running' : result.status}</TestCaseStatus>
                </TestCase>
            ))}
        </TestCaseList>
    )
}

// const TestCaseResults = ({ results }) => {
//     return (
//         <>
//             <ResultsContainer>
//                 {results.map((result, index) => (
//                     <TestCaseResult key={index}>
//                         <StatusIcon>{getStatusIcon(result.status)}</StatusIcon>
//                         <TestCaseInfo>
//                             <TestCaseName>Test Case {index + 1}</TestCaseName>
//                             <TestCaseStatus status={result.status}>
//                                 {result.status}
//                             </TestCaseStatus>
//                         </TestCaseInfo>
//                     </TestCaseResult>
//                 ))}
//             </ResultsContainer>
//         </>
//     )
// }

export default TestCaseResults
