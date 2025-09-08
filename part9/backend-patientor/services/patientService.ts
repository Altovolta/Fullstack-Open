import { NonSensitivePatient } from "../types";
import patients from '../data/patients';


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

export default { getNoSensitivePatients };