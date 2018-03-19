function showLpUploadImage(value) {
    Modal.showContent("<div class=' width100'><img class='img-responsive center-block' src='" + value + "'/></div>", "查看图片", "lg");
}

(function ($) {

    var imagePreview = function (obj, preview) {
        var timestamp = $(obj).data("timestamp");
        var setData = function (data) {
            if ($(obj).data("timestamp") != timestamp) {
                return;
            }
            preview.src = data;
        }
        if (window.FileReader) {//chrome,firefox7+,opera,IE10,IE9，IE9也可以用滤镜来实现
            oFReader = new FileReader();
            oFReader.readAsDataURL(obj.files[0]);
            oFReader.onload = function (oFREvent) {
                setData(oFREvent.target.result)
            };
            return;
            //判断ie
        } else {
            if (navigator.userAgent.indexOf("Firefox") >= 1) {
                if (obj.files) {
                    setData(window.URL.createObjectURL(obj.files.item(0)))
                    return;
                }
                setData(obj.value);
                return;
            } else if (navigator.userAgent.indexOf("Chrome") >= 1) {// Chrome
                setData(window.URL.createObjectURL(obj.files.item(0)))
                return;
            }
        }
        setData(obj.value);
    }

    var Container = function (onChange) {
        this.fields = [];
        this.fieldMap = {};
        this.onChange = onChange;
    };
    Container.prototype.add = function (field) {
        var $field = $(field), name = $field.data('name');
        if ($field.data('skip-field') == true) {
            return true;
        }
        if (this.fieldMap[name]) {
            return false;
        }
        this.fieldMap[name] = field;
        this.fields.push(field);
        return true;
    }
    //表单字段为空判断
    Container.prototype.validate = function () {
        var valid = true;
        $.each(this.fields, function () {
            var $this = $(this);
            if ($this.data('required') == true) {
                var val = $this.data('value');
                if ($this.find('.cms-field-richtext').length > 0) {
                    //富文本框特殊处理
                    var div = $("<div></div>");
                    div.append(val);
                    if (div.find('img').length > 0) {
                        valid = true;
                    } else {
                        val = $.trim(div.text());
                        if (!val) valid = false;
                    }
                } else {
                    if (!val) valid = false;
                }
                if (!valid) {
                    Modal.showMsg("字段[" + $this.data('display') + "]不能为空");
                    return false;
                }
            }
        });
        return valid;
    }
    Container.prototype.updateValue = function (field, value, suppress) {
        var oldValue = field.data('value'), name = field.data('name');
        field.data('value', value);
        if (field.data('trigger-change') == false) {
            return;
        }
        if (value != oldValue && $.isFunction(this.onChange) && suppress !== true) {
            this.onChange.call(this, value, oldValue);
        }
    }

    window.GLOBAL_RICH_TEXTAREA_SEQ = window.GLOBAL_RICH_TEXTAREA_SEQ || 0;

    $.fn.initCmsFields = function (onChange) {
        return this.each(function () {
            var $field = $(this);
            var container = $field.data('cmsFields');
            if (!container) {
                container = new Container(onChange);
                $field.data('cmsFields', container)
            }
            //图片字段
            $field.find('.cms-field-image').each(function () {
                var $this = $(this);
                if (!container.add($this)) {
                    return;
                }
                if ($this.data('value')) {
                    //显示查看大图、清除图片的按钮
                    $this.find(".uploadBtnBox").show();
                    //初始化时候加载图片
                    $this.find('.uploadLogoBox .uploadImgBox').attr('src', window.host + "/res/download?id=" + $this.data('value'));
                }
                var showError = function (err) {
                    $(".uploadFileInfo", $this).show();
                    $(".uploadFileText", $this).text(err).css('backgroundColor', 'red');
                }
                //清空图片
                $('.clear-image', $this).click(function () {
                    container.updateValue($this, '');
                    var img = $this.find(".uploadLogoBox .uploadImgBox");
                    img.attr("src", img.data("defaultimg"));
                    $(".uploadFileInfo", $this).hide();
                    //标记为已变更
                    $this.parents('.field_form:eq(0)').data('changed', true);
                    //显示查看大图、清除图片的按钮
                    $this.find(".uploadBtnBox").hide();
                });
                $this.find(".checkBigImg").click(function () {
                    var $img = $(this);
                    var value = $this.data('value');
                    if (value) {
                        value = window.host + '/res/download?id=' + value;
                        showLpUploadImage(value);
                    } else if ((value = $img.attr('src')) && value != $img.data('defaultimg')) {
                        showLpUploadImage(value);
                    }
                });
                $this.find('input[type=file]').fileupload({
                    url: window.host + "/cms/common/upload.do",  //文件上传地址，当然也可以直接写在input的data-url属性内
                    type: 'post',
                    dataType: 'json',
                    sequentialUploads: true,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    add: function (e, data) {
                        var file = data.originalFiles[0];
                        if (!/(\.|\/)(gif|jpe?g|png|ico)$/i.test(file.name)) {
                            showError("无效图片文件");
                            return;
                        }
                        if (file.size > 1024 * 1024 * 2) {
                            showError("文件超出大小限制");
                            return;
                        }
                        //设置文件时间
                        data.fileInput.data("timestamp", new Date().getTime());
                        imagePreview(data.fileInput[0], $this.find(".uploadLogoBox img")[0]);
                        var image = new Image();//new一个image对象
                        image.src = $this.find(".uploadImgBox")[0].src;
                        $(".uploadFileProgress", $this).css('backgroundColor', 'rgba(0,128,0,0.4)');
                        $(".uploadFileInfo", $this).show().find(".uploadFileText").text("上传中...").removeAttr('style');
                        setTimeout(function () {
                            data.submit();
                        }, 200)
                    },
                    done: function (e, data) {
                        var result = data.result;
                        if (processRsp(result)) {
                            data.fileInput.data("timestamp", new Date().getTime());
                            var img = result.data;
                            //把内容放到data-value里面
                            container.updateValue($this, img);
                            $this.find(".uploadLogoBox .uploadImgBox").attr("src", window.host + '/res/download?id=' + img);
                            //上传完成后进度条变化
                            $this.find('.progressObj').fadeOut(500, function () {
                                $(this).removeClass("progressbar-sm progress-rounded progress-striped active progress");
                            });
                            //图片上传成功图片框展示效果
                            $(".uploadFileText", $this).text("图片已上传");
                            //显示查看大图、清除图片的按钮
                            $this.find(".uploadBtnBox").show();
                        } else {
                            showError("上传失败");
                        }
                    },
                    progressall: function (e, data) {//进度条
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        $this.find('.uploadFileProgress').css('width', progress + '%');
                    }
                }).bind('fileuploadsubmit', function (e, data) {
                    var width = $this.data('width');
                    var height = $this.data('height');
                    if (width && height) {
                        data.formData = {width: width, height: height};
                    }
                });
            });
            //附件字段
            $field.find('.cms-field-attachment').each(function () {
                var $this = $(this);
                if (!container.add($this)) {
                    return;
                }
                //初始化附件上传模块
                if ($this.attr('data-value')) {
                    $this.find('.btn-list').show();
                    $this.find(".clear-file-input").show();
                }
                //点击清除按钮事件
                $this.find(".clear-file-input").on("click", function () {
                    Modal.confirm('确定删除此附件？', function () {
                        container.updateValue($this, '');
                        //标记为已变更
                        $this.parents('.field_form:eq(0)').data('changed', true);
                        $this.find(".btn-list").hide();
                        $this.find(".clear-file-input").hide();
                    });
                });
                $this.find('input[type=file]').fileupload({
                    url: window.host + "/cms/common/upload_attachment.do",  //文件上传地址，当然也可以直接写在input的data-url属性内
                    type: 'post',
                    dataType: 'json',
                    sequentialUploads: true,
                    //acceptFileTypes: /(\.|\/)(pdf|sxls|xml|zip|rar|gif|jpe?g|png)$/i,
                    add: function (e, data) {
                        var file = data.originalFiles[0];
                        if (file.size > 1024 * 1024 * 5) {
                            Modal.showMsg("附件超出5M大小限制");
                            return;
                        }
                        $this.find('.adtp-progress-bar').show();
                        setTimeout(function () {
                            data.submit();
                        }, 200)
                    },
                    done: function (e, data) {
                        var result = data.result;
                        if (processRsp(result)) {
                            data.fileInput.data("timestamp", new Date().getTime());
                            container.updateValue($this, result.data);
                            //上传完成后进度条变化
                            $this.find('.adtp-progress-bar').fadeOut(1000, function () {
                                $this.find(".btn-list").show();
                                $this.find(".clear-file-input").show();
                                $this.find('.progress-bar').css('width', '0%').hide();
                                $this.find('.file-input-percent').text("0%");
                                var $downloadfile = $this.find(".downloadfile");
                                $downloadfile.attr({
                                    "href": $downloadfile.attr("data-href") + data.result.data,
                                    "title": data.result.data
                                });
                            });
                            Modal.tips('附件上传成功');
                        }
                    },
                    progressall: function (e, data) {//进度条
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        $this.find('.progress-bar').css('width', progress + '%');
                        $this.find('.file-input-percent').text(progress + "%");
                    }
                });
            });
            $field.find(".cms-field-color").each(function () {
                var $this = $(this), $input = $this.find('input[type=text]');
                if (!container.add($this)) {
                    return;
                }
                $input.val($this.data('value'));
                $input.minicolors({
                    control: $this.attr('data-control') || 'hue',
                    defaultValue: $this.attr('data-defaultValue') || '',
                    format: $this.attr('data-format') || 'hex',
                    keywords: $this.attr('data-keywords') || '',
                    inline: $this.attr('data-inline') === 'true',
                    letterCase: $this.attr('data-letterCase') || 'lowercase',
                    opacity: $this.attr('data-opacity'),
                    position: $this.attr('data-position') || 'bottom left',
                    swatches: $this.attr('data-swatches') ? $this.attr('data-swatches').split('|') : [],
                    change: function (value, opacity) {
                        container.updateValue($this, value);
                    },
                    theme: 'bootstrap'
                });
            });
            $field.find('.cms-field-category').each(function () {
                var $this = $(this), $input = $this.find('input[type=text]');
                if (!container.add($this)) {
                    return;
                }
                $input.attr("readonly", "readonly").on('focus', function () {
                    var value = $this.data('value');
                    Modal.show("选择目录", window.host + '/cms/siteCategory/select?siteId=' + $this.data('siteid'), null, null, null, function (modal) {
                        var treeview = this.find('.treeview').treeview(true), nodes = treeview.getEnabled();
                        var doSelect = function (nodes) {
                            for (var i = 0; i < nodes.length; i++) {
                                var node = nodes[i];
                                if (node.id == value) {
                                    treeview.selectNode(node, {silent: true});
                                    return;
                                }
                                if (node.nodes) {
                                    doSelect(node.nodes);
                                }
                            }
                        }
                        doSelect(nodes);
                        this.on('nodeSelected', function (e, node) {
                            container.updateValue($this, node.id);
                            $input.val(node.text);
                            modal.closeModal();
                        });
                        this.on('nodeUnselected', function (e, node) {
                            container.updateValue($this, null);
                            $input.val('');
                            modal.closeModal();
                        });
                    });
                });
                if ($this.data('value')) {
                    $.get(window.host + "/cms/siteCategory/get?id=" + $this.data('value'), function (rs) {
                        if (processRsp(rs)) {
                            if (rs.data) {
                                $input.val(rs.data.name);
                            } else {
                                container.updateValue($this, null, true);
                            }
                        }
                    }, 'JSON')
                }
            });
            $field.find('.cms-field-text').each(function () {
                var $this = $(this);
                if (!container.add($this)) {
                    return;
                }
                var richtext = $this.find('.cms-field-richtext'), host = window.host;
                if (richtext.length > 0) {
                    var tempId = richtext.attr('id');
                    if (!tempId) {
                        tempId = "cms-field-richtext_" + (GLOBAL_RICH_TEXTAREA_SEQ++);
                        richtext.attr('id', tempId);
                        richtext.attr('name', tempId);
                    }
                    var editorConfig = {
                        maximumWords: 4000,
                        initialFrameHeight: 450,
                        //图片上传回调
                        imageUploadCallback: function (serverRsp, success) {
                            if (processRsp(serverRsp)) {
                                success(host + "/res/download?id=" + serverRsp.data);
                            }
                        }
                    };
                    //模态框要加zIndex确保浮动在模态框之上
                    if ($this.parents('.modal').length > 0) {
                        editorConfig.zIndex = 2000;
                    }
                    var editor = UE.getEditor(tempId, editorConfig);

                    editor.addListener('ready', function () {
                        var value = $this.data('value');
                        if (value != null && typeof value != 'undefined') {
                            this.setContent(value + '', false);
                        }
                        this.addListener('contentChange', function () {
                            container.updateValue($this, this.getContent());
                        });
                        this.addListener('beforeExecCommand', function () {
                            debugger;
                        });
                    });

                } else {
                    var $input = $this.find('input[type=text],textarea');
                    $input.val($this.data('value'));
                    var onChange = function () {
                        container.updateValue($this, $input.val());
                    }
                    $input.on('input', onChange);
                }
            });
            $field.find('.cms-field-bool').each(function () {
                var $this = $(this);
                if (!container.add($this)) {
                    return;
                }
                var $input = $this.find('input[type=checkbox]');
                if ($this.data('value')) {
                    $input.prop('checked', $this.data('value'));
                } else {
                    container.updateValue($this, false, true);
                }
                $input.val($this.data('value'));
                var onChange = function () {
                    container.updateValue($this, $input.prop('checked'));
                }
                $input.on('change', onChange);
            });
        });
    }
})(jQuery);