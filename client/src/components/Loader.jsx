import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
    0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height */
  background-color: #f0f0f0; /* Light background */
`;

// Styled dots for the loader
const Dot = styled.div`
  width: 15px;
  height: 15px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: #3498db; /* Blue color */
  animation: ${bounce} 0.6s infinite alternate;
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

// Styled text for loading message
const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 18px;
  color: #333; /* Dark text color */
`;

const Loader = () => {
    return (
        <LoaderContainer>
            <div style={{ display: 'flex' }}>
                <Dot />
                <Dot />
                <Dot />
            </div>
            <LoadingText>Loading...</LoadingText>
        </LoaderContainer>
    )
}

export default Loader
