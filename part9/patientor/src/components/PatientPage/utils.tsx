import { List, ListItem, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface EntryProp {
  entry: Entry, 
  diagnosisCodes: Diagnosis[]
}

export const getDiagnosisDetails = ({ entry, diagnosisCodes } : EntryProp) => {
    return (
      <>
        <Typography variant="h6" fontWeight="bold">
          Diagnosis details
        </Typography>
        <List>
          {entry.diagnosisCodes?.map(code => 
          <ListItem key={code}>
            {code} - {diagnosisCodes.find(diagnosisCode => diagnosisCode.code === code)?.name}
          </ListItem>
          )}
        </List>
      </>
    );
  };