import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NewEntryFormValues } from "../../types";


interface Props {
  sumbitNewEntry: (newEntry: NewEntryFormValues) => Promise<void>
}

const HealthCheckEntryForm = ({ sumbitNewEntry }: Props) => {
  
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosticCodes, setDiagnosticCodes] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date, 
      specialist,
      diagnosticCodes: diagnosticCodes.split(','),
      healthCheckRating: Number(healthCheckRating),
      type: "HealthCheck" as const
    };
    await sumbitNewEntry(newEntry);
    
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosticCodes('');
    setHealthCheckRating('');
  };

  return (
    <Box sx={{ border: 1, borderColor: 'grey.400', padding: 2, margin: 1, borderRadius: 1 }}>
      <Typography variant='h5' fontWeight="bold">
          New Healthcheck entry
      </Typography>
      <br />
      <form onSubmit={onSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Description"
            value={description}
            onChange={ ({ target }) => setDescription(target.value) }
          />
          <TextField 
            label="Date"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={ ({ target }) => setDate(target.value) }
          />
          <TextField 
            label="Specialist"
            value={specialist}
            onChange={ ({ target }) => setSpecialist(target.value) }
          />
          <TextField 
            label="Healthcheck Rating"
            type="number"
            value={healthCheckRating}
            onChange={ ({ target }) => setHealthCheckRating(target.value) }
          />
          <TextField 
            label="Diagnosis codes"
            value={diagnosticCodes}
            onChange={ ({ target }) => setDiagnosticCodes(target.value) }
          />
          <Button
          type="submit"
          variant="contained"
          >
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );

};

export default HealthCheckEntryForm;