function checkuploadresume() {
    var $fileUpload = $("#input-image-3");
    if (parseInt($fileUpload.get(0).files.length) < 1) {
        alert("You must upload a resume first");
        return false;
    }
    else {
        return true;
    }
}