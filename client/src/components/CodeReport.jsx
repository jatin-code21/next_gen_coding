import { Section } from 'lucide-react'
import React from 'react'
import styled from 'styled-components'
import { X } from 'lucide-react'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 24px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`

const ReportSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 20px;
`

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #4a4a4a;
  margin-top: 0;
  margin-bottom: 12px;
`

const SectionContent = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`

const SubmitMessage = styled.p`
  font-size: 16px;
  color: #4a4a4a;
  margin-bottom: 20px;
`

const CloseModalButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`

const CodeReport = ({ isOpen, onClose, suggestions }) => {
    if (!isOpen) return null;
    const titles = {
        0: 'Time Complexity',
        1: 'Space Complexity',
        2: 'Can be Optimized'
    }
    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Code Report</ModalTitle>
                    <CloseButton onClick={onClose} aria-label="Close report">
                        <X size={24} />
                    </CloseButton>
                </ModalHeader>
                <SubmitMessage>
                    Your code has been accepted, and below is the detailed report generated for your code.
                </SubmitMessage>
                {suggestions.map((suggestion, index) => (
                    <ReportSection key={index}>
                        <SectionTitle>{titles[index]}</SectionTitle>
                        <SectionContent>{suggestion}</SectionContent>
                    </ReportSection>
                ))}

                {/* <ReportSection>
                    <SectionTitle>Space Complexity:</SectionTitle>
                    <SectionContent>
                        The space complexity of the given code is O(1), which means it uses a constant amount of space.
                        This is because the code only uses a fixed amount of memory to store the variables `a` and `b`, and the output.
                    </SectionContent>
                </ReportSection>
                <ReportSection>
                    <SectionTitle>Possible Optimizations:</SectionTitle>
                    <SectionContent>
                        The current implementation is already optimal for the given problem.
                        It uses constant time and space, which is the best possible complexity for a simple addition operation.
                        No further optimizations are necessary for this specific task.
                    </SectionContent>
                </ReportSection> */}
                <CloseModalButton onClick={onClose}>Close</CloseModalButton>
            </ModalContent>
        </ModalOverlay>
    )
}

export default CodeReport
