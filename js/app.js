urlServer = ServerUrl;

define([
    'jquery',
    'underscore',
    'backbone',
    'router',
], function($, _, Backbone, Router){
    var initialize = function() {
        change();
    };

    var change = function() {
        var token = getCookie("umovie_access_token");
        GetTokenInfo(token);
    };

    var GetTokenInfo = function(token) {
        if(token === undefined || token === "") {
            window.location.href = "./Login.html";
        } else {
            $.ajax({
                type: "GET",
                url: ServerUrl + "/tokenInfo",
                success: setProfile,
                statusCode: {
                    401: redirect
                },
                failure: redirect,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            });
        }
    };

    var redirect = function() {
        window.location.href = "./Login.html";
    };

    var setProfile = function(data) {
        data.profileImage = "http://www.gravatar.com/avatar/" + CryptoJS.MD5(data.email.trim().toLowerCase()).toString() ;;
        console.log(data);
        Router.initialize(data);
    };

    var getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    };

    return {
        initialize: initialize
    };
});
