import { Router } from "express";
import {
  checkStatus,
  getParkingData,
  login,
  parkVehicle,
  releaseVehicle,
} from "./controller";

const router = Router();

router.post("/login", login);

router.post("/park", parkVehicle);

router.post("/checkStatus", checkStatus);

router.post("/release", releaseVehicle);

router.get("/parkingData", getParkingData);
module.exports = router;
