import React, { useState } from "react";
import styles from "./App.module.scss";
import { Chart } from "./pages/Chart";
import { SignUp } from "./pages/SignUp";

const App: React.FC<{}> = () => {
  const [isSignedUp, setSignUp] = useState<boolean>(false);
  return (
    <div className={styles.app}>
      {!isSignedUp ? <SignUp setSignUp={setSignUp} /> : <Chart />}
    </div>
  );
};

export default App;
