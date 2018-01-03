var
    pageManager = pageManager || {},
    pageManager = function () {
        var
            shipper = '', from = '', to = '', container = '', late = 0,

            Init = function () {
                initQueryParm();

                filllistItems();

                registerEvents();
            },
            initQueryParm = function () {
                var qsLate = commonManger.getQueryStrs().late;
                if (qsLate > 0) {
                    late = 1;
                    $('#Late').prop('checked', true);
                }
            },
            registerEvents = function () {
                // start search
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();
                    shipper = $('#Shipper').val(), paid = $('#Paid').val(), from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val()), container = $('#ContainerNo').val(),
                    late = $('#Late').is(':checked') ? 1 : 0;

                    updateGrid();
                });

                // cancel bol
                $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                    e.preventDefault();
                    var _ID = $('#ShippInvoiceID').val();

                    if (_ID != '') {
                        var names = ['ShippInvoiceID'], values = [_ID];
                        var functionName = "ShippInvoices_Delete", DTO = { 'actionName': functionName, 'names': names, 'values': values };
                        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successDelete, commonManger.errorException);
                    }
                });

                // print invoice
                $('#printedModal .modal-footer button.btn-success').live('click', function (e) {
                    e.preventDefault();
                    startSavePrinted();
                });
            },
            successDelete = function (data) {
                data = data.d;
                $('.modal').modal('hide');
                commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', data.message);
                if (data.Status) {
                    updateGrid();
                }
            },
            startSavePrinted = function () {
                var invoicePrintedSuccessfully = function (data) {
                    data = data.d;
                    if (data.Status) {
                        updateGrid();
                        $('.modal').modal('hide');
                        commonManger.showMessage('تم بنجاح:', 'تم اعتماد طباعة الفاتورة.');
                    } else {
                        $('#printedModal').modal('hide');
                        commonManger.showMessage('خطأ بالحفظ:', 'لم يتم اعتماد طباعة الفاتورة.');
                    }
                }, no = $('#InvoiceID').val();

                // 
                if (no !== "") {
                    var dto = { 'actionName': 'ContainerToCom_PrintInvoice', 'names': ['id'], 'values': [no] };
                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', invoicePrintedSuccessfully, commonManger.errorException);
                }
                else {
                    $('#printedModal').modal('hide');
                    commonManger.showMessage('خطأ بالحفظ:', 'لم يتم اعتماد طباعة الفاتورة.');
                }
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
                        }
                    ],
                    "bProcessing": true,
                    "bServerSide": true,
                    responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + "LoadDataTablesXML",
                    "fnServerParams": function (aoData) {
                        var vals = shipper + '~' + from + '~' + to + '~' + container + '~' + late;
                        aoData.push({ "name": "funName", "value": 'ShippInvoicesDetails_SelectList' }, { "name": "names", "value": 'Shipper~From~To~Container~Late' }, { "name": "values", "value": vals });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "drawCallback": function (settings) {
                        var api = this.api(), rows = api.rows({ page: 'current' }).nodes(), last = null;

                        api.column(0, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                $(rows).eq(i).before(
                                    '<tr class="group alert alert-warning"><td colspan="3">' + group + '</td></tr>'
                                );
                                last = group;
                            }
                        })
                    },
                    "aoColumns": [
                        {
                            "mDataProp": "ShipCompanyNameEn",
                            "bVisible": false,
                            "mData": function (oObj) {
                                // check employee printed main invoice from shipper website.
                                var printMainInvoiceWithBol = (oObj.ContainerNo && oObj.InvoicePrinted === 'false' ? oObj.Bol + '<a class="btn btn-mini btn-warning hidden-print printMe" title="اعتمد طباعة الفاتورة من موقع الشاحن الآن" data-id="' + oObj.ShippInvoiceID + '" data-container="' + oObj.ContainerNo + '" href="#printedModal"><i class="icon-print"></i></a>' : oObj.Bol);

                                // BOL header.
                                return '<table class="sub-table"><tr><td>رقم حجز الحاوية: ' + printMainInvoiceWithBol + '</td><td>الشاحن: ' + oObj.ShipCompanyNameEn + '</td><td>تاريخ الوصول: ' + commonManger.formatJSONDateCal(oObj.ArrivalDate) +
                                    '</td><td><div class="tools pull-left hidden-print"><a class="btn btn-mini btn-info" title="تعديل BOL" href="bookingbol.aspx?id=' + oObj.ShippInvoiceID + '"><i class="icon-edit icon-only"></i></a> ' +
                                    '<a class="btn btn-mini btn-grey" title="طباعه" href="InvoiceShippingPrint.aspx?id=' + oObj.ShippInvoiceID + '"><i class="icon-print icon-only"></i></a> ' +
                                    '<a class="btn btn-mini btn-danger remove" title="حــذف" href="javascript:void(0);" data-ShippInvoiceID="' + oObj.ShippInvoiceID + '" data-bol="' + oObj.Bol + '"><i class="icon-trash icon-only"></i></a></div></td></tr></table>';
                            }
                        },
                        {
                            "bSortable": true,
                            "mData": function (oObj) {
                                return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + oObj.CarID + '">' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + '</a>';
                            }
                        },
                        {
                            "mDataProp": "LotNo",
                            "bSortable": true
                        },
                        {
                            "mDataProp": "ChassisNo",
                            "bSortable": true
                        }
                    ]
                });

                // delete bol.
                $("#listItems tbody").delegate("tr a.remove", "click", function (e) {
                    e.preventDefault();
                    var self = $(this);
                    var title = "إلغاء حجز الحاوية", modalDialog = 'cancelModal';
                    $('#ShippInvoiceID').val(self.attr('data-ShippInvoiceID'));
                    $('#BOL').val(self.attr('data-bol'));
                    commonManger.showPopUpDialog(title, '', modalDialog);
                });

                // fire print main invoice.
                $("#listItems tbody").delegate("tr a.printMe", "click", function (e) {
                    e.preventDefault();

                    var self = $(this), pos = self.closest('tr');

                    if (pos !== null) {
                        var title = "اعتمد طباعة الفاتورة: ", operation = 'insert', modalDialog = 'printedModal';

                        $('#InvoiceID').val(self.attr('data-id')); // invoice no
                        $('#containerNoo').text(self.attr('data-container')); // Containerid

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                });
            };
        return {
            Init: Init
        };
    }();
