import express, { Router, Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient, Patient } from '../types';
import { toNewPatient } from '../utils/utils';

const router: Router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNoSensitivePatients());
});

router.post('/', (req, res: Response<Patient>) => {

  const newPatient = toNewPatient(req.body);
  res.send(patientService.createNewPatient(newPatient));
});

export default router;