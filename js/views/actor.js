/**
 * Created by Kevin on 2015-10-30.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'models/actorModel',
    'text!../../templates/actor.html'
], function($, _, Backbone, ActorModel, ActorTemplate){
    var ActorView = Backbone.View.extend({
        el: $('#Page_Container'),

        initialize: function() {
            this.render();
        },

        render: function() {
            var compiledTemplate = _.template(ActorTemplate);
            this.$el.html( compiledTemplate );
        }
    });

    return ActorView;
});