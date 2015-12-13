define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../Templates/User.html'
], function($, _, Backbone, userTemplate){
    var UserView = Backbone.View.extend({
        el: $('#Page_Container'),
        userInfos: undefined,

        initialize: function(userProfile) {
            this.userInfos = userProfile;
            this.render();
        },

        render: function() {
            var compiledTemplate = _.template(userTemplate);
            this.$el.html( compiledTemplate({ 'user' : this.userInfos}) );
            this.initFriends();
        },

        events: {
            'click .followButton' : 'follow',
            'click .unfollowButton':'unfollow',
        },

        initFriends: function() {
            this.launchquery(ServerUrl + '/users', this.displayFriends, this.userFailure);
        },

        displayFriends: function(data, status) {

        },

        userFailure: function(data, status) {

        },

        unfollow:function(){
            var id = $(event.currentTarget).attr('value');


            var uri = ServerUrl + '/follow/'+ id;
            $.ajax({
                type: "DELETE",
                url: uri,
                success: function()
                {    $(element).removeClass('unfollowButton').addClass('followButton').text('Follow')
                    alert("succes unfollow" + id );
                },
                statusCode: {
                    401: this.redirect
                },
                failure: function()
                {
                    alert("echec unfollow" + id );
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization',  getCookie());

                }

            });
        },

        follow: function(event){
            // alert($(event.currentTarget).attr('value'));
            var id = $(event.currentTarget).attr('value');
            var element =  event.currentTarget;
            var postData = {id: id };
            var uri = ServerUrl + '/follow';
            $.ajax({
                type: "POST",
                url: uri,
                data: postData,
                success: function(data, status)
                {   $(element).removeClass('followButton').addClass('unfollowButton').text('UnFollow');
                    alert("succes follow "+ id );

                },

                statusCode: {
                    401: this.redirect
                },
                failure: function(data, status)
                {
                    alert("follow " + id + " failed" );
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization',  getCookie());

                }

            });

        },

        launchquery: function(uri, token, onSuccess, onFailure) {
            $.ajax({
                type: "GET",
                url: uri,
                success: onSuccess,
                statusCode: {
                    401: this.redirect
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
