const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Appointments = new Schema(
  {
    doctor_id: {
      type: String,
    },
    doctorFullName: {
      type: String,
    },
    patientFullName: {
      type: String,
    },
    problem: {
      type: String,
    },
    date: {
      type: Object,
    },
    done: {
      type: Boolean,
    },
    treatmentReview: {
      type: String
    }
  },
  { timestamps: true }
);

const Appointment = model("Appointments", Appointments);
module.exports = Appointment;
