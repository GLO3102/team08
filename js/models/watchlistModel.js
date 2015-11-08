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
        urlRoot: 'http://' + urlServer + ':3000/unsecure/watchlists',

        save: function() {
            $.post(this.urlRoot, this.toJSON())
        },

        update: function(data, options) {
            $.ajax({
                url: this.urlRoot + '/' + data.id,
                type: 'PUT',
                data: JSON.stringify(data),
                success: options.success,
                contentType: "application/JSON; charset=utf-8"
            });
        },

        addMovie: function(postData) {
            var movies = this.get("movies");
            movies.push(postData);
            this.set("movies", movies);
            $.ajax({
                url: 'http://' + urlServer + ':3000/unsecure/watchlists/' + this.get("id") + '/movies',
                type: 'POST',
                data: postData
            });
        },


    });

    return WatchlistModel;
});