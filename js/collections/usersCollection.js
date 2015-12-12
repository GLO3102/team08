/**
 * Created by angem on 11/12/2015.
 */
define([
    'underscore',
    'backbone',
    '../models/UserModels/usersModel',
    'helper'
], function(_, Backbone, usersModel){
    var usersCollection = Backbone.Collection.extend({
        model: usersModel,
        initialize:function(request){
            this.request = request;
        },
        sync:function(method, collection, options){
            var token = getCookie();
            var self = this;
            var params = _.extend({
                url: urlServer + '/users/:' + self.request,
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

    return usersCollection;
});