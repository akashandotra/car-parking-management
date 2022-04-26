import React from "react";
import customerImage from "../../images/kindpng_743103.png";
import { AiOutlineBell } from "react-icons/ai";
import { FaMobileAlt } from "react-icons/fa";
import { BsLaptop } from "react-icons/bs";
import { GiFlatTire } from "react-icons/gi";
import { IoMdHappy } from "react-icons/io";
import { BsFillGearFill } from "react-icons/bs";
import style from "./HomeSectionStyle.module.css";
class HomeSection extends React.Component {
  render() {
    return (
      <div className={style.homeSectionMain}>
        <h1>Hello from section</h1>
        <p>
          We work with customers to park their vehicles safely and help them
          track it.
        </p>
        <div className={style.cardWrapper}>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <AiOutlineBell />
            </div>
            <div className={style.cardContent}>
              <h3>Easy to use </h3>
              <p>
                Make online transactions using our easy to use web application
                in online mode.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <FaMobileAlt />
            </div>
            <div className={style.cardContent}>
              <h3>Easy to use </h3>
              <p>
                Make online transactions using our easy to use web application
                in online mode.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <BsLaptop />
            </div>
            <div className={style.cardContent}>
              <h3>Easy to use </h3>
              <p>
                Make online transactions using our easy to use web application
                in online mode.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <GiFlatTire />
            </div>
            <div className={style.cardContent}>
              <h3>Easy to use </h3>
              <p>
                Make online transactions using our easy to use web application
                in online mode.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <IoMdHappy />
            </div>
            <div className={style.cardContent}>
              <h3>Easy to use </h3>
              <p>
                Make online transactions using our easy to use web application
                in online mode.
              </p>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className={style.cardIcon}>
              <BsFillGearFill />
            </div>
            <div className={style.cardContent}>
              <h3>Easy to use </h3>
              <p>
                Make online transactions using our easy to use web application
                in online mode.
              </p>
            </div>
          </div>
        </div>
        <div className={style.sectionTwo}>
          <div className={style.leftSection}>
            <h1>Happy customers</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis cum facere quis eaque tenetur architecto perferendis
              consectetur, ut id quae necessitatibus adipisci modi eos
              perspiciatis qui, tempore pariatur ipsa expedita. Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Veritatis cum facere
              quis eaque tenetur architecto perferendis consectetur, ut id quae
              necessitatibus adipisci modi eos perspiciatis qui, tempore
              pariatur ipsa expedita.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis cum facere quis eaque tenetur architecto perferendis
              consectetur, ut id quae necessitatibus adipisci modi eos
              perspiciatis qui, tempore pariatur ipsa expedita.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Veritatis cum facere quis eaque tenetur architecto perferendis
              consectetur, ut id quae necessitatibus adipisci modi eos
              perspiciatis qui, tempore pariatur ipsa expedita.
            </p>
          </div>
          <div className={style.twoModuleSection}>
            <img src={customerImage} alt="happy customers" />
          </div>
        </div>
      </div>
    );
  }
}
export default HomeSection;
