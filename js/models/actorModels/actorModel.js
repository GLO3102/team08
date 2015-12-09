/**
 * Created by Kevin on 2015-10-30.
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var ActorModel = Backbone.Model.extend({
        initialize:function(request){
          this.request = request;
        },
        sync:function(method, collection, options){
            var token = getCookie();
            var self = this;
            var params = _.extend({
                url: urlServer + "/search/actors?q="+self.request,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', token);
                }
            }, options);

            return $.ajax(params);


        },
        parse: function(response){
            return response.results[0];
        }
    });

    return ActorModel;
});