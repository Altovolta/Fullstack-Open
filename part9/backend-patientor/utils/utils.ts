import { Gender, NewPatient } from "../types";
import { parseDateOfBirth, parseGender, parseSsn, parseString } from "./parsers";


export const toNewPatient = (body: unknown): NewPatient => {

    if ( !body || typeof body !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in body 
    && 'dateOfBirth' in body 
    && 'ssn' in body 
    && 'gender' in body
    && 'occupation' in body
  ) {

    const newPatient: NewPatient = {
      name: parseString(body.name),
      dateOfBirth: parseDateOfBirth(body.dateOfBirth),
      ssn: parseSsn(body.ssn),
      gender: parseGender(body.gender),
      occupation: parseString(body.occupation)
    };

    return newPatient;
  };

  throw new Error('Incorrect data: some fields are missing');
  
};


export const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender); 
};

export const isSsn = (ssn: string): ssn is string  => {
  return (!ssn.includes('-') || ssn.length < 9);
};