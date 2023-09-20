import { Router } from 'express';
import { registerUser, loginUser, getUsers, getUserById } from '../controllers/auth.controller';


export const authRoutes = Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/usuarios', getUsers);
authRoutes.get('/usuarios/:ruc', getUserById);