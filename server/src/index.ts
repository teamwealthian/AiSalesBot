import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initFirebase } from './services/firebase';
import chatRouter from './routes/chat';
import leadsRouter from './routes/leads';
import actionsRouter from './routes/actions';
import { chatLimiter, leadsLimiter } from './middleware/rateLimit';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase
initFirebase();

// Routes
app.use('/api/chat', chatLimiter, chatRouter);
app.use('/api/leads', leadsLimiter, leadsRouter);
app.use('/api/actions', actionsRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', provider: config.aiProvider });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`AI Provider: ${config.aiProvider}`);
});
