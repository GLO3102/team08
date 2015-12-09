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
                url:  urlServer + '/watchlists',
                type: 'GET',
                contentType: "application/JSON; charset=utf-8",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', getCookie());
                }
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
            var watchListId = undefined;

            var selectElement = document.getElementById("watchListIds");
            var selectedOption = selectElement.options[ selectElement.selectedIndex ];
            if (selectedOption !== undefined) {
                watchListId = selectedOption.value;
            }

            console.log(movie);
            if (watchListId !== undefined) {
                $.ajax({
                    type: "POST",
                    url: urlServer + '/watchlists/' + watchListId + '/movies',
                    data: movie,
                    success: function () {
                        $('#message').html(currentElement + ' was added to watchlist');
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', getCookie());
                    }
                });
            }
        },
    });


    return MovieMain;
});