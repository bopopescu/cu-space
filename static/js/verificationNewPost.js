var editor = CKEDITOR.replace('detail', {
    uiColor: '#ffffff'
});
var change = 0;
var detailCheck = 1;
editor.on('change', function (evt) {
    // getData() returns CKEditor's HTML content.
    console.log('Total bytes: ' + evt.editor.getData().length);
    if (evt.editor.getData().length > 10000) {
        $("#detailstatus").html('X Content is too long');
        detailCheck = 2;
    } else if (evt.editor.getData().length == 0) {
        if(change > 0){
            $("#detailstatus").html('X Please enter discussion content');
        }
        detailCheck = 1;
    } else {
        change = 1;
        $("#detailstatus").html('&nbsp;');
        detailCheck = 0;
    }
});

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

$("#discussion").focus(function () {
    $(this).css("border-color", "#ccc");
});
// $("#post").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#post1").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
// $("#detail").focus(function () {
//     $(this).css("border-color", "#0080ff");
// });
$("#discussion").focusout(function () {
    var value = $(this).val()
    if (checkpos(value) == 1) {
        document.getElementById('posstatus').innerHTML = 'X Please enter topic';
    } else {
        document.getElementById('posstatus').innerHTML = '&nbsp;';
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
    var value = $(this).val();
    if (checkdetail(value) == 1) {
        $(this).css("border-color", "#FF0000");
    } else {
        $(this).css("border-color", "#00CD00");
    }
});

function checkallpost() {
    var posvalue = $('#discussion').val();
    var categoryvalue = $('.selectpicker :selected').text();
    if (detailCheck == 2) {
        alert("Content is too long");
        return false;
    } else if (checkpos(posvalue) == 1 || detailCheck == 1 || checkcategory2(categoryvalue) == 1) {
        alert("Please enter all of the information");
        return false;
    } else {
        return true;
    }
}


function checkcategory2(value) {
    document.getElementById('categorystatus').style.color = "red";
    if (value == "") {
        document.getElementById('categorystatus').innerHTML = 'X Please select at least one category';
        return 1
    } else {
        document.getElementById('categorystatus').innerHTML = '&nbsp;';
        return 0
    }
}


$('.selectpicker').on('changed.bs.select', function (e) {
    var selecteddd = e.target.value;
    checkcategory()
    function checkcategory(value) {
        var ddl = document.getElementsByClassName("selectpicker");
        var selectedValue = selecteddd;
        document.getElementById('categorystatus').style.color = "red";
        if (selectedValue == 0) {
            document.getElementById('categorystatus').innerHTML = 'X Please select at least one category';
            return 1
        } else {
            document.getElementById('categorystatus').innerHTML = '&nbsp;';
            return 0
        }
    }
});
function checkpos(value) {
    document.getElementById('posstatus').style.color = "red";
    if (value.length <= 1) {
        // document.getElementById('posstatus').innerHTML = 'X Please enter the name of the topic';
        return 1;
    } else {
        document.getElementById('posstatus').innerHTML = '';
        return 0;
    }
}
function checkdetail(value) {
    document.getElementById('detailstatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('detailstatus').innerHTML = 'X Please enter the topic content';
        return 1;
    } else {
        document.getElementById('detailstatus').innerHTML = '';
        return 0;
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