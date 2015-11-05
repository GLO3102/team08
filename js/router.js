define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'views/watchlists',
    'views/actorViews/actorMain',
    'views/movie',
    'views/serieViews/serieMain'
], function($, _, Backbone, MenuView, WatchlistView,ActorMainView, MovieView, SerieView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'actor/' : 'searchActor',
            'actor/:name' : 'searchActorName',
            'movie/' : 'searchMovie',
            'movie/:name' : 'searchMovieName',
            'serie/' : 'searchSerie',
            'serie/:name' : 'searchSerieName',
            'serie/:name/:season' : 'searchSerieSeason',
            'serie/:name/:season/:episode' : 'searchSerieEpisode',
            '*actions': 'defaultAction'

        }
    });

    var initialize = function(){
        var app_router = new AppRouter;

        app_router.on('route:defaultAction', function (actions) {

            var menuView = new MenuView();
            menuView.render();

            var watchlistView = new WatchlistView();
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
            movieView.render('saw');
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
    return {
        initialize: initialize
    };
});