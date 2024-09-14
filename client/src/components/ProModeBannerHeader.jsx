import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ProModeBanner = styled.div`
  background: linear-gradient(135deg, #6366F1, #A855F7, #EC4899);
  color: white;
  padding: 30px;
  margin: 50px 0;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &::before {
    content: '';
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%);
    transform: rotate(30deg);
  }
`;

const BannerTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const BannerDescription = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const BannerButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #6366F1;
  padding: 12px 24px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    background-color: #F3F4F6;
  }
`;

const ProModeBannerHeader = () => {
  return (
    <ProModeBanner>
      <BannerTitle>Unlock Pro Mode - Now Available!</BannerTitle>
      <BannerDescription>
        Enhance your coding skills with advanced features, AI-powered analysis, and AI chat system for questions
      </BannerDescription>
      <BannerButton to="/pro-features">Explore Pro Features</BannerButton>
    </ProModeBanner>
  )
}

export default ProModeBannerHeader
