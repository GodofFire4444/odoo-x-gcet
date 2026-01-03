# WorkLink – Human Resource Management System

WorkLink is a web-based Human Resource Management System (HRMS) designed to simplify and centralize employee management, attendance tracking, leave handling, and payroll visibility through role-based access for Admins and Employees.

---

## Problem Statement

Managing HR operations manually or using fragmented systems often leads to inefficiency, data inconsistency, and lack of transparency. Organizations require a centralized, secure, and role-based platform that streamlines daily HR tasks while providing clear access control for administrators and employees.

WorkLink addresses this challenge by offering a unified HRMS solution with dedicated dashboards for Admins and Employees.

---

## Key Features

### Role-Based Authentication

- Separate login flows for Admins and Employees  
- Secure account creation and authentication  
- Controlled access based on user role  

### Admin Dashboard

- View and manage all employee profiles  
- Edit employee details and documents  
- Access complete attendance records  
- Review and approve or reject leave requests  
- Manage salary and payroll records  
- Full administrative control over HR data  

### Employee Dashboard

- View personal profile and job details  
- Mark and track daily attendance  
- Apply for leaves and view approval status  
- Access salary details in read-only mode  
- Transparent view of HR-related records  

---

## Application Flow

### Landing Page

- Option to log in as an Employee  
- Option to create an Admin account  
- Login and signup options available in both flows for ease of access  

### Admin Flow

1. Admin creates a new account or logs in  
2. Admin is redirected to the Admin Dashboard  
3. Admin manages employees, attendance, leaves, and payroll  

### Employee Flow

1. Employee logs in using registered credentials  
2. Employee is redirected to the Employee Dashboard  
3. Employee manages attendance, leave applications, and views salary records  

---

## Technology Stack

- Frontend: React.js  
- Backend: Node.js, Express.js  
- Database: MongoDB  
- Authentication: JWT, bcrypt  

---

## Security and Access Control

- Role-based permissions for Admin and Employee  
- Restricted editing rights for employees  
- Full access granted only to authorized admins  

---

## Use Cases

- Organizations managing employee attendance and leaves  
- HR teams handling payroll and employee records  
- Employees tracking attendance and leave status transparently  

---

## Conclusion

WorkLink provides a structured and efficient approach to HR management by centralizing core HR functionalities into a single platform. With clear role separation and intuitive dashboards, it enhances productivity, transparency, and control for both administrators and employees.

---

## Hackathon Context

This project was developed as part of the **Odoo Hackathon**, focusing on delivering a functional, user-centric HRMS solution within the given problem statement constraints.
