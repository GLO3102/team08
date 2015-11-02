/**
 * Created by Kevin on 2015-10-30.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var ActorImageModel = Backbone.Model.extend({
        initialize:function(request){
          this.request = request;
        },
        sync:function(method, collection, options){
            var self = this;
            var params = _.extend({
                url: "http://www.myapifilms.com/imdb?name="+self.request+"&format=JSONP&actorPhotos=N",
                dataType: "jsonp"
            }, options);

            return $.ajax(params);
        },
        parse: function(response){
            return response[0];
        }
    });

    return ActorImageModel;
});