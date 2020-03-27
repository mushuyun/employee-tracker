insert into department(department_name) 
values ("Accounting"),
("Engineering"),
("Tech"),
("HR"),
("Marketing"),
("Sales");


insert into role(title, salary, department_id, manager)
values("Intern", 2000, 3, 1);

insert into role(title, salary, department_id, manager)
values("Engineer", 8000, 2, 1);

insert into role(title, salary, department_id, manager)
values("Accountant", 5000, 1, 1);

insert into role(title, salary, department_id, manager)
values("Sales Representative", 7000, 6, 0);

insert into role(title, salary, department_id, manager)
values("Marketing director ", 10000, 5, 0);

insert into role(title, salary, department_id, manager)
values("Senior recruitor", 7500, 4, 1);

insert into employees (first_name, last_name, role_id, manager_id)
values("Kee", "Lee", 3, null);

insert into employees (first_name, last_name, role_id, manager_id)
values("Anna", "Scott", 1, 7);

insert into employees (first_name, last_name, role_id, manager_id)
values("Tom", "Jones", 2, null);

insert into employees (first_name, last_name, role_id, manager_id)
values("Amy", "Macky", 4, 7);

insert into employees (first_name, last_name, role_id, manager_id)
values("Robert", "Birdy", 5, 6);

insert into employees (first_name, last_name, role_id, manager_id)
values("Tim", "Roger", 5, 6);

insert into employees (first_name, last_name, role_id, manager_id)
values("Linda", "Wells", 3, 7);

insert into employees (first_name, last_name, role_id, manager_id)
values("Babara", "Worthy", 4, null);
