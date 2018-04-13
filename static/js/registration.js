// $( "#password" ).focus(function() {
//         $(this).css("border-color", "#0080ff");
//
// });
// $( "#firstname" ).focus(function() {
//         $(this).css("border-color", "#0080ff");
//
// });
// $( "#lastname" ).focus(function() {
//         $(this).css("border-color", "#0080ff");
//
// });
// $( "#phoneno" ).focus(function() {
//         $(this).css("border-color", "#0080ff");
//
// });
// $( "#email" ).focus(function() {
//         $(this).css("border-color", "#0080ff");
//
// });
$("#password").focusout(function () {
    var value = $(this).val()
    if (checkpasswordsignup(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
})
$("#firstname").focusout(function () {
    var value = $(this).val()
    if (checkfirstnamesignup(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
})
$("#lastname").focusout(function () {
    var value = $(this).val()
    if (checklastnamesignup(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
})
$("#email").focusout(function () {
    var value = $(this).val()
    if (checkemailsignup(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
})

$("#usrname").focusout(function () {
    var value = $(this).val()
    if (checkusernamelogin(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});

$("#psw").focusout(function () {
    var value = $(this).val()
    if (checkpasswordlogin(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});


$("#phoneno").focusout(function () {
    var value = $(this).val();
    // console.log('hi phonenumber validation');
    // console.log(checkphone(value));
    if (checkphonesignup(value) == 1) {
        // $(this).css("border-color", "#FF0000");
        // document.getElementById('phonenostatus').innerHTML = 'X Please enter your phone number';
    } else if (checkphonesignup(value) == 2) {
        // $(this).css("border-color", "#FF0000");
        // document.getElementById('phonenostatus').innerHTML = 'X Please enter your phone number';

    } else {
        // $(this).css("border-color", "#00CD00");
        // document.getElementById('phonenostatus').innerHTML = '';
    }
});


function checkpasswordlogin(value) {
    document.getElementById('passwordloginstatus').style.color = "red";
    if (value.length < 8 || value.length > 16) {
        document.getElementById('passwordloginstatus').innerHTML = 'X Password must be between 8 and 16 characters';
        return 1;
    } else if (value.indexOf(' ') >= 0) {
        document.getElementById('passwordloginstatus').innerHTML = 'X Password must not contain whitespaces';
        return 1
    }
    else {
        document.getElementById('passwordloginstatus').innerHTML = '';
        return 0;
    }
}

function checkpasswordsignup(value) {
    document.getElementById('passwordsignupstatus').style.color = "red";
    if (value.length < 8 || value.length > 16) {
        document.getElementById('passwordsignupstatus').innerHTML = 'X Password must be between 8 and 16 characters';
        return 1;
    } else if (value.indexOf(' ') >= 0) {
        document.getElementById('passwordsignupstatus').innerHTML = 'X Password must not contain whitespaces';
        return 1
    }
    else {
        document.getElementById('passwordsignupstatus,').innerHTML = '';
        return 0;
    }
}

// function checkphone(value){
//     document.getElementById('phonenostatus').style.color="red";
//     if(value.length == 0) {
//         document.getElementById('phonenostatus').innerHTML ='';
//         return 2
//     }
//     if(value.length !=10) {
//         if(value.indexOf(' ')>=0 && hasAlphabet(value)) {
//
//             document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain whitespaces, contain alphabet, and contain exactly 10 digits'+"<br />"+"<br />";
//             return 1
//         } else if(value.indexOf(' ')>=0) {
//             document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain whitespaces'+"<br />"+"<br />";
//              return 1
//         }else if(hasAlphabet(value)){
//             document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain alphabet'+"<br />"+"<br />";
//             return 1
//         } else {
//             document.getElementById('phonenostatus').innerHTML ='X Phone number must contain 10 digits'+"<br />"+"<br />";
//             return 1
//         }
//     } else {
//         if(value.indexOf(' ')>=0 && hasAlphabet(value)) {
//             document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain whitespaces, contain alphabet, and contain exactly 10 digits'+"<br />"+"<br />";
//             return 1
//         } else if(value.indexOf(' ')>=0) {
//              alert("Phonenumber must not contain whitespaces")
//             document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain whitespaces'+"<br />"+"<br />";
//              return 1
//         }else if(hasAlphabet(value)){
//             document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain alphabet'+"<br />"+"<br />";
//             return 1
//         } else {
//             document.getElementById('phonenostatus').innerHTML ='';
//             return 0
//         }
//     }
//      /* alert("Phonenumber must contain 10 digits")
//       return 1;
//     }
//     #else if(value.indexOf(' ')>=0){
//         alert("Phonenumber must not contain whitespaces")
//         return 1
//     }
//     else if(hasAlphabet(value)){
//         alert("Phonenumber must not contain alphabet")
//         return 1
//     }
//     else {
//         return 0;
//     }*/
// }

function checkphonesignup(value) {
    console.log("enter leawwww");
    document.getElementById('phonenosignupstatus').style.color = "red";
    if (value.length == 0) {
        console.log("enter leawwww");
        document.getElementById('phonenosignupstatus').innerHTML = 'X Please enter your phone number';
        return 2
    }
    if (value.length != 10) {
        if (value.indexOf(' ') >= 0 && !hasNumber(value)) {

            document.getElementById('phonenosignupstatus').innerHTML = 'X Please enter your phone number correctly';
            return 1
        } else if (value.indexOf(' ') >= 0) {
            document.getElementById('phonenosignupstatus').innerHTML = 'X Please enter your phone number correctly';
            return 1
        } else if (!hasNumber(value)) {
            document.getElementById('phonenosignupstatus').innerHTML = 'X Please enter your phone number correctly';
            return 1
        } else {
            document.getElementById('phonenosignupstatus').innerHTML = 'X Please enter your phone number correctly';
            return 1
        }
    } else {
        if (value.indexOf(' ') >= 0 && !hasNumber(value)) {
            document.getElementById('phonenosignupstatus').innerHTML = 'X Wrong phone number format';
            return 1
        } else if (value.indexOf(' ') >= 0) {
            alert("Phonenumber must not contain whitespaces")
            document.getElementById('phonenosignupstatus').innerHTML = 'X Wrong phone number format';
            return 1
        } else if (!hasNumber(value)) {
            document.getElementById('phonenosignupstatus').innerHTML = 'X Wrong phone number format';
            return 1
        } else {
            document.getElementById('phonenosignupstatus').innerHTML = '';
            return 0
        }
    }
}

function checkfirstnamesignup(value) {
    document.getElementById('firstnamesignupstatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('firstnamesignupstatus').innerHTML = 'X Please enter your name';
        return 1;
    }
    else if (hasNumber(value)) {
        document.getElementById('firstnamesignupstatus').innerHTML = 'X Name must not contain number';
        return 1
    } else {
        document.getElementById('firstnamesignupstatus').innerHTML = '';
        return 0;
    }
}

function checklastnamesignup(value) {
    document.getElementById('lastnamesignupstatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('lastnamesignupstatus').innerHTML = 'X Please enter your name';
        return 1;
    }
    else if (hasNumber(value)) {
        document.getElementById('lastnamesignupstatus').innerHTML = 'X Name must not contain number';
        return 1
    } else {
        document.getElementById('lastnamesignupstatus').innerHTML = '';
        return 0;
    }
}

function checkemailsignup(value) {
    document.getElementById('emailsignupstatus').style.color = "red";
    if (hasAt(value) && hasDot(value)) {
        document.getElementById('emailsignupstatus').innerHTML = '';
        return 0
    } else {
        document.getElementById('emailsignupstatus').innerHTML = 'X Invalid email address';
        return 1;
    }
}

function hasNumber(myString) {
    return /\d+/.test(myString);
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

function hasAlphabet(myString) {
    return /[a-zA-Z]/.test(myString)
}

function hasWWW(myString) {
    // alert('emb');
    // console.log('embed');
    substring = "www.";
    if (myString.includes(substring) == true) {
        return 1;
    } else {
        return 0;
    }

}

function checkall() {
    var firstnamevalue = $('#firstname').val();
    var lastnamevalue = $('#lastname').val();
    var passwordvalue = $('#password').val();
    var emailvalue = $('#email').val();
    var phonenovalue = $('#phoneno').val();
    var dateofbirthsignupvalue = $('[name=dateofbirthsignup]').val();

    if (checkfirstnamesignup(firstnamevalue) == 1 ||
        checklastnamesignup(lastnamevalue) == 1 ||
        checkpasswordsignup(passwordvalue) == 1 ||
        checkemailsignup(emailvalue) == 1 ||
        checkphonesignup(phonenovalue) == 1 ||
        checkDateOfBirthSignUp(dateofbirthsignupvalue) == 1) {
        alert("Please enter all of the field correctly");
        return false;
    }
}


function checkusernamelogin(value) {
    document.getElementById('usernameloginstatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('usernameloginstatus').innerHTML = 'X Please enter your username';
        return 1;
    } else {
        document.getElementById('usernameloginstatus').innerHTML = '';
        return 0;
    }
}


function checklogin() {
    var usernamevalue = $('#usrname').val();
    var passwordvalue = $('#psw').val();

    if (checkusernamelogin(usernamevalue) == 1 ||
        checkpasswordlogin(passwordvalue) == 1) {
        alert("Please enter all of the field correctly");
        return false;
    }
}


function checkDateOfBirthSignUp(date1) {
    // console.log('enter checkdateofbirth ')
    // alert('asdf');
    document.getElementById('dateofbirthsignupstatus').style.color = "red";
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
    // hundredyrsagodate = mm + '/' + dd + '/' + hundredyrsago;

    var day,year;
     if (date1.length <= 1) {
        document.getElementById('dateofbirthsignupstatus').innerHTML = "X Please enter the date of birth";
        return 1;
    }
    if (date1.length !== 10) {
        document.getElementById('dateofbirthsignupstatus').innerHTML = "X Please enter the date of birth correctly";
        return 1;
    }if (date1.substring(2, 3) !== '-' || date1.substring(5, 6) !== '-') {
        document.getElementById('dateofbirthsignupstatus').innerHTML = "X Please enter the date of birth correctly";
        return 1;
    }
    day = date1.substring(0, 2) - 1; // because months in JS start from 0
    month = date1.substring(3, 5) - 0;
    year = date1.substring(6, 10) - 0;
    if (year < 1000 || year > 3000) {
        document.getElementById('dateofbirthsignupstatus').innerHTML = "X Please enter the date of birth correctly";
        return 1;
    }


    if(date1 == today){
        document.getElementById('dateofbirthsignupstatus').innerHTML = "X You can't be born today right!?";
        return 1;
    }

    else {
        document.getElementById('dateofbirthsignupstatus').innerHTML = "";
        return 0;

    }

}

$("#datepicker").focusout(function () {
    // alert('kao leaw')
    var date1 = $('[name=datesignup]').val();
    if (checkDateOfBirthSignUp(date1) == 1) {
    } else {
        // $('#datepicker').css("border-color", "#00CD00");
    }
});
