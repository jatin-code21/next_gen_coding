// components/OptimizationModal/OptimizationModal.js
import React from 'react';
import styled from 'styled-components';
import Modal from './Modal'
import SuggestionItem from './SuggestionItem';

const ModalContent = styled.div`
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
`;

const ModalHeader = styled.h2`
  color: #333;
  margin-bottom: 16px;
  font-size: 24px;
`;

const ModalDescription = styled.p`
  color: #666;
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;

const OptimizationModal = ({ isOpen, onClose, suggestions }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Code Report</ModalHeader>
                <ModalDescription>
                    Your code has been accepted, and below is the detailed report generated for your code.
                </ModalDescription>
                {suggestions.map((suggestion, index) => (
                    <SuggestionItem key={index} suggestion={suggestion} />
                ))}
                <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalContent>
        </Modal>
    );
};

export default OptimizationModal;