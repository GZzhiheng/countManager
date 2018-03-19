/**
 * Created by Administrator on 2016/9/7 0007.
 */
var alarmSettingDetail = {
    urls:{
        queryDetailItemList: window.host + '/alert/alertSettingItem/queryDetailItemList.json',//遍历告警项列表
        update:window.host + "/alert/alertSettingDetail/update.do",//编辑告警详情
        create:window.host + "/alert/alertSettingDetail/create.do",//添加告警
        dltItem:window.host + "/alert/alertSettingItem/delete.do"//删除告警项
    },
    init:function(){
        var _this = this;
        if (!_this.isUpdate()) {
            $("#alarmSettingForm input,#alarmSettingForm textarea,#alarmSettingForm select").removeAttr("disabled");
            setTimeout(function () {
                $(".saveAlarmSettingBtn").text("保存").attr("id", "saveAlarmSettingBtn");
            }, 1);
            $(".alarmTitle").text("添加告警设置");
            $(".alarmTableBox").hide();
        }else{
            _this.queryDetailItemList();
        }
        _this.events();
        _this.alarmDetailValidate();

    },
    events:function(){
        var _this = this;
        $("#status").change(function(){
           var statusVal = this.value;
            if(statusVal==0){ Modal.showMsg("设置为停用状态，将会导致告警列表相应的数据不再展示!");}
        });


        $(".saveAlarmSettingBtn").on("click",function(e){
            $("#alarmSettingForm input,#alarmSettingForm textarea,#alarmSettingForm select").removeAttr("disabled");
            setTimeout(function () {
                $(e.target).text("保存").attr("id", "saveAlarmSettingBtn");
            }, 1);
        })
        $("#alarmTable").on("click",".dltItem",function(e){
            _this.dltItem(e.target);
        });
    },
    isUpdate:function(){
        var check = $.isEmptyObject(cf.getHashQueryString("id")) ? false : true;
        return check;
    },
    saveAlarm:function(){
        var _this = this;
        var alarmSettingJSON = $("#alarmSettingForm").serializeJson();
        var url = '';
        if(_this.isUpdate()){
            alarmSettingJSON.id = cf.getHashQueryString("id");
            url = _this.urls.update;
        }else{
            url = _this.urls.create;
        }
        cf.send(url, alarmSettingJSON,
            function (rs) {
                if (processRsp(rs, $('#alarmSettingForm'))) {
                    Modal.success(function () {
                        window.location.hash = "#"+ window.host +"/alert/alertSettingDetail/main";
                    }, "操作成功！", 1500);
                }
            });
    },
    alarmDetailValidate:function(){
        var _this = this;
        $("#alarmSettingForm").validate()
            .notEmpty(['alertName', 'notifyType', 'urgentStatus', 'alertMsg'])
            .build('#saveAlarmSettingBtn', function () {
                _this.saveAlarm();
            });
    },
    queryDetailItemList:function(){
        var _this = this;
        cf.send(_this.urls.queryDetailItemList, {detailId:cf.getHashQueryString("id")},
            function (rs) {
                if (processRsp(rs)) {
                    $("#alarmTable tbody").empty();
                    $("#t-alarmItem").tmpl(rs).appendTo('#alarmTable tbody');
                }
            });
    },
    dltItem:function(obj){
        var _this = this;
        Modal.confirm("确认删除该项？",
            function () {
                cf.send(_this.urls.dltItem, {id:$(obj).attr("data-id")},
                    function (rs) {
                        if (processRsp(rs)) {
                            Modal.success(function () {
                                _this.queryDetailItemList();
                            }, "成功删除！", 1500);
                        }
                    });
            });

    }
}

$(document).ready(function(){
    alarmSettingDetail.init();
})