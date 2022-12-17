window.onload = function () {
    startTime();    
    displayStudentData();
}

class Student {
    constructor(mssv, name, classcode, phone, email, description) {
        this.mssv = mssv;
        this.name = name;
        this.classcode = classcode;
        this.phone = phone;
        this.email = email;
        this.description = description;
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
        fetch("assets/student-data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var student = new Student(data.mssv, data.name, data.classcode, data.phone, data.email, data.description);
            localStorage.setItem("student", JSON.stringify(student));
            bindingFooterData(student);
            if (document.title == "Trang chủ") {
                bindingStudentData(student);
            }
        })
    }
}

function bindingStudentData(student) {
    var html = `<p><b>MSSV: </b>${student.mssv}</p>
                <p><b>Họ tên: </b>${student.name}</p>
                <p><b>Lớp: </b>${student.classcode}</p>
                <p><b>Số điện thoại: </b>${student.phone}</p>
                <p><b>Email: </b>${student.email}</p>
                <p><b>Mô tả: </b>${student.description}</p>`;
    document.getElementsByClassName("personal-info")[0].innerHTML = html;
    console.log("Đã load dữ liệu sinh viên");
}

function bindingFooterData(student) {
    document.getElementById("span-author").innerHTML = student.name;
}

function startTime() {
    var today = new Date();
    var d = today.getDate();
    var o = today.getMonth() + 1; //January is 0!
    var y = today.getFullYear();
    document.getElementById('span-today').innerHTML = d + "-" + o + "-" + y;

    var t = setTimeout("startTime();", 1000);
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