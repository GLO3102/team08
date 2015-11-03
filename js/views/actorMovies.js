/**
 * Created by Kevin on 2015-11-02.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/actorMoviesCollection'
], function($, _, Backbone,ActorMoviesCollection){
    var ActorMovies = Backbone.View.extend({
        render: function(parent,request,callback) {
            var self = this;
            this.collection = new ActorMoviesCollection(request);
            this.collection.fetch({success : function(){
                console.log("collection",self.collection.toJSON());
                parent.model.movies = self.collection.toJSON();
                callback(parent);
            }});


        }
    });

    return ActorMovies;
});