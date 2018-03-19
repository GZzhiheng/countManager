/**
 * Created by chandler on 2016/8/17 0017.
 */
$(document).ready(function(){
    var ajaxData = {};
    var table = $('#alertStatisticsTable').dataTable({
        "sProcessing": "正在加载中...",
        "bLengthChange": false, //每页显示的记录数
        //"bFilter": false, //搜索栏
        "bInfo": true,//显示翻页信息
        //searching: false,
        dom: "lrtip",
        "pageLength": 20,
        "language": {
            emptyTable: "没有匹配的数据",
            info: "当前展示第_START_条到第_END_条的数据.",
            infoEmpty: "没有匹配的数据",
            paginate: {
                first: '首页',
                previous: '&laquo;',
                next: '&raquo;',
                last: '尾页'
            },
            aria: {
                paginate: {
                    first: '首页',
                    previous: '上一页',
                    next: '下一页',
                    last: '尾页'
                }
            }
        },
        "serverSide": true,
        "sEmptyTable": "No data available in table",
        "sInfoEmpty": "No entries to show",
        "ajax": {
            "url": window.host+"/alert/alertTriggerStatistics/list.json",
            "type": "POST",
            "dataSrc": function (rsp) {
                if(rsp.code === 5) {
                    _onWithoutLogin(rsp.msg);
                    return {recordsTotal:0,recordsFiltered:0,recordsTotalResult:0};
                }else{
                    var arr = rsp.data;

                    if (arr && arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            var client = arr[i];
                            client.seq = i + 1;
                        }
                    }
                    ajaxData = rsp
                    return arr;
                }
            },
            data: function (d) {
                d.startDate = $('#startDate').val();
                d.userId = $('#userId').val();
                d.endDate = $('#endDate').val();
                d.clientMgrId = $('#clientMgrId').val();
                return d;
            }
        },
        "drawCallback":function(){//表格tabale渲染完的回调函数，调用
            var alertsAll = ajaxData.alertsAll;
            var handleAll = ajaxData.handleAll;
            var eliminateAll = ajaxData.eliminateAll;

            if(handleAll==0){
                handleAll = "- -";
            }
            if(alertsAll==0){
                alertsAll = "- -";
            }
            if(eliminateAll==0){
                eliminateAll = "- -";
            }

            var tableObj = $('#alertStatisticsTable');
            tableObj.find("tbody").append('<tr><td colspan="3">合计</td><td>'+alertsAll+'</td><td>'+handleAll+'</td><td>- -</td><td>'+eliminateAll+'</td><td>- -</td></tr>')
        },
        "columns": [
            {
                "data": "seq",
                searchable: false,
                orderable:false,
                "render": function (data, type, full) {
                    return '<div style="position:relative;" class="alarmSeq"><span>'+full.seq+'</span>';
                }
            },
            {"data": "clientMgrName", searcher: false,orderable:false },
            {"data": "urgent",
                searcher: false,
                orderable: false,
                "render": function (data, type, full) {
                    var urgentCN = "";
                    switch(full.urgent)
                    {
                        case "0": urgentCN="<span class='alarmLevel' data-status='0' style='color:green'>关注</span>";break;
                        case "1": urgentCN="<span class='alarmLevel' data-status='1' style='color:orange'>重要</span>";break;
                        case "2": urgentCN="<span class='alarmLevel font-bold' data-status='2' style='color:red'>紧急</span>";break;
                    }
                    return urgentCN;
                }
            },
            {"data": "alertTotals", searcher: false, orderable: false,
                "render": function (data, type, full) {
                    if(full.alertTotals==0){
                        return "- -";
                    }
                    return full.alertTotals;
                }
            },
            {"data": "handleTotals", searcher: false, orderable: false,
                "render": function (data, type, full) {
                    if(full.handleTotals==0){
                        return "- -";
                    }
                    return full.handleTotals;
                }
            },
            {"data": "handleRate", searcher: false, orderable: false,
                "render": function (data, type, full) {
                    if(full.handleRate==0){
                        return "- -";
                    }
                    return full.handleRate+"%";
                }
            },
            {"data": "eliminateTotals", searcher: false, orderable: false,
                "render": function (data, type, full) {
                    if(full.eliminateTotals==0){
                        return "- -";
                    }
                    return full.eliminateTotals;
                }
            },
            {"data": "eliminateRate", searcher: false, orderable: false,
                "render": function (data, type, full) {
                    if(full.eliminateRate==0){
                        return "- -";
                    }
                    return full.eliminateRate+"%";
                }
            }
        ]
    });
    $('#alertStatisticsTable').on('init.dt', function (e, cfg) {

        var _tb = $(this).dataTable();
        var columns = cfg.aoColumns;
        var tableSearch = {
            curSearcher: null
        };
        $(this).data('search.dt', tableSearch);
        $('body').on('click', function () {
            if (tableSearch.curSearcher) {
                tableSearch.curSearcher.toggleShow();
            }
        });
        $(e.target).find('thead th').each(function () {
            var _this = $(this);
            var index = _tb.api().column(_this).index();
            var colCf = columns[index];
            if (!colCf || !colCf.searcher) {
                return;
            }
            //列搜索器配置
            var searcherCf = colCf.searcher;
            var searcher = {
                title: $(this).text(),
                index: index,
                cf: searcherCf,
                panelShow: false,
                doSearch: function (val, draw) {
                    this.toggleShow();
                    var col = _tb.api().column(this.index).search(val);
                    if (draw !== false) {
                        col.draw(this.index);
                    }
                    this.lastValue = val;
                    if (!$.isEmptyObject(val) && !_this.find("span").hasClass("glyphicon-filter")) {
                        _this.prepend('<span style="color:red;padding-right:3px;vertical-align:-1px;" class="glyphicon glyphicon-filter"></span>');
                    }
                },
                //清除当前列的搜索值
                clearSearch: function (draw) {
                    if ($.isEmptyObject(this.lastValue)) {
                        return;
                    }
                    if ($.isFunction(this.cf.setValue)) {
                        this.cf.setValue.call(this, '');
                    } else {
                        this.searchPanel.find('.panel-body input,select:eq(0)').val('');
                    }
                    if (draw !== true) {
                        draw = false;
                    }
                    this.doSearch('', draw);
                    _this.find(".glyphicon-filter").remove();
                },
                //弹出或者隐藏当前列的搜索面板
                toggleShow: function () {
                    if (tableSearch.curSearcher && tableSearch.curSearcher != this) {
                        tableSearch.curSearcher.toggleShow();
                    }
                    if (this.panelShow) {
                        //面板已经展开
                        this.searchPanel.hide();
                        if (!this.mousein) {
                            this.searchDiv.hide();
                        }
                        this.searchBtn.removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
                        tableSearch.curSearcher = null;
                    } else {
                        this.searchPanel.show();
                        var width = this.searchPanel.width();//搜索面板宽度

                        var left = _this.width() - width +
                            parseInt(_this.css('padding-left')) +
                            parseInt(_this.css('padding-right')) - 2;
                        var first = _tb.find('th:first');
                        if (_this.offset().left + left < first.offset().left) {
                            left = first.offset().left - _this.offset().left;
                        }
                        this.searchPanel.css('left', left);
                        this.searchBtn.removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
                        tableSearch.curSearcher = this;
                    }
                    this.panelShow = !this.panelShow;
                },
                searchDiv: $('<div style="position:absolute;bottom:0px;right:0px;display:none;z-index:1;" class="search_div"><button class="btn btn-default btn-xs glyphicon glyphicon-triangle-bottom"></button></div>')
            };
            _this.css('position', 'relative')
                .data('search.dt', searcher)
                .on('mouseover', function () {
                    searcher.searchDiv.show();
                }).on('mouseout', function () {
                if (!searcher.panelShow) {
                    searcher.searchDiv.hide();
                }
            }).append(searcher.searchDiv);
            searcher.searchBtn = searcher.searchDiv.find('button').click(function (e) {
                e.stopPropagation();
                searcher.toggleShow();
            }).on('mouseover', function () {
                searcher.mousein = true
            })
                .on('mouseout', function () {
                    searcher.mousein = false
                });

            var searchPanel = $('<div class="panel panel-default" style="position: absolute;top:37px;z-index:1;display:none;">' +
                '<div class="panel-body">' +
                '</div>' +
                '<div class="panel-footer" style="padding:5px 5px;">' +
                '<button class="btn btn-default __submit btn-xs">筛选</button>' +
                '&nbsp;<button class="btn btn-default __reset btn-xs">清除</button>' +
                '</div>');

            if (searcher.cf.content) {
                if ($.isFunction(searcher.cf.content)) {
                    searchPanel.find('.panel-body').append(searcher.cf.content.call(searcher));
                } else {
                    searchPanel.find('.panel-body').append(searcher.cf.content);
                }
            } else {
                var panelContent = '<div class="form-group" style="">' +
                    //'<label for="ds_name">' + searcher.title + '</label>' +
                    '<input class="form-control" type="text" placeholder="' + searcher.title + '"></div>' +
                    '</div>';
                searchPanel.find('.panel-body').append(panelContent);
            }
            searcher.searchPanel = searchPanel;
            var valGetter = function () {
                var val = '';
                if ($.isFunction(searcher.cf.getValue)) {
                    val = searcher.cf.getValue.call(searcher);
                } else {
                    var input = searchPanel.find('.panel-body input,select:eq(0)');
                    if (input.length == 1) {
                        val = input.val();
                    }
                }
                return val;
            };
            searchPanel.on('click', function (e) {
                e.stopPropagation();
            }).on('keypress', function (e) {
                //回车按下时执行过滤
                if (e.charCode == 13) {
                    e.stopPropagation();
                    searcher.doSearch(valGetter());
                }
            }).find('.__submit').click(function () {
                //过滤按钮点击时候
                searcher.doSearch(valGetter());
            });
            searchPanel.find('.__reset').click(function () {
                searcher.clearSearch(true);
            });
            _this.append(searchPanel);
        });
    });

    $('#queryButton').click(function () {
        table.api().draw();
    });

    $('#alertDate').daterangepicker(
        D.utils.extend(daterangepickerDefOpts,{startDate:$("#startDate").val(),endDate:$("#endDate").val()}),
        function (start, end) {
            //当时间框改变是触发：隐藏域input type=hidden 的开始和结束时间
            $("#alertDate").on("inputchange", function (e) {
                if (!$.isEmptyObject($(e.target).val()) && $(e.target).val() !== "") {
                    var timeArr = $(e.target).val().split("~");
                    $("#startDate").val($.trim(timeArr[0]));
                    $("#endDate").val($.trim(timeArr[1]));
                }
            });
        }
    )
})