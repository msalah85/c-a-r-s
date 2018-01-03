//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================
var
    pageManager = function () {

        "use strict";
        var Init = function () {
            // set buyers and shippers lists for binding.
            setDataToSearch();
            pageEvents();
        },
        pageEvents = function () {
            // get the same checks in one 
            $('#CheckNo').on('change blur', function (e) {
                e.preventDefault();

                var checkNo = $(this).val();

                if (checkNo != '') {
                    var dto = { actionName: 'ReceiptVouchers_GetSameChecks', value: checkNo };
                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', showAllChecks, commonManger.errorException);
                }

            });

            // add client payment to grid.
            $('#AddNewPayment').click(function (e) {
                e.preventDefault();
                var paymentID = $('#PaymentID').val();

                if (paymentID != '') {
                    filllistItems(paymentID);
                } else {
                    commonManger.showMessage('بيانات مطلوبة', 'يرجي اختيار رقم الايصال أولاً.');
                }
            });

            // remove row from grid.
            $('#listItems tbody').delegate('tr button', 'click', function (e) {
                e.preventDefault();
                var el = $(this).closest('tr');
                if (el) {
                    el.css({ 'transition': 'background-color 1s', 'background-color': 'red' }).fadeOut('slow').promise().done(function () { el.remove(); showPaymentsTotal(); });
                }
            });

            // save all data
            $('#SaveAll').click(function (e) {
                e.preventDefault();
                SaveAllData();
            });


            $('#AddToCashFunds').click(function (e) {
                e.preventDefault();
                moveReceiptToCash();
            });
        },
        moveReceiptToCash = function () {

            var receiptID = $('#PaymentID').val(),
                successMovedCall = function (data) {
                    var all = commonManger.comp2json(data.d), jsn = all.list;

                    // if success 
                    if (jsn.Saved > 0) {
                        /// remove option from select
                        $('#PaymentID option[value=' + receiptID + ']').remove();
                        $('#PaymentID').trigger('chosen:updated').trigger("liszt:updated");

                        commonManger.showMessage('تم ترحيل السند', 'تم ترحيل سند القبض بنجاح.');
                    }
                    else {// error
                        commonManger.showMessage('خطأ ترحيل السند', 'لقد حدث خطأ أثناء ترحيل سند القبض، يرجي المحاوله مرة أخري أو الاتصال بإدارة النظام.');
                    }
                },
                receiptToCash = function () {
                    var dto = { actionName: 'ReceiptVoucher_MoveToChash', value: receiptID };

                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', successMovedCall, commonManger.errorException);
                };
            

            if (receiptID != '') {
                // confirm from user to move
                bootbox.confirm("هل أنت متأكد من ترحيل سند القبض الذي قمت باختياره؟",
                    function (result) { if (result) { receiptToCash(); } });
            }
            else {
                // error select receipt first
                commonManger.showMessage('اختر سند قبض:', 'يرجي اختيار سند القبض الذي تريد ترحيله للصندوق');
            }
        },
        showAllChecks = function (data) {
            var allD = commonManger.comp2json(data.d), jsn = allD.list;

            if (jsn) {
                //reset grid
                $('#listItems tbody').html('');

                // re populate grid
                populateToGrid(jsn);
            }
        },
        populateToGrid = function (jsn) {
            var _tbl = _tbl = $('#listItems tbody');

            if (jsn) {
                // collect table rows
                var rows = $(jsn).map(function (i, v) {
                    return $('<tr><td>' + v.ReceiptID + '</td><td>' + commonManger.formatJSONDateCal(v.AddDate) + '</td>\
                              <td>' + numeral(v.Amount).format('0,0.0') + '</td><td>' + numeral(v.AmountDhs).format('0,0.0') + '</td>\
                              <td><button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف" title="حــذف"><i class="icon-remove icon-only"></i></button></td></tr>');
                }).get(), isExist = false, existIDs = '';

                $('#listItems tbody tr').each(function (i, item) {
                    if ($(this).children('td:eq(0)').text() == jsn.ReceiptID) {
                        isExist = true;
                        existIDs = existIDs + jsn.ReceiptID + ',';
                    }
                });

                if (!isExist) {
                    // populate to payments table
                    _tbl.append(rows);
                    // show payments total amount.
                    showPaymentsTotal();
                } else {
                    commonManger.showMessage('سند مكرر:', 'السند رقم: ' + existIDs + ' موجود بالفعل من قبل.');
                }
            }
        },
        SaveAllData = function () {
            if (validateMayData()) {
                var payIds = $('#listItems tbody tr').map(function (i, v) {
                    return $(v).find('td:eq(0)').text();
                }).get().join(',');

                var names = ['ReviewPaymentID', 'CheckNo', 'PaymentDate', 'AmountDhs', 'Notes', 'ClientPaymentsIDs', 'AmountSum', 'IP', 'UserID'],
                    values = [$('#ReviewPaymentID').val(), $('#CheckNo').val(), commonManger.dateFormat($('#PaymentDate').val()), $('#AmountDhs').val().replace(',', ''),
                              $('#Notes').val(), payIds, $('#TotalAmountDhs').text().replace(',', ''), '', ''];

                var functionName = "ClientPaymentsReview_Save", DTO = { 'actionName': functionName, 'names': names, 'values': values };
                dataService.callAjax('Post', JSON.stringify(DTO), 'ClientPaymentsReview.aspx/saveData', successSaved, commonManger.errorException);
            } else {
                commonManger.showMessage('بيانات مطلوبة', 'يرجي التحقق من البيانات أولاً.')
            }
        },
        validateMayData = function () {
            // validate all data before SaveAllData.
            var _valid = true;
            if (numeral($('#TotalAmountDhs').text()) <= 0 || $('#listItems tbody tr').length <= 0 || numeral($('#AmountDhs').val()) <= 0)
                _valid = false;
            return _valid;
        },
        successSaved = function (data) {
            data = data.d;
            if (data.Status)
                window.location.href = 'ClientPaymentsReviewPrint.aspx?id=' + data.ID;
            else
                commonManger.showMessage('خطأ بالحفظ', 'لقد حدث خطأ أثناء الحفظ، يرجي الاتصال بمدير النظام.');
        },
        BindListSearch = function (d) { // PaymentID for search
            var jsnData = commonManger.comp2json(d.d), jsn = jsnData.list;
            // paypayments check numbers list.
            if (jsn) {
                var options = $(jsn).map(function (i, v) { return $('<option />').val(v.ReceiptID).text(v.ReceiptID); }).get();
                $('#PaymentID').append(options).trigger('chosen:updated').trigger("liszt:updated");
            }
        },
        setDataToSearch = function () {
            var functionName = "ClientsPaymentsReview_Properties", DTO = { 'actionName': functionName };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', BindListSearch, commonManger.errorException);
        },
        BindGrid = function (data) {
            var cdata = commonManger.comp2json(data.d), jsn = cdata.list;

            if (jsn) {
                populateToGrid(jsn);
            }
        },
        showPaymentsTotal = function () {
            var _total = 0;
            $('#listItems tbody tr').each(function (i, item) {
                _total += numeral($(this).children('td:eq(3)').text()) * 1;
            });

            // show final save button.
            if (_total > 0) {
                $('#SaveAll').removeClass('hidden');
            } else {
                $('#SaveAll').addClass('hidden');
            }

            // show total amount.
            $('#AmountDhs').val(numeral(_total).format('0,0'));
            _total = numeral(_total).format('0,0.0');
            $('#TotalAmountDhs').text(_total);
        },
        resetMyForm = function () {
            $('#aspnetForm')[0].reset();
            $('#listItems tbody').html('');
            $('#TotalAmountDhs').text('0');
        },
        filllistItems = function (no) {
            var functionName = "ReceiptVouchers_SelectRow", prm = { 'actionName': functionName, 'value': no };
            dataService.callAjax('Post', JSON.stringify(prm), sUrl + 'GetData', BindGrid, commonManger.errorException);
        };


        return {
            Init: Init
        };

    }();