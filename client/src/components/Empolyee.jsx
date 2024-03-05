import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/page3.scss";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getdata');
                setEmployees(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred while fetching data.');
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1>Employee Details</h1>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee ID</th>
                        <th>Department</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.employeename}</td>
                            <td>{employee.employeeidnumber}</td>
                            <td>{employee.department}</td>
                            <td>{new Date(employee.dateofbirth).toLocaleDateString()}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.designation}</td>
                            <td>$ {employee.salary}</td>
                            <td>{employee.phone_number}</td>
                            <td>{employee.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employee;
