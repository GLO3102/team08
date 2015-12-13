define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'views/watchlists',
    'views/searchView',
    'views/actorViews/actorMain',
    'views/movieViews/movieMain',
    'views/serieViews/serieMain',
    'views/userView'
], function($, _, Backbone, MenuView, WatchlistView, SearchView, ActorMainView, MovieView, SerieView, UserView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'user/:id': 'userPage',
            'search/': 'searchPage',
            'search': 'searchPage',
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
            return Backbone.Router.prototype.route.call(this, route, name, callback);
        }
    });

    var initialize = function(userProfile){
        var app_router = new AppRouter;
        var serieView = new  SerieView();
        app_router.on('route:defaultAction', function (actions) {
            var menuView = new MenuView(userProfile);

            var watchlistView = new WatchlistView(userProfile);
        });

        app_router.on('route:userPage', function (id) {

            var menuView = new MenuView(userProfile);

            var userView = new UserView({ 'id' : id});
        });

        app_router.on('route:searchPage', function () {

            var menuView = new MenuView(userProfile);

            var searchView = new SearchView(userProfile);
        });

        app_router.on('route:searchActor', function () {
            var menuView = new MenuView(userProfile);

            var actorMainView = new ActorMainView();
            actorMainView.render("Matt Damon");
        });

        app_router.on('route:searchActorName', function (name) {
            var menuView = new MenuView(userProfile);

            var actorMainView = new ActorMainView();
            actorMainView.render(name);
        });

        app_router.on('route:searchMovie', function(){
            var menuView = new MenuView(userProfile);

            var movieView = new MovieView();
            movieView.render('spectre');
        });

        app_router.on('route:searchMovieName', function(name){
            var menuView = new MenuView(userProfile);

            var movieView = new MovieView();
            movieView.render(name);
        });

        app_router.on('route:searchSerie', function(){
            var menuView = new MenuView(userProfile);

            serieView.renderSerie('thewalkingdead');
        });

        app_router.on('route:searchSerieName', function(name){
            var menuView = new MenuView(userProfile);

            serieView.renderSerie(name);
        });

        app_router.on('route:searchSerieSeason', function(name,noSeason){
            var menuView = new MenuView(userProfile);

            serieView.renderSeason(name,noSeason);
        });

        app_router.on('route:searchSerieEpisode', function(name,noSeason,noEpisode){
            var menuView = new MenuView(userProfile);

            serieView.renderEpisode(name,noSeason,noEpisode);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});