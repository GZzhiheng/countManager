/**
 * 绑定分页事件
 *
 * @param contentId
 *            内容id
 * @param loadFun
 *            加载函数
 */
function bindPageEvent(contentId, loadFun) {
    $("#" + contentId).find(".pagination li").each(function () {
        var li = $(this);
        if (!li.hasClass("disabled") && !li.hasClass("active")) {
            var a = li.find('a');
            var index = a.attr("index");
            a.click(function () {
                loadFun(index);
            });
        }
    });
}

/**
 * 显示消息
 */
function showMsg(msg) {
    return Modal.showMsg(msg);
}

function _onWithoutLogin(msg) {
    var smsg = msg || "您还未登陆或登陆已经失效,请重新登陆";
    Modal.showMsg(smsg).on('hide.bs.modal', function () {
        if (msg) {//用户没有该页面的方位权限的情况
            location.hash = "#/main/platform/mainpage";
        } else {
            location.href = window.host + "/login?redirect="
                + encodeURIComponent(location.href);
        }
    });
}

(function ($) {
    //弹出系列时间列表框
    $.fn.initDateList = function ($start, $end) {
        var _this = this;
        var $start = $start;
        var $end = $end;
        var timeHTML = '<div class="showTimeBox">'
            + '<div class="showTimeArrow"></div>'
            + '<div class="showTimeContent"><table class="table table-hover table-con margin-zero"id="clientTable" width="100%"><tbody>'
            + '<tr><td id="yesterday" class="td-left">昨天</td></tr>'
            + '<tr><td id="lastWeek" class="td-left">过去一周</td></tr>'
            + '<tr><td id="lastMonth" class="td-left">过去一月</td></tr>'
            + '<tr><td id="userDefined" class="td-left" style="position: relative;">自定义<input type="text" style="position: absolute;z-index:1000;opacity: 0;top:0" name="daterange"id="daterange" class="form-control"value=""></td></tr>'
            + '</tbody></table></div>'
            + '</div>';
        $(_this).on("click", function () {
            if (document.querySelector(".showTimeBox")) {
                $(".showTimeBox").remove();
            }
            $(this).after(timeHTML);
            $('body input[name="daterange"]').daterangepicker(daterangepickerDefOpts,
                function (start, end, label) {
                    //alert('A date range was chosen: ' +start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
                }
            );
            $("#yesterday").on("click", function () {
                getStartAndEndTime();
            });
            $("#lastWeek").on("click", function () {
                getStartAndEndTime(7);
            });
            $("#lastMonth").on("click", function () {
                getStartAndEndTime(30);
            });
            $("#lastYear").on("click", function () {
                getStartAndEndTime(365);
            });
            $("input[name=daterange]").on("inputchange", function (e) {
                e.stopPropagation();  //w3c
                $(_this).val($(e.target).val());

                $(".showTimeBox").fadeOut(40);
                setTimeout(function () {
                    $(".showTimeBox").remove();
                }, 40)
            });
            setTimeout(function () {
                //关闭时间弹框系列阻止冒泡事件和事件
                $(_this).on("click", function (e) {
                    e.stopPropagation();  //w3c
                });
                $(".showTimeBox,.daterangepicker,input[name=daterange]").on("click", function (e) {
                    e.stopPropagation();  //w3c
                });
                $("body").on("click", function (e) {
                    $(".showTimeBox").fadeOut(40);
                    setTimeout(function () {
                        $(".showTimeBox").remove();
                    }, 40);
                })
            }, 100)
        });
        function formatDate(date, format) {//时间字符串格式化
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
        }

        function getStartAndEndTime(argsDays) {
            var days;
            if (!argsDays && $.type(argsDays) !== "number") {
                days = 1;
            } else {
                days = Math.floor(argsDays);
            }
            var stamp = 1000 * 60 * 60 * 24;//一天的时间戳
            var curStamp = Date.parse(new Date());//当前时间戳
            $("#daterange").val(formatDate(new Date(curStamp - stamp * days)) + " ~ " + formatDate(new Date(curStamp - stamp)))
        }
    };
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

    $.fn.toggleDisabled = function (FnDisable, FnEnable) {
        return this.each(function () {
            this.disabled = !this.disabled;
            if (this.disabled) {
                if (FnDisable != null) {
                    FnDisable();
                }
            } else {
                if (FnEnable != null) {
                    FnEnable();
                }
            }
        });
    };
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
            showMsg(msg);
            return;
        }
        if (req.status === 401) {
            _onWithoutLogin();
            return;
        }
        var msg = '错误';
        if (req && req.responseText) {
            msg += ":";
            msg += req.responseText || '系统异常，请重试';
        }
        if (req.status === 403) {
            _onWithoutLogin(msg);
            return;
        }
        showMsg(msg);
    });

    $(document).ajaxStart(function () {
        var mask = $('<div class="__mask"></div>');
        mask.css('z-index', "99999");
        mask.css('background-color', "rgba(255,255,255,0)");
        mask.css('position', 'fixed');
        mask.css('_position', 'absolute');
        mask.css('top', '0');
        mask.css('bottom', '0');
        mask.css('left', '0');
        mask.css('right', '0');
        mask.css('height', '100%');
        mask.css('width', '100%');
        mask.css('align', 'center');
        $('body').prepend(mask);
        var loading = $('<div style="height:80px;width:100%;display:inline-block;text-align:center;color:#333;"></div>');
        loading.css('position', "fixed");
        loading.css('top', (mask.height() - 300) / 2);
        mask.append(loading);
        NProgress.start();
    });

    $(document).ajaxStop(function () {
        $('.__mask').remove();
        NProgress.done();
    });

    $.ajaxSetup({
        cache: true,
        timeout: 180000,
        dataType: 'html',
        cache: true
    });

    /*
     * $(document).on('show.bs.modal',function(e){ $(".modal").each(function(){
     * if(this == e.target){ return; } $(this).modal('hide'); }) });
     */
    $(document).on('hide.bs.modal', function (e) {
        $(e.target).removeData('bs.modal');
    });
})(jQuery);

(function () {
    //时间选择范围input的默认参数 daterangepicker
    //默认参数
    daterangepickerDefOpts = {
        "showDropdowns": true,
        "autoUpdateInput": true,
        "locale": {
            direction: 'ltr',
            applyLabel: '确认',
            cancelLabel: '取消',
            separator: ' ~ ',
            format: 'YYYY-MM-DD',
            fromLabel: '从',
            toLabel: '到',
            weekLabel: '周',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 0
        },
        "minDate": "1970-01-01",
        "maxDate": moment().subtract(1, 'days').format("YYYY-MM-DD"),
        "ranges": {
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            "上一星期": [moment().day(-6), moment().day(0)],
            '过去7天': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            '过去30天': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            '本月': [moment().startOf('month'), moment().subtract(1, 'days')],
            '上一个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            '过去90天': [moment().subtract(90, 'days'), moment().subtract(1, 'days')],
        },
        "opens": "center"
    };
    var dateStr = moment(new Date()).format("YYYYMMDD");
    var dateStrLen = dateStr.length;
    if(dateStr.substring(dateStrLen-2,dateStrLen) == "01"){
        for(var  p in daterangepickerDefOpts.ranges){
            if( p == '本月'){ delete daterangepickerDefOpts.ranges[p]}
        }
    }
    window.daterangepickerDefOpts = daterangepickerDefOpts;
    otherPickerDefOpts = {
        "showDropdowns": true,
        "autoUpdateInput": true,
        "locale": {
            direction: 'ltr',
            applyLabel: '确认',
            cancelLabel: '取消',
            separator: ' ~ ',
            format: 'YYYY-MM-DD',
            fromLabel: '从',
            toLabel: '到',
            weekLabel: '周',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            firstDay: 0
        },
        "minDate": "1970-01-01",
        "ranges": {
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            "上一星期": [moment().day(-6), moment().day(0)],
            '过去7天': [moment().subtract(6, 'days'), moment().subtract(0, 'days')],
            '过去30天': [moment().subtract(29, 'days'), moment().subtract(0, 'days')],
            '本月': [moment().startOf('month'), moment().subtract(0, 'days')],
            '上一个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            '过去90天': [moment().subtract(89, 'days'), moment().subtract(0, 'days')],
        },
        "opens": "center"
    };
    window.otherPickerDefOpts = otherPickerDefOpts;
})();

function fillBusiSelect(code, target) {
    cf.send(cf.urls.getSettingList, {
        code: code
    }, function (rs) {
        if (rs.code === 0) {
            var t = $(target);
            var tv = t.val();
            var hasEptVal = false;
            t.find('option').each(function () {
                if ($.isEmptyObject($(this).attr('value')) && !$.isEmptyObject($(this).text())) {
                    $(this).attr('value', '');
                    hasEptVal = true;
                } else {
                    $(this).remove();
                }
            });
            if (!hasEptVal) {
                t.append('<option value="">请选择</option>');
            }
            var data = rs.data;
            if (data && data.length > 0) {
                html = '';
                for (var i = 0; i < data.length; i++) {
                    html += '<option value="' + data[i].id + '" ';
                    if (tv == data[i].id) {
                        html += "selected='selected'";
                    }
                    html += '>' + data[i].busiValue + '</option>';
                }
                t.append(html);
            }
        }
    }, {global: false});
}
function processRsp(rsp, form, onFail) {
    if (!rsp.code || rsp.code == 0) {
        return true;
    }
    if (form) {
        form.bootstrapValidator('disableSubmitButtons', false);
    }
    if ($.isFunction(onFail)) {
        //回调处理，忽略本身处理
        onFail(rsp.code, rsp);
        return false;
    }
    var code = rsp.code;
    if (code == 1 || code == 3) {
        Modal.showMsg(rsp.msg);
        return false;
    }
    if (code == 4) {
        _onWithoutLogin();
        return false;
    }
    if (code == 5) {
        _onWithoutLogin(rsp.msg);
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
            Modal.showMsg(errMsg);
            return false;
        }
        Modal.showMsg(fieldErr);
    }
    return false;
}