/**
 * Created by Kevin on 2015-11-02.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/actorMainModel',
    'views/actor',
    'text!../../templates/actor.html'
],function($,_,Backbone,ActorMainModel, Actor,ActorTemplate){
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
            self.compileTemplate(self)
        },
        compileTemplate:function(self){
            var compiledTemplate = _.template(ActorTemplate);
            console.log(self.model);
            self.$el.html( compiledTemplate(self.model) );
        }
    });

    return ActorMain;
});