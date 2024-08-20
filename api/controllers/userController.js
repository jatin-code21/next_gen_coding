const User = require('../models/User');
const mongoose = require('mongoose')

const createUser = async (req, res) => {
    // console.log('User Body sent', req.body);
    // console.log('User requested',req.user);
    const {sub, email, name} = req.body; // here sub means the subject whcih is basically the unique id for the user
    try{
        const checkUser = await User.findOne({sub});
        if (checkUser)
        {
            return res.status(200).json({message: 'User already exist in the database'})
        }
        const webhookUrl = `http://localhost:5173/webhooks/${sub}`;
        let user = new User({sub, email, name, webhookUrl});
        await user.save();
        return res.status(200).json(user);
    } catch (error){
        // console.error('Error creating the user', error.stack || error);
        res.status(500).json({error: 'Error in creating the user'});
    }
}

const getCurrentUser = async (req, res) => {
    const {auth0Id} = req.params;
    try{
        const user = await User.findOne({sub: auth0Id});
        if (!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error){
        res.status(500).json({message: 'Server Error', error});
    }
}

module.exports = {createUser, getCurrentUser};