define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'views/watchlists',
    'views/searchView',
    'views/actorViews/actorMain',
    'views/movieViews/movieMain',
    'views/serieViews/serieMain'
], function($, _, Backbone, MenuView, WatchlistView, SearchView, ActorMainView, MovieView, SerieView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'search/': 'searchPage',
            'actor/' : 'searchActor',
            'actor/:name' : 'searchActorName',
            'movie/' : 'searchMovie',
            'movie/:name' : 'searchMovieName',
            'serie/' : 'searchSerie',
            'serie/:name' : 'searchSerieName',
            'serie/:name/:season' : 'searchSerieSeason',
            'serie/:name/:season/:episode' : 'searchSerieEpisode',
            '*actions': 'defaultAction'
        },

        route: function(route, name, callback) {
            change();
            return Backbone.Router.prototype.route.call(this, route, name, callback);
        }
    });

    var change = function() {
        var token = getCookie("umovie_access_token");
        if(token === undefined || token === "") {
            window.location.href = "./Login.html";
        }
    };

    var initialize = function(){
        var app_router = new AppRouter;
        app_router.bind( "all", change );

        app_router.on('route:defaultAction', function (actions) {

            var menuView = new MenuView();
            menuView.render();

            var watchlistView = new WatchlistView();
        });

        app_router.on('route:searchPage', function () {

            var menuView = new MenuView();
            menuView.render();

            var searchView = new SearchView();
        });

        app_router.on('route:searchActor', function () {
            var menuView = new MenuView();
            menuView.render();

            var actorMainView = new ActorMainView();
            actorMainView.render("Matt Damon");
        });

        app_router.on('route:searchActorName', function (name) {
            var menuView = new MenuView();
            menuView.render();

            var actorMainView = new ActorMainView();
            actorMainView.render(name);
        });

        app_router.on('route:searchMovie', function(){
            var menuView = new MenuView();
            menuView.render();

            var movieView = new MovieView();
            movieView.render('spectre');
        });

        app_router.on('route:searchMovieName', function(name){
            var menuView = new MenuView();
            menuView.render();

            var movieView = new MovieView();
            movieView.render(name);
        });

        app_router.on('route:searchSerie', function(){
            var menuView = new MenuView();
            menuView.render();

            var serieView = new  SerieView();
            serieView.renderSerie('thewalkingdead');
        });

        app_router.on('route:searchSerieName', function(name){
            var menuView = new MenuView();
            menuView.render();

            var serieView = new  SerieView();
            serieView.renderSerie(name);
        });

        app_router.on('route:searchSerieSeason', function(name,noSeason){
            var menuView = new MenuView();
            menuView.render(name);

            var serieView = new  SerieView();
            serieView.renderSeason(name,noSeason);
        });

        app_router.on('route:searchSerieEpisode', function(name,noSeason,noEpisode){
            var menuView = new MenuView();
            menuView.render(name);

            var serieView = new  SerieView();
            serieView.renderEpisode(name,noSeason,noEpisode);
        });

        Backbone.history.start();
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