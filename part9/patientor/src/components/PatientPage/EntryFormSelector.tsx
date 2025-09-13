import { MenuItem, Select } from "@mui/material";
import { Diagnosis, EntryTypes, NewEntryFormValues } from "../../types";
import { useState } from "react";
import HealthCheckEntryForm from "./Forms/HealtcheckEntryForm";
import HospitalEntryForm from "./Forms/HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./Forms/OccupationalEntryForm";



interface EntryOptions {
  value: EntryTypes;
  label: string;
}

const entryOptions: EntryOptions[] = Object.values(EntryTypes).map(v => ({
  value: v, label: v.toString()
}));

interface Props {
  submitNewEntry: (newEntry: NewEntryFormValues) => Promise<void>,
  diagnosisCodes: Diagnosis[]
}

const EntryFormSelector = ({ submitNewEntry, diagnosisCodes }: Props) => {

  const [entryType, setEntryType] = useState<string>("Healthcheck");

  const selectForm = () => {

    // TODO: Create generic form with the common values.
    switch (entryType) {
      case "Healthcheck":
        return <HealthCheckEntryForm 
        sumbitNewEntry={submitNewEntry} 
        allDiagnosisCodes={diagnosisCodes}
        />;
      case "Occupational healthcare":
        return <OccupationalHealthcareEntryForm 
        sumbitNewEntry={submitNewEntry}
        allDiagnosisCodes={diagnosisCodes}
        />;
      case "Hospital":
        return <HospitalEntryForm 
        sumbitNewEntry={submitNewEntry}
        allDiagnosisCodes={diagnosisCodes}
        />;
      default:
        return null;
    }
  };

  const changeSelectedOption = (newOption: string) => {
    const option = Object.values(EntryTypes).find(g => 
      g.toString() === newOption
    );
  
    if(option) {
      setEntryType(option);
    }
    
  };

  return (
    <div>
      <Select
        label="Entry type"
        sx={{margin: 1}}
        defaultValue={EntryTypes.HealthCheck} 
        value={(entryType)}
        onChange={( {target} ) => changeSelectedOption(target.value)}
      >
        {entryOptions.map(option => 
        <MenuItem 
        key={option.label}
        value={option.value}
        >
        {option.label}
        </MenuItem>
      )}
      </Select>
      {selectForm()}
    </div>
  );
};

export default EntryFormSelector;