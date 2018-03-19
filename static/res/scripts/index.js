/**
 * Created by Administrator on 2016/7/28 0028.
 */
$(document).ready(function () {
    //左侧导航栏点击收缩、展开函数
    link($("#nav"));
})
//阻止冒泡函数
function stopBubble(e) {
    if (e && e.stopPropagation) {
        //e.preventDefault();
        e.stopPropagation();  //w3c
    } else {
        window.event.cancelBubble = true; //IE
    }
}
//左侧导航栏点击收缩、展开函数
function link(ele) {
    var $app, $nav, $window, slideTime, $lists, $As, Timer, prevWidth, updateClass;
    $nav = $(ele[0]);
    $app = $('#app');
    $window = $(window);
    slideTime = 250;
    $lists = ele.find('ul').parent('li'); // lists has ul
    $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>');
    $As = $lists.children('a');
    $As.on('click', function (event) {
        event.preventDefault();
    });
    $nav.on('click', function (e) {

        // Disable it when nav is in "collapsed min nav" mode
        if ($app.hasClass('nav-collapsed-min')) {
            return;
        }
        var target = e.target;
        var $parentLi = $(target).closest('li') // closest, insead of parent, so it still works when click on i icons
        var $subUl = $parentLi.children('ul')
        var depth = $parentLi.parents().length + 1;
        var allAtDepth = $('#nav ul').filter(function () {
            if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
                return true;
            }
        })
        allAtDepth.slideUp(slideTime).closest('li').removeClass('open');
        if ($parentLi.has('ul').length) {
            $parentLi.toggleClass('open');
        }
        $subUl.slideToggle(slideTime);
    })
    $('nav:reset').on("click", function (event) {
        $lists.removeClass('open').find('ul').slideUp(slideTime);
    });
    Timer = void 0;
    prevWidth = $window.width();

    updateClass = function () {
        var currentWidth;
        currentWidth = $window.width();
        if (currentWidth < 768) {
            $app.removeClass('nav-collapsed-min');
        }
        if (prevWidth < 768 && currentWidth >= 768) {
            $lists.removeClass('open').find('ul').slideUp(slideTime);
        }
        prevWidth = currentWidth;
    };

    $window.resize(function () {
        var t;
        clearTimeout(t);
        t = setTimeout(updateClass, 300);
    });

}

//导航展开，隐藏按钮处理,提示信息
$("header a.toggle-min").click(function(){
    if($("#app").hasClass('nav-collapsed-min')){
        $(this).attr('title','隐藏导航面板');
    }else{
        $(this).attr('title','展开导航面板');
    }
})

//鼠标hover、显示隐藏二级菜单
// $("#nav li").hover(function(e){
//     var _self = $(this);
//     var clientHeight = $(window).height();
//     if(_self.children('ul').length==0){return;};
//     var UlHeight = _self.children('ul').eq(0).height();
//     console.log(_self.find('ul').eq(0).height());
//
//     _self.addClass('open').siblings('li').removeClass('open');
//     _self.siblings('li').children('ul').removeClass("slide-show");
//     _self.children('ul').addClass("slide-show").css({top:(_self.offset().top-1)+'px'}).stop(true, false).show();
// },function(){
//     // if($(this).hasClass('open') || $(this).hasClass('active')){
//     //     return;
//     // }
//     $(this).children('ul').removeClass("slide-show");
// })
