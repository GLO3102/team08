/**
 * Created by Kevin on 2015-10-30.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/actorModel',
    'models/actorImageModel',
    'text!../../templates/actor.html'
], function($, _, Backbone, ActorModel,ActorImageModel, ActorTemplate){
    var ActorView = Backbone.View.extend({
        el: $('#Page_Container'),
        initialize: function() {
            this.render();
        },

        render: function() {
            var self = this;
            this.modelActor = new ActorModel();
            this.modelActorImage = new ActorImageModel();
            this.modelActor.fetch().complete(function(){
                console.log("Actor : ",self.modelActor.toJSON());
                self.modelActorImage.fetch().complete(function(){
                    console.log("Image : ",self.modelActorImage.toJSON());
                    self.modelActor = _.extend(self.modelActor.toJSON(),{img:self.modelActorImage.toJSON().urlPhoto,bio:self.modelActorImage.toJSON().bio});
                    var compiledTemplate = _.template(ActorTemplate);
                    console.log("final : ",self.modelActor);
                    self.$el.html( compiledTemplate({actor:self.modelActor}) );
                });


            });

        }
    });

    return ActorView;
});