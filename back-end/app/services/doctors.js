const doctorsDataService = require('../data/doctor')


const getDoctorsList = async () => {
  return await doctorsDataService.getAll();
};

const getDoctorById = async (id) => {
  return await doctorsDataService.getById(id);
};

const createDoctor = async (doctor) => {
  return await doctorsDataService.create(doctor);
};

const deleteDoctorById = async (id) => {
  return await doctorsDataService.deleteById(id);
};

const updateDoctor = async (id, doctor) => {
  // const doctor = await doctorsDataService.getById(appointment.doctor_id);
  // await appointmentsDataService.updateById(id, appointment);
  // const _doc = await appointmentsDataService.getById(id);
  await doctorsDataService.updateById(id, doctor);
  return await doctorsDataService.getById(doctor.id);
};

module.exports = {
  getDoctorsList,
  getDoctorById,
  createDoctor,
  deleteDoctorById,
  updateDoctor
};

// export default model(getDoctorsList, getDoctorById, createDoctor);

// // GET/allDoctors

// router.get('/', async (req, res) => {
//     const doctors = await DoctorsList.find();
//     try {
//         return res.status(200).json(doctors)
//     }
//     catch(err) {
//         return res.status(500).json({message: "Couldn't get doctors"})
//     }
// })


// // POST/addDoctor
// router.post("/", async (req, res) => {
//     const addDoctor = await DoctorsList.create(req.body);
//     console.log(addDoctor);
//       try {
//         console.log(req.body);
//         return res.status(201).json(addDoctor);
//     } catch (error) {
//         return res.status(500).json({message: "Couldn't add doctor"});
//     }
// })


// router.delete("/:id", async (req, res) => {
//     const deleteDoctor = await DoctorsList.remove(req.body.id);
//     console.log(deleteDoctor);
//       try {
//         console.log(req.body);
//         return res.status(201).json(deleteDoctor);
//     } catch (error) {
//         return res.status(500).json({message: "Couldn't delete doctor"});
//     }
// })