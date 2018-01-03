var
    ClientsPaymentsReview = ClientsPaymentsReview || {},
    ClientsPaymentsReview = function () {
        var
            $recipt = $('#RecieptID'),


            Init = function () {
                // load client receipts
                loadRecirpts();

                pageEvents();

            },
            pageEvents = function () {
                // get receipt details
                $recipt.change(function () {
                    var _id = $(this).val();
                    getReceiptDetails(_id);
                });
                // save all data
                $('#SaveAll').click(function (e) {
                    e.preventDefault();
                    var _pass = $('#passwordNo').val(); // password
                    if (_pass !== '') { // mandatory field.
                        var DTO = { 'value': _pass }, url = 'ClientsPaymentsAdd.aspx/SelectSetting';
                        dataService.callAjax('Post', JSON.stringify(DTO), url,
                          function (data) {
                              if (data.d) { //valid password
                                  startSavePayment();
                              }
                              else {
                                  commonManger.showMessage("التحقق من كلمة السر:", "الرقم السرى غير صحيح، من فضلك أدخل رقم صحيح");
                                  return false;
                              }
                          }, commonManger.errorException);
                    }
                });

            },
            startSavePayment = function () {

                // get data
                var payType = $('#PayTypeID').text(),
                    payObj = {
                        ClientPaymentsID: 0,
                        ClientID: $('#ClientID').text(),
                        PaymentsDates: commonManger.dateFormat($('#AddDate').text()),
                        ExchangeCompanyID: (payType === '1' ? 6 : (payType === '2' ? 5 : $('#ExchangeCompanyID').text())), //( نقداً : 6), (شيك : 5)
                        CheckNo: $('#CheckNo').text(),
                        Amount: $('#Amount').text(),
                        ReciverName: $('#FromName').text(),
                        Details: $('#Notes').text(),
                        AmountDhs: $('#AmountDhs').text(),
                        BankID: $('#BankID').text(),
                        BankCheckNo: $('#BankCheckNo').text(),
                        ReceiptID: $('#ReceiptID').text()
                    },

                // prepare parameters
                paramValues = [], paramNames = [];
                $.each(payObj, function (k, v) {
                    paramNames.push(k);
                    paramValues.push(v);
                });

                // start save
                var DTO = { 'values': paramValues, 'actionName': 'ClientsPayments_save', 'Parm_names': paramNames, 'flage': 1 };
                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'saveData',
                function (data) {
                    data = data.d;
                    if (data.Status) { // success.
                        commonManger.showMessage('تم بنجاح:', 'تم الحفظ بنجاح:');
                        window.location.href = 'ClientsPaymentsPrint.aspx?id=' + data.ID;
                    }
                    else { // error
                        commonManger.showMessage('خطأ أثناء الحفظ', data.message);
                    }
                }, commonManger.errorException);

            },
            loadRecirpts = function () {
                var functionName = "ClientsPayments_SelectRecipts", qs = commonManger.getQueryStrs();
                qs.cid = qs.cid ? qs.cid : null;

                dataService.callAjax('Post', JSON.stringify({ 'actionName': functionName, value: qs.cid }), sUrl + 'GetData',
                 function (data) {
                     var jsn = commonManger.comp2json(data.d), json = jsn.list, json1 = jsn.list1, id = qs.id,
                         options = $(json).map(function (i, v) { return $('<option ' + (id == v.ReceiptID ? ' selected ' : '') + ' />').val(v.ReceiptID).text(v.ReceiptID); }).get();

                     $recipt.append(options).trigger("chosen:updated");

                     if (json1) {
                         $('.clientName').text(json1.full_name).attr('href', 'ClientCars.aspx?id=' + qs.cid);
                         $('.paymentsList').attr('href', 'ClientsPaymentsView.aspx?id=' + qs.cid);
                     }

                     // fire selected event
                     $recipt.change();
                 });
            },
           getReceiptDetails = function (pkvalue) {
               var functionName = "ReceiptVouchers_SelectRow", DTO = { 'actionName': functionName, 'value': pkvalue };
               dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
                 function (data) {
                     var jsn = commonManger.comp2json(data.d), json = jsn.list;

                     $('.exchangeCo,.divfull_name,.bankName,.bankCheck').addClass('hidden'); // reset

                     if (json) {
                         $('#masterForm').removeClass('hidden');

                         // set all data
                         $.each(json, function (k, v) {
                             $('#masterForm #' + k).text(v);
                         });

                         // additional enhancements
                         //$('.clientAccount').attr('href', 'ClientCars.aspx?id=' + json.ClientID);
                         $('#Amount,#AmountDhs').text(function () {
                             return numeral($(this).text()).format('0,0');
                         });
                         $('#AddDate').text(function () {
                             var date = json.ExchangeDate ? json.ExchangeDate : $(this).text(); // تاريخ الحوالة - تاريخ سند القبض
                             return commonManger.formatJSONDateCal(date);
                         });

                         // show/hide client name
                         if (json.ReceiptTypeID == 2) {
                             $('.divfull_name').removeClass('hidden');
                         }
                         // show-hide exchange company
                         if (json.PayTypeID == 3) {
                             $('.exchangeCo').removeClass('hidden');
                         }

                         // show/hide bank info
                         if (json.BankName) {
                             $('.bankName').removeClass('hidden');
                         }
                         if (json.BankCheckNo) {
                             $('.bankCheck').removeClass('hidden');
                         }
                     }
                     else {
                         $('#masterForm').addClass('hidden');
                     }
                 }, commonManger.errorException);
           };
        return {
            Init: Init
        };
    }();
ClientsPaymentsReview.Init();