/**
 * Created by Administrator on 2016/9/7 0007.
 */
var alarmDetail = {
    urls:{
        alertHandleRecord : window.host+"/alert/alertHandleRecord/list.json",//跟进记录list
        alertTriggerRecordDesc : window.host +"/alert/alertTriggerRecordDesc/list.json",//触发告警list
        updateReplyStatus : window.host +"/enquiry/list/reply.do"
    },
    init:function(){
        var _this = this;
        // _this.putAlertHandleRecord(1);
        // _this.putAlertTriggerRecordDesc(1);
        _this.events();
    },
    events:function(){
        var _this = this;
        $("#alarmStatusBtn").find("a[role='menuitem']").on("click",function(){
            var detailId = $("#detailId").val();
            Modal.confirm("确认要改变该状态？",function(){
                _this.updateReplyStatus(detailId);
            })
        });
    },
    copy:function(detailDesc){
        detailDesc.select(); // 选择对象
        document.execCommand("Copy",false,null); // 执行浏览器复制命令
    },
    updateReplyStatus:function(detailId,flag){
        var _this = this;
        var serializeJson = $("#addAlarmForm").serializeJson();
            serializeJson.id = detailId;
        cf.send(_this.urls.updateReplyStatus, serializeJson ,
            function (rs) {
                if (processRsp(rs) && !flag) {
                    Modal.success(function(){
                        //默认跳到告警列表页
                        location.hash = "#" + "/enquiry/list/main";

                    },"成功更新!","1500")
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