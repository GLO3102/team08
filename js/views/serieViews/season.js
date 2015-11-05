/**
 * Created by Kevin on 2015-11-04.
 */
define([
    '../../jquery',
    'underscore',
    'backbone',
    'collections/seasonCollection'
], function($, _, Backbone, SeasonCollection){
    var SerieView = Backbone.View.extend({
        initialize:function(noSeason,noEpisode){
            this.noSeason = noSeason;
            this.noEpisode = noEpisode;

        },
        render: function(parent,request,callback) {
            var self = this;
            console.log("request in serie",request);
            this.seasonCollection = new SeasonCollection(request);

            this.seasonCollection.fetch().complete(function(){
                parent.model.seasons =  _.extend(self.seasonCollection.toJSON());
                if(self.noSeason === undefined)
                    parent.model.noSeason = parent.model.seasons.length - 1;
                else
                    parent.model.noSeason = self.noSeason;

                parent.model.noEpisode = self.noEpisode;
                callback(parent);
            });

        }
    });

    return SerieView;
});