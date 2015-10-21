define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu',
    'models/menuModel'
], function($, _, Backbone, MenuView){
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
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});