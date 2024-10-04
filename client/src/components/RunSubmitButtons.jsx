import { Play, Send } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 8px;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
`

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
`

const RunButton = styled(Button)`
  background-color: #48bb78;
  &:hover {
    background-color: #38a169;
  }
`

const SubmitButton = styled(Button)`
  background-color: #4a90e2;
  &:hover {
    background-color: #3182ce;
  }
`
// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   padding: 10px;
//   background-color: #f0f0f0;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   margin-left: 10px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-weight: bold;
//   transition: background-color 0.3s;
//   opacity: ${props => props.disabled ? 0.5 : 1};
//   pointer-events: ${props => props.disabled ? 'none' : 'auto'};

//   &:hover {
//     opacity: 0.8;
//   }
// `;

// const RunButton = styled(Button)`
//   background-color: #4CAF50;
//   color: white;
// `;

// const SubmitButton = styled(Button)`
//   background-color: #2196F3;
//   color: white;
// `;

const RunSubmitButtons = ({onRun, onSubmit, isRunning}) => {
    return (
        <>
            <ButtonContainer>
                <RunButton onClick={onRun} disabled={isRunning}><Play/>{isRunning ? 'Running...' : 'Run'}</RunButton>
                <SubmitButton onClick={onSubmit} disabled={isRunning}><Send/>Submit</SubmitButton>
            </ButtonContainer>
        </>
    )
}

export default RunSubmitButtons
