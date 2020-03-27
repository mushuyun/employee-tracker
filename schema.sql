drop database if exists employees_db;

create database employees_db;

use employees_db;

create table department(
	department_id int auto_increment not null,
    department_name varchar(30),
    primary key (department_id)
);

create table role(
	role_id int auto_increment not null,
	title varchar (30) null,
	salary decimal (10, 2) not null,
	department_id int not null,
	manager boolean not null default 0, 
    primary key (role_id),
    foreign key (department_id) references department(department_id) on delete CASCADE
);

create table employees(
	employees_id int auto_increment not null,
	first_name varchar(30),
	last_name varchar(30),
	role_id int null,
	manager_id int null,
	Primary key(employees_id),
	foreign key(role_id) references role(role_id) on DELETE set null
	);