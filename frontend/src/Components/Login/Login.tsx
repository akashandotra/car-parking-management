import React, { FormEvent } from "react";
import { Label } from "@fluentui/react/lib/Label";
import { TextField } from "@fluentui/react/lib/TextField";
// import { Checkbox } from "@fluentui/react/lib/Checkbox";
import HeaderNav from "../Header/HeaderNav";
import style from "./Login.module.css";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { ILoginState } from "./Login.types";
import classNames from "classnames";
import axios from "axios";
import { withRouter } from "react-router-dom";
class Login extends React.Component<any, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAdmin: false,
      userEmail: "admin@gmail.com",
      userPassword: "test1234",
      emailError: "",
      passwordError: "",
      loginError: "",
    };
    if (localStorage.getItem("userObject")) {
      this.props.history.push("/dashboard");
    }
  }
  handleCheckboxChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    checked?: boolean
  ) => {
    if (typeof checked !== "undefined") {
      this.setState({ isAdmin: checked });
    }
  };
  handleEmailChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ) => {
    if (typeof newValue !== "undefined") {
      if (!this.validateEmail(newValue)) {
        this.setState({
          emailError: "Please enter a valid email",
          userEmail: newValue,
        });
      } else {
        this.setState({
          userEmail: newValue,
          emailError: "",
        });
      }
    }
  };
  handlePasswordChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string | undefined
  ) => {
    if (typeof newValue !== "undefined") {
      if (!newValue.length) {
        this.setState({
          userPassword: newValue,
          passwordError: "Password cannot be empty",
        });
      } else {
        this.setState({
          userPassword: newValue,
          passwordError: "",
        });
      }
    }
  };
  handleLogin = () => {
    const { emailError, passwordError, userEmail, userPassword } = this.state;
    if (!emailError.length && !passwordError.length) {
      axios
        .post("/api/login", {
          userEmail: userEmail,
          userPassword: userPassword,
        })
        .then((data) => {
          console.log(data.data.data);
          const res: ILoginState[] = data.data.data;
          if (res.length) {
            localStorage.setItem("userObject", JSON.stringify(res[0]));
            this.props.history.push("/dashboard");
          } else {
            this.setState({
              loginError:
                "Wrong user email or password combination. Please try again.",
            });
          }
        })
        .catch((error) => {
          console.log("error: " + error);
          this.setState({
            loginError: "Some error occured at the server level",
          });
        });
    }
  };
  validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  render(): React.ReactNode {
    const {
      // isAdmin,
      userEmail,
      userPassword,
      emailError,
      passwordError,
      loginError,
    } = this.state;
    return (
      <div>
        <HeaderNav />
        <div className={style.container}>
          <div className={style.overlay}>
            <div className={style.loginContent}>
              <h2>Login</h2>
              {/* <div>Please enter your credentials to login</div> */}
              <div className={style.singleInputContainer}>
                <Label htmlFor="userEmail">Email</Label>
                <TextField
                  id="userEmail"
                  errorMessage={emailError}
                  name="userEmail"
                  value={userEmail}
                  onChange={this.handleEmailChange}
                />
              </div>
              <div className={style.singleInputContainer}>
                <TextField
                  label="Password"
                  type="password"
                  canRevealPassword
                  errorMessage={passwordError}
                  revealPasswordAriaLabel="Show password"
                  id="userPassword"
                  onChange={this.handlePasswordChange}
                  name="userPassword"
                  value={userPassword}
                />
              </div>
              {/* <div>
                <Checkbox
                  label="Check if you are an admin"
                  checked={isAdmin}
                  onChange={this.handleCheckboxChange}
                />
              </div> */}
              <div
                className={classNames(
                  style.singleInputContainer,
                  style.loginButtonEnd
                )}
              >
                <PrimaryButton
                  text="Login"
                  onClick={this.handleLogin}
                  allowDisabledFocus
                  disabled={false}
                  checked={false}
                  style={{
                    width: "100%",
                    // backgroundColor: "#db2723",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                {loginError}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
