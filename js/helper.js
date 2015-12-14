/**
 * Created by Kevin on 2015-12-09.
 */

var getCookie = function() {
    var name = 'umovie_access_token' + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
};

var clearCookie = function(){
    document.cookie = "";
};

var contains_movie_in_watchlist = function(list, movie){
    var result = false;
    for (var i = 0; i < list.movies.length; i++) {
        if (list.movies[i].trackId == movie.trackId)
            result = true;
    }

    console.log("contains_movie_in_watchlist ",result);
    return result;
};

var  getWachtListCurrentUser = function(){

    var array = [];
    $.ajax({
        url:  urlServer + '/tokenInfo',
        type: 'GET',
        contentType: "application/JSON; charset=utf-8",
        success:function(data){
            $.ajax({
                url: urlServer + '/watchlists',
                type: 'GET',
                contentType: "application/JSON; charset=utf-8",
                success:function(list){
                    for(var i = 0;i<list.length;i++){
                        if(list[i].owner !== undefined) {
                            if (list[i].owner.id == data.id)
                                array.push(list[i]);
                        }
                    }
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', getCookie());
                }
            })
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', getCookie());
        }
    });

    return array;
};