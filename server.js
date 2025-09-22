import express from 'express';
import dotenv from 'dotenv';
import {sessionMiddle} from './config/session.js';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import regRoutes from './routes/regRoutes.js'
import clientRouter from './routes/clientRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(sessionMiddle);


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Routes
app.use('/auth', authRoutes);
app.use('/auth',regRoutes);
// userGet and userUpdate
app.use('/', protectedRoutes);
// client routes
app.use('/client', clientRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//