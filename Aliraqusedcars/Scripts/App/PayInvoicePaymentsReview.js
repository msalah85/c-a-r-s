//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================
var pageManager = function () {
    "use strict";
    var Init = function () {
        // set buyers and shippers lists for binding.
        setDataToSearch();

        // search pay payments result
        $('#CheckNo').change(function (e) {
            e.preventDefault();
            var checkNo = $(this).val();
            if (checkNo !== '') {
                filllistItems(checkNo);
            }
        });

        // save all data
        $('#SaveAll').click(function (e) {
            e.preventDefault();
            SaveAllData();
        });
    },
    SaveAllData = function () {
        if (validateMayData()) { // start Save data.

            var payIds = $('#listItems tbody tr').map(function (i, v) {
                return $(v).find('td:eq(0)').text();
            }).get().join(',');

            var names = ['ReviewPaymentID', 'CheckNo', 'PaymentDate', 'AmountDhs', 'Notes', 'PayPaymentsIDs', 'AmountSum'],
                values = [$('#ReviewPaymentID').val(), $('#CheckNo').val(), $('#PaymentDate').val(), $('#AmountDhs').val().replace(',', ''),
                          $('#Notes').val(), payIds, $('#TotalAmountDhs').text().replace(',', '')];

            var functionName = "PayInvoicePaymentsReview_Save", DTO = { 'actionName': functionName, 'names': names, 'values': values };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successSaved, commonManger.errorException);
        }
    },
    validateMayData = function () {
        // validate all data before SaveAllData.
        var _valid = true;
        if ($('#TotalAmountDhs').text() === '0' || $('#listItems tbody tr').length <= 0)
            _valid = false;
        return _valid;
    },
    successSaved = function (data) {
        data = data.d;
        if (data.Status)
            window.location.href = 'BankBalancesView.aspx';
    },
    BindListSearch = function (d) { // CheckNo for search
        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
        // paypayments check numbers list.
        if (jsn) {
            var options = $(jsn).map(function (i, v) { return $('<option />').val(v.CheckNo).text(v.CheckNo); }).get();
            $('#CheckNo').append(options).trigger('chosen:updated').trigger("liszt:updated");
        }
    },
    setDataToSearch = function () {
        var functionName = "PayInvoicePaymentsReview_Properties", DTO = { 'actionName': functionName };
        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', BindListSearch, commonManger.errorException);
    },
    BindGrid = function (data) {
        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
        if (jsn) {
            // collect table rows
            var _tbl = $('#listItems tbody'), _totalAmount = 0, _paymentDate = '',
                rows = $(jsn).map(function (i, v) {
                    _totalAmount += (v.AmountDhs * 1);
                    _paymentDate = v.PaymentsDates;
                    return $('<tr><td>' + v.PayInvoicePaymentsID + '</td><td>' + v.PaymentsDates + '</td><td>' + v.ExchangeCompanyNameAr + '</td><td>' + v.AuctionNameAr + '</td>\
                             <td>' + v.BuyerName + '</td><td>' + v.Notes + '</td><td>' + numeral(v.AmountDhs).format('0,0.0') + '</td></tr>');
                }).get();

            // populate to payments table
            _tbl.html('').append(rows);

            // show payments total amount.
            $('#AmountDhs').val(numeral(_totalAmount).format('0,0'));
            _totalAmount = numeral(_totalAmount).format('0,0.0');
            $('#TotalAmountDhs').text(_totalAmount); // total

            // show payment date 
            $('#PaymentDate').val(_paymentDate);
        } else {
            resetMyForm();
        }
    },
        resetMyForm = function () {
            $('#aspnetForm')[0].reset();
            $('#listItems tbody').html('');
            $('#TotalAmountDhs').text('0');
        },
        filllistItems = function (no) {
            var functionName = "PayInvoicePaymentsReview_GetByCheckNo", prm = { 'actionName': functionName, 'value': no };
            dataService.callAjax('Post', JSON.stringify(prm), sUrl + 'GetData', BindGrid, commonManger.errorException);
        };
    return {
        Init: Init
    };
}();
pageManager.Init();