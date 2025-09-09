import express, { Express } from 'express';
import cors from 'cors';
import diagnosisRouter from './src/routes/diagnosis';
import patientRouter from './src/routes/patient';

const app: Express = express();

app.use(express.json());

app.use(cors());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});