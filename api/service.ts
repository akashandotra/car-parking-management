import { createPool } from "mysql";
import { Request } from "express";
import { CheckStatus, ParkingData, UserData } from "./Types";

const sqlConnection = createPool({
  port: parseInt(process.env.MYSQL_PORT),
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  database: process.env.MYSQL_DB_NAME,
});

const loginService = (
  data: UserData,
  req: Request<any>,
  callBack: Function
) => {
  //@ts-ignore
  const currentUserEmail = req.session.email;
  const isAdmin = String(data.isAdmin);
  if (true) {
    sqlConnection.query(
      `SELECT userEmail, fullName, isAdmin FROM user WHERE userEmail='${data.userEmail}' AND password='${data.userPassword}'`,
      [],
      (error, results, fields) => {
        if (error) {
          console.log("Error while saving parking");
          console.log(error);
          return callBack(error);
        }
        console.log("Saved parking to DB");
        console.log(results);
        return callBack(null, results);
      }
    );
  } else {
    console.log("No email in session");
    return callBack(new Error());
  }
};

const checkStatusService = (
  data: CheckStatus,
  req: Request<any>,
  callBack: Function
) => {
  //@ts-ignore
  const currentUserEmail = req.session.email;
  const parkingRecordId = Number(data.tokenNumber);
  if (true) {
    sqlConnection.query(
      `SELECT PR.parkingRecordId, PR.areaId, PR.vehicleClass, PR.registrationNumber, PR.parkingDuration, PR.ownerName, PR.ownerAddress, PR.createdTime, SA.city, SA.area, PS.status FROM parkingRecords PR LEFT JOIN serviceArea SA ON SA.areaId=PR.areaId LEFT JOIN parkingStatus PS ON PS.parkingRecordId=PR.parkingRecordId WHERE PR.parkingRecordId=? OR PR.registrationNumber=? ORDER BY PR.parkingRecordId DESC`,
      [parkingRecordId, data.registrationNumber],
      (error, results, fields) => {
        if (error) {
          console.log("Error while fetching vehicle data");
          console.log(error);
          return callBack(error);
        }
        console.log("Fetched parking data successfully");
        console.log(results);
        return callBack(null, results);
      }
    );
  } else {
    console.log("No email in session");
    return callBack(new Error());
  }
};

const releaseVehicleService = (
  data: CheckStatus,
  req: Request<any>,
  callBack: Function
) => {
  //@ts-ignore
  const currentUserEmail = req.session.email;
  const parkingRecordId = Number(data.tokenNumber);
  if (true) {
    sqlConnection.query(
      `UPDATE parkingStatus SET status='free', parkingRecordId=1 WHERE parkingRecordId=?`,
      [parkingRecordId],
      (error, results, fields) => {
        if (error) {
          console.log("Error while releasing vehicle");
          console.log(error);
          return callBack(error);
        }
        console.log("Released vehicle");
        console.log(results);
        if (results.affectedRows > 0) {
          return checkStatusService(data, req, callBack);
        } else {
          // return checkStatusService(data, req, callBack);
          return callBack(null, { message: "Already released" });
        }
        return callBack(null, results);
      }
    );
  } else {
    console.log("No email in session");
    return callBack(new Error());
  }
};
// #SELECT PR.parkingRecordId, PR.areaId, PR.vehicleClass, PR.registrationNumber, PR.parkingDuration, PR.ownerName, PR.ownerAddress, PR.createdTime, SA.city, SA.area, PS.status FROM parkingRecords PR LEFT JOIN serviceArea SA ON SA.areaId=PR.areaId LEFT JOIN parkingStatus PS ON PS.parkingRecordId=PR.parkingRecordId ORDER BY PR.parkingRecordId DESC;

// SELECT PR.parkingRecordId, PR.areaId, PR.vehicleClass, PR.registrationNumber, PR.parkingDuration, PR.ownerName, PR.ownerAddress, PR.createdTime, SA.city, SA.area, PS.status FROM parkingStatus PS INNER JOIN parkingRecords PR ON PR.parkingRecordId=PS.parkingRecordId INNER JOIN serviceArea SA ON SA.areaId=PS.areaId;
const getParkingDataService = (
  data: CheckStatus,
  req: Request<any>,
  callBack: Function
) => {
  //@ts-ignore
  const currentUserEmail = req.session.email;
  if (true) {
    sqlConnection.query(
      `SELECT PR.parkingRecordId, PR.areaId, PR.vehicleClass, PR.registrationNumber, PR.parkingDuration, PR.ownerName, PR.ownerAddress, PR.createdTime, SA.city, SA.area, PS.status FROM parkingStatus PS INNER JOIN parkingRecords PR ON PR.parkingRecordId=PS.parkingRecordId INNER JOIN serviceArea SA ON SA.areaId=PS.areaId;`,
      [],
      (error, results, fields) => {
        if (error) {
          console.log("Error while fetching vehicle data");
          console.log(error);
          return callBack(error);
        }
        console.log("Fetched vehicle data successfully");
        console.log(results);
        return callBack(null, results);
      }
    );
  } else {
    console.log("No email in session");
    return callBack(new Error());
  }
};
const parkVehicleService = (
  data: ParkingData,
  req: Request<any>,
  callBack: Function
) => {
  //@ts-ignore
  const currentUserEmail = req.session.email;
  // const isAdmin = String(data.isAdmin);
  let parkingResData = null;
  let areaId = 0;
  if (true) {
    sqlConnection.query(
      `SELECT areaId FROM serviceArea WHERE city='${data.cityName}' AND area='${data.areaName}'`,
      (error, results, fields) => {
        if (error) {
          console.log("Error while saving parking data");
          console.log(error);
          return callBack(error);
        }
        console.log("Saved parking data to DB: Area ID");
        console.log(results[0].areaId);
        areaId = results[0].areaId;

        if (areaId) {
          sqlConnection.query(
            `SELECT COUNT(areaId) AS count FROM parkingStatus WHERE areaId=${areaId} AND status='free' LIMIT 1`,
            (error, results, fields) => {
              if (error) {
                console.log("Error while saving parking data");
                console.log(error);
                return callBack(error);
              }
              console.log("Saved parking data to DB: Area ID");
              parkingResData = results;
              if (results[0].count > 0) {
                console.log("Greater than 0", results[0].count);
                // UPDATE parkingStatus SET status='parked'
                sqlConnection.query(
                  `INSERT INTO parkingRecords ( areaId, vehicleClass, registrationNumber, parkingDuration, ownerName, ownerAddress
                    )
                    VALUES (?,?,?,?,?,?)`,
                  [
                    areaId,
                    data.vehicleClass,
                    data.registrationNumber,
                    data.parkingDuration,
                    data.ownerName,
                    data.ownerAddress,
                  ],
                  (error, results, fields) => {
                    if (error) {
                      console.log("Error while saving parking data");
                      console.log(error);
                      return callBack(error);
                    }
                    console.log("Saved parking data to DB");
                    console.log(results);

                    sqlConnection.query(
                      `UPDATE parkingStatus SET status='parked', parkingRecordId='${results.insertId}' WHERE areaId='${areaId}' AND status='free' LIMIT 1`,
                      (error, results, fields) => {
                        if (error) {
                          console.log("Error while saving parking data");
                          console.log(error);
                          return callBack(error);
                        }
                        console.log("Saved parking data to DB: Area ID");
                      }
                    );
                    return callBack(null, results);
                  }
                );
              } else {
                return callBack(null, { error: "No slots available" });
              }
            }
          );
        }
      }
    );
  }
};
export {
  loginService,
  parkVehicleService,
  checkStatusService,
  releaseVehicleService,
  getParkingDataService,
};
