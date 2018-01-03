var
    pageManager = pageManager || {},
    pageManager = function () {
        var
            shipper = '', shipperMain = '', paid = '', from = '', to = '', distination = '', container = '', invoice = '',

            Init = function () {
                filllistItems();
                bindEvents();
            },
            bindEvents = function () {

                // start search
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    // search criteria
                    shipper = $('#Shipper').val(), shipperMain = $('#ShipperMain').val(), paid = $('#Paid').val(),
                        from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val()), distination = $('#DistinationID').val(),
                        container = $('#ContainerNo').val(), invoice = $('#InvoiceNo').val();


                    // show header title for print
                    commonManger.showOptionPrintTitle($('#Paid option:selected').text());

                    // update search result
                    reloadGrid(); // start search
                });


                // undo selection
                $('.payUndo').click(function (e) {
                    e.preventDefault();
                    resetSelectedInvoices();
                });


                // grid events
                // delete invoice
                $("#listItems tbody").delegate("tr a.remove", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr').index(), aData;
                    if (pos !== null) {

                        var doDelete = function () {
                            aData = pTable.fnGetData(pos);
                            var _id = aData["ShippInvoiceID"];
                            commonManger.deleteData('anyThing', commonManger.successDeleted, commonManger.errorException, 'ShippInvoices', 'ShippInvoiceID', _id);
                        };

                        DeleteConfirmation(doDelete);
                    }
                });

                // select invoices to pay
                $("#listItems tbody").delegate("tr .op-acity:checkbox", "change", function (e) {
                    e.preventDefault();

                    var self = $(this);
                    assignInvoicesToPay(self);
                });
            },
            resetSelectedInvoices = function () {
                $('.payNow,.payUndo').addClass('hidden'); $('input[name$=ToCheck]').val('');
                $(".op-acity:checked").map(function () { $(this).attr("checked", false); return this.value; });
            },
            assignInvoicesToPay = function (cntrol) {
                // validate the same shipper & distination
                var $shippCheck = $('input[name=shipperToCheck]'), // place for compareson
                    currentShipp = cntrol.attr('data-shipper'); // data to compare

                if ($shippCheck.val() !== '') {
                    if ($shippCheck.val() !== currentShipp) {
                        commonManger.showMessage('خطأ بالاختيار', 'برجاء اختيار الفواتير التابعة لشاحن واحد.');
                        cntrol.removeAttr('checked');
                        return;
                    }
                } else { // save selected shipper & distination
                    $shippCheck.val(currentShipp);
                }

                // get all of selected cars
                var invIds = $("input[data-shipper]:checked").map(function () { return this.value; }).get();
                $('.payNow').attr('href', 'ShipInvoicePaymentsDetails.aspx?sh=' + $shippCheck.val() + '&ids=' + invIds.join(","))
                    .find('span').text(invIds.length);


                // show/hide go to bol button.
                if ($('.op-acity:checked').is(':checked')) {
                    $('.payNow,.payUndo').removeClass('hidden');
                }
                else {
                    $('.payNow,.payUndo').addClass('hidden');
                    $('input[name$=ToCheck]').val('');
                }
            },
            reloadGrid = function () {
                $('#listItems').DataTable().draw();
            },
            delButton = function () {
                var _delBtn = '<a class="btn btn-mini btn-danger remove" title="حــذف" href="javascript:void(0);"><i class="icon-trash icon-only"></i></a>', deleteMe = commonManger.fullRoles();
                return deleteMe ? _delBtn : '';
            },
            filllistItems = function () {
                var pTable = $('#listItems').DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    { extend: 'copy', text: 'نسـخ', },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }
                    ],
                    "bServerSide": true, responsive: true, "bRetrieve": false, "bDestroy": true,
                    "sAjaxSource": sUrl + "LoadDataTablesXML",
                    "fnServerParams": function (aoData) {
                        var vals = shipper + '~' + shipperMain + '~' + paid + '~' + from + '~' + to + '~' + distination + '~' + container + '~' + invoice;
                        aoData.push({ "name": "funName", "value": 'ShippInvoicesDetails_List' },
                            { "name": "names", "value": 'Shipper~ShipperMain~Paid~From~To~DistinationID~ContainerNo~InvoiceNo' }, { "name": "values", "value": vals });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            // get data as json format from xml
                            var jsnData = commonManger.comp2json(data.d),
                                aaData = jsnData.list, jsn1 = jsnData.list1;

                            // create object for datatables control
                            var objDT = {
                                sEcho: aoData.sEcho ? aoData.sEcho : 0,
                                iTotalRecords: jsn1 ? jsn1.CNT : 0,
                                iTotalDisplayRecords: jsn1 ? jsn1.CNT : 0,
                                aaData: $.isArray(aaData) ? aaData : $.makeArray(aaData)
                            }

                            // bind DT data
                            fnCallback(objDT);


                            if (jsn1) {
                                $('.sum-total-all').text(numeral(jsn1.TotalSum).format('0,0'));
                            }

                        }, commonManger.errorException);
                    },
                    "drawCallback": function (settings) {
                        var api = this.api(), rows = api.rows({ page: 'current' }).nodes(), last = null, invHeader = $('#listItems thead').html(), spacer = '<tr class="spacer"><td colspan="100%"></td>'; // repeater table header with every invoice.
                        // show invoice info
                        api.column(0, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                $(rows).eq(i).before('</tr><tr class="group alert alert-warning"><td colspan="100%">' + group + '</td></tr>' + invHeader);
                                last = group;
                            }
                        });
                        var invNo = '', lastIndex = 0, lastTotAmount = 0;
                        // sub total after every group
                        api.rows().every(function (rowIdx, tableLoop, rowLoop) {
                            var data = this.data();
                            if (invNo !== '' && data.InvoiceNo !== invNo) {
                                $(rows).eq(lastIndex).after('<tr class="alert alert-info"><td class="sp-bord-btom" colspan="8"><span class="pull-left">إجمالى الفاتورة</span></td><td class="sp-bord-btom">' + numeral(lastTotAmount).format('0,0.0') + '</td></tr>' + spacer);
                            }
                            invNo = data.InvoiceNo; lastIndex = rowIdx; lastTotAmount = data.TotalAmount;
                        });
                        // set latest group subtotal
                        if (lastIndex > 0 && lastTotAmount > 0) {
                            $(rows).eq(lastIndex).after('<tr class="alert alert-info"><td class="sp-bord-btom" colspan="8"><span class="pull-left">إجمالى الفاتورة</span></td><td class="sp-bord-btom">' + numeral(lastTotAmount).format('0,0.0') + '</td></tr>' + spacer);
                        }
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var tot = 0;
                        for (var i = 0; i < aData.length; i++) {
                            tot += (parseFloat(aData[i]["TotalCost"]) * 1);
                        }
                        $(nFoot).find('th:eq(1)').html('<span>' + numeral(tot).format('0,0.0') + '</span>');
                    },
                    "iDisplayLength": 50,
                    "aoColumns": [
                        {
                            "mDataProp": "InvoiceNo",
                            "bVisible": false,
                            "mData": function (oObj) {
                                var editMe = '', notPaidCheck = '';
                                if (oObj.IsEdit) {
                                    editMe = '<a class="btn btn-mini btn-info" title="تعديل" href="InvoiceShippingAdd.aspx?id=' + oObj['ShippInvoiceID'] + '"><i class="icon-edit icon-only"></i></a> ' + delButton();
                                }
                                if (!oObj.Paid) {
                                    notPaidCheck = '<input type="checkbox" data-shipper=' + oObj.ShipMainCompanyID + ' value=' + oObj.ShippInvoiceID + ' class="op-acity" />';
                                }
                                return '<table class="sub-table"><tr><td>' + notPaidCheck + ' رقم الحاوية: ' + oObj['ContainerNo'] + '</td><td>تاريخ الوصول: ' + commonManger.formatJSONDateCal(oObj['ArrivalDate']) + '</td><td> الشاحن: ' + oObj['ShipCompanyNameEn'] + ' - ' + oObj.DistinationNameAr + '</td><td>رقم الفاتورة: ' + oObj['InvoiceNo'] + (oObj.Paid ? ' <a target="_blank" title="تفاصيل الحوالة" href="ShipInvoicePaymentsPrint.aspx?id=' + oObj.Paid + '&cont=' + oObj.ContainerNo + '">(مسدده)</a>' : '') + '</td><td> تاريخ الفاتورة: ' + commonManger.formatJSONDateCal(oObj['InvoiceDate']) +
                                    '<div class="tools pull-left hidden-print"><a class="btn btn-mini btn-grey" title="طباعه" href="InvoiceShippingPrint.aspx?id=' + oObj['ShippInvoiceID'] + '"><i class="icon-print icon-only"></i></a> ' + editMe + '</div></td></tr></table>';
                            }
                        },
                        {
                            "mDataProp": "TypeNameEn",
                            "bSortable": false,
                            "mData": function (oObj) {
                                return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + oObj.CarID + '">' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + '</a>';
                            }
                        },
                        {
                            "mDataProp": "full_name",
                            "bSortable": false,
                            "mData": function (d) {
                                return (d.SaleClientName ? d.SaleClientName : d.full_name);
                            }
                        },
                        {
                            "mDataProp": "ChassisNo",
                            "bSortable": false
                        },
                        {
                            "mData": function (d) {
                                return numeral(d.Towing).format('0.0.00');
                            },
                            "bSortable": false
                        },
                        {
                            "mData": function (d) {
                                return numeral(d.Loading).format('0.0.00');
                            },
                            "bSortable": false
                        },
                        {
                            "mData": function (d) {
                                return numeral(d.SeaTrans).format('0.0.00');
                            },
                            "bSortable": false
                        },
                        {
                            "mData": function (d) {
                                return numeral(d.Partitioning).format('0.0.00');
                            },
                            "bSortable": false
                        },
                        {
                            "mData": function (d) {
                                return numeral(d.Extra).format('0.0.00');
                            },
                            "bSortable": false
                        },
                        {
                            "mDataProp": "TotalCost",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.TotalCost).format('0,0.0');
                            }
                        }
                    ]
                });
            };

        return {
            Init: Init
        };
    }();