/**
 * Created by Kevin on 2015-11-02.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/actorModels/actorMainModel',
    'views/actorViews/actor',
    'views/actorViews/actorMovies',
    'text!../../../templates/actor.html'
],function($,_,Backbone,ActorMainModel, Actor,ActorMovies,ActorTemplate){
    var ActorMain = Backbone.View.extend({
        el: $('#Page_Container'),
        initialize: function() {
            this.model = new ActorMainModel();
        },
        render: function(request) {
            this.renderActor(this,request);
        },
        renderActor: function(self,request){
            var actor = new Actor();
            actor.render(self,request,self.renderActorMovies);
        },
        renderActorMovies: function(self,request){
            var actorMovies = new ActorMovies();
            actorMovies.render(self,request,self.compileTemplate);
        },
        compileTemplate:function(self){
            var compiledTemplate = _.template(ActorTemplate);
            self.$el.html( compiledTemplate(self.model) );
        }
    });

    return ActorMain;
});