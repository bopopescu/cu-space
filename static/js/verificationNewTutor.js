function myFunction() {

    var x = document.getElementById('b2');
    var y = document.getElementById('img1');
    var z = document.getElementById('b1');

    if (x.style.display == 'none') {
        x.style.display = 'block';
        y.style.display = 'block';
        z.style.display = 'none';


    } else {
        x.style.display = 'none';

    }

}
function myFunction1() {
    var x = document.getElementById('b3');
    var y = document.getElementById('img2');
    var z = document.getElementById('b2');

    if (x.style.display == 'none') {
        x.style.display = 'block';
        y.style.display = 'block';
        z.style.display = 'none';


    } else {
        x.style.display = 'none';

    }

}
function myFunction2() {
    var x = document.getElementById('b4');
    var y = document.getElementById('img3');
    var z = document.getElementById('b3');

    if (x.style.display == 'none') {
        x.style.display = 'block';
        y.style.display = 'block';
        z.style.display = 'none';


    } else {
        x.style.display = 'none';

    }

}
function myFunction3() {
    var x = document.getElementById('b5');
    var y = document.getElementById('img4');
    var z = document.getElementById('b4');

    if (x.style.display == 'none') {
        x.style.display = 'block';
        y.style.display = 'block';
        z.style.display = 'none';


    } else {
        x.style.display = 'none';

    }

}
function myFunction4() {
    var x = document.getElementById('b6');
    var y = document.getElementById('img5');
    var z = document.getElementById('b5');

    if (x.style.display == 'none') {
        x.style.display = 'block';
        y.style.display = 'block';
        z.style.display = 'none';


    } else {
        x.style.display = 'none';

    }

}
function myFunction5() {
    var y = document.getElementById('img6');
    var z = document.getElementById('b6');

    if (z.onclick) {

        y.style.display = 'block';
        z.style.display = 'none';


    } else {
        z.style.display = 'block';

    }

}
function btnClick() {
    $("#input-image-3").trigger('click');
}

$("#coursecategory").focus(function () {
    var value = $(this).text().trim()
    $(this).css("border-color", "#0080ff");
    if (checkcategory2(value) == 1) {
        $(this).css("border-color", "#FF0000");
    } else {
        $(this).css("border-color", "#00CD00");
    }
});

$("#othercourse").focus(function () {
    $(this).css("border-color", "#0080ff");
});
$("#bio").focus(function () {
    $(this).css("border-color", "#0080ff");
});
$("#post").focus(function () {
    $(this).css("border-color", "#0080ff");
});
$("#post1").focus(function () {
    $(this).css("border-color", "#0080ff");
});
$("#detail").focus(function () {
    $(this).css("border-color", "#0080ff");
});
$("#bio").focusout(function () {
    var value = $(this).val()
    if (checkpos(value) == 1) {
        $(this).css("border-color", "#FF0000");
    } else {
        $(this).css("border-color", "#00CD00");
    }
})
$("#post1").focusout(function () {
    var value = $(this).val()
    if (checkpost1(value) == 1) {
        $(this).css("border-color", "#FF0000");
    } else {
        $(this).css("border-color", "#00CD00");
    }
})
$("#post").focusout(function () {
    var value = $(this).val()
    if (checkpost(value) == 1) {
        $(this).css("border-color", "#FF0000");
    } else {
        $(this).css("border-color", "#00CD00");
    }
})
$("#detail").focusout(function () {
    var value = $(this).val()
    if (checkdetail(value) == 1) {
        $(this).css("border-color", "#FF0000");
    } else {
        $(this).css("border-color", "#00CD00");
    }
})

$("#coursecategory").focusout(function () {
    var value = $(this).text().trim()
    if (checkcategory2(value) == 1) {
        $(this).css("border-color", "#FF0000");
    } else {
        $(this).css("border-color", "#00CD00");
    }});

$("#othercourse").focusout(function () {
    var value = $(this).val()
    if (checkothers(value) == 1) {
        $(this).css("border-color", "#FF0000");
    } else {
        $(this).css("border-color", "#00CD00");
    }
});


function checkallpost() {
    var posvalue = $('#bio').val();
    var postvalue = $('#post').val();
    var post1value = $('#post1').val();
    var detailvalue = $('#detail').val();
    var categoryvalue = $('#coursecategory').text().trim();
    var othersvalue = $('#othercourse').val();
    var $fileUpload = $("#input-image-3");
    if (parseInt($fileUpload.get(0).files.length) > 6) {
        alert("Can upload a maximum of 6 images");
        return false;
    }

    if (checkpos(posvalue) == 1 ||
        checkpost1(post1value) == 1 ||
        checkdetail(detailvalue) == 1 ||
        checkcategory2(categoryvalue) == 1 ||
        checkothers(othersvalue) ==1 ) {
        alert("Please enter all of the information");
        return false;
    } else {
        return true;
    }
}
function checkcategory(value) {
    var ddl = document.getElementById("coursecategory");
    var selectedValue = ddl.text();
    document.getElementById('categorystatus').style.color = "red";
    if (selectedValue == "") {
        document.getElementById('categorystatus').innerHTML = 'X Please enter the right category';
        return 1
    } else {
        document.getElementById('categorystatus').innerHTML = '';
        return 0
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
        document.getElementById('posstatus').innerHTML = 'X Please enter your bio';
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

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
})
function readURL(input) {
    document.getElementById("img0").style.display = "none";
    document.getElementById("img1").style.display = "none";
    document.getElementById("img2").style.display = "none";
    document.getElementById("img3").style.display = "none";
    document.getElementById("img4").style.display = "none";
    document.getElementById("img5").style.display = "none";
    if (input.files.length > 6) {
        alert("Can upload a maximum of 6 images");
    } else {
        if (input.files[0]) {
            for (i = 0; i < input.files.length; i++)
                showImage(input, i);
            document.getElementById("b1").innerHTML = "Change picture";
        }
    }
}
function showImage(input, n) {
    var reader = new FileReader();
    var str = '#img' + n;

    reader.onload = function (e) {
        $(str)
            .attr('src', e.target.result)
            .width(100)
            .height(100);
    };

    reader.readAsDataURL(input.files[n]);
    $(str).show();
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
        var param = $(this).attr("href").replace("#","");
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