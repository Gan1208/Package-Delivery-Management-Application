const express = require('express');
const packageController = require('../controllers/package-controller');

const router = express.Router();


router.post("/", packageController.insertNewPackage);

router.get("/", packageController.listAllPackages);

router.delete("/:deletePackageById", packageController.deletePackageById);

router.put("/", packageController.updatePackageDestination);

router.get("/driver/:packageDriverId", packageController.listPackageDriver);



module.exports = router;