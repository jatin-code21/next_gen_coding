import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
  })

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 40px 0;
  font-size: 14px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const FooterSection = styled.div`
  flex-basis: 25%;
  padding: 0 20px;

  h3 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  p {
    line-height: 1.5;
    margin-bottom: 10px;
  }

  a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: #fff;
    }
  }
`;

const FeedbackForm = styled.form`
  background-color: #444;
  border-radius: 8px;
  padding: 20px;
  width: 300px;

  input,
  textarea {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    background-color: #555;
    color: #fff;
  }

  button {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const Footer = () => {
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
            alert('Feedback submitted successfully!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again later.');
        }
    };

    return (
        <FooterContainer>
            <FooterContent>
                <FooterSection>
                    <h3>About Us</h3>
                    <p>
                        We are a team of developers passionate about creating amazing
                        applications.
                    </p>
                </FooterSection>
                <FooterSection>
                    <h3>Contact Us</h3>
                    <p>
                        Email: next_gen_coding_support@gmail.com
                        <br />
                        Phone: 123-456-7890
                    </p>
                </FooterSection>
                <FooterSection>
                    <h3>Legal</h3>
                    <p>
                        <a href="#">Terms of Service</a>
                        <br />
                        <a href="#">Privacy Policy</a>
                    </p>
                </FooterSection>
                <FooterSection>
                    <h3>Feedback</h3>
                    <FeedbackForm onSubmit={handleFeedbackSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="feedback"
                            placeholder="Your feedback"
                            value={formData.feedback}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Submit</button>
                    </FeedbackForm>
                </FooterSection>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;