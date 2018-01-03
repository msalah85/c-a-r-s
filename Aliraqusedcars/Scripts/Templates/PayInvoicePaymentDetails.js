

//#region new pay invoice class

var
    payInvoicePayment = function () {
        var
            // global variables
            $auction = $('#AuctionID'),
            $buyer = $('#BuyerID').eq(0),
            $cars = $('#detailsForm #LotNo'),
            $cars2 = $('#detailsForm2 #LotNo'),
            auctionEnum = { local: 4 },
            defaultRate = 3.674,
            defaultAddtion = 160.22,

            carTable = $('#listItems').DataTable({
                "sDom": "<'row'>t<'row'>",
                searching: false,
                retrieve: true,
                paging: false, sort: false
            }),
            carTable2 = $('#listItems2').DataTable({
                "sDom": "<'row'>t<'row'>",
                searching: false,
                retrieve: true,
                paging: false, sort: false, "columnDefs": [{ "targets": [1], "visible": false }]
            }),

            // methods
            applyValidation = function (formId) {
                var isValid = true;

                $('#' + formId + ' .required').each(function () {
                    if ($(this).val() === '')
                        isValid = false
                });

                if (($('#Amount').val() * 1) <= 0) // validate amount of payment.
                    isValid = false;

                return isValid;
            },
            succesSaveAll = function (data) {
                data = data.d;
                if (data.Status) {
                    commonManger.showMessage('', data.message);
                    window.location.href = 'payinvoicepaymentsprint.aspx?id=' + data.ID;
                }
                else {
                    commonManger.disableControl('SaveAll', false);
                    //console.log(data.message)
                    // general message
                    commonManger.showMessage('خطأ بالحفظ:', data.message);
                }
            },
            SumAll = function () {
                var obj = {
                    invTotal: numeral().unformat($('.invoicesFooter').text()),
                    storageTotal: numeral().unformat($('.storageFooter').text()),
                    latTotal: numeral().unformat($('.latFooter').text()),
                    buyerFee: numeral().unformat($('#BuyerAnnualFee').val()),
                    rate: $('#Rate').val() * 1,
                    auctionID: $('#AuctionID').val() * 1
                };

                obj.rate = obj.rate > 0 ? obj.rate : defaultRate;


                $('.subFinesFooter').text(obj.storageTotal + obj.latTotal);
                var ttl = obj.invTotal + obj.storageTotal + obj.latTotal + obj.buyerFee,
                    tlDhs = (ttl * obj.rate) + (obj.auctionID === auctionEnum.local ? 0 : defaultAddtion);


                $('#TotalAmount,#Amount').val(ttl);
                $('#lblInvoiceTotal').text(numeral(ttl).format('0,0.0'));
                $('#AmountDhs').val(tlDhs.toFixed(3));
            },
            gridTotalAmount = function () {
                var _Amount = 0;
                $('#listItems tbody').find('tr').find('td:nth-child(4)').each(function () {
                    _Amount += numeral().unformat($(this).text());
                });
                $('.invoicesFooter').text(numeral(_Amount).format('0,0.0'));
                SumAll();
            },
            gridTotalAmount2 = function () {
                var strg = 0, latPay = 0;
                $('#listItems2 tbody').find('tr').each(function () {
                    var $strg = numeral().unformat($(this).find('td:nth-child(3)').text());
                    var $latPay = numeral().unformat($(this).find('td:nth-child(4)').text());
                    strg += $strg; latPay += $latPay;
                });
                $('.latFooter').text(numeral(latPay).format('0,0.0')); $('.storageFooter').text(numeral(strg).format('0,0.0'));
                SumAll();
            },
            updateLists = function () {
                $(".chzn-select").chosen({ allow_single_deselect: true, no_results_text: "اختـــر", search_contains: false }).trigger('chosen:updated').trigger("liszt:updated");
            },
            resetMyForm = function (formId) {
                if (formId === 'detailsForm') {
                    $('#detailsForm #LotNo').val('').trigger('chosen:updated').trigger("liszt:updated");
                    $('#detailsForm  #ChassisNo').val('');
                    $('#PayPrice').val(0);
                    // rest grid also
                }
                else if (formId === 'detailsForm2') {
                    $('#detailsForm2 #LotNo').val('').trigger('chosen:updated').trigger("liszt:updated");
                    $('#detailsForm2 #ChassisNo').val('');
                    $('#Storge,#LatPayment,#detailsForm2 #CarID').val(0);
                    $(':checkbox').attr('checked', false);
                }
            },
            fillBuyersCars = function (data) {
                var selectList = JSON.parse(data.d);
                $('#BuyerID, #detailsForm #LotNo, #detailsForm2 #LotNo').empty().append($('<option />')); // reset.
                // buyers
                $.each(selectList, function (i, Basicdata) {
                    if (Basicdata.tbl_name === 0) {
                        $buyer.append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                    }
                });

                $buyer.trigger('chosen:updated').trigger("liszt:updated");
            },
            fillCarsList = function (data) {

                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;

                if (jsn) {
                    // reset grid
                    carTable.clear();

                    // available cars
                    $(jsn).each(function (i, row) {

                        var elemen = [row.LotNo, row.ChassisNo, row.CarID, row.PayPrice, '<button class="btn btn-minier remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>'];
                        carTable.row.add(elemen).draw();
                    });

                    // bind grid with all available cars
                    gridTotalAmount();
                }
            },
            GetBuyersCars = function (pkvalue) {
                if (pkvalue != "") {
                    // get buyers and cars to pay invoice payment
                    functionName = 'PayInvoicePayments_PropertiesFilter', DTO = { 'actionName': functionName, 'value': pkvalue };
                    dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData', fillBuyersCars, commonManger.errorException);
                }
                else
                    $('#BuyerID,#detailsForm #LotNo,#detailsForm2 #LotNo').empty().append('<option></option>').chosen().trigger('chosen:updated').trigger("liszt:updated");
            },
            GetCarsLots = function (pkvalue) {
                if (pkvalue !== "") { // get buyers and cars to pay invoice payment
                    functionName = 'PayInvoicePayments_PropertiesCarsAvailable', DTO = { 'actionName': functionName, 'value': pkvalue };
                    dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData', fillCarsList, commonManger.errorException);
                }
                else
                    $('#BuyerID, #detailsForm #LotNo,#detailsForm2 #LotNo').empty().append('<option></option>').chosen().trigger('chosen:updated').trigger("liszt:updated");
            },
            Init = function () {
                doMyWork();

                var urlIds = decodeURIComponent(commonManger.getUrlVars().id);
                if (urlIds && urlIds !== 'undefined') {
                    $('#PayInvoicePaymentsID').val(urlIds);
                } else {
                    $('#VAT').val('2.5000'); // set init val
                }

                setDataToControlandGrid();
            },
            SaveDataMasterDetails = function (form, success, fieldsDetails, valuesDetails, fieldsDetails2, valuesDetails2, actionName, flage) {
                var ParamValues = [], ParamNames = [],
                    arrayall = commonManger.Returncontrolsval(form);

                ParamNames = arrayall[0];
                ParamValues = arrayall[1];


                var DTO = {
                    'values': ParamValues, 'actionName': actionName, 'Parm_names': ParamNames, 'fieldsDetails': fieldsDetails, 'valuesDetails': valuesDetails,
                    'fieldsDetails2': fieldsDetails2, 'valuesDetails2': valuesDetails2, 'flage': flage
                };
                
                dataService.callAjax('Post', JSON.stringify(DTO), 'PayInvoicePaymentDetails.aspx/SaveDataMasterDetails', success, commonManger.errorException);
            },
            doMyWork = function () {
                $('.ace-switch-6').click(function () {
                    if ($(this).prop("checked"))
                        $('#LatPayment').val(50); // غرامه تأخير دفع
                    else
                        $('#LatPayment').val(0);
                });

                $.fn.afterLoadDatawithdata = function (data) {
                    var currntOption = $('#BuyerID option[value=' + data.BuyerID + ']').val();
                    if (currntOption > 0) { }
                    else {
                        $('#BuyerID').append('<option value="' + data.BuyerID + '">' + data.BuyerName + '</option>');
                        $('#BuyerID').val(data.BuyerID);
                        $('#BuyerID').chosen().trigger('chosen:updated').trigger("liszt:updated");
                    }
                }

                $.fn.aftersave = function (data) {
                    window.location.href = "payinvoicepaymentsprint.aspx?id=" + data.ID;
                }

                $('#SaveAll').click(function (e) {
                    e.preventDefault();

                    commonManger.disableControl('SaveAll', true);
                    var checkMe = applyValidation('aspnetForm');


                    if (checkMe) {
                        // invoices
                        var fieldsDetails = commonManger.returnFiledsNamesToSave("detailsForm"),
                            valueaitem = "", ii = 0,
                            valuesDetails = [];


                        $('#listItems tbody').find('tr').each(function () {
                            if (!$(this).hasClass("row_neglict")) {
                                $(this).find('td').each(function () {
                                    if ($(this).find('span').hasClass('label-success')) {
                                        valueaitem += "true,";
                                    }
                                    else if ($(this).find('span').hasClass('label-danger')) { valueaitem += "false,"; }
                                    else {
                                        valueaitem += $(this).text() + ",";
                                    }
                                });
                                if (valueaitem.toLowerCase().indexOf(",") >= 0) {
                                    valueaitem = valueaitem.substring(0, valueaitem.length - 1);
                                }
                                if (valueaitem.toLowerCase().indexOf("عفواً") >= 0) {
                                    valueaitem = '0,,0,0';
                                }
                                valuesDetails.push(valueaitem);
                                valueaitem = "";
                                ii++;
                            }
                        }); // end invoices


                        // fines list
                        var fieldsDetails2 = ['LotNo', 'CarID', 'Storge', 'LatPayment'],
                            valuesDetails2 = [],
                            list2 = carTable2.rows().data();


                        $(list2).each(function (i, item) {
                            var filds = item[0] + ',' + item[1] + ',' + item[3] + ',' + item[4];
                            valuesDetails2.push(filds);
                        });


                        SaveDataMasterDetails("aspnetForm", succesSaveAll, fieldsDetails, valuesDetails, fieldsDetails2, valuesDetails2, "PayInvoicePayments_Save", "1");
                    }
                    else {
                        commonManger.disableControl('SaveAll', false);
                        commonManger.showMessage('حقول مطلوبة:', '<p>- برجاء التأكد من مطابقة إجمالى الفواتير مع إجمالى الحوالة $ </p><p>- برجاء ادخال جميع الحقول الاجبارية ذات العلامة (*)</p>');
                    }
                });

                $cars.on('change', function () {
                    if ($(this).val() !== "") {
                        var DTO = { 'value': $(this).val() };
                        dataService.callAjax('Post', JSON.stringify(DTO), 'PayInvoicePaymentDetails.aspx/GetCaresDate', function (data) {
                            var selectList = JSON.parse(data.d);

                            $.each(selectList, function (i, Basicdata) {
                                $('#detailsForm #ChassisNo').val(Basicdata.ChassisNo);
                                $('#detailsForm #CarID').val(Basicdata.CarID);
                                $('#detailsForm #PayPrice').val(Basicdata.PayPrice);
                            });
                        }, commonManger.errorException);
                    }
                    else {
                        commonManger.ResetControls('detailsForm');
                    }
                });
                $cars2.on('change', function () {
                    if ($(this).val() !== "") {
                        var DTO = { 'value': $(this).val() };
                        dataService.callAjax('Post', JSON.stringify(DTO), 'PayInvoicePaymentDetails.aspx/GetCaresDate', function (data) {
                            var selectList = JSON.parse(data.d);
                            $.each(selectList, function (i, Basicdata) {
                                $('#detailsForm2 #ChassisNo').val(Basicdata.ChassisNo);
                                $('#detailsForm2 #CarID').val(Basicdata.CarID);
                            });
                        }, commonManger.errorException);
                    }
                    else {
                        resetMyForm('detailsForm2');
                    }
                });

                $('#Savetemp').on('click', function (e) {
                    e.preventDefault();
                    var cid = $cars.val(), chkVal = $('#AmountToCheck').val();
                    if (cid !== '') { // && chkVal !== '' && chkVal !== '0') {
                        var ifexite = 0, itemesRows = carTable.table().node();
                        for (var i = 0; i < itemesRows.length; i++) {
                            if ($(itemesRows[i]).hasClass('row_selected')) {
                                $(itemesRows[i]).addClass('row_neglict'); $(itemesRows[i]).hide();
                            }
                        }
                        var ctrolIDs = [], Elements = [];
                        ctrolIDs = commonManger.returnFiledsNames("detailsForm");
                        $('#listItems tbody').find('tr').find('td:nth-child(1)').each(function () {
                            if ($(this).text() == $('#' + ctrolIDs[0]).val())
                                ifexite = 1;
                        });
                        for (var i = 0; i < ctrolIDs.length; i++) {
                            if (ctrolIDs[i].substring(0, 4) == "hide") {
                                Elements.push('<td>hide' + $('#' + ctrolIDs[i]).val() + '</td>');
                            }
                            else {
                                var Ctype = $('#' + ctrolIDs[i]).prop('type');
                                if (Ctype == "checkbox") {
                                    $('#' + ctrolIDs[i]).prop('checked', function (i, value) {
                                        if (value == true) {
                                            Elements.push('<td><span class="label label-success"><i class="icon icon-check"></i></span></td>');
                                        }
                                        else if (value == false) {
                                            Elements.push('<td><span class="label label-danger"><i class="icon icon-remove"></i></span></td>');
                                        }
                                    });
                                }
                                else {
                                    Elements.push('<td>' + $('#' + ctrolIDs[i]).val() + '</td>');
                                }
                            };
                        }
                        Elements.push('<button class="btn btn-minier remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>');
                        if (ifexite !== 1) {
                            carTable.row.add(Elements).draw(false);
                            commonManger.showMessage('تمت الاضافة:', 'تم اضافة السيارة بنجاح.');
                        } else {
                            commonManger.showMessage('السيارة موجودة من قبل:', 'السيارة التى تود اضافتها موجود بالفعل بالحواله، يمكنك حذف السيارة واعادة اضافتها من جديد.');
                        }
                        resetMyForm('detailsForm');


                        gridTotalAmount();
                    } else {
                        commonManger.showMessage('بيانات مطلوبة:', 'برجاء التأكد من إجمالى الفواتير واختيار رقم اللوت للسيارة أولاً.');
                        $('#AmountToCheck').focus();
                    }
                });

                $('#Savetemp2').on('click', function (e) { // add fines to list
                    e.preventDefault();
                    var cid = $cars2.val(), chkVal = $('#AmountToCheck').val();

                    if (cid !== '') { // && chkVal !== '' && chkVal !== '0') {
                        var ifexite = 0; //, itemesRows = carTable2.table().node();
                        //for (var i = 0 ; i < itemesRows.length ; i++) {
                        //    if ($(itemesRows[i]).hasClass('row_selected')) {
                        //        $(itemesRows[i]).addClass('row_neglict'); $(itemesRows[i]).hide();
                        //    }
                        //}
                        var ctrolIDs = [], Elements = [];
                        ctrolIDs = ['LotNo', 'CarID', 'ChassisNo', 'Storge', 'LatPayment'];
                        // validate form
                        if ($('#' + ctrolIDs[3]).val() !== '' && $('#' + ctrolIDs[4]).val() !== '' && ($('#' + ctrolIDs[3]).val() !== '0' || $('#' + ctrolIDs[4]).val() !== '0')) {
                            $('#listItems2 tbody').find('tr').find('td:nth-child(1)').each(function () { // exists flag
                                if ($(this).text() === $('#detailsForm2 #' + ctrolIDs[0]).val())
                                    ifexite = 1;
                            });
                            for (var i = 0; i < ctrolIDs.length; i++) {
                                if (ctrolIDs[i].substring(0, 4) === "CarID") {
                                    Elements.push($('#detailsForm2 #' + ctrolIDs[i]).val());
                                }
                                else {
                                    Elements.push($('#detailsForm2 #' + ctrolIDs[i]).val());
                                };
                            }
                            Elements.push('<button class="btn btn-minier remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>');
                            if (ifexite !== 1) {
                                carTable2.row.add(Elements).draw(false);
                                commonManger.showMessage('تمت الاضافة:', 'تم اضافة الغرامه بنجاح.');
                            } else {
                                commonManger.showMessage('السيارة موجودة من قبل:', 'الغرامع على السيارة التى تود اضافتها موجود بالفعل بالحواله، يمكنك حذف الغرامه/السيارة واعادة اضافتها من جديد.');
                            }

                            resetMyForm('detailsForm2');
                            gridTotalAmount2();
                        } else {
                            commonManger.showMessage('بيانات مطلوبة:', 'برجاء التأكد من إدخال مبلغ الغرامه.');
                        }
                    } else {
                        commonManger.showMessage('بيانات مطلوبة:', 'برجاء التأكد من إجمالى الفواتير واختيار رقم اللوت للسيارة أولاً.');
                        $('#AmountToCheck').focus();
                    }
                });

                $auction.change(function () {
                    GetBuyersCars($(this).val());
                });

                $buyer.change(function () {
                    carTable.clear().draw();
                    carTable2.clear().draw();
                    GetCarsLots($(this).val()); // populate invoices
                });

                // delete from cars grid
                $("#listItems tbody").delegate("tr button.remove", "click", function (event) {
                    event.preventDefault();

                    var self = $(this), pos = self.closest('tr');
                    if (pos != null) {

                        DeleteConfirmation(function () {
                            //pos.remove();
                            carTable.row(pos).remove();
                            carTable.draw();
                            gridTotalAmount();
                        });

                    }
                });

                // delete from fines grid
                $("#listItems2 tbody").delegate("tr button.remove", "click", function (e) {
                    e.preventDefault();


                    var self = $(this), pos = self.closest('tr');
                    if (pos !== null) {
                        DeleteConfirmation(function () {

                            //pos.remove();
                            carTable2.row(pos).remove();
                            carTable2.draw();
                            gridTotalAmount2();
                        });
                    }
                });

                // update buyer fee value
                $('#BuyerAnnualFee').on('keyup', function () {
                    SumAll();
                });

                // check annual buyer amount 
                $('#BuyerAnnualFee, #BuyerID').on('change blur', function () {

                    // reset message
                    $('.mesg').html('');

                    var obj = {
                        buyer: $('#BuyerID').val(),
                        fee: $('#BuyerAnnualFee').val() ? $('#BuyerAnnualFee').val() * 1 : 0
                    },
                        showMessage = function (title, msg) {
                            commonManger.showMessage(title, msg);
                            $('.mesg').html('<div class="alert alert-block alert-warning"><strong>' + title + '</strong> ' + msg + '</div>');
                        },
                        showNotifying = function (data) {

                            var allD = commonManger.comp2json(data.d), jsn = allD.list;


                            if (jsn) {

                                // today
                                var d = commonManger.formatJSONDateCal(new Date()).split('/'),
                                    m = d[0] * 1,
                                    y = (d[2] * 1) - 1,

                                    // pay date
                                    feeDate = commonManger.formatJSONDateCal(jsn.PaymentsDates),
                                    feeDateArr = feeDate.split('/'),
                                    feeM = feeDateArr[0] * 1,
                                    feeY = feeDateArr[2] * 1;

                                // compare date of latest fee payment and today (month-year).
                                if (m === feeM && y === feeY) {
                                    // already pay annual fee amount
                                    //showMessage('', '');
                                }
                                else {
                                    // alert
                                    // should not pay buyer`s fee with this payment
                                    showMessage('تنبيه بعدم دفع رسوم الباير السنوى:', 'تم دفع آخر رسوم الباير السنوية فى: ' + feeM + '-' + feeY + ' ، ومطلوبه فى شهر: ' + feeM + '-' + (feeY + 1) + '');
                                }
                            }

                        };

                    if (obj.fee > 0) {
                        var dto = { actionName: 'BuyerAnnual_FeeCheck', value: obj.buyer };
                        dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', showNotifying, commonManger.errorException);
                    }

                });

                $('#Rate').change(function () {
                    gridTotalAmount();
                    gridTotalAmount2();
                });
            },
            setDataToControlandGrid = function () {
                var pkvalue = $('#PayInvoicePaymentsID').val(),
                    DTO = {
                        actionName: "PayInvoicePayments_PropertiesDetails",
                        value: pkvalue
                    };

                dataService.callAjax('Post', JSON.stringify(DTO),
                    sUrl + 'GetData',
                    bindAllControls,
                    commonManger.errorException);
            },
            bindAllControls = function (data) {

                var jsnData = commonManger.comp2json(data.d),
                    jsn = jsnData.list,
                    jsn1 = jsnData.list1,
                    jsn2 = jsnData.list2,
                    jsn3 = jsnData.list3,

                    pkvalue = $('#PayInvoicePaymentsID').val();


                // bind main form controls
                if (jsn) {
                    $.each(jsn, function (k, v) {

                        console.log(k, v);


                        $('#' + k).val(v);

                        // 4 select add as new option and select it
                        var ctrl = $('#' + k);
                        if (ctrl.prop('type') === 'select-one' && !ctrl.hasClass('noreset')) {

                            // set as new option
                            var otion = $('<option />').val(v).text(k == 'BuyerID' ? jsn.BuyerName : jsn.AuctionNameAr).attr('selected', true);
                            ctrl.append(otion);

                            // disable select controls
                            ctrl.prop('disabled', true).trigger("liszt:updated");
                        }
                    });

                    // enhance view of special controls
                    $('.date-picker').val(function () {
                        var _curDate = $(this).val();
                        return moment().format('DD/MM/YYYY', _curDate);
                    });


                    $('.money').val(function () {
                        var _curData = $(this).val();
                        return numeral(_curData).format('0.00');
                    });
                }


                if (jsn1) {
                    fillDT(jsn1, "detailsForm", carTable);
                    gridTotalAmount();
                }

                if (jsn2) {
                    fillDT(jsn2, "detailsForm2", carTable2);
                    gridTotalAmount2();
                }


                // fill auctions
                if (pkvalue == 0 && jsn3) {
                    var optn = $(jsn3).map(function (i, v) {
                        return $('<option />').val(v.AuctionID).text(v.AuctionNameAr);
                    }).get();

                    $('#AuctionID').append(optn);
                }


                // update chosen
                updateLists();

            },
            fillDT = function (gridData, formID, dt) {
                // fields
                var ctrolIDs = commonManger.returnFiledsNames(formID);

                // data as array
                gridData = $.isArray(gridData) ? gridData : $.makeArray(gridData);

                // showing data in array
                $.each(gridData, function (i, item) {
                    var row = [];

                    for (var i = 0; i < ctrolIDs.length; i++) {
                        var fieldName = ctrolIDs[i];
                        if ($('#' + fieldName).hasClass('money')) {
                            row.push(numeral(item[fieldName]).format('0.00'));
                        }
                        else {
                            row.push(item[fieldName]);
                        }
                    }

                    row.push('<button class="btn btn-minier remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>');

                    dt.row.add(row).draw();
                });
            };


        return {
            Init: Init
        };

    }();

//#endregion

payInvoicePayment.Init();