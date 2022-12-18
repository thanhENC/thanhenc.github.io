window.onload = function () {
    startTime();    
    displayStudentData();
}

class Student {
    constructor(mssv, fullname, email, phone, hobbies, gender, country, nickname) {
        this.mssv = mssv;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.hobbies = hobbies;
        this.gender = gender;
        this.country = country;
        this.nickname = nickname;
    }
}

function displayStudentData() {
    if(localStorage.getItem("student") != null){
        var student = JSON.parse(localStorage.getItem("student"));
        bindingFooterData(student);
        if (document.title == "Trang chủ") {
            bindingStudentData(student);
        }
    }
    else {
        console.log("Không có dữ liệu sinh viên");
        loadXMLDoc();
    }
}

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
    };
    xmlhttp.open("GET", "assets/data/K204110855.xml", true);
    xmlhttp.send();
}

function myFunction(xml) {
    var xmlDoc, html;
    xmlDoc = xml.responseXML;
    html = "";
    var student = new Student(xmlDoc.getElementsByTagName("mssv")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("fullname")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("email")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("phone")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("hobbies")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("gender")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("country")[0].childNodes[0].nodeValue, xmlDoc.getElementsByTagName("nickname")[0].childNodes[0].nodeValue);
    localStorage.setItem("student", JSON.stringify(student));
    bindingFooterData(student);
    if (document.title == "Trang chủ") {
        bindingStudentData(student);
    }
}

function bindingStudentData(student) {
    var html = `<p><b>MSSV: </b>${student.mssv}</p>
                <p><b>Họ tên: </b>${student.fullname}</p>
                <p><b>Email: </b>${student.email}</p>
                <p><b>Số điện thoại: </b>${student.phone}</p>
                <p><b>Sở thích: </b>${student.hobbies}</p>
                <p><b>Giới tính: </b>${student.gender}</p>
                <p><b>Quê quán: </b>${student.country}</p>
                <p><b>Nickname: </b>${student.nickname}</p>`;
    document.getElementsByClassName("personal-info")[0].innerHTML = html;
    console.log("Đã load dữ liệu sinh viên");
}

function bindingFooterData(student) {
    document.getElementById("span-author").innerHTML = student.fullname;
}

function startTime() {
    var today = new Date();
    var d = today.getDate();
    var o = today.getMonth() + 1; //January is 0!
    var y = today.getFullYear();
    document.getElementById('span-today').innerHTML = d + "-" + o + "-" + y;
}

function register() {
    var name = document.getElementById("txtFullname").value;
    var phone = document.getElementById("txtPhone").value;
    var content = document.getElementById("txtFormContent").value;
    var regex = /^[0-9]+$/;

    if (name == "") {
        alert("Vui lòng nhập họ tên");
        document.getElementById("txtFullname").focus();
        return;
    }

    if (phone == "") {
        alert("Vui lòng nhập số điện thoại");
        document.getElementById("txtPhone").focus();
        return;
    }

    if (content == "") {
        alert("Vui lòng nhập nội dung");
        document.getElementById("txtFormContent").focus();
        return;
    }

    if (!regex.test(phone) || phone.length < 10) {
        alert("Số điện thoại không hợp lệ");
        document.getElementById("txtPhone").value = "";
        document.getElementById("txtPhone").focus();
        return;
    }

    alert("Đăng ký thành công")
    reset();
}

function reset(){
    var x = document.getElementById("form-register");
    x.reset();
}