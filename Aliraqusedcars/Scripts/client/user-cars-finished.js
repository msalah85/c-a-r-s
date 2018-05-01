var

    comp2json = function (compressedData) {
        var cdata = LZString.decompressFromUTF16(compressedData), // decompress data
            xml = $.parseXML(cdata), // xml format
            jsn = $.xml2json(xml); // json format
        return jsn;
    },
    filllistItems = function () {
        var _existTotal = $('.totalRequired'), _debit = $('.debit');
        _existTotal.text(0);
        var oTable = $('#listItems').DataTable({
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'BTf>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "language": { "url": "/Scripts/datatable/Arabic.min.js" },
            responsive: true,
            buttons: [{ extend: 'csv', text: 'تصدير إكسيل' }, { text: 'طباعة', action: function (e, dt, node, config) { window.print(); } }],
            "bServerSide": true,
            "bRetrieve": false,
            "bDestroy": true,
            "sAjaxSource": sURL + "LoadCars?finish=1", // finised
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
                        return row.MainPicture != null ? '<a data-rel=\"tooltip\" title=\"سيارة رقم: ' + row.CarID + '\" href=\"/car/' + (row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year).replace(/[_\W]+/g, "-") + '\"><img alt=\"car\" width=\"60\" src=\"/public/cars/' + row.CarID + '/_thumb/' + row.MainPicture + '\" /></a>' : '<a href=\"/car/' + row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year + '\"><img alt=\"car\" width=\"60\" src="/public/cars/noimage.gif" /></a>';
                    }
                },
                {
                    "mDataProp": "ChassisNo",
                    "bSortable": false,
                    "render": function (data, type, row) {
                        return '<a data-rel=\"tooltip\" title=\"عرض صور السيارة\" title=\"عرض صور السيارة\" href="/car/' + (row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year).replace(/[_\W]+/g, "-") + '">' + row.MakerNameAr + ' - ' + row.TypeNameAr + ' - ' + row.Year + (row.PayInvTypeID == 3 ? ' - Relist' : '') + '</a>';
                    }
                },
                {
                    "mDataProp": 'SalePrice',
                    "bSortable": false,
                    "mData": function (d) {
                        var discountOnSaleBill = ((d.CommiDiscount * 1) > 0 ? ', خصم مع الفاتورة: ' + numeral(d.CommiDiscount).format('0,0') + '$' : '');
                        return '<span class="red" data-rel="tooltip" title="سعر الشراء:  ' + numeral(d.PayPrice).format('0,0') + '$،\nالعمولة: ' + numeral(d.SalePrice - d.PayPrice).format('0,0') + '$' + discountOnSaleBill + '">' + numeral(d.SalePrice).format('0,0') + (discountOnSaleBill !== '' ? ' <i class="fa fa-info-circle text-success"></i>' : '') + '</span> '; // + commissionDiscount;
                    }
                },
                {
                    "mDataProp": 'CarRetainer',
                    "bSortable": false,
                    "render": function (data, type, row) {
                        if (row.CarRetainer !== null) {
                            if (row.CarRetainerDone * 1 > 0)
                                return '<s class="red" data-rel="tooltip"  title="تم السداد">' + numeral(row.CarRetainer).format('0,0') + '</s>';
                            else
                                return '<strong class="text-black pay" title="المبلغ جاهز للسداد الآن">' + numeral(row.CarRetainer).format('0,0') + '</strong>';
                        }
                        else
                            return '';
                    }
                },
                {
                    "mData": null,
                    "bSortable": false,
                    "render": function (data, type, row) {
                        if (row.DelayedAfterDisc !== null) {
                            if (row.CarDelayedDone * 1 > 0)
                                return '<s class="red" data-rel="tooltip"  title="تم السداد">' + numeral(row.DelayedAfterDisc).format('0,0') + '</s>';
                            else if (row.Arrived !== 'true')
                                return '<strong class="text-fade" title="غير مفعل : السيارة غير واصه">' + numeral(row.DelayedAfterDisc).format('0,0') + '</strong>';
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
                                return '<s class="red" data-rel="tooltip"  title="تم السداد">' + numeral(row.TotalCarShippExpenses).format('0,0') + '</s>';
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
                                return '<s class="red" data-rel="tooltip"  title="تم السداد">' + numeral(row.TotalCarShopExpenses).format('0,0') + '</s>';
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
                                return '<strong data-rel="tooltip" title="غير مفعل للسداد: يرجي سداد كل المطلوب على السيارة أولاً.">' + numeral(row["VAT"]).format('0,0') + '</strong>' + cancelVatLink;
                            else
                                return '<a href="javascript:void(0);" data-rel="tooltip" title="سداد الضريبة" class="pay"><strong class="text-black">' + numeral(row.VAT).format('0,0') + '</strong></a>' + cancelVatLink;
                        }
                        else
                            return '---';
                    }
                },
                {
                    "mData": null, // المطلوب
                    "bSortable": false,
                    "render": function (data, type, row) {

                        // sum total required on this car.
                        var
                            _arrived = (row.Arrived === 'true' || row.WithoutShipping === 'true'),
                            discountOnCar = (row.ClientDiscountOnCar * 1 > 0 ? '<i data-carid="' + row.CarID + '" title="خصم: ' + numeral(row.ClientDiscountOnCar).format('0,0') + '" data-rel="tooltip" data-type="-1" class="addionalAmount text-success fa fa-smile-o fa-2x"></i>' : ''),
                            sadFace = '<i data-carid="' + row.CarID + '" title="زيادة: ' + (row.ClientExtraOnCar * 1 > 0 ? numeral(row.ClientExtraOnCar).format('0,0') : numeral(row.ClientExtraOnCarPaid).format('0,0')) + '" data-rel="tooltip" data-type="1" class="addionalAmount text-danger fa fa-frown-o fa-2x"></i> ',

                            extraOnCar = ((row.ClientExtraOnCar * 1) > 0 ? // is there an extra amount on this car
                                // sad face   -- activate installment this amount only when car active to installments like retainer.
                                (sadFace + ((row.SaleTypeID == 1 || _arrived || row.SalePriceDemand != 'true') ? '<a href="javascript:void(0);" class="pay payExtra inline" data-rel="tooltip" title="سداد مبلغ الزيادة"><strong class="text-black">' + numeral(row.ClientExtraOnCar).format('0,0') + '</strong></a>' : '')) : ''),
                            extraOnCarPaid = (row.ClientExtraOnCar * 1 === 0 && row.ClientExtraOnCarPaid * 1 > 0 ? // extra amount was paid.
                                sadFace + '<s data-rel="tooltip" title="تم السداد"  class="red ace-tooltip inline">' + numeral(row.ClientExtraOnCarPaid).format('0,0') + '</s>' : extraOnCar);

                        return discountOnCar + ' ' + extraOnCarPaid;
                    }
                },
                {
                    "mData": null,
                    "bSortable": false,
                    "bClass": 'text-center',
                    "render": function (data, type, row) {
                        return '<a title="عرض السيارة بالموقع" href="mycarsetforsale?id=' + row.CarID + '"><i class="fa fa-eye fa-2x"></i></a>';
                    }
                }]
        });

        // grid events
        // Addional(discount, extra) Amounts click to show details
        $(document).delegate("#listItems tbody tr i.addionalAmount", "click", function (e) {
            e.preventDefault();
            var _this = $(this),
                _typeName = _this.attr('data-type') * 1 > 0 ? 'Extras' : 'Discounts',
                _title = 'تفاصيل مبلغ الـ' + _this.attr('data-original-title') + ' $',
                _carID = _this.attr('data-carid'),

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

        searchDataTables(oTable);
    },
    updatableEvents = function () {
        // re init. tooltip
        $('[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip').tooltip({ delay: 0 })
            .on('hide.bs.tooltip', function (e) {
                $('div.tooltip').hide();
            });

        //hide tooltip in grid
        $(document).on('mouseleave', '[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip', function () {
            $(this).tooltip('hide');
            $('.tooltip.fade.in').remove();
        });
    };
// initialize data
filllistItems();