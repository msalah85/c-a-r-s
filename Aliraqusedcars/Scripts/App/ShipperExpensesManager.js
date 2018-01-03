var ShipperExpensesManager = ShipperExpensesManager || {},
    ShipperExpensesManager = function () {
        "use strict";

        var
            exTable = $('#listItems').DataTable(),
            form = 'aspnetForm',
            url = 'ShippingExpenses.aspx/SaveShippExpense',
            searchObj = {
                shipper: $('#ShipperSearch').val() !== '' ? $('#ShipperSearch').val() : '',
                type: $('#expenseTypeSearch').val() !== '' ? $('#expenseTypeSearch').val() : '',
                distin: $('#distinationSearch').val() !== '' ? $('#distinationSearch').val() : ''
            },



            Init = function () {
                geShippers();
                workPerform();
            },
            workPerform = function () {

                // edit/remove expense from grid
                $(document).delegate("#listItems tbody tr button.clickMe", "click", function (e) {
                    e.preventDefault();

                    var self = $(this), pos = self.closest('tr'), aData;
                    if (pos !== null) {
                        if (self.hasClass('edit')) {
                            var title = "تعديل المصروف",
                                operation = 'edit',
                                modalDialog = 'ShipExpenseModal';

                            aData = exTable.row(pos).data(); //get data of the clicked row

                            //commonManger.enableAllFormElements('aspnetForm'); 
                            //assing value to hidden field
                            $('#aspnetForm select[id$=ExpenseTypeID]').val(aData["ExpenseTypeID"]);
                            showHideLines($('#aspnetForm select[id$=ExpenseTypeID]').val());
                            $('#aspnetForm #ShipperExpenseID').val(aData["ShipperExpenseID"]);
                            $('#aspnetForm #NavigationCo').val(aData["NavigationCoID"]);
                            $('#aspnetForm #ExpensesCharge').val(numeral(aData["ExpensesCharge"]).format('0.00'));
                            $('#aspnetForm select[id$=ShipCompanyID]').val(aData["ShipCompanyID"]);
                            $('#aspnetForm select[id$=DistinationID]').val($('.title').data('destinationID'));
                            $('#aspnetForm select[id$=CarsNo]').val(aData["CarsNo"]);
                            $('#aspnetForm select[id$=ContainerSize]').val(aData["ContainerSize"]);

                            // show control lines
                            commonManger.showPopUpDialog(title, operation, modalDialog);
                        }
                        else if (self.hasClass('remove')) {


                            DeleteConfirmation(function () {
                                aData = exTable.row(pos).data();
                                commonManger.deleteData('anyThing', successDeleteBack, commonManger.errorException, 'ShipperExpenses', 'ShipperExpenseID', aData.ShipperExpenseID);
                            });
                        }
                    }
                });

                // add new expense
                $('#btnAddNew').on('click', function () {
                    var title = "اضافة مصروف",
                        modalDialog = "ShipExpenseModal",
                        operation = "insert";


                    // reset form
                    $('#ExpenseTypeID').val('');
                    $('#' + form + ' input').val('0');
                    $('#ShipperExpenseID').val('0');


                    // show modal
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
                    _form.children('[name=NavigationCoID],[name=ContainerSize],[name=CarsNo],[name=DistinationID]').prop("disabled", true).val(''); // disable all

                    if (vl === '3') {
                        _form.find('[name=NavigationCoID],[name=DistinationID]').prop("disabled", false);
                    }
                    else if (vl === '2') {
                        _form.children('[name=NavigationCoID],[name=ContainerSize],[name=DistinationID]').prop("disabled", false);
                    }
                    else if (vl === '1') {
                        _form.children('[name=CarsNo]').prop("disabled", false);
                    } else if (vl === '20') {
                        // only container transmission cost
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
                    scParam.ShipCompanyID = $('#aspnetForm #ShipCompanyID').val();
                    scParam.ExpenseTypeID = $('#aspnetForm #ExpenseTypeID').val();
                    scParam.DistinationID = $('.title').data('destinationID');
                    scParam.ShowTypeID = 1; // الشحن
                    scParam.ExpenseCalcType = 1; // الحاوية
                    scParam.ExpensesCharge = $('#aspnetForm #ExpensesCharge').val();


                    var navID = $('#aspnetForm #NavigationCo').val();
                    if (scParam.ExpenseTypeID === '1' || scParam.ExpenseTypeID === '20' || scParam.ExpenseTypeID === '21') { // loading or USA transportation or partioning                        
                        scParam.DistinationID = 0;
                        if (scParam.ExpenseTypeID === '1')
                            scParam.CarsNo = $('#aspnetForm #CarsNo').val();
                    }
                    else if (scParam.ExpenseTypeID === '2') { // O.F.
                        scParam.ContainerSize = $('#aspnetForm #ContainerSize').val();
                        scParam.NavigationCoID = navID;
                    }
                    else if (scParam.ExpenseTypeID === '3') { // D.O.
                        scParam.ContainerSize = $('#aspnetForm #ContainerSize').val();
                        scParam.NavigationCoID = navID;
                    }


                    var DTO = { 'scParam': scParam },
                        validFlag = applyValidation(); // check 4 validation


                    if (validFlag)
                        commonManger.doWork('ShipExpenseModal', form, url, DTO, successCallback, commonManger.errorException);
                    else
                        commonManger.showMessage('حقول مطلوبة', 'برجاء ادخال جميع الحقول الاجبارية أولاً.');
                });

                // populate controls 4 search
                $('#ShipperSearch').html($('#ShipCompanyID').html());
                $('#distinationSearch').html($('#DistinationID').html());
                $('#expenseTypeSearch').html($('#ExpenseTypeID').html());


                // start search
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    searchObj.shipper = $('#ShipperSearch').val() !== '' ? $('#ShipperSearch').val() : '';
                    searchObj.type = $('#expenseTypeSearch').val() !== '' ? $('#expenseTypeSearch').val() : '';
                    searchObj.distin = $('#distinationSearch').val() !== '' ? $('#distinationSearch').val() : '';

                    updateGrid();
                });


                // filter expenses
                $('.shippingDiv').on('click', 'button.btn-light', function (e) {
                    e.preventDefault();


                    var $this = $(this);

                    // set button style
                    $('button.btn-light.btn-light-border').removeClass('btn-light-border');
                    $this.addClass('btn-light-border');


                    // filter paraamters
                    searchObj.distin = $this.data('id');
                    searchObj.shipper = $this.closest('p').find('.btn-inverse[id]').data('id');


                    $('#ShipCompanyID').val(searchObj.shipper);
                    $('#DistinationID').val(searchObj.distin);


                    // get expenses
                    filllistItems();
                    //updateGrid();


                    showSelectedTitle($this.closest('p').find('.btn-inverse[id]').text() + ' - ' + $this.text(), searchObj.distin);


                    // show/hide panels
                    showHidePanels(true);

                });


                // finish editing expenses and select a new one
                $('#finishEdting').click(function (e) {
                    e.preventDefault();
                    showHidePanels(false);
                    showSelectedTitle(''); // reset title
                });
            },
            showSelectedTitle = function (title, destID) {
                $('.title').data('destinationID', destID).text(title);
            },
            showHidePanels = function (editExp) {
                if (editExp) {
                    $('#expList').removeClass('hidden', 1000, "easeInBack").addClass('animateIn');
                    $('#expFilter').addClass('hidden');
                } else {
                    $('#expFilter').removeClass('hidden', 1000, "easeInBack").addClass('animateIn');
                    $('#expList').addClass('hidden');
                }
            },
            resetForm = function () {
                $('#aspnetForm input:not([type=radio]),#aspnetForm select:not([id="ShipCompanyID"])').val('');
                $('#ShipperExpenseID').val(0);
                //$('#aspnetForm').trigger('reset');
            },
            showHideLines = function (selectVal) { // show/hide tracking lines based on (Delivery Order) expense type.
                $('#divTrackingLines,#divContainerSize,#divCarsNo,#divDistinationID').addClass('hide').find('select').val('');
                if (selectVal === '3')
                    $('#divTrackingLines,#divDistinationID').removeClass('hide');
                else if (selectVal === '2') {
                    $('#divContainerSize,#divTrackingLines,#divDistinationID').removeClass('hide');
                }
                else if (selectVal === '1') {
                    $('#divCarsNo').removeClass('hide');
                }
                else if (selectVal === '20') {
                }
                else {
                    $('#divDistinationID').removeClass('hide');
                }
            },
            successCallback = function (data) {
                data = data.d;
                $('#ShipExpenseModal').modal('hide');
                commonManger.showMessage('تمت عملية الإضافه بنجاح.', data.Message);
                if (data.Status) {
                    resetForm();
                    showHideLines(0); // hide control
                    updateGrid();
                }
            },
            successDeleteBack = function (data) {
                data = data.d;

                $('#ShipExpenseModal').modal('hide');
                commonManger.showMessage('تمت تنفيذ الإجراء بنجاح.', data.message);

                if (data.Status) {
                    resetForm();
                    showHideLines(0); // hide control
                    updateGrid();
                }
            },
            applyValidation = function (formId) {
                // Validate the form and retain the result.
                var isValid = false;
                if ($('#ExpensesCharge').val() !== "" && $('#ExpenseTypeID').val() !== "" && $('select[id$=ShipCompanyID]').val() !== "")
                    isValid = true;

                return isValid;
            },

            geShippers = function () {
                var actionName = "ShipperExpenses_Properties", DTO = { 'actionName': actionName };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', bindShippers, commonManger.errorException);
            },
            bindShippers = function (data) {
                var jsnData = commonManger.comp2json(data.d),
                    jsn = jsnData.list,  // main co.
                    jsn1 = jsnData.list1,  // shippers
                    jsn2 = jsnData.list2, // distinations
                    _distinationsBlock = '';


                // distinations buttons list for every point
                _distinationsBlock = $(jsn2).map(function (k, v) {
                    return '<button class="btn btn-small btn-app btn-light radius-4 hidden" data-id="' + v.DistinationID + '">' + v.DistinationNameEn + '</button>';
                }).get().join('');


                // loop every main shipping comp.
                $(jsn).each(function (i, v) {
                    var _shippersBlock = '';

                    // get shippiers(points) buttons under every main shipping comp.
                    _shippersBlock = $(jsn1).map(function (k, vv) {
                        if (vv.ShipMainCompanyID === v.ShipMainCompanyID)
                            return '<p><button id="shipper_' + vv.ShipCompanyID + '" class="btn btn-app btn-inverse radius-4" data-id="' + vv.ShipCompanyID + '">' + vv.ShipCompanyNameEn + ' <i class="icon-arrow-right pull-right smaller"></i></button>' + _distinationsBlock + '</p>';
                    }).get().join('');


                    // create accordion block (panel) for every main shipping comp.
                    var _shippBlock = '<dt><a href="#accordion' + (i + 1) + '" aria-expanded="false" aria-controls="accordion' + (i + 1) + '" class="' + v.Color + ' accordion-title accordionTitle js-accordionTrigger">' + v.ShipMainCompanyNameEn + '</a></dt><dd class="accordion-content accordionItem is-collapsed" id="accordion' + (i + 1) + '" aria-hidden="true">' + _shippersBlock + '</dd>';


                    // show this panel on the page.
                    $('#accord').append(_shippBlock);

                    // fire accordion utility function.
                    ShipperExpensesUtilitiy.Init();

                });
            },

            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                exTable = $('#listItems').DataTable({
                    responsive: true,
                    "bServerSide": true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    ordering: false,
                    "sDom": 't',
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": 'ShipperExpenses_SelectList' }, { "name": "names", "value": 'Shipper~Distin' }, { "name": "values", "value": searchObj.shipper + '~' + searchObj.distin });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 100, "aaSorting": [[0, 'asc']],
                    "drawCallback": function (settings) {
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

                        /*// bind lists in every forn inside grid
                        var exTypes = $('#aspnetForm #ExpenseTypeID').html();
                        $('.form-inline select[name=ExpenseTypeID]').append(exTypes);
    
                        var navCo = $('#aspnetForm #NavigationCo').html();
                        $('.form-inline select[name=NavigationCoID]').append(navCo);
    
                        var contSize = '<option value="">حجم الحاوية</option>' + $('#aspnetForm #ContainerSize').html();
                        $('.form-inline select[name=ContainerSize]').append(contSize);
    
                        var carsNo = '<option value=""># السيارات بالحاوية</option>' + $('#aspnetForm #CarsNo').html();
                        $('#listItems tbody select[name=CarsNo]').html(carsNo);
    
                        var distnList = $('#aspnetForm #DistinationID').html();
                        $('#listItems tbody select[name=DistinationID]').html(distnList);
                        */
                    },
                    "rowCallback": function (row, data, index) {
                        $(row).attr('data-id', 'comp-' + data.ShipCompanyID);
                    },
                    "aoColumns": [
                        {
                            "mDataProp": "ExpenseTypeNameAr",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "NavigationCoName",
                            "bSortable": false,
                            "mData": function (d) {
                                return d.NavigationCoName ? d.NavigationCoName : '';
                            }
                        },
                        {
                            "mDataProp": "ContainerSize",
                            "bSortable": false,
                            "mData": function (d) {
                                return d.ContainerSize ? d.ContainerSize : '';
                            }
                        },
                        {
                            "mDataProp": "CarsNo",
                            "bSortable": false,
                            "mData": function (d) {
                                return d.CarsNo ? d.CarsNo : '';
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
                            "bSortable": false,
                            "sClass": 'hidden-print',
                            "mData": function () {
                                return '<button class="btn btn-minier btn-info edit clickMe" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button> ' +
                                    '<button class="btn btn-minier btn-danger remove clickMe" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>';
                            }
                        }
                    ]
                });

                /*// add new expense to shipper
                $("#listItems tbody").delegate("tr form.frm-add", "submit", function (e) {
                    e.preventDefault();
                    var prm = $(this).serializeArray().reduce(function (a, x) { a[x.name] = x.value; return a; }, {}); // json
                    commonManger.doWork('ShipExpenseModal', form, url, { 'scParam': prm }, successCallback, commonManger.errorException);
                });
                */
            };
        return {
            Init: Init,
            showHideLines: showHideLines
        };
    }();

// initialize data.
ShipperExpensesManager.Init();