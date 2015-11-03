/**
 * Created by Kevin on 2015-11-02.
 */
define([
    'underscore',
    'backbone',
    'models/actorMoviesModel'
], function(_, Backbone, ActorMoviesModel){
    var ActorMoviesCollection = Backbone.Collection.extend({
        model: ActorMoviesModel,
        initialize:function(request){
            this.request = request;
        },
        sync:function(method, collection, options){
            console.log(method);
            console.log(collection);
            console.log(options);
            var self = this;
            var params = _.extend({
                url: 'http://'+urlServer+':3000/unsecure/actors/'+self.request+'/movies',
                dataType: "json",
                contentType: "application/x-www-form-urlencoded"
            }, options);

            return $.ajax(params);
        },
        parse:function(response){
            return response.results;
        }
    });

    return ActorMoviesCollection;
});