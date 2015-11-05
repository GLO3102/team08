/**
 * Created by Kevin on 2015-11-04.
 */
define([
    '../../jquery',
    'underscore',
    'backbone',
    'collections/seasonCollection',
    'collections/episodeCollection',
    'models/SerieModels/serieTrailerModel'
], function($, _, Backbone, SeasonCollection, EpisodeCollection, SerieTrailerModel){
    var SerieView = Backbone.View.extend({
        initialize:function(noSeason,noEpisode){
            this.noSeason = noSeason;
            this.noEpisode = noEpisode;

        },
        render: function(parent,request,callback) {
            var self = this;
            this.seasonCollection = new SeasonCollection(request);
            this.seasonCollection.fetch().done(function(){
                parent.model.seasons =  _.extend(self.seasonCollection.toJSON());
                if(self.noSeason === undefined)
                    parent.model.noSeason = parent.model.seasons.length - 1;
                else
                    parent.model.noSeason = self.noSeason;

                self.episodeCollection = new EpisodeCollection(parent.model.seasons[parent.model.noSeason].collectionId);
                self.episodeCollection.fetch().done(function(){
                    parent.model.episodes = self.episodeCollection.toJSON();
                    if(self.noEpisode === undefined){
                        self.serieTrailerModel = new SerieTrailerModel(parent.model.seasons[parent.model.noSeason].artistName+"+season"+(parseInt(parent.model.noSeason)+1));
                        self.serieTrailerModel.fetch().done(function() {
                            parent.model = _.extend(parent.model,self.serieTrailerModel.toJSON());
                            callback(parent);
                        });
                    }
                    else{
                        parent.model.noEpisode = self.noEpisode;
                        var request = parent.model.seasons[parent.model.noSeason].artistName+"+season"+(parseInt(parent.model.noSeason)+1)+parent.model.episodes[parent.model.noEpisode].trackName;
                        self.serieTrailerModel = new SerieTrailerModel(request);
                        self.serieTrailerModel.fetch().done(function() {
                            parent.model = _.extend(parent.model,self.serieTrailerModel.toJSON());
                            callback(parent);
                        });
                    }
                });
            });

        }
    });

    return SerieView;
});