var ExpenseTypesManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة نوع المصروف";
                var modalDialog = "ExpenseTypeModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#ExpenseTypeID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#ExpenseTypeModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'ExpenseTypes.aspx/SaveExpenseType';

                var scParam = {};
                scParam.ExpenseTypeID = $('#ExpenseTypeID').val();
                scParam.ExpenseTypeNameAr = $('#txtExpenseTypeNameAr').val();
                scParam.ExpenseTypeNameEn = $('#txtExpenseTypeNameEn').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('ExpenseTypeModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#ExpenseTypeModal').modal('hide');
            commonManger.showMessage('تمت عملية الإضافه بنجاح.', data.Message);

            if (data.Status) {
                $('#listItems').dataTable().fnDraw();
            }
        },
        errorCallBack = function (jqXhr, textStatus, errorThrown) {
            var title = textStatus + ": " + errorThrown;
            var message = JSON.parse(jqXhr.responseText).Message;
            commonManger.showMessage(title, message);
        },
        applyValidation = function (formId) {
            // Validate the form and retain the result.
            var isValid = false;
            if ($('#txtExpenseTypeNameEn').val() != "" && $('#txtExpenseTypeNameAr').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'Tf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,responsive: true,
                "sAjaxSource": "ExpenseTypes.aspx/GetExpenseTypes",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "ExpenseTypeID",
                        "bSortable": false,
                        "type": 'number'
                    },
                    {
                        "mDataProp": "ExpenseTypeNameAr",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ExpenseTypeNameEn",
                        "bSortable": true
                    },
                    {
                        "sClass": 'hidden-print',"bSortable": false,
                        "mData": function () {
                            return '<button class="btn btn-minier btn-info edit" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button>' +
                                '<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>';
                        }
                    }
                ]
            });
            commonManger.searchData(oTable);
            $("#listItems tbody").delegate("tr button", "click", function (e) {
                e.preventDefault();
                var self = $(this);
                var pos = self.closest('tr').index();
                var aData;
                if (pos != null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل نوع المصروف";
                        var operation = 'edit';
                        var modalDialog = 'ExpenseTypeModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#ExpenseTypeID').val(aData["ExpenseTypeID"]);
                        $('#txtExpenseTypeNameAr').val(aData["ExpenseTypeNameAr"]);
                        $('#txtExpenseTypeNameEn').val(aData["ExpenseTypeNameEn"]);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["ExpenseTypeID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'ExpenseTypes', 'ExpenseTypeID', _id);
                        });
                    }
                    else if (self.hasClass('view')) {
                        var title = "عرض النوع المصروف";
                        var operation = 'edit';
                        var modalDialog = 'ExpenseTypeModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        //assing value to hidden field
                        $('#ExpenseTypeID').val(aData["ExpenseTypeID"]);
                        $('#txtExpenseTypeNameAr').val(aData["ExpenseTypeNameAr"]);
                        $('#txtExpenseTypeNameEn').val(aData["ExpenseTypeNameEn"]);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                        // disable the all elements of a form
                        commonManger.disableAllFormElements('aspnetForm');
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();