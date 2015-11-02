define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'views/watchlists',
    'views/actorMain'
], function($, _, Backbone, MenuView, WatchlistView,ActorMainView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'actor/' : 'searchActor',
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
            actorMainView.render("Brad Pitt");
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});