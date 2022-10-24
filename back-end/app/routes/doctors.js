const router = require("express").Router();
const service = require("../services/doctors");


// get doctors list
router.get("/", (req, res, next) => {
    return service.getDoctorsList().then((data) => res.status(200).json( data )).catch((err) => next(err))
});

// get doctor by id
router.get("/:id", (req, res, next) => {
    return service.getDoctorById(req.params.id).then((data) => res.status(200).json( data ))
                                               .catch((err) => next(err))
});

// add new doctor
router.post("/", async (req, res, next) => {
    return service.createDoctor(req.body).then(newDoctor => res.status(200).json(newDoctor))
                                         .catch(err => next(err));
});

// delete doctor by id
router.delete("/:id", async (req, res, next) => {
    console.log(req.params.id);
    return service.deleteDoctorById(req.params.id).then(data => res.status(200).json(data.id))
                                         .catch(err => next(err));
});

// update doctor by id
router.put("/:id", async (req, res, next) => {
    return service
      .updateDoctor(req.params.id, req.body)
      .then((upDoctor) => res.status(200).json(upDoctor))
      .catch((err) => next(err));
  });

module.exports = router;

