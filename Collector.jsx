import React, { useState, useEffect } from "react";
import { getDatabase, ref, equalTo, query,get, orderByChild,onValue } from "firebase/database";
// import { getAuth, deleteUser } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
// import { FaTrash } from "react-icons/fa";
import emailjs from "emailjs-com"

function Collector() {
  const [collectors, setCollectors] = useState([]);
  

  useEffect(() => {
    async function fetchCollectors() {
      const db = getDatabase();
      const collectorsRef = ref(db, "registration");
      const q = query(collectorsRef, orderByChild("role"), equalTo("collector"));
      const snapshot = await get(q);
    
      const collectorData = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        collectorData.push({
          id: key,
          name: data.name,
          email: data.email,
          binid: data.binid,
          status:"Bin not full",
        });
      });
      setCollectors(collectorData);

      const bin1Ref = ref(db, "Bin1");
      onValue(bin1Ref, (snapshot) => {
        const binData = snapshot.val();
        // Update collector status based on waste level
        setCollectors((prevCollectors) =>
          prevCollectors.map((collector) => ({
            ...collector,
            status: binData.percentage === 100 ? " Not Collected" : binData.percentage === 0 ? "Collected" : collector.status,
          }))
        );
      });
    }
    

    fetchCollectors();
  }, []);

  const sendMessage = () => {
    // Replace these with your EmailJS service ID and template ID

    const toName = "Jayalakshmi M";
    const toEmail = "mjayalakshmi721@gmail.com";
    const serviceID = "service_g21t28o";
    const templateID = "template_yqq8sls";

    // Replace these with your EmailJS user ID
    const userID = "a7Tm-fhG2-BAYl3pN";

    emailjs.send(serviceID, templateID, {
      to_email: toEmail,
      to_name: toName,
      message: "Please collect the waste ",
    }, userID)
    .then((response) => {
      console.log("Email sent successfully:", response);
      // You can update the UI or show a notification here if needed
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      // Handle errors here
    });
  };


  return (
    <div>
      <br />
      <h3 style={style.header}>Garbage Collectors</h3>
      <table
        className="table table-striped table-bordered table-hover"
        style={style.table}
      >
        <thead>
          <tr>
            <th style={style.label}>Collector Name</th>
            <th style={style.label}>E-mail</th>
            <th style={style.label}>Bin ID</th>
            
            <th style={style.label}>Status</th>
            <th style={style.label}>Remind the  Collector</th>
            {/*
            <th style={style.label}>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {collectors.map((collector) => (
            <tr key={collector.id}>
              <td>{collector.name}</td>
              <td>{collector.email}</td>
              <td>{collector.binid}</td>
              <td>{collector.status}</td>
              <td>
                {collector.status !== "Collected" && (
                  <button
                    className="btn btn-primary"
                    onClick={sendMessage}
                  >
                    Reminder
                  </button>
                )}
              </td>

              
              {/* <td>
                <button
                  className="btn btn-primary"
                  onClick=""
                >
                  Active/Not Active
                </button>
              </td> */}
              {/*
              <td>
                {" "}
                <FaTrash onClick={() => handleDelete(collector.id)} />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const style = {
  table: {
    tableLayout: "fixed",
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    textAlign: "center",
    color: "darkgreen",
    fontSize: "24px",
    fontWeight: "bold",
    padding: "10px",
  },
  label: {
    fontWeight: "bold",
    color: "#4CAF50",
    minWidth: "80px",
  },
  row: {
    backgroundColor: "#f2f2f2",
  },
  cell: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  actionButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  deleteIcon: {
    color: "#dc3545",
    cursor: "pointer",
  },
};

export default Collector;
