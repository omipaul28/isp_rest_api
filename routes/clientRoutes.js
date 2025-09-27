import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createClient, updateClient, getClient, deleteClient, assignPackageToClient } from '../controllers/clientControllers.js';

const clientRouter = express.Router();
clientRouter.post('/add', authMiddleware, createClient);
clientRouter.put('/:customer_id', authMiddleware, updateClient);
clientRouter.get('/:customer_id', authMiddleware, getClient);
clientRouter.delete('/:customer_id', authMiddleware, deleteClient);
clientRouter.post('/assign-package/:customer_id', authMiddleware, assignPackageToClient);


export default clientRouter;