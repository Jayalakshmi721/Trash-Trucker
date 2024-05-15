import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import app from "../../firebaseconfig";
import { getDatabase, ref, onValue, off } from "firebase/database";
import Chart from "chart.js/auto";
import axios from "axios"

function Home() {
  const [binData, setBinData] = useState(null);
  const [userData, setUserData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const binStatusRef = ref(db, "Bin1");
    const userDataRef = ref(db, "registration");

    const onData = (snapshot) => {
      const data = snapshot.val();
      setBinData(data);
      updatePieChart(data);
      if (data && data.percentage >= 90) { // Check if the bin is 90% full
        axios
          .post("http://localhost:3001/sendemail") // Call the backend API to send email
          .then((response) => {
            if (response.status === 201) {
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
      })
    }
      
    };

    const onUserData = (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    };

    // Attach the listener
    onValue(binStatusRef, onData);
    onValue(userDataRef, onUserData);

    // Detach the listener when the component unmounts
    return () => {
      off(binStatusRef, "value", onData);
      
      off(userDataRef, "value", onUserData);
    };
  }, []);

  const updatePieChart = (data) => {
    if (!chartRef.current || !data) return;

    const ctx = chartRef.current.getContext("2d");

    // Remove previous instance of chart if exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create new pie chart instance
    chartRef.current.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [ "Empty","Filled"],
        datasets: [
          {
            label: "Bin Fill Level",
            data: [data.percentage, 100 - data.percentage],
            backgroundColor: ["#008000","#ff0000"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        cutout: "25%", // Adjust the cutout percentage to make the chart round
      },
    });
  };

  return (
    <div className="container-fluid">
      <h3 style={style.header}>Overview</h3>
      <div className="row">
        {" "}
        <br />
        <br />
        <div className="row justify-content-center">
          <div className="col-md-4 box" style={style.box}>
            <FontAwesomeIcon icon={faUsers} /> Collectors: {userData ? Object.keys(userData).length : "Loading..."}
          </div>
          <div className="col-md-4 box" style={style.box}>
            <FontAwesomeIcon icon={faTrash} /> Bins: {binData ? 1 : "Loading..."}
          </div>
          <div className="col-md-4 box" style={style.box}>
            <FontAwesomeIcon icon={faStar} /> Rating: 4.5
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {" "}
          <br />
          <br />
          <h2 style={style.header}>Bin Status</h2>
          <canvas
            ref={chartRef}
            style={{ width: "400px", height: "500px" }}
          />
        </div>
        <div className="col-md-6" style={{ paddingLeft: "30px", marginTop:"250px"}}>
          {binData && (
            <div>
              <p style={style.info}>Collector: <span style={style.boldGreen}>{binData.name}</span></p>
              <p style={style.info}>Bin ID: <span style={style.boldGreen}>{binData.bid}</span></p>
              <p style={style.info}>Level: <span style={style.boldGreen}>{binData.status}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const style = {
  box: {
    width: "200px",
    height: "80px",
    backgroundColor: "green",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: "5px",
    margin: "10px",
  },
  header: {
    textAlign: "center",
    color: "darkgreen",
    fontSize: "24px",
    fontWeight: "bold",
    padding: "10px",
  },
  info: {
    color: "#000",
    fontSize: "18px",
    marginBottom: "10px",
  },
  boldGreen: {
    fontWeight: "bold",
    color: "green",
  },
};

export default Home;

