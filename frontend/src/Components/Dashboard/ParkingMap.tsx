import React from "react";
import style from "./Dashboard.module.css";

import bike1 from "../../images/bike1.png";
// import parking from "../../images/parking.png";
import car from "../../images/Tuning-Car-PNG-Photo.png";
import suv from "../../images/suv.png";
import bus from "../../images/bus.png";
import truck from "../../images/truck.png";
import pickUpTruck from "../../images/pickUpTruck.png";
import {
  customThemeForShimmer,
  IParkingArea,
  IParkingData,
  // IParkingMapState,
  IParkingSlot,
  ParkingCity,
  Status,
  VehicleClass,
  VehicleStatusResponse,
  wrapperClass,
} from "./Dashboard.types";
import axios from "axios";
import { Shimmer } from "@fluentui/react";

class ParkingMap extends React.Component<any, IParkingData> {
  state = {
    parkingData: [],
    status: Status.Started,
  };
  componentDidMount() {
    axios
      .get("/api/parkingData")
      .then((data) => {
        const mainData: VehicleStatusResponse[] = data?.data?.data;

        const res: ParkingCity[] = [];

        if (mainData && mainData.length) {
          mainData.forEach((item, index) => {
            let cityIndex = -1;
            res.forEach((cityItem, index) => {
              if (cityItem.city === item.city) {
                cityIndex = index;
              }
            });
            if (cityIndex !== -1) {
              let areaIndex = -1;
              res[cityIndex].areaList.forEach((areaItem, index) => {
                if (areaItem.areaName === item.area) {
                  areaIndex = index;
                }
              });
              if (areaIndex !== -1) {
                res[cityIndex].areaList[areaIndex].parkingList.push({
                  index: res[cityIndex].areaList[areaIndex].parkingList.length,
                  //@ts-ignore
                  vehicleClass:
                    item.status === "parked" ? item.vehicleClass : "NA",
                  registrationNumber:
                    item.status === "parked"
                      ? item.registrationNumber
                      : "Free slot",
                });
              } else {
                res[cityIndex].areaList.push({
                  areaName: item.area,
                  parkingList: [
                    {
                      index: 0,
                      //@ts-ignore
                      vehicleClass:
                        item.status === "parked" ? item.vehicleClass : "NA",
                      registrationNumber:
                        item.status === "parked"
                          ? item.registrationNumber
                          : "Free slot",
                    },
                  ],
                });
              }
            } else {
              res.push({
                city: item.city,
                areaList: [
                  {
                    areaName: item.area,
                    parkingList: [
                      {
                        index: 0,
                        //@ts-ignore
                        vehicleClass:
                          item.status === "parked" ? item.vehicleClass : "NA",
                        registrationNumber:
                          item.status === "parked"
                            ? item.registrationNumber
                            : "Free slot",
                      },
                    ],
                  },
                ],
              });
            }
          });
        }
        this.setState({
          parkingData: res,
          status: Status.Completed,
        });
      })
      .catch((error) => {
        this.setState({
          status: Status.Error,
        });
        console.log(error);
      });
  }
  getParkingMap = () => {
    return this.state.parkingData.map((item: ParkingCity) => {
      return (
        <>
          <h4 className={style.cityNameH4}>{item.city}</h4>
          <div className={style.cityContainer}>
            {item.areaList.map((parkingArea: IParkingArea) => {
              return (
                <>
                  <h5 className={style.areaNameH5}>{parkingArea.areaName}</h5>
                  <div className={style.mainMapContent}>
                    {parkingArea.parkingList.map(
                      (parkingItem: IParkingSlot) => {
                        return (
                          <div className={style.singleParking}>
                            <div className={style.parkingImage}>
                              {parkingItem.vehicleClass ===
                                VehicleClass.Bike && (
                                <img src={bike1} alt="bike" />
                              )}
                              {parkingItem.vehicleClass ===
                                VehicleClass.Car && <img src={car} alt="car" />}
                              {parkingItem.vehicleClass ===
                                VehicleClass.SUV && <img src={suv} alt="suv" />}
                              {parkingItem.vehicleClass ===
                                VehicleClass.Bus && <img src={bus} alt="bus" />}
                              {parkingItem.vehicleClass ===
                                VehicleClass.Truck && (
                                <img src={truck} alt="truck" />
                              )}
                              {parkingItem.vehicleClass ===
                                VehicleClass.PickupTruck && (
                                <img src={pickUpTruck} alt="pick up truck" />
                              )}
                              {parkingItem.vehicleClass ===
                                VehicleClass.Bike && (
                                <img src={bike1} alt="bike" />
                              )}
                            </div>
                            <p>{parkingItem.registrationNumber}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </>
              );
            })}
          </div>
          <hr />
        </>
      );
    });
  };
  render(): React.ReactNode {
    return (
      <div className={style.mapContainer}>
        <h3>Map</h3>
        <hr />
        {this.state.status === Status.Started && (
          <div className={style.shimmerWrapper}>
            <div className={wrapperClass}>
              <Shimmer
                shimmerColors={{
                  shimmer: customThemeForShimmer.palette.themeTertiary,
                  shimmerWave: customThemeForShimmer.palette.themeSecondary,
                }}
              />
              <Shimmer
                width="75%"
                shimmerColors={{
                  shimmer: customThemeForShimmer.palette.themeTertiary,
                  shimmerWave: customThemeForShimmer.palette.themeSecondary,
                }}
              />
              <Shimmer
                width="50%"
                shimmerColors={{
                  shimmer: customThemeForShimmer.palette.themeTertiary,
                  shimmerWave: customThemeForShimmer.palette.themeSecondary,
                }}
              />
            </div>
          </div>
        )}
        <div className={style.mapListTopContainer}>{this.getParkingMap()}</div>
      </div>
    );
  }
}
export default ParkingMap;

// VehicleClass
// const sampleParkingData: IParkingData = {
//   status: Status.Completed,
//   parkingData: [
//     {
//       city: "Jalandhar",
//       areaList: [
//         {
//           areaName: "LPU Law Gate",
//           parkingList: [
//             {
//               index: 0,
//               vehicleClass: VehicleClass.SUV,
//               registrationNumber: "123-ABC-AHG",
//             },
//             {
//               index: 1,
//               vehicleClass: VehicleClass.Car,
//               registrationNumber: "JH-ABC-AHG",
//             },
//             {
//               index: 2,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 3,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 4,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 5,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 6,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 7,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 8,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 9,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 10,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 11,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//           ],
//         },
//         {
//           areaName: "LPU Gate",
//           parkingList: [
//             {
//               index: 0,
//               vehicleClass: VehicleClass.SUV,
//               registrationNumber: "123-ABC-AHG",
//             },
//             {
//               index: 1,
//               vehicleClass: VehicleClass.Car,
//               registrationNumber: "JH-ABC-AHG",
//             },
//             {
//               index: 2,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 3,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 4,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 5,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 6,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 7,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 8,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 9,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 10,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 11,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       city: "Ranchi",
//       areaList: [
//         {
//           areaName: "Bus stand parking place",
//           parkingList: [
//             {
//               index: 0,
//               vehicleClass: VehicleClass.SUV,
//               registrationNumber: "123-ABC-AHG",
//             },
//             {
//               index: 1,
//               vehicleClass: VehicleClass.Car,
//               registrationNumber: "JH-ABC-AHG",
//             },
//             {
//               index: 2,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 3,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 4,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 5,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 6,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 7,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 8,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 9,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 10,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//             {
//               index: 11,
//               vehicleClass: VehicleClass.None,
//               registrationNumber: "Free Slot",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
