/**
 * Created by Administrator on 2016/8/4 0004.
 */

function loadPage(index) {
    $.post('list', {
        index: index
    }, function (data) {
        $("#tableDiv").html(data);
        //绑定分页事件
        bindPageEvent("tableDiv", loadPage);
    });
}
$(document).ready(function () {
    //加载分页数据
    //绑定查询按钮事件
    $("#queryButton").click(function () {
        loadPage(1);
    });
    //加载第一页
    loadPage(1);
});
