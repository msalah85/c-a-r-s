(function () {
    "use strict";
    var getMasterData = function () {
        var uu = window.location.href, t = JSON.stringify({
            value: uu.substr(uu.lastIndexOf('/') + 1)
        }), e = "home.aspx/GetData";
        console.log(uu);
        dataService.callAjax("Post", t, e, showMasterData, commonManger.errorException)
    },
    showMasterData = function (t) {
        var e = $.parseXML(t.d), a = $.xml2json(e).list, requestsCount = $.xml2json(e).list1;
        if (void 0 !== a) {

            $("#divContainersCount").text(a.NotArrivContainers),
            $("#divCarsLateShippedCount").text(a.LateShippedCars),
            $("#CustomInvNotPaymentCount").text(a.CustomInvNotPaymentCount),
            $("#ShippInvNotPaymentCount").text(a.ShippInvNotPaymentCount),
            $("#CarsNotPayment").text(a.CarsNotPayment),
            $("#BolToShippingCount").text(a.BolToShippingCount),
            $("#CarsCountToSale").text(a.CarsCountToSale),
            $("#SoldCarsNotInstallment").text(a.SoldCarsNotInstallment),
            $("#CarsWithoutTitle").text(a.CarsWithoutTitle),
            $("#CarsTitleNotRecieved").text(a.CarsTitleNotRecieved),
            $("#ClientsBalanceRequiredEqual").text(a.ClientsBalanceRequiredEqual),
            $("#TitleAmericaLateCount").text(a.TitleAmericaLateCount);


            $(".navbar-pink li span.badge").each(function (t) {
                $(this).text() > 0 ? $(this).addClass("badge-pink") : $(this).closest("li").addClass("hide")
            });

        }
        if (requestsCount) {
            // count of requests.
            if (parseInt(requestsCount.RequestsViewWebsite, 10) > 0) {
                var newAlert = '<li><a href="cars-to-active-website.aspx"><div class="clearfix"><span class="pull-right">طلبات عرض سيارات بالموقع</span><span class="pull-left badge badge-pink" id="viewNeededCarsCount">' + requestsCount.RequestsViewWebsite + '</span></div></a></li>';
                $('ul.navbar-pink').append(newAlert);
            }
        }

        // show message.
        if (window.location.href.toLowerCase().indexOf('/home') > 0)
            showNotificationAlert();

        // Show count of alla notifications
        var _sum = 0;
        $('ul.navbar-pink li a span.badge.badge-pink').each(function () {
            $('.gritter-without-image').append('<p>' + $(this).closest('li').html() + '</p>');
            _sum += parseInt($(this).text(), 10);
        });
        $('.divTotalAlertsCount').text(_sum);

        if (_sum === 0) {
            // hide notification alert
            $.gritter.destroy();
        }
    },
    showNotification = function (n, t, i) {
        $.gritter.add({
            title: n,
            text: t,
            sticky: i
        })
    },
    showNotificationAlert = function () {
        showNotification("تنبـــــيه الطلبــــات الجــديــدة:", '', !0); //<a href="cars-to-active-website.aspx"> لديك عدد (' + no + ') طلبات عرض سيارات عملاء بالموقع.</a>
    },
    OpenPageByUrl = function (url) { // Hotkeys implementation
        window.location.href = url;
    };
    getMasterData();

    $(document).on('click', "ul.navbar-pink a.rptReport", function (event) {
        event.preventDefault(),

        $.cookie("ReportInfo", null, {
            expires: -2,
            path: "rpt"
        });
        var e = ["", "", "", "0", ""];
        $.cookie("ReportInfo", e, {
            expires: 1, path: "rpt"
        });
        windows.location.href = $(this).data('url');
    });

    // hot keys implementation
    $(document).bind('keydown', 'f6', function () {
        var path = 'InvoicePayAdd.aspx';
        OpenPageByUrl(path);
        return false;
    });
    $(document).bind('keydown', 'f7', function () {
        var path = 'InvoiceShippingAdd.aspx', title = "فاتورة شحن";
        OpenPageByUrl(path);
        return false;
    });
    $(document).bind('keydown', 'f8', function () {
        var path = 'InvoiceCustomsAdd.aspx', title = "فاتورة تخليص";
        OpenPageByUrl(path);
        return false;
    });
    $(document).bind('keydown', 'f9', function () {
        var path = 'america/carnotes.aspx', title = "السيارات المنتظرة";
        OpenPageByUrl(path);
        return false;
    });
    $(document).bind('keydown', 'f1', function () {
        var path = 'clients.aspx', title = "العـــملاء";
        OpenPageByUrl(path);
        return false;
    });
    $(document).bind('keydown', 'f2', function () {
        var path = 'available/1/carslist.aspx', title = "فاتورة بيع سيارة";
        OpenPageByUrl(path);
        return false;
    });
    $(document).bind('keydown', 'f3', function () {
        var path = 'ClientsPaymentsAdd.aspx', title = "حوالة عميل";
        OpenPageByUrl(path);
        return false;
    });
    $(document).bind('keydown', 'f4', function () {
        var path = 'PartsAdd.aspx', title = "فاتورة قطع غيار";
        OpenPageByUrl(path);
        return false;
    });

})();