define([
    'underscore',
    'backbone',
    'helper'
], function(_, Backbone){
    var WatchlistModel = Backbone.Model.extend({
        defaults: {
            name: "myWatchlist",
            owner: "seb@gmail.com",
            movies: []
        },
        idAttribute: "id",
        urlRoot: urlServer + '/watchlists',

        save: function() {
            $.post(this.urlRoot, this.toJSON())
        },

        update: function(data, options) {
            var token = getCookie();
            console.log(token);
            $.ajax({
                url: this.urlRoot + '/' + data.id,
                type: 'PUT',
                data: JSON.stringify(data),
                success: options.success,
                contentType: "application/JSON; charset=utf-8",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            });
        },

        addMovie: function(postData) {
            var token = getCookie();
            console.log(token);
            var movies = this.get("movies");
            movies.push(postData);
            this.set("movies", movies);
            $.ajax({
                url: this.urlRoot + '/' + this.get("id") + '/movies',
                type: 'POST',
                data: postData,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            });
        },


    });

    return WatchlistModel;
});