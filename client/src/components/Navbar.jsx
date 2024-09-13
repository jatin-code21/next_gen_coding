import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Switch from '@mui/material/Switch';
import { useProMode } from '../hooks/useProMode';

const Nav = styled.nav`
  background: linear-gradient(to right, #2c3e50, #3498db);
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
`;

const Logo = styled(Link)`
  color: #ecf0f1;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: #f39c12;
    transform: translateY(-2px);
  }
`;

const AuthButton = styled.button`
  background-color: #e74c3c;
  color: #ecf0f1;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled(Link)`
  color: #ecf0f1;
  margin-right: 1rem;
  text-decoration: none;
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HamburgerLine = styled.span`
  height: 2px;
  width: 25px;
  background-color: #ecf0f1;
  margin: 4px 0;
  transition: all 0.3s ease;
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, #2c3e50, #3498db);
  padding: 1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: ${({ isopen }) => (isopen ? 'flex' : 'none')};
  }
`;

const MobileNavLink = styled(NavLink)`
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(236, 240, 241, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const ProModeSwitch = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

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

const ProModePromo = styled.div`
  background: linear-gradient(45deg, #FFA500, #FF6347);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }
`;

const Navbar = () => {
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
    <Nav>
      <NavContainer>
        <Logo to="/">Next Gen Coding</Logo>
        <NavLinks>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/activities">Activity</NavLink>
          <NavLink to="/problems">Problems</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          {isAuthenticated && (
            <ProModeSwitch>
              <span>Pro Mode</span>
              <Switch
                checked={isProMode}
                onChange={handleProModeToggle}
                color='secondary'
              />
            </ProModeSwitch>
          )}
          {isAuthenticated ? (
            <UserProfile>
              <UserName to="/profile">{user.name}</UserName>
              <AuthButton onClick={handleLogout}>Logout</AuthButton>
            </UserProfile>
          ) : (
            <AuthButton onClick={handleLogin}>Login</AuthButton>
          )}
        </NavLinks>
        <HamburgerMenu onClick={toggleMenu}>
          <HamburgerLine />
          <HamburgerLine />
          <HamburgerLine />
        </HamburgerMenu>
      </NavContainer>
      <MobileMenu isopen={isopen}>
        <MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink>
        <MobileNavLink to="/activities" onClick={toggleMenu}>Activity</MobileNavLink>
        <MobileNavLink to="/problems" onClick={toggleMenu}>Problems</MobileNavLink>
        <MobileNavLink to="/leaderboard" onClick={toggleMenu}>Leaderboard</MobileNavLink>
        {isAuthenticated ? (
          <>
            <MobileNavLink as="span" onClick={toggleMenu}>{user.name}</MobileNavLink>
            <MobileNavLink as="button" onClick={() => { handleLogout(); toggleMenu(); }}>Logout</MobileNavLink>
          </>
        ) : (
          <MobileNavLink as="button" onClick={() => { handleLogin(); toggleMenu(); }}>Login</MobileNavLink>
        )}
      </MobileMenu>
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
    </Nav>
  );
};

export default Navbar;