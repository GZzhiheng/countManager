(function ($) {
    // plugin definition
    $.fn.validate = function () {
        this._validatorBuilder = {
            context: null,
            getContext: function () {
                return context;
            },

            bvConfig: {
                message: '此字段值无效',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {},
                submitButtons: "",
                submitHandler: null
                // function(validator, form, submitButton) {
                // console.log(form);
                // }
            },

            init: function (context) {
                this.context = context;
            },

            build: function (submitButtons, submitHandler) {
                this.bvConfig.submitButtons = submitButtons;
                this.bvConfig.submitHandler = submitHandler;
                return this.context.bootstrapValidator(this.bvConfig);
            },


            /**
             * 添加单个验证器
             */
            add: function (validator, field, config, message) {
                if (!field || field.length == 0) {
                    return this;
                }
                var fieldValidators = this.bvConfig.fields[field];
                if (!fieldValidators) {
                    fieldValidators = {
                        validators: {}
                    };
                    this.bvConfig.fields[field] = fieldValidators;
                }
                if (typeof config == 'string') {
                    fieldValidators['validators'][validator] = {
                        message: config
                    };
                } else {
                    fieldValidators['validators'][validator] = config;
                }
                return this;
            },
            remote: function (field, url, message, data) {
                return this.add('remote', field, {
                    url: url,
                    message: message,
                    data: function (validator) {
                        var dt = {};
                        if (data) {
                            $.extend(dt, data);
                        }
                        dt['value'] = validator.getFieldElements(field).val();
                        return dt;
                    }
                })
            },

            /**
             * 验证多个字段是否为空
             */
            notEmpty: function (field, fieldName) {
                var fieldArr = null;
                if ($.isArray(field)) {
                    fieldArr = field;
                } else {
                    fieldArr = [field];
                }
                var fieldNameArr = null;
                if ($.isArray(fieldName)) {
                    fieldNameArr = fieldName;
                } else {
                    fieldNameArr = [fieldName];
                }
                for (var i = 0; i < fieldArr.length; i++) {
                    var f = fieldArr[i];
                    var fn = "";
                    if (i < fieldNameArr.length) {
                        fn = fieldNameArr[i];
                    }
                    if (!fn) {
                        fn = "此项";
                    }
                    this.add("notEmpty", f, fn + "不能为空", fn + "不能为空");
                }

                return this;
            },
            /**
             * 验证数值类型
             */
            numeric: function () {
                for (var i = 0; i < arguments.length; i++) {
                    var f = arguments[i];
                    this.add("numeric", f, "请填数值类型数据", "请填数值类型数据");
                }
                return this;
            },
            max: function (field, value) {
                return this.add("lessThan", field, {
                    message: "字段值不能大于" + value,
                    value: value
                });
            },
            min: function (field, value) {
                return this.add("greaterThan", field, {
                    message: "该字段大小不能小于" + value,
                    value: value
                });
            },
            /**
             * 验证字段是否有效的电话号码
             */
            tel: function (field) {
                return this.add("regexp", field, {
                    regexp: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
                    message: "电话号码格式错误"
                });
            },
            regexp: function (field, regexp, msg) {
                return this.add("regexp", field, {
                    regexp: regexp,
                    message: msg || "字段格式不正确"
                });
            },
            /**
             * 验证字段是否有效的手机号码
             */
            mobileNo: function (field) {
                return this.add("regexp", field, {
                    regexp: /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i,
                    message: "手机号码格式错误"
                });
            },
            /**
             * 验证网址是否正确
             */
            website: function (field) {
                var strRegex =  /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/;
                var re = new RegExp(strRegex);
                return this.add("regexp", field, {
                    regexp: re,
                    message: "无效的网站地址格式"
                });
            },
            /**
             * 验证备注字段
             */
            remark: function (field, length) {
                if (!length) {
                    length = 256;
                }
                return this.add("stringLength", field || "remark", {
                    message: "备注长度不能超过" + length,
                    max: length
                });
            },
            /**
             * 验证字段长度是否满足
             */
            length: function (field, min, max) {
                return this.add("stringLength", field, {
                    message: "长度需在" + min + "和" + max + "之间",
                    min: min,
                    max: max
                })
            },
            /**
             * 验证字段最短是否满足
             */
            lengthMin: function (field, min) {
                return this.add("stringLength", field, {
                    message: "长度需大于等于" + min + "个字符串",
                    min: min
                })
            },
            /**
             * 验证字段最长是否满足
             */
            lengthMax: function (field, max) {
                return this.add("stringLength", field, {
                    message: "长度需小于等于" + max + "个字符串",
                    max: max
                })
            },
            /**
             * 验证字段是否为email格式
             */
            email: function (field) {
                return this.add("emailAddress", field, "电子邮箱格式错误");
            },
            /**
             * 设置字段的开始验证的长度
             */
            threshold: function (field, length) {
                if (!field || field.length == 0) {
                    return this;
                }
                var fieldValidators = this.bvConfig.fields[field];
                if (!fieldValidators) {
                    fieldValidators = {
                        validators: {}
                    };
                    this.bvConfig.fields[field] = fieldValidators;
                }
                fieldValidators['threshold'] = length;
                return this;
            },
            /**
             * 密码确认
             */
            pwdconfirm: function (pwdfield, confirmfield) {
                return this.add('callback', confirmfield, {
                    message: '两次密码输入不一致',
                    callback: function (value, validator) {
                        var pwd = validator.getFieldElements(pwdfield)
                            .val();
                        if (pwd.length == 0) {
                            return true;
                        }
                        if (pwd !== value) {
                            return false;
                        }
                        return true;
                    }
                });
            },
            callback: function (field, fn, message) {
                return this.add('callback', field, {
                    message: message,
                    callback: fn
                });
            }
        };
        this._validatorBuilder.init(this);
        return this._validatorBuilder;
    };
    // ...
})(jQuery);