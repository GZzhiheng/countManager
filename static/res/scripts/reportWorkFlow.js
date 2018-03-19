/**
 * Created by Administrator on 2017/2/17 0017.
 */
var reportWorkFlow = {
    urls:{
        reportWFList:window.host+'/report/reportWorkFlow/list'
    },
    init:function(){
        //读取保留的查询数据
        $("#reportWorkFlowForm").find("select").each(function(){
            var reportWorkFlowData = JSON.parse(localStorage.getItem("reportWorkFlowData"));
            for(var data in reportWorkFlowData){
                if($(this).attr("name") === data){
                    $(this).find("option[value='"+ reportWorkFlowData[data]+"']").attr("selected",true);
                }
            }
        });
        //加载第一页
        if(localStorage.reportWorkFlowData){
            this.loadReportWorkFlow();
        }else{
            this.loadReportWorkFlow(1);
        }

        this.events();
    },
    events:function(){
        var _this = this
        $("#reportWorkFlowForm").submit(function () {
            var $this = $(this);
            _this.loadReportWorkFlow(1);
            //保留查询条件，查询条件保留在localStorage里面；之后根据hashCode的变化是否清除此查询条件，清除代码写在config里
            var reportWorkFlowData = {};
            $this.find("select").each(function(){
                reportWorkFlowData[$(this).attr("name")] = $(this).val();
            });
            localStorage.setItem("reportWorkFlowData", JSON.stringify(reportWorkFlowData));

            return false;
        });
    },
    loadReportWorkFlow:function(index){
        var _this = this;
        var param = $("#reportWorkFlowForm").serializeJson();
        if(index){
            param['index'] = index;
        }
        $.post(_this.urls.reportWFList, param, function (data) {
            $("#table-box").html(data);
            //绑定分页事件
            bindPageEvent("table-box", _this.loadReportWorkFlow);
        });
    }
}
$(document).ready(function () {
    reportWorkFlow.init();
});