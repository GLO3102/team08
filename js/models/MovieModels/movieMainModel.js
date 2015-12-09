/**
 * Created by Christine on 2015-10-26.
 */
define([
    'underscore',
    '../../backbone'
], function(_, Backbone){
    var MovieMainModel = Backbone.Model.extend({

        addMovie: function(postData) {
            var token = getCookie();
            var movies = this.get("movies");
            movies.push(postData);
            this.set("movies", movies);
            $.ajax({
                url: urlServer + '/watchlists/' + this.get("id") + '/movies',
                type: 'POST',
                data: postData,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            });
        },
    });

    return MovieMainModel;
});