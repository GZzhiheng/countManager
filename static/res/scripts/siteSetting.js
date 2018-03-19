/**
 * Created by Administrator on 2016/11/3 0003.
 */
/**
 * Created by Administrator on 2016/11/1 0001.
 */
$(document).ready(function () {
    //取得浏览器的高度
    var browserH = $(window).height()-160;
    $(".nav-menu").slimScroll({
        width: '150px',
        height: browserH,
        size: '5px',
        position: 'right',
        color: '#100be4',
        alwaysVisible: false,
        distance: '0px',
        // start: $('#child_image_element'),
        railVisible: true,
        railColor: '#222',
        railOpacity: 0.3,
        wheelStep: 10,
        allowPageScroll: false,
        disableFadeOut: false
    });
    $(".siteSetting-r").width(getRightWith());
    function getRightWith() {
        var width = $(".addModuleList").width();
        var widthR = width - $(".siteSetting-l").outerWidth() - 20;
        return widthR;
    }
//浏览器事件resize()事件;
    $(window).resize(function () {
        $(".siteSetting-r").width(getRightWith());
    });
})
