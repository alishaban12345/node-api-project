import User from '../model/users.js';

export const createUser = async (req,res) => {
    const user=new User({
        username:"Muhammad Ali",
        password:"muhammadali",
    })
    user.save().then((result) => res.send(result)).catch((err) => console.log(err))
}
