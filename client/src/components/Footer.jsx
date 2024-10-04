import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 3rem 5%;
  display: flex;
  justify-content: space-between;
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FooterTitle = styled.h4`
  color: #4a90e2;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`

const FooterLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
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

const Footerr = () => {
    return (
        <>
            <Footer>
                <FooterSection>
                    <FooterTitle>Contact Us</FooterTitle>
                    <FooterLink href="mailto:info@nextgencoding.com">info@nextgencoding.com</FooterLink>
                    <p>123 Street, Pune, Maharashtra, India</p>
                </FooterSection>
                <FooterSection>
                    <FooterTitle>Legal</FooterTitle>
                    <FooterLink href="#">Terms of Service</FooterLink>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                </FooterSection>
                <FooterSection>
                    <FooterTitle>Feedback</FooterTitle>
                    <p>We'd love to hear from you!</p>
                    <Button>Send Feedback</Button>
                </FooterSection>
            </Footer>
        </>
    )
}

export default Footerr
