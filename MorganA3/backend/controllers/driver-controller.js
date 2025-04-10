const Driver = require("../models/driver");
const Package = require("../models/package");
const { counterIncrementOne } = require("../utils/counter_function");

module.exports = {
  insertNewDriver: async function (req, res) {
    try {
      let aDriver = req.body;
      let driverDoc = new Driver({
        driverName: aDriver.driverName,
        driverDepartment: aDriver.driverDepartment,
        driverLicence: aDriver.driverLicence,
        driverIsActive: aDriver.driverIsActive,
      });
      await driverDoc.save();
      await counterIncrementOne("insert");
      res.status(200).json({
        id: driverDoc._id,
        driverId: driverDoc.driverId,
      });
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response with status 400
      } 
    },

  listAllDrivers: async function (req, res) {
    let driver = await Driver.find({}).populate("assignedPackages");
    await counterIncrementOne("get");
    res.status(200).json(driver);
  },

  deleteDriverById: async function (req, res) {
    try {
      let id = req.params.deleteDriverById;
      console.log(id);
      let driver = await Driver.findOne({ _id: id });
      console.log(driver);
      await counterIncrementOne("get");

      if (driver.assignedPackages) {
        for (let i = 0; i < driver.assignedPackages.length; i++) {
          await Package.deleteOne({ _id: driver.assignedPackages[i]._id });
          await counterIncrementOne("delete");
        }
      }

      let deleteDriver = await Driver.deleteOne({ _id: id });
      await counterIncrementOne("delete");

      if (deleteDriver) {
        res.status(200).json({ acknowledged: true, deletedCount: 1 });
      } else {
        res.status(200).json({ acknowledged: false, deletedCount: 0 });
      }
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response with status 400
      } 
    },

  updateDriverLicence: async function (req, res) {
    try {
      let aDriver = req.body;
      let result = await Driver.findOneAndUpdate(
        { _id: aDriver._id },
        {
          driverLicence: aDriver.driverLicence,
          driverDepartment: aDriver.driverDepartment,
        }
      );
      await result.save();
      await counterIncrementOne("get");
      await counterIncrementOne("update");

      if (result) {
        res.status(200).json({ status: "Driver updated successfully" });
      }
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response with status 400
      } 
    },

  listDriverPackages: async function (req, res) {
    let packageList = [];
    let aDriver = req.params;
    let driver = await Driver.findOne({ _id: aDriver._id });
    let driverPackages = driver.assignedPackages;

    for (let i = 0; i < driverPackages.length; i++) {
      let package = await Package.findOne({ _id: driverPackages[i]._id.toString() });
      if(package){
        packageList.push(package);
        }   
    }
    await counterIncrementOne("get");
    res.status(200).json(packageList);
  },
};