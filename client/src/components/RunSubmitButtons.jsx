import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f0f0f0;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const RunButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
`;

const SubmitButton = styled(Button)`
  background-color: #2196F3;
  color: white;
`;

const RunSubmitButtons = ({onRun, onSubmit}) => {
    return (
        <>
            <ButtonContainer>
                <RunButton onClick={onRun}>Run</RunButton>
                <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
            </ButtonContainer>
        </>
    )
}

export default RunSubmitButtons
