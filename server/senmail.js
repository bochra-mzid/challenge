
var nodemailer = require('nodemailer');
const express = require('express')
const User = require("../../server/models/user")
var uniqid = require('uniqid');


const router = express.Router()

router.post("/sendmail",(req,resp)=>{
  const {email} = req.body
  User.findOne(email)
  .then(existingUser => {
    const pass=uniqid();

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });
    
    var mailOptions = {
      from: 'sirinha2701@gmail.com',
      to: Email ,
      subject: 'forgotten password',
      text: 'New password :' + pass
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    User.findByIdAndUpdate(existingUser._id,{
      password:pass
    })
    .then(resp => resp.send("done"))

  })
  
})



