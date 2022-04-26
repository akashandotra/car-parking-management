import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import style from "./Header.module.css";

class HeaderNav extends React.Component<any> {
  getPath(route: string): boolean {
    const path = this.props.history.location.pathname;
    switch (route) {
      case "/":
        return "/" === path;
      case "/login":
        return "/login" === path;
      default:
        return false;
    }
  }
  render() {
    return (
      <div className={style.nav}>
        <ul>
          <li className={this.getPath("/") ? style.active : ""}>
            <Link to="/">Home</Link>
          </li>
          {/* <li className={this.getPath("/contact") ? style.active : ""}>
            Contact
          </li> */}
          {/* <li className={this.getPath("/pay") ? style.active : ""}>
            Pay Bills
          </li> */}
          <li className={this.getPath("/login") ? style.active : ""}>
            <Link to="/login">Login</Link>
          </li>
          {/* <li className={this.getPath("/signup") ? style.active : ""}>
            Create Account
          </li> */}
        </ul>
      </div>
    );
  }
}
export default withRouter(HeaderNav);
