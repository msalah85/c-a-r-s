jQuery.fn.dataTable.Api.register('sum()', function () {
    return this.flatten().reduce(function (a, b) {
        if (typeof a === 'string') {
            a = a.replace(/[^\d.-]/g, '') * 1;
        }
        if (typeof b === 'string') {
            b = b.replace(/[^\d.-]/g, '') * 1;
        }

        return a + b;
    }, 0);
});



var
    ReceiptPayment = ReceiptPayment || {},
    ReceiptPayment = function () {
        var
            // variables
            ExpenseTypeID = '', from = '', to = '',

            // methods
            Init = function () {
                filllistItems();
                //setDataToControlandGrid();
                pageEvents();
            },
            pageEvents = function () {
                $('#SearchAll').on('click', function (e) {
                    e.preventDefault();


                    ExpenseTypeID = $('#ExpenseTypeID').val() != '' ? $('#ExpenseTypeID').val() : '',
                    from = commonManger.dateFormat($('#From').val()) != '' ? commonManger.dateFormat($('#From').val()) : '',
                    to = commonManger.dateFormat($('#To').val()) != '' ? commonManger.dateFormat($('#To').val()) : '';

                    updateGrid(); // refresh list
                });

                // apply cancelation
                $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                    e.preventDefault();
                    var _payID = $('#ReceiptID').val(), reason = $('#DeleteReason').val();

                    if (_payID && reason != '') { // not empty
                        // delete paramters
                        var names = ['ReceiptID', 'DeleteReason'], values = [_payID, reason],
                            functionName = "ReceiptPayments_Delete", DTO = { 'actionName': functionName, 'names': names, 'values': values };
                        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successDelete, commonManger.errorException);
                    } else {
                        commonManger.showMessage('حقول مطلوبة', 'يرجي ادخال سبب الإلغاء أولاً.');
                        $('#DeleteReason').focus();
                    }
                });
            },
            successDelete = function (data) {
                data = data.d;
                $('.modal').modal('hide');
                commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', data.message);
                if (data.Status) {
                    $('#listItems').DataTable().draw();
                }
            },
            setDataToControlandGrid = function () {
                var DTO = { 'actionName': "ReceiptPayments_Properties" },
                    bindSearchControls = function (data) {
                        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
                        if (jsn) {
                            var options = $(jsn).map(function (i, v) { return $('<option />').val(v.ExpenseTypeID).text(v.BankName); }).get();
                            $('#ExpenseTypeID').append(options);
                            $(".chzn-select").trigger('chosen:updated').trigger("liszt:updated");
                        }
                    };

                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', bindSearchControls, commonManger.errorException);
            },
            delButton = function () {
                var _delBtn = '<button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>', deleteMe = commonManger.fullRoles();
                return deleteMe ? _delBtn : '';
            },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                var
                    pTable = $('#listItems').DataTable({
                        "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                        buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                            {
                                text: 'طباعة',
                                action: function (e, dt, node, config) {
                                    $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                                    window.print();
                                }
                            }
                        ],
                        "bDestroy": true,
                        "bServerSide": true,
                        responsive: true,
                        sort: false,
                        "ajax": function (data, callback, settings) {

                            var dto = { actionName: 'GeneralAdminExpenses_List2' };
                            dataService.callAjax('POST', JSON.stringify(dto), sUrl + 'GetDataDirect', function (data) {

                                var jsnData = commonManger.comp2json(data.d), aaData = jsnData.list1, jsn = jsnData.list, columns = [];
                                aaData = $.isArray(aaData) ? aaData : $.makeArray(aaData);


                                var objDT = {
                                    draw: 1,
                                    recordsTotal: aaData.length,
                                    recordsFiltered: aaData.length,
                                    data: aaData
                                };


                                callback(objDT);

                            }, commonManger.errorException);
                        },
                        "iDisplayLength": 500,
                        drawCallback: function () {
                            var api = this.api(),

                               td1 = api.column(1, { page: 'current' }).data().sum(),
                               td2 = api.column(2, { page: 'current' }).data().sum(),
                               td3 = api.column(3, { page: 'current' }).data().sum(),
                               td4 = api.column(4, { page: 'current' }).data().sum(),
                               td5 = api.column(5, { page: 'current' }).data().sum(),
                               td6 = api.column(6, { page: 'current' }).data().sum(),
                               td7 = api.column(7, { page: 'current' }).data().sum(),
                               td8 = api.column(8, { page: 'current' }).data().sum(),
                               td9 = api.column(9, { page: 'current' }).data().sum(),
                               td10 = api.column(10, { page: 'current' }).data().sum();


                            $(api.column(1).footer()).html(numeral(td1).format('0,0'));
                            $(api.column(2).footer()).html(numeral(td2).format('0,0'));
                            $(api.column(3).footer()).html(numeral(td3).format('0,0'));
                            $(api.column(4).footer()).html(numeral(td4).format('0,0'));
                            $(api.column(5).footer()).html(numeral(td5).format('0,0'));
                            $(api.column(6).footer()).html(numeral(td6).format('0,0'));
                            $(api.column(7).footer()).html(numeral(td7).format('0,0'));
                            $(api.column(8).footer()).html(numeral(td8).format('0,0'));
                            $(api.column(9).footer()).html(numeral(td9).format('0,0'));
                            $(api.column(10).footer()).html(numeral(td10).format('0,0'));

                        },
                        'columns': [
                            {
                                name: 'Month',
                                data: "Month",
                                data: function (d) {
                                    return d.Year + '-' + d.Month;
                                }
                            },
                            {
                                name: 'CompRent',
                                data: function (d) {
                                    return d.CompRent ? numeral(d.CompRent).format('0,0') : '0';
                                }
                            },
                            {
                                name: 'AnnualRenewal',
                                data: function (d) {
                                    return d.GovFees ? numeral(d.GovFees).format('0,0') : '0';
                                }
                            },
                            {
                                name: 'Housing',
                                data: function (d) {
                                    return d.Housing ? numeral(d.Housing).format('0,0') : '0';
                                }
                            },
                            {
                                name: 'Salaries',
                                data: function (d) {
                                    return d.Salaries ? numeral(d.Salaries).format('0,0') : '0';
                                }
                            },
                            {
                                name: 'Internet',
                                data: function (d) {
                                    return d.Internet ? numeral(d.Internet).format('0,0') : '0';
                                }
                            },
                            {
                                name: 'ElectricityWater',
                                data: function (d) {
                                    return d.ElectricityWater ? numeral(d.ElectricityWater).format('0,0') : '0';
                                }
                            },
                            {
                                name: 'PettyCash',
                                data: function (d) {
                                    return d.PettyCash ? numeral(d.PettyCash).format('0,0') : '0';
                                }
                            },
                            {
                                name: 'PettyCashJor',
                                data: function (d) {
                                    return d.PettyCashJor ? numeral(d.PettyCashJor).format('0,0') : '0';
                                }
                            },
                            {
                                name: 'Others',
                                data: function (d) {
                                    return d.Others ? numeral(d.Others).format('0,0') : '0';
                                }
                            },
                            {
                                data: function (d) {

                                    var total = (
                                            (d.CompRent ? d.CompRent * 1 : 0) +
                                            (d.Housing ? d.Housing * 1 : 0) +
                                            (d.Salaries ? d.Salaries * 1 : 0) +
                                            (d.Internet ? d.Internet * 1 : 0) +
                                            (d.ElectricityWater ? d.ElectricityWater * 1 : 0) +
                                            (d.PettyCash ? d.PettyCash * 1 : 0) +
                                            (d.PettyCashJor ? d.PettyCashJor * 1 : 0) +
                                            (d.Others ? d.Others * 1 : 0) +
                                            (d.GovFees ? d.GovFees * 1 : 0)
                                        );

                                    return numeral(total).format('0,0');
                                }
                            }
                        ]
                    });
            };
        return {
            Init: Init
        };
    }();