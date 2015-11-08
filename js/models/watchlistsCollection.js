define([
    'underscore',
    'backbone',
    'models/watchlistModel'
], function(_, Backbone, WatchlistModel){
    var WatchlistCollection = Backbone.Collection.extend({
        model: WatchlistModel,
        url: 'http://'+urlServer+':3000/unsecure/watchlists',
        parse:function(response){
            _.each(response,function(watchlist){
                _.each(watchlist.movies,function(item){
                    var img_url = item.artworkUrl100;
                    item.artworkUrl300 = img_url.replace('100x100bb','300x300bb');
                });
            });

            return response;
        }
    });

    return WatchlistCollection;
});