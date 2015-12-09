/**
 * Created by Kevin on 2015-11-04.
 */

define([
    'underscore',
    'backbone',
    '../models/SerieModels/seasonModel',
    'helper'
], function(_, Backbone, SeasonModel){
    var SeasonCollection = Backbone.Collection.extend({
        model: SeasonModel,
        initialize:function(request){
            this.request = request;
        },
        sync:function(method, collection, options){
            var token = getCookie();
            var self = this;
            var params = _.extend({
                url: urlServer + '/search/tvshows/seasons?q='+self.request,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            }, options);

            return $.ajax(params);
        },
        parse:function(response){
            var collection = response.results;
            console.log(collection);
            var serieName = collection[0].artistName;
            var newCollection = [];
            _.each(collection,function(item){
               if(item.artistName == serieName)
               {
                   var img_url = item.artworkUrl100;
                   item.artworkUrl400 = img_url.replace('100x100bb','400x400bb');
                   //console.log("test string",item.collectionName);
                   newCollection.push(item);
               }
            });
            return _.sortBy(newCollection,'collectionId');
        }
    });

    return SeasonCollection;
});