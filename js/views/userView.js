define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../Templates/User.html'
], function($, _, Backbone, userTemplate){
    var UserView = Backbone.View.extend({
        el: $('#Page_Container'),
        userProfile: undefined,

        initialize: function(current, userProfile) {
            this.userProfile = current;
            this.render(userProfile);
        },

        render: function(userProfile) {
            this.initUser(userProfile);
        },

        events: {
            'click #followButton' : 'followButtonClick'
        },

        initUser: function(userProfile) {
            this.launchquery(ServerUrl + '/users/' + userProfile.id, getCookie(), this.displayUser, this.userFailure);
        },

        displayUser: function(data, status) {
            var compiledTemplate = _.template(userTemplate);
            document.getElementById('Page_Container').innerHTML = compiledTemplate({ 'user' : data});
        },

        userFailure: function(data, status) {
        },

        followButtonClick:function(ev){
            var id = $(ev.currentTarget).data('id');
            var method = 'POST';
            var uri = ServerUrl + '/follow'
            if (ev.currentTarget.innerText === 'unfollow') {
                method = 'DELETE';
                uri = uri + '/' + id;
            }
            var _this = this;
            $.ajax({
                type: method,
                url: uri,
                success: function() {
                    _this.toggleButton();
                },
                statusCode: {
                    401: this.redirect
                },
                failure: function() {
                    alert("echec toggle" + id );
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization',  getCookie());
                }

            });
        },

        toggleButton: function() {
            var button = document.getElementById('followButton');
            if (button.innerText === 'follow') {
                button.innerText = 'unfollow';
            } else {
                button.innerText = 'follow';
            }
        },

        launchquery: function(uri, token, onSuccess, onFailure) {
            $.ajax({
                type: "GET",
                url: uri,
                success: onSuccess,
                statusCode: {
                    401: this.redirect,
                    304: onSuccess
                },
                failure: onFailure,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            });
        },

        redirect: function() {
            window.location.href = "./Login.html";
        }
    });

    return UserView;
});
