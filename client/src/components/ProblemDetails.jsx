import React from 'react';
import styled from 'styled-components';
import TestCaseDisplay from './TestCaseDisplay';

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

const ProblemDetails = ({ problem }) => {
    return (
        <>
            <DetailContainer>
                <Title>{problem.title}</Title>
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
                            <TestCaseDisplay key={index} testCase={testCase} index={index+1}/>
                        ))
                    }
                </Section>
            </DetailContainer>
        </>
    )
}

export default ProblemDetails
