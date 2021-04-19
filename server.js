const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/user');
const withAuth = require('./middleware');
const cors = require('cors')
const crypto = require('crypto');
var nodemailer = require("nodemailer");
const passport = require('passport');
const app = express();
const secret = 'mysecretsshhh';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));


const mongo_uri = 'mongodb+srv://dbUsers:1234@users.zo4pc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("connected")
  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
}).catch((err) => {
  console.log("error while connecting to db..")
})



function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


app.post("/register", (req, res) => {
  console.log(req.body)
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const email = req.body.email
  const role = req.body.role
  const post = req.body.post
  if (!first_name || !last_name || !email || !post) {
    res.status(400).json({ error: "you are missing some fields" })
  }
  if (role != "admin" && role != "user") {
    res.status(400).json({ error: "you can only add user or admin" })
  }
  if (!validateEmail(email)) {
    res.status(400).json({ error: "invalid email format" })
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(400).json({ error: "email already used" })
    }
  }).catch(err => {
    res.json({ err: "error 1" })
  })
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
    phone_number: req.body.phone_number,
    pole: req.body.pole,
    post: req.body.post,
    password: req.body.password,
    picture: req.body.picture,
    role: req.body.role,
  })

  newUser.save().then((result) => {
    res.status(201).send(JSON.stringify(result))
  }).catch(err => {
    console.log(err)
    res.send(JSON.stringify({ error: "Error adding this to the db" }))
  })
})


app.post('/login', function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .json({ auth: false, message: "Please enter all required fields." })
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      const passwordCorrect = (password == user.password)

      if (passwordCorrect) {
        const payload = { email };
        const token = jwt.sign(payload, secret, {
          expiresIn: '1h'
        });
        console.log("done")
        res.json({ token: token, auth: true, id:user._id, email:user.email });
      }
      else {
        res.json({ auth: false, message: 'The password you’ve entered is incorrect' });
      }
    }
    else {
      res.json({ auth: false, message: "The email you entered isn’t connected to an account." })
    }
  }).catch(err => {
    res.json({ message: "error 1" })
  })
});


app.get("/users", (req, res) => {
  User.find().then((result) => {
    res.send(JSON.stringify(result))
  }).catch((err) => {
    console.log(err)
  })
})

app.get('/checkToken', withAuth, function (req, res) {
  res.sendStatus(200);
});


app.post('/reset', function (req, res) {
  User.findOne({ email: req.body.email }, function (error, userData) {
    if (userData == null) {
      return res.status(404).json({
        success: false,
        msg: "Email is not register",
      });
    }
    var transporter = nodemailer.createTransport({

      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b3b235f452f137",
        pass: "4070626b73b159"
      }
    });
    var currentDateTime = new Date();
    var mailOptions = {
      from: 'bochramzid@gmail.com',
      to: req.body.email,
      subject: 'Password Reset',
      html: "<h1>Welcome To Daily Task Report ! </h1><p>\
          <h3>Hello "+ userData.name + "</h3>\
          If You are requested to reset your password then click on below link<br/>\
          <a href='http://localhost:3000/change-password/"+ currentDateTime + "+++" + userData.email + "'>Click On This Link</a>\
          </p>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        User.updateOne({ email: userData.email }, {
          token: currentDateTime,

        }, { multi: true }, function (err, affected, resp) {
          return res.status(200).json({
            success: false,
            msg: info.response,
            userlist: resp
          });
        })
      }
    });
  })
});

app.put('/update/:id',withAuth, function (req, res) {
  User.findByIdAndUpdate(req.params.id, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number
  }).then((result) => {
    res.send(JSON.stringify(result))
  }).catch((err) => {
    console.log(err)
  })
})



app.get("/:id",(req,res)=>{
  const user_id = req.params.id 
  User.findById(user_id).then((result)=>{
      res.send(JSON.stringify(result))
  }).catch((err)=>{
      console.log(err)
  })
})

app.put("/:id",withAuth,(req,res)=>{
  
  User.findByIdAndUpdate(req.params.id, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      phone_number: req.body.phone_number,
      pole: req.body.pole,
      post: req.body.post,
      password: req.body.password,
      picture: req.body.picture,
      role: req.body.role,
  }).then((result)=>{
      res.json({result:result})
  }).catch((err)=>{
      console.log(err)
  })
})



  
 
const port = 4000 || process.env.PORT
