const User = require('../models/User');
const mongoose = require('mongoose')

const createUser = async (req, res) => {
    // console.log('User Body sent', req.body);
    // console.log('User requested',req.user);
    const {sub, email, name} = req.body; // here sub means the subject whcih is basically the unique id for the user
    try{
        const checkUser = await User.findOne({email});
        if (checkUser)
        {
            return res.status(200).json({message: 'User already exist in the database'})
        }
        const webhookUrl = `http://localhost:5173/webhooks/${sub}`;
        let user = new User({sub, email, name, webhookUrl});
        await user.save();
        return res.status(200).json(user);
    } catch (error){
        res.status(500).json({error: 'Error in creating the user'});
    }
}

module.exports = {createUser};