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
        idAttribute: "id",
        urlRoot: 'http://localhost:3000/unsecure/watchlists',

        save: function() {
            $.post(this.urlRoot, this.toJSON())
        },

        update: function(data, options) {
            $.ajax({
                url: this.urlRoot + '/' + data.id,
                type: 'PUT',
                data: data,
                success: options.success
            });
        }
    });

    return WatchlistModel;
});