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



        function checkalledit() {
            console.log('checkedit');
            var posvalue = $('#info').val();
            var firstnamevalue = $('#firstnamevalue').val();
            var lastnamevalue = $('#lasttnamevalue').val();
            var agevalue = $('#age').val();
            var detailvalue = $('#detail').val();
            var phonevalue = $('#phonenumber').val();


            if (checkpos(posvalue) == 1 ||
                checkdetail(detailvalue) == 1 ||
                checkphone(phonevalue) == 1 ||
                checkphone(phonevalue) == 2 ||
                checkfirstname(firstnamevalue) == 1 ||
                checklasttname(lastnamevalue) == 1 ||
                checkage(agevalue) == 1
            ) {
                alert("Please enter all of the information");
                console.log(phonevalue)
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
            if (value <= 1) {
                document.getElementById('coursepricestatus').innerHTML = 'X Please enter the course price';
                return 1;
            } else {
                document.getElementById('coursepricestatus').innerHTML = '';
                return 0;
            }
        }

        $("#firstnamevalue").focusout(function () {
            var value = $(this).val()
            if (checkfirstname(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });
        $("#lastnamevalue").focusout(function () {
            var value = $(this).val()
            if (checklastname(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });
        $("#age").focusout(function () {
            var value = $(this).val()
            if (checkage(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });

        $("#coursename").focusout(function () {
            var value = $(this).val()
            if (checkcoursename(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });
        $("#coursecategory").focusout(function () {
            var value = $(this).val()
            if (checkcoursecategory(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });
        $("#courseprice").focusout(function () {
            var value = $(this).val()
            if (checkcourseprice(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });

        $("#addcoursename").focusout(function () {
            var value = $(this).val()
            if (checkaddcoursename(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });
        $("#addcoursecategory").focusout(function () {
            var value = $(this).val()
            if (checkaddcoursecategory(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });
        $("#addcourseprice").focusout(function () {
            var value = $(this).val()
            if (checkaddcourseprice(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });

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
            if (value <= 1) {
                document.getElementById('addcoursepricestatus').innerHTML = 'X Please enter the course price';
                return 1;
            } else {
                document.getElementById('addcoursepricestatus').innerHTML = '';
                return 0;
            }
        }

        $("#addcoursename").focusout(function () {
            var value = $(this).val()
            if (checkcoursename(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });
        $("#addcoursecategory").focusout(function () {
            var value = $(this).val()
            if (checkcoursecategory(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
            }
        });
        $("#addcourseprice").focusout(function () {
            var value = $(this).val()
            if (checkcourseprice(value) == 1) {
                $(this).css("border-color", "#FF0000");
            } else {
                $(this).css("border-color", "#00CD00");
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

