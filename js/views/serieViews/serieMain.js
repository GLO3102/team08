/**
 * Created by Kevin on 2015-11-04.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    '../../models/SerieModels/serieMainModel',
    'views/serieViews/season',
    'text!../../../Templates/serie.html'
],function($,_,Backbone,SerieMainModel, SeasonView,SerieTemplate){
    var SerieMain = Backbone.View.extend({
        events: {
            'click #linkModal': 'openModal',
            'click #noModal': 'closeModal'
        },
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
        },

        openModal:function(event){
            event.preventDefault();
            var episodeId = $(event.currentTarget).data('id');
            var episodeSaisonName = $(event.currentTarget).data('saisonName');
            var episodeName  = $(event.currentTarget).data('nameEpisode');
            var episodeImg  = $(event.currentTarget).data('img');
            var episodePreview  = $(event.currentTarget).data('preview');
            var episodeDesc  = $(event.currentTarget).data('desc');
            var episodeTrackTimeMillis  = $(event.currentTarget).data('time');
            var token = this.getCookie('umovie_access_token');// besoin pour get via ajax


            console.log(episodeId);
            console.log(episodeSaisonName);
            console.log(episodeName);
            console.log(episodeImg);
            console.log(episodePreview);
            console.log(episodeDesc);
            console.log(episodeTrackTimeMillis);

            $('#noModal').fadeIn(500);
            $('#popModal').fadeTo("slow",0.8);
            $('#panelModal').fadeIn(1000);
            $('#panelModal').html('<img src = " '+ episodeImg +'"/>' +
                                  '<p>Season name : ' + episodeSaisonName + '</p>' +
                                  '<p>Episode name :' + episodeName + '</p>' +

                                  '<div class="blogvision">' +
                                  ' <iframe id="preview-frame" src=" '+ episodePreview +' "></iframe></div>'+
                                  '<p>Description : ' + episodeDesc + '</p>' +
                                  '<p>Time :  ' +episodeTrackTimeMillis + '</p>');




        },

        getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    },
        closeModal: function(event){
           // $('#noModal').hide();
            $('.popModal').hide();
            $('.panelModal').html('');
        }
    });

    return SerieMain;
});