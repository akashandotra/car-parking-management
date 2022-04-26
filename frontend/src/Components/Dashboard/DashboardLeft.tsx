import React from "react";
import {
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence,
} from "@fluentui/react/lib/Persona";
import person from "../../images/person.png";

import style from "./Dashboard.module.css";
import { ComponentTypes, IDashboardLeftState } from "./Dashboard.types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
class DashboardLeft extends React.Component<any, IDashboardLeftState> {
  state = {
    userObject: null,
  };
  componentDidMount() {
    const userObject = this.getUserObject();
    this.setState({
      userObject: userObject,
    });
  }
  getUserObject = () => {
    try {
      const userObject = localStorage.getItem("userObject");
      if (userObject) {
        return JSON.parse(userObject);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  handleLogout = () => {
    localStorage.removeItem("userObject");
    this.props.history.push("/login");
  };
  render(): React.ReactNode {
    const { userObject } = this.state;
    const personaDetails: IPersonaSharedProps = {
      imageUrl: person,
      imageInitials: "PT",
      //@ts-ignore
      text: userObject ? userObject.fullName : "Admin",
      secondaryText: "Online",
      tertiaryText: "Available",
      optionalText: "Available",
      showSecondaryText: true,
    };

    const { setCurrentComponent, currentComponent } = this.props;
    return (
      <div className={style.left}>
        <div className={style.personaContainer}>
          <Persona
            {...personaDetails}
            size={PersonaSize.size32}
            presence={PersonaPresence.online}
            imageAlt="Admin"
            style={{ color: "#fff" }}
          />
        </div>
        <div>
          <div className={style.mainNavigationIndicator}>Main Navigation</div>
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.ParkNewVehicle
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.ParkNewVehicle);
            }}
          >
            Park a new vehicle
          </div>
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.CheckVehicleStatus
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.CheckVehicleStatus);
            }}
          >
            Check vehicle status
          </div>
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.ReleaseVehicle
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.ReleaseVehicle);
            }}
          >
            Release a vehicle
          </div>
          {/* <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.AccountSetting
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.AccountSetting);
            }}
          >
            Account Setting
          </div> */}

          {/* <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.ServiceAreas
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.ServiceAreas);
            }}
          >
            Service Areas
          </div> */}
          <div
            className={classNames(
              style.leftNavItem,
              currentComponent === ComponentTypes.ParkingMap
                ? style.activeNavItem
                : ""
            )}
            onClick={() => {
              setCurrentComponent(ComponentTypes.ParkingMap);
            }}
          >
            Parking Map
          </div>
        </div>
        <div
          className={style.leftNavFooter}
          onClick={this.handleLogout}
          style={{ cursor: "pointer" }}
        >
          Logout
        </div>
      </div>
    );
  }
}
export default withRouter(DashboardLeft);
