const Sib = require('sib-api-v3-sdk');
require('dotenv').config()

exports.forgotPassword = async (req, res, next) => {
    try{
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.API_KEY

        const tranEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email: 'trishalaghetiya@gmail.com',
        }

        const receivers = [
            {
                email: req.body.email
            },
        ]

        const result = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Change your password through this link',
            textContent: 'Hello Sagar this is the final email'
        })
        console.log('Link send successfully');
        res.json(result);
    }
    catch(err){
        console.log('something went wrong');
        console.log(err);
    }
}

