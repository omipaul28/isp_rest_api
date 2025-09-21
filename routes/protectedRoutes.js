import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { profile } from '../controllers/protectedControllers.js';

const protectedRouter = express.Router();

protectedRouter.get('/profile', authMiddleware, profile);

export default protectedRouter;