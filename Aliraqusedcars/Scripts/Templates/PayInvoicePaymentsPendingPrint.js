var
    PayInvoicePaymentsPrint = function () {
        var
            Init = function () {
                setDataToControlandGrid();
            },
            pageEvents = function () {
                $(document).on('click', '#listItems tbody .add-discount', function (e) {
                    e.preventDefault();

                    var _this = $(this),
                        obj = {
                            discVal: _this.attr('title'),
                            id: _this.attr('data-id'),
                            oldNote: _this.attr('data-note'),
                        };

                    $('#pay-id').val(obj.id);
                    $('#discount-amount').val(obj.discVal);
                    $('#msg').val(obj.oldNote);
                    $('#disc-modal').modal('show');
                });

                // save button
                $('#save-discount').click(function (e) {
                    e.preventDefault();

                    var
                        obj = {
                            id: $('#pay-id').val(),
                            discVal: $('#discount-amount').val(),
                            notes: $('#msg')
                        },
                        dto = {
                            actionName: 'PayInvoicePayments_SetDiscount',
                            names: ['ID', 'Amount', 'Reason'],
                            values: [obj.id, obj.discVal, obj.notes.val()]
                        };



                    // validate form
                    if (obj.id != '' && obj.discVal != '' && obj.notes.val() != '') {

                        // start save discount                        
                        dataService.callAjax('Post',
                            JSON.stringify(dto),
                            sUrl + 'saveData',
                            successDiscCallback,
                            commonManger.errorException);

                    } else {
                        obj.notes.focus();
                        commonManger.showMessage('بيانات مطلوبة', 'يرجي ادخال جميع البيانات المطلوبة *.');
                    }


                });
            },
            successDiscCallback = function (data) {
                data = data.d;

                $('.modal').modal('hide');
                commonManger.showMessage('تم تنفيذ الإجراء:', data.message);

                if (data.Status) {
                    setDataToControlandGrid();
                }
            },
            setDataToControlandGrid = function () {
                var DTO = { actionName: 'PayInvoicePayments_PendingList' };

                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect',
                    bingGrid, commonManger.errorException);
            },
            bingGrid = function (data) {
                var jsnData = commonManger.comp2json(data.d),
                    jsn = jsnData.list,
                    jsn1 = jsnData.list1,
                    invTotal = 0,
                    rateVal = 3.674, // USD to AED
                    convertVal = 160.22, // AED
                    invTotalDhs = 0,
                    VatPaymentTotalAmount = 0; // AED

                $('#listItems tbody').html('');
                var rows = $(jsn).map(function (i, v) {
                    // total - discount
                    invTotal += (v.FinalAmount * 1);
                    rateVal = v.Rate * 1;
                    var _vat = ((v.VAT || 0) * 1);
                    convertVal = v.Convertamount * 1;

                    var dhsAmount = (v.FinalAmount * rateVal),
                        dhsWithCommision = dhsAmount > 0 ? (dhsAmount + convertVal + _vat) : 0;

                    invTotalDhs += dhsWithCommision;
                    VatPaymentTotalAmount += _vat; // VAT per Buyer

                    // 
                    return '<tr><td>' + (i + 1) + '</td><td>' + v.AuctionName + '</td><td>' + v.BuyerName + '</td><td>' + numeral(v.FinalAmount).format('0,0.00') + '</td><td>' +
                        numeral(_vat).format('0,0.00') + '</td><td>' +
                        numeral(dhsWithCommision).format('0,0.00') + '<a href="payinvoicepaymentspendingprint.aspx#disc-modal" class="hidden-print pull-left add-discount" title="' +
                        numeral(v.DiscountAmount).format('0') + '" data-note="' + (v.DiscountNotes ? v.DiscountNotes : '') + '" data-id="' + v.PayInvoicePaymentsID + '">' +
                        (v.DiscountAmount * 1 > 0 ? numeral(v.DiscountAmount).format('0') : '+خصم') + '</a></td></tr>';

                }).get(),
                    ids = $(jsn1).map(function (i, v) { return v.PayInvoicePaymentsID; }).get().join(',');

                $('#listItems tbody').append(rows);
                $('.total').text(numeral(invTotal).format('0,0.00'));
                $('.vatTotalAmount').text(numeral(VatPaymentTotalAmount).format('0,0.00'));

                var netAmount = (invTotalDhs * 1);

                // go to receipt payment
                var receiptBtn = ' <a href="ReceiptPaymentsAdd.aspx?pamount=' + netAmount.toFixed() + '&ids=' + ids + '" class="btn btn-mini btn-success pull-left hidden-print">انشاء سند صرف <i class="icon-double-angle-left"></i></a>';


                if (invTotal > 0) {
                    $('.totalDhs').text(numeral(netAmount).format('0,0')); // final amount to pay.

                    if (ids.length > 0)
                        $('.totalDhs').append(receiptBtn);
                }

                // show username
                if (jsn && jsn[0] && jsn[0].UserFullName) {
                    $('#userName').text(jsn[0].UserFullName);
                }


                // fire report events
                pageEvents();
            };

        return {
            Init: Init
        };

    }();