import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Diagnosis, NewEntryFormValues } from "../../../types";


interface Props {
  sumbitNewEntry: (newEntry: NewEntryFormValues) => Promise<void>,
  allDiagnosisCodes: Diagnosis[]
}



const HospitalEntryForm = ({ sumbitNewEntry, allDiagnosisCodes }: Props) => {
  
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosticCodes, setDiagnosticCodes] = useState<string[]>();
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<typeof diagnosticCodes>) => {
    const value = event.target.value;
    setDiagnosticCodes(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date, 
      specialist,
      diagnosticCodes,
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
    setDiagnosticCodes([]);
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
            type="date"
            value={date}
            onChange={ ({ target }) => setDate(target.value) }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField 
            label="Specialist"
            value={specialist}
            onChange={ ({ target }) => setSpecialist(target.value) }
          />
          <Select
          multiple
          renderValue={(selected) => {
            if (selected.length === 0) {
              return "Diagnosis codes";
            }
            return selected.join(', ');
          }}
          displayEmpty
          value={diagnosticCodes}
          onChange={handleChange}
          >
            { 
              allDiagnosisCodes.map(code => 
                <MenuItem
                key={code.code}
                value={code.code}
                >
                  {code.code} - {code.name}
                </MenuItem>
              )
            }
          </Select>
          <Typography variant="subtitle1" fontWeight="bold">
            Discharge
          </Typography>
          <TextField 
            label="Discharge date"
            type="date"
            value={dischargeDate}
            onChange={ ({ target }) => setDischargeDate(target.value) }
            InputLabelProps={{
              shrink: true,
            }}
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