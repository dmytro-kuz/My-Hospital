const appointmentsDataService = require("../data/appointment");
const doctorsDataService = require("../data/doctor");

const getAppointmentsList = async () => {
  const appointments = await appointmentsDataService.getAll();
  appointmentDoctorsIds = appointments.map(
    (appointment) => appointment.doctor_id
  );
  const doctors = await doctorsDataService.getByIds(appointmentDoctorsIds);
  return _mapDoctorsToAppointments(appointments, doctors);
};

const getAppointmentById = async (id) => {
  const appointment = await appointmentsDataService.getById(id);
  const doctor = await doctorsDataService.getById(appointment.doctor_id);

  return { ...appointment, doctor };
};

const createAppointment = async (appointment) => {
  const doctor = await doctorsDataService.getById(appointment.doctor_id);
  const _doc = await appointmentsDataService.create(appointment);
  return { doctor, _doc };
};

const deleteAppointment = async (id) => {
  const appointment = await appointmentsDataService.deleteById(id);
  // const doctor = await doctorsDataService.getById(appointment.doctor_id);
  const appId = appointment._id

  return { appId };
};

const updateAppointment = async (id, appointment) => {
  // console.log(id);
  // const app = await appointmentsDataService.getById(id);
  // console.log(app);
  
  await appointmentsDataService.updateById(id, appointment);
  const _doc = await appointmentsDataService.getById(id);
  const doctor = await doctorsDataService.getById(_doc.doctor_id);

  return { doctor, _doc };
};

module.exports = {
  getAppointmentsList,
  getAppointmentById,
  createAppointment,
  deleteAppointment,
  updateAppointment
};

// PRIVATE FUNCTIONS BELOW EXPORTS
const _mapDoctorsToAppointments = (appointments, doctors) => {
  return appointments.map((a) => ({
    ...a,
    doctor: doctors.find((d) => d._id.toString() === a.doctor_id),
  }));
};
