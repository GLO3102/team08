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
            var collection = response.results;
            console.log("Movie",collection);
            var serieName = collection[0].artistName;
            var newCollection = [];
            _.each(collection,function(item){
                if(item.artistName == serieName)
                {
                    var img_url = item.artworkUrl100;
                    item.artworkUrl400 = img_url.replace('100x100bb','400x400bb');
                    newCollection.push(item);
                }
            });
            return _.sortBy(newCollection,'collectionId');
        }
    });

    return movieCollection;
});