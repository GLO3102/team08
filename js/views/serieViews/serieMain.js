/**
 * Created by Kevin on 2015-11-04.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    '../../models/serieMainModel',
    'views/serieViews/season',
    'text!../../../templates/serie.html'
],function($,_,Backbone,SerieMainModel, SeasonView,SerieTemplate){
    var SerieMain = Backbone.View.extend({
        el: $('#Page_Container'),
        initialize: function() {
            this.model = new SerieMainModel();
        },
        renderSerie: function(request){
            var seasonView = new SeasonView(undefined,0);
            seasonView.render(this,request,this.compileTemplate);
        },
        renderSeason: function(request,noSeason){
            var seasonView = new SeasonView(noSeason,0);
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