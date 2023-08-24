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
        }
    }
}

app();