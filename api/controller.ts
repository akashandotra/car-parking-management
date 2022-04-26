import { Request, Response } from "express";
import {
  checkStatusService,
  getParkingDataService,
  loginService,
  parkVehicleService,
  releaseVehicleService,
} from "./service";
import { CheckStatus, ErrorConstants, ParkingData, UserData } from "./Types";

const login = (req: Request<UserData>, res: Response) => {
  const body = req.body;
  loginService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const parkVehicle = (req: Request<ParkingData>, res: Response) => {
  console.log("hello world");

  const body = req.body;
  parkVehicleService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const getParkingData = (req: Request<ParkingData>, res: Response) => {
  console.log("hello world");

  const body = req.body;
  getParkingDataService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const releaseVehicle = (req: Request<ParkingData>, res: Response) => {
  console.log("hello world");

  const body = req.body;
  releaseVehicleService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

const checkStatus = (req: Request<CheckStatus>, res: Response) => {
  console.log("Check vehicle status");

  const body = req.body;
  checkStatusService(body, req, (error: Error, results: any) => {
    if (error) {
      return res.status(500).json(ErrorConstants.DatabaseConnection);
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
};

// parkNewVehicle;
// checkVehicleStatus;
// releaseVehicle;
// accountUpdate;
// serviceAreas;
// logout

export { login, parkVehicle, checkStatus, releaseVehicle, getParkingData };
