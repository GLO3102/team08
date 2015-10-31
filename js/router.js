define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'views/watchlists',
    'views/actor'
], function($, _, Backbone, MenuView, WatchlistView,ActorView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Default
            'actor/' : 'searchActor',
            '*actions': 'defaultAction'

        }
    });

    var initialize = function(){
        var app_router = new AppRouter;

        app_router.on('route:defaultAction', function (actions) {console.log("action");

            var menuView = new MenuView();
            menuView.render();

            var watchlistView = new WatchlistView();
        });

        app_router.on('route:searchActor', function () {console.log("action");
            var menuView = new MenuView();
            menuView.render();

            var actorView = new ActorView();
            actorView.render();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});