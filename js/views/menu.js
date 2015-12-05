define([
    'jquery',
    'underscore',
    'backbone',
    'text!../../Templates/Menu.html'
], function($, _, Backbone, menuTemplate){
    var MenuView = Backbone.View.extend({
        el: $('#Menu_Element'),


        initialize: function(userProfile) {
            this.render(userProfile);
        },

        render: function(userProfile) {
            var compiledTemplate = _.template(menuTemplate);
            this.$el.html( compiledTemplate({user: userProfile}) );
        }
    });

    return MenuView;
});