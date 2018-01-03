var
    ClientsPayments = ClientsPayments || {},
    ClientsPayments = function () {
        var
            Init = function () {
                // page lists
                setDataToControlandGrid();

                pageEvents();

                editReceipt();
            },
            editReceipt = function () {
                // get data to edit
                var qs = commonManger.getUrlVars();
                if (qs) {
                    if (qs.id) {
                        $('.page-header h1 span').html('تعديل');
                        getDataToUpdate(qs.id);
                    } else if (qs.ramount && qs.ids) {
                        // show amount related to this receipt.
                        $('#Amount').val(((qs.ramount * 1) / 3.667).toFixed(2)).change();
                        $('#AmountDhs').val(qs.ramount);
                        $('#IDs').val(qs.ids);
                    }
                }
            },
            pageEvents = function () {
                $('input[type=text]').on('focus click', function () { $(this).select(); });
                $('#ClientID, #OutsideMemberID, #EmpID').on('change', function () {
                    if ($(this).val() !== '') {
                        $('#FromName').val($(this).find('option:selected').text());
                    }
                });

                // show/hide client option
                $('#ReceiptTypeID input').change(function () {
                    $('#divEmpID,#divClientID,#divOutsideMemberID').addClass('hidden'); // reset
                    $('#EmpID,#ClientID,#OutsideMemberID').val('');
                    $('#EmpID,#ClientID,#OutsideMemberID').trigger("chosen:updated");

                    var selectedVal = $(this).val();

                    if (selectedVal == 2) {
                        $('#divClientID').removeClass('hidden');
                    }
                    else if (selectedVal == 3) {
                        $('#divEmpID').removeClass('hidden');
                    }
                    else if (selectedVal == 4) {
                        $('#divOutsideMemberID').removeClass('hidden');
                    }

                    // show/hide Expense Type GroupID.
                    // reset
                    $('#divExpenseTypeGroupID').addClass('hidden');
                    $('#ExpenseTypeGroupID').val(1);

                    if (selectedVal == 1) {
                        $('#divExpenseTypeGroupID').removeClass('hidden');
                    }

                });

                // currency rate from $ to Dirham.
                $('#Amount').on('blur change', function () {
                    var payType = $('#PayTypeID input:checked').val(),
                        amount = $('#Amount').val();

                    //var num2words = new NumberToWords();
                    //var _towords = num2words.numberToWords(amount);
                    //var _towords = toWords(amount);

                    commonManger.num2Arabic(amount, 1);
                    $.fn.afterSave = function (alpha) {
                        $('#AmountArabic').val(alpha.d);
                    }

                    if (payType == 3) {
                        amount = amount * 3.67;
                        $('#AmountDhs').val(amount.toFixed(2));

                    } else {
                        amount = amount * 3.667;
                        $('#AmountDhs').val(amount.toFixed(2));
                    }
                });

                // show/hide check no
                $('#PayTypeID input').change(function () {
                    // reset controls under payment type options:
                    $('.bank-options,.exchange-options, #divBankTransferNo').addClass('hidden'); // reset
                    $('.bank-options input,.bank-options select,.exchange-options input,.exchange-options select,#BankTransferNo').val('');
                    $('.divBankRequired').text('*');
                    $('#BankID,#BankCheckNo').attr('name', 'BankInfo').attr('required', '');
                    $('.bank-exch-date').html('تاريخ الشيك');


                    var selectVal = $(this).val();
                    if (selectVal == 2) { // bank options
                        $('.bank-options').removeClass('hidden');
                    }
                    else if (selectVal == 3) { // exchange company options
                        $('.bank-options,.exchange-options').removeClass('hidden');
                        $('.divBankRequired').text('');
                        $('#BankID, #BankCheckNo').removeAttr('name required').removeClass('required');
                    }
                    else if (selectVal == 4) { // bank transfer
                        $('#divBankTransferNo, #divBankID, #divBankDate').removeClass('hidden');
                        $('.bank-exch-date').html('تاريخ التحويل <span class="red">*</span>');
                    }
                });

                // save data
                $('#SaveAll').click(function (e) {
                    e.preventDefault();
                    commonManger.disableControl('SaveAll', true);

                    var isValid = validateMe(), amnt = $('#Amount').val(), amntDhs = $('#AmountDhs').val();
                    if (isValid) {
                        if (parseFloat(amntDhs) > parseFloat(amnt)) {
                            commonManger.saveData("masterForm", "masterForm", success, "", "ReceiptVouchers_Save", "1", aftersave);
                        }
                        else {
                            commonManger.disableControl('SaveAll', false);
                            commonManger.showMessage("التحقق من البيانات:", "برجاء ادخال جميع الحقول الاجبارية (*) <br>,وادخال المبلغ بالدرهم أكبر من المبلغ بالدولار.");
                        }
                    } else
                        commonManger.disableControl('SaveAll', false);
                });
                // check Duplicate receipts based on (No, Date , Exchange Co.)
                $('#ExchangeCompanyID').change(function () { checkDuplicateReceipt(); });
                $('#CheckNo,#ExchangeDate').blur(function () { checkDuplicateReceipt(); });
                $('#ExchangeDate').datepicker().on('changeDate', function (e) {
                    checkDuplicateReceipt();
                });
            },
            checkDuplicateReceipt = function () {
                // receipt no and exchange company and date parameters.
                var obj = {
                    id: $('#ExchangeCompanyID').val(),
                    no: $('#CheckNo').val(),
                    date: $('#ExchangeDate').val(),
                    action: 'ReceiptVouchers_CheckExist'
                };

                // start check duplicate
                if (obj.id != '' && obj.no != '' && obj.date != '') {
                    var DTO = {
                        'actionName': obj.action,
                        'names': ['ExchangeCompanyID', 'CheckNo', 'ExchangeDate'],
                        'values': [obj.id, obj.no, commonManger.dateFormat(obj.date)]
                    };

                    dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataList',
                        showDuplicateMessage, commonManger.errorException);
                }
            },
            showDuplicateMessage = function (data) {
                var jsnData = commonManger.comp2json(data.d),
                    jsn = jsnData.list;

                if (jsn) { // exist before
                    // show message
                    $('.message').html('<div class="alert alert-danger span12"><i class="icon-warning-sign red"></i> <strong>إيصال مكرر:</strong> رقم الايصال الذى تم ادخاله موجود من قبل لسند قبض رقم: <a href="ReceiptVoucherPrint.aspx?id=' + jsn.ReceiptID + '">' + jsn.ReceiptID + '</a><button type="button" class="close" data-dismiss="alert"><i class="icon-remove"></i></button></div>');

                    commonManger.showMessage('ايصال مكرر', 'هذا الايصال موجود بالفعل من قبل برقم: ' + jsn.ReceiptID);

                    // disable save button
                    $('#SaveAll').attr('disabled', 'disabled');
                } else {
                    $('#SaveAll').removeAttr('disabled');
                    $('.message').html('');
                }
            },
            updateChosen = function () {
                $(".chzn-select").chosen({
                    allow_single_deselect: true, no_results_text: "اختـــر",
                    search_contains: false
                }).trigger('chosen:updated').trigger("liszt:updated");
            },
            validateMe = function () {
                var valid = true, inputs = $('#masterForm :input:not(:hidden).required');

                for (var i = 0; i < inputs.length; i++) {
                    if ($(inputs[i]).val() == "" || $(inputs[i]).val() == "0") {
                        valid = false;
                        $(inputs[i]).focus();
                    }
                }
                return valid;
            },
            setDataToControlandGrid = function () {
                var DTO = { actionName: 'ReceiptVouchers_Properties2', value: '' },
                    bindDataControls = function (data) {
                        var selectList = JSON.parse(data.d);
                        commonManger.Filllist(selectList, "masterForm");

                        // update chosen
                        updateChosen();

                        // move outside advances
                        $('#divClientID').after($('#divOutsideMemberID'));
                    };

                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData', bindDataControls, commonManger.errorException);
            },
            getDataToUpdate = function (receiptID) {
                var functionName = "ReceiptVouchers_SelectRow",
                    DTO = { 'actionName': functionName, 'value': receiptID },
                    bindDataResult = function (data) {
                        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;

                        if (jsn) {
                            // show/hide client
                            if (jsn.ReceiptTypeID > 1) {
                                $("input[name='ReceiptTypeID'][value='" + jsn.ReceiptTypeID + "']").prop("checked", true).change();
                            }

                            // show/hide check no.
                            $("input[name='PayTypeID'][value='" + jsn.PayTypeID + "']").prop("checked", true).change();

                            // revised receipt
                            $('#Revised').attr('checked', (jsn.Revised === 'true'));

                            // assign old values to update
                            $.each(jsn, function (k, v) {
                                $('#masterForm #' + k).val(v);
                            });

                            // update money format
                            $('#Amount,#AmountDhs').val(function () {
                                return numeral($(this).val()).format('0.0');
                            });

                            // update date format
                            $('.date-picker').val(function () {
                                return commonManger.formatJSONDateCal($(this).val());
                            });

                            // update chosen select
                            updateChosen();
                        }
                    };

                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
                    bindDataResult, commonManger.errorException);
            },
            aftersave = function (data) {
                //console.log(data);
            },
            success = function (d) {
                window.location.href = 'ReceiptVoucherPrint.aspx?id=' + d.ID;
            };

        return {
            Init: Init
        };

    }();