/**
 * Created by khrysiale on 15-11-06.
 */


define([
    '../../jquery',
    'underscore',
    'backbone',
    'collections/movieCollection',
    'models/MovieModels/movieTrailerModel',
    'models/watchlistModel'

],function($, _, Backbone, MovieCollection,MovieTrailerModel,MovieAddWatchlist){
    var MovieView = Backbone.View.extend({

        events:{
            'click .add-watchlist-button': 'addMovie'
        },

        render: function(parent,request,callback) {
            var self = this;
            console.log(request);
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
        },

        addMovie: function(event){

            var movieId = $(event.currentTarget).data('id');

            console.log(movieId);
        }





    });

    return MovieView;
});