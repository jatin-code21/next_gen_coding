import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { CheckCircle, Code, Award, Activity, Users, Zap, User, LogOut } from 'lucide-react'
import { useProMode } from '../hooks/useProMode';

const Navbaar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const Logo = styled(Link)`
  color: #4a90e2;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    color: #4a90e2;
  }
`

const Button = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #3a7bd5;
  }
`

const NavButtonContainer = styled.div`
  display: flex;
`

const ProModeSwitch = styled.button`
  background-color: ${props => props.isProMode ? '#4a90e2' : '#f0f4f8'};
  color: ${props => props.isProMode ? 'white' : '#333'};
  border: none;
  padding: 0.7rem;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${props => props.isProMode ? '#3a7bd5' : '#e0e7ff'};
  }
`

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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const AuthButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: #3a7bd5;
  }
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const UserName = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    color: #4a90e2;
  }
`

export default function Navbar() {
    const [isopen, setisopen] = React.useState(false);
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
    const [isProMode, setIsProMode] = useProMode();
    const [showProConfirmModal, setShowProConfirmModal] = useState(false);

    const toggleMenu = () => {
        setisopen(!isopen);
    };

    const handleLogin = () => {
        loginWithRedirect();
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        logout({ returnTo: window.location.origin });
    };

    const handleProModeToggle = () => {
        if (!isProMode) {
            setShowProConfirmModal(true);
        } else {
            setIsProMode(false);
            // setting this state to the localstorage as well (can store at the backend also)
            localStorage.setItem('isProMode', 'false');
        }
    }

    const confirmProMode = () => {
        setIsProMode(true);
        localStorage.setItem('isProMode', 'true');
        setShowProConfirmModal(false);
    }
    return (
        <Navbaar>
            <Logo to='/'>NextGen Coding</Logo>
            <NavLinks>
                <NavLink to="/"><Users size={18} /> About Us</NavLink>
                <NavLink to="/"><Activity size={18} /> Activities</NavLink>
                <NavLink to="/problems"><Code size={18} /> Problems</NavLink>
                <NavLink to="/"><Award size={18} /> Leaderboard</NavLink>
            </NavLinks>
            <AuthSection>
                <ProModeSwitch
                    onClick={handleProModeToggle}
                    isProMode={isProMode}
                    aria-label={isProMode ? "Disable Pro Mode" : "Enable Pro Mode"}
                >
                    <Zap size={18} />
                    {isProMode ? ' Pro' : ' Normal'}
                </ProModeSwitch>
                {isAuthenticated ? (
                    <UserProfile>
                        <UserName to="/profile">
                            <User size={18} />
                            {user.name}
                        </UserName>
                        <AuthButton onClick={handleLogout}>
                            <LogOut size={18} />
                            Logout
                        </AuthButton>
                    </UserProfile>
                ) : (
                    <AuthButton onClick={handleLogin}>
                        <User size={18} />
                        Login
                    </AuthButton>
                )}
            </AuthSection>
            {showProConfirmModal && (
                <ModalOverlay>
                    <ModalContent>
                        <h2>Switch to Pro Mode?</h2>
                        <p>Are you sure you want to switch to Pro Mode?</p>
                        <ModalButton primary onClick={confirmProMode}>Yes</ModalButton>
                        <ModalButton onClick={() => setShowProConfirmModal(false)}>No</ModalButton>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Navbaar>
    )

}