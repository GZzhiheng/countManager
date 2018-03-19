/**
 * Created by Administrator on 2017/3/21 0021.
 */
$(document).ready(function () {
    window.formatSpentTime = function (time) {
        var formatWithUnit = function (value, unit) {
            value = parseInt(value);
            if (value > 0) {
                return value + unit;
            }
            return '';
        }
        if (time <= 0) {
            return "0秒"
        }
        if (time <= 60) {
            return formatWithUnit(time, "秒");
        }
        var min, sec, hour, day,
            oneDay = 60 * 60 * 24, oneHour = 60 * 60;
        if (time <= oneHour) {
            min = time / 60;
            sec = time % 60;
            return formatWithUnit(min, "分") + formatWithUnit(sec, "秒");
        }
        if (time <= oneDay) {
            hour = time / oneHour;
            min = ( time % oneHour) / 60;
            sec = time % 60;
            return formatWithUnit(hour, '时') + formatWithUnit(min, "分") + formatWithUnit(sec, "秒");
        }
        day = time / oneDay;
        hour = (time % oneDay) / oneHour;
        min = ( time % hour) / 60;
        sec = time % 60;
        return formatWithUnit(day, '天') + formatWithUnit(hour, '时') + formatWithUnit(min, "分") + formatWithUnit(sec, "秒");
    }

    var siteInfo = {
        urls: {
            summaryData: window.host + "/cms/summary/summaryData",
            pageData: window.host + "/cms/summary/pageData",
            countryData: window.host + "/cms/summary/countryData",

        },
        init: function () {
            var _this = this;
            _this.events();
            var $id = $('#id').select2();
            //有发布站点时，执行
            if ($id.select2().find("option:selected").length !== 0) {
                _this.showTops();
                _this.showeChart($(".comparePara").eq(0).data("options"));
            } else {
                Modal.showMsg("暂无站点数据！");
            }
        },
        events: function () {
            var _this = this;
            //初始化弹出的时间列表
            var aaa = $('input[name="daterangepicker"]').daterangepicker(
                D.utils.extend(otherPickerDefOpts, {startDate: $("#start").val(), endDate: $("#end").val()}),
                function (start, end) {
                    //当时间框改变是触发：隐藏域input type=hidden 的开始和结束时间
                    $("input[name=daterangepicker]").on("inputchange", function (e) {
                        if (!$.isEmptyObject($(e.target).val()) && $(e.target).val() !== "") {
                            var timeArr = $(e.target).val().split("~");
                            $("#start").val($.trim(timeArr[0]));
                            $("#end").val($.trim(timeArr[1]));
                        }
                    });
                }
            );
            //点击查询按钮
            $("#searchSite").on("click", function () {
                var idx = $(".comparePara").index($(".compareParaActive"));
                //清除初始化时保留的实例数据
                $("#consumeLine").removeData("chart-data");
                //有发布站点时，执行
                if ($("#id").find("option:selected").length !== 0) {
                    _this.showeChart($(".comparePara").eq(idx).data("options"));
                    _this.showTops();
                } else {
                    Modal.showMsg("暂无站点数据！");
                }
            });
            //初始化 5个图表选项数据
            $(".comparePara").each(function () {
                var $this = $(this), options = {};
                options.yTitle = $this.find(".pareTitle").text();
                options.yTitleField = $this.attr("data-field");
                $this.data("options", options);
            });
            $(".comparePara").on("click", function () {
                if (!$(this).hasClass("compareParaActive")) {
                    $(this).siblings().removeClass("compareParaActive").end().addClass("compareParaActive");
                    //有发布站点时，执行
                    if ($("#id").find("option:selected").length !== 0) {
                        _this.showeChart($(this).data("options"));
                    } else {
                        Modal.showMsg("暂无站点数据!")
                    }
                }
            });
        },
        eChartOpts: function () {
            return {
                //图表标题
                title: {
                    text: "网站数据概况", //正标题
                    x: "center", //标题水平方向位置
                    textStyle: {
                        fontSize: 24
                    },
                    //副标题样式
                    subtextStyle: {
                        fontSize: 12,
                        color: "red"
                    }
                },
                //数据提示框配置
                tooltip: {
                    trigger: 'axis', //触发类型，默认数据触发，见下图，可选为：'item' | 'axis' 其实就是是否共享提示框
                    formatter: function (param) {
                        var tooltips = "";
                        for (var i = 0; i < param.length; i++) {
                            var date = cf.formatDate(Number(param[i].value) * 1000, "mm:ss");
                            if (!date) date = "00:00";
                            tooltips += param[i].name + "<br>" + param[i].seriesName + " : " + Math.floor(moment.duration(param[i].value * 1000).asHours()) +
                                ":" + date;
                        }
                        return tooltips;
                    }
                },
                //图例配置
                legend: {
                    data: [], //这里需要与series内的每一组数据的name值保持一致
                    y: "bottom"
                },
                //工具箱配置
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true}, // 辅助线标志，上图icon左数1/2/3，分别是启用，删除上一条，删除全部
                        //dataView: {show: true, readOnly: false},// 数据视图，上图icon左数8，打开数据视图
                        magicType: {show: true, type: ['line', 'bar']},// 图表类型切换，当前仅支持直角系下的折线图、柱状图转换，上图icon左数6/7，分别是切换折线图，切换柱形图
                        restore: {show: true}, // 还原，复位原始图表，上图icon左数9，还原
                        saveAsImage: {show: true} // 保存为图片，上图icon左数10，保存
                    }
                },
                calculable: true,
                //轴配置
                xAxis: [],
                //Y轴配置
                yAxis: [
                    {
                        type: 'value',
                        precision: 1,
                        axisLabel: {},
                        splitArea: {show: true},
                        name: "消费金额"
                    }
                ],
                //图表Series数据序列配置
                series: []
            };
        },
        showeChart: function (options) {
            var _this = this, element = $("#consumeLine"), data = element.data("chart-data");
            var myChart = echarts.init(element[0], "macarons");
            var render = function (rs) {
                var opt = _this.eChartOpts();
                var model = rs.data.chartData;
                var xAxis = {
                    type: 'category',
                    data: model.xAxis,
                    name: "日期"
                };
                opt.xAxis.push(xAxis);
                //opt.legend.data.push(options.yTitle);
                opt.yAxis[0].name = options.yTitle;
                var summaryData = model.data.summaryData;
                if (options.yTitleField === "bounce_rate") {
                    opt.yAxis[0].axisLabel = {
                        formatter: '{value} %'
                    }
                } else if (options.yTitleField === "sum_visit_length") {
                    opt.yAxis[0].axisLabel = {
                        formatter: '{value} s'
                    }
                }
                opt.series.push({
                    name: options.yTitle,
                    type: 'line',
                    data: [],
                    xAxisIndex: opt.xAxis.length - 1
                });
                for (var i = 0; i < summaryData.length; i++) {
                    if (options.yTitleField === "bounce_rate") {
                        //去除百份号
                        var s = summaryData[i][options.yTitleField];
                        s = s.substring(0, s.length - 1);
                        opt.series[0].data.push(Number(s));
                        opt.tooltip.formatter = "{b} <br/>{a} : {c} %";
                    } else if (options.yTitleField === "sum_visit_length") {
                        var s = summaryData[i][options.yTitleField];
                        opt.series[0].data.push(summaryData[i][options.yTitleField]);
                    } else {
                        var date = opt.xAxis[0].data[i];
                        opt.series[0].data.push(summaryData[i][options.yTitleField]);
                        delete opt.tooltip.formatter;
                    }
                }
                myChart.setOption(opt);
            }
            if (element.data("chart-data")) {
                render(element.data("chart-data"));
                return;
            }
            myChart.showLoading({
                text: '数据加载中',
                effect: 'whirling'
            });
            var json = $("#formSite").serializeJson();
            var cmsType = $("#id").find("option:selected").attr("data-type");
            json.cmsType = cmsType;
            $.ajax({
                url: _this.urls.summaryData,
                type: "post",
                data: json,
                dataType: "JSON",
                success: function (rs) {
                    myChart.hideLoading();
                    if (processRsp(rs)) {
                        //为图表上面各小项总值
                        for (var data in rs.data.summaryData) {
                            $(".comparePara").each(function () {
                                if ($(this).attr("data-field") === data) {
                                    if (data === "depth") {
                                        $(this).find(".value1").html('<i class="glyphicon  glyphicon-stop"></i>&nbsp;<span>' + Number(rs.data.summaryData[data]).toFixed(3) + '</span>');
                                    } else if (data === "sum_visit_length") {
                                        $(this).find(".value1").html('<i class="glyphicon  glyphicon-stop"></i>&nbsp;<span>' + rs.data.summaryData[data] + '(秒)</span>');
                                    } else {
                                        $(this).find(".value1").html('<i class="glyphicon  glyphicon-stop"></i>&nbsp;<span>' + rs.data.summaryData[data] + '</span>');
                                    }
                                }
                            })
                        }
                        element.data("chart-data", rs);
                        render(rs);
                    }
                }
            });
        },
        showTops: function () {
            var json = $("#formSite").serializeJson();
            var cmsType = $("#id").find("option:selected").attr("data-type");
            json.cmsType = cmsType;
            var _this = this;
            //网页数据
            $.ajax({
                url: _this.urls.pageData,
                data: json,
                type: "post",
                dataType: "JSON",
                success: function (rs) {
                    if (processRsp(rs)) {
                        $("#pageData").empty();
                        $("#t-pageData").tmpl(rs).appendTo('#pageData');
                    }
                }
            });
            //国家数据
            $.ajax({
                url: _this.urls.countryData,
                data: json,
                type: "post",
                dataType: "JSON",
                success: function (rs) {
                    if (processRsp(rs)) {
                        $("#countryData").empty();
                        $("#t-countryData").tmpl(rs).appendTo('#countryData');
                    }
                }
            });
        }
    }
    siteInfo.init();
});