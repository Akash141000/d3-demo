import React from "react";
import { BarChart } from "../components/BarChart";
import styles from "./Chart.module.scss";

const Chart: React.FC<{}> = () => {
  return (
    <div className={styles.main}>
      <BarChart />
    </div>
  );
};

export { Chart };
