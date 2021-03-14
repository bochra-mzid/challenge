
const express = require('express');
const router = express.Router();
const User = require("../models/user")

const auth = require('../middleware/auth');


router.get("/:id",(req,res)=>{
    const user_id = req.params.id 
    User.findById(user_id).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

router.put("/:id",auth,(req,res)=>{
    
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
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router