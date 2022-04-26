import React from "react";
import style from "./Dashboard.module.css";
import {
  customThemeForShimmer,
  IAccountSettingProps,
  IAccountSettingState,
  TextFieldStates,
  textFieldStyles,
  wrapperClass,
} from "./Dashboard.types";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { Shimmer } from "@fluentui/react";

class AccountSetting extends React.Component<
  IAccountSettingProps,
  IAccountSettingState
> {
  state = {
    userEmail: "",
    userName: "",
    newPassword: "",
    repeatPassword: "",
  };
  handleFieldChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (typeof newValue !== "undefined") {
      const key: string = event.currentTarget.name;
      switch (key) {
        case TextFieldStates.userEmail:
          this.setState({
            userEmail: newValue,
          });
          break;
        case TextFieldStates.userName:
          this.setState({
            userName: newValue,
          });
          break;
        case TextFieldStates.newPassword:
          this.setState({
            newPassword: newValue,
          });
          break;
        case TextFieldStates.repeatPassword:
          this.setState({
            repeatPassword: newValue,
          });
          break;
      }
    }
  };
  handleButtonClick = () => {
    console.log("clicked");
  };
  render(): React.ReactNode {
    const { userEmail, userName, newPassword, repeatPassword } = this.state;
    return (
      <div>
        <h2 className={style.header}>Account Settings</h2>
        <div className={style.parkingContainer}>
          <div className={style.singleField}>
            <TextField
              label="Email"
              value={userEmail}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.userEmail}
            />
          </div>

          <div className={style.singleField}>
            <TextField
              label="Full Name"
              value={userName}
              onChange={this.handleFieldChange}
              styles={textFieldStyles}
              name={TextFieldStates.userName}
            />
          </div>

          <div className={style.singleField}>
            <TextField
              label="New Password"
              type="password"
              canRevealPassword
              revealPasswordAriaLabel="Show password"
              onChange={this.handleFieldChange}
              name={TextFieldStates.newPassword}
              value={newPassword}
            />
          </div>

          <div className={style.singleField}>
            <TextField
              label="Repeat Password"
              type="password"
              canRevealPassword
              revealPasswordAriaLabel="Show password"
              onChange={this.handleFieldChange}
              name={TextFieldStates.repeatPassword}
              value={repeatPassword}
            />
          </div>
        </div>
        <div className={style.singleField}>
          <PrimaryButton
            text="Update details"
            onClick={this.handleButtonClick}
            allowDisabledFocus
            disabled={false}
          />
        </div>
        <div className={style.recordDetails}>
          <p className={style.recordTittle}>
            Please enter the details to update it in the database.
          </p>
          <div className={style.detailsWrapper}>
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
export default AccountSetting;
