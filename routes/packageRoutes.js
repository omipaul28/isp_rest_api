import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createPackage, getPackageById, deletePackage, getAllPackages, updatePackage  } from '../controllers/packageControllers.js';

const packageRouter = express.Router();

packageRouter.post('/add', authMiddleware, createPackage);
packageRouter.get('/', authMiddleware, getAllPackages);
packageRouter.get('/:id', authMiddleware, getPackageById);
packageRouter.put('/:id', authMiddleware, updatePackage);
packageRouter.delete('/:id', authMiddleware, deletePackage);

export default packageRouter;