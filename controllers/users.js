
import * as dotenv from 'dotenv';
import User from '../model/users.js';
import RefreshToken from '../model/refreshToken.js'
import bcrypt, { compare } from "bcrypt";
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();
export const getUsers =async (req,res) => {  
    const user1=req.body;
    console.log("user1   ",user1.user.name)
    const currentUser= await User.find({username:{$eq: user1.user.name}});
    res.send(currentUser)  
}
// get user with ID
export const getUser = (req,res) =>{
    const {id}=req.params;
    User.findById(id).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
}
// Create users with hashed password
export const createUser = async (req,res) => {

    const hashedPassword=await bcrypt.hash(req.body.password,10);
    console.log(hashedPassword);
    const user=new User({
        username:req.body.username,
        password:hashedPassword,
    })
    user.save().then((result) => res.send(result)).catch((err) => console.log(err))
}
// Login user and generate both access and refresh token
export const userLogin= async (req,res) => {
    let username=req.body.username
    const user1={name:username};  
    const user=await User.findOne({username:{$eq: username}});
    if (user === null){
        return res.status(200).json(`User not found`);     
    } 
    try{     
    if(await bcrypt.compare(req.body.password,user.password)){ 
        const accessToken=generateAccessToken(user1);
        const refreshToken=jsonwebtoken.sign(user1,process.env.REFRESH_TOKEN_SECRET);
        const refreshToken2=await new RefreshToken({
            token:refreshToken,
        })
        refreshToken2.save()
        res.json({accessToken:accessToken, refreshToken:refreshToken});
    }
    else{
       return res.send("not success")
    }
}
    catch{
        res.send("Error");
    }
}
// Authencate funcation and get user
export const authencateToken=async (req,res,next) => {
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    if(token === null){
        return res.sendStatus(401);
    }
    jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err){
            return res.sendStatus(403);
        }
        req.body={user};
        console.log("auth ",req.body)
        next();
    })
}
// Generate Access Token
 function generateAccessToken (user){
    return jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1800s'});
}
// Generat new Access Tokens usnig Refresh Token
export const refreshToken =(req,res) => {
    const refreshToken=req.body.token;
    console.log(`refresh token is ${refreshToken}`)
    if( refreshToken === null) return res.sendStatus(401)
    jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name:user.name})
        res.json({accessToken:accessToken})
    })
}
// Delete refreshToken Function
export const deleteToken = async (req,res) => {
    console.log('delete token')
   const deletetoken=req.body.token;
   RefreshToken.findOneAndDelete({token:deletetoken})
   .then((result) => res.send(result)).catch((err) => res.send(err))
}
// Delete User from Database
export const deleteUser = (req,res) => {
    User.findByIdAndDelete(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
}
// update User
export const updateUser = async (req,res) => {
    const user= await User.findById(req.params.id)
    const updatedValue=req.body;
    let userUpdate=user;
    if (updatedValue.name)
    userUpdate.username=updatedValue.username;
    if (updatedValue.password)
    userUpdate.password=updatedValue.password; 
    try{
        const savedUser= await userUpdate.save()
        console.log(`name= ${userUpdate.name}`);
        res.status(201).json({
            message:"Values Updated",
            savedUser
        });
    }
    catch{s
        console.log("Not Updated");
    }
}