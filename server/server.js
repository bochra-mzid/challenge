  
const express = require("express")
const app = express()

const uri = "mongodb+srv://dbUsers:1234@users.zo4pc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const cors = require('cors')
const morgan = require("morgan")

const mongoose = require("mongoose");
const User = require("./models/user");

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(morgan('tiny'));


mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
}).catch((err)=>{
    console.log("error while connecting to db..")
})


app.use("/profile",require("./router/profile"));
app.use("/login",require("./router/login"));
app.use("/users",require("./router/users"));


const port = 5000 || process.env.PORT
