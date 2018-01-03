var CustomPaymentsReport = function () {

    var
        Init = function () {
            pageData();
        },
        pageData = function () {
            var
                bindData = function (data) {

                    var dAll = commonManger.comp2json(data.d), jsn = dAll.list, _tot = 0;

                    // build table rows
                    var rows = $(jsn).map(function (i, v) {
                        _tot += 1;
                        return '<tr><td>' + v.CustomsInvoiceID + '</td><td>' + v.CustomsCompanyNameAr + '</td><td>' + v.ContainerNo + '</td><td>' + commonManger.formatJSONDateCal(v.InvoiceDate) + '</td><td>' + v.InvoiceNo + '</td><td>' + numeral(v.TotalAmountDhs).format('0,0') + '</td></tr>';
                    }).get();


                    // show rows
                    $('#listItems tbody').html(rows);
                    $('.list-count').text(_tot);

                },
                DTO = { actionName: 'CustomsInvoices_Alert' };


            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', bindData, commonManger.errorException);

        };

    return {
        Init: Init
    };

}();