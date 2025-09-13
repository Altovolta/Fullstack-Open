import { v1 as uuid } from 'uuid';
import { NewEntry, NewPatient, NonSensitivePatient, Patient } from "../types";
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


const createNewEntry = (newEntry: NewEntry, patientId: string) => {

  const patient = findPatient(patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  
  const entry = {
    id: uuid(),
    ...newEntry
  };

  patient.entries.push(entry);
  return entry;
};

export default { 
  getNoSensitivePatients, createNewPatient, findPatient, createNewEntry 
};