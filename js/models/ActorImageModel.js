/**
 * Created by Kevin on 2015-10-30.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var ActorImageModel = Backbone.Model.extend({
        sync:function(method, collection, options){
            var params = _.extend({
                url: "http://www.myapifilms.com/imdb?name=Danny Trejo&format=JSONP&actorPhotos=N",
                dataType: "jsonp"
            }, options);

            return $.ajax(params);
        },
        parse: function(response){
            console.log("response",response[0]);
            return response[0];
        }
    });

    return ActorImageModel;
});