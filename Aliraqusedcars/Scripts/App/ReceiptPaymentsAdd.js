var
    ClientsPayments = function () {
        var
            preventUpdateDhsAmount = false,
            Init = function () {

                // page lists
                setDataToControlandGrid();
                //updateChosen();

                eventHandlers();
            },
            eventHandlers = function () {
                $('#ClientID,#EmpID,#OutsideMemberID').on('change', function () {
                    if ($(this).val() !== '') {
                        $('#ToName').val($(this).find('option:selected').text());
                    }
                });

                // show/hide client option
                $('#ReceiptTypeID input').change(function () {
                    $('#divClientID,#divOutsideMemberID,#divEmpID').addClass('hidden'); // reset            
                    $('#ClientID,#EmpID,#OutsideMemberID').val('').trigger("chosen:updated");

                    if ($(this).val() == 2) {
                        $('#divClientID').removeClass('hidden');
                    } else if ($(this).val() == 3) {
                        $('#divEmpID').removeClass('hidden');
                    } else if ($(this).val() == 4) {
                        $('#divOutsideMemberID').removeClass('hidden');
                    }
                });

                // show/hide check no
                $('#PayTypeID input').change(function () {
                    $('.bank-options,.exchange-options').addClass('hidden'); // reset
                    $('.bank-options input,.bank-options select,.exchange-options input,.exchange-options select').val('');
                    $('.divBankRequired').text('*');
                    $('#BankID,#BankCheckNo').attr('name', 'BankInfo').attr('required', '');

                    var selectVal = $(this).val();

                    if (selectVal == 2) { // bank options
                        $('.bank-options').removeClass('hidden');
                    }
                });

                // get data to edit
                var _id = commonManger.getUrlVars().id;
                if (_id) {
                    $('.page-header h1 span').html('تعديل');
                    getDataToUpdate(_id);
                }

                // save data
                $('#SaveAll').click(function (e) {
                    e.preventDefault();
                    commonManger.disableControl('SaveAll', true);

                    var isValid = validateMe(),
                        amnt = $('#Amount').val(),
                        amntDhs = $('#AmountDhs').val();


                    if (isValid) {
                        if (parseFloat(amntDhs) > parseFloat(amnt)) {
                            commonManger.saveData("masterForm", "masterForm", success, "", "ReceiptPayments_Save", "1", aftersave);
                        }
                        else {
                            commonManger.disableControl('SaveAll', false);
                            commonManger.showMessage("التحقق من البيانات:", "برجاء ادخال جميع الحقول الاجبارية (*) <br>,وادخال المبلغ بالدرهم أكبر من المبلغ بالدولار.");
                        }
                    } else
                        commonManger.disableControl('SaveAll', false);
                });


                // currency rate from $ to Dirham.
                $('#AmountDhs').on('blur change', function () {
                    var amount = $('#AmountDhs').val(); // in Dirham

                    // get the amount in alphabet (Arabic).
                    commonManger.num2Arabic(amount, 2);
                    $.fn.afterSave = function (alpha) {
                        $('#AmountAlphabet').val(alpha.d); // in Arabic
                    }

                    amount = amount / 3.667;

                    if (preventUpdateDhsAmount === false)
                        $('#Amount').val(amount.toFixed(2)); // in Dollar
                });

                $('input[type=text]').on('focus click', function () { $(this).select(); });
            },
            bindQueryStr = function () {
                var qs = commonManger.getUrlVars();

                if (qs && qs.pamount) {
                    var ids = qs.ids, payAmount = qs.pamount;

                    $('#IDs').val(ids.length > 0 ? ids : 0);
                    $('#AmountDhs').val(payAmount).change(); // Amount Dirham
                    $('#AmountDhs,#AmountAlphabet').attr('readonly', 'readonly');

                    $("input[name='ReceiptTypeID'][value='5']").prop("checked", true).change(); // Vendor
                    $("input[name='ReceiptTypeID']:not([value='5'])").each(function () {
                        $(this).closest('label.lbl').addClass('hidden');
                    });

                    // bind expense type after loading its options
                    if ($('#ExpenseTypeID option').length > 0) {
                        $('#ExpenseTypeID').val(13).closest('div.control-group').addClass('hidden');
                        updateChosen();
                    } // سداد فواتير شراء
                } else if (qs && qs.samount) {
                    var ids = qs.ids, shipAmount = qs.samount;

                    $('#IDs').val(ids.length > 0 ? ids : 0);
                    $('#AmountDhs').val(shipAmount).change(); // Amount Dirham
                    $('#AmountDhs,#AmountAlphabet').attr('readonly', 'readonly');

                    $("input[name='ReceiptTypeID'][value='5']").prop("checked", true).change(); // Vendor
                    $("input[name='ReceiptTypeID']:not([value='5'])").each(function () {
                        $(this).closest('label.lbl').addClass('hidden');
                    });

                    // bind expense type after loading its options
                    if ($('#ExpenseTypeID option').length > 0) {
                        $('#ExpenseTypeID').val(14).closest('div.control-group').addClass('hidden');;
                        updateChosen();
                    } // سداد فواتير شحن
                } else if (qs && qs.camount) {
                    var ids = qs.ids, custAmount = qs.camount;

                    $('#IDs').val(ids.length > 0 ? ids : 0);
                    $('#AmountDhs').val(custAmount).change(); // Amount Dirham
                    $('#AmountDhs,#AmountAlphabet').attr('readonly', 'readonly');

                    $("input[name='ReceiptTypeID'][value='5']").prop("checked", true).change(); // Vendor
                    $("input[name='ReceiptTypeID']:not([value='5'])").each(function () {
                        $(this).closest('label.lbl').addClass('hidden');
                    });

                    // bind expense type after loading its options
                    if ($('#ExpenseTypeID option').length > 0) {
                        $('#ExpenseTypeID').val(15).closest('div.control-group').addClass('hidden');;
                        updateChosen();
                    } // سداد فواتير التخليص
                } else if (qs && qs.salamount) {
                    var ids = qs.ids, salariesAmount = qs.salamount;

                    $('#IDs').val(ids.length > 0 ? ids : 0);
                    $('#AmountDhs').val(salariesAmount).change(); // Amount Dirham
                    $('#AmountDhs,#AmountAlphabet').attr('readonly', 'readonly');

                    $("input[name='ReceiptTypeID']:not([value='1'])").each(function () { // general
                        $(this).closest('label.lbl').addClass('hidden');
                    });

                    // bind expense type after loading its options
                    if ($('#ExpenseTypeID option').length > 0) {
                        $('#ExpenseTypeID').val(12).closest('div.control-group').addClass('hidden');;
                        updateChosen();
                    } // سداد الرواتب الشهري
                }
                // سداد حوالة عمولة البيرات
                else if (qs && qs.acmount) {
                    var ids = qs.ids, AuctionCommAmount = qs.acmount;

                    $('#IDs').val(ids.length > 0 ? ids : 0);
                    $('#AmountDhs').val(AuctionCommAmount).change(); // Amount Dirham
                    $('#AmountDhs,#AmountAlphabet').attr('readonly', 'readonly');

                    $("input[name='ReceiptTypeID'][value='5']").prop("checked", true).change(); // Vendor
                    $("input[name='ReceiptTypeID']:not([value='5'])").each(function () {
                        $(this).closest('label.lbl').addClass('hidden');
                    });

                    // bind expense type after loading its options
                    if ($('#ExpenseTypeID option').length > 0) {
                        $('#ExpenseTypeID').val(16).closest('div.control-group').addClass('hidden');;
                        updateChosen();
                    } // سداد حوالة عمولة البيرات
                }
                else if (qs && qs.rentamount) {   // صرف شيك الايجار للشركة
                    var ids = qs.ids, compRentAmount = qs.rentamount;

                    $('#IDs').val(ids.length > 0 ? ids : 0);
                    $('#AmountDhs').val(compRentAmount).change(); // Amount Dirham
                    $('#AmountDhs,#AmountAlphabet').attr('readonly', 'readonly');

                    $("input[name='ReceiptTypeID'][value='1']").prop("checked", true).change(); // company rent
                    $("input[name='ReceiptTypeID']:not([value='1'])").each(function () {
                        $(this).closest('label.lbl').addClass('hidden');
                    });

                    // bind expense type after loading its options
                    if ($('#ExpenseTypeID option').length > 0) {
                        $('#ExpenseTypeID').val(2).closest('div.control-group').addClass('hidden');;
                        updateChosen();
                    } //# صرف شيك الايجار للشركة

                    // get rent details
                    getRentDetails(ids);
                }
                else if (qs && qs.emprentamount) {     // صرف شيك الايجار للموظف
                    var ids = qs.ids, compRentAmount = qs.emprentamount;

                    $('#IDs').val(ids.length > 0 ? ids : 0);
                    $('#AmountDhs').val(compRentAmount).change(); // Amount Dirham
                    $('#AmountDhs,#AmountAlphabet').attr('readonly', 'readonly');

                    $("input[name='ReceiptTypeID'][value='3']").prop("checked", true).change(); // company rent
                    $("input[name='ReceiptTypeID']:not([value='3'])").each(function () {
                        $(this).closest('label.lbl').addClass('hidden');
                    });

                    // bind expense type after loading its options
                    if ($('#ExpenseTypeID option').length > 0) {
                        $('#ExpenseTypeID').val(3).closest('div.control-group').addClass('hidden');;
                        updateChosen();
                    } //# صرف شيك الايجار للموظف


                    // get rent details
                    getRentDetails(ids);
                }
                else if (qs && qs.cusd) {   // استرداد مبلغ للعميل
                    var _ids = qs.ids;
                    $('#IDs').val(_ids.length > 0 ? _ids : 0);
                    $('#Amount').val(qs.cusd);


                    $("input[name='ReceiptTypeID'][value='2']").prop("checked", true).change(); // to client type
                    $("input[name='ReceiptTypeID']:not([value='2'])").each(function () {
                        $(this).closest('label.lbl').addClass('hidden');
                    });


                    $('#ClientID').val(_ids).change(); // select client


                    // bind expense type after loading its options
                    if ($('#ExpenseTypeID option').length > 0) {
                        $('#ExpenseTypeID').val(10).closest('div.control-group').addClass('hidden'); // رصيد مرتجع لعميل
                        updateChosen();
                    }

                    updateChosen();

                    // prevent update usd amount.
                    preventUpdateDhsAmount = true;
                }
            },
            updateChosen = function () {
                $(".chzn-select").chosen({ allow_single_deselect: true, no_results_text: "اختـــر", search_contains: false }).trigger('chosen:updated').trigger("liszt:updated");
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
            bindFormControls = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1, jsn2 = jsnData.list2, jsn3 = jsnData.list3, jsn4 = jsnData.list4;

                if (jsn) { // banks
                    var options = $(jsn).map(function (i, v) { return $('<option />').val(v.BankID).text(v.BankName); }).get();
                    $('#BankID').append(options);
                }

                if (jsn1) { // clients
                    var options = $(jsn1).map(function (i, v) { return $('<option />').val(v.ClientID).text(v.full_name); }).get();
                    $('#ClientID').append(options);
                }

                if (jsn2) { // employees
                    var options = $(jsn2).map(function (i, v) { return $('<option />').val(v.UserID).text(v.UserFullName); }).get();
                    $('#EmpID').append(options);
                }

                if (jsn3) { // advance outside members
                    var options = $(jsn3).map(function (i, v) { return $('<option />').val(v.ID).text(v.Name); }).get();
                    $('#OutsideMemberID').append(options);
                }

                if (jsn4) { // advance expense type
                    var options = $(jsn4).map(function (i, v) { return $('<option />').val(v.ExpenseTypeID).text(v.ExpenseTypeName); }).get();
                    $('#ExpenseTypeID').append(options);
                }


                updateChosen();
                bindQueryStr();
            },
            setDataToControlandGrid = function () {
                var functionName = "ReceiptPayments_Properties", DTO = { 'actionName': functionName };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', bindFormControls, commonManger.errorException);
            },
            getDataToUpdate = function (receiptID) {
                var functionName = "ReceiptPayments_SelectRow",
                    DTO = { 'actionName': functionName, 'value': receiptID };

                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
                    function (data) {
                        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;

                        if (jsn) {
                            // show/hide client
                            if (jsn.ReceiptTypeID > 1) {
                                $("input[name='ReceiptTypeID'][value='" + jsn.ReceiptTypeID + "']").prop("checked", true).change();
                            }

                            // show/hide check no.
                            $("input[name='PayTypeID'][value='" + jsn.PayTypeID + "']").prop("checked", true).change();

                            // revised receipt
                            $("input[name='Revised'][value='" + jsn.Revised + "']").prop("checked", true);

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

                            // bind employee id.
                            $('#EmpID').val(jsn.UserID);

                            // update chosen select
                            updateChosen();
                        }

                    }, commonManger.errorException);
            },
            getRentDetails = function (rentID) {
                var funName = "RentDetails_One", dto = { 'actionName': funName, value: rentID },
                    bindRentControls = function (data) {
                        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;

                        if (jsn) {
                            $('#CheckNo').val(jsn.CheckNo);
                            $('#BankDate').val(commonManger.formatJSONDateCal(jsn.DuDate));
                            $('#Notes').val(jsn.Notes);

                            if (jsn.EmpID) {
                                $('#EmpID').val(jsn.EmpID);
                                $('#ToName').val(jsn.UserFullName);
                                updateChosen();
                            }
                        }
                    };

                dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', bindRentControls, commonManger.errorException);
            },
            aftersave = function (data) {
                //console.log(data);
            },
            success = function (d) {
                window.location.href = 'ReceiptPaymentsPrint.aspx?id=' + d.ID;
            };


        return {
            Init: Init
        };
    }();
