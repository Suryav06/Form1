import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "../style/page2.scss";

function Page2(props) {
  const location = useLocation();
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setaddress] = useState("");

  const employeeData = location.state;
  const navi = useNavigate();
  console.log(employeeData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...employeeData,
      phoneNumber,
      address,
    };
    try {
      console.log(dataToSend);
      const response = await axios.post(
        "https://form1-3wtr.onrender.com/page2",
        dataToSend
      );

      if (response.data === "0") alert("Invalid Salary");
      else {
        alert("Added");
        navi("/page3");
        console.log("Data submitted successfully:", response.data);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Not Submitted");
    }
  };

  return (
    <div className="container2">
      <h1>Employee Details - Page 2</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phonenumber">Phone Number:</label>
        <input
          type="tel"
          id="phonenumber"
          name="phoneNumber"
          maxLength="10"
          value={phoneNumber}
          onChange={(e) => setphoneNumber(e.target.value)}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setaddress(e.target.value)} 
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Page2;
