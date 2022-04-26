import React from "react";
import style from "./Dashboard.module.css";
import {
  customThemeForShimmer,
  IVehicleStatusProps,
  IVehicleStatusState,
  Status,
  TextFieldStates,
  textFieldStyles,
  VehicleClass,
  VehicleStatusResponse,
  wrapperClass,
} from "./Dashboard.types";
import bike1 from "../../images/bike1.png";
// import parking from "../../images/parking.png";
import car from "../../images/Tuning-Car-PNG-Photo.png";
import suv from "../../images/suv.png";
import bus from "../../images/bus.png";
import truck from "../../images/truck.png";
import pickUpTruck from "../../images/pickUpTruck.png";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Shimmer } from "@fluentui/react";
import axios from "axios";

class VehicleStatus extends React.Component<
  IVehicleStatusProps,
  IVehicleStatusState
> {
  state = {
    registrationNumber: "",
    tokenNumber: "",
    parkingData: [],
    status: Status.NotStarted,
  };
  handleFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (typeof newValue !== "undefined") {
      //@ts-ignore
      if (event.target.name === TextFieldStates.registrationNumber) {
        this.setState({ registrationNumber: newValue });
      } else {
        this.setState({ tokenNumber: newValue });
      }
    }
  };
  handleButtonClick = () => {
    console.log("clicked");
    const { registrationNumber, tokenNumber } = this.state;
    if (registrationNumber.length || tokenNumber.length) {
      this.setState({
        status: Status.Started,
      });
      axios
        .post("/api/checkStatus", {
          registrationNumber: registrationNumber,
          tokenNumber: tokenNumber,
        })
        .then((data) => {
          const mainData: VehicleStatusResponse[] = data?.data?.data;
          if (typeof mainData !== "undefined") {
            this.setState({
              parkingData: mainData,
              status: Status.Completed,
            });
          } else {
            this.setState({
              parkingData: [],
              status: Status.Completed,
            });
          }
          console.log(mainData);
        })
        .catch((error) => {
          this.setState({
            parkingData: [],
            status: Status.Error,
          });
        });
    }
  };
  render(): React.ReactNode {
    const { registrationNumber, tokenNumber, status, parkingData } = this.state;
    return (
      <div>
        <h2 className={style.header}>Check vehicle status</h2>
        <div className={style.parkingContainer}>
          <div className={style.singleField}>
            <TextField
              label="Vehicle registration number"
              value={registrationNumber}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.registrationNumber}
            />
          </div>
          <div className={style.singleField}>
            <TextField
              label="Parking token number"
              value={tokenNumber}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.tokenNumber}
            />
          </div>
        </div>
        <div className={style.singleField}>
          <PrimaryButton
            text="Search details"
            onClick={this.handleButtonClick}
            allowDisabledFocus
            disabled={false}
          />
        </div>
        <div className={style.recordDetails}>
          <p className={style.recordTittle}>
            Parking details will appear here.
          </p>
          {/* {JSON.stringify(parkingData)} */}
          <div className={style.detailsWrapper}>
            {status === Status.Completed && (
              <div>
                {parkingData.length === 0 && <div>No results found</div>}
                {parkingData.map((item: VehicleStatusResponse) => {
                  return (
                    <div className={style.card}>
                      <div className={style.cardContent}>
                        <div>
                          Registration Number: {item.registrationNumber}
                        </div>
                        <div>Parking Token Number: {item.parkingRecordId}</div>
                        <div>
                          Parked Date: {new Date(item.createdTime).toString()}
                        </div>
                        <div>Duration: {item.parkingDuration} hours</div>
                        <div>Owner Name: {item.ownerName}</div>
                        <div>Owner Address: {item.ownerAddress}</div>
                        <div>Vehicle Class: {item.vehicleClass}</div>
                        <div>
                          Area: {item.city} {item.area}
                        </div>
                        <div>Status: {item.status ? "Parked" : "Released"}</div>
                      </div>

                      <div className={style.parkingImage}>
                        {item.vehicleClass === VehicleClass.Bike && (
                          <img src={bike1} alt="bike" />
                        )}
                        {item.vehicleClass === VehicleClass.Car && (
                          <img src={car} alt="car" />
                        )}
                        {item.vehicleClass === VehicleClass.SUV && (
                          <img src={suv} alt="suv" />
                        )}
                        {item.vehicleClass === VehicleClass.Bus && (
                          <img src={bus} alt="bus" />
                        )}
                        {item.vehicleClass === VehicleClass.Truck && (
                          <img src={truck} alt="truck" />
                        )}
                        {item.vehicleClass === VehicleClass.PickupTruck && (
                          <img src={pickUpTruck} alt="pick up truck" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {status === Status.Started && (
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
          </div>
        </div>
      </div>
    );
  }
}
export default VehicleStatus;
