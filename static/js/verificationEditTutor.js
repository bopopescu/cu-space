//
//         function checkalledit() {
//            console.log('checkedit');
//     var posvalue = $('#info').val();
//         var namevalue = $('#name').val();
//         var agevalue = $('#age').val();
//
//     var detailvalue = $('#detail').val();
//     var phonevalue = $('#phonenumber').val();
//
//
//     if (checkpos(posvalue) == 1 ||
//         checkdetail(detailvalue) == 1 ||
//         checkphone(phonevalue) == 1 ||
//         checkphone(phonevalue) == 2 ||
//             checkname(namevalue)== 1
//          ) {
//         alert("Please enter all of the information");
//          console.log(phonevalue)
//         return false;
//     } else {
//         return true;
//     }
//
// }
//
// function checkname(value) {
//     document.getElementById('namestatus').style.color = "red";
//     if (value.length <= 1) {
//         document.getElementById('namestatus').innerHTML = 'X Please enter your name';
//         return 1;
//     } else {
//         document.getElementById('namestatus').innerHTML = '';
//         return 0;
//     }
// }
// function checkage(value) {
//     document.getElementById('agestatus').style.color = "red";
//     if (value.length <= 1) {
//         document.getElementById('agestatus').innerHTML = 'X Please enter your age';
//         return 1;
//     } else {
//         document.getElementById('agestatus').innerHTML = '';
//         return 0;
//     }
// }
//
// $("#name").focusout(function () {
//     var value = $(this).val()
//     if (checkname(value) == 1) {
//         $(this).css("border-color", "#FF0000");
//     } else {
//         $(this).css("border-color", "#00CD00");
//     }
// });
//         $("#age").focusout(function () {
//     var value = $(this).val()
//     if (checkage(value) == 1) {
//         $(this).css("border-color", "#FF0000");
//     } else {
//         $(this).css("border-color", "#00CD00");
//     }
// });


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


// function checkalledit() {
//     console.log('checkedit');
//     var posvalue = $('#info').val();
//     var firstnamevalue = $('#firstnamevalue').val();
//     var lastnamevalue = $('#lastnamevalue').val();
//     var agevalue = $('#age').val();
//     var detailvalue = $('#detail').val();
//     var phonevalue = $('#phonenumber').val();
//     var emailvalue = $('#emailvalue').val();
//     var dateofbirthvalue = $('[name=dateofbirth]').val();
//
//
//     if (checkpos(posvalue) == 1 ||
//         checkdetail(detailvalue) == 1 ||
//         checkphone(phonevalue) == 1 ||
//         checkphone2(phonevalue) == 2 ||
//         checkfirstname(firstnamevalue) == 1 ||
//         checklastname(lastnamevalue) == 1 ||
//
//         checkemailvalue(emailvalue) == 1 ||
//             checkDateOfBirth(dateofbirthvalue)==1
//
//     ) {
//         alert("Please enter all of the information correctly");
//         // console.log(phonevalue)
//         return false;
//     } else {
//         return true;
//     }
function checkalledit() {
    console.log('checkedit');
    var infovalue = $('#info').val();
    var firstnamevalue = $('#firstnamevalue').val();
    var lastnamevalue = $('#lastnamevalue').val();
    var agevalue = $('#age').val();
    var detailvalue = $('#detail').val();
    var phonevalue = $('#phonenumber').val();
    var emailvalue = $('#emailvalue').val();
    if (checkpos(infovalue) == 1 ||
        checkdetail(detailvalue) == 1 ||
        checkphone(phonevalue) == 1 ||
        checkphone2(phonevalue) == 2 ||
        checkfirstname(firstnamevalue) == 1 ||
        checklastname(lastnamevalue) == 1 ||
        checkage(agevalue) == 1 ||
        checkemailvalue(emailvalue) == 1
    ) {
        alert("Please enter all of the information");
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

function checkage(value) {
    document.getElementById('agestatus').style.color = "red";
    if (value <= 0) {
        document.getElementById('agestatus').innerHTML = 'X Please enter your age';
        return 1;
    } else {
        document.getElementById('agestatus').innerHTML = '';
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

            document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number correctly!';
            return 1
        } else if (value.indexOf(' ') >= 0) {
            document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number correctly!';
            return 1
        } else if (!hasNumber(value)) {
            document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number correctly!';
            return 1
        } else {
            document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number correctly!';
            return 1
        }
    } else {
        if (value.indexOf(' ') >= 0 && !hasNumber(value)) {
            document.getElementById('phonenumberstatus').innerHTML = 'X Wrong phone number format!';
            return 1
        } else if (value.indexOf(' ') >= 0) {
            alert("Phonenumber must not contain whitespaces")
            document.getElementById('phonenumberstatus').innerHTML = 'X Wrong phone number format!';
            return 1
        } else if (!hasNumber(value)) {
            document.getElementById('phonenumberstatus').innerHTML = 'X Wrong phone number format1';
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
    document.getElementById('coursepricestatus').style.color = "red";
    if (value <= 0) {
        document.getElementById('coursepricestatus').innerHTML = 'X Please enter the course price';
        return 1;
    } else {
        document.getElementById('coursepricestatus').innerHTML = '';
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
    today = mm + '/' + dd + '/' + yyyy;
    hundredyrsagodate = mm + '/' + dd + '/' + hundredyrsago;

    if (date1.length <= 1 ) {
        document.getElementById('dateofbirthstatuses').innerHTML = "X Please enter the date of birth";
        return 1;
    }if(date1 == today){
        document.getElementById('dateofbirthstatuses').innerHTML = "X You can't be born today right!?";
        return 1;
    }
    // if(date1 <= hundredyrsagodate){
    //     document.getElementById('dateofbirthstatuses').innerHTML = "X You can't be more than a 100 years old right!?";
    //     return 1;
    // }

    else{
        document.getElementById('dateofbirthstatuses').innerHTML = "";
        return 0;

    }

}

$("#datepicker").focusout(function () {
    var date1 = $('[name=dateofbirth]').val();
    if (checkDateOfBirth(date1) == 1) {
    } else {
        // $('#datepicker').css("border-color", "#00CD00");
    }
});


