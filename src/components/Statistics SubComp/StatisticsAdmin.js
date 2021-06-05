import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function StatisticsAdmin() {

  //BAR graph
  var users = JSON.parse(localStorage.getItem("users"));
  let month = {};
  (users).forEach(element => (month[new Date(element.joinedDate).getMonth()]) ? month[new Date(element.joinedDate).getMonth()] += 1 : month[new Date(element.joinedDate).getMonth()] = 1);
  let monthCategories = ["Jan", "Feb", "Mar",];
  let monthData = [4, 2, 6];
  let MonthLst = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  Object.keys(month).forEach(element => {
    monthCategories.push(MonthLst[element])
    monthData.push(month[element])
  });
  const [optionsB] = useState({ chart: { id: "basic-bar" }, xaxis: { categories: monthCategories } });
  const [seriesB] = useState([{ name: "User Joining size", data: monthData }]);


  //DONUT graph
  const [optionsD] = useState({ labels: ['Win', 'Loss', 'Tie'] });
  let x = localStorage.getItem("seriesD")
  const [seriesD] = useState([Number(x[0]), Number(x[2]), Number(x[4])]);



  return (
    <>
      <div>
        <Chart
          options={optionsB}
          series={seriesB}
          type="bar"
          width="500"
        />
      </div>

      <div>
        <Chart options={optionsD} series={seriesD} type="pie" width="380" />
      </div>

    </>

  );
}
