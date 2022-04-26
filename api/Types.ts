export interface UserData {
  userEmail: string;
  userPassword: string;
  isAdmin: number;
}

export interface ParkingData {
  cityName: string;
  areaName: string;
  vehicleClass: string;
  registrationNumber: string;
  parkingDuration: string;
  ownerName: string;
  ownerAddress: string;
}

export interface CheckStatus {
  registrationNumber: string;
  tokenNumber: string;
}

export const ErrorConstants = { DatabaseConnection: "Error" };
