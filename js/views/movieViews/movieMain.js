/**
 * Created by Christine on 2015-10-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    '../../models/MovieModels/movieMainModel',
    'views/movieViews/movie',
    'text!../../../Templates/movie.html'
],function($,_,Backbone,MovieMainModel, MovieView,MovieTemplate){

    var MovieMain = Backbone.View.extend({
        el: $('#Page_Container'),
        initialize: function() {
            this.model = new MovieMainModel();
        },
        render: function(request) {
            this.renderMovie(this,request);
        },
        renderMovie: function(self,request){
            var movie = new MovieView();
            movie.render(self,request,self.compileTemplate);
        },

        compileTemplate:function(self){
            var compiledTemplate = _.template(MovieTemplate);
            self.$el.html( compiledTemplate({movie:self.model}) );
        }
    });

    return MovieMain;
});