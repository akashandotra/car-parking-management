import React from "react";
import style from "./Header.module.css";
import { IoCall } from "react-icons/io5";
import { IoMailSharp } from "react-icons/io5";
import { RiHistoryLine } from "react-icons/ri";
import HeaderNav from "./HeaderNav";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className={style.headerTop}>
        <HeaderNav />
        <div className={style.headerTopBanner}>
          <h1>Cark Parking System</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia
            iusto saepe dolorum obcaecati ratione suscipit facilis doloribus
            modi labore enim velit, optio, delectus, quod possimus fugiat
            molestiae quos praesentium reprehenderit?
          </p>
          <div className={style.buttonContainer}>
            <Link to="/login">
              <button>Admin Login</button>
            </Link>
          </div>
        </div>
        <div className={style.headerBottom}>
          <div className={style.singleHeaderItem}>
            <div className={style.headerBottomIconDiv}>
              <IoCall />
            </div>
            <div>
              <p className={style.headerBottomTitle}>
                Have a question? Call us now.
              </p>
              <p className={style.headerBottomSubTitle}>+91 9876543210</p>
            </div>
          </div>
          <div className={style.singleHeaderItem}>
            <div className={style.headerBottomIconDiv}>
              <RiHistoryLine />
            </div>
            <div>
              <p className={style.headerBottomTitle}>We are open Mon-Fri</p>
              <p className={style.headerBottomSubTitle}>
                Mon - Fri 08.00 - 18.00
              </p>
            </div>
          </div>
          <div className={style.singleHeaderItem}>
            <div className={style.headerBottomIconDiv}>
              <IoMailSharp />
            </div>
            <div>
              <p className={style.headerBottomTitle}>Drop us an email.</p>
              <p className={style.headerBottomSubTitle}>
                support@car-parking-m1.com
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
