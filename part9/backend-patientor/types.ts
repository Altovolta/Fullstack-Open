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

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatient {
  id: string
}
export type NonSensitivePatient = Omit<Patient, "ssn">;