define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../Templates/Menu.html',
    'typeahead',
    'bloodhound'
], function($, _, Backbone, menuTemplate){
    var MenuView = Backbone.View.extend({
        el: $('#Menu_Element'),

        initialize: function(userProfile) {
            this.render(userProfile);
        },

        render: function(userProfile) {
            var compiledTemplate = _.template(menuTemplate);
            this.$el.html( compiledTemplate({user: userProfile}) );
            $(document).ready(this.initAutocomplete);
        },

        events: {
            'click #menuSearchButton' : 'searchPageRedirect',
            'click .fa-power-off ' : 'LogOut'
        },

        LogOut: function (event) {
            var selectMenu = $(event.currentTarget).data('toggle'); //retourne une chaine vide
            console.log(selectMenu);
            if(selectMenu =="Log Out"){
                window.location.href = './Login.html';
            }

        },
        searchPageRedirect : function() {
            var query = this.getEncodedQuery();

            var newUrl = "./index.html#search";
            if (!(query === "" || query === undefined)) {
                query = encodeURI(query);
                newUrl += "?q=" + query;
            }

            window.location.href = newUrl;
        },

        initAutocomplete : function() {
            $('#menuSearchBar').typeahead({
                    hint: true,
                    hightlight: true,
                    minLength: 1
                },
                {
                    name: 'states',
                    source: function (query, processSync, processAsync) {
                        MenuView.prototype.onUserType(query, processAsync);
                    }
                }
            );
        },

        onUserType: function(query, processAsync) {
            var query = this.getEncodedQuery();
            var token = getCookie();

            if (!(query === "" || query === undefined)) {
                this.launchquery(ServerUrl + '/search?q=' + query,
                                 token,
                                 function(data) {
                                     processAsync(MenuView.prototype.sortSearchResults(data.results))
                                 },
                                 MenuView.prototype.searchFailure)
            }
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

        sortSearchResults : function(results) {
            return results.map(function(track) {
                return track.artistName;
            });
        },

        searchFailure: function() {

        },

        redirect: function() {
            window.location.href = "./Login.html";
        },

        getEncodedQuery: function() {
            var searchBox = document.getElementById("menuSearchBar");
            var query = searchBox.value;
            if (!(query === "" || query === undefined)) {
                query = encodeURI(query);
            }

            return query;
        }
    });

    return MenuView;
});