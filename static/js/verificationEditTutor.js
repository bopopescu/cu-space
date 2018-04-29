function uploadFile() {
    var $fileUpload = $("#input-image-3");
    $fileUpload.trigger('click');
}

function readURL2(input) {
    document.getElementById("img0").style.display = "none";
    var buttonUpload = document.getElementById('buttonUpload');
    var changePicture = document.getElementById('changePicture');
    if (input.files.length >1) {
        alert("Can upload a maximum of 1 images");
    } else {
        if (input.files[0]) {
            for (i = 0; i < input.files.length; i++)
                showImage(input, i);
            buttonUpload.style.display = "none";
            changePicture.style.display = "inline-block";
            document.getElementById("changePicture").innerHTML = "Change picture";
        }
    }
}

function showImage(input, n) {
    var reader = new FileReader();
    var str = '#img' + n;

    reader.onload = function (e) {
        $(str)
            .attr('src', e.target.result)
    };

    reader.readAsDataURL(input.files[n]);
    $(str).show();
}

$("#firstnamevalue").focusout(function () {
    var value = $(this).val()
    if (checkfirstname(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#lastnamevalue").focusout(function () {
    var value = $(this).val()
    if (checklastname(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#age").focusout(function () {
    var value = $(this).val()
    if (checkage(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#emailvalue").focusout(function () {
    var value = $(this).val()
    if (checkemailvalue(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});


$("#firstnamevalue").focusout(function () {
    var value = $(this).val()
    if (checkfirstname(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#lastnamevalue").focusout(function () {
    var value = $(this).val()
    if (checklastname(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#age").focusout(function () {
    var value = $(this).val()
    if (checkage(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#emailvalue").focusout(function () {
    var value = $(this).val()
    if (checkemailvalue(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});

$("#coursename").focusout(function () {
    var value = $(this).val()
    if (checkcoursename(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#coursecategory").focusout(function () {
    var value = $(this).val()
    if (checkcoursecategory(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#courseprice").focusout(function () {
    var value = $(this).val()
    if (checkcourseprice(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
function checkalledit() {
    console.log('checkedit');
    var infovalue = $('#info').val();
    var firstnamevalue = $('#firstnamevalue').val();
    var lastnamevalue = $('#lastnamevalue').val();
    var dateofbirth = $('#editdateofbirth').val();
    var detailvalue = $('#detail').val();
    var phonevalue = $('#phonenumber').val();
    var emailvalue = $('#emailvalue').val();

    if (checkpos(infovalue) == 1 ||
        checkdetail(detailvalue) == 1 ||
        checkphone(phonevalue) == 1 ||
        checkphone2(phonevalue) == 2 ||
        checkfirstname(firstnamevalue) == 1 ||
        checklastname(lastnamevalue) == 1 ||
        checkDateOfBirth(dateofbirth) == 1 ||
        checkemailvalue(emailvalue) == 1
    ) {
        alert("Please enter all of the information correctly");
        // console.log(phonevalue)
        return false;
    } else {
        return true;
    }

}

function checkfirstname(value) {
    document.getElementById('firstnamestatuses').style.color = "red";

    if (value.length <= 1) {
        document.getElementById('firstnamestatuses').innerHTML = 'X Please enter your first name';
        return 1;
    } else {
        document.getElementById('firstnamestatuses').innerHTML = '';
        return 0;
    }
}
function checklastname(value) {
    document.getElementById('lastnamestatuses').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('lastnamestatuses').innerHTML = 'X Please enter your last name';
        return 1;
    } else {
        document.getElementById('lastnamestatuses').innerHTML = '';
        return 0;
    }
}

function checkphone2(value) {
    console.log("enter leawwww");
    document.getElementById('phonenumberstatus').style.color = "red";
    if (value.length == 0) {
        console.log("enter leawwww");
        document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number!';
        return 2
    }
    if (value.length != 10) {
        if (value.indexOf(' ') >= 0 && !hasNumber(value)) {

            document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number correctly! It must be ten digits without any "-" in between';
            return 1
        } else if (value.indexOf(' ') >= 0) {
            document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number correctly! It must be ten digits without any "-" in between';
            return 1
        } else if (!hasNumber(value)) {
            document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number correctly! It must be ten digits without any "-" in between';
            return 1
        } else {
            document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number correctly! It must be ten digits without any "-" in between';
            return 1
        }
    } else {
        if (value.indexOf(' ') >= 0 && !hasNumber(value)) {
            document.getElementById('phonenumberstatus').innerHTML = 'X Wrong phone number format! It must be ten digits without any "-" in between';
            return 1
        } else if (value.indexOf(' ') >= 0) {
            alert("Phonenumber must not contain whitespaces")
            document.getElementById('phonenumberstatus').innerHTML = 'X Wrong phone number format! It must be ten digits without any "-" in between';
            return 1
        } else if (!hasNumber(value)) {
            document.getElementById('phonenumberstatus').innerHTML = 'X Wrong phone number format1 It must be ten digits without any "-" in between';
            return 1
        } else {
            document.getElementById('phonenumberstatus').innerHTML = '';
            return 0
        }
    }
}

function checkemailvalue(value) {
    document.getElementById('emailvaluestatus').style.color = "red";
    if (hasAt(value) && hasDot(value)) {
        document.getElementById('emailvaluestatus').innerHTML = '';
        return 0
    } else {
        document.getElementById('emailvaluestatus').innerHTML = 'X Invalid email address';
        return 1;
    }
}

function checkcourseedit() {

    var coursename = $('#coursename').val();
    var coursecategory = $('#coursecategory').val();
    var courseprice = $('#courseprice').val();

    if (checkcoursename(coursename) == 1 ||
        checkcoursecategory(coursecategory) == 1 ||
        checkcourseprice(courseprice) == 1) {
        alert("Please enter all of the information");
        return false;
    } else {
        return true;
    }

}

function checkcoursename(value) {
    document.getElementById('coursenamestatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('coursenamestatus').innerHTML = 'X Please enter the course name';
        return 1;
    } else {
        document.getElementById('coursenamestatus').innerHTML = '';
        return 0;
    }
}

function checkcoursecategory(value) {
    document.getElementById('coursecategorystatus').style.color = "red";
    if (value == null) {
        document.getElementById('coursecategorystatus').innerHTML = 'X Please enter the course category';
        return 1;
    } else {
        document.getElementById('coursecategorystatus').innerHTML = '';
        return 0;
    }
}

function checkcourseprice(value) {
    document.getElementById('pricestatus').style.color = "red";
    if (value <= 0) {
        document.getElementById('pricestatus').innerHTML = 'X Please enter the course price';
        return 1;
    }if(/^\d+$/.test(value) == false){
        document.getElementById('pricestatus').innerHTML = 'X Price must contains only number';
        return 1;
    }
    else {
        document.getElementById('pricestatus').innerHTML = '';
        return 0;
    }
}


function checkaddcourse() {

    var coursename = $('#addcoursename').val();
    var coursecategory = $('#addcoursecategory').val();
    var courseprice = $('#addcourseprice').val();

    if (checkaddcoursename(coursename) == 1 ||
        checkaddcoursecategory(coursecategory) == 1 ||
        checkaddcourseprice(courseprice) == 1) {
        alert("Please enter all of the information");
        return false;
    } else {
        return true;
    }

}

function checkaddcoursename(value) {
    document.getElementById('addcoursenamestatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('addcoursenamestatus').innerHTML = 'X Please enter the course name';
        return 1;
    } else {
        document.getElementById('addcoursenamestatus').innerHTML = '';
        return 0;
    }
}

function checkaddcoursecategory(value) {
    document.getElementById('addcoursecategorystatus').style.color = "red";
    if (value == null) {
        document.getElementById('addcoursecategorystatus').innerHTML = 'X Please enter the course category';
        return 1;
    } else {
        document.getElementById('addcoursecategorystatus').innerHTML = '';
        return 0;
    }
}

function checkaddcourseprice(value) {
    document.getElementById('addcoursepricestatus').style.color = "red";
    if (value <= 0) {
        document.getElementById('addcoursepricestatus').innerHTML = 'X Please enter the course price';
        return 1;
    } else {
        document.getElementById('addcoursepricestatus').innerHTML = '';
        return 0;
    }
}

$("#addcoursename").focusout(function () {
    var value = $(this).val()
    if (checkaddcoursename(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#addcoursecategory").focusout(function () {
    var value = $(this).val()
    if (checkaddcoursecategory(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#addcourseprice").focusout(function () {
    var value = $(this).val()
    if (checkaddcourseprice(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});


function checkuploadpicture() {
    var $fileUpload = $("#input-image-3");
    if (parseInt($fileUpload.get(0).files.length) < 1) {
        alert("You must upload a picture");
        return false;

    }

    else {
        return true;
    }

}

function hasAt(myString) {
    if ((myString.split("@").length - 1) > 1) {
        return false
    } //Check how many "@"
    var att = new RegExp("@");
    return att.test(myString);
}

function hasDot(myString) {
    return /\./.test(myString)

}


function checkDateOfBirth(date1) {
    document.getElementById('dateofbirthstatuses').style.color = "red";
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    // hundredyrsago = yyyy-100;
    var hundredyrsago = today.getFullYear()-100;
    today = dd + '-' + mm + '-' + yyyy;
    hundredyrsagodate = mm + '/' + dd + '/' + hundredyrsago;

    today = today.split("-");
    var todaydate = new Date(today[2], today[1] - 1, today[0]);
    var inputdate = date1.split("-");
    var inputdate2 = new Date(inputdate[2], inputdate[1] - 1, inputdate[0]);

    if (date1.length <= 1 ) {
        // document.getElementById('dateofbirthstatuses').innerHTML = "X Please enter the date of birth";
        return 1;
    }if(inputdate2 == todaydate){
        document.getElementById('dateofbirthstatuses').innerHTML = "X You can't be born today right!?";
        return 1;
    }if(inputdate2 >= todaydate){
        document.getElementById('dateofbirthstatuses').innerHTML = "X You are not from the future right!?";
        return 1;
    }
    else{
        document.getElementById('dateofbirthstatuses').innerHTML = "";
        return 0;

    }

}

$("#editdateofbirth").focusout(function () {
    var date1 = $('[name=dateofbirth]').val();
    if (checkDateOfBirth(date1) == 1) {
    } else {
    }
});


