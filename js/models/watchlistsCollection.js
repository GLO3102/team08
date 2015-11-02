define([
    'underscore',
    'backbone',
    'models/watchlistModel'
], function(_, Backbone, WatchlistModel){
    var WatchlistCollection = Backbone.Collection.extend({
        model: WatchlistModel,
        url: 'http://localhost:3000/unsecure/watchlists'
    });

    return WatchlistCollection;
});