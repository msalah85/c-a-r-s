var
    pageManager = function () {
        var
            buyer = null, shipper = null, chassis = null,
            from = null, to = null, auction = null, client = null,

            Init = function () {
                filllistItems();

                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    buyer = $('#Buyer').val(),
                        chassis = $('#ChassisN').val(),
                        from = commonManger.dateFormat($('#From').val()),
                        to = commonManger.dateFormat($('#To').val()),
                        auction = $('#Auction').val(),
                        client = $('#Client').val();

                    updateGrid();
                });

                $('.getTotalCosts').click(function (e) {
                    e.preventDefault();
                    getSoldCarsTotalCosts();
                    $('.sum-total-all').html('يرجي الانتظار..')
                });
            },
            getSoldCarsTotalCosts = function () {
                var funName = 'ExpensesOnCarReportTotalCosts',
                    DTO = { actionName: funName },
                    bindTotalCosts = function (d) {
                        var _data = commonManger.comp2json(d.d); // show all pages total

                        if (_data && _data.list) {
                            $('.sum-total-all').html('').html(
                                '<span>' + numeral(_data.list.AllSoldCarsCosts).format('0,0') + '</span> - ' +
                                '<span>عدد السيارات: ' + numeral(_data.list.SoldCarsCount).format('0,0') + '</span> - ' +
                                '<span>وقت التحديث: ' + moment(_data.list.AddDate).format('(DD/MM/YYYY hh:mm A)') + '</span>'
                            );
                        }
                    };

                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect',
                    bindTotalCosts, commonManger.errorException);
            },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                var pTable = $('#listItems').DataTable({
                    "sDom": "<'row-fluid tbl-head-options'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    { extend: 'copy', text: 'نسـخ', },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }],
                    //stateSave: true,
                    responsive: true,
                    "bServerSide": true,
                    "retrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": "rpt/ExpensesOnCarReportPrint.aspx/LoadData",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "buyer", "value": buyer }, { "name": "Client", "value": client },
                            { "name": "auction", "value": auction }, { "name": "chassis", "value": chassis },
                            { "name": "from", "value": from }, { "name": "to", "value": to });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        var bindGird = function (data) {
                            // get data as json format from xml
                            var jsnData = commonManger.comp2json(data.d), aaData = jsnData.list, jsn1 = jsnData.list1;

                            jsn1 = jsn1 ? $.map(jsn1, function (el) { return el }) : [0];

                            // create object for datatables control
                            var objDT = {
                                sEcho: (aoData.sEcho ? aoData.sEcho : 0),
                                iTotalRecords: jsn1[0],
                                iTotalDisplayRecords: jsn1[0],
                                aaData: $.isArray(aaData) ? aaData : $.makeArray(aaData)
                            }

                            // bind DT data
                            fnCallback(objDT);
                        };

                        dataService.callAjax('GET', aoData, sSource, bindGird, commonManger.errorException);
                    },
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                        if (aData.PayInvTypeID == 3)
                            $(nRow).addClass("car-relist");
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var tot = 0, totalProfit = 0, totalSalePrices = 0;
                        for (var i = 0; i < aData.length; i++) {
                            tot += aData[i]["TotalOnCar"] * 1;
                            totalSalePrices += aData[i]["SalePrice"] * 1;
                            totalProfit += ((aData[i]["SalePrice"] * 1) - (aData[i]["TotalOnCar"] * 1));
                        }

                        // total
                        $(nFoot).find('th:eq(1)').html(numeral(tot).format('0,0'));
                        $(nFoot).find('th:eq(2)').html(numeral(totalSalePrices).format('0,0'));
                        $(nFoot).find('th:eq(3)').html(numeral(totalProfit).format('0,0'));
                    },
                    "pageLength": 25,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "CarID",
                            "bSortable": true
                        },
                        {
                            "mDataProp": "InvoiceDate",
                            "bSortable": true,
                            "mData": function (d) {
                                return commonManger.formatJSONDateCal(d['InvoiceDate'], 'dd/MM/yyyy');
                            }
                        },
                        {
                            "mDataProp": "TypeNameAr",
                            "bSortable": false,
                            "mData": function (d) {
                                return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + d["CarID"] + '">' + d["MakerNameAr"] + ' - ' + d["TypeNameAr"] + ' - ' + d["Year"] + '</a>' +
                                    '<p title="الشاصي">' + d.ChassisNo + '</p>';
                            }
                        },
                        {

                            "bSortable": false,
                            "mData": function (d) {
                                return numeral((d.PayPayments * 1) + (d.PayPrice * 1)).format('0,0');
                            }
                        },
                        {
                            "mData": "ExchangeFeeOnCar",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.ExchangeFeeOnCar).format('0,0.00');
                            }
                        },
                        {
                            "mData": "Towing",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.Towing).format('0,0.00');
                            }
                        },
                        {
                            "mData": "LoadingShippingCosts", // شحن - تحميل
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.LoadingShippingCosts).format('0,0.00');
                            }
                        },
                        {
                            "mData": "ShippingExtra",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.ShippingExtra * 1).format('0,0.00');
                            }
                        },
                        {
                            "mData": "CustomExpensesOnCar",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.CustomExpensesOnCar).format('0,0.00');
                            }
                        },
                        {
                            "mData": "CustomOnCar",
                            "bSortable": false,
                            "mData": function (d) { // جمارك فقط على كاملة الإمارات
                                return numeral(d.CustomOnCar).format('0,0.00');
                            }
                        },
                        {
                            "mData": "DiscountAmount",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.DiscountAmount).format('0,0.00');
                            }
                        },
                        {
                            "mData": "ShippExpensesCost",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.ShippExpensesCost).format('0,0.00');
                            }
                        },
                        {
                            "mData": "ShopExpensesCost",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.ShopExpensesCost).format('0,0.00');
                            }
                        },
                        {
                            "mData": 'AuctionCommCost',
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.AuctionCommCost).format('0,0.00');
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.TotalOnCar).format('0,0.00');
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.SalePrice).format('0,0.00');
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral((d.SalePrice * 1) - (d.TotalOnCar * 1)).format('0,0.00');
                            }
                        }
                    ]
                });
                commonManger.searchData(pTable);
            };

        return {
            Init: Init
        };

    }();