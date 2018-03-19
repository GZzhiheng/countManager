/**
 * Created by zengjie on 2016/8/31 0031.
 */

/**
 * 报表筛选元素关联数据填充
 *
 * extFun 扩展方法
 */
function reportConditionConnect(mgrField, clientField, accountField, extFun) {
    var loadClients = function () {
        var val = $(mgrField).val();
        var $client = $(clientField);
        $client.empty().append('<option value="">选择客户</option>');
        $.get(window.host + '/clientmgr/client/listUserClient', {userId: val}, function (rs) {
            if (processRsp(rs)) {

                for (var i = 0; i < rs.data.length; i++) {
                    var client = rs.data[i];
                    $client.append('<option value="' + client.id + '">' + client.no + '/' + client.name + '</option>')
                }
                if(extFun) {
                    extFun();
                }
            }
        }, 'JSON');
        $client.trigger('change');
    }
    $(mgrField).change(function () {
        loadClients();
    });
    if (accountField) {
        $(clientField).change(function () {
            var val = $(this).val();
            var $account = $(accountField);
            $account.empty().append('<option value="">选择账号</option>');
            if (val.length > 0) {
                $.get(window.host + '/clientmgr/clientAccount/select', {clientId: val}, function (rs) {
                    if (processRsp(rs)) {
                        for (var i = 0; i < rs.data.length; i++) {
                            var ac = rs.data[i];
                            $account.append('<option value="' + ac.id + '">' + ac.account + "/" + ac.name + '</option>')
                        }
                    }
                }, 'JSON');
            }
        });
    }
    loadClients();
};