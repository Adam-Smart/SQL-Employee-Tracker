const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Password123',
    database: 'staff_db',
    waitForConnections: true,
});

const viewDepartments = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM department');
    return rows;
};

module.exports = {viewDepartments}