import React, { useState } from 'react';
import styled from 'styled-components';
import TestCaseDisplay from './TestCaseDisplay';
import { FaLightbulb } from 'react-icons/fa';

const DetailContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #444;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const BulbContainer = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
`

const Tooltip = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  width: 300px; // Increased width
  background-color: #555;
  color: #fff;
  text-align: left; // Changed to left align for better readability
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: 150%; // Adjusted to prevent overlapping with the bulb
  left: 50%;
  transform: translateX(-50%); // Center the tooltip
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.9rem; // Smaller font size
  line-height: 1.4; // Improved line height for readability

  ${BulbContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #555 transparent;
  }
`;

const ProblemDetails = ({ problem }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    return (
        <>
            <DetailContainer>
                <Title>
                    {problem.title}
                    <BulbContainer
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <FaLightbulb color="#FFD700" />
                        <Tooltip show={showTooltip}>{problem.realWorldUse}</Tooltip>
                    </BulbContainer>
                </Title>
                <Section>
                    <SectionTitle>Description</SectionTitle>
                    <p>{problem.description}</p>
                </Section>
                <Section>
                    <SectionTitle>Input Format</SectionTitle>
                    <p>{problem.inputFormat}</p>
                </Section>
                <Section>
                    <SectionTitle>Output Format</SectionTitle>
                    <p>{problem.outputFormat}</p>
                </Section>
                <Section>
                    <SectionTitle>Constraints</SectionTitle>
                    <p>{problem.constraints}</p>
                </Section>
                <Section>
                    <SectionTitle>Sample Test Cases:</SectionTitle>
                    {
                        problem.testCases.filter(testCase => !testCase.isHidden)
                            .map((testCase, index) => (
                                <TestCaseDisplay key={index} testCase={testCase} index={index + 1} />
                            ))
                    }
                </Section>
            </DetailContainer>
        </>
    )
}

export default ProblemDetails
