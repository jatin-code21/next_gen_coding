const axios = require('axios')

const notifyUser = async (webhookUrl,submission) => {
    try{
        const response = await axios.post(webhookUrl, submission);
        return response.data;
    } catch (error){
        console.log('Error notifying the user', error);
        throw error;
    }
}