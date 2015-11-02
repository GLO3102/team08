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
            'click #AddWatchlistButton' : 'addWatchList',
            'click .RemoveWatchListButton' : 'removeWatchList',
            'click .ModifyWatchListButton' : 'modifyWatchList'
        },

        isValidName : function(name) {
            return true;
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
        },

        removeWatchList: function (ev) {
            var watchListId = $(ev.currentTarget).data('id');

            var _this = this;
            if (watchListId !== undefined) {
                var watchlistModel = new WatchlistModel({ id: watchListId});
                var options = {
                    success: function(model, response) {
                        _this.display();
                    }
                };
                watchlistModel.destroy(options);
            }
        },

        modifyWatchList: function (ev) {
            var watchListId = $(ev.currentTarget).data('id');

            var modelToUpdate = this.collection.get(watchListId);
            var newName = $(ev.currentTarget).prevAll(".watchListName")[0].value;

            var _this = this;
            if (watchListId !== undefined &&
                modelToUpdate !== undefined &&
                this.isValidName(newName)) {

                var data = {
                    "name": newName,
                    id: watchListId,
                    "movies": []
                };

                var options = {
                    success: function(model, response) {
                        _this.display();
                    }
                };
                modelToUpdate.update(data, options);
            }
        }
    });

    return WatchListsView;
});