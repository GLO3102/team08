define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var WatchlistModel = Backbone.Model.extend({
        defaults: {
            name: "myWatchlist",
            owner: "seb@gmail.com",
            movies: []
        },
        urlRoot: 'http://localhost:3000/unsecure/watchlists',

        save: function() {
            $.post(this.urlRoot, this.toJSON())
        }
    });

    return WatchlistModel;
});