import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/env';
import { corsOptions } from './config/cors';
import { rateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { auditMiddleware } from './middleware/audit';
import logger from './utils/logger';

// Routes
import authRoutes from './routes/auth.routes';
import medecinRoutes from './routes/medecin.routes';
import patientRoutes from './routes/patient.routes';
import adressageRoutes from './routes/adressage.routes';
import motifRoutes from './routes/motif.routes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(rateLimiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Audit middleware (log all requests)
app.use(auditMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/adressages', adressageRoutes);
app.use('/api/motifs', motifRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`🚀 API server running on http://localhost:${PORT}`);
  logger.info(`Environment: ${config.nodeEnv}`);
});

export default app;
