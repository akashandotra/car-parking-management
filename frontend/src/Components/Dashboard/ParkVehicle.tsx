import React from "react";
import style from "./Dashboard.module.css";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import {
  customThemeForShimmer,
  dropdownStyles,
  IParkVehicleProps,
  IParkVehicleState,
  Status,
  TextFieldStates,
  textFieldStyles,
  wrapperClass,
} from "./Dashboard.types";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Shimmer } from "@fluentui/react";
import axios from "axios";

class ParkVehicle extends React.Component<
  IParkVehicleProps,
  IParkVehicleState
> {
  state = {
    selectedCity: undefined,
    selectedParkingArea: undefined,
    selectedVehicleClass: undefined,
    registrationNumber: "PN-123-123-PQ",
    ownerName: "Akash Andotra",
    ownerAddress: "Kathua",
    parkingDuration: "5",
    submitStatus: Status.NotStarted,
    parkingId: 0,
  };
  onCityChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption<any> | undefined,
    index?: number | undefined
  ): void => {
    this.setState({
      selectedCity: item,
    });
  };
  onParkingPlaceChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption<any> | undefined,
    index?: number | undefined
  ): void => {
    this.setState({
      selectedParkingArea: item,
    });
  };
  onVehicleClassChange = (
    event: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption<any> | undefined,
    index?: number | undefined
  ): void => {
    this.setState({
      selectedVehicleClass: item,
    });
  };
  handleFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (typeof newValue !== "undefined") {
      switch (event.currentTarget.name) {
        case TextFieldStates.registrationNumber:
          this.setState({ registrationNumber: newValue });
          break;
        case TextFieldStates.ownerName:
          this.setState({ ownerName: newValue });
          break;
        case TextFieldStates.ownerAddress:
          this.setState({ ownerAddress: newValue });
          break;
        case TextFieldStates.parkingDuration:
          const val = Number(newValue);
          if (newValue.length === 0 || (!isNaN(val) && val > 0 && val < 12)) {
            this.setState({ parkingDuration: newValue });
          }
          break;
        default:
          break;
      }
    }
  };
  handleButtonClick = () => {
    const {
      selectedCity,
      selectedParkingArea,
      selectedVehicleClass,
      registrationNumber,
      ownerName,
      ownerAddress,
      parkingDuration,
    } = this.state;
    if (
      selectedCity &&
      selectedVehicleClass &&
      selectedParkingArea &&
      registrationNumber.length > 4 &&
      ownerName.length > 4 &&
      ownerAddress.length > 4 &&
      parkingDuration
    ) {
      //@ts-ignore
      const city = selectedCity.text;
      //@ts-ignore
      const area = selectedParkingArea.text;
      //@ts-ignore
      const vehicleClass = selectedVehicleClass.text;
      this.setState({
        submitStatus: Status.Started,
      });
      axios
        .post("/api/park", {
          cityName: city,
          areaName: area,
          vehicleClass: vehicleClass,
          registrationNumber: registrationNumber,
          parkingDuration: parkingDuration,
          ownerName: ownerName,
          ownerAddress: ownerAddress,
        })
        .then((data: any) => {
          console.log(data);
          this.setState({
            submitStatus: Status.Completed,
            parkingId: data?.data?.data?.insertId,

            selectedCity: undefined,
            selectedParkingArea: undefined,
            selectedVehicleClass: undefined,

            registrationNumber: "",
            ownerName: "",
            ownerAddress: "",
            parkingDuration: "",
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            submitStatus: Status.Error,
          });
        });
    }

    console.log("clicked");
  };
  render(): React.ReactNode {
    const parkingCityList = [
      {
        key: "punjabHeaders",
        text: "Punjab",
        itemType: DropdownMenuItemType.Header,
      },
      { key: "jalandhar", text: "Jalandhar" },
      { key: "chandigarh", text: "Chandigarh" },
      { key: "amritsar", text: "Amritsar" },
      // { key: "kathua", text: "Kathua", disabled: true },
      { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
      {
        key: "jharkhandHeaders",
        text: "Jharkhand",
        itemType: DropdownMenuItemType.Header,
      },
      { key: "ranchi", text: "Ranchi" },
      // { key: "devghar", text: "Devghar" },
    ];
    // const parkingJalandharList = [
    //   { key: "jalandhar_lpu", text: "LPU Mall" },
    //   { key: "jalandhar_law_gate", text: "LPU Law Gate" },
    //   { key: "chandigarh_1", text: "Elante Mall" },
    //   { key: "amritsar_1", text: "Golden Temple Parking Area" },
    //   { key: "ranchi_1", text: "Lalpur" },
    //   { key: "ranchi_2", text: "SAIL Township" },
    // ];

    const parkingList = {
      Jalandhar: [
        { key: "jalandhar_lpu", text: "LPU Mall" },
        { key: "jalandhar_law_gate", text: "LPU Law Gate" },
      ],
      Chandigarh: [{ key: "chandigarh_1", text: "Elante Mall" }],
      Amritsar: [{ key: "amritsar_1", text: "Golden Temple Parking Area" }],
      Ranchi: [
        { key: "ranchi_1", text: "Lalpur" },
        { key: "ranchi_2", text: "SAIL Township" },
      ],
    };
    const vehicleClasses = [
      { key: "bike", text: "Bike" },
      { key: "car", text: "Car" },
      { key: "suv", text: "SUV" },
      { key: "small_pickup", text: "Pickup truck" },
      { key: "bus", text: "Bus" },
      { key: "truck", text: "Truck" },
    ];
    const {
      selectedCity,
      selectedParkingArea,
      ownerAddress,
      ownerName,
      registrationNumber,
      parkingDuration,
      selectedVehicleClass,
      submitStatus,
      parkingId,
    } = this.state;
    return (
      <div>
        <h2 className={style.header}>Park a new vehicle</h2>
        <div className={style.parkingContainer}>
          <div className={style.singleField}>
            <Dropdown
              label="Parking City"
              // @ts-ignore
              selectedKey={selectedCity ? selectedCity?.key : undefined}
              onChange={this.onCityChange}
              placeholder="Select a city"
              options={parkingCityList}
              styles={dropdownStyles}
            />
          </div>
          <div className={style.singleField}>
            <Dropdown
              label="Parking Area"
              selectedKey={
                // @ts-ignore
                selectedParkingArea ? selectedParkingArea?.key : undefined
              }
              onChange={this.onParkingPlaceChange}
              placeholder="Select a parking area"
              options={
                //@ts-ignore
                selectedCity ? parkingList[selectedCity.text] : undefined
              }
              styles={dropdownStyles}
            />
          </div>
          <div className={style.singleField}>
            <Dropdown
              label="Vehicle Class"
              selectedKey={
                // @ts-ignore
                selectedVehicleClass ? selectedVehicleClass?.key : undefined
              }
              onChange={this.onVehicleClassChange}
              placeholder="Select a vehicle type"
              options={vehicleClasses}
              styles={dropdownStyles}
            />
          </div>
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
              label="Parking duration"
              value={parkingDuration}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.parkingDuration}
            />
          </div>
          <div className={style.singleField}>
            <TextField
              label="Owner name"
              value={ownerName}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.ownerName}
            />
          </div>
          <div className={style.singleField}>
            <TextField
              label="Owner address"
              value={ownerAddress}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.ownerAddress}
            />
          </div>
        </div>
        <div className={style.singleField}>
          <PrimaryButton
            text="Add to records"
            onClick={this.handleButtonClick}
            allowDisabledFocus
            disabled={false}
          />
        </div>
        <div className={style.recordDetails}>
          <p className={style.recordTittle}>
            Parking details will appear here once a record is successfully
            submitted.
          </p>
          <div className={style.detailsWrapper}>
            {submitStatus === Status.Started && (
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
            {submitStatus === Status.Completed && (
              <div>
                <strong>
                  {parkingId ? (
                    <span>Your parking token Id is: {parkingId}</span>
                  ) : (
                    <span>No slots available!</span>
                  )}
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ParkVehicle;
