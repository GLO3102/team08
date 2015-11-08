urlServer = "192.168.0.101";

define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'views/menu',
    'models/menuModel',
], function($, _, Backbone, Router){
    var initialize = function() {
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});
