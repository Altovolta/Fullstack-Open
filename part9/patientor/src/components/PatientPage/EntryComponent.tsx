import { Diagnosis, Entry } from "../../types";
import { Box, List, ListItem, Typography } from "@mui/material";


interface Props {
  entry: Entry,
  diagnosisCodes: Diagnosis[] | undefined
}

const EntryComponent = ({ entry, diagnosisCodes }: Props) => {

  console.log(entry);

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {entry.date}
      </Typography>
      {' '}
      <Typography variant="subtitle1" >
        {entry.description}
      </Typography>
      <List>
        {entry.diagnosisCodes?.map(code => 
        <ListItem key={code}>
          {code} - {diagnosisCodes?.find(diagnosisCode => diagnosisCode.code === code)?.name}
        </ListItem>
        )}
      </List>
    </Box>
  );

};

export default EntryComponent;