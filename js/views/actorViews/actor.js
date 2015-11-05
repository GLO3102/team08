/**
 * Created by Kevin on 2015-10-30.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/actorModels/actorModel',
    'models/actorModels/actorImageModel'
], function($, _, Backbone, ActorModel,ActorImageModel){
    var ActorView = Backbone.View.extend({
        initialize: function() {
        },
        render: function(parent,request,callback) {
            var self = this;
            this.modelActor = new ActorModel(request);
            this.modelActorImage = new ActorImageModel(request);
            this.modelActor.fetch().complete(function(){
                self.modelActorImage.fetch().complete(function(){
                    self.modelActor = _.extend(self.modelActor.toJSON(),{img:self.modelActorImage.toJSON().urlPhoto,bio:self.modelActorImage.toJSON().bio});
                    parent.model.actor = self.modelActor;
                    console.log("model",self.modelActor);
                    if(self.modelActor.artistName !== undefined)
                    {
                        parent.model.fail = false;
                        callback(parent,self.modelActor.artistId);
                    }
                    else{
                        parent.model.fail = true;
                        parent.compileTemplate(parent);
                    }

                });
            });
        }
    });

    return ActorView;
});