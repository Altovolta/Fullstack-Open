import { Diagnosis, HospitalEntry } from "../../types";
import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { getDiagnosisDetails } from "./utils";

interface Props {
  entry: HospitalEntry,
  diagnosisCodes: Diagnosis[]
}

const HospitalEntryComponent = ({ entry, diagnosisCodes }: Props) => {

  const getDischargeInfo = () => {
    return (
      <>
      <Typography variant="h6" fontWeight="bold">
        Discharge details
      </Typography>
      <Typography variant="subtitle1" >
          Discharge date: {entry.discharge?.date}
      </Typography>
      <Typography variant="subtitle1" >
          Criteria: {entry.discharge?.criteria}
      </Typography>
    </>
    );
    
  };
  
  return (
    <Box sx={{ border: 1, borderColor: 'grey.400', padding: 2, margin: 1, borderRadius: 1 }}>
      <Typography variant="subtitle1" fontWeight="bold">
        {entry.date}
      </Typography>
      <LocalHospitalIcon />
      <Typography variant="subtitle1" >
        {entry.description}
      </Typography>
      { entry.discharge ? getDischargeInfo() : null }
      { entry.diagnosisCodes ? getDiagnosisDetails({entry, diagnosisCodes}) : null }
      <Typography variant="subtitle1" fontWeight="bold" >
        Diagnosed by {entry.specialist}
      </Typography>
    </Box>
  );

};

export default HospitalEntryComponent;