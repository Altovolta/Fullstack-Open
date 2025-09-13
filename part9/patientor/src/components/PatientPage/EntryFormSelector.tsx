import { MenuItem, Select } from "@mui/material";
import { EntryTypes, NewEntryFormValues } from "../../types";
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
  submitNewEntry: (newEntry: NewEntryFormValues) => Promise<void>
}

const EntryFormSelector = ({ submitNewEntry }: Props) => {

  const [entryType, setEntryType] = useState<string>("Healthcheck");

  const selectForm = () => {

    // TODO: Create generic form with the common values.
    switch (entryType) {
      case "Healthcheck":
        return <HealthCheckEntryForm sumbitNewEntry={submitNewEntry}/>;
      case "Occupational healthcare":
        return <OccupationalHealthcareEntryForm sumbitNewEntry={submitNewEntry}/>;
      case "Hospital":
        return <HospitalEntryForm sumbitNewEntry={submitNewEntry}/>;
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