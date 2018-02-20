
$('body').addClass('boxed');

var
    saveDataSucc = function (data) {
        data = data.d;

        // saved
        if (data && data > 0) {

            // hide notification
            $('#lnkApproveNotif').addClass('hidden');
            $('.modal').modal('hide');

            // show alert to the user.
            showMessage('تم تأكيد الإلغاء', 'تم تأكيد إلغاء الفواتير بنجاح. شكرا لك.');
        }
    },
    startApproveCancelation = function () {
        var invIds = $('#myCancelledInv .modal-body strong.invNo').map(function (i, v) { return $(this).text() }).get().join(',');

        if (invIds) {
            dataService.callAjax('Post', JSON.stringify({ ids: invIds }), 'mypaidcars.aspx/saveClientApprove', saveDataSucc, errorException);
        }
    },
    getPageAlerts = function () {
        dataService.callAjax('Post', {}, 'myfinishedcars.aspx/GetDataDirect', bingData, errorException);
    },
    bingData = function (data) {
        var jsnData = comp2json(data.d), jsn = jsnData.list;

        if (jsn) {
            var modalID = '#myCancelledInv',
                alerts = $(jsn).map(function (i, v) { return '<div class="alert alert-danger"><p>تم إلغاء فاتورة مبيعات رقم: <strong class="invNo">' + v.SaleInvoiceID + '</strong> وذلك بسبب/ <strong>' + v.DeleteReason + '</strong></p></div>' }).get();

            $(modalID).find('div.modal-body').prepend(alerts);
            $('#lnkApproveNotif').removeClass('hidden');
            $(modalID).modal('show');
        }
    },
    comp2json = function (compressedData) {
        var cdata = LZString.decompressFromUTF16(compressedData), // decompress data
            xml = $.parseXML(cdata), // xml format
            jsn = $.xml2json(xml); // json format
        return jsn;
    },
    aarrivedCar = function (row) {
        var _arrived = (row.Arrived === 'true' || row.WithoutShipping === 'true')
        return _arrived;
    },
    filllistItems = function () {
        var _existTotal = $('.totalRequired'),
            _debit = $('.debit'),
            _existTotal.text(0),

            oTable = $('#listItems').DataTable({
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'BTf>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "language": { "url": "/Scripts/datatable/Arabic.min.js" },
                responsive: true,
                buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                {
                    text: 'طباعة',
                    action: function (e, dt, node, config) {
                        window.print();
                    }
                }],
                "bServerSide": true,
                fixedHeader: true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": sURL + "LoadCars?finish=0", // required cars list
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {

                        // get compressed data
                        var jsnData = comp2json(data.d),
                            // main list and total counts
                            aaData = jsnData.list, jsn1 = jsnData.list1,
                            // client info & next prev clients
                            Client = jsnData.list2;

                        // handle counts format.
                        jsn1 = jsn1 ? $.map(jsn1, function (el) { return el }) : [0];
                        var carsList = $.isArray(aaData) ? aaData : $.makeArray(aaData);


                        // create object for datatables control
                        var objDT = {
                            sEcho: aoData.sEcho ? aoData.sEcho : 0,
                            iTotalRecords: jsn1[0],
                            iTotalDisplayRecords: jsn1[0],
                            aaData: carsList
                        }

                        // bind DT data
                        fnCallback(objDT);


                        $('.clientName').html(Client.full_name);
                        _existTotal.text(numeral(Client.PresentRequired).format('0,0'));
                        var balance = (Client.BalanceDebit * 1) - (Client.BalanceCredit * 1);
                        _debit.text(numeral(balance).format('0,0'));
                        $('.clear').text(numeral((Client.PresentRequired * 1) - balance).format('0,0'));


                        ////////////// deactive all cost less than client debit/////////////
                        $('#listItems strong.pay').each(function (i, item) {
                            if ($(this).text() * 1 > balance * 1)
                                $(this).replaceWith('<strong data-rel="tooltip" title="الرصيد لا يكفى لسداد المبلغ">' + numeral($(this).html()).format('0,0') + '</strong>');
                        });

                        // fire tooltip
                        updatableEvents();
                    }, errorException);
                },
                "iDisplayLength": 50,
                "aaSorting": [],
                "aoColumns": [
                    {
                        "mData": 'CarID',
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return '<a title="طباعة الفاتورة" target="_blank" href="/InvoicePrint.aspx?id=' + row.SaleInvoiceID + '">' + data + '</a>';
                        }
                    },
                    {
                        "mDataProp": "MainPicture",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return row.MainPicture !== null ? '<a target="_blank" data-rel=\"tooltip\" title=\"سيارة رقم: ' + row.CarID + '\" href=\"/car/' + (row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year).replace(/[_\W]+/g, "-") + '\"><img alt=\"car\" width=\"60\" src=\"/public/cars/' + row.CarID + '/_thumb/' + row.MainPicture + '\" /></a>' : '<a href=\"/car/' + row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year + '\"><img alt=\"car\" width=\"60\" src="/public/cars/noimage.gif" /></a>';
                        }
                    },
                    {
                        "mDataProp": "ChassisNo",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return '<a target="_blank" data-rel=\"tooltip\" class="model" title=\"عرض تفاصيل السيارة\" title=\"عرض تفاصيل السيارة\" href="/car/' + (row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year).replace(/[_\W]+/g, "-") + '">' + row.MakerNameAr + ' - ' + row.TypeNameAr + ' - ' + row.Year + (row.PayInvTypeID == 3 ? ' - Relist' : '') + '</a>\
                            <span title="الشاصي">'+ row.ChassisNo + '</span>\
                            <span title="اللوت">اللوت:' + row.LotNo + '</span>';
                        }
                    },
                    {
                        "mDataProp": 'SalePrice',
                        "bSortable": false,
                        "mData": function (d) {
                            return '<span class="red" data-rel="tooltip" title="سعر الشراء:  ' + d.PayPrice + '$  -  عمولة الشركة: ' + (d.SalePrice - d.PayPrice) + '$">' + numeral(d.SalePrice).format('0,0') + '</span>';
                        }
                    },
                    {
                        "mDataProp": 'CarRetainer',
                        "bSortable": false,
                        "render": function (data, type, row) {
                            if (row.CarRetainer * 1 > 0) {
                                if (row.CarRetainerDone * 1 > 0)
                                    return '<s class="text-danger" data-rel="tooltip" title="تم السداد">' + numeral(row.CarRetainer).format('0,0') + '</s>';

                                if (!aarrivedCar(row) && row.SalePriceDemand === 'true' && row.SaleTypeID > 1) // مطلوب كامل المبلغ عند الوصول
                                    return '<strong data-rel="tooltip" class="text-fade" title="غير مفعل : السيارة غير واصه">' + numeral(row.CarRetainer).format('0,0') + '</strong>';
                                else
                                    return '<strong data-rel="tooltip" class="text-black pay" title="المبلغ جاهز للسداد الآن">' + numeral(row.CarRetainer).format('0,0') + '</strong>';
                            }
                            else
                                return '';
                        }
                    },
                    {
                        "mData": null,
                        "bSortable": false,
                        "render": function (data, type, row) {
                            if (row.DelayedAfterDisc * 1 > 0) {
                                if (row.CarDelayedDone * 1 > 0)
                                    return '<s class="text-danger" data-rel="tooltip"  title="تم السداد">' + numeral(row.DelayedAfterDisc).format('0,0') + '</s>';

                                if (!aarrivedCar(row) && (row.SalePriceDemand != 'true' || row.SaleTypeID > 1))
                                    return '<strong class="text-fade" title="غير مفعل : السيارة غير واصله">' + numeral(row.DelayedAfterDisc).format('0,0') + '</strong>';
                                else
                                    return '<strong class="text-black" title="المبلغ جاهز للسداد الآن">' + numeral(row.DelayedAfterDisc).format('0,0') + '</strong>';
                            }
                            else
                                return '';
                        }
                    },
                    {
                        "mDataProp": "TotalCarShippExpenses",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            if (row.TotalCarShippExpenses !== null) {
                                if (row.TotalCarShippExpensesDone * 1 > 0)
                                    return '<s class="text-danger" data-rel="tooltip"  title="تم السداد">' + numeral(row.TotalCarShippExpenses).format('0,0') + '</s>';
                                else
                                    return '<strong class="text-black" title="المبلغ جاهز للسداد الآن">' + numeral(row.TotalCarShippExpenses).format('0,0') + '</strong>';
                            }
                            return '---';
                        }
                    },
                    {
                        "mDataProp": "TotalCarShopExpenses",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            if (row.TotalCarShopExpenses !== null) {
                                if (row.TotalCarShopExpensesDone * 1 > 0)
                                    return '<s class="text-danger" data-rel="tooltip"  title="تم السداد">' + numeral(row.TotalCarShopExpenses).format('0,0') + '</s>';
                                else
                                    return '<strong class="text-black" data-rel="tooltip" title="المبلغ جاهز للسداد الآن">' + numeral(row.TotalCarShopExpenses).format('0,0') + '</strong>';
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
                                    return '<s class="red ace-tooltip" data-rel="tooltip" title="تم السداد">' + numeral(row.VAT).format('0,0') + '</s> ' + undoLink;

                                // pay VAT after finish all other fees required on the car.
                                var isRequiredToPayVat = (row.CarRetainerDone * 1 > 0 && row.CarDelayedDone * 1 > 0 && row.TotalCarShippExpensesDone * 1 > 0 &&
                                    row.TotalCarShopExpensesDone * 1 > 0 && row.ClientExtraOnCarPaid * 1 > 0),
                                    cancelVatLink = ' <a data-rel="tooltip" data-carid="' + row.CarID + '" data-vatvalue="' + row.VAT
                                        + '" title="إلغاء VAT عن العميل" href="javascript:void(0);" class="cancel-vat"><i class="icon-remove orange bigger-120"></i></a>';

                                if (!isRequiredToPayVat)
                                    return '<strong data-rel="tooltip" class="text-fade" title="غير مفعل للسداد إلا بعد سداد كل المطلوب على السيارة أولاً.">' + numeral(row["VAT"]).format('0,0') + '</strong>' + cancelVatLink;
                                else
                                    return '<strong class="text-black" title="المبلغ جاهز للسداد الآن">' + numeral(row.VAT).format('0,0') + '</strong>' + cancelVatLink;
                            }
                            else
                                return '---';
                        }
                    },
                    {
                        "mData": null, // المطلوب
                        "bSortable": false,
                        "render": function (data, type, row) {
                            var _sumR = addition(row.CarRetainer, row.TotalCarShippExpenses, row.TotalCarShopExpenses),
                                _vatAmount = (row.VAT || 0) * 1,
                                _arrived = (row.Arrived === 'true' || row.WithoutShipping === 'true');

                            if (row.Arrived === 'true') { // add delayed only when car outside usa.
                                // delayed value
                                var delayedAvaila = getNumbersFromString(row.CarDelayed);
                                delayedAvaila = delayedAvaila == 0 ? row.CarDelayed : delayedAvaila;

                                // amount after car discount
                                _sumR += parseFloat(delayedAvaila) +
                                    parseFloat(_vatAmount) - // VAT should activated/added with car delayed amount.
                                    parseFloat(row.CarDiscount); // 
                            } // end if

                            // sum total required on this car.
                            var _totalInstallments = (row.CarRetainerDone * 1) + (row.CarDelayedDone * 1)
                                + (row.TotalCarShippExpensesDone * 1) + (row.TotalCarShopExpensesDone * 1) + (row.VATDone * 1),

                                __total = (_sumR - _totalInstallments),
                                discountOnCar = (row.ClientDiscountOnCar * 1 > 0 ? '<i data-carid="' + row.CarID + '" title="خصم: ' + numeral(row.ClientDiscountOnCar).format('0,0') + '" data-rel="tooltip" data-type="-1" class="addionalAmount text-success fa fa-smile-o fa-2x"></i>' : ''),
                                sadFace = '<i data-carid="' + row.CarID + '" title="زيادة: ' + (row.ClientExtraOnCar * 1 > 0 ? numeral(row.ClientExtraOnCar).format('0,0') : numeral(row.ClientExtraOnCarPaid).format('0,0')) + '" data-rel="tooltip" data-type="1" class="addionalAmount text-danger fa fa-frown-o fa-2x"></i> ',

                                extraOnCar = ((row.ClientExtraOnCar * 1) > 0 ? // is there an extra amount on this car
                                    // sad face   -- activate installment this amount only when car active to installments like retainer.
                                    (sadFace + ((row.SaleTypeID == 1 || _arrived || row.SalePriceDemand != 'true') ? '<a href="javascript:void(0);" class="pay payExtra inline" data-rel="tooltip" title="سداد مبلغ الزيادة"><strong class="text-black">' + numeral(row.ClientExtraOnCar).format('0,0') + '</strong></a>' : ''))
                                    : ''),
                                extraOnCarPaid = (row.ClientExtraOnCar * 1 <= 0 && row.ClientExtraOnCarPaid * 1 > 0 ? // extra amount was paid.
                                    sadFace + '<s data-rel="tooltip" title="تم السداد"  class="red ace-tooltip inline">' + numeral(row.ClientExtraOnCarPaid).format('0,0') + '</s>' : extraOnCar);

                            return '<strong class="carRequired" title="المطلوب على السيارة">' + numeral(__total).format('0,0') + '</strong> &nbsp;' + discountOnCar + ' ' + extraOnCarPaid;
                        }
                    },
                    {
                        "bSortable": false,
                        "mData": function (row) {
                            if (row.Arrived === 'true')
                                return '<img src="/App_Themes/iraq/images/' + row.DistinationNameEn + '.jpg" width="25" /> ' + row.DistinationNameAr;
                            else
                                return '<img src="/App_Themes/iraq/images/USA.jpg" width="25" /> أمريكا ' +
                                    (row.ShipCompanyNameEn ? row.ShipCompanyNameEn.split('-')[1] : '');
                        }
                    },
                    {
                        "mData": null,
                        "bSortable": false,
                        'sClass': 'hidden-print',
                        "render": function (data, type, row) {
                            return '<a target="_blank" title="عرض السيارة بالموقع" href="mycarsetforsale?id=' + row.CarID + '"><i class="fa fa-eye fa-2x"></i></a>';
                        }
                    }
                ]
            });
        searchDataTables(oTable);

        // grid events
        // Addional(discount, extra) Amounts click to show details
        $(document).delegate("#listItems tbody tr i.addionalAmount", "click", function (e) {
            e.preventDefault();
            var _this = $(this),
                _typeName = _this.attr('data-type') * 1 > 0 ? 'Extras' : 'Discounts',
                _carID = _this.attr('data-carid'),
                _title = 'تفاصيل مبلغ الـ' + _this.attr('data-original-title') + ' $',

                bindCtrls = function (d) {
                    var cdata = commonManger.comp2json(d.d),
                        jsn = cdata.list, total = 0;

                    var rows = $(jsn).map(function (i, v) {
                        total += parseFloat(v.ExtraAmount * 1);

                        return '<tr><td>' + v.MakerNameEn + ' - ' + v.TypeNameEn + ' - ' + v.Year + '</td><td>' + numeral(v.ExtraAmount ? v.ExtraAmount : v.DiscountAmount).format('0,0') + '</td><td>' + moment(v.AddDate).format('YYYY/MM/DD') + '</td><td>' + v.Notes + '</td></tr>';
                    }).get();
                    $('#lists tbody').html('').append(rows);
                    $('.total').text(total.toFixed());
                };

            if (_carID !== null) {
                // get addionalAmount id
                dto = { actionName: 'Client' + _typeName + '_One', value: _carID };
                dataService.callAjax('Post', JSON.stringify(dto), sURL + 'GetData',
                    bindCtrls, commonManger.errorException);

                $('.addtionalAmountTitle').text(_title);
                $('.addtionalAmountDetails').text(_title);
                $('#myAddionalAmounts').modal('show');
            }

        });

    },
    updatableEvents = function () {
        // re init. tooltip
        $('[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip').tooltip();

        //hide tooltip in grid
        $(document).on('mouseleave', '[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip', function () {
            $(this).tooltip('hide');
            $('.tooltip.fade.in').remove();
        });

    };

filllistItems();

getPageAlerts();

$('.modal-footer .approveBtn').click(function (e) {
    e.preventDefault();
    startApproveCancelation();
});