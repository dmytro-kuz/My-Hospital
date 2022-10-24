const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const Doctors = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const Doctor = model("doctors", Doctors);
module.exports = Doctor;
