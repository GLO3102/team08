define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'views/watchlists',
    'views/actor',
    'views/movie'
], function($, _, Backbone, MenuView, WatchlistView,ActorView, MovieView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'actor/' : 'searchActor',
            'movie/' : 'searchMovie',
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

            new ActorView();
        });

        app_router.on('route:searchMovie', function(){
            var menuView = new MenuView();
            menuView.render();

            new MovieView();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});