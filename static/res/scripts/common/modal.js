/**
 * Created by zengjie on 16/7/7.
 */
var Modal = {};
(function ($) {
    //处理boostrap modal 关于存在滚动条时的BUG
    function clearBodypad() {
        $("body").css("padding-right", "0");
    }

    function insertContent(modal, content) {
        if (!content) {
            return;
        }
        var inserted = false;
        try {
            var $content = $(content);
            if ($content.length > 0) {
                if ($content.hasClass('modal-content')) {
                    modal.find('.modal-content').empty().append($content.contents());
                    inserted = true;
                } else if ($content.hasClass('modal-body')) {
                    modal.find('.modal-body').empty().append($content.contents());
                    inserted = true;
                }
            }
        } catch (e) {
            //JQuery会把当做表达式选择器可能会报错
        }
        if (!inserted) {
            modal.find('.modal-body').empty().append("<div style='word-break: break-all'>" + content + "</div>");
        }
    }

    var showModal = function (modal, content, callback) {
        if (!modal.data('modal_shown')) {
            $('body').append(modal);
            modal.modal({backdrop: 'static', keyboard: false}).show();
            modal.data('modal_shown', true);
        }
        insertContent(modal, content);
        var focus = modal.find('input[focus=true],select[focus=true],textarea[focus=true] :eq(0)');
        if (focus.length > 0) {
            focus.focus();
        }
        if ($.isFunction(callback)) {
            callback.call(modal, modal);
        }
    };


    var loadModalContent = function (modal, url, callback) {
        modal.data('url', url);

        if (url.indexOf('sel:') == 0) {
            var sel = url.substring(4);
            var content = $(sel);
            if (content.length == 0) {
                return;
            }
            content = content.clone();
            content.css('display', 'block');
            showModal(modal, content, callback);
            return;
        }
        var req = $.ajax({
            url: url, dataType: 'html', type: 'get', success: function (rs) {
                showModal(modal, rs, callback);
            }, complete: function () {
                modal.removeData("request");
            }
        });
        modal.data("request", req);
    };

    var getModal = function (tmp) {
        var modal = $(tmp);

        modal.on('hidden.bs.modal', function () {
            modal.data('modal_shown', false);
            //取消当前模态框的请求
            var req = modal.data('request');
            if (req) {
                req.abort();
            }
            modal.remove();
            //以".modal-backdrop"和".modal"两个类判断是否存在modal弹框
            if (document.querySelector(".modal-backdrop") && document.querySelector(".modal")) {
                if (!$("body").hasClass("modal-open")) {
                    $("body").addClass("modal-open");
                }
            }
            //处理boostrap modal 关于存在滚动条时的BUG
            clearBodypad();
        });
        return modal;
    };
    /**
     * 初始化加载当前选择器输入的UI,可以是JQuery对象,html文本,dom元素,然后绑定a标签事件,如果不传入选择器默认选择body
     * @param selector
     * @returns {*|HTMLElement} 返回选择器或HTML的JQuery对象
     */
    (function () {
        var eventHandler = function (e) {
            var $this = $(e.target);
            if (!$this.is('a')) {
                // $this = $(e.delegateTarget);
                $this = $this.parents('a');
            }
            var href = $this.attr('href');
            if ($.isEmptyObject(href) || href.indexOf('javascript:') == 0 || href.indexOf('#') == 0) {
                return;
            }
            var target = $this.attr('target');
            var bindState = function ($this, modal) {
                if (!modal) {
                    $this.data('modal-presented', false);
                } else {
                    modal.on('hide.bs.modal', function () {
                        $this.data('modal-presented', false);
                        //处理boostrap modal 关于存在滚动条时的BUG
                        clearBodypad();
                    });
                }
            }
            if (target === 'modal') {
                e.preventDefault();
                if ($this.data('modal-presented')) {
                    return;
                }
                var modal;
                if ($this.attr('modal-title')) {
                    modal = Modal.show($this.attr('modal-title'), $this.attr('href'), $this.attr('modal-size'), $this.attr('modal-width'), $this.attr('modal-bodyClass'));
                } else {
                    modal = Modal.show($this.attr('title'), $this.attr('href'), $this.attr('modal-size'), $this.attr('modal-width'), $this.attr('modal-bodyClass'));
                }
                bindState($this, modal);
            }
            else if (target === 'confirm') {
                e.preventDefault();
                if ($this.data('modal-presented')) {
                    return;
                }
                var success = $this.attr('success');
                var modal = Modal.confirm($this.attr('title'),
                    function () {
                        $.ajax({
                            url: href,
                            type: 'POST',
                            dataType: 'json',
                            success: function (rs) {
                                if (processRsp(rs)) {
                                    Modal.success(function () {
                                        if (!$.isEmptyObject(success)) {
                                            window.eval(success);
                                        }
                                    });
                                }
                            }
                        })
                    });
                bindState($this, modal);
            }
        }
        $('body').delegate('a[target][href]', 'click', eventHandler);
        $('body a[target][href]').click(eventHandler);
        Modal.initUI = function (element) {
            var $el = $(element);
            $el.find('a[target][href]').click(eventHandler);
            return $el;
        }
    })();
    /**
     * 弹出摸态框,加载指定url里面的数据到摸态框的.modal-body内
     * @param title
     * @param url
     */
    Modal.show = function (title, url, size, width, bodyClass, callback) {
        if (!url || url.length == 0) {
            return;
        }
        var example = "", sizec = "";
        if (size) {
            example = 'bs-example-modal-' + size;
            sizec = 'modal-' + size;
        }
        var template = '<div class="modal fade ' + example + '" tabindex="-1" role="dialog"' +
            'aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog ' + sizec + '" role="document">' +
            '<div class="modal-content"><div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"' +
            'aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">' + (title || '') + '</h4>' +
            '</div>' +
            '<div class="modal-body ' + bodyClass + '"></div>' +
            '</div>' +
            '</div>';
        var modal = getModal(template);
        if (width) {
            // modal.css('width', width);
            modal.find('.modal-dialog').css('width', width);
        }
        loadModalContent(modal, url, callback);
        return modal;
    };
    /**
     * 根据一段html内容或者DOM|JQUERY对象弹出Modal
     * @param content
     * @param title
     * @param size
     * @param width
     * @param bodyClass
     */
    Modal.showContent = function (content, title, size, width, bodyClass) {
        var example = "", sizec = "";
        if (size) {
            example = 'bs-example-modal-' + size;
            sizec = 'modal-' + size;
        }
        var template = '<div class="modal fade ' + example + '" tabindex="-1" role="dialog"' +
            'aria-labelledby="myModalLabel">' +
            '<div class="modal-dialog ' + sizec + '" role="document">' +
            '<div class="modal-content"><div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"' +
            'aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">' + (title || '') + '</h4>' +
            '</div>' +
            '<div class="modal-body ' + (bodyClass || '') + '"></div>' +
            '</div>' +
            '</div>';
        var modal = getModal(template);
        if (width) {
            // modal.css('width', width);
            modal.find('.modal-dialog').css('width', width);
        }
        showModal(modal, content);
        return modal;
    }
    /**
     * 弹出确认框
     * @param msg
     * @param okCallback
     * @param cancelCallback
     */
    Modal.confirm = function (msg, okCallback, cancelCallback) {
        var modal = getModal('<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="clearfix">' +
            '<button type="button" style="padding:2px;" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p class="text-left">' + (msg || '') + '</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">取消</button>' +
            '<button type="button" class="btn btn-primary ok">确定</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
        modal.find('.cancel').click(function () {
            modal.modal('hide');
            if ($.isFunction(cancelCallback)) {
                cancelCallback.call(modal);
            }
        });
        modal.on('hidden.bs.modal', function () {
            //处理boostrap modal 关于存在滚动条时的BUG
            clearBodypad();
        });
        modal.find('.ok').click(function () {
            modal.modal('hide');
            if ($.isFunction(okCallback)) {
                okCallback.call(modal);
            }
        });
        modal.modal('show');
        return modal;
    };
    /**
     * 操作成功提示
     * @param onok 点击确认后执行
     * @param msg
     */
    Modal.success = function (onok, msg, timeout, size) {
        if (!msg || msg.length == 0)
            msg = "操作成功";
        if (timeout !== false && !timeout)
            timeout = 3000;
        Modal.tips(msg, 'success', onok);
    };
    /**
     * 普通提示摸态框弹出
     * @param msg
     */
    Modal.showMsg = function (msg) {
        var modal = getModal('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
            + '<div class="modal-dialog modal-sm" role="document">'
            + '<div class="modal-content">'
            + '<div class="modal-body"></div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-primary ok" hidden data-dismiss="modal">确定</button>'
            + '</div></div></div>');
        if (msg) {
            msg = msg.split('\n').join('<br/>');
        }
        modal.find(".modal-body").html("<div style='word-break:break-all'>" + msg + "</div>");
        modal.modal('show');
        modal.on('hide.bs.modal', function () {
            //处理boostrap modal 关于存在滚动条时的BUG
            clearBodypad();
        });
        return modal;
    };
    /**
     * refer Modal.showMsg
     * @type {Modal.showMsg|*}
     */
    Modal.msg = Modal.showMsg;
    /**
     * 轻量级浮动消息提醒
     * @param msg
     * @param alertClass
     */
    Modal.tips = function (msg, alertClass, cb) {
        alertClass = (alertClass || 'success');
        var icon = 'glyphicon-ok';
        if (alertClass == 'warning') {
            icon = 'glyphicon-warning-sign';
        } else if (alertClass == 'error') {
            icon = 'glyphicon-remove';
        } else if (alertClass == 'default') {
            icon = 'glyphicon-info-sign';
        }
        var alert = $('<div class="t-alert alert ng-isolate-scope alert-' + alertClass + ' alert-dismissible"role="alert">'
            + '<button type="button" class="close"aria-hidden="false">'
            + '<span aria-hidden="true">×</span>'
            + '<span class="sr-only">Close</span>'
            + '</button>'
            + '<div><span class="glyphicon ' + icon + '" aria-hidden="true"></span>&nbsp;&nbsp;<span class="ng-binding ng-scope">' + msg + '</span></div>'
            + '</div>');
        if ($(".t-alertBox", 'body').length <= 0) {
            var alertBoxHTML = '<div class="t-alertBox"></div>';
            $("body").append($(alertBoxHTML).append(alert));
        } else {
            $(".t-alertBox").append(alert);
        }
        if ($.isFunction(cb)) {
            cb();
        }
        $(".t-alertBox").on("click", ".close", function () {
            $(this).parents(".alert").slideUp(300, function () {
                $(this).remove();
            })
        });
        setTimeout(function () {
            alert.slideUp(300, function () {
                $(this).remove();
            })
        }, 2500);
    }

    /**
     * JQuery 模态扩展,如果当前对象或者子对象为从URL里面加载的modal，则通过URL重新加载刷新modal内容
     * @returns {jQuery}
     */
    $.fn.reloadModal = function () {
        var modal;
        if (this.hasClass('modal')) {
            modal = this;
        } else {
            modal = this.parents('.modal');
        }
        var url = modal.data('url');
        if (url && url.length > 0) {
            loadModalContent(modal, url);
        }
        return this;
    };
    /**
     * 关闭当前模态框
     * @returns {*}
     */
    $.fn.closeModal = function () {
        if (this.length == 0) {
            return this;
        }
        if (this.hasClass('modal')) {
            this.modal('hide');
            return this;
        }
        return this.parents('.modal').modal('hide');
    }
})(jQuery);
