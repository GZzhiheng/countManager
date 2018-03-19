/**
 * Created by Administrator on 2016/8/12 0012.
 */
var platform = {
    init: function () {
        var _this = this;
        //_this.showAlarmLine();
        //_this.showAlarmPie();
        _this.events();
    },
    events: function () {
        //初始化弹出的时间列表
        var aaa = $('input[name="daterangepicker"]').daterangepicker(
            D.utils.extend(daterangepickerDefOpts, {startDate: $("#start").val(), endDate: $("#end").val()}),
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
        )
    },
    optionConsumeLine: function () {
        return {
            //图表标题
            title: {
                text: "数据对比图", //正标题
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
                formatter: function (params) {
                    var tip = [], title = false;
                    params.sort(function (a, b) {
                        var av = a.value, bv = b.value;
                        if (av == null)av = 0;
                        if (bv == null)bv = 0;
                        return bv - av;
                    });
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i];
                        if (param.data && param.data.date) {
                            if (!title) {
                                title = true;
                                tip.splice(0, 0, param.data.options.yTitle);
                            }
                            tip.push("<b style='color: " + param.color + "'>" + param.data.date + "："
                                + param.data.options.display(param.value) + "</b>");
                        }
                    }
                    return tip.join("<br/>");
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
                    precision: 2,
                    splitArea: {show: true},
                    name: "消费金额"
                }
            ],
            //图表Series数据序列配置
            series: []
        };
    },
    optionAlarmPie: function () {
        option = {
            title: {
                link: window.host+"main#/alert/alertTriggerRecord/main",
                target: "self",
                text: "告警统计",
                x: 'center',
                textStyle: {
                    fontSize: 24
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            noDataLoadingOption: {
                text: '暂无数据',
                effect: 'bubble',
                effectOption: {
                    effect: {
                        n: 0
                    }
                }
            },
            color: [],//图块颜色
            series: [
                {
                    name: '告警类型',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option;
    },
    optionAlarmLine: function () {
        return {
            //图表标题
            title: {
                text: "告警趋势图", //正标题
                link: window.host+"main#/alert/alertTriggerRecord/main",
                target: "self",
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
                formatter: function (params) {
                    var tip = "告警个数";
                    params.sort(function (a, b) {
                        var av = a.value, bv = b.value;
                        if (av == null)av = 0;
                        if (bv == null)bv = 0;
                        return bv - av;
                    });
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i];
                        if (param.data && param.data.date) {
                            tip += "<br/><b style='color: " + param.color + "'>" + param.data.date + "：" + param.data.totals + "个</b>";
                        }
                    }
                    return tip;
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
                    splitArea: {show: true},
                    name: "告警总数"
                }
            ],
            //图表Series数据序列配置
            series: []
        };
    },
    showConsumeLine: function (options) {
        var _this = this, element = $("#consumeLine"), data = element.data("chart-data");
        var myChart = echarts.init(element[0], "macarons");
        var render = function (chartData) {
            // if (inc < 0) {
            //     $("#costComparePercent").css('color', 'red');
            // } else {
            //     $("#costComparePercent").css('color', 'green');
            // }
            //var html = '<i class="glyphicon ' + ( inc < 0 ? 'glyphicon-arrow-down' : 'glyphicon-arrow-up') + '"></i>' + (inc < 0 ? inc * -1 : inc) + "%"
            //$("#costComparePercent").html(html);
            var opt = _this.optionConsumeLine();
            var model = chartData.data;
            var xAxis = {
                type: 'category',
                data: model.xAxis,
                name: "日期"
            };
            opt.xAxis.push(xAxis);
            opt.yAxis[0].name = options.yTitle;
            for (var serie in model.data) {
                opt.legend.data.push(serie);
                var data = model.data[serie];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    if (!dataItem) {
                        dataItem = {};
                    }
                    dataItem.value = dataItem[options.valueField];
                    dataItem.options = options;
                    if ($.isFunction(options.valueFormatter)) {
                        dataItem.value = options.valueFormatter(dataItem.value);
                    }
                }

                opt.series.push({
                    name: serie,
                    type: 'line',
                    data: data,
                    xAxisIndex: opt.xAxis.length - 1
                });
            }
            myChart.setOption(opt);
            if ($.isFunction(options.callback)) {
                options.callback.call(options, chartData, myChart.getOption().color);
            }
        }
        if (!options.reload && data) {
            render(data);
            return;
        }
        myChart.showLoading({
            text: '数据加载中',
            effect: 'whirling'
        });
        $.ajax({
            url: window.host + "/report/consumeChartData",
            data: options.params,
            global: false,
            dataType: "JSON",
            success: function (rs) {
                myChart.hideLoading();
                if (processRsp(rs)) {
                    element.data("chart-data", rs);
                    render(rs);
                }
            }
        });
    },
    showAlarmLine: function (params) {
        var _this = this;
        var myChart = echarts.init(document.getElementById("alarmLine"), "macarons");
        myChart.showLoading({
            text: '数据加载中',
            effect: 'whirling'
        });
        $.ajax({
            url: window.host + "/alert/alertTriggerStatistics/queryAlertTriggerStatistics",
            data: params,
            global: false,
            dataType: "JSON",
            success: function (rs) {
                myChart.hideLoading();
                if (processRsp(rs)) {
                    var opt = _this.optionAlarmLine();
                    var model = rs.data;
                    var xAxis = {
                        type: 'category',
                        data: model.xAxis,
                        name: "日期"
                    };
                    opt.xAxis.push(xAxis);

                    for (var serie in model.data) {
                        opt.legend.data.push(serie);
                        var data = model.data[serie];
                        for (var i = 0; i < data.length; i++) {
                            var dataItem = data[i];
                            if (!dataItem) {
                                continue;
                            }
                            dataItem.value = dataItem.totals;
                        }

                        opt.series.push({
                            name: serie,
                            type: 'line',
                            data: data,
                            xAxisIndex: opt.xAxis.length - 1
                        });
                    }

                    myChart.setOption(opt);
                }
            }
        });
    },
    showAlarmPie: function (params) {
        var _this = this;
        var myChart = echarts.init(document.getElementById("alarmPie"), "macarons");
        myChart.showLoading({
            text: '数据加载中',
            effect: 'whirling'
        });
        $.ajax({
            url: window.host + "/alert/alertTriggerStatistics/queryIndexAlertPieData",
            data: params,
            global: false,
            dataType: "JSON",
            success: function (rs) {
                myChart.hideLoading();
                if (processRsp(rs)) {
                    var opt = _this.optionAlarmPie();
                    var model = rs.data;
                    var xAxis = {
                        type: 'category',
                        data: model.xAxis,
                        name: "日期"
                    };
                    if (rs.data != null && rs.data.length > 0) {
                        for (var i = 0; rs.data.length > i; i++) {
                            opt.legend.data.push(rs.data[i].status);
                            opt.series[0].data.push({'value': rs.data[i].totals, 'name': rs.data[i].status});
                        }

                        for (var serie in model.data) {
                            opt.legend.data.push(serie);
                            var data = model.data[serie];
                            for (var i = 0; i < data.length; i++) {
                                var dataItem = data[i];
                                if (!dataItem) {
                                    continue;
                                }
                                dataItem.value = dataItem.totals;
                            }

                            opt.series.push({
                                name: serie,
                                type: 'pie',
                                data: data,
                                xAxisIndex: opt.xAxis.length - 1
                            });
                        }
                        for (var i = 0; i < opt.legend.data.length; i++) {
                            if (opt.legend.data[i] === "关注") {
                                opt.color.push("green");
                            } else if (opt.legend.data[i] === "重要") {
                                opt.color.push("orange");
                            } else if (opt.legend.data[i] === "紧急") {
                                opt.color.push("red");
                            }
                        }
                        $("#noDataEchartOver").remove();
                        myChart.setOption(opt);
                    } else {
                        myChart.setOption(opt);
                        $("#alarmPie").prepend("<div id='noDataEchartOver' style='background: rgba(0,0,0,0);height:300px;line-height: 300px;text-align: center;width:100%;position: absolute;'>暂无数据！</div>")
                    }

                }
            }
        });
    }
}
$(document).ready(function () {
    platform.init();
})

