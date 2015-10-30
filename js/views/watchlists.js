define([
    'jquery',
    'underscore',
    'backbone',
    'models/watchlistsModel',
    'text!../../templates/watchlists.html'
], function($, _, Backbone, WatchListsModel, watchlistsTemplate){
    var WatchListsView = Backbone.View.extend({
        el: $('#Page_Container'),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.model = new WatchListsModel({});
            var compiledTemplate = _.template(watchlistsTemplate);
            this.$el.html( compiledTemplate(this.model.toJSON()) );
        }
    });

    return WatchListsView;
});