import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

var data = {};
async function getData() {
  var labels = [];
  var ratings = [];

  axios.get("/listAllSongs").then((response) => {
    const songs = response["data"].slice(0, 7);
    for (const song of songs) {
      labels.push(song["fields"]["name"]);
      ratings.push(song["fields"]["average_rating"]);
    }
  });
  data = {
    labels: labels,
    datasets: [
      {
        label: "Average Ratings Of Songs",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: ratings,
      },
    ],
  };
}

getData();

export default class BarExample extends Component {
  render() {
    return (
      <div>
        <h2>Highest Rated Songs</h2>
        <Bar
          data={data}
          width={75}
          height={200}
          beginAtZero = {true}
          options={{
            maintainAspectRatio: false,
            beginAtZero: true
          }}
        />
      </div>
    );
  }
}
