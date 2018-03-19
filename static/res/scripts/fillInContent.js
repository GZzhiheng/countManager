/**
 * Created by Administrator on 2016/11/3 0003.
 */
/**
 * Created by Administrator on 2016/11/1 0001.
 */
$(document).ready(function () {
    //取得浏览器的高度
    var browserH = $(window).height()-160;
    $(".Tdrag").slimScroll({
        width: '300px',
        height: browserH,
        size: '5px',
        position: 'right',
        color: '#100be4',
        alwaysVisible: true,
        distance: '0px',
        // start: $('#child_image_element'),
        railVisible: true,
        railColor: '#222',
        railOpacity: 0.3,
        wheelStep: 10,
        allowPageScroll: false,
        disableFadeOut: false
    });
    $(".addModule-r").width(getRightWith());
    //图片上传
    //浏览器事件resize()事件;
    $(window).resize(function () {
        $(".addModule-r").width(getRightWith());
        $(".showModuleBox").width(getRightWith());

    });
    function getRightWith() {
        var width = $(".addModuleList").width();
        var widthR = width - $(".addModule-l").outerWidth() - 60;
        return widthR;
    }

})