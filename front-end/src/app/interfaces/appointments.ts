import { Doctor } from "./doctor"
export interface Appointment {
  _id: string
  doctor_id: string,
  doctorFullName: string,
  patientFullName: string,
  problem: string,
  date: any,
  done: boolean,
  treatmentReview?: string,
  doctor: Doctor
  _doc: Appointment,
}