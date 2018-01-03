var CommissionsManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة عمولة الشركة";
                var modalDialog = "ShipExpenseModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
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
                var url = 'Commissions.aspx/SaveCommission';

                var scParam = {};
                scParam.DistinationID = $('select[id$=DistinationID] option:selected').val();
                scParam.CommissionCash = $('#CommissionCash').val();
                scParam.CommissionCredit = $('#CommissionCredit').val();
                scParam.CommissionID = $('#CommissionID').val();

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
            if ($('#CommissionCash').val() != "" && $('#CommissionCredit').val() != "" && $('#DistinationID option:selected').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'Tf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },                
                "bServerSide": true,responsive:true,responsive: true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": "/api/general.aspx/LoadData?funName=CarSaleCommission_SelectList",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        fnCallback(data.d);
                    }, errorCallBack);
                },
                "iDisplayLength": 50,
                "aaSorting": [],
                "aoColumns": [
                    {
                        "mDataProp": "CommissionID",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "DistinationNameAr",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "CommissionCash",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "CommissionCredit",
                        "bSortable": false
                    },
                    {
                        
                        "bSortable": false,
                        "sClass": 'hidden-print',
                        "mData": function (oObj) {
                            return '<button class="btn btn-mini btn-info edit" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button>\
                                    <button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>';
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
                        var title = "تعديل عمولة الشركة";
                        var operation = 'edit';
                        var modalDialog = 'ShipExpenseModal';
                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#CommissionCash').val(aData["CommissionCash"]);
                        $('#CommissionID').val(aData["CommissionID"]);
                        $('#CommissionCredit').val(aData["CommissionCredit"]);
                        $('select[id$=DistinationID]').val(aData["DistinationID"]);
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["CommissionID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'CarSaleCommission', 'CommissionID', _id);
                        });
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();
CommissionsManager.Init();