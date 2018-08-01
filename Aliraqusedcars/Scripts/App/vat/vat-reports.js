var cid = '',
    vatType = {
        Out: 1,
        In: 2
        //OutPaid: 3,
        //InPaid: 4
    };

var
    vatReports = function () {
        var
            Init = function () {
                setDataToControlandGrid();

                pageEvents();

                fillGrid(vatType.Out);
            },
            pageEvents = function () {
                // show vat list based on type selection.
                $('#vatTabs li a').click(function (e) {
                    if ($(this).parent('li').hasClass('active')) {
                        e.preventDefault();
                        return;
                    }

                    var typeID = $(this).attr('data-id') * 1; // (1,VatOut/Sales), (2, VatIn)
                    if (typeID)
                        fillGrid(typeID);


                    //=============================================
                    // show/hide client search
                    showHideClientFilterControl(typeID);
                    //=============================================


                });


                // show details/by clicking the top summary
                $('strong[data-id]').click(function (e) {
                    var _typeId = $(this).attr('data-id'),
                        activateTab = $('a[data-id="' + _typeId + '"]').parent('li');

                    if (activateTab.hasClass('active')) {
                        return;
                    } else {
                        // Activate target tab.
                        $('#vatTabs li').removeClass('active');
                        $('#vatTabs li a[data-id="' + _typeId + '"]').parent('li').addClass('active');

                        // refresh list
                        fillGrid(_typeId);

                        //=============================================
                        // show/hide client search
                        showHideClientFilterControl(_typeId);
                        //=============================================

                    }
                });


                // filter result
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();
                    var typeId = $('#vatTabs li.active a').attr('data-id');
                    fillGrid(typeId);
                });
            },
            showHideClientFilterControl = function (type) {
                var $client = $('#ClientID');
                if (type === 1) { // Vat In/Sales Invoices
                    $client.prev('div').removeClass('hide');
                } else {
                    $client.prev('div').addClass('hide');
                }
            },
            setDataToControlandGrid = function () {
                var
                    DTO = {
                        actionName: "VatInOut_Summary"
                    },
                    successCall = function (data) {
                        var dAll = commonManger.comp2json(data.d),
                            jsn = dAll.list,
                            jsn1 = dAll.list1;

                        // client summary

                        if (jsn) {
                            $('.vatOutTotal').text(numeral(jsn.VatOutTotal).format('0,0'));
                            //$('.vatTotalPaid').text(numeral(jsn.Discounts).format('0,0'));

                            var duVatAmount = (jsn.VatOutTotal * 1) - (jsn1.VatInTotal ? (jsn1.VatInTotal * 1) : 0);
                            $('.DueTotalAmount').text(numeral(duVatAmount).format('0,0'));
                        }

                        if (jsn1) {
                            $('.vatInTotal').text(numeral(jsn1.VatInTotal).format('0,0'));
                        }
                    };

                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect',
                    successCall, commonManger.errorException);

            },
            //assignVatsToPay = function (cntrol) {
            //    // get all of selected cars
            //    var vatVals = $("input[data-refid]:checked").map(function () { return this.value; }).get(),
            //        vatIds = $("input[data-refid]:checked").map(function () { return $(this).attr('data-refid'); }).get();

            //    $('a.payNow').attr('href', 'ReceiptPaymentsAdd.aspx?vat=' + vatVals.join(",") + '&ids=' + vatIds.join(","))
            //        .find('span').text(vatIds.length); // 


            //    // show/hide go to bol button.
            //    if ($('.op-acity:checked').is(':checked')) {
            //        $('.payNow,.payUndo').removeClass('hidden');
            //    }
            //    else {
            //        $('.payNow,.payUndo').addClass('hidden');
            //        $('input[name$=ToCheck]').val('');
            //    }
            //},
            successDelete = function (data) {
                data = data.d;
                $('.modal').modal('hide');
                commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', data.message);
                if (data.Status) {
                    $('#listItems').DataTable().draw();
                }
            },
            getFunctionName = function (typeCode) {
                var funName = 'VatOut';

                switch (typeCode) {
                    case "2":
                    case 2: {
                        funName = 'VatIn';
                        break;
                    }
                    default:
                    case 1: {
                        break;
                    }
                }

                return funName;
            },
            fillGrid = function (type) {
                var oTable = $('#listItems').DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }],
                    "bServerSide": true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    stateSave: true,
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        var fnNme = getFunctionName(type);
                        aoData.push({
                            name: "funName",
                            value: fnNme + '_List'
                        });

                        var searchObj = {
                            typeId: $('#VatTypeID').val(),
                            from: $('#From').val() !== '' ? commonManger.dateFormat($('#From').val()) : '',
                            to: $('#To').val() !== '' ? commonManger.dateFormat($('#To').val()) : ''
                        };

                        aoData.push({
                            name: "names",
                            value: ['VatTypeID~From~To' + (searchObj.typeId === 1 ? 'ClientID' : '')]
                        }, {
                                name: "values",
                                value: [searchObj.typeId + '~' + searchObj.from + '~' + searchObj.to + (searchObj.typeId === 1 ? '~' + $('#ClientID').val() : '')]
                            });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var totVat = 0, totalSalePrice = 0;
                        for (var i = 0; i < aData.length; i++) {
                            totVat += (parseFloat(aData[i]["VAT"]) * 1);

                            if (aData[i]["SalePrice"])
                                totalSalePrice += (parseFloat(aData[i]["SalePrice"]) * 3.667);
                        }
                        $('._totalVat').text(numeral(totVat).format('0,0'));
                        $('._total').text(numeral(totalSalePrice).format('0,0'));
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "RefID",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a href="' + d.URL + '?id=' + d["RefID"] + '">' + d.RefID + '</a>';
                            }
                        },
                        {
                            "mDataProp": "AddDate",
                            "bSortable": true,
                            "mData": function (d) {
                                return d.AddDate ? commonManger.formatJSONDateCal(d.AddDate) : '';
                            }
                        },
                        {
                            "mDataProp": "VatTypeName",
                            "bSortable": true,
                            "mData": function (d) {
                                return d.VatTypeName ? d.VatTypeName : '';
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (row) { // client name
                                return row.full_name ? row.full_name : '';
                            }
                        },
                        {
                            "bSortable": false,
                            //"sClass": "hidden",
                            "mData": function (row) {
                                return row.SalePrice ? numeral(row.SalePrice * 3.667).format('0,0.00') : 0;
                            }
                        },
                        {
                            "mDataProp": "VAT",
                            "bSortable": false,
                            "mData": function (row) {
                                return numeral(row.VAT).format('0,0.00');
                            }
                        }
                    ]
                });

                ///////////////////////////////////
                // select vat row to pay
                //$("#listItems tbody").delegate("tr .op-acity:checkbox", "change", function (e) {
                //    e.preventDefault();
                //    var self = $(this);
                //    assignVatsToPay(self);
                //});
                //$("#listItems tbody").delegate("tr button", "click", function (e) {
                //    e.preventDefault();
                //    var self = $(this), pos = self.closest('tr').index(), aData;
                //    if (pos !== null) {
                //        if (self.hasClass('remove')) {
                //            var title = "إلغاء إيداع عميل", operation = 'insert', modalDialog = 'cancelModal';
                //            aData = oTable.row(pos).data(); //get data of the clicked row
                //            $('#RefID').val(aData['RefID']);
                //            $('#ClientPaymentID').val(aData['RefID']);
                //            $('#AddDate').val(aData['AddDate']);
                //            $('#VAT').val(aData['VAT']);
                //            $('#full_name').val(aData['full_name']);
                //            commonManger.showPopUpDialog(title, operation, modalDialog);
                //        }
                //    }
                //});
                ///////////////////////////////////
            };

        return {
            Init: Init
        };

    }();
