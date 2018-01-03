var TowingExpensesManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة مصروف Towing";
                var modalDialog = "ShipExpenseModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                commonManger.ResetControls('formMain');
                $('#TowingExpenseID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#ShipExpenseModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'TowingExpenses.aspx/SaveTowingExpense';
                var scParam = {};
                scParam.TowingExpenseID = $('#TowingExpenseID').val();
                scParam.ShipCompanyID = $('#ShipCompanyID option:selected').val();
                scParam.ServiceTypeID = 1; //$('#ServiceTypeID option:selected').val();
                scParam.RegionID = $('select[id$=RegionID] option:selected').val();
                scParam.ExpensesCharge = $('#ExpensesCharge').val();
                var DTO = { 'scParam': scParam };
                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('ShipExpenseModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#ShipExpenseModal').modal('hide');
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
            if ($('#ExpensesCharge').val() !== "" && //$('select[id$=ServiceTypeID] option:selected').val() !== "" &&
                $('select[id$=ShipCompanyID] option:selected').val() !== "" && $('#RegionID option:selected').val() !== "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'Tf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,
                "sAjaxSource": "/api/general.aspx/LoadData?funName=TowingExpenses_SelectList", //"TowingExpenses.aspx/GetTowingExpenses",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    $.ajax({
                        "type": "GET",
                        "dataType": 'json',
                        "contentType": "application/json; charset=utf-8",
                        "url": sSource,
                        "data": aoData,
                        "success": function (data) {
                            fnCallback(data.d);
                        },
                        "error": function (data) {
                            commonManger.showMessage('خطأ بالخادم!', data.Message);
                        }
                    });
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "TowingExpenseID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ShipCompanyNameAr",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    //{
                    //    "mDataProp": "ServiceTypeNameAr",
                    //    "bSearchable": true,
                    //    "bSortable": true
                    //},
                    {
                        "mDataProp": "RegionAr",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ExpensesCharge",
                        "bSearchable": true,
                        "bSortable": false
                    },
                    {
                        
                        "bSortable": false,
                        "sClass": 'hidden-print',
                        "mData": function (oObj) {
                            return '<input type="hidden" value="' + oObj["ShipCompanyID"] + '" id="scID_' + oObj["ShipCompanyID"] + '" />' +
                                //'<input type="hidden" value="' + oObj["ServiceTypeID"] + '" id="etID_' + oObj["ServiceTypeID"] + '" />' +
                                '<input type="hidden" value="' + oObj["RegionID"] + '" id="dID_' + oObj["RegionID"] + '" />' +
                                //'<button class="btn btn-minier view" data-rel="tooltip" data-placement="top" data-original-title="عرض"><i class="icon-eye-open"></i></button>' +
                                '<button class="btn btn-minier btn-info edit" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button>' +
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
                if (pos !== null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل مصروف الTowing";
                        var operation = 'edit';
                        var modalDialog = 'ShipExpenseModal';
                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#TowingExpenseID').val(aData["TowingExpenseID"]);
                        $('#ExpensesCharge').val(aData["ExpensesCharge"]);
                        $('select[id$=ShipCompanyID]').val(self.parent().find('input[id$=scID_' + aData["ShipCompanyID"] + ']').val());
                        //$('select[id$=ServiceTypeID]').val(self.parent().find('input[id$=etID_' + aData["ServiceTypeID"] + ']').val());
                        $('select[id$=RegionID]').val(self.parent().find('input[id$=dID_' + aData["RegionID"] + ']').val());
                        $('select[id$=ShipCompanyID], select[id$=RegionID]').trigger('chosen:updated'); //.trigger("liszt:updated");
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["TowingExpenseID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'TowingExpenses', 'TowingExpenseID', _id);
                        })
                    }
                    else if (self.hasClass('view')) {
                        var title = "عرض مصروف الTowing";
                        var operation = 'edit';
                        var modalDialog = 'ShipExpenseModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        //assing value to hidden field
                        $('#TowingExpenseID').val(aData["TowingExpenseID"]);
                        $('#ExpensesCharge').val(aData["ExpensesCharge"]);
                        $('select[id$=ShipCompanyID]').val(self.parent().find('input[id$=scID_' + aData["ShipCompanyID"] + ']').val());
                        $('select[id$=ServiceTypeID]').val(self.parent().find('input[id$=etID_' + aData["ServiceTypeID"] + ']').val());
                        $('select[id$=RegionID]').val(self.parent().find('input[id$=dID_' + aData["RegionID"] + ']').val());

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
TowingExpensesManager.Init();