import styles from "./SignUp.module.scss";
import chartBackground from "../assets/chartBg.png";
import { useState } from "react";
import { SignUpForm } from "../components/SignUpForm";

const SignUp: React.FC<{
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  //const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  return (
    <div className={styles.main}>
      <div className={styles.chartImg_container}>
        <img src={chartBackground} />
        <div className={styles.description}>
          <div className={styles.title}>Choose a date range</div>
          <div className={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            Lorem
          </div>
        </div>
      </div>
      <div className={styles.form_container}>
        <SignUpForm setFormSubmitted={props.setSignUp} />
      </div>
    </div>
  );
};
export { SignUp };
