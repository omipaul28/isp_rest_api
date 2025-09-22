import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createClient } from '../controllers/clientControllers.js';

const clientRouter = express.Router();
clientRouter.post('/addNewClient', authMiddleware, createClient);

export default clientRouter;