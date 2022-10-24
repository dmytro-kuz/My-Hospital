const router = require("express").Router();


router.use("/doctors", require("./doctors"))
router.use("/appointments", require("./appintment"))

module.exports = router;




