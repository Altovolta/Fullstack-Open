import { z } from 'zod';

export type Diagnosis  = {
  code: string,
  name: string,
  latin?: string
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

// can use it as the course intends cuz im using zod
export const Entry  = z.object({
});


export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(Entry),
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatient {
  id: string
}
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;