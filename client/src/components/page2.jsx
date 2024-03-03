import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import "../style/page2.scss";

function Page2() {
    const nav=useNavigate();
    const { employeeId } = useParams(); // Get the employeeId from URL params

    const [formData, setFormData] = useState({
        phoneNumber: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://form1-1-9jj6.onrender.com/page2/${employeeId}`, formData, { withCredentials: true }); // Include employeeId in the URL
            console.log('Data submitted successfully!');
            nav("/page3");
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container2">
            <h1>Employee Details - Page 2</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="phonenumber">Phone Number:</label>
                <input type="tel" id="phonenumber" name="phoneNumber" maxLength="10" value={formData.phoneNumber} onChange={handleChange} required />
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Page2;
