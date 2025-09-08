import express, { Router, Response } from 'express';
import diagnosesService from '../services/diagnosisService';
import { Diagnosis } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const router: Router = express.Router();


router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
});


export default router;