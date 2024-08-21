// components/OptimizationModal/SuggestionItem.js
import React from 'react';
import styled from 'styled-components';

const SuggestionContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const SuggestionHeader = styled.p`
  font-weight: bold;
  color: #495057;
  margin-bottom: 8px;
`;

// const CodeBlock = styled.pre`
//   background-color: #f1f3f5;
//   padding: 12px;
//   border-radius: 4px;
//   overflow-x: auto;
//   font-size: 14px;
//   line-height: 1.5;
// `;
const CodeBlock = styled.pre`
  background-color: #f1f3f5;
  padding: 16px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap; /* Enables wrapping for long lines */
  word-break: break-word; /* Breaks words that are too long */
  overflow-x: auto; /* Allows horizontal scrolling if absolutely needed */
  max-width: 100%; /* Ensures the content stays within the container */
`;
const SuggestionItem = ({ suggestion }) => {
  return (
    <SuggestionContainer>
      {/* <SuggestionHeader>Line {suggestion.line}: {suggestion.message}</SuggestionHeader> */}
      <CodeBlock>{suggestion}</CodeBlock>
    </SuggestionContainer>
  );
};

export default SuggestionItem;