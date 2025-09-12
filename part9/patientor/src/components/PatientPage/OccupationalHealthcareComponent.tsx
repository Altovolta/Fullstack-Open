import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { Box, Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import { getDiagnosisDetails } from "./utils";

interface Props {
  entry: OccupationalHealthcareEntry,
  diagnosisCodes: Diagnosis[]
}

const OccupationalHealthcareComponent = ({ entry, diagnosisCodes }: Props) => {

  return (
    <Box sx={{ border: 1, borderColor: 'grey.400', padding: 2, margin: 1, borderRadius: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold">
        {entry.date}
      </Typography>
      <WorkIcon />
      <Typography variant="subtitle1" >
        Employer: {entry.employerName}
      </Typography>
      
      <Typography variant="subtitle1" >
        {entry.description}
      </Typography>
      {
        entry.sickLeave 
        ? 
        <Typography variant="subtitle1" >
          Sick leave period: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </Typography>
        : null
      }
      { entry.diagnosisCodes ? getDiagnosisDetails({entry, diagnosisCodes}) : null }
      <Typography variant="subtitle1" fontWeight="bold" >
        Diagnosed by {entry.specialist}
      </Typography>
    </Box>
  );

};

export default OccupationalHealthcareComponent;