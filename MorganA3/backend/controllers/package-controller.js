const Driver = require("../models/driver");
const Package = require("../models/package");
const { counterIncrementOne } = require("../utils/counter_function");
var admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
  insertNewPackage: async function (req, res) {
    try {
      let aPackage = req.body;
      let packageDoc = new Package({
        packageTitle: aPackage.packageTitle,
        packageWeight: aPackage.packageWeight,
        packageDestination: aPackage.packageDestination,
        packageDescription: aPackage.packageDescription,
        isAllocated: aPackage.isAllocated,
        packageDriverId: aPackage.packageDriverId,
      });
      await packageDoc.save();
      let driver = await Driver.findOne({ _id: aPackage.packageDriverId });
      await counterIncrementOne("get");
      driver.assignedPackages.push(packageDoc._id);
      await driver.save();
      await counterIncrementOne("insert");
      res.status(200).json({
        id: packageDoc._id,
        packageId: packageDoc.packageId,
      });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
  },

  listAllPackages: async function (req, res) {
    let package = await Package.find({}).populate("packageDriverId");
    await counterIncrementOne("get");
    res.status(200).json(package);
  },

  deletePackageById: async function (req, res) {
    try {
      let id = req.params.deletePackageById;
      let package = await Package.findOne({ _id: id });
      await counterIncrementOne("get");
      console.log(package);
      let driver = await Driver.findOne({ _id: package.packageDriverId });
      await counterIncrementOne("get");
      let pCorId = driver.assignedPackages.findIndex((assignedPackageId) =>
        assignedPackageId.equals(package._id)
      );
      if (pCorId !== -1) {
        driver.assignedPackages.splice(pCorId, 1);
        await driver.save();
        let deletePackage = await Package.deleteOne({ _id: id });
        await counterIncrementOne("delete");
        res.status(200).json({ acknowledged: true, deletedCount: 1 });
      } 
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response with status 400
      } 
    }
,

  updatePackageDestination: async function (req, res) {
    try {
      let aPackage = req.body;
      let result = await Package.findOneAndUpdate(
        { _id: aPackage._id },
        { packageDestination: aPackage.packageDestination }
      );
      await result.save();
      await counterIncrementOne("get");
      await counterIncrementOne("update");
      if (result) {
        res.status(200).json({ status: "Package updated successfully" });
      } else {
        res.status(200).json({ status: "ID not found" });
      }
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response with status 400
      } 
    },

  listPackageDriver: async function (req, res) {
    try {
      let aPackage = req.params;
      let driver = await Driver.findOne({ _id: aPackage.packageDriverId });
      await counterIncrementOne("get");
      console.log(aPackage);
      if (driver) {
        res.status(200).json(driver);
      }
    } catch (err) {
        res.status(400).json({ error: err.message }); // Send error response with status 400
      } 
    }
};