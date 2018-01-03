var ShipPaymentsReportPrint = function () {
    var
        Init = function () {
            var DTO = { 'actionName': 'ShipPaymentsReport_FillReport' };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', BindReportInfo, commonManger.errorException);
        },
        BindReportInfo = function (data) {
            var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;

            if (jsn) {
                var carsList = $(jsn).map(function (i, v) { return '<tr><td><a title="طباعة التفاصيل" href="InvoiceShippingPrint.aspx?id=' + v.ShippInvoiceID + '">' + v.ShippInvoiceNo + '</a></td><td>' + v.ContainerNo + '</td><td>' + commonManger.formatJSONDateCal(v.InvoiceDate) + '</td><td>' + v.InvoiceNo + '</td><td>' + v.ShipCompanyNameAr + ' - ' + v.DistinationNameAr + '</td><td>' + commonManger.formatJSONDateCal(v.ArrivalDate) + '</td><td>' + numeral(v.TotalAmount).format('0,0.00') + '</td></tr>' }).get();
                $('#listItems tbody').append(carsList);

                $('.no').text(carsList.length);
            }
        };
    return {
        Init: Init
    };
}();