/**
 * Created by Administrator on 2016/9/7 0007.
 */
var alarmDetail = {
    urls:{
        alertHandleRecord : window.host+"/alert/alertHandleRecord/list.json",//跟进记录list
        alertTriggerRecordDesc : window.host +"/alert/alertTriggerRecordDesc/list.json",//触发告警list
        updateHandleStatus : window.host +"/alert/alertTriggerRecordDesc/updateHandleStatus.do"
    },
    init:function(){
        var _this = this;
        _this.putAlertHandleRecord(1);
        _this.putAlertTriggerRecordDesc(1);
        _this.events();
    },
    events:function(){
        var _this = this;
        //复制详情文本
        $("#copyDetail").on("click",function(){
            var detailDesc = document.getElementById("detailDesc");
            _this.copy(detailDesc);
        })
        $("#titleList li").on("click",function(){
            var idx = $("#titleList li").index(this);
            if(idx === 0){
                $("#addTab").show();
            }else{
                $("#addTab").hide();
            }
        });
        $(".checkDetail").on("click",function(){
            var trs = $("#alarmSettingTable tbody tr")
            var idx = trs.index($(this).parents("tr"));
            if($(this).hasClass("glyphicon-plus-sign")){
                // $(".checkDetail").removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
                $(this).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
                    // $(".itemDetail").hide();
                if(idx +1 < trs.length){
                    trs.eq(idx+1).slideDown(100);
                }
            }else{
                $(this).addClass("glyphicon-plus-sign").removeClass("glyphicon-minus-sign");
                trs.eq(idx+1).hide()
            }
        });
        $("#alarmStatusBtn").find("a[role='menuitem']").on("click",function(){
            var handleStatus = $(this).data("value");
            Modal.confirm("确认要改变该状态？",function(){
                _this.updateHandleStatus(handleStatus);
            })
        });
    },
    copy:function(detailDesc){
        detailDesc.select(); // 选择对象
        document.execCommand("Copy",false,null); // 执行浏览器复制命令
    },
    updateHandleStatus:function(handleStatus,flag){
        var _this = this;
        var serializeJson = $("#addAlarmForm").serializeJson();
            serializeJson.handleStatus = handleStatus;
        cf.send(_this.urls.updateHandleStatus, serializeJson ,
            function (rs) {
                if (processRsp(rs) && !flag) {
                    Modal.success(function(){
                        var isEliminate = cf.getHashQueryString("isEliminate");
                        if(isEliminate == 'true'){
                            location.hash = "#" + "/alert/alertTriggerRecord/main4Elimination";
                        }else {
                            //默认跳到告警列表页
                            location.hash = "#" + "/alert/alertTriggerRecord/main";
                        }

                    },"成功更新!","1500")
                }
            });
    },
    putAlertHandleRecord: function (idx) {
        var _this = this;
        cf.send(_this.urls.alertHandleRecord, {recordId:$("#id").val(),size:20,index:idx},
            function (rs) {
                if (processRsp(rs)) {

                    $("#followUpRecord table").empty();
                    $("#t-followUpRecord").tmpl(rs.data).appendTo('#followUpRecord table');
                    setTimeout(function(){
                        $(".logPopOverBox").mouseover(function(e){
                            console.log("hrer")
                            var height = $(this).find(".logPopOver").height();
                            var width = $(this).find(".logPopOver").width();
                            var pageY = e.pageY;
                            var pageX = e.pageX;
                            var screenY = $("#content").height();
                            if(height+pageY > screenY){
                                $("#content").height(height+pageY);
                            }
                            if(width+pageX > $(window).width()){
                                $(this).find(".logPopOver").css({"left":-(width+pageX-$(window).width())});
                            }
                        }).mouseleave(function(e){
                            $("#content").attr("style",null);
                            $(this).find(".logPopOver").attr("style",null);
                        });
                    },1000)
                    var options = {
                        bootstrapMajorVersion:3,
                        currentPage: rs.data.index,//当前页面
                        numberOfPages: 5,//一页显示几个按钮（在ul里面生成5个li）
                        totalPages:rs.data.pageCount, //总页数
                        onPageClicked:function(event, originalEvent, type, page){
                            _this.putAlertHandleRecord(page);
                        }
                    }
                    if(rs.data.datas.length > 0){
                        $('#pagination').bootstrapPaginator(options);
                    }
                }
            });
    },
    putAlertTriggerRecordDesc: function (idx) {
        var _this = this;
        cf.send(_this.urls.alertTriggerRecordDesc, {recordId:$("#id").val(),size:20,index:idx},
            function (rs) {
                if (processRsp(rs)) {
                    $("#alarmTrigger table").empty();
                    for(var i=0; i<rs.data.datas.length; i++){
                        var triggerDescInfos = rs.data.datas[i];
                        var triggerDate = triggerDescInfos.triggerDate;
                        var riggerDateFormat = cf.formatDate(triggerDate,"yyyy-MM-dd");
                        triggerDescInfos.triggerDate = riggerDateFormat;
                    }
                    $("#t-alarmTrigger").tmpl(rs.data).appendTo('#alarmTrigger table');
                    var options = {
                        bootstrapMajorVersion:3,
                        currentPage: rs.data.index,//当前页面
                        numberOfPages: 5,//一页显示几个按钮（在ul里面生成5个li）
                        totalPages:rs.data.pageCount, //总页数
                        onPageClicked:function(event, originalEvent, type, page){
                            _this.putAlertTriggerRecordDesc(page)
                        }
                    }
                    if(rs.data.datas.length > 0){
                        $('#pagination2').bootstrapPaginator(options);
                    }
                }
            });
    }
}
$(document).ready(function(){
    alarmDetail.init();
    var $table = $('#alarmTable');
    $table.floatThead({
        //debounceResizeMs: 300,
        scrollContainer: function ($table) {
            return $table.closest('.alarmParamList');
        }
    });
})