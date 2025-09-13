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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// can use it as the course intends cuz im using zod
export const BaseEntry  = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.string().array().optional()
});

export const OccupationalHealthcareEntrySchema = BaseEntry.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }).optional()
});


export const HospitalEntrySchema = BaseEntry.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string()
  })
});


export const HealthCheckEntrySchema = BaseEntry.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating)
});

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema
]);

export type Entry = z.infer<typeof EntrySchema>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;


export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatient {
  id: string
}
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
