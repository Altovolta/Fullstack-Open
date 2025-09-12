import express, { Router, Response, Request } from 'express';
import patientService from '../services/patientService';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { newPatientParser } from '../middleware/newPatientParser';
import { errorMiddleware } from '../middleware/errorMiddleware';

const router: Router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNoSensitivePatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {

  const patient = patientService.createNewPatient(req.body);
  res.json(patient);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.findPatient(id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({error: "Patient not found"});
  }
  
}); 

router.use(errorMiddleware);

export default router;