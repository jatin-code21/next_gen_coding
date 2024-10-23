import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const BattleEndModal = ({ winner, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Battle Ended</h2>
        <p>Winner: {winner}</p>
        <p>Redirecting to home page in 5 seconds...</p>
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BattleEndModal;