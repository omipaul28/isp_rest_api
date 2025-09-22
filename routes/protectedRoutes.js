import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { ispProfile, ispProfileUpdate, deleteIsp} from '../controllers/protectedControllers.js';

const protectedRouter = express.Router();

protectedRouter.get('/ispProfile', authMiddleware, ispProfile);
protectedRouter.put('/ispProfile', authMiddleware, ispProfileUpdate);
protectedRouter.delete('/ispProfile', deleteIsp);


export default protectedRouter;