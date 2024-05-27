#!/usr/bin/env node
import inquirer from "inquirer";
class student {
    id;
    name;
    enrolledCourse;
    fees;
    constructor(id, name, course, fees) {
        this.id = id;
        this.name = name;
        this.enrolledCourse = course;
        this.fees = fees;
    }
}
let baseId = 10000;
let studentId = "";
let continueEnrollment = true;
let studentList = [];
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        choices: ["Enroll in a Course", "Show Student Data"],
        message: "Please Select a Option",
    });
    if (action.ans === "Enroll in a Course") {
        let studentName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Enter your name:",
        });
        let trimmedStudentName = studentName.ans.trim().toLowerCase();
        let studentNameCheck = studentList.map((object) => object.name);
        if (studentNameCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseId++;
                studentId = "GIAIC" + baseId;
                console.log("\n********************Congratulations********************");
                console.log("Your Account Has been Created Successfully");
                console.log(`Welcome To Sudent Mangment System, ${trimmedStudentName}!`);
                console.log(`Your are successfully login in our System with your StudentiId, ${studentId} \n That has automatically genrated by our System For you`);
                let courses = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please Select a Course",
                    choices: ["Typescript", "Python", "JavaScript"],
                });
                let courseFee = 0;
                switch (courses.ans) {
                    case "Typescript":
                        courseFee = 30000;
                        break;
                    case "Python":
                        courseFee = 50000;
                        break;
                    case "JavaScript":
                        courseFee = 10000;
                        break;
                }
                let confirmCourse = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in a course?",
                });
                if (confirmCourse.ans === true) {
                    let newStudent = new student(studentId, trimmedStudentName, [courses.ans], courseFee);
                    studentList.push(newStudent);
                    console.log("***************Congratulations*****************");
                    console.log(`You Have been Successfully Enrolled in your course \n ${courses.ans} with the fee of ${courseFee} by using your Registered StudentID: ${studentId}`);
                    console.log("Thank you");
                    console.log("For Chossing our Platform!");
                }
            }
            else {
                console.log("Invalid Name");
            }
        }
        else {
            console.log("Dear Student your has been already registered in our Database\n kindly Enter  your Complete for Enrollment!");
        }
    }
    else if (action.ans === "Show Student Data") {
        if (studentList.length !== 0) {
            let studentNameCheck = studentList.map((newStudent) => newStudent.name);
            let selectedStudents = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please Select a Student",
                choices: studentNameCheck,
            });
            let foundStudent = studentList.find((newStudent) => newStudent.name === selectedStudents.ans);
            console.log("***************Student Data***************");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("No Student Found in our Database");
        }
    }
    let RecontinueEnrollment = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue Enrollment?",
    });
    if (RecontinueEnrollment.ans === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
