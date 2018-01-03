//#region pages handler
(function () {
    "use strict";
    function InitAllJsPlugins() {
        $(".chzn-select").chosen({ allow_single_deselect: true, no_results_text: "اختـــر" }).on('change', function () {
            if ($(this).attr('required')) { $(this).closest('form').validate().element($(this)); }
        });
        $('[data-rel=tooltip],[data-toggle=tooltip]').tooltip({ container: 'body' });
        $('.tooltip').removeClass('in'); // hide all opened tooltip.
        $('.currency').autoNumeric('init');
        $('.date-picker').datepicker({ autoclose: true });
        $('.current-date').datepicker('setDate', new Date());
        $('.radioList').find('label').addClass('lbl');
        $('.attachments').ace_file_input({
            style: 'well',
            btn_choose: 'اسحب الصور هنا ، أو انقر وحدد إختياراتك',
            btn_change: null,
            no_icon: 'icon-cloud-upload',
            droppable: true,
            thumbnail: 'large',
            whitelist: 'gif|png|jpg|jpeg',
            blacklist: 'exe|php|txt|asp|aspx',
            before_change: function (files, dropped) {
                var allowed_files = [];
                for (var i = 0 ; i < files.length; i++) {
                    var file = files[i];
                    if (typeof file === "string") {
                        //ie8 and browsers that don't support file object
                        if (!(/\.(jpe?g|png|gif|bmp)$/i).test(file)) return false;
                    }
                    else {
                        var type = $.trim(file.type);
                        if ((type.length > 0 && !(/^image\/(jpe?g|png|gif|bmp)$/i).test(type))
                                || (type.length == 0 && !(/\.(jpe?g|png|gif|bmp)$/i).test(file.name))//for android's default browser which gives an empty string for file.type
                            ) continue;//not an image so don't keep this file
                    }
                    allowed_files.push(file);
                }
                if (allowed_files.length == 0) return false;

                return allowed_files;
            }
        });
        $('form').validate({
            onsubmit: false,
            highlight: function (e) {
                $(e).closest('.control-group').removeClass('info').addClass('error');
                $(e).closest('.required-items').removeClass('info').addClass('error');
            },
            success: function (e) {
                $(e).closest('.control-group').removeClass('error').addClass('info');
                $(e).closest('.required-items').removeClass('error').addClass('info');
                $(e).remove();
            },
            showErrors: function (errorMap, errorList) {
                // Clean up any tooltips for valid elements
                $.each(this.validElements(), function (i, element) {
                    var $element = $(element);
                    $element.data("title", "") // Clear the title - there is no error associated anymore
                        .removeClass("error").tooltip("destroy");
                    $element.closest('.control-group').removeClass('error').addClass('info');
                    $element.closest('.required-items').removeClass('error').addClass('info');
                });
                // Create new tooltips for invalid elements
                $.each(errorList, function (i, error) {
                    var $element = $(error.element);
                    $element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                        .data("title", error.message).addClass("error").tooltip(); // Create a new tooltip based on the error messsage we just set in the title
                    $element.closest('.control-group').removeClass('info').addClass('error');
                    $element.closest('.required-items').removeClass('info').addClass('error');
                });
            },
            submitHandler: function (form) { },
            invalidHandler: function (form) { }
        });
        setNavigation();
    }
    function loadPageContents(widgetUri) {
        var containerObjLocal = $('#page-contents'), $progress = $('div[id$=UpdateProgress1]');

        $progress.css('display', 'block');
        containerObjLocal //.html('<span class="center"><i class="icon-spinner center icon-spin orange bigger-125"></i></span>')
            .html('<div class="message-loading-overlay"><i class="fa-spin ace-icon fa fa-spinner icon-spinner orange2 bigger-160"></i></div>');

        $.get(widgetUri, function (response) {
            containerObjLocal.html(response);
        }).done(function () {
            // init page plugins
            InitAllJsPlugins();
        }).fail(function () {
            //error alert
            commonManger.showMessage('خطأ تحميل الصفحة', 'يرجي اعادة تحميل الصفحة بالضغط على f5');
            window.location.href = widgetUri.replace('&click=yes', '');
        }).always(function () {
            $('html,body').animate({ scrollTop: 0 }, 'slow');
            // hide progress
            $progress.css('display', 'none');
        });
    }
    // change page url and title without reloading.
    function ChangeUrl(pageTitle, url) {
        var newState = { Page: pageTitle, Url: url };
        history.pushState(newState, newState.Page, newState.Url);
        //document.title = pageTitle;
    }
    // add paramter to current url to open only contents from pages.
    function openPage(path) {
        try { // assign page url
            var separator = path.indexOf('?') > -1 ? '&' : '?'; path = path + separator + 'click=yes';
            // start load page contents
            loadPageContents(path);
        }
        catch (ex) {
            console.log(ex);
        }
    }

    // handle user clicks on links.
    $(document).delegate('a[href]:not([href^=#],[href*="default.aspx"],[href^="http:"],[href^="https:"],[href*="javascript:"],[href*="www."],[href*="mailto:"],[target],.normal)', 'click', function (e) {
        var path = $(this).attr('href'), isValidNavigator = true;
        $.map(['www.', 'http', 'javascript', '@', 'mailto:', 'tel:', '#', 'default.aspx'], function (v, i) {
            if (path.indexOf(v) > -1) {
                isValidNavigator = false;
                return;
            }
        });
        if (isValidNavigator) {
            //change url
            ChangeUrl($(this).text(), path);
            // get target page`s content
            openPage(path);
        }
        return false;
    });

    // open the target page from history while page state change event.
    History.Adapter.bind(window, 'statechange', function () {
        var obj = History.getState();
        if (obj) {
            openPage(obj.url);
        }
    });

    // reload current page while history navigation frward and back.
    // if the browser not support pushstate.
    window.onpopstate = function (e) {
        if (!e.state) {
            location.reload();
        }
    }


    // Hotkeys implementation
    $(document).bind('keydown', 'f6', function () {
        var path = 'InvoicePayAdd.aspx', title = "فاتورة شراء";
        ChangeUrl(title, path);
        openPage(path);
        return false;
    });
    $(document).bind('keydown', 'f7', function () {
        var path = 'InvoiceShippingAdd.aspx', title = "فاتورة شحن";
        ChangeUrl(title, path);
        openPage(path);
        return false;
    });
    $(document).bind('keydown', 'f8', function () {
        var path = 'InvoiceCustomsAdd.aspx', title = "فاتورة تخليص";
        ChangeUrl(title, path);
        openPage(path);
        return false;
    });
    $(document).bind('keydown', 'f9', function () {
        var path = 'america/carnotes.aspx', title = "السيارات المنتظرة";
        ChangeUrl(title, path);
        openPage(path);
        return false;
    });
    $(document).bind('keydown', 'f1', function () {
        var path = 'clients.aspx', title = "العـــملاء";
        ChangeUrl(title, path);
        openPage(path);
        return false;
    });
    $(document).bind('keydown', 'f2', function () {
        var path = 'available/1/carslist.aspx', title = "فاتورة بيع سيارة";
        ChangeUrl(title, path);
        openPage(path);
        return false;
    });
    $(document).bind('keydown', 'f3', function () {
        var path = 'ClientsPaymentsAdd.aspx', title = "حوالة عميل";
        ChangeUrl(title, path);
        openPage(path);
        return false;
    });
    $(document).bind('keydown', 'f4', function () {
        var path = 'PartsAdd.aspx', title = "فاتورة قطع غيار";
        ChangeUrl(title, path);
        openPage(path);
        return false;
    });
})();
//#endregion