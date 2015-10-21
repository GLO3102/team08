define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var MenuModel = Backbone.Model.extend({
        defaults: {
            name: "John Smith"
        }
    });

    return MenuModel;
});