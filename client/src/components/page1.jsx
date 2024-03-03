import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/page1.scss";
function Page1() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employeeName: '',
        employeeId: '',
        department: '',
        dob: '',
        gender: '',
        designation: '',
        salary: ''
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
            
            if (!formData.employeeName || !formData.employeeId || !formData.department || !formData.dob || !formData.gender || !formData.designation || !formData.salary) {
                alert('Please fill in all fields');
                return;
            }

            
            if (formData.employeeName.length > 30) {
                alert('Employee name must be within 30 characters');
                return;
            }

          
            if (formData.salary < 0 || formData.salary.length > 8) {
                alert('Salary cannot be negative and must be within 8 digits');
                return;
            }
    
            
            const today = new Date();
            const birthDate = new Date(formData.dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
    
           
            if (age < 18) {
                alert('Employee must be 18 years or older');
                return;
            }
    
            
            const { employeeId, ...data } = formData;
            await axios.post('https://form1-m2r7.onrender.com/page1', formData);
            
            navigate(`/page2/${employeeId}`, { state: { formData: data } });
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container1">
            <h2>Employee Details - Page 1</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="employeeName">Employee Name:</label>
                <input type="text" id="employeeName" name="employeeName" maxLength="30" value={formData.employeeName} onChange={handleChange} required />
                <label htmlFor="employeeId">Employee ID:</label>
                <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                <label htmlFor="department">Department:</label>
                <select id="department" name="department" value={formData.department} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                <label>Gender:</label>
                <div className="gender-label">
                    <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
                    <label htmlFor="male">Male</label>
                </div>
                <div className="gender-label">
                    <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                    <label htmlFor="female">Female</label>
                </div>
                <div className="gender-label">
                    <input type="radio" id="other" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} />
                    <label htmlFor="other">Other</label>
                </div>
                <label htmlFor="designation">Designation:</label>
                <select id="designation" name="designation" value={formData.designation} onChange={handleChange} required>
                    <option value="">Select Designation</option>
                    <option value="Manager">Manager</option>
                    <option value="Assistant Manager">Assistant Manager</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Coordinator">Coordinator</option>
                </select>
                <label htmlFor="salary">Salary:</label>
                <input type="number" id="salary" name="salary" maxLength="8" value={formData.salary} onChange={handleChange} required />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}

export default Page1;
