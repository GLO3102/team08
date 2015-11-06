/**
 * Created by khrysiale on 15-11-06.
 */
define([
    'underscore',
    'backbone',
    '../models/MovieModels/movieModel'
], function(_, Backbone, MovieModel){
    var movieCollection = Backbone.Collection.extend({
        model: MovieModel,
        initialize:function(request){
            this.request = request;

        },
        sync:function(method, collection, options){
            var self = this;
            var params = _.extend({
                url: 'http://'+urlServer+':3000/unsecure/search/movies?q='+self.request,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded"
            }, options);

            return $.ajax(params);
        },
        parse:function(response){
            return response.results[0];


        }
    });

    return movieCollection;
});