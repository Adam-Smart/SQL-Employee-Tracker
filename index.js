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
        }
    }
}

app();