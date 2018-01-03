//#region "Buy new car invoice manager"

var
    buyInvoiceAddManager = buyInvoiceAddManager || {},
    buyInvoiceAddManager = function () {


        // variables
        var mainURL = 'InvoicePayAdd.aspx/', $auction = $('select[id$=ddlSupplier]'), $buyer = $('select[id$=ddlBuyer]'), $chassis = $('#txtChassisNo'),
            $dist = $('select[id$=ddlDistination]'), $shipper = $('select[id$=ddlShipper]'), $lotNo = $('#txtLotNo'),
            $region = $('#ddlRegion'), $model = $('#ddlModel'), $maker = $('#ddlMaker'), form = 'aspnetForm',


            // methods
            updateChosen = function () {
                $(".chzn-select").chosen({ allow_single_deselect: true, no_results_text: "اختـــر", search_contains: false }).trigger('chosen:updated');
            },
            successCallback = function (data) {
                data = data.d;
                if (data.Status)
                    window.location.href = "Images.aspx?id=" + data.ID;
                else
                    commonManger.showMessage('خطأ بالحفظ:', data.Message)
            },
            saveInvoice = function (scParam) {
                var url = mainURL + 'SaveInvoice', DTO = { '_car': scParam };
                commonManger.doWork('anyThing', form, url, DTO, successCallback, commonManger.errorException);
            },
            GetShippersList = function () {
                var distinationId = $dist.val(), regionId = $region.val();
                if (distinationId > 0 && regionId > 0) {
                    var url = mainURL + 'GetShippers', data = { 'region': regionId, 'dist': distinationId };
                    dataService.callAjax('POST', JSON.stringify(data), url, function (data) { fillListControl(data, $shipper); }, commonManger.errorException);
                }
                else {
                    updateChosen();
                }
            },
            GetModelsList = function (value) {
                if (value > 0) {
                    var url = mainURL + 'GetModels', data = { 'modelId': value };
                    dataService.callAjax('POST', JSON.stringify(data), url, function (data) { fillListControl(data, $model); }, commonManger.errorException);
                }
                else {
                    updateChosen();
                }
            },
            fillListControl = function (response, $control) { // bind data with list control
                var items = response.d;
                $control.html('<option></option>');
                $.each(items, function (i, item) {
                    if (item.__type === 'Aliraqcars.Domain.Concrete.IShippingCompaniesNames')
                        $('<option>', { value: item.ShipCompanyID }).html(item.ShipCompanyNameAr).appendTo($control);
                    else if (item.__type === "Aliraqcars.Domain.Data.Buyers_SelectName2Result")
                        $('<option>', { value: item.BuyerID }).html(item.BuyerName).appendTo($control);
                    else if (item.__type === "Aliraqcars.Domain.Data.CarsModel_SelectRowResult")
                        $('<option>', { value: item.ModelID }).html(item.TypeNameEn).appendTo($control);
                });

                // in buyers select control only and edit state.
                // if the current buyer not exits in the select options.
                // add it then select after update also.
                if (buyerSelectedVal && buyerSelectedVal.indexOf('|') > 0 && $control === $buyer) { // for edit for buyers

                    var additionalItem = buyerSelectedVal.split('|'), // current selection buyer name with id
                        isExist = $control.find('option[value="' + additionalItem[0] + '"]'); // if buyer exist in the list of select.
                    // check this option not exits.
                    if (typeof isExist != 'undefined')
                        $('<option>', { value: additionalItem[0] }).html(additionalItem[1]).appendTo($control); // add as a new item

                    $control.val(additionalItem[0]); // add selected attribute for this option.
                }
                updateChosen();
            },
            GetBuyers = function (selectedVal) {
                if (selectedVal !== "") {
                    var data = { 'auction': selectedVal }, url = mainURL + 'GetBuyersByAuction';
                    dataService.callAjax('POST', JSON.stringify(data), url, function (d) { fillListControl(d, $buyer); }, commonManger.errorException);
                }
                else
                    updateChosen();
            },
            showHideDiv = function () {
                var checkVal = $('span[id$=ddlInvoiceType] input:checked').val();
                $('#divSaleTypeID').css('display', 'block'); // reset




                if (checkVal == 3) { // Relist                                        
                    $('#lbltxtPayPrice').html('مبلغ الغرامة <span class="text-error">*</span>');
                    $('#divSuplier').css('display', 'block');
                    $('#divCity,#divSaleTypeID').css('display', 'none');
                    // reset distination and shipper controls
                    $('#ddlDistination,#ddlShipper,#ddlRegion').val('');
                    updateChosen();


                    // let editing buy price.
                    // if change buy type from Buy to Relist.
                    // in super admin level
                    var prm = commonManger.fullRoles(),
                        $buyPrice = $('#txtPayPrice'),
                        isDisabledPrice = $buyPrice.is(':disabled');




                    if (prm === true && isDisabledPrice === true) {

                        // buy to relist disabled
                        localStorage.setItem('by_2_rlist_dsbl', isDisabledPrice);

                        $buyPrice.removeClass('aspNetDisabled').removeAttr('disabled');
                    }

                }
                else {
                    if (checkVal == 2) {// بيع سريع : remove required validation
                        $('#divSuplier,#divCity,#divSaleTypeID').css('display', 'none');
                    }
                    else { // شراء
                        $('#divCity,#divSuplier').css('display', 'block');
                    }

                    $('#lbltxtPayPrice').html('سعر الشراء <span class="text-error">*</span>');


                    // if the user need to recheck buy type to buy from relist again
                    var getBuyToRelistAgain = localStorage.getItem('by_2_rlist_dsbl');


                    if (getBuyToRelistAgain === 'true') {
                        $('#txtPayPrice').addClass('aspNetDisabled').prop('disabled', true);
                    }

                }

            },
            checkChessisExistCallBack = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
                if (jsn) {
                    var msg = 'الشاصي الذي أدخلته موجود بالفعل مع السيارة رقم: ' + jsn.CarID;
                    $chassis.attr('title', msg).tooltip('show').closest('.control-group').addClass('error');
                    commonManger.showMessage('الشاصي مكرر', msg);
                } else
                    $chassis.attr('title', '');
                $chassis.prop('disabled', false);
            },
            checkChessisExistBefore = function () {
                var url = sUrl + 'GetDataList', data = { 'actionName': 'CarsData_CheckChassisExist', 'names': ['CarID', 'ChassisNo'], 'values': [$('input[id$=hfId]').val(), $chassis.val()] };
                dataService.callAjax('POST', JSON.stringify(data), url, checkChessisExistCallBack, commonManger.errorException);
            },
            checkLotExistCallBack = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
                if (jsn) {
                    var msg = 'رقم اللوت الذي أدخلته موجود بالفعل للسيارة رقم: ' + jsn.CarID;
                    $lotNo.attr('title', msg).tooltip('show').closest('.control-group').addClass('error');
                    commonManger.showMessage('رقم اللوت مكرر', msg);
                } else
                    $lotNo.attr('title', '');
                $lotNo.prop('disabled', false);
            },
            checkLotExistBefore = function () {
                if ($lotNo.val() != '') {
                    var url = sUrl + 'GetDataList', data = { 'actionName': 'CarsData_CheckLotExist', 'names': ['CarID', 'LotNo'], 'values': [$('input[id$=hfId]').val(), $lotNo.val()] };
                    dataService.callAjax('POST', JSON.stringify(data), url, checkLotExistCallBack, commonManger.errorException);
                }
            },
            GetClientName = function (val) {
                var url = sUrl + 'GetDataList', data = { 'actionName': 'ClientBuyers_GetClientID', 'names': ['BuyerID'], 'values': [val] };
                dataService.callAjax('POST', JSON.stringify(data), url, function (d) { var jsnData = commonManger.comp2json(d.d), jsn = jsnData.list; if (jsn) { $('#ToSaleClientID').val(jsn.ClientID); } updateChosen(); }, commonManger.errorException);
            },
            initProperties = function () {
                localStorage.removeItem('by_2_rlist_dsbl');
            },
            doPageEvennts = function () {
                $('#addPayPrice').click(function (e) {
                    e.preventDefault();
                    var _payPrice = $('#txtPayPrice').val();
                    if (!isNaN(_payPrice) && (_payPrice * 1) > 0)
                        $('#txtWebsitePrice').val(_payPrice).select();
                });

                $lotNo.on('blur', function (e) {
                    e.preventDefault();
                    // check lot no exists before.
                    if ($(this).val() != '') {
                        $lotNo.prop('disabled', true);
                        checkLotExistBefore();
                    }
                });

                $chassis.on('blur', function (e) {
                    e.preventDefault();
                    if ($chassis.val() != '') {
                        $chassis.prop('disabled', true);
                        checkChessisExistBefore();
                    }
                });

                $buyer.change(function () {
                    // in adding mode only
                    var url = window.location.href.toLowerCase(), buyerValue = $(this).val();
                    if (url.indexOf('2015/invoice') > 0 && buyerValue != '') // add new car mode
                        GetClientName(buyerValue);
                });

                $auction.change(function () {
                    GetBuyers($(this).val());
                });

                $region.change(function () {
                    GetShippersList();
                });

                $dist.change(function () {
                    GetShippersList();
                    // show / hide region based on destination
                    showHideRegion();
                });

                $maker.change(function () {
                    GetModelsList($(this).val());
                });

                $('#ddlDocTypes').change(function () {
                    var buyVal = $(this).val(),
                        $saleTypeDelayed = $('#SaleTypeID_1'),
                        $saleTypeCache = $('#SaleTypeID_0');


                    // reset
                    $saleTypeDelayed.prop('disabled', false);


                    // buying by the client
                    if (buyVal === '2') {

                        // reset selection
                        $saleTypeDelayed.prop('checked', false);
                        $saleTypeCache.prop('checked', false);


                        $saleTypeDelayed.prop('disabled', 'disabled');
                        $saleTypeCache.prop('checked', true);
                    }
                });

                $('#ddlCarStatus').change(function () {
                    var selVal = $(this).val(),
                        accType = $('#divAccidentStatusID');

                    accType.addClass('hide').find('select').val('');

                    if (selVal === '3') {
                        accType.removeClass('hide');
                    }

                    updateChosen();
                });

                // change invoicePayType
                $('span[id$=ddlInvoiceType] input').change(function () {
                    showHideDiv();
                });

                $('#btnSave').click(function (e) {
                    e.preventDefault();
                    var car = {};
                    car.PayInvTypeID = $('#ddlInvoiceType').find(":checked").val();
                    car.CarID = $('input[id$=hfId]').val();
                    car.ChassisNo = $chassis.val();
                    car.ColorID = $('#ddlColor').val();
                    car.InvoiceDate = commonManger.dateFormat($('#txtTrxDate').val());
                    car.IsDeleted = false;
                    car.LotNo = $lotNo.val();
                    car.Notes = $('#txtNotes').val();
                    car.Visitors = 0;
                    car.ModelID = $model.val();
                    car.PayPrice = $('#txtPayPrice').val();
                    car.PayTypeID = $('#ddlDocTypes').val();
                    car.WorkingStatusID = $('#ddlCarStatus').val();
                    car.Year = $('#ddlYear').val();
                    car.TransmissionID = $('#ddlTransmission').val();
                    car.DistinationID = ($dist.val() !== "" ? $dist.val() : null);
                    car.OwnerID = 1;
                    car.view_home = $('#view_home').find(":checked").val();
                    car.view_offer = $('#view_offer').find(":checked").val();
                    car.Arrived = false; //$('#view_arrive').find(":checked").val();
                    var viewSite = $('#view_website').find(":checked").val();
                    car.view_website = (viewSite !== undefined && viewSite !== '') ? viewSite : null;
                    car.WesitePrice = $('#txtWebsitePrice').val();
                    car.ShippingCalcID = $('#rblHowToCalcShipping').find(":checked").val();
                    car.SaleTypeID = $('#SaleTypeID').find(":checked").val();
                    car.RegionID = $region.val();
                    car.ShipperID = ($shipper.val() !== "" ? $shipper.val() : null);
                    car.WithoutShipping = $('#WithoutShipping').is(':checked');
                    car.IsGulfOldCars = $('#IsGulfOldCars').is(':checked');

                    if (car.IsGulfOldCars === false)
                        car.BuyerID = ($buyer.val() !== "" ? $buyer.val() : null);

                    if (car.WorkingStatusID == 3) {
                        car.AccidentStatusID = $('#AccidentStatusID').val().join(",");
                    }

                    car.AuctionID = $auction.val();
                    car.ToSaleClientID = $('#ToSaleClientID').val();
                    car.SalePriceDemand = $('#SalePriceDemand').is(':checked');

                    var validFlag = commonManger.applyValidation(form); // check 4 validation
                    if (validFlag)
                        saveInvoice(car);
                });


                var withOutShippCheck = $('#WithoutShipping'),
                    oldCarCheck = $('#IsGulfOldCars'),
                    // show / hide region based on destination
                    showHideRegion = function () {
                        var isWithoutShipping = withOutShippCheck.is(':checked') ? true : false,
                            isGulfauto = $dist.val() !== '4';
                        
                        if (isWithoutShipping && isGulfauto) {
                            $region.val('').closest('div.region').addClass('hidden');
                        } else {
                            $region.closest('div.region').removeClass('hidden');
                        }
                    };

                // check/unCheck old cars event 
                // not payment this car
                oldCarCheck.change(function () {
                    var checked = $(this).is(':checked'); //, withShipping = withOutShippCheck.is(':checked');

                    //if (withShipping === false) {
                        $buyer.closest('div.control-group').removeClass('hidden');
                        $auction.closest('div.control-group').removeClass('hidden');
                    //}


                    if (checked === true) {
                        $buyer.val('').trigger("chosen:updated");
                        $auction.val('').trigger("chosen:updated");


                        $buyer.closest('div.control-group').addClass('hidden');
                        $auction.closest('div.control-group').addClass('hidden');
                    }
                });


                // check/unCheck without shipping event
                withOutShippCheck.change(function () {
                    var checked = $(this).is(':checked');

                    // reset
                    $('.withShipping').removeClass('hidden');

                    if (checked) {
                        // reset
                        $('#ddlShipper').val('').trigger("chosen:updated"); // #ddlRegion,#ddlSupplier,#ddlBuyer,
                        $('#rblHowToCalcShipping').find('input[value="1"]').prop('checked', true);

                        // hide (Shipper & Shipping calc type)
                        $('.withShipping').addClass('hidden');


                        // change destination title
                        $('.destinTitle').text('مكان السيارة');

                    } else {
                        $('.destinTitle').text('جهة الوصول');
                    }

                    // show / hide region based on destination
                    showHideRegion();
                });

                // edit mode
                if (window.location.href.toLowerCase().indexOf('/pay/') > 0) {
                    withOutShippCheck.change();
                    oldCarCheck.change();
                }


                // initialize div
                showHideDiv();
                updateChosen();


                $('#ddlDocTypes').change();
                $('[data-toggle="popover"]').popover();
            },
            init = function () {
                initProperties();
                doPageEvennts();
            };

        return {
            Init: init,
            $auctionElement: $auction
        }
    }();

//#endregion
