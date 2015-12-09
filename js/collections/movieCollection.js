/**
 * Created by khrysiale on 15-11-06.
 */
define([
    'underscore',
    'backbone',
    '../models/MovieModels/movieModel',
    'helper'
], function(_, Backbone, MovieModel){
    var movieCollection = Backbone.Collection.extend({
        model: MovieModel,
        initialize:function(request){
            this.request = request;
            },
        sync:function(method, collection, options){
            var token = getCookie();
            var self = this;
            var params = _.extend({
                url: urlServer + '/search/movies?q=' + self.request,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            }, options);

            return $.ajax(params);
        },
        parse:function(response){
            return response.results;


        }
    });

    return movieCollection;
});