import { Entry } from "../../types";
import { Box, List, ListItem, Typography } from "@mui/material";


interface Props {
  entry: Entry
}

const EntryComponent = ({ entry }: Props) => {

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
          {code}
        </ListItem>
        )}
      </List>
    </Box>
  );

};

export default EntryComponent;