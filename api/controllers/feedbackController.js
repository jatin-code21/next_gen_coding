const express = require('express');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'project.jatin21@gmail.com',
        pass: 'bktt qbto ngva vsdy',
    },
});

const sendFeedback = async (req, res) => {
    const { name, email, feedback } = req.body;
    // console.log(email);
    const mailOptions = {
        from: email,
        to: 'project.jatin21@gmail.com',
        subject: 'New Feedback',
        text: `
          Name: ${name}
          Email: ${email}
          Feedback: ${feedback}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error submitting feedback' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Feedback submitted successfully' });
        }
    });
}

module.exports = {sendFeedback};