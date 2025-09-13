import { Box, Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Diagnosis, HealthCheckRating, NewEntryFormValues } from "../../../types";


interface Props {
  sumbitNewEntry: (newEntry: NewEntryFormValues) => Promise<void>,
  allDiagnosisCodes: Diagnosis[]
}

interface RatingOptions {
  value: string | HealthCheckRating;
  label: string;
}

const ratingOptions: RatingOptions[] = Object.entries(HealthCheckRating)
  .filter(([key, _]) => isNaN(Number(key)))
  .map(([k, v]) => {
    return {value: v, label: k.toString()};
  });


const HealthCheckEntryForm = ({ sumbitNewEntry, allDiagnosisCodes }: Props) => {
  
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosticCodes, setDiagnosticCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      description,
      date, 
      specialist,
      diagnosticCodes,
      healthCheckRating: Number(healthCheckRating),
      type: "HealthCheck" as const
    };
    await sumbitNewEntry(newEntry);
    
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosticCodes([]);
    setHealthCheckRating(0);
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosticCodes>) => {
    const value = event.target.value;
    setDiagnosticCodes(
      typeof value === 'string' ? value.split(',') : value
    );
  };

    const handleRatingChange = (event: SelectChangeEvent<string>) => {
      const value = event.target.value;
      setHealthCheckRating(Number(value));
  };

  return (
    <Box sx={{ border: 1, borderColor: 'grey.400', padding: 2, margin: 1, borderRadius: 1 }}>
      <Typography variant='h5' fontWeight="bold">
          New healthcheck entry
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
          <Select
          displayEmpty
          value={healthCheckRating.toString()}
          onChange={handleRatingChange}
          >
            {
              ratingOptions.map(rating => 
                <MenuItem
                key={rating.label}
                value={rating.value}
                >
                  {rating.label}
                </MenuItem>
              )
            }
          </Select>
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