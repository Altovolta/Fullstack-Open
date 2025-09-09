import { isGender, isString, isDate, isSsn } from "./utils";
import { Gender } from "../types";

export const parseString = (str: unknown): string => {

  if (!str || !isString(str)) {
    throw new Error("Invalid or missing fields");
  }

  return str;
};

export const parseDateOfBirth = (date: unknown): string => {

  if(!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid or missing fields");
  }

  return date;
};

export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
      throw new Error("Invalid or missing fields");
    }

  return ssn;
};

export const parseGender = (gender: unknown): Gender => {

  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Invalid or missing fields");
  };

  return gender;

};
