$("#telephone" ).focusout(function() {
        var value = $(this).val();
        console.log('hi');
        console.log(checkphone(value));
        if (checkphone(value) == 1) {
            $(this).css("border-color", "#FF0000");document.getElementById('phonenumberstatus').innerHTML ='X Please enter your phone number';
            return false;
        } else if (checkphone(value) == 2) {
            $(this).css("border-color", "#FF0000");document.getElementById('phonenumberstatus').innerHTML ='X Please enter your phone number';
            return false;

        } else{
            $(this).css("border-color", "#00CD00");document.getElementById('phonenumberstatus').innerHTML ='';
            return true;
        }
    });



function checkphone(value){
      console.log("enter leawwww");
      document.getElementById('phonenumberstatus').style.color="red";
      if(value.length == 0){
          console.log("enter leawwww");
          document.getElementById('phonenumberstatus').innerHTML ='X Please enter your phone number!';
          return 2
      }
      if(value.length !=10) {
          if(value.indexOf(' ')>=0 && !hasNumber(value)) {

              document.getElementById('phonenumberstatus').innerHTML ='X Please enter your phone number correctly!';
              return 1
          } else if(value.indexOf(' ')>=0) {
              document.getElementById('phonenumberstatus').innerHTML ='X Please enter your phone number correctly!';
               return 1
          }else if(!hasNumber(value)){
              document.getElementById('phonenumberstatus').innerHTML ='X Please enter your phone number correctly!';
              return 1
          } else {
              document.getElementById('phonenumberstatus').innerHTML ='X Please enter your phone number correctly!';
              return 1
          }
      } else {
          if(value.indexOf(' ')>=0 && !hasNumber(value)) {
              document.getElementById('phonenumberstatus').innerHTML ='X Wrong phone number format!';
              return 1
          } else if(value.indexOf(' ')>=0) {
               alert("Phonenumber must not contain whitespaces")
              document.getElementById('phonenumberstatus').innerHTML ='X Wrong phone number format!';
               return 1
          }else if(!hasNumber(value)){
              document.getElementById('phonenumberstatus').innerHTML ='X Wrong phone number format1';
              return 1
          } else {
              document.getElementById('phonenumberstatus').innerHTML ='';
              return 0
          }
      }
  }
  function hasNumber(myString) {
    console.log(/^[0-9]+$/.test(myString));
    return /^[0-9]+$/.test(myString);
}

