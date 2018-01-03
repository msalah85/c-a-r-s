var ClientsPayments = function () {
    var Init = function () {
        $(".chzn-select").chosen({ allow_single_deselect: true, no_results_text: "اختـــر", search_contains: false }).trigger('chosen:updated').trigger("liszt:updated");

        $('input[type=text]').on('focus click', function () { $(this).select(); });
        $('#ClientID').on('change', function () {
            if ($(this).val() !== '') {
                $('#ReciverName').val($(this).find('option:selected').text());
            }
        });
        setDataToControlandGrid();
        $('#SaveAll').click(function (e) {
            e.preventDefault();
            var isValid = validateMe();
            var amnt = $('#Amount').val(), amntDhs = $('#AmountDhs').val();
            if (parseFloat(amntDhs) > parseFloat(amnt)) {
                var DTO = { 'value': $('#passwordNo').val() };
                dataService.callAjax('Post', JSON.stringify(DTO), 'ClientsPaymentsAdd.aspx/SelectSetting',
                  function (data) {
                      if (data.d) {
                          commonManger.saveData("masterForm", "masterForm", success, "", "ClientsPayments_save", "1", aftersave);
                      }
                      else {
                          commonManger.showMessage("التحقق من كلمة السر:", "الرقم السرى غير صحيح، من فضلك أدخل رقم صحيح");
                          return false;
                      }
                  }, commonManger.errorException);
            }
            else
                commonManger.showMessage("التحقق من البيانات:", "برجاء ادخال جميع الحقول الاجبارية (*) <br>,وادخال المبلغ بالدرهم أكبر من المبلغ بالدولار.");
        });

        // check payment by bank selection
        // show/hide bank options
        $('#ExchangeCompanyID').change(function () {
            var selectedVal = $(this).val(), $bankOptions = $('.bank-options'), $noTitle = $('#checkNoTitle');

            // defaults
            $bankOptions.addClass('hidden'); // hide as default
            $noTitle.text('رقم ايصال الحوالة');

            if (selectedVal == 5) { // شيك بنكي
                $noTitle.text('رقم سند القبض');
                $bankOptions.removeClass('hidden');
                $bankOptions.find('select,input').val('');
            }
            else if (selectedVal == 6) { // نقداً
                $noTitle.text('رقم سند القبض');
            }
        });
    },
    validateMe = function () {
        var valid = true;
        var inputs = $('#masterForm :input:not(:hidden).required');
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() == "" || $(inputs[i]).val() == "0") {
                valid = false;
                $(inputs[i]).focus();
            }
        }
        return valid;
    },
    setDataToControlandGrid = function () {
        var functionName = "ClientsPayments_Properties", DTO = { 'actionName': functionName, 'value': '' };
        dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
          function (data) {
              var selectList = JSON.parse(data.d);
              commonManger.Filllist(selectList, "masterForm");
          }, commonManger.errorException);
    },
    aftersave = function (data) {
        console.log(data);
    },
    success = function (d) {
        window.location.href = 'ClientsPaymentsPrint.aspx?id=' + d.ID;
    };
    return {
        Init: Init
    };
}();
ClientsPayments.Init();