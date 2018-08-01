var
    sUrl = '/api/data.aspx/',
    pageManager = function () {
        "use strict";

        var
            _id = commonManger.getUrlVars().id,
            _done = 0,
            selCarId = 0,


            Init = function () {
                bindCurrentId();
                workPerform(); // run events.
            },
            bindCurrentId = function () {

                // client id
                _id = commonManger.getNumbersFromString(_id);

                // selected car id
                selCarId = commonManger.getUrlVars().selcarid;


                if (_id !== "0")
                    filllistItems();
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
                        _done = _this.data('id');

                        updateGrid();
                    }
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


                // show children contractor
                $(document).delegate("#listItems tbody tr a.show-details-btn", "click", function (e) {
                    e.preventDefault();

                    var
                        _thisBtn = $(this),
                        _clientId = _thisBtn.data('cid'),
                        masterTR = _thisBtn.closest('tr'),
                        childsTR = masterTR.nextAll('tr[data-masterid="' + _clientId + '"]');


                    // exists before
                    if (childsTR.hasClass('detail-row')) {
                        masterTR.toggleClass('master-row')
                        childsTR.toggleClass('open');
                    }
                    else {
                        // get childes rows
                        var bindRows = function (d) {
                            var dAll = commonManger.comp2json(d.d),
                                jsn = dAll.list;


                            // children rows
                            var rowsHTML = $(jsn).map(function (i, v) {

                                // build row details
                                var $newRow = masterTR.clone(true);

                                $newRow.removeClass('master-row odd even').addClass('detail-row open').attr('data-masterid', v.MasterID)
                                    .find('td:eq(0)').html('<a data-rel="tooltip" title="سيارات العميل" href="Client.aspx?id=' + v.ClientID + '"><i class="fa fa-long-arrow-left"></i> ' + v.full_name + '</a>');
                                $newRow.find('td:eq(1),td:eq(2)').text('');
                                $newRow.find('td:eq(3)').text(numeral(parseFloat(v.BalanceDebit) - parseFloat(v.BalanceCredit)).format('0,0'));
                                $newRow.find('td:eq(4)').text(numeral(v.PresentRequired).format('0,0'));
                                var net = (parseFloat(v.BalanceDebit * 1) - parseFloat(v.BalanceCredit * 1)) - (v.PresentRequired * 1);
                                $newRow.find('td:eq(5)').text(numeral(net).format('0,0'));
                                $newRow.find('td:eq(6)').html(
                                    '<span data-rel="tooltip" title="رصيد: ' + numeral((v.BalanceDebit * 1) - (v.BalanceCredit * 1)).format('0,0') + ' - مطلوب:' + numeral(v.TotalRequired).format('0,0') + '">' + numeral((v.BalanceDebit * 1) - (v.BalanceCredit * 1) - (v.TotalRequired * 1)).format('0,0') + '</span>'
                                );
                                var contracts = '';
                                if (v.user_type === '1') {
                                    contracts = '<li><a data-cid="' + v.ClientID + '" class="click contr" data-toggle="modal" data-target="#contracts" href="#contracts" title="عقود البيع">عقود البيع</a></li>';
                                }
                                var options = '<div class="btn-group"><button data-toggle="dropdown" class="btn btn-small btn-info dropdown-toggle">اخـتـر <i class="fa fa-angle-down fa fa-on-right"></i></button>\
                                    <ul class="dropdown-menu pull-right">\
                                        <li>\
                                            <a href="Client.aspx?id=' + v.ClientID + '">سيارات العميل</a>\
                                        </li>\
                                        <li>\
                                            <a data-cid="' + v.ClientID + '" class="edit click" data-toggle="modal" data-target="#ClientModal" href="#ClientModal">تعديل بيانات العميل</a>\
                                        </li>' + contracts + '</div>';

                                $newRow.find('td:eq(7)').html(options);


                                // add children rows after master row
                                $($newRow).insertAfter(masterTR);


                                return $newRow;
                            }).get();


                            if (rowsHTML) {
                                masterTR.toggleClass('master-row');
                                updatableEvents();
                            }
                        };

                        getClientDetails(_clientId, bindRows, "Client_ChildsList");
                    }


                    $(this).find('i.ace-icon').toggleClass('fa fa-chevron-down').toggleClass('fa fa-chevron-up');
                });

                // edit, sms events
                $(document).delegate("#" + gridId + " tbody tr a.click", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr'), aData; // .index()
                    if (pos !== null) {
                        if (self.hasClass('edit')) {
                            var title = "تعديل بيانات العميــــــل", operation = 'edit',
                                modalDialog = 'ClientModal',
                                aData = oTable.row(pos).data(),
                                formCtrlBinding = function (row) {
                                    $('#ClientID').val(row.ClientID);
                                    if (row.MasterID) {
                                        $('#MasterID').select2("data", { id: row.MasterID, text: row.MasterName });
                                        $('.client-options').addClass('hidden');
                                    }
                                    $('#txtName').val(row.full_name);
                                    $('#txtPhone').val(row.phone);
                                    $('#phone2').val(row.phone2);
                                    $('#countryCode').val($.trim(row.countryCode));
                                    $('#countryCode2').val($.trim(row.countryCode2));
                                    $('#txtUsername').val(row.user_name);
                                    $('#txtPassword').val(row.user_password);
                                    $('#Notes').val(row.Notes);
                                    $('#user_type').val(row.user_type);
                                    $('#cbSMS').attr("checked", row.send_sms == '1' ? true : false);
                                };

                            // reset
                            resetMyForm();

                            if (aData != null) {
                                //assign value to hidden field
                                formCtrlBinding(aData);

                            }
                            else {

                                var bindFormContrls = function (data) {
                                    var dAll = commonManger.comp2json(data.d), jsn = dAll.list;


                                    if (jsn) {
                                        formCtrlBinding(jsn);
                                    }

                                },
                                    fName = 'Clients_One',
                                    cID = self.data('cid');

                                getClientDetails(cID, bindFormContrls, fName);
                            }
                        }
                        else if (self.hasClass('remove')) {
                            //assign value to hidden field
                            DeleteConfirmation(function () {
                                //aData = oTable.row(pos).data();
                                aData = oTable.row(pos).data();
                                var _id = aData["ClientID"];
                                commonManger.deleteData('anyThing', successDeleteback, commonManger.errorException, 'Clients', 'id', _id);
                            });
                        }
                        else if (self.hasClass('sms')) {
                            aData = oTable.row(pos).data();
                            // reset form
                            document.getElementById("smsForm").reset();
                            $('#smsForm')[0].reset();

                            if (aData != null) {
                                $('.mobileNo').text((aData.countryCode != null ? $.trim(aData.countryCode) : '00971') + aData.phone);
                                $('#msg').val($('#msg').val().replace('@username', aData.user_name).replace('@password', aData.user_password));
                            }
                        }
                    }
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
                        $('.nextCar').html(data[1].full_name + ' <i class="fa fa-arrow-left"></i>').attr('href', 'ClientCars.aspx?id=' + data[1].ClientID).removeClass('hidden');
                    if (data[0])
                        $('.prevCar').html('<i class="fa fa-arrow-right"></i> ' + data[0].full_name).attr('href', 'ClientCars.aspx?id=' + data[0].ClientID).removeClass('hidden');
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
                var
                    oTable = $('#listItems').DataTable({
                        "sDom": "<'row'<'col-sm-6'l><'col-sm-6'BTf>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                        buttons: [{ extend: 'csv', text: 'تصدير إكسيل' }, { extend: 'copy', text: 'نسـخ', }, { text: 'طباعة', action: function (e, dt, node, config) { window.print(); } }],
                        responsive: true,
                        language: {
                            url: "/Scripts/datatable/Arabic.min.js",
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
                        "sAjaxSource": sUrl + 'LoadDataTablesXML',
                        "order": [[0, "asc"]],
                        "fnServerParams": function (aoData) {

                            aoData.push({ "name": "funName", "value": 'ClientCars_SelectList' },
                                { "name": "names", "value": 'ClientID~IsDone' },
                                { "name": "values", "value": _id + '~' + (_done || 0) }); //client + '~' + done
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
                                if (Client && _done == 0) {
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
                            //if (_done === 1) {
                            //    var itm = $(nRow).find('td strong.carRequired');
                            //    if (itm.text() === '0' && (aData.Arrived === 'true' || aData.WithoutShipping === 'true' || aData.SalePriceDemand === 'true')) {
                            //        $(nRow).addClass('hidden');
                            //    }
                            //}
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
                                    return '<a data-rel="tooltip" title="# ' + rowData.SaleInvoiceID + ' التاريخ: ' + commonManger.formatJSONDateCal(rowData.InvoiceDate) + '" href=\"/InvoicePrint.aspx?id=' + rowData["SaleInvoiceID"] + '\">' + rowData["CarID"] + '</a>';
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
                                    return '<a data-rel=\"tooltip\" title=\"عرض تفاصيل السيارة\" href="car.aspx?id=' + rowData["CarID"] + '">' + rowData["MakerNameAr"] + ' - ' + rowData["TypeNameAr"] + ' - ' + rowData["Year"] + (rowData["PayInvTypeID"] == 3 ? ' - Relist' : '') + '</a><br><span data-rel="tooltip" title="الشاصي: ' + rowData.ChassisNo + '">' + (rowData.ChassisNo.substr(-8)) + '</span> | <span title="اللوت">' + rowData.LotNo + '</span>';
                                }
                            },
                            {
                                "mDataProp": 'SalePrice',
                                "bSortable": false,
                                "mData": function (d) {
                                    var discountOnSaleBill = ((d.CommiDiscount * 1) > 0 ? ', خصم مع الفاتورة: ' + numeral(d.CommiDiscount).format('0,0') + '$' : '');
                                    return '<span class="red" data-rel="tooltip" title="سعر الشراء:  ' + numeral(d.PayPrice).format('0,0') + '$،\nالعمولة: ' + numeral(d.SalePrice - d.PayPrice).format('0,0') + '$' + discountOnSaleBill + '">' + numeral(d.SalePrice).format('0,0') + (discountOnSaleBill !== '' ? ' <i class="fa fa-info-circle green"></i>' : '') + '</span> ';
                                }
                            },
                            { // العربون
                                "mDataProp": 'CarRetainer',
                                "bSortable": false,
                                "mData": function (rowData) {
                                    if (rowData["CarRetainer"] * 1 > 0) {
                                        if (rowData["CarRetainerDone"] * 1 > 0)
                                            return '<s class="red" data-rel="tooltip" title="تم السداد">' + numeral(rowData.CarRetainer).format('0,0') + '</s> ';

                                        if (!aarrivedCar(rowData) && rowData.SalePriceDemand === 'true' && rowData.SaleTypeID > 1) { // مطلوب كامل المبلغ عند الوصول
                                            return '<strong data-rel="tooltip" class="text-fade" title="غير مفعل : السيارة غير واصه">' + numeral(rowData.CarRetainer).format('0,0') + '</strong>';
                                        }
                                        else
                                            return '<strong class="text-black">' + numeral(rowData["CarRetainer"]).format('0,0') + '</strong>';
                                    }
                                    else
                                        return '---';
                                }
                            },
                            { // المتبقي على السيارة
                                "bSortable": false,
                                "mData": function (rowData) {
                                    if (rowData["DelayedAfterDisc"] * 1 > 0) {
                                        if (rowData["CarDelayedDone"] * 1 > 0)
                                            return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(rowData.DelayedAfterDisc).format('0,0') + '</s> ';

                                        if (!aarrivedCar(rowData) && (rowData.SalePriceDemand != 'true' || rowData.SaleTypeID > 1))
                                            return '<strong data-rel="tooltip" class="text-fade" title="غير مفعل : السيارة غير واصه">' + numeral(rowData["DelayedAfterDisc"]).format('0,0') + '</strong>';
                                        else
                                            return '<strong class="text-black">' + numeral(rowData["DelayedAfterDisc"]).format('0,0') + '</strong>';
                                    }
                                    else
                                        return '---';
                                }
                            },
                            {
                                "mDataProp": "TotalCarShippExpenses",
                                "bSortable": false,
                                "mData": function (rowData) {
                                    if (rowData["TotalCarShippExpenses"] * 1 > 0) {
                                        if (rowData["TotalCarShippExpensesDone"] * 1 > 0)
                                            return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(rowData["TotalCarShippExpenses"]).format('0,0') + '</s> ';
                                        else
                                            return '<strong class="text-black">' + numeral(rowData["TotalCarShippExpenses"]).format('0,0') + '</strong>';
                                    }
                                    else
                                        return '---';
                                }
                            },
                            {
                                "mDataProp": "TotalCarShopExpenses",
                                "bSortable": false,
                                "mData": function (rowData) {
                                    if (rowData["TotalCarShopExpenses"] * 1 > 0) {
                                        if (rowData["TotalCarShopExpensesDone"] * 1 > 0)
                                            return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(rowData["TotalCarShopExpenses"]).format('0,0') + '</s> ';
                                        else
                                            return '<strong class="text-black">' + numeral(rowData["TotalCarShopExpenses"]).format('0,0') + '</strong>';
                                    }
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
                                            return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(row.VAT).format('0,0') + '</s> ';

                                        // pay VAT after finish all other fees required on the car.
                                        var isRequiredToPayVat = (row.CarRetainerDone * 1 > 0 && row.CarDelayedDone * 1 > 0);

                                        if (!isRequiredToPayVat)
                                            return '<strong data-rel="tooltip" class="text-fade text-fade" title="غير مفعل للسداد: يرجي سداد كل المطلوب على السيارة أولاً.">' + numeral(row["VAT"]).format('0,0') + '</strong>';
                                        else
                                            return '<strong class="text-black">' + numeral(row.VAT).format('0,0') + '</strong>';
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
                                        discountOnCar = (rowData.ClientDiscountOnCar > 0 ? '<i data-id="' + rowData.CarID + '" data-amount-type="discount" title="خصم: ' + numeral(rowData.ClientDiscountOnCar).format('0,0') + '" data-rel="tooltip" class="green fa fa-smile-o bigger-200 amountDetails"></i>' : ''),

                                        sadFace = '<i data-id="' + rowData.CarID + '" title="زيادة: ' + (rowData.ClientExtraOnCar * 1 > 0 ? numeral(rowData.ClientExtraOnCar).format('0,0') : '') + '" data-rel="tooltip" data-amount-type="extra" class="red fa fa-frown-o bigger-200 amountDetails"></i> ',

                                        extraOnCar = ((rowData.ClientExtraOnCar * 1) > 0 ? // is there an extra amount on this car
                                            // sad face   -- activate installment this amount only when car active to installments like retainer.
                                            (sadFace + ((rowData.SaleTypeID == 1 || _arrived || rowData.SalePriceDemand != 'true') ? '<strong class="text-black">' + numeral(rowData.ClientExtraOnCar).format('0,0') + '</strong>' : ''))
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
                                        var printPaper = rowData["ReceiveWithPaper"] != null ?
                                            ((!rowData["ReceiveWithPaper"]) ? "لم تسلم" : ((rowData["ReceiveWithPaper"] == 'true') ? "بالورق" : "بدون الورق")) : '---';
                                        return printPaper;
                                    }
                                    else
                                        return '---';
                                }
                            }]
                    });
            };

        return {
            Init: Init,
            IsNumeric: IsNumeric,
            successCallback: successCallback,
            addition: addition
        };
    }();

pageManager.Init();