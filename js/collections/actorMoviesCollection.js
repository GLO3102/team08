/**
 * Created by Kevin on 2015-11-02.
 */
define([
    'underscore',
    'backbone',
    '../models/actorModels/actorMoviesModel'
], function(_, Backbone, ActorMoviesModel){
    var ActorMoviesCollection = Backbone.Collection.extend({
        model: ActorMoviesModel,
        initialize:function(request){
            this.request = request;
        },
        sync:function(method, collection, options){
            var token = getCookie();
            var self = this;
            var params = _.extend({
                url: urlServer + '/actors/'+self.request+'/movies',
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            }, options);

            return $.ajax(params);
        },
        parse:function(response){
            return response.results;
        }
    });

    return ActorMoviesCollection;
});