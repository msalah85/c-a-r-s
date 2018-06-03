var
    pageManager = function () {
        "use strict";

        var
            _id = commonManger.getUrlVars().id,
            _done,
            selCarId = 0,


            Init = function () {
                bindCurrentId();
                workPerform(); // run events.
            },
            bindCurrentId = function () {
                _done = $('#doneFlag');

                // client id
                _id = commonManger.getNumbersFromString(_id);
                // selected car id
                selCarId = commonManger.getUrlVars().selcarid;


                if (_id !== "0")
                    filllistItems();

                // assign link payments
                $('#addnew-dicount').attr('href', 'ClientDiscounts.aspx?id=' + _id);
                $('#addnew-extra').attr('href', 'ClientExtras.aspx?id=' + _id);
                $('.lnk-pay').attr('href', 'ClientsPaymentsView.aspx?id=' + _id);
                $('.lnkClientCars').attr('href', 'ClientFinishedCars.aspx?id=' + _id);
                $('.addPay').attr('href', 'ClientsPaymentsAdd.aspx?cid=' + _id);
            },
            btnProceessing = function (btnElem, isProceessing) { // Under process, please waint
                if (isProceessing === true) {
                    btnElem.addClass('disabled').prop('disabled', true).text('قيد التنفيذ...');
                    // prevent click again on the same pay amount.
                    $('#listItems tbody td a.waitingPay').removeAttr('href');
                } else {
                    btnElem.removeClass('disabled').removeAttr('disabled').text(function () {
                        return $(this).attr('data-text');
                    });
                }
            },
            workPerform = function () {
                // view list by tabs
                $('#carTabs li a').click(function (e) {
                    e.preventDefault();

                    var _this = $(this);

                    if (!_this.closest('li').hasClass('active')) {
                        _done.val(_this.data('id'));

                        updateGrid();
                    }
                });

                // cancel vat
                $('#cancelVatModal .modal-footer .btn-warning').on('click', function (e) {
                    e.preventDefault();

                    btnProceessing($(this), true); // under process please wait

                    var
                        _invoiceID = $('#cancelVatInvoiceID').val(),
                        _cancelVatReason = $('#cancelVatNotes').val();

                    if (_invoiceID && _cancelVatReason != '') {
                        var form = 'aspnetForm',
                            url = sUrl + 'SaveData',
                            DTO = {
                                actionName: 'ClientInstallments_CancelVat',
                                names: ['InvoiceID', 'Reason'],
                                values: [_invoiceID, _cancelVatReason]
                            };

                        commonManger.doWork('cancelVatModal', form, url, DTO, successCallback,
                            commonManger.errorException);
                    }
                    else {
                        commonManger.showMessage('بيانات مطلوبة', 'يرجي التحقق من رقم السيارة وسبب الإلغاء أولاً.'); $('#cancelVatNotes').focus();
                        btnProceessing($(this), false); // under process please wait
                    }
                });


                // cancel invoice
                $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                    e.preventDefault();

                    btnProceessing($(this), true); // under process please wait

                    var _invoiceID = $('#cancelInvoiceID').val(),
                        cancelReason = $('#cancelNotes').val();

                    if (_invoiceID && cancelReason != '') {

                        var form = 'aspnetForm',
                            url = 'clientcars.aspx/Cancel',
                            DTO = { "value": _invoiceID, 'reason': cancelReason };

                        commonManger.doWork('cancelModal', form, url, DTO, successCallback, commonManger.errorException);
                    }
                    else {
                        commonManger.showMessage('بيانات مطلوبة', 'يرجي التحقق من رقم السيارة وسبب الحذف أولاً.'); $('#cancelNotes').focus();
                    }
                });

                // cancel installment
                $('#undoInstallmentModal .modal-footer .btn-danger').on('click', function (e) {
                    e.preventDefault();

                    btnProceessing($(this), true); // under process please wait

                    // installment cancellation parameters.
                    var obj = {
                        carNo: $('#undoCarID').text(),
                        clientID: $('#undoClientID').val(),
                        installmentTypeID: $('#undoInstallmentTypeID').val(),
                        reason: $('#undoNotes').val()
                    };

                    if (obj.carNo != '' && obj.reason != '') {
                        var form = 'aspnetForm', url = 'clientcars.aspx/CancelInstallment',
                            DTO = { "values": [obj.carNo, obj.clientID, obj.installmentTypeID, obj.reason, ''] };



                        // start undo payment.
                        commonManger.doWork('cancelModal', form, url, DTO, successCallback, commonManger.errorException);
                    }
                    else {
                        $('#undoNotes').focus();
                        commonManger.showMessage('سبب الإلغاء مطلوب', 'يرجي ادخال سبب الحذف أولاً.');
                    }
                });

                // do installation
                $('#paymentModal .modal-footer button.btn-success').on('click', function (e) {
                    e.preventDefault();

                    btnProceessing($(this), true); // under process please wait

                    var form = 'aspnetForm',
                        url = 'clientcars.aspx/Save',
                        clientID = commonManger.getNumbersFromString(_id), // client id
                        scParam = [];

                    scParam.push("0",
                        clientID,
                        $('#CarID').val(),
                        commonManger.getNumbersFromString($('.Amount').text().replace(',', '')),
                        $('#InstallmentTypeID').val(), 0);
                    var DTO = { "values": scParam };


                    // start pay this amount
                    commonManger.doWork('paymentModal', form, url, DTO,
                        successCallback, commonManger.errorException);
                });

                // save car paper
                $('#paperModal .modal-footer button.btn-success').on('click', function (e) {
                    e.preventDefault();

                    var form = 'aspnetForm',
                        url = 'clientcars.aspx/SavePaper',
                        invoiceId = $('#paperInvoiceID').val(),
                        carID = $('#paperCarID').val(),
                        receive = $('input[name=ReceiveWithPaper]:checked', '#aspnetForm').val(),
                        paperSavedCall = function (d) {
                            if (receive === 'true') { // بالورق

                                commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', d.d.Message);

                                var distID = $('#paperDestID').val();
                                if (distID == 1) {
                                    // go to paper page directly
                                    // to client signature
                                    window.location.href = 'signature/signature.aspx?id=' + invoiceId + '&type=1';
                                    return;
                                }

                                $('.modal').modal('hide');
                            }

                            successCallback(d);

                        };


                    if (receive && carID !== "") {
                        var scParam = [carID, receive],
                            DTO = { "values": scParam };

                        commonManger.doWork('paperModal', form, url, DTO, paperSavedCall, commonManger.errorException);
                    }
                    else {
                        $('.modal').modal('hide');
                        commonManger.showMessage('وصول السيارة', 'لم يتم تسليم السيارة.');
                    }
                });

                // save car discount
                $('#discountModal .modal-footer button.btn-success').on('click', function (e) {
                    e.preventDefault();
                    btnProceessing($(this), true); // under process please wait

                    var form = 'aspnetForm',
                        url = 'clientcars.aspx/SaveDiscount',
                        carID = $('#discountCarID').val(),
                        discountValue = $('input[name=CarDiscount]', '#aspnetForm').val();

                    if (discountValue > 0 && carID !== "") {
                        var scParam = [carID, discountValue],
                            DTO = { values: scParam };

                        commonManger.doWork('discountModal', form, url, DTO, successCallback, commonManger.errorException);
                    }
                    else {
                        //$('div[id$=Modal]').modal('hide');
                        commonManger.showMessage('لم يتم الحفظ:', 'برجاء ادخال مبلغ الخصم على السيارة.');
                    }
                });

                // print discount/extra amount details
                $('#listItems').on('click', 'td i.amountDetails', function (e) {
                    e.preventDefault();

                    var _this = $(this),
                        obj = {
                            carid: _this.data('id'),
                            type: _this.data('amount-type')
                        },
                        url = 'PrintCar' + obj.type + '.aspx?id=' + obj.carid,
                        win = window.open(url, '', 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=no,height=400,width=600,top=50,left=100,', true);

                    setTimeout(function () { win.close(); }, 10000); // 10 sec
                });

                // focus button of save button
                $('.modal').on('show.bs.modal', function () {
                    btnProceessing($('div[id$=Modal].modal .modal-footer .btn[type="submit"]'), false);
                    var _this = $(this),
                        //_modalId = $(this).attr('id'),
                        _thisBtn = _this.find('.modal-footer button.btn-success').eq(0);

                    _thisBtn.focus();
                    return;
                });

                // client`s money back
                var _moneyBackModal = $('#moneyBack'),
                    usdAmount = $('input[name="money"]'),
                    receiptUrl = 'ReceiptPaymentsAdd.aspx?ids=' + _id;

                // show whats money would back to the client.
                $('.btn-money-back').on('click', function (e) {
                    var initDollarAmount = numeral().unformat($('strong.clear:eq(0)').text());
                    usdAmount.val(initDollarAmount);

                    // receipt url
                    _moneyBackModal.find('.modal-footer a.btn-success').attr('href', receiptUrl + '&cusd=' + initDollarAmount);
                });

                // change amount
                usdAmount.on('keyup', function (e) {
                    // receipt url
                    _moneyBackModal.find('.modal-footer a.btn-success').attr('href', receiptUrl + '&cusd=' + $(this).val());
                });

                updatableEvents();
            },
            updatableEvents = function () {
                // re init. tooltip
                $('[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip').tooltip({ delay: 0 })
                    .on('hide.bs.tooltip', function (e) {
                        $('div.tooltip').hide();
                    }); // "container": 'body'

                //hide tooltip in grid
                $(document).on('mouseleave', '[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip', function () {
                    $(this).tooltip('hide');
                    $('.tooltip.fade.in').remove();
                });
            },
            //updateClientBalance = function () {
            //    var dto = { actionName: 'Client_ResetBalance', value: _id },
            //        successCall = function (data) {
            //            var jsnAll = commonManger.comp2json(data.d), jsn = jsnAll.list, jsn1 = jsnAll.list1;
            //            if (jsn1) {
            //                bindClientBalance(jsn1);
            //                commonManger.showMessage('تم تحديث الرصيد', 'تم تحديث رصيد العميل بنجاح.');
            //            }
            //        };
            //    dataService.callAjax('POST', JSON.stringify(dto), sUrl + 'GetData', successCall, commonManger.errorException);
            //},
            successCallback = function (data) {
                console.log(data);

                data = data.d;
                $('div[id$=Modal].modal').modal('hide');
                btnProceessing($('div[id$=Modal].modal.fade.in .modal-footer .btn[type="submit"]'), false);

                commonManger.showMessage('تم تنفيذ الإجراء:', data.Message || data.message);

                if (data.Status) {
                    updateGrid();
                }
            },
            IsNumeric = function (input) {
                return (input - 0) == input && input.length > 0;
            },
            addition = function () {
                var sum = 0;
                for (var i = 0, j = arguments.length; i < j; i++) {
                    var value = arguments[i];

                    if (IsNumeric(value)) {
                        sum += parseFloat(value);
                    }
                }
                return sum;
            },
            bindNextPrevClients = function (data) {
                if (data) {
                    if (data[1])
                        $('.nextCar').html(data[1].full_name + ' <i class="icon-arrow-left"></i>').attr('href', 'ClientCars.aspx?id=' + data[1].ClientID).removeClass('hidden');
                    if (data[0])
                        $('.prevCar').html('<i class="icon-arrow-right"></i> ' + data[0].full_name).attr('href', 'ClientCars.aspx?id=' + data[0].ClientID).removeClass('hidden');
                }
            },
            blinkRow = function () {
                if (selCarId) {
                    // get row of the selected car
                    var tr = $("#listItems td").filter(function () {
                        return $(this).text() == selCarId;
                    }).closest("tr"), //$('#listItems tr:has(td:eq(0):contains(' + selCarId + '))'),
                        oldClass = tr ? tr.attr('class') : '';


                    if (tr) {
                        // set row flash css class.
                        $(tr).attr('class', 'selected-car');

                        // scroll to car position
                        var rowPosition = tr.position();
                        if (rowPosition) {
                            setTimeout(function () {
                                $(document).scrollTop(rowPosition.top);
                            }, 500);
                        }
                    }
                }
            },
            bindClientBalance = function (Client) {
                var _existTotal = $('.totalRequired'),
                    _debit = $('.debit');

                if (Client.full_name) {
                    $('.clientName').html(Client.full_name);
                    // assign client id and name to bonus
                    $('.addBonus').attr('href', 'ClientBonusAdd.aspx?cid=' + _id + '&cname=' + Client.full_name.split(' ').join('-'));
                }

                $('.carsRequired').text(numeral(Client.PresentRequired).format('0,0'));

                // total required on client.
                var totRequired = (Client.PresentRequired * 1);
                _existTotal.text(numeral(totRequired).format('0,0'));


                // client balance.
                var balance = (Client.BalanceDebit * 1) - (Client.BalanceCredit * 1);
                _debit.text(numeral(balance).format('0,0'));
                if (balance < 0)
                    _debit.removeClass('green').addClass('red balance-notes').attr('title', ' تم إلغاء إيداعات عملاء بعد السداد منها، يرجي اضافة ايداعات بهذه القيمة مرة أخري.');
                else if (balance > 0) {
                    // activate update balance action
                    $('.btn-refresh-balance').removeClass('hidden');
                }

                // client`s net amount // get clear value.
                var _clearAmount = balance - totRequired;
                $('.clear').text(numeral(_clearAmount).format('0,0'));

                // show/hide client`s money back
                if (_clearAmount > 0) {
                    $('a.btn-money-back').removeClass('hidden');
                }

                // deactivate all cost less than client debit
                $('#listItems a.pay strong').each(function (i, item) {
                    if ($(this).text().replace(',', '') * 1 > balance)
                        $(this).parent().replaceWith('<strong data-rel="tooltip" title="الرصيد لا يكفى لسداد المبلغ">' + $(this).html() + '</strong>');
                });
            },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            checkSelectedCarExistInCarsListArray = function (carsListArr, selectedCarID) {
                var existBefore = false;
                $.map(carsListArr, function (elementOfArray, indexInArray) {
                    if (elementOfArray.CarID == selectedCarID) {
                        existBefore = true;
                    }
                });
                return existBefore;
            },
            aarrivedCar = function (row) {
                var _arrived = (row.Arrived === 'true' || row.WithoutShipping === 'true')
                return _arrived;
            },
            xhr = null,
            filllistItems = function () {
                // global undo link for each installment
                var undoLink = '<a data-rel="tooltip" title="تراجع عن السداد" href="javascript:void(0);" class="undo"><i class="icon-undo bigger-120"></i></a>',

                    oTable = $('#listItems').DataTable({
                        "sDom": "<'row-fluid hidden-print'<'span6 'l><'span6 lft-pane'BfT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                        buttons: [{ extend: 'csv', text: 'تصدير إكسيل' }, { extend: 'copy', text: 'نسـخ', }, { text: 'طباعة', action: function (e, dt, node, config) { window.print(); } }],
                        responsive: true,
                        'language': {
                            search: '_INPUT_',
                            searchPlaceholder: 'برقم السيارة'
                        },
                        "bServerSide": true,
                        "bDestroy": true,
                        "iDisplayLength": 50,
                        saveState: true,
                        stateSaveCallback: function (settings, data) {
                            localStorage.setItem('DTCC_' + settings.sInstance, JSON.stringify(data))
                        },
                        stateLoadCallback: function (settings) {
                            return JSON.parse(localStorage.getItem('DTCC_' + settings.sInstance))
                        },
                        "sAjaxSource": "clientcars.aspx/LoadData",
                        "fnServerParams": function (aoData) {
                            aoData.push({ "name": "client", "value": _id }, { "name": "selectedCarId", "value": selCarId }, { "name": "done", "value": _done.val() });
                        },
                        "fnServerData": function (sSource, aoData, fnCallback) {
                            var bindMyGrid = function (data) {

                                // get compressed data
                                var jsnData = commonManger.comp2json(data.d),
                                    // main list and total counts
                                    aaData = jsnData.list, jsn1 = jsnData.list1,
                                    // client info & next prev clients
                                    Client = jsnData.list2, nextClient = jsnData.list3, newBonus = jsnData.list4, selectedCarRow = jsnData.list5;

                                // handle counts format.
                                jsn1 = jsn1 ? $.map(jsn1, function (el) { return el }) : [0];
                                var carsList = $.isArray(aaData) ? aaData : $.makeArray(aaData);


                                //=======================================================                            
                                // add the selected car to current list
                                if (selectedCarRow) {
                                    var _exist = checkSelectedCarExistInCarsListArray(carsList, selectedCarRow.CarID);
                                    if (!_exist) {
                                        carsList.unshift(selectedCarRow);
                                        jsn1[0] = (jsn1[0] * 1) + 1;
                                    }
                                }
                                //=======================================================

                                // create object for datatables control
                                var objDT = {
                                    sEcho: aoData.sEcho ? aoData.sEcho : 0,
                                    iTotalRecords: jsn1[0],
                                    iTotalDisplayRecords: jsn1[0],
                                    aaData: carsList
                                };

                                // bind DT data
                                fnCallback(objDT);


                                // client info and balance
                                if (Client && _done.val() == 0) {
                                    // bind client basic info.
                                    bindClientBalance(Client);
                                }

                                // next & previous clients 
                                bindNextPrevClients(nextClient)

                                updatableEvents();

                                //=======================================================
                                // bonus notifications for super admin
                                if (newBonus && commonManger.fullRoles()) {
                                    $('a.addBonus').attr({
                                        'href': 'ClientBonusAdd.aspx?id=' + newBonus.BonusID,
                                        title: 'لديك منحة/بونص/تعويض لعميل فى انتظار الموافقة عليه.',
                                        'data-original-title': 'لديك منحة/بونص/تعويض لعميل فى انتظار الموافقة عليه.'
                                    }).find('span.newBonus').removeClass('hidden').text(1);
                                }
                                //=======================================================
                            };

                            dataService.callAjax('GET', aoData, sSource, bindMyGrid, commonManger.errorException);
                        },
                        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                            // re-list cars show as different color.
                            if (aData.PayInvTypeID === '3')
                                $(nRow).addClass("car-relist");


                            // scrap cars show as yellow color
                            if (aData.ShippingCalcID === '2')
                                $(nRow).addClass("warning").attr('title', 'سيارة سكراب');


                            // hide finished car                    
                            if (_done.val() === 1) {
                                var itm = $(nRow).find('td strong.carRequired');
                                if (itm.text() === '0' && (aData.Arrived === 'true' || rowData.WithoutShipping === 'true' || rowData.SalePriceDemand === 'true')) {
                                    $(nRow).addClass('hidden');
                                }
                            }
                        },
                        "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                            var totRetainer = 0, totDelayed = 0, totActiveDelayed = 0, totNonActiveDelayed = 0, salePrices = 0,
                                totVAT = 0, totArrivedVAT = 0, totNotArrivedVAT = 0;

                            for (var i = 0; i < aData.length; i++) {
                                var _arrived = (aData[i].Arrived == 'true' || aData[i].WithoutShipping == 'true'),
                                    retainerCheck = (aData[i].SaleTypeID == 1 || _arrived || aData[i].SalePriceDemand != 'true'),
                                    delayedCheck = (aData[i].SalePriceDemand === 'true' && aData[i].SaleTypeID == 1);


                                salePrices += (aData[i].SalePrice * 1);
                                totRetainer += ((aData[i].CarRetainerDone * 1 > 0) ? 0 : (retainerCheck ? (aData[i].CarRetainer * 1) : 0));
                                totDelayed += ((aData[i].CarDelayedDone * 1 > 0) ? 0 : (aData[i].DelayedAfterDisc * 1));


                                // all of arrived cars or (demand cashed invoices).
                                if (_arrived || delayedCheck) {
                                    totActiveDelayed += ((aData[i].CarDelayedDone * 1 > 0) ? 0 : (aData[i].DelayedAfterDisc * 1)); // total delayed amount for arrived cars (Active)

                                    console.log(aData[i].VAT)
                                    totArrivedVAT += (aData[i].VAT * 1) - (aData[i].VATDone * 1);
                                }

                                if (!_arrived && !delayedCheck) { // Total of not arrived cars
                                    totNonActiveDelayed += ((aData[i].CarDelayedDone * 1 > 0) ? 0 : (aData[i].DelayedAfterDisc * 1)); // total of not Active delayed amount (cars not arrived)
                                    totNotArrivedVAT += (aData[i].VAT * 1) - (aData[i].VATDone * 1);
                                }
                            }


                            // 
                            $(nFoot).find('th:eq(1)').html(numeral(salePrices).format('0,0'));
                            $(nFoot).find('th:eq(2)').html(numeral(totRetainer).format('0,0'));



                            totVAT = totNotArrivedVAT + totArrivedVAT;
                            $('.total-vat').text(numeral(totVAT).format('0,0'));
                            $('.not-arrived-vat').text(numeral(totNotArrivedVAT).format('0,0'));
                            $('.arrived-vat').text(numeral(totArrivedVAT).format('0,0'));


                            $('.total-delayed').text(numeral(totDelayed).format('0,0'));
                            $('.arrived-delayed').text(numeral(totActiveDelayed).format('0,0'));
                            $('.not-arrived-delayed').text(numeral(totNonActiveDelayed).format('0,0'));

                        },
                        "fnInfoCallback": function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
                            var api = new $.fn.dataTable.Api(oSettings),
                                rowsCount = api.rows({ page: 'current' }).data().length; // number of rows shown in the grid.

                            // custom footer info (numberOfDisplayRows / AllRows)                 
                            var info = (rowsCount) + ' \\ ' + iTotal;
                            $('.dataTables_info').text(info);

                            // blink selected car`s row
                            blinkRow();
                        },
                        "aaSorting": [],
                        "aoColumns": [
                            {
                                "bSortable": true,
                                "mData": function (rowData) {
                                    return '<a data-rel="tooltip" title="# ' + rowData.SaleInvoiceID + ' التاريخ: ' + commonManger.formatJSONDateCal(rowData.InvoiceDate) + '" href=\"InvoiceSalePrint.aspx?id=' + rowData["SaleInvoiceID"] + '\">' + rowData["CarID"] + '</a>';
                                }
                            },
                            {
                                "mDataProp": "MainPicture",
                                "bSortable": false,
                                "mData": function (rowData) {
                                    return rowData["MainPicture"] != null ? '<a data-rel=\"tooltip\" title=\"صور السيارة رقم: ' + rowData["CarID"] + '\" href=\"images.aspx?id=' + rowData["CarID"] + '\"><img alt=\"car\" width=\"50\" src=\"/public/cars/' + rowData["CarID"] + '/_thumb/' + rowData["MainPicture"] + '\" /></a>' : '<a href=\"images.aspx?id=' + rowData["CarID"] + '\"><img alt=\"car\" width=\"50\" src="/public/cars/noimage.gif" /></a>';
                                }
                            },
                            {
                                "mDataProp": "ChassisNo",
                                "bSortable": false,
                                "mData": function (rowData) {
                                    return '<a data-rel=\"tooltip\" title=\"عرض تفاصيل السيارة\" href="CarDetailsPrint.aspx?id=' + rowData["CarID"] + '">' + rowData["MakerNameAr"] + ' - ' + rowData["TypeNameAr"] + ' - ' + rowData["Year"] + (rowData["PayInvTypeID"] == 3 ? ' - Relist' : '') + '</a><br><span data-rel="tooltip" title="الشاصي: ' + rowData.ChassisNo + '">' + (rowData.ChassisNo.substr(-8)) + '</span> | <span title="اللوت">' + rowData.LotNo + '</span>';
                                }
                            },
                            {
                                "mDataProp": 'SalePrice',
                                "bSortable": false,
                                "mData": function (d) {
                                    var discountOnSaleBill = ((d.CommiDiscount * 1) > 0 ? ', خصم مع الفاتورة: ' + numeral(d.CommiDiscount).format('0,0') + '$' : '');
                                    return '<span class="red" data-rel="tooltip" title="سعر الشراء:  ' + numeral(d.PayPrice).format('0,0') + '$،\nالعمولة: ' + numeral(d.SalePrice - d.PayPrice).format('0,0') + '$' + discountOnSaleBill + '">' + numeral(d.SalePrice).format('0,0') + (discountOnSaleBill !== '' ? ' <i class="fa fa-info-circle green"></i>' : '') + '</span> '; // + commissionDiscount;
                                }
                            },
                            { // العربون
                                "mDataProp": 'CarRetainer',
                                "bSortable": false,
                                "mData": function (rowData) {
                                    if (rowData["CarRetainer"] * 1 > 0) {
                                        if (rowData["CarRetainerDone"] * 1 > 0)
                                            return '<s class="red" data-rel="tooltip" title="تم السداد">' + numeral(rowData.CarRetainer).format('0,0') + '</s> ' + undoLink;

                                        if (!aarrivedCar(rowData) && rowData.SalePriceDemand === 'true' && rowData.SaleTypeID > 1) { // مطلوب كامل المبلغ عند الوصول
                                            return '<strong data-rel="tooltip" class="text-hide" title="غير مفعل : السيارة غير واصه">' + numeral(rowData.CarRetainer).format('0,0') + '</strong>';
                                        }
                                        else
                                            return '<a href="javascript:void(0);" data-rel="tooltip" data-original-title="سداد العربون الآن" title="سداد العربون الآن" class="pay"><strong class="text-black">' + numeral(rowData["CarRetainer"]).format('0,0') + '</strong></a>';
                                    }
                                    else
                                        return '';
                                }
                            },
                            { // المتبقي على السيارة
                                "bSortable": false,
                                "mData": function (rowData) {
                                    if (rowData["DelayedAfterDisc"] * 1 > 0) {
                                        if (rowData["CarDelayedDone"] * 1 > 0)
                                            return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(rowData.DelayedAfterDisc).format('0,0') + '</s> ' + undoLink;

                                        if (!aarrivedCar(rowData) && (rowData.SalePriceDemand != 'true' || rowData.SaleTypeID > 1))
                                            return '<strong data-rel="tooltip" class="text-hide" title="غير مفعل : السيارة غير واصه">' + numeral(rowData["DelayedAfterDisc"]).format('0,0') + '</strong>';
                                        else
                                            return '<a href="javascript:void(0);" data-rel="tooltip" title="سداد المتبقى الآن" class="pay"><strong class="text-black">' + numeral(rowData["DelayedAfterDisc"]).format('0,0') + '</strong></a>';
                                    }
                                    else
                                        return '';
                                }
                            },
                            {
                                "mDataProp": "TotalCarShippExpenses",
                                "bSortable": false,
                                "mData": function (rowData) {
                                    var add = '<a data-rel="tooltip" href="CarShippExpenses.aspx?id=' + rowData["CarID"] + '" title="اضافة مصروف شحن"><i class="icon-plus"></a></a>';
                                    if (rowData["TotalCarShippExpenses"] * 1 > 0) {
                                        if (rowData["TotalCarShippExpensesDone"] * 1 > 0)
                                            return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(rowData["TotalCarShippExpenses"]).format('0,0') + '</s> ' + undoLink;
                                        else
                                            return '<a href="javascript:void(0);" data-rel="tooltip" title="سداد مصروف الشحن الآن" class="pay"><strong class="text-black">' + numeral(rowData["TotalCarShippExpenses"]).format('0,0') + '</strong></a> ' + add;
                                    }
                                    else
                                        if (rowData["Arrived"] === 'true' || rowData.WithoutShipping === 'true')
                                            return add;
                                        else
                                            return '---';
                                }
                            },
                            {
                                "mDataProp": "TotalCarShopExpenses",
                                "bSortable": false,
                                "mData": function (rowData) {
                                    var add = '<a data-rel="tooltip" href="CarShopExpenses.aspx?id=' + rowData["CarID"] + '" title="اضافة مصروف ورشة"><i class="icon-plus"></a></a>';
                                    if (rowData["TotalCarShopExpenses"] * 1 > 0) {
                                        if (rowData["TotalCarShopExpensesDone"] * 1 > 0)
                                            return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(rowData["TotalCarShopExpenses"]).format('0,0') + '</s> ' + undoLink;
                                        else
                                            return '<a href="javascript:void(0);" data-rel="tooltip" title="سداد مصروف الورشة الآن" class="pay"><strong class="text-black">' + numeral(rowData["TotalCarShopExpenses"]).format('0,0') + '</strong></a> ' + add;
                                    }
                                    else
                                        if (rowData["Arrived"] === 'true' || rowData.WithoutShipping === 'true')
                                            return add;
                                        else
                                            return '---';
                                }
                            },
                            {
                                "mDataProp": "VAT",
                                "bSortable": false,
                                "mData": function (row) {
                                    if (row.VAT && row.VAT * 1 > 0) {
                                        if (row["VATDone"] * 1 > 0)
                                            return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(row.VAT).format('0,0') + '</s> ' + undoLink;

                                        // pay VAT after finish all other fees required on the car.
                                        var isRequiredToPayVat = (row.CarRetainerDone * 1 > 0 && row.CarDelayedDone * 1 > 0),
                                            cancelVatLink = ' <a data-rel="tooltip" data-carid="' + row.CarID + '" data-vatvalue="' + row.VAT
                                                + '" title="إلغاء VAT عن العميل" href="javascript:void(0);" class="cancel-vat"><i class="icon-remove orange bigger-120"></i></a>';

                                        if (!isRequiredToPayVat)
                                            return '<strong data-rel="tooltip" class="text-fade text-hide" title="غير مفعل للسداد: يرجي سداد كل المطلوب على السيارة أولاً.">' + numeral(row["VAT"]).format('0,0') + '</strong>' + cancelVatLink;
                                        else
                                            return '<a href="javascript:void(0);" data-rel="tooltip" title="سداد الضريبة" class="pay"><strong class="text-black">' + numeral(row.VAT).format('0,0') + '</strong></a>' + cancelVatLink;
                                    }
                                    else
                                        return '---';
                                }
                            },
                            { // المطلوب
                                "bSortable": false,
                                "mData": function (rowData) {

                                    var _sum = (rowData.TotalCarShippExpenses * 1) + (rowData.TotalCarShopExpenses * 1),
                                        _vatAmount = (rowData.VAT || 0) * 1;
                                    var _arrived = (rowData.Arrived === 'true' || rowData.WithoutShipping === 'true');

                                    // Add car retainer to total except at (آجل - Demand - Not Arrived) state.
                                    if (rowData.SaleTypeID == 1 || _arrived || rowData.SalePriceDemand != 'true') {
                                        _sum += rowData.CarRetainer * 1;
                                    }

                                    // add delayed only when car arrived or in (Demand, نقدا) states.
                                    if (_arrived || (rowData.SalePriceDemand === 'true' && rowData.SaleTypeID === "1") || rowData.CarDelayedDone * 1 > 0) {
                                        // delayed value - discount value.
                                        // amount after car discount.
                                        _sum += parseFloat(rowData.CarDelayed) +
                                            parseFloat(_vatAmount) - // VAT should activated/added with car delayed amount.
                                            parseFloat(rowData.CarDiscount); // 
                                    } // end if


                                    var _totalInstallments = (rowData.CarRetainerDone * 1) + (rowData.CarDelayedDone * 1)
                                        + (rowData.TotalCarShippExpensesDone * 1) + (rowData.TotalCarShopExpensesDone * 1) + (rowData.VATDone * 1),

                                        __total = (_sum - _totalInstallments),
                                        // discount for client from discounts table but binded to this car.
                                        discountOnCar = (rowData.ClientDiscountOnCar > 0 ? '<i data-id="' + rowData.CarID + '" data-amount-type="discount" title="خصم: ' + numeral(rowData.ClientDiscountOnCar).format('0,0') + '" data-rel="tooltip" class="green icon-smile bigger-200 amountDetails"></i>' : ''),

                                        sadFace = '<i data-id="' + rowData.CarID + '" title="زيادة: ' + (rowData.ClientExtraOnCar * 1 > 0 ? numeral(rowData.ClientExtraOnCar).format('0,0') : '') + '" data-rel="tooltip" data-amount-type="extra" class="red icon-frown bigger-200 amountDetails"></i> ',

                                        extraOnCar = ((rowData.ClientExtraOnCar * 1) > 0 ? // is there an extra amount on this car
                                            // sad face   -- activate installment this amount only when car active to installments like retainer.
                                            (sadFace + ((rowData.SaleTypeID == 1 || _arrived || rowData.SalePriceDemand != 'true') ? '<a href="javascript:void(0);" class="pay payExtra inline" data-rel="tooltip" title="سداد مبلغ الزيادة"><strong class="text-black">' + numeral(rowData.ClientExtraOnCar).format('0,0') + '</strong></a>' : ''))
                                            : ''),
                                        extraOnCarPaid = (rowData.ClientExtraOnCar * 1 === 0 && rowData.ClientExtraOnCarPaid * 1 > 0 ? // extra amount was paid.
                                            sadFace + '<s data-rel="tooltip" title="تم السداد"  class="red ace-tooltip inline">' + numeral(rowData.ClientExtraOnCarPaid).format('0,0') + '</s>' : extraOnCar);

                                    return '<strong data-rel="tooltip" class="carRequired" title="المطلوب على السيارة">' + numeral(__total).format('0,0') + '</strong> &nbsp;' + discountOnCar + ' ' + extraOnCarPaid;
                                }
                            },
                            {
                                "bSortable": false,
                                "mData": function (rowData) {
                                    if (rowData["PayInvTypeID"] === 3) // Re-list car
                                        return '---';
                                    if (rowData["Arrived"] === 'true' || rowData.WithoutShipping === 'true')
                                        return '<img src="/App_Themes/iraq/images/' + rowData["DistinationNameEn"] + '.jpg" width="25" /> ' + rowData["DistinationNameAr"];
                                    else
                                        return '<img src="/App_Themes/iraq/images/USA.jpg" width="25" /> أمريكا ' +
                                            (rowData.ShipCompanyNameEn ? rowData.ShipCompanyNameEn.split('-')[1] : '');
                                }
                            },
                            {
                                "bSortable": false,
                                "mData": function (rowData) {
                                    if (rowData["Arrived"] === 'true' || rowData.WithoutShipping === 'true') {
                                        var printPaper = (rowData["ReceiveWithPaper"] != null) ? '<a class="hidden-print" title="استلام أوراق السيارة" href="signature/signature.aspx?id=' + rowData["SaleInvoiceID"] + '&type=1"><i class="icon-print"></i></a>' : '', paperUrl = '<a data-rel="tooltip" href="javascript:void(0);" class="car-paper" title="تسليم السيارة">' + ((!rowData["ReceiveWithPaper"]) ? "لم تسلم" : (rowData["ReceiveWithPaper"] == 'true') ? "بالورق" : "بدون الورق") + '</a> ';
                                        return paperUrl + printPaper;
                                    }
                                    else
                                        return '---';
                                }
                            },
                            {
                                "bSortable": false, // cancel invoice
                                "sClass": 'center hidden-print' + (commonManger.fullRoles() !== true ? ' hidden' : ''),
                                "mData": function (d) {
                                    var _totalInstallments = (d.CarRetainerDone * 1) + (d.CarDelayedDone * 1)
                                        + (d.TotalCarShippExpensesDone * 1) + (d.TotalCarShopExpensesDone * 1);

                                    if (_totalInstallments * 1 > 0)
                                        return '---';
                                    else
                                        return '<a class="btn btn-mini btn-danger remove" href="javascript:void(0);" data-rel="tooltip" title="إلغاء الفاتورة"><i class="icon-remove"></i></a>';
                                }
                            }]
                    });

                // grid installment payment
                $("#listItems:eq(0) tbody").delegate('tr a[href="javascript:void(0);"]', 'click', function (e) {
                    e.preventDefault();

                    var self = $(this),
                        pos = self.closest('tr'),
                        aData;

                    if (pos != null) {
                        if (self.hasClass('pay')) {
                            // to help click payment again.
                            self.addClass('waitingPay');

                            var title = "سداد مبلغ", operation = 'insert', modalDialog = 'paymentModal';
                            aData = oTable.row(pos).data(); //get data of the clicked row

                            //assign value to hidden field
                            var amount = self.text();
                            $('.Amount').html(amount); // amount to pay.
                            $('#CarID').val(aData['CarID']);
                            var colIndex = self.closest("td").index(),
                                installmentTypeTempId = colIndex - 3,
                                //if (colIndex > 5) // for Shipping and Shop costs installment types
                                //    colIndex = colIndex - 1;
                                //1	عربون
                                //2	متبقى
                                //3	شحن
                                //4	ورشة
                                //5 زيادة
                                //6 VAT
                                installmentTypeId = installmentTypeTempId === 6 ? 5 : (installmentTypeTempId === 5 ? 6 : installmentTypeTempId);

                            $('#InstallmentTypeID').val(installmentTypeId);

                            // show title
                            commonManger.showPopUpDialog(title, operation, modalDialog);

                            var _titl = $('#listItems thead th:eq(' + colIndex + ')').text();
                            $('#addModalLabel').append(' ' + _titl + ' على السيارة رقم: ' + aData['CarID']);
                        }
                        else if (self.hasClass('car-place')) {
                            var title = "وصول السيارة", operation = 'insert', modalDialog = 'placeModal';
                            aData = oTable.row(pos).data(); //get data of the clicked row


                            //assing value to hidden field
                            $('input[name=CarID]').val(aData['CarID']);

                            // show title
                            commonManger.showPopUpDialog(title, operation, modalDialog);
                        }
                        else if (self.hasClass('car-paper')) {
                            var title = "تسليم أوراق السيارة",
                                operation = 'insert',
                                modalDialog = 'paperModal',
                                aData = oTable.row(pos).data(); //get data of the clicked row
                            var receviedPaper = aData.CarPaper;

                            $('#ReceiveWithPaperNULL').prop('checked', true); // reset
                            $('.savedPaper p').html('').closest('div.control-group').addClass('hidden');

                            // show paper type
                            if (receviedPaper && receviedPaper !== null)
                                $('.savedPaper p').html(receviedPaper).closest('div.control-group').removeClass('hidden');

                            //assigning value to hidden field
                            $('#paperCarID').val(aData['CarID']);
                            $('#paperInvoiceID').val(aData['SaleInvoiceID']);
                            $('#paperDestID').val(aData['DistinationID']);
                            $('input[type=radio][value="' + aData['ReceiveWithPaper'] + '"]').first().attr('checked', 'checked');

                            commonManger.showPopUpDialog(title, operation, modalDialog);
                        }
                        else if (self.hasClass('car-discnt')) {
                            var title = "الخصم على السيارة", operation = 'insert', modalDialog = 'discountModal';
                            aData = oTable.row(pos).data(); //get data of the clicked row

                            //assing value to hidden field
                            $('#discountCarID').val(aData['CarID']);
                            $('#CarDiscount').val(aData['CarDiscount']);
                            commonManger.showPopUpDialog(title, operation, modalDialog);
                        }
                        else if (self.hasClass('remove')) {
                            // to help click payment again.
                            self.addClass('waitingPay');

                            var title = "إلغاء فاتورة البيع", operation = 'insert', modalDialog = 'cancelModal';
                            aData = oTable.row(pos).data(); //get data of the clicked row

                            $('#cancelCarID').val(aData['CarID']);
                            $('#cancelInvoiceID').val(aData['SaleInvoiceID']);
                            $('#cancelCarModel').val(aData["MakerNameAr"] + ' - ' + aData["TypeNameAr"] + ' ' + aData["Year"]);
                            $('#cancelNotes').val('').focus(); // reset 
                            commonManger.showPopUpDialog(title, operation, modalDialog);
                        }
                        else if (self.hasClass('undo')) {
                            // to help click payment again.
                            self.addClass('waitingPay');

                            var title = "إلغاء (تراجع عن) السداد", modalDialog = 'undoInstallmentModal';
                            aData = oTable.row(pos).data(); // get data of the clicked row

                            // reset from
                            $('#undoForm input[id],#undoNotes').val('');
                            $('#undoForm lebel[id]').text('');

                            // Installment type ID: (1, Retainer), (2,Delayed),(3,ShippExpenses),(4,ShopExpenses)
                            var colIndex = self.closest("td").index() - 3,
                                installmentTypeId = colIndex === 6 ? 5 : (colIndex === 5 ? 6 : colIndex);

                            $('#undoCarID').text(aData['CarID']);
                            $('#undoClientID').val(aData['ClientID']);
                            $('#undoInstallmentTypeID').val(installmentTypeId);
                            $('#undoCarModel').text(aData["MakerNameAr"] + ' - ' + aData["TypeNameAr"] + ' ' + aData["Year"]);

                            commonManger.showPopUpDialog(title, 'save', modalDialog);
                        }
                        else if (self.hasClass('cancel-vat')) {
                            var title = "إلغاء ضريبة VAT",
                                modalDialog = 'cancelVatModal';
                            aData = oTable.row(pos).data(); // get data of the clicked row

                            $('#cancelVatValue').val(numeral(aData.VAT).format('0.00'));
                            $('#cancelVatInvoiceID').val(aData.SaleInvoiceID);
                            $('#cancelVatCarModel').val(aData.MakerNameAr + ' - ' + aData.TypeNameAr + ' ' + aData.Year);
                            $('#cancelVatNotes').val('');

                            commonManger.showPopUpDialog(title, 'save', modalDialog);
                        }
                    }
                });
            };

        return {
            Init: Init,
            IsNumeric: IsNumeric,
            successCallback: successCallback,
            addition: addition
        };
    }();
