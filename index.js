const inquirer = require('inquirer');
const db = require('./db/database.js');
const questions = require('./questions.js')

async function app() {
    let runQuestions = true;

    while (runQuestions) {
        const { menu } = await inquirer.prompt(questions)
        
        

        switch (menu) {
            case 'View all of Departments':
                const departments = await db.viewDepartments();
                console.table(departments);
                break;

                case 'View all the Roles':
                const roles = await db.viewRoles();
                console.table(roles);
                break;

                case 'View all Employees':
                const employees = await db.viewEmployees();
                console.table(employees);
                break;

                case 'Add a Department':
                const { name } = await inquirer.prompt(
                    { type: 'input', 
                      name: 'name', 
                      message: 'Enter the department name:' 
                    });
                    
                await db.addDepartment(name);
                break;

                case 'Add a Role':
                    const roleData = await inquirer.prompt([
                        { type: 'input',
                          name: 'title', 
                          message: 'Enter a role title:' 
                        },
    
                        { type: 'input', 
                          name: 'salary', 
                          message: 'Enter the salary for the role:' 
                        },
                        
                    ]);
                    const department_id = await departmentSelection();
                    await db.addRole(roleData.title, roleData.salary, department_id);
                    break;

                    case 'Add a Employee':
                        const employeeData = await inquirer.prompt([
                            { 
                             type: 'input',
                             name: 'firstName', 
                             message: 'Add first name:' 
                            },
        
                            {
                              type: 'input',
                              name: 'lastName',
                              message: 'Add last name:' 
                            },
                        ]);
        
                        const employee_role_id = await roleSelection();
                        const manager_id = await employeeSelection('Select a manager: ');
        
                        await db.addEmployee(employeeData.firstName, employeeData.lastName, employee_role_id, manager_id);
        
                        break;

                        case 'Update an Employee role':
                const employee_to_update_id = await employeeSelection('Select employee: ');
                const new_employee_role_id = await roleSelection();
                await db.updateEmployeeRole( new_employee_role_id, employee_to_update_id);
                break;

                    async function departmentSelection() {
                        const allDepartments = await db.viewDepartments();
                        const departmentChoices = allDepartments.map((department) => ({
                            name: department.department_name,
                            value: department.id,
                        }));
                    
                        const { department_id } = await inquirer.prompt({
                            type: 'list',
                            name: 'department_id',
                            message: 'Select the department:',
                            choices: departmentChoices,
                        });
                    
                        return department_id;

                        
                    }
                    async function roleSelection() {
                        const allRoles = await db.viewRoles();
                        const roleChoices = allRoles.map((role) => ({
                            name: role.role_title,
                            value: role.id,
                        }));
                    
                        const { role_id } = await inquirer.prompt({
                            type: 'list',
                            name: 'role_id',
                            message: 'Select the role:',
                            choices: roleChoices,
                        });
                    
                        return role_id;
                    }
                    async function employeeSelection(message) {
                        const allEmployees = await db.viewEmployees();
                        const employeeChoices =
                            [
                                { name: 'None', value: null },
                                ...allEmployees.map((employee) => ({
                                    name: employee.firstName + " " + employee.lastName,
                                    value: employee.id,
                                })),
                            ];

                        const { employee_id } = await inquirer.prompt({
                            type: 'list',
                            name: 'employee_id',
                            message: message,
                            choices: employeeChoices,
                        });
                    
                        return employee_id;
                    }
        }
    }
}

app();