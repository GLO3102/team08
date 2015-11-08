/**
 * Created by Christine on 2015-10-26.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    '../../models/MovieModels/movieMainModel',
    'views/movieViews/movie',
    'text!../../../Templates/movie.html',

],function($,_,Backbone,MovieMainModel, MovieView,MovieTemplate){

    var MovieMain = Backbone.View.extend({

        events: {
            'click .add-watchlist-button': 'addMovieToWatchList'
        },
        el: $('#Page_Container'),

        list :$.ajax({
                url:  urlServer + '/unsecure/watchlists',
                type: 'GET',
                contentType: "application/JSON; charset=utf-8"
            }),

        initialize: function() {
            this.model = new MovieMainModel();
        },
        render: function(request) {
            this.renderMovie(this,request);
            ;
        },
        renderMovie: function(self,request){
            var movie = new MovieView();
            movie.render(self,request,self.compileTemplate);

        },

        compileTemplate:function(self){
            var compiledTemplate = _.template(MovieTemplate);

            self.$el.html( compiledTemplate({movie:self.model, watchlist: self.list}) );
        },

        addMovieToWatchList : function(event) {
            var currentElement = $(event.currentTarget).data('id');
            var movie = this.model.movies[0] ;

            var selectElement = document.getElementById("watchListIds");
            var watchListId = selectElement.options[ selectElement.selectedIndex ].value;
            console.log(movie);
            $.ajax({
                type: "POST",
                url: urlServer + '/unsecure/watchlists/' + watchListId + '/movies',
                data: movie,
                success: function(){
                    $('#message').html(currentElement + ' was added to watchlist');
                }
            });

            },

            });


    return MovieMain;
});