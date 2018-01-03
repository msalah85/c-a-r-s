//#region pages handler
(function () {
    "use strict";
    function InitAllJsPlugins() {
        $(".modal").modal('hide'); // hide modal if open
        $('li.open').removeClass('open'); // hide top menu if open.
        $('[data-rel=tooltip],[data-toggle=tooltip]').tooltip({ container: 'body' });
        $('.tooltip').removeClass('in'); // hide all opened tooltip.        
        // fire jssor gallery if exist.
        if (typeof jssor_1_slider_init !== 'undefined' && $.isFunction(jssor_1_slider_init)) {
            jssor_1_slider_init();
        }
        // re-init google maps.
        if (typeof LoadMapAliraq !== 'undefined' && $.isFunction(LoadMapAliraq)) {
            LoadMapAliraq();
        }
    }
    function loadPageContents(widgetUri) {
        var containerObjLocal = $('#page-contents'), $progress = $('div[id$=UpdateProgress1]');
        //$.holdReady(true);
        $progress.css('display', 'block');
        containerObjLocal.fadeOut('2000');
        $.get(widgetUri, function (response) {
            containerObjLocal.html(response).fadeIn('2000');
        }).done(function () {
            // init page plugins
            InitAllJsPlugins();
        }).fail(function () {
            //error alert
            console.log('خطأ تحميل الصفحة: يرجي اعادة تحميل الصفحة بالضغط على f5');
            //window.location.href = widgetUri;
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
            var separator = path.indexOf('?') > -1 ? '&' : '?'; path = path + separator + '_ajx=yes';
            // start load page contents
            loadPageContents(path);
        }
        catch (ex) {
            console.log(ex);
        }
    }

    // handle user clicks on links.
    $(document).delegate('a[href]:not([href*="#"],[href^="http:"],[href^="https:"],[href*="javascript:"],[href*="www."],[href*="mailto:"],[target],[data-rel],.normal)', 'click', function (e) {
        var path = $(this).attr('href'), isValidNavigator = true;
        $.map(['www.', 'http', 'javascript', '@', 'mailto:', 'tel:', '#'], function (v, i) {
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
        console.log(obj);
        if (obj && obj.url.indexOf('#') === -1) {
            openPage(obj.url);
        }
    });

    // reload current page while history navigation frward and back.
    // if the browser not support pushstate.
    window.onpopstate = function (e) {
        var _st = e.state;
        if (!_st) {
            //location.reload();
        } else {
            if (_st && _st.Url.indexOf('#') === -1) {
                openPage(_st.Url);
            }
        }
    }
})();
//#endregion