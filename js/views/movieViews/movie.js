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
        initialize:function(noSeason,noEpisode){
            this.model = new MovieTrailerModel();


        },
        render: function(parent,request,callback) {
            var self = this;
            this.movieCollection = new MovieCollection(request);
            this.movieCollection.fetch().done(function(){
                parent.model.movies =  _.extend(self.movieCollection.toJSON());


                self.movieCollection = new MovieCollection(parent.model.movies.collectionId);
                self.movieCollection.fetch().done(function(){

                    var request = parent.model.movies.trackName;
                    self.movieTrailerModel = new MovieTrailerModel(request);
                    self.movieTrailerModel.fetch().done(function() {
                        parent.model = _.extend(parent.model,self.movieTrailerModel.toJSON());
                        callback(parent);
                    });

                });
            });
        }
    });

    return MovieView;
});