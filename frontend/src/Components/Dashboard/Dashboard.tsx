import React from "react";
import DashboardLeft from "./DashboardLeft";
import style from "./Dashboard.module.css";
import DashboardRight from "./DashboardRight";
import { ComponentTypes } from "./Dashboard.types";
import { withRouter } from "react-router-dom";
class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentComponent: ComponentTypes.ParkNewVehicle,
      userObject: this.getUserObject(),
    };

    if (!this.state.userObject) {
      this.props.history.push("/login");
    }
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
  setCurrentComponent = (componentName: ComponentTypes): void => {
    if (this.state.currentComponent !== componentName) {
      this.setState({
        currentComponent: componentName,
      });
    }
  };
  render(): React.ReactNode {
    const { currentComponent } = this.state;
    return (
      <div className={style.container}>
        <DashboardLeft
          setCurrentComponent={this.setCurrentComponent}
          currentComponent={currentComponent}
        />
        <DashboardRight currentComponent={currentComponent} />
      </div>
    );
  }
}
export default withRouter(Dashboard);
