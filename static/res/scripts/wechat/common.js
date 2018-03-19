/**
 * Created by Administrator on 2017/3/14 0014.
 */
var cm = {
    /**
     * 空值校验,可用返回true,不可用返回false
     * @returns {boolean}
     */
    nullValid : function() {
        for( var i = 0; i < arguments.length; i++ ){
            if($.isEmptyObject(arguments[i])) return false;
        }
        return true;
    },
    /**
     * 手机校验,可用返回true,不可用返回false
     * @param phone
     * @returns {boolean}
     */
    phoneVali:function(phone){
        if($.isEmptyObject(phone)) return false;
        if(/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phone)){
            return true;
        }
        return false;
    },
    /**
     * 邮箱校验,可用返回true,不可用返回false
     * @param email
     * @returns {boolean}
     */
    emailVali:function(email){
        if($.isEmptyObject(email)) return false;
        if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)){
            return true;
        }
        return false;
    }
};

(function($){
    
    //数据交互检测
    $.extend({callbackData: function(rsp) {
        if (!rsp.code || rsp.code == 0) {
            return true;
        }
        var code = rsp.code;
        if (code == 1 || code == 3) {
            //系统内部错误或业务错误
            $.tips(rsp.msg);
            return false;
        }
        if (code == 4) {
            //未登录
            $.tips(rsp.msg);
            return false;
        }
        if (code == 5) {
            //没权限
            $.tips(rsp.msg);
            return false;
        }
        if (code == 2) {
            // 验证相关
            var fieldErr = rsp.fieldErr;
            if (!$.isEmptyObject(fieldErr) && typeof fieldErr !== "string") {
                var errMsg = "";
                for (var key in fieldErr) {
                    errMsg = errMsg + key + " ： " + fieldErr[key] + ";  ";
                }
                $.tips(errMsg);
                return false;
            }
            $.tips(rsp.msg);
        }
        return false;
    }});

    //jQuery 扩展类型消息提醒
    $.extend({tips:function(msg){
        var $tipsBox = $('<div class="tipsBox"></div>');
        var $tips = $('<div class="tips">'+msg+'</div>')
        if ($(".tipsBox", 'body').length <= 0) {
            $("body").append($tipsBox.append($tips));
        } else {
            $('.tipsBox').append($tips)
        }
        setTimeout(function(){
            $tips.fadeOut(500,function(){
                this.remove();
            })
        },2500)
    }});
    //解决Input内容改变，change事件没有触发的问题
    $.event.special.inputchange = {
        setup: function () {
            var self = this, val;
            $.data(this, 'timer', window.setInterval(function () {
                val = self.value;
                if ($.data(self, 'cache') != val) {
                    $.data(self, 'cache', val);
                    $(self).trigger('inputchange');
                }
            }, 20));
        },
        teardown: function () {
            window.clearInterval($.data(this, 'timer'));
        },
        add: function () {
            $.data(this, 'cache', this.value);
        }
    };
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            serializeObj[this.name] = this.value;
        });
        var $chk = $(this).find(":checkbox:checked");
        if ($chk.length !== 0) {//加入type="checkBox"类型
            for (var i = 0; i < $chk.length; i++) {
                var chkForName = $chk.eq(i).attr("name");
                var $chkForName = $("input[name='" + chkForName + "']");
                var nameArr = [];
                $chkForName.each(function () {
                    if ($(this).is(":checked")) {
                        nameArr.push(this.value);
                        serializeObj[this.name] = nameArr;
                    }
                });
                serializeObj[chkForName] = JSON.stringify(nameArr);//转换成字符串数组对象
            }
        }
        return serializeObj;
    };
    $.ajaxSetup({
        cache: true,
        timeout: 180000,
        dataType: 'html',
        cache: true
    })
    /**
     * 全局AJAX错误处理
     */
    $(document).ajaxError(function (evt, req, settings) {
        if (req && (req.status === 200)) {
            return false;
        }
        if (req.status === 0) {
            var msg = '请求服务器错误';
            if (req.statusText === 'timeout') {
                msg = '请求服务器超时';
            }
            $.tips(msg);
            return;
        }
        if (req.status === 401) {
            $.tips("请重新登录！")
            return;
        }
        var msg = '错误';
        if (req && req.responseText) {
            msg += ":";
            msg += req.responseText || '系统异常，请重试';
        }
        if (req.status === 403) {
            $.tips(msg);
            return;
        }
        $.tips(msg);
    });
})(jQuery);