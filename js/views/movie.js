/**
 * Created by Christine on 2015-10-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/movieModel',
    'models/moviePreviewModel',
    'text!../../templates/movie.html'
], function($, _, Backbone, MovieModel,MoviePreviewModel,MovieTemplate){
    var MovieView = Backbone.View.extend({
        el: $('#Page_Container'),
        initialize: function () {
        },

        render: function (parent, request, callback) {
            var self = this;
            this.modelMovie = new MovieModel(request);
            this.modelPreviewMovie = new MoviePreviewModel(request);
            console.log(this.modelPreviewMovie);
            this.modelMovie.fetch().complete(function () {
                self.modelPreviewMovie.fetch().complete(function () {
                    self.modelMovie = _.extend(self.modelMovie.toJSON(), {preview: self.modelPreviewMovie.toJSON()});
                    parent.model.movie = self.modelMovie;
                    parent.complileTemplate(parent);
                });

            });

        },
    });

    return MovieView;
});

