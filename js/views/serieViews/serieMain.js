/**
 * Created by Kevin on 2015-11-04.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    '../../models/SerieModels/serieMainModel',
    'views/serieViews/season',
    'text!../../../templates/serie.html'
],function($,_,Backbone,SerieMainModel, SeasonView,SerieTemplate){
    var SerieMain = Backbone.View.extend({
        el: $('#Page_Container'),
        initialize: function() {
            this.model = new SerieMainModel();
        },
        renderSerie: function(request){
            var seasonView = new SeasonView(undefined,undefined);
            seasonView.render(this,request,this.compileTemplate);
        },
        renderSeason: function(request,noSeason){
            var seasonView = new SeasonView(noSeason,undefined);
            seasonView.render(this,request,this.compileTemplate);
        },
        renderEpisode: function(request,noSeason, noEpisode){
            var seasonView = new SeasonView(noSeason,noEpisode);
            seasonView.render(this,request,this.compileTemplate);
        },
        compileTemplate:function(self){
            console.log(self.model);
            var compiledTemplate = _.template(SerieTemplate);
            self.$el.html( compiledTemplate({serie:self.model}) );
        }
    });

    return SerieMain;
});