import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));

const pool = new pg.Pool({
    user: 'ul5a89srpjerd2ka3cek',
    host: 'bckvqh9nrsgsdhmtirrh-postgresql.services.clever-cloud.com',
    password: 'ntlffU0GX4vZK9Ki9O0BfwshvhcpsU',
    database: 'bckvqh9nrsgsdhmtirrh',
    port: 50013, 
}); 

app.post('/page1', async (req, res) => {
    try {
        const { employeeName, employeeId, department, dob, gender, designation, salary } = req.body;
        await pool.query('INSERT INTO employee(employeename, employeeidnumber, department, dateofbirth, gender, designation, salary) VALUES($1, $2, $3, $4, $5, $6, $7)', [employeeName, employeeId, department, dob, gender, designation, salary]);
        res.status(201).json({ message: 'Data submitted successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}); 

app.post('/page2/:employeeId', async (req, res) => {
    try {
        const { phoneNumber, address } = req.body;
        const employeeId = req.params.employeeId; 
        await pool.query('UPDATE employee SET phone_number=$1, address=$2 WHERE employeeidnumber=$3', [phoneNumber, address, employeeId]);
        res.status(201).json({ message: 'Data submitted successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await pool.query('SELECT * FROM employee');
        res.status(200).json(employees.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
