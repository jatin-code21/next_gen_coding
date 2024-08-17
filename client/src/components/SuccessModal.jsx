// SuccessModal.js
import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: popIn 0.3s ease-out;

  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const SuccessIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  color: #28a745;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  color: #333;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const SuccessModal = ({ onClose }) => {
    return (
        <ModalBackdrop onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <SuccessIcon />
                <Title>Congratulations!</Title>
                <Message>Your solution has been accepted.</Message>
                <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalContent>
        </ModalBackdrop>
    );
};

export default SuccessModal;