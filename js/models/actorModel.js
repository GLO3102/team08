/**
 * Created by Kevin on 2015-10-30.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var ActorModel = Backbone.Model.extend({
        defaults: {
            name: "",
            genre: "",
            imgUrl: ""
        }
    });

    return ActorModel;
});