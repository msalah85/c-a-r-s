// Master initialization
var getMasterData = function () {
    var dto = JSON.stringify({ "actionName": "MasterAdmin", "value": "" });
    var url = "/api/general.aspx/GetData";
    dataService.callAjax('Post', dto, url,
            function (data) {
                showMasterData(data.d);
            }, commonManger.errorException);
}
var showMasterData = function (data) {
    var json = JSON.parse(data);
    if (json.length > 0) {
        //$('#divCarsCount').text(json[0].NotArrivCars);
        $('#divContainersCount').text(json[0].NotArrivContainers);
        $('#divCarsLateShippedCount').text(json[0].LateShippedCars);
        $('#CustomInvNotPaymentCount').text(json[0].CustomInvNotPaymentCount);
        $('#ShippInvNotPaymentCount').text(json[0].ShippInvNotPaymentCount);
        $('#CarsNotPayment').text(json[0].CarsNotPayment);
        $('#BolToShippingCount').text(json[0].BolToShippingCount);
        $('#CarsCountToSale').text(json[0].CarsCountToSale);
        $('#SoldCarsNotInstallment').text(json[0].SoldCarsNotInstallment);
        $('#CarsWithoutTitle').text(json[0].CarsWithoutTitle);
        $('#CarsTitleNotRecieved').text(json[0].CarsTitleNotRecieved);
        $('#ClientsBalanceRequiredEqual').text(json[0].ClientsBalanceRequiredEqual);
        // total count        
        var _ttl = parseInt(json[0].NotArrivContainers) + parseInt(json[0].CustomInvNotPaymentCount) +
            parseInt(json[0].LateShippedCars) + parseInt(json[0].ShippInvNotPaymentCount) + parseInt(json[0].CarsNotPayment) +
            parseInt(json[0].BolToShippingCount) + parseInt(json[0].CarsCountToSale) +
            parseInt(json[0].SoldCarsNotInstallment) + parseInt(json[0].CarsWithoutTitle) +
            parseInt(json[0].CarsTitleNotRecieved) + parseInt(json[0].ClientsBalanceRequiredEqual);
        $('.divTotalAlertsCount').text(_ttl);
        // assign/mark notification
        $('.navbar-pink li span.badge').each(function (i) {
            if ($(this).text() > 0)
                $(this).addClass('badge-pink');
            else
                $(this).closest('li').addClass('hide');
        });
    }
}
// fire loading data.
getMasterData();
// events 
// open cars data not payments report.
$('a.rptPayCarPaymentReport').click(function (e) {
    e.preventDefault();
    $.cookie('ReportInfo', null, { expires: -2, path: 'rpt' }); // reset
    var arraydata = []; var arraydata = ['', '', '', false, ''];
    $.cookie('ReportInfo', arraydata, { expires: 1, path: 'rpt' }); // fill
    window.open("rpt/PayCarsPaymentsPrint.aspx", "_self");
});
// open report of none payment shipping invoice.
$('a.rptShipPaymentsReport').click(function (e) {
    e.preventDefault();
    $.cookie('ReportInfo', null, { expires: -2, path: 'rpt' }); // reset
    var arraydata = []; arraydata = ['', '', '', '0', ''];
    $.cookie('ReportInfo', arraydata, { expires: 1, path: 'rpt' }); // fill
    window.open("rpt/ShipPaymentsReportPrint.aspx", "_self");
});
// open report of none payment customs invoice.
$('a.rptCustomInvNotPaymentCount').click(function (e) {
    e.preventDefault();
    $.cookie('ReportInfo', null, { expires: -2, path: 'rpt' }); // reset
    var arraydata = []; arraydata = ['', '', '', '0', ''];
    $.cookie('ReportInfo', arraydata, { expires: 1, path: 'rpt' }); // fill
    window.open("rpt/CustomPaymentsReportPrint.aspx", "_self");
});