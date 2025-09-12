import { v1 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import patients from '../../data/patients';


const getNoSensitivePatients = (): NonSensitivePatient[] => {
  return  patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, 
    name, 
    dateOfBirth,
    gender,
    occupation
    })
  );
};

const createNewPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    id: uuid(),
    ...newPatient
  };

  patients.push(patient);
  return patient;
};

const findPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export default { getNoSensitivePatients, createNewPatient, findPatient };