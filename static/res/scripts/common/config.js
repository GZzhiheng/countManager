var cf = {
    init: function () {
        var _this = this;
        _this.initPage()
        _this.getHash();
        _this.events();
        window.onhashchange = function () {
            _this.spreadNav(location.hash);
            //在一定的条件下清除localStorage
            var targetArr,targetWord,tempHash = location.hash;
            if(tempHash.indexOf("?") > 0){
                targetArr = tempHash.split("?")[0].split("/");
                if(targetArr.length >=2)
                    targetWord = targetArr[targetArr.length-2];
            }else{
                targetArr = tempHash.split("/");
                if(targetArr.length >=2)
                    targetWord = targetArr[targetArr.length-2];
            }
            var check = true;
            for(var i=0;i<targetArr.length;i++) {
                //离开告警页面时、离开报告配置功能块时、离开询盘功能块时
                if (targetArr[i] === "alertTriggerRecord" || targetArr[i] === "reportWorkFlow" || targetArr[i] === "enquiry") {
                    var check = false;
                }
            }
            if (localStorage.lsData && check){
                localStorage.removeItem("lsData");
            }
        }
        _this.layouts();
    },
    reg: {
        phoneReg: function (data) {
            var reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i;
            return reg.test(data);
        },
        emailReg: function (data) {
            var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return reg.test(data);
        }
    },
    strFormatToDate: function (formatStr, dateStr) {
        var year = 0;
        var start = -1;
        var len = dateStr.length;
        if ((start = formatStr.indexOf('yyyy')) > -1 && start < len) {
            year = dateStr.substr(start, 4);
        }
        var month = 0;
        if ((start = formatStr.indexOf('MM')) > -1 && start < len) {
            month = parseInt(dateStr.substr(start, 2)) - 1;
        }
        var day = 0;
        if ((start = formatStr.indexOf('dd')) > -1 && start < len) {
            day = parseInt(dateStr.substr(start, 2));
        }
        var hour = 0;
        if (((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len) {
            hour = parseInt(dateStr.substr(start, 2));
        }
        var minute = 0;
        if ((start = formatStr.indexOf('mm')) > -1 && start < len) {
            minute = dateStr.substr(start, 2);
        }
        var second = 0;
        if ((start = formatStr.indexOf('ss')) > -1 && start < len) {
            second = dateStr.substr(start, 2);
        }
        return new Date(year, month, day, hour, minute, second);
    },
    formatDate: function (date, format) {//时间字符串格式化
        if (!date) return;
        if (!format) format = "yyyy-MM-dd";
        switch (typeof date) {
            case "string":
                date = new Date(date.replace(/-/g, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
        }
        if (!date instanceof Date) return;
        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    },
    updateStatus: function (elem) {//boostrap-validator更新给定字段的校验状态
        if (elem) {
            //input name
            var name = $(elem).attr("name");
            //form Jquery 对象
            var $form = $(elem).parents("form");
            if ($form.data('bootstrapValidator')) {
                $form.data('bootstrapValidator')
                    .updateStatus(name, 'NOT_VALIDATED', null)
                    .validateField(name);
            }
        }
    },
    stopBubble: function (e) {//阻止冒泡函数
        if (e && e.stopPropagation) {
            //e.preventDefault();
            e.stopPropagation();  //w3c
        } else {
            window.event.cancelBubble = true; //IE
        }
    },
    toThousands:function(num) {//数字转化为千位符数字
        var result = [ ], counter = 0;
        var num1 = num;
        var num2 = '';
        if(num.toString().indexOf(".")>=0){
            num1 = num.toString().split('.')[0];
            num2 = "."+num.toString().split('.')[1];
        }else{
            num1 = (num || 0).toString().split('');
        }
        for (var i = num1.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num1[i]);
            if (!(counter % 3) && i != 0 && num1[i]!==".") { result.unshift(','); }
        }
        return result.join('') + num2;
    },
    loadPage: function (hash) {
        $("#content").load(hash, function () {
            var $this = $(this);
            var pageTransition = $("#pageTransition option:selected").val();
            $this.addClass(pageTransition + " ng-animate ng-enter ng-enter-active");
            setTimeout(function () {
                $this.removeClass(pageTransition + " ng-animate ng-enter ng-enter-active");
            }, 350);
        })
    },
    initPage: function () { 
        var _this = this;
        var hash = window.location.hash;

        var loginPath = "/login";
        var path = location.pathname;
        var idx = path.indexOf(loginPath);
        var loginPageFlag = false;//是否是登录页标签
        if (idx >= 0 && idx == path.length - loginPath.length) {
            //当前是登陆页
            loginPageFlag = true;
            var redirect = $('form input[type=hidden][name=redirect]');
            var rurl = redirect.val();
            if (rurl && rurl.length > 0 && rurl.indexOf('#') < 0) {
                redirect.val(rurl + location.hash);
            }
            return;
        }
        if (!$.isEmptyObject(hash) && hash.length > 1) {
            var hashStr = hash.substring(1, hash.length);
            //给左侧栏选定当前导航栏目
            _this.spreadNav(hashStr);
        } else {
            if (!loginPageFlag) {
                window.location.hash = "#" + window.host + "/main/platform/mainpage";
            }
        }

    },
    getHash: function () {
        var _this = this;
        $("body").on("click", 'a[target=hash]', function (e) {
            e.preventDefault();
            var _href = $(this).attr("href");
            var curHash = window.location.hash;
            if (curHash.length >= 1 && _href === curHash.substring(1, curHash.length)) {
                _this.loadPage(_href);
            } else {
                window.location.hash = "#" + _href;
            }
        })
    },
    spreadNav: function (hash) {//给左侧栏选定当前导航栏目，并load出内容
        var _this = this;
        if ($.isEmptyObject(hash) || hash === "") {
            hash = window.location.hash
        }
        var tmpCheck = false;

        while (true) {
            var sp = hash.indexOf('#');
            if (sp == 0) {
                hash = hash.substring(1);
                continue;
            } else if (sp > 0) {
                hash = hash.substring(0, sp);
            }
            break;
        }
        //getTargetWord(hash,2); 当中的数字 2 的意义就是取得 hash 里面以"/" 为分割符分割出来的数组的倒数第二个索引
        var targetWord = getTargetWord(hash,2);

        function getTargetWord(hash,num){
            if(hash.indexOf("?") >=0 ){
                var targetWordArr = hash.split("?")[0].split("/");
                if(targetWordArr.length>=2){
                    targetWordTmp = targetWordArr[targetWordArr.length-num];
                }else{
                    throw "数组越界...";
                }
            }else{
                var targetWordArr = hash.split("/");
                if(targetWordArr.length>=2){
                    targetWordTmp = targetWordArr[targetWordArr.length-num];
                }else{
                    throw "数组越界...";
                }
            }
            return targetWordTmp;
        }
        var element = $("#nav a[target=hash]").filter(function () {
            var curHrefArr = $(this).attr("href").split("/");
            var navTargetWord;
            if(curHrefArr.length >= 2){
                navTargetWord = curHrefArr[curHrefArr.length-2]
                if(targetWord === navTargetWord){
                    tmpCheck = true;
                    return true;
                }
            }else{
                throw "数组越界...";
            }
            return false;
        });
        //当hashCode 如“#/offer/main”的时候，可能出现1到多个 element 的对象
        if(element.length >= 2){
            targetWord = getTargetWord(hash,1);
            for(var i = 0;i < element.length;i++){
                if(element.eq(i).attr("href").lastIndexOf(targetWord) > 0){
                    element = element.eq(i);
                    break;
                }
            }
        }
        if (tmpCheck) {
            //给左侧栏选定当前导航栏目
            $("#nav li").removeClass("active");
            var element = element.parent().addClass('active').siblings().removeClass("active").end().parent().parent();
            if (element.is('li')) {
                element.siblings().removeClass('open active');
                if (!$("#app").hasClass("nav-collapsed-min")) {
                    element.addClass('open active');
                    if (element.children("ul")[0].style.display === "none") {
                        element.children("ul").slideDown();
                    }
                } else {
                    element.addClass('active');
                }
            }
        }
        //内容弹出
        if(hash !== "/" && !$.isEmptyObject(hash)){//_this.getHashQueryString("hash") 在告警列表使用到，强行改变hashcode
            _this.loadPage(hash);
        }
    },
    getSettingList: function (code, target) {
        cf.send(cf.urls.getSettingList, {code: code},
            function (rs) {
                if (processRsp(rs)) {
                    var t = $(target);
                    var tv = t.val();
                    var data = rs.data;
                    html = '';
                    for (var i = 0; i < data.length; i++) {
                        html += '<option value="' + data[i].id + '"';
                        if (tv == data[i].id) {
                            html += 'selected="selected"';
                        }
                        html += '>' + data[i].busiValue + '</option>';
                    }
                    t.html(html);
                }
            });
    },
    send: function (url, data, fn, setting) {
        var _this = this;
        var opt = D.utils.extend({
            type: 'POST',
            dataType: 'json',
            async: true,
            hasBefore: true
        }, setting);
        return $.ajax({
            url: url,
            type: opt.type,
            data: data,
            dataType: opt.dataType,
            async: opt.async,
            success: function (rs) {
                fn(rs);
                if (rs.code === 4) {
                    window.host + "/login?redirect="
                    + encodeURIComponent(location.href);
                }
            }
        });
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return decodeURI(r[2]);
        return "";
    },
    getHashQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        if (window.location.hash.substr(1).indexOf("?") >= 0) {
            var r = window.location.hash.substr(1).split("?")[1].match(reg);
            if (r != null)return decodeURI(r[2]);
            return "";
        }
        return "";
    },
    layouts: function () {//初始化界面用户习惯
        var layout = localStorage.getItem("layout");
        if (layout) {
            if (layout === "boxed") {
                $("#header input[name=layout]").eq(0).prop("checked", true);
                $("#app").addClass("layout-boxed");
            } else {
                $("#header input[name=layout]").eq(1).prop("checked", true);
                $("#app").removeClass("layout-boxed");
            }
        }
        var fixedTopHeader = localStorage.getItem("fixedTopHeader");
        if (fixedTopHeader) {
            if (fixedTopHeader !== "true") {
                $("#header input[name='main-fixed']").eq(0).prop("checked", false);
                $("#header").removeClass("header-fixed");
            } else {
                $("#header input[name='main-fixed']").eq(0).prop("checked", true);
                $("#header").addClass("header-fixed");
            }
        }
        var fixedSidebar = localStorage.getItem("fixedSidebar");
        if (fixedSidebar) {
            if (fixedSidebar !== "true") {
                $("#header input[name='main-fixed']").eq(1).prop("checked", false);
                $("#nav-container").removeClass("nav-fixed");
            } else {
                $("#header input[name='main-fixed']").eq(1).prop("checked", true);
                $("#nav-container").addClass("nav-fixed");
            }
        }
        var pageTransition = localStorage.getItem("pageTransition");
        if (pageTransition) {
            $("#pageTransition option").each(function () {
                if ($(this).val() === pageTransition) {
                    $(this).prop("selected", true);
                }
            });
        }
    },
    events: function () {
        var _this = this;
        //按enter键触发事件
        $(document).keyup(function(event){
            if(event.keyCode ==13){
                $(".searchBtn").trigger("click");
            }
        });
        var authWindow;
        //打开授权窗口
        $("#authorization").on("click", function () {
            if (authWindow && !window.closed) {
                authWindow.close();
            }
            var woLeft = $(window).width() / 2 - 400;
            authWindow = window.open(window.host + '/sys/authBind/start', '_blank', 'height=600, width=800, top=150, left=' + woLeft + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
        });
        $("body").on("click", ".history-goBack", function () {
            window.history.go(-1);
        });
        //消息栏点击事件
        $(".top-nav li").on("click", function (e) {
            _this.stopBubble(e);
            var $this = $(this);
            if ($this.hasClass("dropdown") && !$this.hasClass("open")) {
                $this.parents(".top-nav").find(".dropdown").removeClass("open");
                $this.addClass("open");
            }
        });
        //点击左侧消息栏第一个li 改变左侧导航栏布局
        $(".nav-left li").eq(0).on('click', function (e) {
            _this.stopBubble(e);
            var $app = $('#app');
            $lists = $('#nav').find('ul').parent('li'); // lists has ul
            if ($app.hasClass('nav-collapsed-min')) {
                $app.removeClass('nav-collapsed-min');
            } else {
                $app.addClass('nav-collapsed-min');
                $lists.removeClass('open').find('ul').slideUp(250);
            }
        });
        //点击消息栏 li 以外的区域 就关闭消息栏
        $("body").not(".top-nav li").on("click", function () {
            $(".top-nav li").removeClass("open");
        });
        //点击第二个消息栏 li 里的layouts Style
        $("input[name='layout']").on("change", function (e) {
            _this.stopBubble(e);
            if ($(this).val() === "boxed") {
                localStorage.setItem("layout", "boxed");
                $("#app").addClass("layout-boxed");
            } else {
                localStorage.setItem("layout", "wide");
                $("#app").removeClass("layout-boxed");
            }
        })
        //点击第二个消息栏 li 里的 Additional
        $("input[name='main-fixed']").on("change", function () {
            if ($(this).attr("ng-model") === "main.fixedHeader") {
                if ($(this).is(":checked")) {
                    localStorage.setItem("fixedTopHeader", "true");
                    $("#header").addClass("header-fixed");
                } else {
                    localStorage.setItem("fixedTopHeader", "false");
                    $("#header").removeClass("header-fixed");
                }

            }
            if ($(this).attr("ng-model") === "main.fixedSidebar") {
                if ($(this).is(":checked")) {
                    localStorage.setItem("fixedSidebar", "true");
                    $("#nav-container").addClass("nav-fixed");
                } else {
                    localStorage.setItem("fixedSidebar", "false");
                    $("#nav-container").removeClass("nav-fixed");
                }
            }
        });
        //页面过渡风格选择
        $("#pageTransition").on("change", function () {
            localStorage.setItem("pageTransition", $(this).find("option:selected").val());
        });
        //移动设备时的导航栏按钮(隐藏、显示导航栏)
        $(".menu-button").on("click", function () {
            return $("#app").toggleClass("on-canvas")
        });
    }
}
$(function () {
    cf.init();
})
