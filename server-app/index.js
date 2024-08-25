import express from 'express';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth/authRoutes.js';
import feedBackRoutes from './src/routes/feedbackRoutes.js';

import cors from 'cors';


dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

const allowedOrigins = [
    'https://client-app-eosin.vercel.app', // Tu aplicación en Vercel
    'http://localhost:5173', // Tu entorno de desarrollo local
];
const corsOptions = {
    origin: (origin, callback) => {
        // Permitir solicitudes sin origen (como las que provienen de herramientas como Postman)
        if (!origin || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

// Middleware para agregar encabezados de seguridad
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});


app.use(cors(corsOptions));
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/', feedBackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});