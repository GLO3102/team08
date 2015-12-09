define([
    'underscore',
    '../backbone',
    'models/watchlistModel'
], function(_, Backbone, WatchlistModel){
    var WatchlistCollection = Backbone.Collection.extend({
        model: WatchlistModel,
        url: urlServer + '/watchlists',
        sync:function(method, collection, options){
            var token = getCookie();
            var self = this;
            var params = _.extend({
                url:self.url,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', getCookie());
                }
            }, options);

            return $.ajax(params);
        },
        parse:function(response){
            return response.results;
        }
    });

    return WatchlistCollection;
});