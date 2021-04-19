const mongoose=require('mongoose')
const Schema = mongoose.Schema



const UserSchema = new Schema({
    first_name : {type:String,required:true},
    last_name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    date_of_birth : {type:Date},
    phone_number : {type:Number},
    pole : {type:String},
    post : {type:String,required:true},
    password : {type:String},
    picture: {data : Buffer, contentType: String},
    role: {type:String},
    resetToken: {type: String},
    expireToken: {type: Date},
},{timestamps : true})


const User = mongoose.model('user',UserSchema)
module.exports = User