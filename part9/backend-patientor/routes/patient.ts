import express, { Router, Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const router: Router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNoSensitivePatients());
});


export default router;