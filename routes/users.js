import express from 'express';
import { getUsers,getUser,createUser,deleteUser,updateUser, userLogin,authencateToken,refreshToken, deleteToken } from '../controllers/users.js';

const router=express.Router();

router.delete('/logout',deleteToken)
router.get('/',authencateToken,getUsers);
// router.get('/',getUsers);
router.post("/",createUser);
router.post("/login",userLogin);
router.get('/:id',getUser);
router.delete("/:id",deleteUser);
router.put('/:id',updateUser);
router.post('/token',refreshToken);




export default router;