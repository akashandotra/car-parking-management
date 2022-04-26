import { createTheme, mergeStyles } from "@fluentui/react";
import {
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/components/Dropdown";
import { ITextFieldStyles } from "@fluentui/react/lib/components/TextField";

export enum Status {
  NotStarted = 0,
  Started = 1,
  Completed = 2,
  Error = 3,
}

export interface IParkingData {
  parkingData: ParkingCity[];
  status: Status;
}
export interface IParkingMapState {
  parkingData: IParkingData;
}

export interface ParkingCity {
  city: string;
  areaList: IParkingArea[];
}
export interface IParkingArea {
  areaName: string;
  parkingList: IParkingSlot[];
}
export interface IParkingSlot {
  index: number;
  vehicleClass: VehicleClass;
  registrationNumber: string;
}
/**
 * Service areas
 */
export interface IServiceAreasProps {}
export interface IServiceAreasState {
  areaName: string;
  selectedCity: IDropdownOption<string> | undefined;
}
/**
 * Park vehicle props and state
 */
export interface IParkVehicleProps {}
export interface IParkVehicleState {
  selectedCity: IDropdownOption<string> | undefined;
  selectedParkingArea: IDropdownOption<string> | undefined;
  selectedVehicleClass: IDropdownOption<string> | undefined;
  registrationNumber: string;
  ownerName: string;
  ownerAddress: string;
  parkingDuration: string;
  submitStatus: Status;
  parkingId: string | number;
}
export interface IAccountSettingProps {}
export interface IAccountSettingState {
  userEmail: string;
  userName: string;
  newPassword: string;
  repeatPassword: string;
}
/**
 * Vehicle status state and props
 */
export interface IVehicleStatusProps {}
export interface IVehicleStatusState {
  registrationNumber: string;
  tokenNumber: string;
  parkingData: VehicleStatusResponse[];
  status: Status;
}
/**
 * Vehicle release state and props
 */
export interface IReleaseVehicleProps {}
export interface IReleaseVehicleState {
  registrationNumber: string;
  status: Status;
  releaseData: VehicleStatusResponse[];
}
/**
 * Dashboard right state and props
 */
export interface IDashboardRightProps {
  currentComponent: ComponentTypes;
}
export interface IDashboardRightState {}

/**
 * Dashboard state and props
 */
export interface IDashboardProps {}
export interface IDashboardState {
  currentComponent: ComponentTypes;
}
/**
 * Dashbiard right
 */
export interface IDashboardLeftProps {
  setCurrentComponent: (componentName: ComponentTypes) => void;
  currentComponent: ComponentTypes;
}
export interface IDashboardLeftState {
  userObject: any;
}

export enum ComponentTypes {
  ParkNewVehicle = "ParkNewVehicle",
  CheckVehicleStatus = "CheckVehicleStatus",
  ReleaseVehicle = "ReleaseVehicle",
  AccountSetting = "AccountSetting",
  PayUserBill = "PayUserBill",
  ServiceAreas = "ServiceAreas",
  ParkingMap = "ParkingMap",
}
export enum TextFieldStates {
  registrationNumber = "registrationNumber",
  ownerName = "ownerName",
  ownerAddress = "ownerAddress",
  parkingDuration = "parkingDuration",
  userEmail = "userEmail",
  userName = "userName",
  newPassword = "newPassword",
  repeatPassword = "repeatPassword",
  tokenNumber = "tokenNumber",
}
export enum VehicleClass {
  Bike = "Bike",
  Car = "Car",
  SUV = "SUV",
  PickupTruck = "Pickup truck",
  Bus = "Bus",
  Truck = "Truck",
  None = "None",
  NA = "NA",
}
export interface VehicleStatusResponse {
  area: string;
  areaId: number;
  city: string;
  createdTime: string;
  ownerAddress: string;
  ownerName: string;
  parkingDuration: string;
  parkingRecordId: number;
  registrationNumber: string;
  vehicleClass: string;
  status: string;
}
export const textFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: { width: 300 },
};
export const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    "& > .ms-Shimmer-container": {
      margin: "10px 0",
      background: "transparent",
    },
  },
});

export const customThemeForShimmer = createTheme({
  palette: {
    // palette slot used in Shimmer for main background
    neutralLight: "#bdd4ed",
    // palette slot used in Shimmer for tip of the moving wave
    neutralLighter: "#7AAFE7",
    // palette slot used in Shimmer for all the space around the shimmering elements
    white: "#0078D4",
  },
});
export const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};
