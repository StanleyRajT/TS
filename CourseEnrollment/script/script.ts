let autoIncreamentedUserNumber = 1000;
class course {
    courseId: string;
    courseName: string;
    requiredDays: number;
    
    
    constructor(name: string, requiredDays: number,id:number) {
       
        this.courseId = "C" + (id).toString();
        this.courseName = name;
        this.requiredDays = requiredDays;
    }

}
class User {
    
    userId: string;
    name: string;
    age: number;
    phone: number;
    enrolled: course[]=new Array();
    constructor(name: string, age: number, phone: number) {
        this.userId = "ST" + (autoIncreamentedUserNumber++).toString();
        this.name = name;
        this.age = age;
        this.phone = phone;
    }
}

let UserList: User[] = new Array();
let CurrentUser: User = null;


let ShowRegisterDiv = document.getElementById("registerdiv") as HTMLDivElement;
let ShowLoginDiv = document.getElementById("logindiv") as HTMLDivElement;
let ShowAvailableCourseDiv = document.getElementById("availablecoursediv") as HTMLDivElement;
let ShowEnrolledCourseDiv = document.getElementById("enrolledcoursediv") as HTMLDivElement;
let ShowMainDiv = document.getElementById("maindiv") as HTMLDivElement;
let ShowUserMenuDiv = document.getElementById("usermenudiv") as HTMLDivElement;
function showRegisterDiv() {
    ((document.getElementById("showuserlist") as HTMLLabelElement).innerHTML) = "";
    ShowRegisterDiv.style.display = "block";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "none";
}
function showLoginDiv() {
    (document.getElementById("showlistofenrolledcourse") as HTMLLabelElement).innerHTML=``;
    (document.getElementById("showuserlist") as HTMLLabelElement).innerHTML=`REGISTERED USERS<br><hr>`;
    for (let index = 0; index < UserList.length; index++) {

        ((document.getElementById("showuserlist") as HTMLLabelElement).innerHTML) += `${UserList[index].userId} || ${UserList[index].name}<br>`;

    }
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "block";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "none";
}
function showAvailableCouseDiv() {
    (document.getElementById("greet1") as HTMLLabelElement).innerHTML = `Hi ${CurrentUser.name}`;
    ((document.getElementById("showuserlist") as HTMLLabelElement).innerHTML) = "";
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "block";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "none";
}
function showEnrolledCourseDiv() {
    (document.getElementById("greet2") as HTMLLabelElement).innerHTML = `Hi ${CurrentUser.name}`;
    ((document.getElementById("showuserlist") as HTMLLabelElement).innerHTML) = "";
    let total: number = 0;
    for (let index = 0; index < CurrentUser.enrolled.length; index++) {
        const element = CurrentUser.enrolled[index];
        (document.getElementById("showlistofenrolledcourse") as HTMLLabelElement).innerHTML += `Course ID:${element.courseId} || Course Name:${element.courseName} || Required Days:${element.requiredDays} Days<br>`;
        total += element.requiredDays;

    }
    ((document.getElementById("calculatedays") as HTMLLabelElement).innerHTML) = `<h4>TOTAl DAYS: ${total} Days<h4>`;
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "block";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "none";
}
function showMainDiv() {
    ((document.getElementById("showuserlist") as HTMLLabelElement).innerHTML) = "";
    (document.getElementById("showlistofenrolledcourse") as HTMLLabelElement).innerHTML=``;
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "block";
    ShowUserMenuDiv.style.display = "none";
}
function showUserMenuDiv() {
    ((document.getElementById("showuserlist") as HTMLLabelElement).innerHTML) = "";
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "block";
}
function register() {
    let name = (document.getElementById("name") as HTMLInputElement).value;
    let age = (document.getElementById("age") as HTMLInputElement).value;
    let phone = (document.getElementById("phonenumber") as HTMLInputElement).value;
    if (name.trim() == "" || age == "" || phone =="") {
        alert("Cannot take empty inputs");
    }
    else {
        let tempUser = new User(name,parseInt(age) ,parseInt(phone) )
        UserList.push(tempUser);
        alert(`Your registration is complete.\nYour Login ID is: ${tempUser.userId}`);
        showMainDiv();
    }
}
function validate() {
    let input = (document.getElementById("useridcheck") as HTMLInputElement).value;

    for (let index = 0; index < UserList.length; index++) {
        if (input == UserList[index].userId) {
            CurrentUser = UserList[index];
        }

    }
    if (CurrentUser == null) {
        alert(`Please enter the valid Login ID`);
    }
    else {
        alert(`login succesfull`);
        (document.getElementById("greet") as HTMLLabelElement).innerHTML = `Hi ${CurrentUser.name}`;
        ((document.getElementById("showuserlist") as HTMLLabelElement).innerHTML) = "";
        showUserMenuDiv();

    }

}
function enroll() {
    let choice = document.getElementById("course") as HTMLSelectElement;
    let days = (document.getElementById("days") as HTMLInputElement).value;
    let coursecount=CurrentUser.enrolled.length+100;

    if (days == "") {
        alert(`please specify the number days to complete the course`);
    }
    else {
        let enroll: course = new course((choice.options[choice.selectedIndex]).value,parseInt( days),coursecount);
        CurrentUser.enrolled.push(enroll);
        alert(`You have successfully enrolled to ${(choice.options[choice.selectedIndex]).value} course \nYou have to complete in ${days} days`);
        ((document.getElementById("showuserlist") as HTMLLabelElement).innerHTML) = "";
        showUserMenuDiv();

    }
}
