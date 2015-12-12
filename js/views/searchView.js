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
    'text!../../Templates/DropdownTemplate.html',
    'text!../../Templates/WatchlistDropDownTemplate.html',
    'typeahead',
    'bloodhound'
], function($, _, Backbone, searchTemplate, MoviesTemplate, SeriesTemplate, ActorsTemplate, UsersTemplate, NoResultsTemplate, DropDownTemplate, WatchlistDropdown){
    var SearchView = Backbone.View.extend({
        el: $('#Page_Container'),
        userInfos: undefined,

        initialize: function(userProfile) {
            this.userInfos = userProfile;
            this.render();
        },

        render: function() {
            var compiledTemplate = _.template(searchTemplate);
            this.$el.html( compiledTemplate({}) );

            this.initializeGenreLists();
            this.initializeWatchlists();
            this.initAutocomplete();
            this.firstLoadQuery();
        },

        events: {
            'click #searchbutton' : 'search',
            'click #followButton' : 'follow',
            'click .add-watchlist': 'addMovieToWatchList'
        },

        firstLoadQuery: function() {
            var queryParam = this.getParameterByName("q");
            if (queryParam !== undefined && queryParam !== ""){
                this.setSearchBoxContent(queryParam);
            }
            this.search();
        },

        follow: function(event){
            //  alert($(event.currentTarget).attr('value'));
            var id = $(event.currentTarget).attr('value');
            var postData = {id: id };
            var uri = ServerUrl + '/follow';
            $.ajax({
                type: "POST",
                url: uri,
                data: postData,
                success: function()
                {
                    alert("succes follow" + id );
                },
                contentType: "application/json",
                statusCode: {

                },
                failure: function()
                {
                    alert("echec follow" + id );
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization',  getCookie());

                }

            });

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

        initializeWatchlists: function() {
            var _this = this;
            $.ajax({
                type: "GET",
                url: ServerUrl + '/watchlists',
                success: function(data, status) {
                    _this.displayWatchlists(data, status);
                },
                statusCode: {
                    401: this.redirect,
                    304: function(data, status) {
                        _this.displayWatchlists(data, status);
                    }
                },
                failure: this.failureGenres,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', getCookie());
                }
            });
        },

        initAutocomplete : function() {
            $('#searchbox').typeahead({
                    hint: true,
                    hightlight: true,
                    minLength: 1
                },
                {
                    name: 'states',
                    source: function (query, processSync, processAsync) {
                        SearchView.prototype.onUserType(query, processAsync);
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
                        processAsync(SearchView.prototype.sortSearchResults(data.results))
                    },
                    SearchView.prototype.searchFailure)
            }
        },

        searchFailure: function() {
        },

        sortSearchResults : function(results) {
            return results.map(function(track) {
                return track.artistName;
            });
        },

        getSearchBoxContent: function() {
            var searchBox = document.getElementById("searchbox");
            return searchBox.value;
        },

        setSearchBoxContent: function(q) {
            var searchBox = document.getElementById("searchbox");
            searchBox.value = q;
        },

        follow: function(){
            
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
            if (movieGenresDropdown !== undefined && movieGenresDropdown !== null) {
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
            if (serieGenresDropdown !== undefined && serieGenresDropdown !== null) {
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

        displayWatchlists: function(data, status) {
            _this = this;
            var userWatchlists = data.filter(function(watchlist) {
                return watchlist.owner !== undefined && watchlist.owner.id === _this.userInfos.id;
            });
            var compiledTemplate = _.template(WatchlistDropdown);
            $('#watchlistsNames').html(compiledTemplate({genres: userWatchlists}));
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

        },

        addMovieToWatchList : function(event) {
            var currentElement = $(event.currentTarget).data('id');

            this.launchquery(ServerUrl + '/movies/' + currentElement,
                             getCookie(),
                             this.addtowatchlist,
                             this.watchlisterror);
        },

        addtowatchlist: function(data, status) {
            var watchListId = undefined;
            var selectElement = document.getElementById("watchlistsNames").firstChild;
            if (selectElement.selectedIndex !== undefined) {
                var selectedOption = selectElement.options[ selectElement.selectedIndex ];
                watchListId = selectedOption.value;
            } else {
                alert("No watchlist exists!")
            }

            if (watchListId !== undefined) {
                $.ajax({
                    type: "POST",
                    url: urlServer + '/watchlists/' + watchListId + '/movies',
                    data: data.results[0],
                    success: function () {
                        alert('Add to watchlist was successfull');
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', getCookie());
                    }
                });
            }
        },

        watchlisterror: function() {
            alert('an error occured while adding movie to watchlist')
        },

        getEncodedQuery: function() {
            var searchBox = document.getElementById("searchbox");
            var query = searchBox.value;
            if (!(query === "" || query === undefined)) {
                query = encodeURI(query);
            }

            return query;
        },

        getParameterByName: function(name) {
            var value = "";
            var params = this.getUrlVars();
            if (params[name] !== undefined) {
                value = params[name];
            }
            return value;
        },

        getUrlVars: function()
        {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
    });

    return SearchView;
});