import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

import {Patient } from "../../types";
import patientService from '../../services/patients';
import EntryComponent from "./EntryComponent";


const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    patientService.getOne(id).then(
      data => setPatient(data)
    );
  }, [id]);

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
        {patient?.entries.map(entry => 
          <EntryComponent key={entry.id} entry={entry} />
        )}
      </Box>

    </div>
  );
};


export default PatientPage;