/**
 * Created by Administrator on 2016/7/28 0028.
 */
var addClient = {
    urls: function () {
    },
    init: function () {
        var _this = this;
        _this.addValidator();
        _this.events();
    },
    events: function () {
        var _this = this;
        //点击充值记录、消费记录、客户账号ID，切换添加的url和title
        $("#titleList li").on("click", function () {
            var idx = $(this).data("index");
            $(".client-add-box").hide().eq(idx).show();

        });
        $(".saveClientBtn").on("click", function (e) {
            var element = e.target;
            $("#addClientForm input,#addClientForm textarea,#addClientForm select").removeAttr("disabled");
            setTimeout(function () {
                $(element).text("保存").attr("id", "saveClientBtn");
            }, 1)
            //$("#addClientForm").submit();
        })

        // //提交表单
        // $(document).delegate('#saveClientBtn','click',function(){
        //    if(_this.addValidator()){
        //        console.log('ok');
        //    };
        // })


    },
    saveClient: function () {
        var id = $("input[name=id]").val();
        var url = window.host + "/clientmgr/client/create.do";
        if (id != null || id > 0) {
            url = window.host + "/clientmgr/client/update.do";
        }
        var isSendWeekReport = $("input[name=isSendWeekReport]");
        if($("input[name=sendWeekReport]").is(':checked')) {
            isSendWeekReport.val("1");
        } else {
            isSendWeekReport.val("0");
        }
        var isSendMonthReport = $("input[name=isSendMonthReport]");
        if($("input[name=sendMonthReport]").is(':checked')) {
            isSendMonthReport.val("1");
        } else {
            isSendMonthReport.val("0");
        }
        cf.send(url, $("#addClientForm").serializeJson(),
            function (rs) {
                if (processRsp(rs, $('#addClientForm'))) {
                    Modal.success(function () {
                        window.location.hash = "#" + window.host + "/clientmgr/client/main";
                    }, "成功添加！", 1500);
                }
            });
    },
    addValidator: function () {
        var _this = this;
        $("#addClientForm").validate()
            .notEmpty(['name', 'linkmanName', 'email', 'mobileNo', 'clientMgrId','profession'])
            .numeric("tax")
            .min("tax", 0).max("tax", 1)
            .mobileNo('mobileNo').email("email").website('website').lengthMax('website', 256)
            .build('#saveClientBtn', function () {
                _this.saveClient();
            });
    }
}
$(document).ready(function () {
    addClient.init();
})