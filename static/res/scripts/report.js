/**
 * Created by Administrator on 2016/8/12 0012.
 */
var report = {
    init: function () {
        var _this = this;
        _this.events();
    },
    events: function () {
        //初始化弹出的时间列表
        $("#daterangepicker").daterangepicker(D.utils.extend(daterangepickerDefOpts,{autoUpdateInput:false}),
            function (start, end) {
                //当时间框改变是触发：隐藏域input type=hidden 的开始和结束时间
                $("#daterangepicker").on("inputchange", function (e) {
                    if (!$.isEmptyObject($(e.target).val()) && $(e.target).val() !== "") {
                        var timeArr = $(e.target).val().split("~");
                        $("#start").val($.trim(timeArr[0]));
                        $("#end").val($.trim(timeArr[1]));
                        console.log($.trim(timeArr[0]))
                    }
                });
            }
        );
        $('#daterangepicker').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('YYYY-MM-DD') + ' ~ ' + picker.endDate.format('YYYY-MM-DD'));
        });
        //全选按钮
        $("body").on("change", "input[name=checkAll]", function () {
            if ($(this).is(":checked")) {
                $("input[name=clientAccount]").prop("checked", true);
            } else {
                $("input[name=clientAccount]").prop("checked", false);
            }
        });

        //单项按钮
        $("body").on("change", "input[name=clientAccount]", function () {
            //下面 checkbox 是否一个input 也没有选中
            var check = false;
            $("input[name=clientAccount]").each(function () {
                if ($(this).is(":checked")) {
                    check = true;
                    return false;
                }
            });
            if (check) {
                $("input[name=checkAll]").prop("checked", true);
            } else {
                $("input[name=checkAll]").prop("checked", false);
            }
        })
    }
}
$(document).ready(function () {
    report.init();
})