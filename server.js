const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require("chalk");
const logo = require("asciiart-logo");

let instruction = "This is a node.js and mysql command-line employee tracker, please follow prompt instructions to use the app."

console.log(logo({
    name: "Employee Tracker",
    logoColor: "light-yellow",
    textColor: "violet"
})
.right("version V1.0")
.emptyLine()
.center(instruction)
.render()
);


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tha,bto7",
    database: "employees_db"
  });
  
  connection.connect((err) =>{
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
  });

function start() {
     inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: [
                    "View all Departments",
                    "Remove Departments",
                    "View employee roles",
                    "View all employees by department",
                    "View employee by manager id",
                    "Add department",
                    "Add employees",
                    "Remove employees",
                    "Update employee role",
                    "Add roles",
                    "Remove roles",
                    "Update employee manager", 
                    "View budget for each department",
                    "Exit"
                    ]      
            }
         ])  
        .then(function(res){
            switch (res.action) {
                case "View all Departments":
                viewDepartment();
                break;

                case "Remove Departments":
                RevDepartment();
                break;

                case "View employee roles":
                viewRole();
                break;

                case  "View all employees by department":
                viewEmployee();
                break;

                case "View employee by manager id":
                viewEmbyManager();
                break;

                case "Add department": 
                addDepartment();
                break;

                case "Add employees":
                addEmployee();
                break;

                case "Remove employees":
                revEmployee();
                break;

                case "Update employee role":
                upEmployee();
                break;

                case "Add roles":
                addRole();
                break;

                case "Remove roles":
                revRole();
                break;

                case "Update employee manager":
                updateManager();
                break;

                case "View budget for each department":
                depBudget();
                break;

                case "Exit":
                connection.end();
                break;
            }
    
        });
}

function viewDepartment(){
    var query = "select * from department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res);
    
    start();
    });
  }



 function viewRole(){
     var query = "select * from role";
     connection.query(query, function(err, res){
         if(err) throw err;
         console.log("\n");
         console.table(res);
         start();
     });
  }

function viewEmployee(){

    const query = "SELECT employees.employees_id, employees.first_name, employees.last_name, employees.manager_id, role.title, role.salary, " +
    "department.department_name FROM employees " +
    "LEFT JOIN role on employees.role_id = role.role_id " +
    "LEFT JOIN department on role.department_id = department.department_id order by department_name";
      connection.query(query, function(err, res){
          if (err) throw err;
          console.log("\n");
          console.table(res);
          start();
      });
  }

  function viewEmbyManager(){

    const query = "SELECT employees.employees_id, employees.first_name, employees.last_name, employees.manager_id, role.title, role.salary, " +
    "department.department_name FROM employees " +
    "LEFT JOIN role on employees.role_id = role.role_id " +
    "LEFT JOIN department on role.department_id = department.department_id order by manager_id";
      connection.query(query, function(err, res){
          if (err) throw err;
          console.log("\n");
          console.table(res);
          start();
      });
  }

function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message:"which department would you like to add?"
    })

    .then((answerDeptA)=>{
        //allLetter();
        connection.query("insert into department set ?", {department_name: answerDeptA.department}, function(err, res){
            if (err) throw err;
            console.log("\n");
            console.log(chalk.greenBright(res.affectedRows + " department was successfully added!"));
        });
       viewDepartment();
    });
}

function RevDepartment(){
    inquirer.prompt({
        type:"input",
        name:"department_id",
        message: "Please enter the department id you wish to delete."
    })
    .then((answerDeptD) =>{
        const query ="delete from department where ?";
        connection.query(query, {department_id: parseInt(answerDeptD.department_id)}, (err, res) =>{
            if (err) throw err;
            console.log("\n");
            console.log(chalk.red(res.affectedRows + " department is successfully removed!"));

            viewDepartment();
        })
    })  
    .catch(err =>{
        if(err) throw err;
    });
}

function addEmployee(){
    
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter employee's first name"
        },

        {
            name: "last_name",
            type: "input",
            message: "Please enter employee's last name"
        },

        {
            name: "role_id",
            type: "input",
            message: "Please enter employee's role id"
        },

        {
            name: "manager_id",
            type: "input",
            message: "Please enter employee's manager id"
        }

    ])

    .then(answerEmA =>{
        let newEmployee = {
            first_name: answerEmA.first_name,
            last_name: answerEmA.last_name,
            role_id: answerEmA.role_id,
            manager_id: answerEmA.manager_id
        };
        
        connection.query("insert into employees set ?", newEmployee, (err, res) =>{
            if(err) throw err;
            console.log("\n");
            console.log(chalk.greenBright(res.affectedRows + " employee added successfully!"));

            viewEmployee();
        });
    })
    .catch(err =>{
        if(err) throw err;
    });
}

function revEmployee(){
    inquirer.prompt(
        {
            name: "employee_id",
            type: "input",
            message: "Please enter the employee id to delete."
        })

    .then(answerEmD =>{
        console.log(answerEmD);
        var query = "delete from employees where ?";
        let revEmp = parseInt(answerEmD.employee_id);
        connection.query(query, {employees_id: revEmp}, (err, res)=>{
            if(err) throw err;
            console.log("\n");
            console.log(chalk.red(res.affectedRows + " employee deleted! \n"));
            viewEmployee();
        });
    })
    .catch (err=>{
        console.log(err);
    });
}

function upEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "employees_id",
            message: "Please enter the employee's id to update"
        },

        {
            type: "input",
            name: "role_id",
            message: "Please enter the employee's new role id to update"
        },
     
    ])
    .then(answerEmU =>{
        
        var query = "update employees set? where?";

        connection.query(query, [{role_id: parseInt(answerEmU.role_id)}, {employees_id: parseInt(answerEmU.employees_id)}], (err, res) => {
            if(err) throw err;
            console.log("\n");
            console.log(res.affectedRows + " Employee successfully updated!");
            viewEmployee()
        });
    })

    .catch (err=>{
        console.log(err);
    });
}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message:"Please enter the role title you would like to add"
        },

        {
            type: "input",
            name: "salary",
            message:"Please enter the role salary you would like to add."
        },

        {
            type: "input",
            name: "department_id",
            message:"Please enter the role department id you would like to add."
        },
    ])
    
    .then(answerRoA =>{

        let newRole ={
            title: answerRoA.title,
            salary: answerRoA.salary,
            department_id: answerRoA.department_id
        }
        connection.query("insert into role set?", newRole, (err, res)=>{
            if (err) throw err;
            console.log("\n");
            console.log(chalk.greenBright(res.affectedRows + " role successfully added \n"));
            viewRole();
        })
    })

    .catch (err=>{
        console.log(err);
    });   
}

function revRole(){
    inquirer.prompt({
        type: "input",
        name: "role_id",
        message: "Please enter the role id you would like to remove."
    })

    .then(answerRoD =>{
        connection.query("delete from role where ?", {role_id: parseInt(answerRoD.role_id)}, (err, res) =>{
            if(err) throw err;
            console.log("\n");
            console.log(chalk.red(res.affectedRows + " role successfully removed!"));
            viewRole();        
        })
    })

    .catch(err =>{
        if (err) throw err;
    });
}

function updateManager(){
    inquirer.prompt([
        {
            type: "input",
            name: "employees_id",
            message: "Please enter the employee id you would like to update the manager."
        },
        {
            type: "input",
            name: "manager_id",
            message: "Please enter the manager id to update."
        }
    ])
    .then(upMan =>{
        connection.query("update employees set? where?",[{manager_id: parseInt(upMan.manager_id)},{employees_id: parseInt(upMan.employees_id)}], (err, res) =>{
            if (err) throw err;
            console.log("\n");
            console.log(res.affectedRows + " manager successfully updated!");
            viewEmployee();
        })    
    })
    .catch(err =>{
        if (err) throw err;
    })
}

