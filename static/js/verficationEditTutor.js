
        function checkalledit() {
           console.log('checkedit');
    var posvalue = $('#info').val();
        var namevalue = $('#name').val();
        var agevalue = $('#age').val();

    var detailvalue = $('#detail').val();
    var phonevalue = $('#phonenumber').val();


    if (checkpos(posvalue) == 1 ||
        checkdetail(detailvalue) == 1 ||
        checkphone(phonevalue) == 1 ||
        checkphone(phonevalue) == 2 ||
            checkname(namevalue)== 1
         ) {
        alert("Please enter all of the information");
         console.log(phonevalue)
        return false;
    } else {
        return true;
    }

}

function checkname(value) {
    document.getElementById('namestatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('namestatus').innerHTML = 'X Please enter your name';
        return 1;
    } else {
        document.getElementById('namestatus').innerHTML = '';
        return 0;
    }
}
function checkage(value) {
    document.getElementById('agestatus').style.color = "red";
    if (value.length <= 1) {
        document.getElementById('agestatus').innerHTML = 'X Please enter your age';
        return 1;
    } else {
        document.getElementById('agestatus').innerHTML = '';
        return 0;
    }
}

$("#name").focusout(function () {
    var value = $(this).val()
    if (checkname(value) == 1) {
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
