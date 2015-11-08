/**
 * Created by khrysiale on 15-11-06.
 */

define([
    '../../jquery',
    'underscore',
    'backbone',
    'collections/movieCollection',
    'models/MovieModels/movieTrailerModel'
],function($, _, Backbone, MovieCollection,MovieTrailerModel){
    var MovieView = Backbone.View.extend({

        render: function(parent,request,callback) {
            var self = this;

            this.movieCollection = new MovieCollection(request);
            this.movieCollection.fetch().done(function(){
                parent.model.movies =  _.extend(self.movieCollection.toJSON());
                self.movieCollection.fetch().done(function(){
                    self.movieTrailerModel = new MovieTrailerModel(request);
                    self.movieTrailerModel.fetch().done(function() {
                        parent.model = _.extend(parent.model,{urlTrailerMovie:self.movieTrailerModel.toJSON().urlTrailerMovie});
                        callback(parent);
                    });

                });
            });
        }
    });

    return MovieView;
});