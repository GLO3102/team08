/**
 * Created by Kevin on 2015-11-05.
 */
define([
    'underscore',
    'backbone',
    '../models/SerieModels/seasonModel'
], function(_, Backbone, SeasonModel){
    var EpisodeCollection = Backbone.Collection.extend({
        model: SeasonModel,
        initialize:function(id){
            this.id = id;
        },
        sync:function(method, collection, options){
            var self = this;
            var params = _.extend({
                url: urlServer + '/unsecure/tvshows/season/'+self.id+"/episodes",
                dataType: "json",
                contentType: "application/x-www-form-urlencoded"
            }, options);

            return $.ajax(params);
        },
        parse:function(response){
            return response.results;
        }
    });

    return EpisodeCollection;
});