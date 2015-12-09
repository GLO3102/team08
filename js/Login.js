$(document).ready(function() {

    var loginEndpoint = "/login";

    $("#okButton").click(function(){
        ResetWarnings();
        var email = getEmail();
        var password = getPassword();

        if(validateEmail(email) && !isNullOrEmpty(password)) {
            login(email, password);
        }
    });

    $("#signupButton").click(function(){
        window.location.href = './SignUp.html';
    });



    var login = function(email, password){
        var postData = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);

        $.ajax({
            type: "POST",
            url: ServerUrl + loginEndpoint,
            data: postData,
            success: authorizeSuccess,
            error: authorizeFailure,
            contentType: "application/x-www-form-urlencoded"
        });
    };

    var authorizeSuccess = function(data, status) {
        document.cookie="umovie_access_token=" + data.token + "; expires=Thu, 29 Dec 2016 00:00:00 UTC";
        window.location.href = './index.html';
    };

    var authorizeFailure = function(data, status){
        document.getElementById("errorWarning").style.display="inline-block";
        document.getElementById("errorWarningMessage").style.display="inline-block".textContent=status.message;
    };

    var ResetWarnings = function() {
        document.getElementById("errorWarning").style.display="none";
        document.getElementById("emailWarning").style.display="none";
        document.getElementById("passwordWarning").style.display="none";
    };

    var getEmail = function() {
        var email =  getStringElement("emailInputBox", "emailWarning");
        if (!validateEmail(email)) {
            document.getElementById("emailWarning").style.display="inline-block";
        }

        return email;
    };

    var getPassword = function() {
        return getStringElement("passwordInputBox", "passwordWarning");
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
