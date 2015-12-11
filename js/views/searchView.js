define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../Templates/Search.html',
    'text!../../Templates/MoviesSearchResults.html',
    'text!../../Templates/SeriesSearchResults.html',
    'text!../../Templates/ActorsSearchResults.html',
    'text!../../Templates/UsersSearchResults.html',
    'text!../../Templates/NoResults.html',
    'text!../../Templates/DropdownTemplate.html'
], function($, _, Backbone, searchTemplate, MoviesTemplate, SeriesTemplate, ActorsTemplate, UsersTemplate, NoResultsTemplate, DropDownTemplate){
    var SearchView = Backbone.View.extend({
        el: $('#Page_Container'),

        initialize: function() {
            this.render();
        },

        render: function() {
            var compiledTemplate = _.template(searchTemplate);
            this.$el.html( compiledTemplate({}) );

            this.initializeGenreLists();
        },

        events: {
            'click #searchbutton' : 'search'
        },

        initializeGenreLists: function() {
            this.launchquery(ServerUrl + '/genres/movies',
                             getCookie(),
                             this.displayMovieGenres,
                             this.failureGenres);
            this.launchquery(ServerUrl + '/genres/tvshows',
                             getCookie(),
                             this.displaySerieGenres,
                             this.failureGenres);
        },

        getSearchBoxContent: function() {
            var searchBox = document.getElementById("searchbox");
            return searchBox.value;
        },

        search: function() {
            var query = this.getSearchBoxContent();

            var query = encodeURIComponent(query);
            this.Reset();
            this.searchMovies(query, getCookie());
            this.searchSeries(query, getCookie());
            this.searchActors(query, getCookie());
            this.searchUsers(query, getCookie());
        },

        Reset: function() {
            document.getElementById('MoviesResultsPlaceholder').innerHTML = "";
            document.getElementById('SeriesResultsPlaceholder').innerHTML = "";
            document.getElementById('ActorsResultsPlaceholder').innerHTML = "";
            document.getElementById('UsersResultsPlaceholder').innerHTML = "";
        },

        searchMovies: function(query, token) {
            var query = ServerUrl + '/search/movies?limit=5&q=' + query;
            var movieGenresDropdown = document.getElementById("MoviesGenres").firstChild;
            if (movieGenresDropdown !== undefined) {
                var selectedId = movieGenresDropdown.options[movieGenresDropdown.selectedIndex].value;
                if (selectedId !== "all" && selectedId !== undefined && selectedId !== '') {
                    query += '&genre=' + selectedId;
                }
            }

            if (this.canQuery("MoviesCheckBox")) {
                this.launchquery(query,
                                 token,
                                 this.displayMovies,
                                 this.failureMovies);
            }
        },

        searchSeries: function(query, token) {
            var query = ServerUrl + '/search/movies?limit=5&q=' + query;
            var serieGenresDropdown = document.getElementById("SeriesGenres").firstChild;
            if (serieGenresDropdown !== undefined) {
                var selectedId = serieGenresDropdown.options[serieGenresDropdown.selectedIndex].value;
                if (selectedId !== "all" && selectedId !== undefined && selectedId !== '') {
                    query += '&genre=' + selectedId;
                }
            }
            if (this.canQuery("SeriesCheckBox")) {
                this.launchquery(ServerUrl + '/search/tvshows/seasons?limit=5&q=' + query,
                                token,
                                this.displaySeries,
                                this.failureSeries);
            }
        },

        searchActors: function(query, token) {
            if (this.canQuery("ActorsCheckBox")) {
                this.launchquery(ServerUrl + '/search/actors?q=' + query,
                                token,
                                this.displayActors,
                                this.failureActors);
            }
        },

        searchUsers: function(query, token) {
            if (this.canQuery("UsersCheckBox")) {
                this.launchquery(ServerUrl + '/search/users?q=' + query,
                                token,
                                this.displayUsers,
                                this.failureUsers);
            }
        },

        canQuery: function(controlId) {
            var checkbox = document.getElementById(controlId);
            return checkbox.checked;
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
        },

        displayMovieGenres: function(data, status) {
            var compiledTemplate = _.template(DropDownTemplate);
            $('#MoviesGenres').html(compiledTemplate({genres: data}));
        },

        displaySerieGenres: function(data, status) {
            var compiledTemplate = _.template(DropDownTemplate);
            $('#SeriesGenres').html(compiledTemplate({genres: data}));
        },

        displayMovies: function(data, status) {
            if (data.resultCount === 0) {
                var template = _.template(NoResultsTemplate);
                document.getElementById('MoviesResultsPlaceholder').innerHTML = template({ data : "Movies", errorMessage: "No Results" });
            } else {
                var compiledTemplate = _.template(MoviesTemplate);
                $('#MoviesResultsPlaceholder').html(compiledTemplate({movies: data.results}));
            }
        },

        displaySeries: function(data, status) {
            if (data.resultCount === 0) {
                var template = _.template(NoResultsTemplate);
                document.getElementById('SeriesResultsPlaceholder').innerHTML = template({ data : "Series", errorMessage: "No Results" });
            } else {
                var compiledTemplate = _.template(SeriesTemplate);
                console.log(data.results);
                $('#SeriesResultsPlaceholder').html(compiledTemplate({series: data.results}));
            }
        },

        displayActors: function(data, status) {
            if (data.resultCount === 0) {
                var template = _.template(NoResultsTemplate);
                document.getElementById('ActorsResultsPlaceholder').innerHTML = template({ data : "Actors", errorMessage: "No Results" });
            } else {
                var compiledTemplate = _.template(ActorsTemplate);
                $('#ActorsResultsPlaceholder').html(compiledTemplate({actors: data.results}));
            }
        },

        displayUsers: function(data, status) {
            if (data.length === 0) {
                var template = _.template(NoResultsTemplate);
                document.getElementById('UsersResultsPlaceholder').innerHTML = template({ data : "Users", errorMessage: "No Results" });
            } else {
                var compiledTemplate = _.template(UsersTemplate);
                $('#UsersResultsPlaceholder').html(compiledTemplate({users: data}));
            }
        },

        failureMovies: function(data, status) {
            var message;
            if(status.statusCode >=400 || status.statusCode <= 499)
                message= "Erreur client";
            if(status.statusCode >=500 || status.statusCode <= 520)
                message= "Erreur serveur";
            var template = _.template(NoResultsTemplate);
            document.getElementById('MoviesResultsPlaceholder').innerHTML = template({ data : "Movies", errorMessage:message });
        },

        failureSeries: function(data, status) {
            var message;
            if(status.statusCode >=400 || status.statusCode <= 499)
                message= "Erreur client";
            if(status.statusCode >=500 || status.statusCode <= 520)
                message= "Erreur serveur";
            var template = _.template(NoResultsTemplate);
            document.getElementById('SeriesResultsPlaceholder').innerHTML = template({ data : "Movies", errorMessage: message });
        },

        failureActors: function(data, status) {
            var message;
            if(status.statusCode >=400 || status.statusCode <= 499)
                message= "Erreur client";
            if(status.statusCode >=500 || status.statusCode <= 520)
                message= "Erreur serveur";
            var template = _.template(NoResultsTemplate);
            document.getElementById('ActorsResultsPlaceholder').innerHTML = template({ data : "Movies", errorMessage: message });

        },

        failureUsers: function(data, status) {
            var message;
            if(status.statusCode >=400 || status.statusCode <= 499)
                message= "Erreur client";
            if(status.statusCode >=500 || status.statusCode <= 520)
                message= "Erreur serveur";
            var template = _.template(NoResultsTemplate);
            document.getElementById('UsersResultsPlaceholder').innerHTML = template({ data : "Movies", errorMessage: message });

        },

        failureGenres: function() {

        }
    });

    return SearchView;
});