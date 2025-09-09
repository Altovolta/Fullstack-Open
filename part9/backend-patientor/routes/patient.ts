import express, { Router, Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient, Patient } from '../types';

const router: Router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNoSensitivePatients());
});

router.post('/', (req, res: Response<Patient>) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.send(patientService.createNewPatient(req.body));

});

export default router;