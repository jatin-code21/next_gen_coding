import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

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

const FormContainer = styled.div`
  background-color: #2c3e50;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
`

const Title = styled.h2`
  color: #3498db;
  margin-bottom: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
`

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
`

const SubmitButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`

const SuccessMessage = styled.p`
  color: #2ecc71;
  margin-top: 10px;
`

const Footerr = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/api/feedback', formData);
      // Resetting the form after successful submission
      setFormData({ name: '', email: '', feedback: '' });
      setIsSubmitted(true);
      // alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again later.');
    }
  };
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
          <Title>We'd love to hear from you!</Title>
          <Form onSubmit={handleFeedbackSubmit}>
            <Input
              type="text"
              placeholder="Your Name"
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextArea
              placeholder="Your Feedback"
              name='feedback'
              value={formData.feedback}
              onChange={handleInputChange}
              required
            />
            <SubmitButton type="submit">Send Feedback</SubmitButton>
          </Form>
          {isSubmitted && <SuccessMessage>Thank you for your feedback!</SuccessMessage>}
        </FooterSection>
      </Footer>
    </>
  )
}

export default Footerr
