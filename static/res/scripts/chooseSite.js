/**
 * Created by Administrator on 2016/11/1 0001.
 */
$(document).ready(function () {
    //点击下一步
    $("#LP-chooseModule").on('click', function () {
        var validator = $("#addLandingPage").data('bootstrapValidator');
        validator.validate();
        if (!validator.isValid()) {
            return;
        } else {
            validator.disableSubmitButtons(false);
        }
        $('.LP-session1').hide();
        $('.LP-session2').show();
        $('.pageName').text("选择站点模板");
        $(".chooseModule-r").width(getRightWith());
        $(".slimScrollDiv").eq(1).width(getRightWith());
        $(".showModuleBox").width(getRightWith());
    });
    //点击上一步
    $(".switch").on("click", function () {
        $('.LP-session1').show();
        $('.LP-session2').hide();
        $('.pageName').text("添加CMS")
        $(".chooseModule-r").width(getRightWith());
        $(".slimScrollDiv").eq(1).width(getRightWith());
        $(".showModuleBox").width(getRightWith());
    });
    $(".moduleBoxs").slimScroll({
        width: '220px',
        height: '800px',
        size: '5px',
        position: 'right',
        color: '#100be4',
        alwaysVisible: true,
        distance: '20px',
        // start: $('#child_image_element'),
        railVisible: true,
        railColor: '#222',
        railOpacity: 0.3,
        wheelStep: 10,
        allowPageScroll: false,
        disableFadeOut: false
    });
    $(".showModuleBox").slimScroll({
        width: getRightWith() + 10,
        height: '700px',
        size: '10px',
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
        disableFadeOut: false,
        touchScrollStep: 200, //滚动量当用户使用手势
        borderRadius: '7px', //滚动条圆角
        railBorderRadius: '7px' //轨道圆角
    });
    //浏览器事件resize()事件;
    $(window).resize(function () {
        $(".chooseModule-r").width(getRightWith());
        $(".slimScrollDiv").eq(1).width(getRightWith());
        $(".showModuleBox").width(getRightWith());
    });
    function getRightWith() {//取得右边框的宽度
        var width = $(".chooseModuleList").width();
        var widthR = width - $(".chooseModule-l").outerWidth() - 50;
        return widthR;
    }

    var selectTemplate = function (index) {
        $(".chooseModule-moduleBox").removeClass("active");
        var item = $(".moduleBoxs .chooseModule-moduleBox").eq(index);
        if (item.length == 0)return;
        item.addClass('active');
        var name = item.data("name");
        var bigImgUrl = item.data("large-image");
        $(".showModuleBox .moduleImg").attr("src", bigImgUrl);
        $(".showModuleBox .templateName").text(name);
    }
    $(".chooseModule-l").on("click", ".chooseModule-moduleBox", function () {
        selectTemplate($(this).index());
    })
    selectTemplate(0);
})
