/**
 * Created by Kevin on 2015-11-04.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    '../../models/SerieModels/serieMainModel',
    'views/serieViews/season',
    'text!../../../Templates/serie.html',
    'text!../../../Templates/modalWindow.html'
],function($,_,Backbone,SerieMainModel, SeasonView,SerieTemplate,ModalTemplate){
    var SerieMain = Backbone.View.extend({
        events: {
            'click #linkModal': 'openModal',
            'click #searchEpisodeButton': 'openModal',
            'click #close': 'closeModal'
        },
        el: $('#Page_Container'),
        episode: undefined,
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

            var noEpisode = $(event.currentTarget).data('noepisode');
            var time  = $(event.currentTarget).data('time');
            var self = this;
            if ( noEpisode === undefined) {
                var selectElement = document.getElementById("episodeNumero");
                console.log(selectElement);
                 var optionSelected = selectElement.options[ selectElement.selectedIndex];
                noEpisode = optionSelected.value;
                console.log(noEpisode);
                var time = $('#option-list-numero').data('time');
            }

            var self = this;
            var episode = this.model.episodes;
            console.log(noEpisode);


            var compiledTemplate = _.template(ModalTemplate);
            self.$('#panelModal').html( compiledTemplate({ serie : this.model,
                                                           episode: episode,
                                                           noEpisode : noEpisode}) );

            $('#noModal').fadeIn(500);
            $('#panelModal').fadeIn(1000);

        },


        closeModal: function(event){
            $('#noModal').hide();
            $('.popModal').hide();
            $('.popModal').html('');
        }
    });

    return SerieMain;
});