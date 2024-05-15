import { getDatabase, onValue, ref } from "firebase/database";
import { bind } from "leaflet";
import React from "react";
import {
  BsFillPersonCheckFill,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { RiMapPinFill } from "react-icons/ri";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const style = {
    link: {
      color: "#9e9ea4",
      textDecoration: "none",
    },
  };

  // const notify=(bid)=>{
  //   toast.success(`Bin with ID ${bid} is clicked`);
  // }
  
  const notify = (Bin1) => {
    const db = getDatabase();
    const collectionRef = ref(db, Bin1);
  
    onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
  
      if (data) {
        const { bid, status, name } = data; // Destructure the specific fields from the data object
        let toastMessage = `Bin ID: ${bid}\nStatus: ${status}\nCollector: ${name}`;
        toast.info(toastMessage); // Display the concatenated message in a single toast
      } else {
        toast.warn(`No data found in collection '${Bin1}'`);
      }
    });
  };
  const handleNotificationClick = () => {
    // Call notify function with the desired parameter
    notify("Bin1"); // Replace "Bin1" with the appropriate collection name
  };
  

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsFillPersonCheckFill className="icon_header" /> Admin
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <a href="/dashboard" style={style.link}>
          <li className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </a>
        
        <a href="/collectors" style={style.link}>
          <li className="sidebar-list-item">
            <BsPeopleFill className="icon" /> Collectors
          </li>
        </a>
        
        <a href="/mapview" style={style.link}>
          <li className="sidebar-list-item">
            <RiMapPinFill className="icon" /> Map View
          </li>
        </a>

        <a href="/repogene" style={style.link}>
          <li className="sidebar-list-item">
            <BsFillArchiveFill className="icon" /> Report
          </li>

        </a> 
        <li className="sidebar-list-item" onClick={handleNotificationClick}>
          <BsMenuButtonWideFill className="icon" /> Notification
        </li>
        {/* <button onClick={notify}>Notify</button> */}
        <ToastContainer/>
        {/* <a href="/schedule" style={style.link}>
          <li className="sidebar-list-item">
            <BsFillGearFill className="icon" /> Schedule
          </li>
        </a> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
