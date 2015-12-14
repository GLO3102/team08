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
        list :getWachtListCurrentUser(),
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
            console.log(self.list);
            console.log(self.model);
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

            console.log("Id watchlist ",watchListId);
            if (watchListId !== undefined) {
                $.ajax({
                    type: "GET",
                    url: urlServer + '/watchlists/' + watchListId,
                    success: function (list) {
                        console.log("list ",list);
                        if(!contains_movie_in_watchlist(list,movie)){
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
                        else
                            $('#message').html(currentElement + ' is already in the list.');
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('Authorization', getCookie());
                    }
                });
            }
        }
    });


    return MovieMain;
});