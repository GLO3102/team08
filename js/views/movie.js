/**
 * Created by Christine on 2015-10-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/movieModel',
    'text!../../templates/movie.html'
], function($, _, Backbone, MovieModel,MovieTemplate){
    var MovieView = Backbone.View.extend({
        el: $('#Page_Container'),
        initialize: function() {
            this.render();
        },

        render: function() {
            var self = this;
            this.modelMovie = new MovieModel();

            this.modelMovie.fetch().complete(function(){
                self.modelMovie = _.extend(self.modelMovie.toJSON());
                var compiledTemplate = _.template(MovieTemplate);
                console.log(self.modelMovie);
                self.$el.html( compiledTemplate({movie:self.modelMovie})) ;

            });

        }
    });

    return MovieView;
});;