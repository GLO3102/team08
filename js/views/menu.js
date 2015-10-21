define([
    'jquery',
    'underscore',
    'backbone',
    'models/menuModel',
    'text!../../templates/menu.html'
], function($, _, Backbone, MenuModel, menuTemplate){
    var MenuView = Backbone.View.extend({
        el: $('#Menu_Element'),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.model = new MenuModel({ name: "John Smith"});
            var compiledTemplate = _.template(menuTemplate);
            this.$el.html( compiledTemplate(this.model.toJSON()) );
        }
    });

    return MenuView;
});