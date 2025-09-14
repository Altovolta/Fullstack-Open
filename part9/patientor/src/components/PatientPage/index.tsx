import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";

import { Box, Typography } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Diagnosis, Entry, NewEntryFormValues, Patient } from "../../types";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';

import HospitalEntryComponent from "./Entries/HospitalEntryComponent";
import OccupationalHealthcareComponent from "./Entries/OccupationalHealthcareComponent";
import HealthCheckComponent from "./Entries/HealthcheckEntryComponent";
import { assertNever } from "../../utils";

import Notification from "../Notifications";
import EntryFormSelector from "./EntryFormSelector";


const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPatientData =  async () => {
      const patient = await patientService.getOne(id);
       setPatient(patient);
    };

    const fetchDiagnosisCodes =  async () => {
      const codes = await diagnosisService.getAll();
      setDiagnosisCodes(codes);
    };

    void fetchPatientData();
    void fetchDiagnosisCodes();

  }, [id]);

  if (!patient) {return null;}

  const createEntryComponent = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryComponent 
          key={entry.id} 
          entry={entry} 
          diagnosisCodes={diagnosisCodes} 
        />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareComponent 
          key={entry.id} 
          entry={entry} 
          diagnosisCodes={diagnosisCodes} 
        />;
      case "HealthCheck":
        return <HealthCheckComponent 
          key={entry.id} 
          entry={entry} 
          diagnosisCodes={diagnosisCodes} 
        />;
      default:
        assertNever(entry);
    }
  };

  const submitNewEntry = async (newEntry: NewEntryFormValues) => {

    try {
      const entry = await patientService.createNewEntry(newEntry, patient?.id);
      const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(entry)
      };
      setPatient(updatedPatient);

    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.data.error[0].message);
        setError(error.response?.data.error[0].message);
      }
      else {
        setError("Unknown error");
      }

      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div>
      <Notification error={error} />
      <br />
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {patient?.name}
          {patient?.gender === "male" ? <MaleIcon />: <FemaleIcon />}
        </Typography>
      </Box>
      <Box>
        <Typography variant='h6'>
          SSN: {patient?.ssn}
        </Typography>
        <Typography variant='h6'>
          Occupation: {patient?.occupation}
        </Typography>
        <Typography variant='h6'>
          Birthday: {patient?.dateOfBirth}
        </Typography>
      </Box>
      <br />
      <EntryFormSelector 
      submitNewEntry={submitNewEntry}
      diagnosisCodes={diagnosisCodes}
      />
      
      <Box>
        <Typography variant='h4'>Entries</Typography>
        {patient?.entries.map(entry => createEntryComponent(entry))}
      </Box>

    </div>
  );
};


export default PatientPage;