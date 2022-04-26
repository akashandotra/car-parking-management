import React from "react";
import AccountSetting from "./AccountSetting";
import style from "./Dashboard.module.css";
import {
  ComponentTypes,
  IDashboardRightProps,
  IDashboardRightState,
} from "./Dashboard.types";
import ParkingMap from "./ParkingMap";
import ParkVehicle from "./ParkVehicle";
import ReleaseVehicle from "./ReleaseVehicle";
import ServiceAreas from "./ServiceAreas";
import VehicleStatus from "./VehicleStatus";
class DashboardRight extends React.Component<
  IDashboardRightProps,
  IDashboardRightState
> {
  state = {};
  getSelectedComponent = (): JSX.Element => {
    const component = this.props.currentComponent;
    switch (component) {
      case ComponentTypes.ParkNewVehicle:
        return <ParkVehicle />;
      case ComponentTypes.CheckVehicleStatus:
        return <VehicleStatus />;
      case ComponentTypes.ReleaseVehicle:
        return <ReleaseVehicle />;
      case ComponentTypes.AccountSetting:
        return <AccountSetting />;
      case ComponentTypes.PayUserBill:
        return <div>Pay user bill</div>;
      case ComponentTypes.ServiceAreas:
        return <ServiceAreas />;
      case ComponentTypes.ParkingMap:
        return <ParkingMap />;
      default:
        return <></>;
    }
  };
  render(): React.ReactNode {
    return <div className={style.right}>{this.getSelectedComponent()}</div>;
  }
}
export default DashboardRight;
