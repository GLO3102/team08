$(document).ready(function() {

    var signupEndpoint = "/signup";

    $("#okButton").click(function(){
        ResetWarnings();
        var email = getEmail();
        var username = getUsername();
        var password = getPassword();

        if(!isNullOrEmpty(username) && !isNullOrEmpty(password) && validateEmail(email)) {
            SignUp(username, password, email);
        }
    });

    var SignUp = function(username, password, email){
        var postData = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&email=' + encodeURIComponent(email);

        $.ajax({
            type: "POST",
            url: ServerUrl + signupEndpoint,
            data: postData,
            success: SignUpSuccess,
            error: SignUpFailure,
            contentType: "application/x-www-form-urlencoded"
        });
    };

    var SignUpSuccess = function(data, status){
        alert("Sign Up Successfull!!!");
        window.location.href = './login.html';
    };

    var SignUpFailure = function(data, status){
        document.getElementById("errorWarning").style.display="inline-block";
        var message;
        if(status.statusCode >=400 || status.statusCode <= 499)
        message= "Erreur client";
        if(status.statusCode >=500 || status.statusCode <= 520)
            message= "Erreur serveur";
        document.getElementById("errorWarningMessage").style.display="inline-block".textContent=message;
    };

    var ResetWarnings = function() {
        document.getElementById("errorWarning").style.display="none";
        document.getElementById("userNameWarning").style.display="none";
        document.getElementById("passwordWarning").style.display="none";
        document.getElementById("emailWarning").style.display="none";
    };

    var getUsername = function() {
        return getStringElement("usernameInputBox", "userNameWarning");;
    };

    var getPassword = function() {
        return getStringElement("passwordInputBox", "passwordWarning");
    };

    var getEmail = function() {
        var email =  getStringElement("emailInputBox", "emailWarning");
        if (!validateEmail(email)) {
            document.getElementById("emailWarning").style.display="inline-block";
        }

        return email;
    };

    var getStringElement = function(elementId, warningLiteralId) {
        var inputBox = document.getElementById(elementId);
        var str = inputBox.value;

        if(isNullOrEmpty(str)) {
            document.getElementById(warningLiteralId).style.display="inline-block";
        }

        return str;
    };

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return !isNullOrEmpty(email) && re.test(email);
    }

    var isNullOrEmpty = function(aString) {
        return aString === undefined || aString === "";
    };
});
