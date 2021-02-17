const express = require("express");

const carsController = require("../controllers/cars");

const router = express.Router();
router.get("/:id", carsController.getCar);
router.get("/", carsController.getCars);
router.post("/", carsController.postCar);
router.put("/", carsController.putCar);
router.delete("/:id", carsController.deleteCar);
router.use((request, response) => response.status(404).end());

module.exports = router;
