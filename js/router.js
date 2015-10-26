define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'views/watchlists'
], function($, _, Backbone, MenuView, WatchlistView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){
        var app_router = new AppRouter;

        app_router.on('route:defaultAction', function (actions) {
            var menuView = new MenuView();
            menuView.render();

            var watchlistView = new WatchlistView();
            watchlistView.render();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});