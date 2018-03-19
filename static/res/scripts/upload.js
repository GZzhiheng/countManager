/**
 * Created by Administrator on 2016/11/2 0002.
 */
$(document).ready(function () {
    $("#uploadify").on("change",function(){
        console.log(document.getElementById("uploadify").value);
       $("#filePath").val(document.getElementById("uploadify").value);
    })
    $("#uploadify").uploadify({
        'buttonClass':'btn-primary',
        'method':'post',
        'swf': window.host+'/res/scripts/uploadify/uploadify.swf',
        'fileObjName' : 'file',
        'uploader':'cf.urls.multipartGoodsZip',
        'formData':{name:$("#moduleName").val()},
        'queueID' : 'fileQueue', //和存放队列的DIV的id一致
        'auto'  : false, //是否自动开始
        'multi': false, //是否支持多文件上传
        'buttonText': '选择文件', //按钮上的文字
        'simUploadLimit' : 1, //一次同步上传的文件数目
        'progressData' : 'all',
        'removeTimeout': 0.3,
        'fileSizeLimit' : '9000000KB',//限制的大小要转换成KB否则容易报错，这里是总共的大小，不是单个文件的(100M)
        'queueSizeLimit' : 1, //队列中同时存在的文件个数限制
        'fileTypeExts': '*.zip',//允许的格式
        'fileTypeDesc': '所有文件', //如果配置了以下的'fileExt'属性，那么这个属性是必须的
        'onClearQueue' : function(queueItemCount) {
            //alert(' file(s) were removed from the queue'+queueItemCount);
        },

        'onUploadSuccess': function (fileObj, data ,response) {

        },
        'onUploadError': function(file) {
            console.log("文件:" + file.name + "上传失败");
        },
        'onCancel': function(file){
            console.log("取消了" + file.name);
        }
    });
});