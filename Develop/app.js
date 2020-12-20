const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []


function question(role) {
    if (!role) {
        role = "Manager"
    }  

    if (role == "Manager") {
        currentMessage = "What is your office number?"
    } else if (role === "Engineer") {
        currentMessage = "What is your GitHub username?"
    } else if (role === "Intern") {
        currentMessage = "What is their school?"
    }

      return inquirer.prompt([
            {
                type: 'input',
                message: `What is your ${role} name?`,
                name: 'name',
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Enter at least one character.";
                }
            },
            {
                type: 'input',
                message: `What is your ${role} ID?`,
                name: 'id',
                validate: (answer) => {
                    const pass = answer.match(/^[0-9]\d*$/);
                    if (pass) {
                        return true;
                    }
                    return "Enter a valid ID number.";
                }
            },
            {
                type: 'input',
                message: `What is your ${role} Email?`,
                name: 'email',
                validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                        return true;
                    }
                    return "Enter a valid Email address.";
                }
            },
            {
                type: 'input',
                message: currentMessage,
                name: "uniqueQuestion",
                validate: (answer) => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Enter at least one character.";
                }
            },
            {
                type: 'list',
                message: "Which type of team member would you like to add?",
                choices: ['Manager', 'Engineer', 'Intern', "I don't want to add anymoe team members!"],
                name: 'team'
            }
        ])
        .then(function(answers) {
           
            let employee;

            if (role == "Manager") {
                employee = new Manager(answers.name, answers.id, answers.email, answers.uniqueQuestion)
            } else if (role === "Engineer") {
                employee = new Engineer(answers.name, answers.id, answers.email, answers.uniqueQuestion)
            } else if (role === "Intern") {
                employee = new Intern(answers.name, answers.id, answers.email, answers.uniqueQuestion)
            }
            employees.push(employee)
            if(answers.team === "I don't want to add anymoe team members!") {
                createOutput()
                return
            } else {
                return question(answers.team)
            }
        })
    }
function createOutput() {
    if (!fs.existsSync(OUTPUT_DIR, "output")) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");
};
question();





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
