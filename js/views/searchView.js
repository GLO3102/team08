define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../Templates/Search.html',
    'text!../../Templates/MoviesSearchResults.html'
], function($, _, Backbone, searchTemplate, MoviesTemplate){
    var SearchView = Backbone.View.extend({
        el: $('#Page_Container'),

        initialize: function() {
            this.render();
        },

        render: function() {
            var compiledTemplate = _.template(searchTemplate);
            this.$el.html( compiledTemplate({}) );
        },

        events: {
            'click #searchbutton' : 'search'
        },

        getSearchBoxContent: function() {
            var searchBox = document.getElementById("searchbox");
            return searchBox.value;
        },

        search: function() {
            var query = this.getSearchBoxContent();

            var query = encodeURIComponent(query);
            var token = this.getCookie('umovie_access_token');
            this.searchMovies(query, token);
        },

        searchMovies: function(query, token) {
            $.ajax({
                type: "GET",
                url: ServerUrl + '/search/movies?limit=5&q=' + query,
                success: this.displayMovies,
                statusCode: {
                    401: this.redirect
                },
                failure: this.failureMovies,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            });
        },

        redirect: function() {
            window.location.href = "./Login.html";
        },

        displayMovies: function(data, status) {
            var compiledTemplate = _.template(MoviesTemplate);
            $('#MoviesResultsPlaceholder').html( compiledTemplate({ movies : data.results }) );
        },

        failureMovies: function(data, status) {

        },

        getCookie: function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
        }
    });

    return SearchView;
});