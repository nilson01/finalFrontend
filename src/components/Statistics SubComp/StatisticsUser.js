import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function StatisticsUser() {
  //DONUT graph
  const [optionsD] = useState({ labels: ["Win", "Loss", "Tie"] });
  let x = localStorage.getItem("seriesD");
  const [seriesD] = useState([Number(x[0]), Number(x[2]), Number(x[4])]);
  return (
    <>
      <div>
        <Chart options={optionsD} series={seriesD} type="pie" width="380" />
      </div>
    </>
  );
}
