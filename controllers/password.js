const User = require('../models/user');
const Sib = require('sib-api-v3-sdk');
require('dotenv').config()
const FPR = require('../models/forgotPasswordRequests');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');

exports.forgotPassword = async (req, res, next) => {
    try{
        const user = await User.findOne({ where: {email: req.body.email}})
        if(user){
            const passwordResetId = uuidv4();
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
                htmlContent: `<a href="http://localhost:3000/resetPassword/${passwordResetId}">Reset Password</a>`
            })

            const resetPasswordRequest = await FPR.create({
                id: passwordResetId,
                isActive: true,
                userId: user.id
            })
    
            console.log('Link send successfully');
            res.status(200).json(result);
        }
    }
    catch(err){
        console.log('something went wrong');
        console.log(err);
    }
}

exports.resetPassword = async (req, res, next) => {
    try{
        console.log('entered reset password link');
        const activeLink = await FPR.findOne({ where: {id: req.params.forgotPasswordId}});
        if(activeLink){
            const result = await activeLink.update({isActive: false});
            //console.log('entered reset password link');
            res.status(200).send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            
                <title>Reset Password</title>
            </head>
            <body>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                    <div class="card-body p-4 p-lg-5 text-black">
            
                      <form action="http://localhost:3000/updatePassword/${req.params.forgotPasswordId}" id="resetPassword" method="get" >
                        <div class="d-flex align-items-center mb-3 pb-1">
                          <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                          <span class="h1 fw-bold mb-0">Reset Password</span>
                        </div>
            
                        <!-- <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Forgot Password</h5> -->
            
                        <div class="form-outline mb-4">
                            <label class="form-label" for="email">Enter your new password</label>
                            <input type="password" id="password" name="password" class="form-control form-control-lg" />
                        </div>
            
                        <div id="errorMessage"></div>
            
                        <div class="pt-1 mb-4">
                          <button class="btn btn-dark btn-lg btn-block" type="submit">Submit</button>
                        </div>
            
                        <button class="small text-muted" id="backToLogin">Back to Login</button>
                      </form>
                    </div>
                  </div>
                  <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
            </body>
            </html>`
        )
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.updatePassword = async (req, res, next) => {
    try{
        const newPass = req.query.password;
        const resetPasswordId = req.params.resetPasswordId;

        const passreq = await FPR.findOne({ where: { id: resetPasswordId }});
        const user = await User.findOne({ where: {id: passreq.userId}});

        const hashedPass = await bcrypt.hash(newPass, 5);
        const result = await user.update({ password: hashedPass });
        console.log('password changed successfully');
        res.status(201).json({message: 'password changed successfully'});
    }
    catch(err){
        console.log(err);
    }
}

