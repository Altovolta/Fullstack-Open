import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import { Diagnosis, Entry, Patient } from "../../types";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';

import HospitalEntryComponent from "./HospitalEntryComponent";
import OccupationalHealthcareComponent from "./OccupationalHealthcareComponent";
import HealthCheckComponent from "./HealthcheckEntryComponent";
import { assertNever } from "../../utils";


const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>([]);

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

  return (
    <div>
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
      <Box>
        <Typography variant='h4'>Entries</Typography>
        {patient?.entries.map(entry => createEntryComponent(entry))}
      </Box>

    </div>
  );
};


export default PatientPage;