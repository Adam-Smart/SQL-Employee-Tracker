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

const viewRoles = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM role');
    return rows;
};

const viewEmployees = async () => {
    const [rows, fields] = await connection.execute('SELECT * FROM employee');
    return rows;
};

const addDepartment = async (department_name) => {
    const result = await connection.execute(
        'INSERT INTO department (department_name) VALUES (?)', [department_name]
    );
    return result;
};

const addRole = async (role_title, salary, department_id) => {
    const result = await connection.execute(
        'INSERT INTO role (role_title, salary, department_id) VALUES (?, ?, ?)', [role_title, salary, department_id]
    );
    return result;
};

const addEmployee = async (firstName, lastName, role_id, manager_id) => {
    const result = await connection.execute(
        'INSERT INTO employee (firstName, lastName, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, role_id, manager_id]
    );
    return result;
};

module.exports = {viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee}