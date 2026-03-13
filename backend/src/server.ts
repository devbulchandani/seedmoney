import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import subjectRoutes from './routes/subjects';
import executeRoutes from './routes/execute';
import testRoutes from './routes/tests';
import questionRoutes from './routes/questions';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/subjects', subjectRoutes);
app.use('/api/execute', executeRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/questions', questionRoutes);

// Database Connection
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
