const router = require("express").Router();
const service = require("../services/appointment");

// get appointments list
router.get("/", (req, res, next) => {
  return service
    .getAppointmentsList()
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

// get appointment by id
router.get("/:id", (req, res, next) => {
  return service
    .getAppointmentById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

// add new appointment
router.post("/", async (req, res, next) => {
  return service
    .createAppointment(req.body)
    .then((newAppointment) => res.status(200).json(newAppointment))
    .catch((err) => next(err));
});

// delete appointment
router.delete("/:id", async (req, res, next) => {
  return service
    .deleteAppointment(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
});

// update appointment by id
router.put("/:id", async (req, res, next) => {
  // console.log(req.params.id);
  // console.log(req.body);
  return service
    .updateAppointment(req.params.id, req.body)
    .then((upAppointment) => res.status(200).json(upAppointment))
    .catch((err) => next(err));
});



module.exports = router;
