import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const FeatureTitle = styled.h3`
  color: #007bff;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  color: #666;
`;

const CTAButton = styled.button`
  display: block;
  width: 200px;
  margin: 40px auto 0;
  padding: 15px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const ProFeatures = () => {
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();

    const handleCTA = () => {
        loginWithRedirect({
            appState: { returnTo: '/problems' }
        });
    };

    return (
        <PageContainer>
            <Header>Unlock the Power of Pro Mode</Header>
            <FeatureList>
                <FeatureItem>
                    <FeatureTitle>Advanced Problem Sets</FeatureTitle>
                    <FeatureDescription>
                        Access a curated collection of challenging problems designed to push your coding skills to the next level.
                    </FeatureDescription>
                </FeatureItem>
                <FeatureItem>
                    <FeatureTitle>AI-Powered Code Analysis</FeatureTitle>
                    <FeatureDescription>
                        Get instant feedback on your code quality, efficiency, and potential improvements with our advanced AI analysis.
                    </FeatureDescription>
                </FeatureItem>
                <FeatureItem>
                    <FeatureTitle>Personalized Learning Path</FeatureTitle>
                    <FeatureDescription>
                        Enjoy a tailored learning experience that adapts to your skill level and learning pace.
                    </FeatureDescription>
                </FeatureItem>
                <FeatureItem>
                    <FeatureTitle>Real-world Project Simulations</FeatureTitle>
                    <FeatureDescription>
                        Work on simulated projects that mimic real-world scenarios, preparing you for professional coding challenges.
                    </FeatureDescription>
                </FeatureItem>
            </FeatureList>
            <CTAButton onClick={handleCTA}>
                Try Pro Mode Now - It's Free!
            </CTAButton>
        </PageContainer>
    );
};

export default ProFeatures;