// function checkjob(value) {
//     document.getElementById('jobstatuses').style.color = "red";
//     if (value.value.length <= 1) {
//         document.getElementById('jobstatuses').innerHTML = 'X Please enter the job name';
//         return 1;
//     } else {
//         document.getElementById('jobstatuses').innerHTML = '';
//         return 0;
//     }
// }
// function checkphone(value){
//       document.getElementById('phonenostatus').style.color="red";
//       if(value.length == 0) {
//           document.getElementById('phonenostatus').innerHTML ='';
//           return 2
//       }
//       if(value.length !=10) {
//           if(value.indexOf(' ')>=0 && hasAlphabet(value)) {
//
//               document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain whitespaces, contain alphabet, and contain exactly 10 digits'+"<br />"+"<br />";
//               return 1
//           } else if(value.indexOf(' ')>=0) {
//               document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain whitespaces'+"<br />"+"<br />";
//                return 1
//           }else if(hasAlphabet(value)){
//               document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain alphabet'+"<br />"+"<br />";
//               return 1
//           } else {
//               document.getElementById('phonenostatus').innerHTML ='X Phone number must contain 10 digits'+"<br />"+"<br />";
//               return 1
//           }
//       } else {
//           if(value.indexOf(' ')>=0 && hasAlphabet(value)) {
//               document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain whitespaces, contain alphabet, and contain exactly 10 digits'+"<br />"+"<br />";
//               return 1
//           } else if(value.indexOf(' ')>=0) {
//                alert("Phonenumber must not contain whitespaces")
//               document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain whitespaces'+"<br />"+"<br />";
//                return 1
//           }else if(hasAlphabet(value)){
//               document.getElementById('phonenostatus').innerHTML ='X Phone number must not contain alphabet'+"<br />"+"<br />";
//               return 1
//           } else {
//               document.getElementById('phonenostatus').innerHTML ='';
//               return 0
//           }
//       }
//
//   }
// $("#jobnames").focusout(function () {
//     var value = $(this).val()
//     if (checkjob(value) == 1) {
//         $(this).css("border-color", "#FF0000");
//     } else {
//         $(this).css("border-color", "#00CD00");
//     }
// });
// // $("#phonenumber" ).focusout(function() {
// //         var value = $(this).val()
// //         if (checkphone(value) == 1) {
// //             $(this).css("border-color", "#FF0000");
// //         } else if (checkphone(value) == 2) {
// //             $(this).css("border-color", "#cccccc");
// //         } else{
// //             $(this).css("border-color", "#00CD00");
// //         }
// //     });
// function checkallpost() {
//     // console.log('hi');
//     var posvalue = $('#info').val();
//     var phonevalue = $('#phonenumber').val();
//     var emailvalue = $('#emailvalue').val();
//     var websitevalue = $('#website').val();
//     // alert(posvalue + phonevalue + emailvalue + websitevalue + checkpos(posvalue) + checkphone(phonevalue) + checkemail(emailvalue) + checkwebsite(websitevalue));
//     // alert("web "+checkwebsite(websitevalue))
//     // alert(checkpos(posvalue));
//
//     if (checkjob(posvalue) == 1 ||
//         checkdetail(detailvalue) == 1 ||
//         checkphone(phonevalue) == 1 ||
//         checkphone(phonevalue) == 2 ||
//             checkemail(emailvalue) == 1
//         ) {
//         alert("Please enter all of the information");
//         return false;
//     } else {
//         return true;
//     }
// }








// $("#post1").focusout(function () {
//     var value = $(this).val()
//     if (checkpost1(value) == 1) {
//         $(this).css("border-color", "#FF0000");
//     } else {
//         $(this).css("border-color", "#00CD00");
//     }
// });
// $("#post").focusout(function () {
//     var value = $(this).val()
//     if (checkpost(value) == 1) {
//         $(this).css("border-color", "#FF0000");
//     } else {
//         $(this).css("border-color", "#00CD00");
//     }
// });
// $("#detail").focusout(function () {
//     var value = $(this).val()
//     if (checkdetail(value) == 1 || hasEmbed(value) == 0) {
//         $(this).css("border-color", "#FF0000");
//     } else {
//         $(this).css("border-color", "#00CD00");
//     }
// });
// $("#coursecategory").focusout(function () {
//     var value = $(this).text().trim()
//     if (checkcategory2(value) == 1) {
//         $(this).css("border-color", "#FF0000");
//     } else {
//         $(this).css("border-color", "#00CD00");
//     }
// });
// $("#othercourse").focusout(function () {
//     var value = $(this).val()
//     if (checkothers(value) == 1) {
//         $(this).css("border-color", "#FF0000");
//     } else {
//         $(this).css("border-color", "#00CD00");
//     }
// });





$("#companyname").focusout(function () {
    var value = $(this).val()
    if (checkcompanyname(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#jobname").focusout(function () {
    var value = $(this).val()
    if (checkjobname(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#jobinfo").focusout(function () {
    var value = $(this).val()
    if (checkjobinfo(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#phonenumber").focusout(function () {
    var value = $(this).val();
    // console.log('hi phonenumber validation');
    // console.log(checkphone(value));
    if (checkphone(value) == 1) {
        // $(this).css("border-color", "#FF0000");
        document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number';
    } else if (checkphone(value) == 2) {
        // $(this).css("border-color", "#FF0000");
        document.getElementById('phonenumberstatus').innerHTML = 'X Please enter your phone number';

    } else {
        // $(this).css("border-color", "#00CD00");
        document.getElementById('phonenumberstatus').innerHTML = '';
    }
});
$("#emailvalue").focusout(function () {
    var value = $(this).val()
    if (checkemail(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
// $("#website").focusout(function () {
//     var value = $(this).val()
//     if (checkwebsite(value) == 1) {
//         // $(this).css("border-color", "#FF0000");
//     } else {
//         // $(this).css("border-color", "#00CD00");
//     }
// });

function checkcompanyname(value) {
    document.getElementById('companynamestatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('companynamestatus').innerHTML = 'X Please enter the company name';
        return 1;
    } else {
        document.getElementById('companynamestatus').innerHTML = '';
        return 0;
    }
}
function checkjobinfo(value) {
    document.getElementById('jobinfostatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('jobinfostatus').innerHTML = 'X Please enter the job summary';
        return 1;
    } else {
        document.getElementById('jobinfostatus').innerHTML = '';
        return 0;
    }
}
function checkjobname(value) {
    document.getElementById('jobnamestatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('jobnamestatus').innerHTML = 'X Please enter the job title';
        return 1;
    } else {
        document.getElementById('jobnamestatus').innerHTML = '';
        return 0;
    }
}
function checkphone(value) {
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
function checkemail(value) {
    document.getElementById('emailstatuses').style.color = "red";
    if (hasAt(value) && hasDot(value)) {
        document.getElementById('emailstatuses').innerHTML = '';
        return 0
    } else {
        document.getElementById('emailstatuses').innerHTML = "X Enter a valid email";
        return 1;
    }
}
// function checkwebsite(value) {
//     document.getElementById('websitestatus').style.color = "red";
//     if (hasWWW(value) && hasDot(value)) {
//         document.getElementById('websitestatus').innerHTML = '';
//         return 0;
//     } else {
//         document.getElementById('websitestatus').innerHTML = "X Enter a valid website";
//         return 1;
//     }
// }
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

function checkDate(date1,date2) {

    document.getElementById('datestatus').style.color = "red";
    if (date1>date2 ) {

        document.getElementById('datestatus').innerHTML = "X Start date can't be more than End date";
        return 1;

    }if(date1.length<=1 || date2.length<=1){

       document.getElementById('datestatus').innerHTML = "X Please enter both of the date";
        return 1;
    }else{
        document.getElementById('datestatus').innerHTML = "";
        return 0;

    }

}


//////////
function checkDateApplicationStart(date1) {
    // console.log('enter checkdateofbirth ')
    // alert('asdf');
    document.getElementById('startdatestatus').style.color = "red";
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
        document.getElementById('startdatestatus').innerHTML = "X Please enter the application start date";
        return 1;
    }
    if (date1.length !== 10) {
        document.getElementById('startdatestatus').innerHTML = "X Please enter the application start date correctly";
        return 1;
    }if (date1.substring(2, 3) !== '-' || date1.substring(5, 6) !== '-') {
        document.getElementById('startdatestatus').innerHTML = "X Please enter the application start date correctly";
        return 1;
    }
    day = date1.substring(0, 2) - 1; // because months in JS start from 0
    month = date1.substring(3, 5) - 0;
    year = date1.substring(6, 10) - 0;
    if (year < 1000 || year > 3000) {
        document.getElementById('startdatestatus').innerHTML = "X Please enter the application start date correctly";
        return 1;
    }
    else {
        document.getElementById('startdatestatus').innerHTML = "";
        return 0;

    }

}
function checkDateApplicationEnd(date1) {
    // console.log('enter checkdateofbirth ')
    // alert('asdf');
    document.getElementById('enddatestatus').style.color = "red";
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
        document.getElementById('enddatestatus').innerHTML = "X Please enter the application end date";
        return 1;
    }
    if (date1.length !== 10) {
        document.getElementById('enddatestatus').innerHTML = "X Please enter the application end date correctly";
        return 1;
    }if (date1.substring(2, 3) !== '-' || date1.substring(5, 6) !== '-') {
        document.getElementById('enddatestatus').innerHTML = "X Please enter the application end date correctly";
        return 1;
    }
    day = date1.substring(0, 2) - 1; // because months in JS start from 0
    month = date1.substring(3, 5) - 0;
    year = date1.substring(6, 10) - 0;
    if (year < 1000 || year > 3000) {
        document.getElementById('enddatestatus').innerHTML = "X Please enter the application end date correctly";
        return 1;
    }
    else {
        document.getElementById('enddatestatus').innerHTML = "";
        return 0;

    }

}


$("#applicationstartdate").focusout(function () {
    // alert('kao leaw')
    var date1 = $('[name=applicationstartdate]').val();
    if (checkDateApplicationStart(date1) == 1) {
    } else {
        // $('#datepicker').css("border-color", "#00CD00");
    }
});
$("#applicationenddate").focusout(function () {
    // alert('kao leaw')
    var date1 = $('[name=applicationenddate]').val();
    if (checkDateApplicationEnd(date1) == 1) {
    } else {
        // $('#datepicker').css("border-color", "#00CD00");
    }
});
/////







function checkallpost() {
    var companynamevalue = $('#companyname').val();
    var jobnamevalue = $('#jobname').val();
    var jobinfovalue = $('#jobinfo').val();
    var phonenovalue = $('#phonenumber').val();
    var emailvalue = $('#emailvalue').val();
    // var websitevalue = $('#website').val();
    var startdate = $('[name=applicationstartdate]').val();
    var enddate = $('[name=applicationenddate]').val();

    var $fileUpload = $("#input-image-3");
        if (parseInt($fileUpload.get(0).files.length) <1) {
            alert("You must upload a job description");
            return false;

        }

    if (checkcompanyname(companynamevalue) == 1 ||
        checkjobname(jobnamevalue) == 1 ||
        checkjobinfo(jobinfovalue) == 1 ||
        checkphone(phonenovalue) == 1 ||
        checkphone(phonenovalue) == 2 ||
            checkemail(emailvalue) == 1 ||
            // checkwebsite(websitevalue) ==1 ||
            checkDateApplicationStart(startdate)==1 ||
            checkDateApplicationEnd(enddate) ==1 ||
    checkDate(startdate,enddate) ==1){
        alert("Please enter all of the information");
        // console.log(websitevalue);
        return false;
    } else {
        return true;
    }
}






function hasNumber(myString) {
    console.log(/^[0-9]+$/.test(myString));
    return /^[0-9]+$/.test(myString);
}





