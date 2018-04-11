// $("#coursecategory").focus(function () {
//     var value = $(this).text().trim()
//     // $(this).css("border-color", "#0080ff");
//     if (checkcategory2(value) == 1) {
//         // $(this).css("border-color", "#FF0000");
//     } else {
//         // $(this).css("border-color", "#00CD00");
//     }
// });
// $("#othercourse").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#info").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#post").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#post1").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#detail").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#course").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#coursecat").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#courseprice").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#phone").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });


$("#info").focusout(function () {
    var value = $(this).val()
    if (checkpos(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#post1").focusout(function () {
    var value = $(this).val()
    if (checkpost1(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#post").focusout(function () {
    var value = $(this).val()
    if (checkpost(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#detail").focusout(function () {
    var value = $(this).val()
    if (checkdetail(value) == 1 || hasEmbed(value) == 0) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#coursecategory").focusout(function () {
    var value = $(this).text().trim()
    if (checkcategory2(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});
$("#othercourse").focusout(function () {
    var value = $(this).val()
    if (checkothers(value) == 1) {
        // $(this).css("border-color", "#FF0000");
    } else {
        // $(this).css("border-color", "#00CD00");
    }
});

$('#facebook').focusout(function () {
    // $(this).css("border-color", "#00CD00");
});
$('#line').focusout(function () {
    // $(this).css("border-color", "#00CD00");
});
$("#phonenumber").focusout(function () {
    var value = $(this).val();
    // console.log('hi');
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


function checkallpost() {
    console.log('hi');
    var posvalue = $('#info').val();
    var detailvalue = $('#detail').val();
    var phonevalue = $('#phonenumber').val();

    if (checkpos(posvalue) == 1 ||
        checkdetail(detailvalue) == 1 ||
        checkphone(phonevalue) == 1 || checkphone(phonevalue) == 2
    ) {
        alert("Please enter all of the information correctly");
        console.log(phonevalue)
        return false;
    } else {
        return true;
    }
}

function checkcategory2(value) {

    document.getElementById('categorystatus').style.color = "red";
    if (value == "Course Category") {
        document.getElementById('categorystatus').innerHTML = 'X Please enter the right category';
        return 1
    } else {
        document.getElementById('categorystatus').innerHTML = '';
        return 0
    }
}

function checkpos(value) {
    document.getElementById('posstatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('posstatus').innerHTML = 'X Please enter your info';
        return 1;
    } else {
        document.getElementById('posstatus').innerHTML = '';
        return 0;
    }
}

function checkothers(value) {
    document.getElementById('othersstatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('othersstatus').innerHTML = 'X Please enter the category';
        return 1;
    } else {
        document.getElementById('othersstatus').innerHTML = '';
        return 0;
    }
}


function checkdetail(value) {
    document.getElementById('detailstatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('detailstatus').innerHTML = 'X Please enter the video link';
        return 1;
    } else if (value.length > 1 && hasEmbed(value) == 0 ) {
        document.getElementById('detailstatus').innerHTML = 'X Please enter the Embed video link as instructed in orange text';
        return 1;
    } else {
        document.getElementById('detailstatus').innerHTML = '';
        return 0;
    }
}






function checkpost1(value) {
    document.getElementById('post1status').style.color = "red";
    if (value.length == 0) {
        document.getElementById('post1status').innerHTML = 'X Pleas enter the price';
        return 1
    }
    if (value < 0) {
        document.getElementById('post1status').innerHTML = 'X Value of the price must be more than zero';
        return 1
    } else {
        document.getElementById('post1status').innerHTML = '';
        return 0
    }
}

(function ($) {
    $(function () {

        var addFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
            var $formGroupClone = $formGroup.clone();

            $(this)
                .toggleClass('btn-success btn-add btn-danger btn-remove')
                .html('–');

            $formGroupClone.find('input').val('');
            $formGroupClone.find('.concept').text('Course Category');
            $formGroupClone.insertAfter($formGroup);

            var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
                $lastFormGroupLast.find('.btn-add').attr('disabled', true);
            }
        };

        var removeFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');

            var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
                $lastFormGroupLast.find('.btn-add').attr('disabled', false);
            }

            $formGroup.remove();
        };

        var selectFormGroup = function (event) {
            event.preventDefault();

            var $selectGroup = $(this).closest('.input-group-select');
            var param = $(this).attr("href").replace("#", "");
            var concept = $(this).text();

            $selectGroup.find('.concept').text(concept);
            $selectGroup.find('.input-group-select-val').val(param);

        }

        var countFormGroup = function ($form) {
            return $form.find('.form-group').length;
        };

        $(document).on('click', '.btn-add', addFormGroup);
        $(document).on('click', '.btn-remove', removeFormGroup);
        $(document).on('click', '.dropdown-menu a', selectFormGroup);

    });
})(jQuery);
var cloneIndex = $("#course").length + 1;
$('.addcourse').on('click', function (e) {
    e.preventDefault();
    console.log('hi');
    $('#hiddenvalue').val(cloneIndex);
    $('.course').first().clone()
        .find("input")
        .attr("id", "courseprice").attr("name", "courseprice").attr("class", "form-control courseprice")
        .val('').end()
        .find("input:text")
        .attr("id", "course").attr("name", "course").attr("class", "form-control course")
        .val('').end()
        .find("select")
        .attr("id", "coursecat").attr("name", "coursecat").attr("class", "form-control coursecat")
        .val('').end().insertBefore(this);
    cloneIndex++;

});

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

function hasNumber(myString) {
    console.log(/^[0-9]+$/.test(myString));
    return /^[0-9]+$/.test(myString);
}


function hasEmbed(myString) {
    // alert('emb');
    console.log('embed');
    substring = "/embed/";
    if (myString.includes(substring) == true) {
        return 1;
    } else {
        return 0;
    }

}

