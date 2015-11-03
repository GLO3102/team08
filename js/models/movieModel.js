/**
 * Created by Christine on 2015-10-26.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var MovieModel = Backbone.Model.extend({
        initialize:function(request){
          this.request = request;
        },
        sync:function(method, collection, options){
            var params = _.extend({
                url: "http://"+urlServer+":3000/unsecure/search/movies?q="+this.request,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded"
            }, options);

            return $.ajax(params);


        },
        parse: function(response){
            return response.results[0];
        }
    });

    return MovieModel;
});