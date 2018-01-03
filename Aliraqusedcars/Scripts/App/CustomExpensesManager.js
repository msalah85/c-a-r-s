var
    ShipperExpensesManager = ShipperExpensesManager || {},
    ShipperExpensesManager = function () {
        var
            form = 'aspnetForm', url = 'CustomsExpenses.aspx/SaveShippExpense',
            searchObj = {},


            Init = function () {
                searchObj = {
                    shipper: $('#ShipperSearch').val() != '' ? $('#ShipperSearch').val() : '',
                    type: $('#expenseTypeSearch').val() != '' ? $('#expenseTypeSearch').val() : '',
                    distin: $('#distinationSearch').val() != '' ? $('#distinationSearch').val() : ''
                };

                filllistItems();
                workPerform();
            },
            workPerform = function () {

                $('a.btn-add').on('click', function () {
                    var title = "اضافة المصروف", modalDialog = "ShipExpenseModal", operation = "insert";
                    $('form')[0].reset();
                    $('#ShipperExpenseID').val('0');
                    commonManger.enableAllFormElements('aspnetForm');
                    commonManger.showPopUpDialog(title, operation, modalDialog);
                });

                $("table tbody a[data-action=collapse]").live("click", function (e) {
                    e.preventDefault();
                    var id = $(this).closest('tr').find('input[type=hidden]').val(),
                    childIco = $(this).find('i');

                    if (childIco.hasClass('icon-chevron-up')) {
                        $('table tbody tr[data-id=comp-' + id + ']').hide('slow');
                        childIco.addClass('icon-chevron-down').removeClass('icon-chevron-up');
                    } else {
                        $('table tbody tr[data-id=comp-' + id + ']').show('slow'); childIco.addClass('icon-chevron-up').removeClass('icon-chevron-down');
                    }
                });

                // show/hide relative selects console
                $("table tbody form select[name=ExpenseTypeID]").live("change", function () {
                    var vl = $(this).val(), _form = $(this).closest('form');
                    _form.children('[name=NavigationCoID],[name=DistinationID]').prop("disabled", true).val(''); // disable all
                    if (vl === '3') {
                        _form.find('[name=NavigationCoID],[name=DistinationID]').prop("disabled", false);
                    }
                    else {
                        _form.children('[name=DistinationID]').prop("disabled", false);
                    }
                });

                $("#aspnetForm #ExpenseTypeID").change(function () {
                    showHideLines($(this).val());
                });

                $('#ShipExpenseModal .modal-footer .btn-success').on('click', function (e) {
                    e.preventDefault();

                    var scParam = {};
                    scParam.ShipperExpenseID = $('#aspnetForm #ShipperExpenseID').val();
                    scParam.CustomsCompanyID = $('#aspnetForm #CustomsCompanyID').val();
                    scParam.ExpenseTypeID = $('#aspnetForm #ExpenseTypeID').val();
                    scParam.DistinationID = $('#aspnetForm select[id$=DistinationID]').val();
                    scParam.ShowTypeID = 2;
                    scParam.ExpenseCalcType = $('#aspnetForm select[id$=ExpenseCalcType]').val();;
                    scParam.ExpensesCharge = $('#aspnetForm #ExpensesCharge').val();
                    var navID = $('#aspnetForm #NavigationCo').val();

                    if (scParam.ExpenseTypeID === '3') { // D.O.
                        scParam.NavigationCoID = navID;
                    }


                    var DTO = { 'scParam': scParam },
                    validFlag = applyValidation(); // check 4 validation
                    if (validFlag) {
                        commonManger.doWork('ShipExpenseModal', form, url, DTO, successCallback, commonManger.errorException);
                    }
                    else
                        commonManger.showMessage('حقول مطلوبة', 'برجاء ادخال جميع الحقول الاجبارية أولاً.');
                });

                // populate controls 4 search
                $('#ShipperSearch').html($('#CustomsCompanyID').html());
                $('#distinationSearch').html($('#DistinationID').html());
                $('#expenseTypeSearch').html($('#ExpenseTypeID').html());

                // start search
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    searchObj.shipper = $('#ShipperSearch').val() != '' ? $('#ShipperSearch').val() : '';
                    searchObj.type = $('#expenseTypeSearch').val() != '' ? $('#expenseTypeSearch').val() : '';
                    searchObj.distin = $('#distinationSearch').val() != '' ? $('#distinationSearch').val() : '';

                    updateGrid();
                });

            },
            resetForm = function () {
                $('#aspnetForm input:not([type=radio]),#aspnetForm select').val('');
                $('#ShipperExpenseID').val(0);
                $('#aspnetForm').trigger('reset');
            },
            showHideLines = function (selectVal) { // show/hide tracking lines based on (Delivery Order) expense type.
                $('#divTrackingLines,#divContainerSize,#divDistinationID').addClass('hide').find('select').val('');
                if (selectVal === '3')
                    $('#divTrackingLines,#divDistinationID').removeClass('hide');
                else if (selectVal === '2') {
                    $('#divTrackingLines,#divDistinationID').removeClass('hide');
                } else {
                    $('#divDistinationID').removeClass('hide');
                }
            },
            successCallback = function (data) {
                data = data.d;
                $('#ShipExpenseModal').modal('hide');
                commonManger.showMessage('تنفيذ الاجراء:', data.Message);
                if (data.Status) {
                    resetForm();
                    showHideLines(0); // hide control
                    updateGrid();
                }
            },
            applyValidation = function (formId) {
                // Validate the form and retain the result.
                var isValid = false;
                if ($('#ExpensesCharge').val() !== "" && $('select[id$=ExpenseTypeID]').val() !== "" && $('select[id$=CustomsCompanyID]').val() !== "")
                    isValid = true;

                return isValid;
            },
            applyInlineEditing = function () {
                // editable amount cell
                $('a.editable').editable({
                    validate: function (value) {
                        if ($.trim(value) === '') {
                            return 'مطلوب.';
                        } else if (isNaN(value)) {
                            return 'أرقام فقط.';
                        }
                    },
                    url: function (params) {
                        params.table = $(this).data('table'); params.id = $(this).data('id');
                        return $.ajax({
                            type: 'POST',
                            url: sUrl + 'InlineEdit',
                            data: JSON.stringify(params),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            async: true,
                            cache: false,
                            timeout: 10000,
                            success: function () {
                                commonManger.showMessage('تم الحفظ:', 'تم حفظ قيمة المصروف بنجاح.');
                            },
                            error: function () {
                                commonManger.showMessage('خطأ:', 'لقد حدث خطأ فى تنفيذ الإجراء.');
                            }
                        });
                    }
                });
            },
            updateGrid = function () {
                var oTable = $('#listItems').DataTable();
                oTable.draw();
            },
            filllistItems = function () {
                var oTable = $('#listItems').DataTable({
                    responsive: true,
                    "bServerSide": true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BTf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' }, { extend: 'copy', text: 'نسـخ', }],
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": 'CustomExpenses_SelectList' }, { "name": "names", "value": 'Shipper~Type~Distin' }, { "name": "values", "value": searchObj.shipper + '~' + searchObj.type + '~' + searchObj.distin });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) { commonManger.setData2Grid(data, aoData.sEcho, fnCallback); }, commonManger.errorException);
                    },
                    "iDisplayLength": 50, "aaSorting": [[0, 'asc']],
                    "drawCallback": function (settings) {
                        var api = this.api(), rows = api.rows({ page: 'current' }).nodes(), last = null;
                        api.column(0, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                $(rows).eq(i).before('<tr class="group alert alert-success"><td colspan="100%">' + group + '&nbsp;<a class="grey" href="#collapse" data-action="collapse"><i class="1 bigger-125 icon-chevron-up"></i></a></td></tr>');
                                last = group;
                            }
                        });

                        applyInlineEditing();

                        // bind lists in every forn inside grid
                        var exTypes = $('#aspnetForm #ExpenseTypeID').html();
                        $('.form-inline select[name=ExpenseTypeID]').append(exTypes);

                        var navCo = $('#aspnetForm #NavigationCo').html();
                        $('.form-inline select[name=NavigationCoID]').append(navCo);

                        var cal1 = $('#aspnetForm #ExpenseCalcType').html();
                        $('.form-inline select[name=ExpenseCalcType]').append(cal1);

                        var distnList = $('#aspnetForm #DistinationID').html();
                        $('#listItems tbody select[name=DistinationID]').html(distnList);
                    },
                    "rowCallback": function (row, data, index) {
                        $(row).attr('data-id', 'comp-' + data.CustomsCompanyID);
                    },
                    "aoColumns": [
                        {
                            "mDataProp": "CustomsCompanyNameAr",
                            "bVisible": false,
                            "mData": function (d) {
                                return '<strong>' + d.CustomsCompanyNameAr + '</strong>' +
                                        '<form class="form-inline hidden-print frm-add"><input type="hidden" name="CustomsCompanyID" value="' + d.CustomsCompanyID + '" />\
                                        <select class="input-medium" name="ExpenseTypeID" required></select>\
                                        <input type="hidden" name="ShowTypeID" value="2" />\
                                        <select class="input-medium" name="ExpenseCalcType" required></select>\
                                        <select class="input-medium" name="DistinationID" required></select>\
                                        <select class="input-medium" disabled name="NavigationCoID"></select>\
                                        <input type="text" class="input-small" required placeholder="المبلغ" required value="0" name="ExpensesCharge" name="ExpensesCharge" />\
                                        <button type="submit" class="btn btn-small btn-success" title="أضف مصروف"><i class="icon-plus"></i></button></form>'
                            }
                        },
                        {
                            "mDataProp": "ExpenseTypeNameAr",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "DistinationNameAr",
                            "bSortable": false,
                            "mData": function (d) {
                                return d.DistinationNameAr ? d.DistinationNameAr : '';
                            }
                        },
                        {
                            "mDataProp": "ExpensesCharge",
                            "bSortable": false,
                            "mData": function (d) {
                                return '<a title="تعديل المبلغ" data-type="text" data-id="ShipperExpenseID" data-pk="' + d.ShipperExpenseID + '" data-table="ShipperExpenses" data-name="ExpensesCharge" class="editable" href="#" data-placeholder="أدخل المبلغ">' + numeral(d.ExpensesCharge).format('0.00') + '</a>';
                            }
                        },
                        {
                            "mDataProp": "NavigationCoName",
                            "bSortable": false,
                            "mData": function (d) {
                                return d.NavigationCoName ? d.NavigationCoName : '';
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": 'hidden-print',
                            "mData": function () {
                                return '<button class="btn btn-minier btn-info edit clickMe" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button> ' +
                                        '<button class="btn btn-minier btn-danger remove clickMe" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>';
                            }
                        }
                    ]
                });

                commonManger.searchData(oTable);

                // edit/remove expense
                $("#listItems tbody").delegate("tr button.clickMe", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr'), aData;
                    if (pos !== null) {
                        if (self.hasClass('edit')) {
                            var title = "تعديل المصروف", operation = 'edit', modalDialog = 'ShipExpenseModal';
                            aData = oTable.row(pos).data();//get data of the clicked row
                            commonManger.enableAllFormElements('aspnetForm'); //assing value to hidden field
                            $('#aspnetForm select[id$=ExpenseTypeID]').val(aData["ExpenseTypeID"]);
                            showHideLines($('#aspnetForm select[id$=ExpenseTypeID]').val());
                            $('#aspnetForm #ShipperExpenseID').val(aData["ShipperExpenseID"]);
                            $('#aspnetForm #NavigationCo').val(aData["NavigationCoID"]);
                            $('#aspnetForm #ExpensesCharge').val(aData["ExpensesCharge"]);
                            $('#aspnetForm #ExpenseCalcType').val(aData["ExpenseCalcType"]);
                            $('#aspnetForm select[id$=CustomsCompanyID]').val(aData["CustomsCompanyID"]);
                            $('#aspnetForm select[id$=DistinationID]').val(aData["DistinationID"]);
                            // show control lines
                            commonManger.showPopUpDialog(title, operation, modalDialog);
                        }
                        else if (self.hasClass('remove')) {
                            DeleteConfirmation(function () {
                                aData = oTable.row(pos).data();
                                commonManger.deleteData('anyThing', successCallback, commonManger.errorException, 'ShipperExpenses', 'ShipperExpenseID', aData.ShipperExpenseID);
                            });
                        }
                    }
                });
                // add new expense to shipper
                $("#listItems tbody").delegate("tr form.frm-add", "submit", function (e) {
                    e.preventDefault();
                    var prm = $(this).serializeArray().reduce(function (a, x) { a[x.name] = x.value; return a; }, {}); // json
                    commonManger.doWork('ShipExpenseModal', form, url, { 'scParam': prm }, successCallback, commonManger.errorException);
                });
            },
            setFromProperties = function () {
                // Expenses_SelectProperties
            };
        return {
            Init: Init,
            showHideLines: showHideLines
        };
    }();