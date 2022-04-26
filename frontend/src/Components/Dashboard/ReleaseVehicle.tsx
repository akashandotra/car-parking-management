import React from "react";
import style from "./Dashboard.module.css";
import {
  customThemeForShimmer,
  IReleaseVehicleProps,
  IReleaseVehicleState,
  Status,
  TextFieldStates,
  textFieldStyles,
  VehicleStatusResponse,
  wrapperClass,
} from "./Dashboard.types";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Shimmer } from "@fluentui/react";
import axios from "axios";

class ReleaseVehicle extends React.Component<
  IReleaseVehicleProps,
  IReleaseVehicleState
> {
  state = {
    registrationNumber: "",
    status: Status.NotStarted,
    releaseData: [],
  };
  handleFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (typeof newValue !== "undefined" && !isNaN(Number(newValue))) {
      this.setState({ registrationNumber: newValue });
    }
  };
  handleButtonClick = () => {
    console.log("clicked");
    const { registrationNumber } = this.state;
    if (registrationNumber.length) {
      this.setState({
        status: Status.Started,
      });
      axios
        .post("/api/release", {
          tokenNumber: registrationNumber,
        })
        .then((data) => {
          console.log(data);
          let releaseData: VehicleStatusResponse[] = data?.data?.data;
          if (!releaseData || !releaseData.length) {
            releaseData = [];
          }
          this.setState({
            status: Status.Completed,
            releaseData: releaseData,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            status: Status.Error,
          });
        });
    }
  };
  render(): React.ReactNode {
    const { registrationNumber, status, releaseData } = this.state;
    return (
      <div>
        <h2 className={style.header}>Release vehicle</h2>
        <div className={style.parkingContainer}>
          <div className={style.singleField}>
            <TextField
              label="Vehicle token number"
              value={registrationNumber}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.registrationNumber}
            />
          </div>
        </div>
        <div className={style.singleField}>
          <PrimaryButton
            text="Release Vehicle"
            onClick={this.handleButtonClick}
            allowDisabledFocus
            disabled={false}
          />
        </div>
        <div className={style.recordDetails}>
          <p className={style.recordTittle}>Final slip will appear here.</p>
          <div className={style.detailsWrapper}>
            {status === Status.Completed && releaseData.length === 0 && (
              <div>Vehicle Already Released</div>
            )}
            {((status === Status.Completed && releaseData.length > 0) ||
              false) && (
              <div className={style.receiptMain}>
                <h2>
                  {
                    //@ts-ignore
                    releaseData[0].city
                  }
                </h2>
                <h4>
                  {
                    //@ts-ignore
                    releaseData[0].area
                  }
                </h4>
                <hr />
                <h1>
                  {
                    //@ts-ignore
                    new Date(releaseData[0].createdTime).toDateString()
                  }
                </h1>
                <h2 className={style.reCar}>Car</h2>
                <p className={style.reP}>
                  This ticket also serves as your receipt
                </p>
                <p className={style.reP}>Base Price: INR 20 Per Hour</p>
                <h4 className={style.reTotal}>
                  TOTAL: INR{" "}
                  {
                    //@ts-ignore
                    releaseData[0].parkingDuration * 20
                  }
                </h4>
                <p>
                  Token Number:{" "}
                  {
                    //@ts-ignore
                    releaseData[0].parkingRecordId
                  }
                </p>
                <div className={style.reFinalDetails}>
                  <p>
                    Payee:{" "}
                    {
                      //@ts-ignore
                      releaseData[0].ownerName
                    }
                  </p>
                  <p>
                    Reg Number:{" "}
                    {
                      //@ts-ignore
                      releaseData[0].registrationNumber
                    }
                  </p>
                </div>
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
export default ReleaseVehicle;
