/**
 * Created by Kevin on 2015-11-04.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var SerieTrailerModel = Backbone.Model.extend({
        initialize:function(request){
            this.request = request;
        },
        sync:function(method, collection, options){
            var self = this;
            console.log(this.request);
            var params = _.extend({
                url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+self.request+'+trailer&key=AIzaSyDKTntFdJK_DH-cElBKy8nwOgjXOpoPvf0',
                type : 'GET',
                dataType: "jsonp"
            }, options);

            return $.ajax(params);
        },
        parse: function(response){
            console.log(response);
            return {urlTrailer:"https://www.youtube.com/embed/"+response.items[0].id.videoId};
        }
    });

    return SerieTrailerModel;
});