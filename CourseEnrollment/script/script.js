var autoIncreamentedUserNumber = 1000;
var course = /** @class */ (function () {
    function course(name, requiredDays, id) {
        this.courseId = "C" + (id).toString();
        this.courseName = name;
        this.requiredDays = requiredDays;
    }
    return course;
}());
var User = /** @class */ (function () {
    function User(name, age, phone) {
        this.enrolled = new Array();
        this.userId = "ST" + (autoIncreamentedUserNumber++).toString();
        this.name = name;
        this.age = age;
        this.phone = phone;
    }
    return User;
}());
var UserList = new Array();
var CurrentUser = null;
var ShowRegisterDiv = document.getElementById("registerdiv");
var ShowLoginDiv = document.getElementById("logindiv");
var ShowAvailableCourseDiv = document.getElementById("availablecoursediv");
var ShowEnrolledCourseDiv = document.getElementById("enrolledcoursediv");
var ShowMainDiv = document.getElementById("maindiv");
var ShowUserMenuDiv = document.getElementById("usermenudiv");
function showRegisterDiv() {
    (document.getElementById("showuserlist").innerHTML) = "";
    ShowRegisterDiv.style.display = "block";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "none";
}
function showLoginDiv() {
    document.getElementById("showlistofenrolledcourse").innerHTML = "";
    document.getElementById("showuserlist").innerHTML = "REGISTERED USERS<br><hr>";
    for (var index = 0; index < UserList.length; index++) {
        (document.getElementById("showuserlist").innerHTML) += "".concat(UserList[index].userId, " || ").concat(UserList[index].name, "<br>");
    }
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "block";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "none";
}
function showAvailableCouseDiv() {
    document.getElementById("greet1").innerHTML = "Hi ".concat(CurrentUser.name);
    (document.getElementById("showuserlist").innerHTML) = "";
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "block";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "none";
}
function showEnrolledCourseDiv() {
    document.getElementById("greet2").innerHTML = "Hi ".concat(CurrentUser.name);
    (document.getElementById("showuserlist").innerHTML) = "";
    var total = 0;
    for (var index = 0; index < CurrentUser.enrolled.length; index++) {
        var element = CurrentUser.enrolled[index];
        document.getElementById("showlistofenrolledcourse").innerHTML += "Course ID:".concat(element.courseId, " || Course Name:").concat(element.courseName, " || Required Days:").concat(element.requiredDays, " Days<br>");
        total += element.requiredDays;
    }
    (document.getElementById("calculatedays").innerHTML) = "<h4>TOTAl DAYS: ".concat(total, " Days<h4>");
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "block";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "none";
}
function showMainDiv() {
    (document.getElementById("showuserlist").innerHTML) = "";
    document.getElementById("showlistofenrolledcourse").innerHTML = "";
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "block";
    ShowUserMenuDiv.style.display = "none";
}
function showUserMenuDiv() {
    (document.getElementById("showuserlist").innerHTML) = "";
    ShowRegisterDiv.style.display = "none";
    ShowAvailableCourseDiv.style.display = "none";
    ShowEnrolledCourseDiv.style.display = "none";
    ShowLoginDiv.style.display = "none";
    ShowMainDiv.style.display = "none";
    ShowUserMenuDiv.style.display = "block";
}
function register() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var phone = document.getElementById("phonenumber").value;
    if (name.trim() == "" || age == "" || phone == "") {
        alert("Cannot take empty inputs");
    }
    else {
        var tempUser = new User(name, parseInt(age), parseInt(phone));
        UserList.push(tempUser);
        alert("Your registration is complete.\nYour Login ID is: ".concat(tempUser.userId));
        showMainDiv();
    }
}
function validate() {
    var input = document.getElementById("useridcheck").value;
    for (var index = 0; index < UserList.length; index++) {
        if (input == UserList[index].userId) {
            CurrentUser = UserList[index];
        }
    }
    if (CurrentUser == null) {
        alert("Please enter the valid Login ID");
    }
    else {
        alert("login succesfull");
        document.getElementById("greet").innerHTML = "Hi ".concat(CurrentUser.name);
        (document.getElementById("showuserlist").innerHTML) = "";
        showUserMenuDiv();
    }
}
function enroll() {
    var choice = document.getElementById("course");
    var days = document.getElementById("days").value;
    var coursecount = CurrentUser.enrolled.length + 100;
    if (days == "") {
        alert("please specify the number days to complete the course");
    }
    else {
        var enroll_1 = new course((choice.options[choice.selectedIndex]).value, parseInt(days), coursecount);
        CurrentUser.enrolled.push(enroll_1);
        alert("You have successfully enrolled to ".concat((choice.options[choice.selectedIndex]).value, " course \nYou have to complete in ").concat(days, " days"));
        (document.getElementById("showuserlist").innerHTML) = "";
        showUserMenuDiv();
    }
}
