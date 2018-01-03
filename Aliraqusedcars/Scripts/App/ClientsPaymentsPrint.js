var ClientsPaymentsPrint = function () {
    var oTable = "", idUpdatevalue = "",
        Init = function () {
            var urlIds = decodeURIComponent(commonManger.getUrlVars()["id"]);
            if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
                idUpdatevalue = urlIds;
                setDataToControlandGrid(urlIds);
                $('#ClientPaymentsIDH').text(urlIds);
                $('#ClientPaymentsID').text(urlIds);
            }
            else {
                setDataToControlandGrid("");
                $('#ClientPaymentsID').val(value = '0');
            }

            // selected event
            $('#RecieptID').change(function () {
                var selected = $(this).val();
                if (selected != '') {
                    window.location.href = 'ClientsPaymentsAdd.aspx?id=' + selected;
                }
            });
        },
       setDataToControlandGrid = function (pkvalue) {
           var functionName = "ClientsPayments_SelectRow",
           DTO = { 'actionName': functionName, 'value': pkvalue };
           dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
             function (data) {
                 var jsn = commonManger.comp2json(data.d), json = jsn.list, json1 = jsn.list1;
                 if (json) {
                     // set all data
                     $.each(json, function (k, v) {
                         $('#masterForm #' + k).text(v);
                     });



                     // client payments
                     $('.clientPayments').attr('href', 'ClientsPaymentsView.aspx?id=' + json.ClientID);

                     // additional enhancements

                     $('#PaymentsDates').text(function () {
                         return commonManger.dateFormat(json.PaymentsDates, 'YYYY/M/D', 'DD/MM/YYYY');
                     });

                     $('.clientAccount').attr('href', 'ClientCars.aspx?id=' + json.ClientID);
                     $('#Amount,#AmountDhs').text(function () {
                         return numeral($(this).text()).format('0,0');
                     });

                     // show/hide data
                     if (json.BankName) {
                         $('.showHide').removeClass('hidden');
                     }

                     if (json.IsDeleted === 'true')
                         $('#divCanceled').removeClass('hidden').html('إيداع ملغي');
                 }

                 // populate receipts list
                 if (json1) {
                     var list = $(json1).map(function (i, v) { return $('<option />').val(v.ReceiptID).text(v.ReceiptID); }).get();
                     $('#RecieptID').append(list).trigger("chosen:updated");
                 }
             }, commonManger.errorException);
       };
    return {
        Init: Init
    };
}();