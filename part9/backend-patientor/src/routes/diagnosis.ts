import express, { Router, Response } from 'express';
import diagnosesService from '../services/diagnosisService';
import { Diagnosis } from '../types';

const router: Router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
});


export default router;