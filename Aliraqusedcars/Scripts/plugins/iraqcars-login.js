var 
    lgManager = function () {
        // variables 
        var $userN = $('#username'),
            $password = $('#password'),
            $email = $("#email"),
            $phone = $("#phone"),
            $btnLogin = $(".btnLogin"),
            serviceurl = "/api/data.aspx/",
            $sendMail = $('#email-form'),
            $btnMail = $sendMail.find('input[type=submit]'),
            $sendsms = $('#sms-form'),
            $btnsms = $sendsms.find('input[type=submit]'),


            // methods
            init = function () {
                focusControl();

                initProperties();

                loginEvents();
            },
            loginEvents = function () {
                $sendMail.submit(function (e) {
                    e.preventDefault();
                    enableControl($btnMail, false);
                    var _email = $email.val();
                    if (_email !== "") {
                        var dto = JSON.stringify({
                            "email": _email
                        }),
                        url = serviceurl + "forgetpassword";
                        dataService.callAjax('Post', dto, url, PassSuccess, failException)
                    }
                    enableControl($btnMail, true)
                });

                $sendsms.submit(function (e) {
                    e.preventDefault();
                    enableControl($btnsms, false);
                    var _phone = $phone.val();
                    if (_phone !== "") {
                        showMessage('warning', 'الخدمة غير مفعلة', 'سوف يتم تفعيل خدمة رسائل الجوال قريباً.')
                    }
                    enableControl($btnsms, true)
                });

                $userN.on("keypress", function (e) {
                    if (e.which === 13) {
                        e.preventDefault();
                        $password.focus()
                    }
                });

                $password.keypress(function (e) {
                    var isValid = $(this).closest('form').valid();
                    if (isValid) {
                        enableControl($btnLogin, false);
                        if (e.which === 13) {
                            e.preventDefault();
                            userLogin()
                        }
                    }
                });

                $btnLogin.on('click', function (e) {
                    var isValid = $(this).closest('form').valid();
                    if (isValid) {
                        enableControl($btnLogin, false);
                        e.preventDefault();
                        userLogin()
                    }
                });

                $('.logo').mouseover(function () {
                    $(this).addClass('pullDown').removeClass('tossing');
                    $(this).dequeue()
                });
            },
            initProperties = function () {

                $('form').each(function () {
                    $(this).validate({
                        showErrors: function (errorMap, errorList) {
                            $.each(this.validElements(), function (index, element) {
                                var $element = $(element);
                                $element.data("title", "").removeClass("error").tooltip("destroy")
                            });
                            $.each(errorList, function (index, error) {
                                var $element = $(error.element);
                                $element.tooltip("destroy").data("title", error.message).addClass("error").tooltip()
                            })
                        },
                    })
                });

                var toggleLogo = function () {
                    var $this = $('img.logo');
                    if ($this.hasClass('pullDown')) {
                        $this.removeClass('pullDown').addClass('tossing');
                        $(this).dequeue()
                    } else {
                        $this.addClass('pullDown').removeClass('tossing');
                        $(this).dequeue()
                    }
                };

                setInterval(function () {
                    toggleLogo()
                }, 10000);

                // go to top icon
                (function ($) {
                    $.fn.UItoTop = function (options) {
                        var defaults = {
                            text: 'To Top',
                            min: 200,
                            inDelay: 600,
                            outDelay: 400,
                            containerID: 'toTop',
                            containerHoverID: 'toTopHover',
                            scrollSpeed: 1200,
                            easingType: 'linear'
                        },
                            settings = $.extend(defaults, options),
                            containerIDhash = '#' + settings.containerID,
                            containerHoverIDHash = '#' + settings.containerHoverID;

                        $('body').append('<a href="#" id="' + settings.containerID + '">' + settings.text + '</a>');
                        $(containerIDhash).hide().on('click.UItoTop', function () {
                            $('html, body').animate({ scrollTop: 0 }, settings.scrollSpeed, settings.easingType);
                            $('#' + settings.containerHoverID, this).stop().animate({ 'opacity': 0 }, settings.inDelay, settings.easingType);
                            return false;
                        })
                        .prepend('<span id="' + settings.containerHoverID + '"></span>')
                        .hover(function () {
                            $(containerHoverIDHash, this).stop().animate({
                                'opacity': 1
                            }, 600, 'linear');
                        }, function () {
                            $(containerHoverIDHash, this).stop().animate({
                                'opacity': 0
                            }, 700, 'linear');
                        });

                        $(window).scroll(function () {
                            var sd = $(window).scrollTop();
                            if (typeof document.body.style.maxHeight === "undefined") {
                                $(containerIDhash).css({
                                    'position': 'absolute',
                                    'top': sd + $(window).height() - 50
                                });
                            }
                            if (sd > settings.min)
                                $(containerIDhash).fadeIn(settings.inDelay);
                            else
                                $(containerIDhash).fadeOut(settings.Outdelay);
                        });
                    };
                })(jQuery);

                //
                $().UItoTop({
                    easingType: 'easeOutQuart'
                });
            },
            focusControl = function () {
                $userN.focus()
            },
            showMessage = function (type, title, message) {
                type = type !== undefined ? type : 'warning';
                $('.alert-message').html('<div class="alert alert-' + type + '"><strong>' + title + '</strong>: ' + message + '</div>')
            },
            enableControl = function (ctrl, isEnabled) {
                if (isEnabled) ctrl.removeAttr("disabled");
                else ctrl.prop("disabled", isEnabled)
            },
            clientLoggedIn = function (name, childsNo) {
                // show client name
                checkLoginSuccess(name);

                $('#loginModal').modal('hide');

                var newurl = '/client/dashboard';
                if (childsNo > 0) { // has a children accounts.
                    newurl = '/client/accounts';
                }

                window.location.href = newurl;
            },
            loginSuccess = function (data) {
                if (!data.d.Status) {
                    showMessage('danger', 'خطأ', messagesAr.loginError)
                } else {
                    showMessage('success', 'تهانينا', messagesAr.loginSuccess);
                    clientLoggedIn(data.d.Name, data.d.Childs)
                }
            },
            failException = function (jqXhr, textStatus, errorThrown) {
                var title = textStatus + ": " + errorThrown;
                var message = JSON.parse(jqXhr.responseText).Message;
                showMessage('danger', title, message)
            },
            userLogin = function () {
                var pass = $password.val(),
                    _user = $userN.val();


                if (_user !== "" && pass !== "") {
                    var dto = JSON.stringify({
                        "text1": _user,
                        "text2": pass
                    }),
                       url = serviceurl + "login";


                    dataService.callAjax('Post', dto, url, loginSuccess, failException)
                } else {
                    showMessage('warning', 'حقول مطلوبة', messagesAr.loginRequired)
                }
            },
            PassSuccess = function (data) {
                if (!data.d.Status) {
                    showMessage('danger', 'خطأ', messagesAr.forgetError)
                } else {
                    showMessage('success', 'تهانينا', messagesAr.forgetSuccess)
                }
            };


        return {
            init: init
        };

    }();


// 
lgManager.init();