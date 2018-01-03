// get data to print
var id = commonManger.getQueryStrs().id,
    functionName = "AuctionCommissions_SelectOne",
    applyEditableControl = function () {
        // editable row
        $('a.editable').editable({
            emptytext: 'لا يوجــد',
            value: $(this).data('currentVal'),
            validate: function (value) {
                if ($.trim(value) === '') {
                    return 'مطلوب.';
                }
            },
            url: function (params) {
                params.table = $(this).data('table'); params.id = $(this).data('id');
                return $.ajax({
                    type: 'POST',
                    url: sUrl + 'InlineEdit',
                    data: JSON.stringify(params),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    async: true,
                    cache: false,
                    timeout: 10000,
                    success: function () {
                        commonManger.showMessage('تم الحفظ:', 'تم حفظ البيان بنجاح.');
                    },
                    error: function () {
                        commonManger.showMessage('خطأ:', 'لقد حدث خطأ فى تنفيذ الإجراء.');
                    }
                });
            }
        });
    },
    dto = { 'actionName': functionName, 'value': id },
    successCall = function (data) {
        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;

        if (jsn) {
            $('#auctionType').text(jsn.AuctionTypeName);
            $('#divInvoiceNo').text(id);
            $('#exchangeCo').text(jsn.ExchangeCompanyNameAr);
            $('#notes').text(jsn.Notes);
            $('#AuctionCommTotal,#amount').text(numeral(jsn.CommAmount).format('0,0.00'));
            $('#amountDhs').text(numeral(jsn.CommAmountDhs).format('0,0.00'));
            $('#ExtraAmount').text(numeral(jsn.ExtraAmount).format('0,0.00'));

            $('#DateFrom').text(moment(jsn.DateFrom).format('DD/MM/YYYY'));
            $('#DateTo').text(moment(jsn.DateTo).format('DD/MM/YYYY'));
            $('#ExtraNote').text(jsn.ExtraNote);

            // show all controls that was hidden and has data new.
            $('#checkNo').html(function () { return jsn.CheckNo ? '<a href="ReceiptPaymentsPrint.aspx?id=' + jsn.CheckNo + '">' + jsn.CheckNo + '</a>' : ''; });

            $('#DeskInvoice').text(jsn.DeskInvoice);
            if (jsn.DeskInvoice) {
                $('#DeskInvoice').removeClass('editable editable-click').removeAttr('href').closest('tr').removeClass('new hidden');
            }
            else {
                $('#DeskInvoice').attr('data-pk', jsn.AuctionCommID);
                applyEditableControl();
            }
        }
        if (jsn1) {
            $(jsn1).each(function (i, item) {
                $('#itemsList tbody').append('<tr><td>' + (i + 1) + '</td><td>' + item.MakerNameEn + ' - ' + item.TypeNameEn + '</td><td>' + item.LotNo + '</td><td>' + item.ChassisNo + '</td><td>' + item.BuyerName + '</td><td>' + item.RegionEn + '</td><td>' + numeral(item.BuyerFee).format('0,0.00') + '</td><td>' + numeral(item.AuctionCommCost).format('0,0.00') + '</td><td>' + numeral(item.ACDetailsTotal).format('0,0.00') + '</td></tr>');
            });
        }
    };


dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData',
  successCall, commonManger.errorException);