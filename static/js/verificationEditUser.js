function uploadFile() {
    var $fileUpload = $("#input-image-3");
    $fileUpload.trigger('click');
}

function readURL2(input) {
    document.getElementById("img0").style.display = "none";
    var buttonUpload = document.getElementById('buttonUpload');
    var changePicture = document.getElementById('changePicture');
    if (input.files.length > 1) {
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

$("#userUsernamevalue").focusout(function () {
    var value = $(this).val();
    // alert('sadf');
    if (checkuserUsername(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#userpasswordvalue").focusout(function () {
    var value = $(this).val();
    // alert('sadf');
    if (checkuserpassword(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});

$("#userfirstnamevalue").focusout(function () {
    var value = $(this).val();
    // alert('sadf');
    if (checkuserfirstname(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#userlastnamevalue").focusout(function () {
    var value = $(this).val()
    if (checkuserlastname(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#userdateofbirth").focusout(function () {
    var value = $(this).val()
    if (checkuserdateofbirth(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#useremailvalue").focusout(function () {
    var value = $(this).val()
    if (checkuseremailvalue(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});

function checkuserpassword(value) {
    document.getElementById('userpasswordstatuses').style.color = "red";
    if (value.length < 8 || value.length > 16) {
        document.getElementById('userpasswordstatuses').innerHTML = 'X Password must be between 8 and 16 characters';
        return 1;
    }  if (value.indexOf(' ') >= 0) {
        document.getElementById('userpasswordstatuses').innerHTML = 'X Password must not contain whitespaces';
        return 1
    }if(isValid(value) == false){
        document.getElementById('userpasswordstatuses').innerHTML = 'X Password must not contain only letters and numbers';
        return 1
    }if(hasUnderscore(value)== 1) {
        document.getElementById('userpasswordstatuses').innerHTML = 'X Password must not contain only letters and numbers';
    }
    else {
        document.getElementById('userpasswordstatuses').innerHTML = '';
        return 0;
    }
}
function hasUnderscore(myString) {
    // alert('emb');
    // console.log('embed');
    substring = "_";
    if (myString.includes(substring) == true) {
        return 1;
    } else {
        return 0;
    }

}
function isValid(str) { return /^\w+$/.test(str); }
function checkuserUsername(value) {
    document.getElementById('userUsernamestatuses').style.color = "red";
    if (value.length < 1 || value.length > 16) {
        document.getElementById('userUsernamestatuses').innerHTML = 'X Username must be between 1 and 16 characters';
        return 1;
    }  if (value.indexOf(' ') >= 0) {
        document.getElementById('userUsernamestatuses').innerHTML = 'X Username must not contain whitespaces';
        return 1
    }if(isValid(value) == false){
        document.getElementById('userUsernamestatuses').innerHTML = 'X Username must not contain only letters and numbers';
        return 1
    }if(hasUnderscore(value)== 1) {
        document.getElementById('userUsernamestatuses').innerHTML = 'X Username must not contain only letters and numbers';
    }
    else {
        document.getElementById('userUsernamestatuses').innerHTML = '';
        return 0;
    }
}


function checkalledituser() {
    console.log('checkedit');

    var firstnamevalue = $('#userfirstnamevalue').val();
    var lastnamevalue = $('#userlastnamevalue').val();
    var dateofbirth = $('#edituserdateofbirth').val();
    var emailvalue = $('#useremailvalue').val();

    if (checkuserfirstname(firstnamevalue) == 1 ||
        checkuserlastname(lastnamevalue) == 1 ||
        checkuserDateOfBirth(dateofbirth) == 1 ||
        checkuseremailvalue(emailvalue) == 1
    ) {
        alert("Please enter all of the information correctly");
        return false;
    } else {
        return true;
    }

}

function checkuserfirstname(value) {
    document.getElementById('userfirstnamestatuses').style.color = "red";

    if (value.length < 1) {
        document.getElementById('userfirstnamestatuses').innerHTML = 'X Please enter your first name';
        return 1;
    } else {
        document.getElementById('userfirstnamestatuses').innerHTML = '';
        return 0;
    }
}

function checkuserlastname(value) {
    document.getElementById('userlastnamestatuses').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('userlastnamestatuses').innerHTML = 'X Please enter your last name';
        return 1;
    } else {
        document.getElementById('userlastnamestatuses').innerHTML = '';
        return 0;
    }
}

function checkuseremailvalue(value) {
    document.getElementById('useremailvaluestatus').style.color = "red";
    if (hasAt(value) && hasDot(value)) {
        document.getElementById('useremailvaluestatus').innerHTML = '';
        return 0
    } else {
        document.getElementById('useremailvaluestatus').innerHTML = 'X Invalid email address';
        return 1;
    }
}




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


function checkuserDateOfBirth(date1) {
    document.getElementById('userdateofbirthstatuses').style.color = "red";
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
    var hundredyrsago = today.getFullYear() - 100;
    today = dd + '-' + mm + '-' + yyyy;

    today = today.split("-");
    var todaydate = new Date(today[2], today[1] - 1, today[0]);
    var inputdate = date1.split("-");
    var inputdate2 = new Date(inputdate[2], inputdate[1] - 1, inputdate[0]);

    if (date1.length <= 1) {
        // document.getElementById('userdateofbirthstatuses').innerHTML = "X Please enter the date of birth";
        return 1;
    }
    if (inputdate2 == todaydate) {
        document.getElementById('userdateofbirthstatuses').innerHTML = "X You can't be born today right!?";
        return 1;
    }
    if (inputdate2 >= todaydate) {
        document.getElementById('userdateofbirthstatuses').innerHTML = "X You can't be born today or from the future right!?";
        return 1;
    }
    else {
        document.getElementById('userdateofbirthstatuses').innerHTML = "";
        return 0;

    }

}

$("#edituserdateofbirth").focusout(function () {
    var date1 = $('[name=edituserdateofbirth]').val();
    if (checkuserDateOfBirth(date1) == 1) {
    } else {
    }
});


