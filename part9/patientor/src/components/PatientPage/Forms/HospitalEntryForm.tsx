import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NewEntryFormValues } from "../../../types";


interface Props {
  sumbitNewEntry: (newEntry: NewEntryFormValues) => Promise<void>
}

const HospitalEntryForm = ({ sumbitNewEntry }: Props) => {
  
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosticCodes, setDiagnosticCodes] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date, 
      specialist,
      diagnosticCodes: diagnosticCodes.split(','),
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      },
      type: "Hospital" as const
    };
    await sumbitNewEntry(newEntry);
    
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosticCodes('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  return (
    <Box sx={{ border: 1, borderColor: 'grey.400', padding: 2, margin: 1, borderRadius: 1 }}>
      <Typography variant='h5' fontWeight="bold">
          New hospital entry
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
            label="Diagnosis codes"
            value={diagnosticCodes}
            onChange={ ({ target }) => setDiagnosticCodes(target.value) }
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Discharge
          </Typography>
          <TextField 
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            value={dischargeDate}
            onChange={ ({ target }) => setDischargeDate(target.value) }
          />
          <TextField 
            label="Criteria"
            value={dischargeCriteria}
            onChange={ ({ target }) => setDischargeCriteria(target.value) }
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

export default HospitalEntryForm;