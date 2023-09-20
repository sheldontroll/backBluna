import { Router } from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/auth.controller';


export const authRoutes = Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/usuarios', (req,res) => { console.log(req) } );