define([
    'jquery',
    'underscore',
    'backbone',
    '../models/watchlistsCollection',
    'text!../../templates/watchlists.html',
    '../models/watchlistModel',
], function($, _, Backbone, WatchListCollection, watchlistsTemplate, WatchlistModel){
    var WatchListsView = Backbone.View.extend({
        el: $('#Page_Container'),

        initialize: function() {
            this.display();
        },

        display: function() {
            this.collection = new WatchListCollection();
            this.collection.fetch({
                success: this.render
            });
        },

        render: function(collection, array) {
            var compiledTemplate = _.template(watchlistsTemplate);
            $('#Page_Container').html( compiledTemplate({ watchlists : array }) );
        },

        events: {
            'click #AddWatchlistButton' : 'addWatchList'
        },

        addWatchList: function () {
            var wathchlistNameInputBox = document.getElementById('WathchlistNameInputBox');

            if (wathchlistNameInputBox !== undefined) {
                var watchlistName = wathchlistNameInputBox.value;

                if (watchlistName !== undefined && watchlistName !== "") {
                    var watchlistModel = new WatchlistModel({ name: watchlistName})
                    watchlistModel.save();
                    this.display();
                }
            }
        }
    });

    return WatchListsView;
});