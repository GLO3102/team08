/**
 * Created by Kevin on 2015-10-30.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var ActorModel = Backbone.Model.extend({
        sync:function(method, collection, options){
            var params = _.extend({
                url: "http://"+urlServer+":3000/unsecure/search/actors?q=DannyTrejo",
                dataType: "json",
                contentType: "application/x-www-form-urlencoded"
            }, options);

            return $.ajax(params);


        },
        parse: function(response){
            return response.results[0];
        }
    });

    return ActorModel;
});