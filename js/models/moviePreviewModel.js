/**
 * Created by Christine on 2015-11-03.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){

    var MoviePreviewModel = Backbone.Model.extend({
        initialize:function(request){
            this.request = request;

        },

        sync:function(method, collection, options){
            var self = this;
            var params = _.extend({
                url:"https://www.googleapis.com/youtube/v3/search?part=snippet&q="+self.request+"+trailer&key=AIzaSyDKTntFdJK_DH-cElBKy8nwOgjXOpoPvf0",
                type:'GET',
                jsonp:'jsonp'
            }, options);

            return $.ajax(params);
        },
        parse: function(response){
            return response[0];
        }
    });



    return MoviePreviewModel;
});