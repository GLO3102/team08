define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var WatchlistsModel = Backbone.Model.extend({
        defaults: {
            name: "John Smith"
        }
    });

    return WatchlistsModel;
});