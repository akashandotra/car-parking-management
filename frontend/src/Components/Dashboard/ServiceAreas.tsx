import React from "react";
import style from "./Dashboard.module.css";
import {
  customThemeForShimmer,
  dropdownStyles,
  IServiceAreasProps,
  IServiceAreasState,
  TextFieldStates,
  textFieldStyles,
  wrapperClass,
} from "./Dashboard.types";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  Shimmer,
} from "@fluentui/react";

class ServiceAreas extends React.Component<
  IServiceAreasProps,
  IServiceAreasState
> {
  state = {
    areaName: "",
    selectedCity: undefined,
  };
  handleFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (typeof newValue !== "undefined") {
      this.setState({ areaName: newValue });
    }
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
  handleButtonClick = () => {
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
      { key: "kathua", text: "Kathua", disabled: true },
      { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
      {
        key: "jharkhandHeaders",
        text: "Jharkhand",
        itemType: DropdownMenuItemType.Header,
      },
      { key: "ranchi", text: "Ranchi" },
      { key: "devghar", text: "Devghar" },
    ];
    const { areaName, selectedCity } = this.state;
    return (
      <div>
        <h2 className={style.header}>Servicable Areas</h2>
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
            <TextField
              label="Enter the area name"
              value={areaName}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.registrationNumber}
            />
          </div>
        </div>
        <div className={style.singleField}>
          <PrimaryButton
            text="Save details"
            onClick={this.handleButtonClick}
            allowDisabledFocus
            disabled={false}
          />
        </div>
        <div className={style.recordDetails}>
          <p className={style.recordTittle}>Current Areas:</p>
          <div className={style.detailsWrapper}>
            <div className={style.areaContainer}>
              <div className={style.singleArea}>
                <h4>Jalandhar</h4>
                <ul>
                  <li>Area 1</li>
                  <li>Area 1</li>
                  <li>Area 1</li>
                  <li>Area 1</li>
                </ul>
              </div>
              <div className={style.singleArea}>
                <h4>Ranchi</h4>
                <ul>
                  <li>Area 1</li>
                  <li>Area 1</li>
                  <li>Area 1</li>
                  <li>Area 1</li>
                </ul>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    );
  }
}
export default ServiceAreas;
