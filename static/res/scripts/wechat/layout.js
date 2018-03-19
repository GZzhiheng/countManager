/**
 * Created by Administrator on 2017/3/14 0014.
 */
$(document).ready(function(){
    var host = location.origin;
    var log = {
        urls:{
            logUrl:host + ""
        },
        init:function(){
            $("body").height(Number($(window).height()));
        },
    }
    log.init();
})
