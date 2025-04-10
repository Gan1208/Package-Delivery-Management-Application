const express = require('express');
const driverController = require('../controllers/driver-controller');

const router = express.Router();


router.post("/", driverController.insertNewDriver);

router.get("/", driverController.listAllDrivers);

router.delete("/:deleteDriverById", driverController.deleteDriverById);

router.put("/", driverController.updateDriverLicence);

router.get("/packages/:_id", driverController.listDriverPackages);


module.exports = router;