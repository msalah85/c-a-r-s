//#region "sale invoice manager"
var
    pageManager = pageManager || {},
    pageManager = function () {

        var
            $CarSizeSelect = $('select[id$=ddlCarSize]'), $DistinationSelect = $('select[id$=ddlDistination]'),
            $client = $('select[id$=ddlClient]'), $SaleType = $('.radioList'),
            $hfClientCashComm = $('input[id$=hfClientCashComm]'), $hfClientCreditComm = $('input[id$=hfClientCreditComm]'),
            $hfExtraCashComm = $('input[id$=hfExtraCashComm]'), $hfExtraCreditComm = $('input[id$=hfExtraCreditComm]'),
            mainServiceUrl = "InvoiceSaleAdd.aspx/", user_type = $('#user_type'),


        // methods
            showHideControls = function () {
                var divlblCarSizePrice = $('div[id$=DivlblCarSizePrice]');
                if (user_type.val() === '2') {
                    divlblCarSizePrice.addClass('hidden');
                    $('label[id$=divlblPayTypePriceSum]').text('تكلفة النقل');
                } else {
                    $('label[id$=divlblPayTypePriceSum]').text('عمولة الشركة');
                    divlblCarSizePrice.removeClass('hidden');
                }
            },
            showAlertMessage = function (msg, showMe) {
                if (showMe === true) {
                    $('div.sale-message').html('<div class="alert alert-block alert-danger"><strong>تنبـــيه: </strong> ' + msg + '</div>')
                } else {
                    $('div.sale-message').html('');
                }
            },
            bindClientCommissions = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;

                // reset commission     
                $hfClientCashComm.val(0);
                $hfClientCreditComm.val(0);
                $hfExtraCashComm.val(0);
                $hfExtraCreditComm.val(0);
                $('#hfTowingLoadingOF').val(0);


                // populate commissions based on destination city.
                if (jsn) {


                    user_type.val(1); // set client contract type.


                    // set basic commissions
                    $hfClientCashComm.val(jsn.CommissionCash ? jsn.CommissionCash : 0);
                    $hfClientCreditComm.val(jsn.CommissionCredit ? jsn.CommissionCredit : 0);
                    $hfExtraCashComm.val(jsn.ExtraCash ? jsn.ExtraCash : 0);
                    $hfExtraCreditComm.val(jsn.ExtraCredit ? jsn.ExtraCredit : 0);



                    // set commission by region
                    var totalCommissionByRegion = 0;

                    totalCommissionByRegion = jsn.Towing ? jsn.Towing * 1 : 0;
                    totalCommissionByRegion += jsn.LoadingOF ? jsn.LoadingOF * 1 : 0;

                    totalCommissionByRegion += jsn.Partitioning ? jsn.Partitioning * 1 : 0;
                    totalCommissionByRegion += jsn.Customs ? jsn.Customs * 1 : 0;
                    totalCommissionByRegion += jsn.Extra ? jsn.Extra * 1 : 0;


                    var saveBtnID = 'btnSave',
                        saleTypeSelected = $('.radioList :radio:checked').val();

                    if (saleTypeSelected && (saleTypeSelected * 1) > 0) {
                        disableControl(saveBtnID, false); // reset
                        showAlertMessage('', false);
                    }

                    // amount per container
                    // must know no for cars inside BOL.
                    // car should booked in BOL/Shipping Invoice.
                    if (jsn.LoadingOFContainer * 1 > 0 || jsn.CustomsContainer * 1 > 0) {
                        if (jsn.CarsNo * 1 > 0)
                            totalCommissionByRegion += (((jsn.LoadingOFContainer * 1) + (jsn.CustomsContainer * 1)) / (jsn.CarsNo));
                        else {
                            console.log('يرجي التحقق من انشاء BOL للسيارة لمعرفة عدد السيارات بالحاوية، أو مراجعة عقد العميل');
                            // show notification message
                            showAlertMessage('يرجي التحقق من انشاء BOL للسيارة لمعرفة عدد السيارات بالحاوية، أو مراجعة عقد العميل.', true);

                            // disable saving this invoice
                            disableControl(saveBtnID, true);
                        }
                    }

                    // get sale type
                    var _saleType = $SaleType.find(":checked").val();

                    // delayed sale type (not cash)
                    // contract type List
                    // contract has extra amount for delayed type.
                    if (($hfClientCreditComm.val() * 1) == 0 && (jsn.ExtraCreditList * 1) > 0) {
                        //totalCommissionByRegion += (jsn.ExtraCreditList * 1);
                        $hfClientCreditComm.val(jsn.ExtraCreditList);
                    }


                    $('#hfTowingLoadingOF').val(totalCommissionByRegion.toFixed());


                    // for permanent clients and commissions by city
                    showHideControls();
                }
                else {// get car total cost - عميل مؤقت
                    user_type.val(2);

                    showHideControls(); // for temporary clients.

                    // show only default costs for this car.
                    var sumCost = ($('input[id$=hfCarDefaultCosts]').val() * 1) > ($('#lblPayPrice').val() * 1) ? ($('input[id$=hfCarDefaultCosts]').val() * 1) - ($('#lblPayPrice').val() * 1) : 0;
                    $('input[id$=lblPayTypePriceSum]').val(sumCost.toFixed(0));

                    // activate sale price
                    $('#txtSalePrice').removeAttr('disabled').removeClass('aspNetDisabled');

                    // hide discount and extra amounts
                    $('#CarMoreCost,#CarDiscount').closest('div.control-group').addClass('hidden');
                    $('.btnApprove').addClass('hidden');
                }

                CalculateCarCommission(); // calculate car commissions

            },
            getClientCommissions = function () {
                var cID = commonManger.getUrlVars().id,
                    clientID = $client.val(),
                    dto = {
                        actionName: 'CarSaleCommission_Select',
                        names: ['CaID', 'ClID'],
                        values: [cID, clientID]
                    };


                if (cID !== undefined && cID * 1 > 0) {
                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetDataList', bindClientCommissions, commonManger.errorException);
                }

            },
            disableControl = function (ctrlID, disabled) {
                if (disabled === true)
                    $('#' + ctrlID).attr('disabled', true).addClass('aspNetDisabled hidden');
                else
                    $('#' + ctrlID).removeAttr('disabled').removeClass('aspNetDisabled hidden');
            },
            GetCarSize = function () {
                var carSizeID = $CarSizeSelect.val(),
                    payInvType = $('#PayTypeID').val();

                // حجم السيارة كبير ، والسيارة شراء
                if (carSizeID == 2 && payInvType == 1) {
                    $('input[id$=lblCarSizePrice]').val(400);
                }
                else
                    $('input[id$=lblCarSizePrice]').val(0);

                // total
                GetTotalCarSalePrice();
            },
            CalculateCarCommission = function () {
                if (user_type.val() === '1') {
                    var carPayPrice = $('input[id$=lblPayPrice]').val(), $carFinalComm = $('input[id$=lblPayTypePriceSum]'),
                        //jordan = $DistinationSelect.val()
                        _type = $SaleType.find(":checked").val(),
                        clientCommVal = parseFloat((_type == 1 ? $hfClientCashComm.val() : $hfClientCreditComm.val())),
                        extraCommVal = parseFloat((_type == 1 ? $hfExtraCashComm.val() : $hfExtraCreditComm.val())), //isJordan = (jordan == 2),
                        calcExtraVal = 0, addCarDefaultCostsOntheComm = $('input[id$=hfTowingLoadingOF]').val();


                    //if (isJordan)
                    //    calcExtraVal = parseFloat($('input[id$=hfRegionJoCoast]').val());
                    if (carPayPrice > 10000) {
                        for (var i = 10000; i < carPayPrice; i += 5000) {
                            calcExtraVal += extraCommVal;
                        }
                    }

                    if (addCarDefaultCostsOntheComm > 0) {
                        clientCommVal += parseFloat(addCarDefaultCostsOntheComm);
                    }

                    // put commission & extra in hidden fields
                    $('input[id$=lblCarPrice]').val(calcExtraVal);
                    $('input[id$=lblPayTypePrice]').val(clientCommVal);
                    // sum all of commissions.
                    var result = (calcExtraVal + clientCommVal);
                    $carFinalComm.val(result);
                }


                // car total
                GetTotalCarSalePrice();
            },

        // Calculate total car price.
            GetTotalCarSalePrice = function () {
                var salePriceInput = $('input[id$=txtSalePrice]');


                if (user_type.val() === '1') {
                    var _total = sumAll($('input[id$=lblPayPrice]').val(), $('input[id$=lblCarSizePrice]').val(), $('input[id$=lblPayTypePriceSum]').val());

                    // manual discount
                    var _discountManual = $('#CarDiscount').val();
                    if (!isNaN(_discountManual) && _discountManual * 1 > 0) {
                        _total = _total - _discountManual;
                    }

                    // manual extra cost
                    var _moreManual = $('#CarMoreCost').val();
                    if (!isNaN(_moreManual) && _moreManual * 1 > 0) {
                        _total += parseFloat(_moreManual);
                    }

                    $('input[id$=lblFullPrice]').val(_total);

                    if (!isNaN(salePriceInput.val()) && salePriceInput.val() * 1 > 0) {
                        salePriceInput.val(_total);
                    }

                    $('.btnApprove').removeClass('hidden');
                }
                else { // عميل مؤقت
                    var _tal = 0, payTypeID = $('#PayTypeID').val();

                    if (payTypeID === '3') { // relist
                        _tal = parseFloat($('input[id$=lblPayPrice]').val());
                        $('input[id$=lblPayTypePriceSum]').val(0)

                        // show ok button
                        $('.btnApprove').removeClass('hidden');
                        $('#txtSalePrice,input[id$=ddlSaleTypes_1]').prop('disabled', true).prop('aspNetDisabled', 'true');

                        $('span[id$=ShippingCalcID]').text('سيارة Relist').addClass('red');

                    }
                    else {
                        _tal = parseFloat($('input[id$=lblPayPrice]').val()) + parseFloat($('input[id$=lblPayTypePriceSum]').val());
                        $('input[id$=lblFullPrice]').val(_tal);
                    }



                    if (!isNaN(salePriceInput.val()) && salePriceInput.val() * 1 > 0) {

                        // animated around sale price text without updating its value.                      
                        salePriceInput.css({ 'outline': '6px dashed yellow', 'box-shadow': '0 0 0 6px #EA3556', 'animation': '1s animateBorder infinite' });
                        setTimeout(function () {
                            salePriceInput.removeAttr('style');
                        }, 800);

                        //salePriceInput.val(_tal);
                    }
                }
            },
            sumAll = function () {
                var sum = 0;
                for (var i = 0, j = arguments.length; i < j; i++) {
                    if (CheckIsNumeric(arguments[i])) {
                        sum += parseFloat(arguments[i]);
                    }
                }
                return sum;
            },
            CheckIsNumeric = function (input) {
                return (input - 0) == input && input.length > 0;
            },
            savedResult = function (d) {
                d = d.d;
                if (d.Status) {
                    commonManger.showMessage('تم الحفظ بنجاح:', d.Message);
                    window.location.href = 'InvoiceSalePrint.aspx?id=' + d.ID; //$('#hfCarID').val();
                }
                else {
                    commonManger.showMessage('خطأ بالحفظ:', d.Message);
                }
            },
            saveConfirmationByUser = function (funCallBack) {
                if ($.isFunction(funCallBack)) {
                    bootbox.confirm("تنبيه/  سعر البيع أقل من تكاليف السيارة",
                        function (result) {
                            if (result) {
                                funCallBack();
                            } else {
                                commonManger.showMessage('خطأ فى الحفظ:', 'يرجي التحقق من سعر البيع')
                            }
                        });
                }
            },
            SatrtSaveForm = function () {
                var pyType = $('label[id$=lblPayType]').text().indexOf('العراق') > 0 ? 1 : 2;
                var values = [$('#hfId').val(), $('#hfCarID').val(), $('.radioList :radio:checked').val(), $('#txtTrxDate').val(), $('#ddlClient').val(), $('#ddlDistination').val(),
                              $('#txtSalePrice').val(), $('#lblPayPrice').val(), $('#lblFullPrice').val(), $('#txtArriveDate').val(), $('#txtNotes').val(),
                              $('#user_type').val(), $('#lblCarSizePrice').val(), $('#lblCarPrice').val(), $('#lblPayTypePrice').val(), pyType,
                              $('#CarDiscount').val(), $('#CarMoreCost').val()],
                prm = { 'parm': values };


                if ($('#txtSalePrice').val() * 1 > 0) { // should has value


                    console.log(prm);

                    // check salePrice > buyPrice
                    var saveAllData = function () {
                        dataService.callAjax('Post', JSON.stringify(prm), mainServiceUrl + 'SaveInv', savedResult, commonManger.errorException);
                    };



                    if (validateSalePrice()) {
                        saveAllData();
                    } else {
                        saveConfirmationByUser(saveAllData);
                    }

                }
                else
                    commonManger.showMessage('سعر البيع مطلوب', 'يرجي ادخال سعر البيع أولاً');
            },
            validateSalePrice = function () {
                var buyParice = $('#lblFullPrice').val() * 1,
                    _salePrice = $('#txtSalePrice').val() * 1,
                    isValid = true;

                // check has value
                buyParice = $.isNumeric(buyParice) ? buyParice : 0;
                _salePrice = $.isNumeric(_salePrice) ? _salePrice : 0;


                if (buyParice > _salePrice) { // losing
                    isValid = false;
                }

                return isValid;
            },
            pageEvents = function () {

                // events
                $client.change(function () {
                    getClientCommissions();
                });
                $DistinationSelect.change(function () {
                    CalculateCarCommission();
                });
                $SaleType.change(function () {
                    CalculateCarCommission();
                });
                $CarSizeSelect.change(function () {
                    GetCarSize();
                });



                // tool tip
                $('input[id$=txtSalePrice]').on('show.bs.tooltip', function () { var tipContent = 'سعر بيع السيارة الافتراضى: ' + $('input[id$=lblFullPrice]').val(); $(this).attr('title', tipContent).attr('data-original-title', tipContent); });
                $('.profit').on('show.bs.tooltip', function () { var tipContent = 'إجمالى كلفة السيارة: ' + $('input[id$=hfCarDefaultCosts]').val() + '$\nسعر البيع: ' + ($('input[id$=txtSalePrice]').val() === '' ? 0 : $('input[id$=txtSalePrice]').val()) + '$\nالربح: ' + ((parseFloat($('input[id$=txtSalePrice]').val() === '' ? 0 : $('input[id$=txtSalePrice]').val()) - parseFloat($('input[id$=hfCarDefaultCosts]').val())).toFixed(0) + '$'); $(this).attr('data-original-title', tipContent); });

                // start save invoice
                $('#btnSave').click(function (e) {
                    e.preventDefault();
                    var isValid = commonManger.applyValidation('aspnetForm');
                    if (isValid)
                        SatrtSaveForm();
                });

                // approve sale price
                $('.btnApprove').click(function (e) {
                    e.preventDefault();
                    var salePrice = $('#lblFullPrice').val();
                    $('#txtSalePrice').val(salePrice).select();
                });

                // 
                $('#CarDiscount,#CarMoreCost').on('keyup', function () {
                    GetTotalCarSalePrice();
                });
            },
            init = function () {

                $('.carid').text($('#hfCarID').val());
                GetCarSize();

                pageEvents();

                // initialize client destination commission
                getClientCommissions();
            };

        return {
            Init: init
        };
    }();

pageManager.Init();
//#endregion



