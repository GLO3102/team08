define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'views/watchlists',
    'views/actorViews/actorMain',
    'views/movie'
], function($, _, Backbone, MenuView, WatchlistView,ActorMainView, MovieView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'actor/' : 'searchActor',
            'movie/' : 'searchMovie',
            'movie/:name' : 'searchMovieName',
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

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});