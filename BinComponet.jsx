

import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";

function BinComponent() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [binId, setBinId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Initialize Firebase
    const db = getDatabase();

    // Push bin details to the "bin1" collection
    const binRef = ref(db, 'Bin1');
    push(binRef, {
      binId: binId,
      latitude: latitude,
      longitude: longitude,
    });

    // Reset form fields
    setBinId("");
    setLatitude("");
    setLongitude("");

    // Log success
    console.log("Bin details added to the database");
  };

  return (
    <div style={style.AddBinContainer}>
      <button style={style.AddBinButton} className="AddBinButton" onClick={toggleFormVisibility}>
        + Add a Bin
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} style={style.form}>
          <label htmlFor="binId">Bin ID:</label>
          <input type="text" id="binId" name="binId" value={binId} onChange={(e) => setBinId(e.target.value)} style={style.input} required />
          <label htmlFor="latitude">Latitude:</label>
          <input type="text" id="latitude" name="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} style={style.input} required />
          <label htmlFor="longitude">Longitude:</label>
          <input type="text" id="longitude" name="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} style={style.input} required />
          <button type="submit" style={style.addButton}>Add Bin</button>
        </form>
      )}
    </div>
  );
}

const style = {
  AddBinContainer: {
    top: "10px",
    right: "30px",
    marginLeft: "30px",
    marginTop: "30px",
  },

  AddBinButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 15px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    borderRadius: "5px",
  },

  AddBinButtonHover: {
    backgroundColor: "#45a049",
  },
  form: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
  },
  
  input: {
    width: "50ch", // Set width to 50 characters
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    alignItems: "center",
    maxWidth: "200px",
    width:"15ch",
    marginTop: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    padding: "12px 20px", // Adjusted padding for button size
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    borderRadius: "5px",
  },
};

export default BinComponent;
