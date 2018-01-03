var ShipMainCompanysManager = function () {
    var 
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة شركة الصرافه";
                var modalDialog = "ShippingMainCompanyModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#ShipMainCompanyID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#ShippingMainCompanyModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'ShippingMainCompanies.aspx/SaveShippingMainCompany';

                var scParam = {};
                scParam.ShipMainCompanyID = $('#ShipMainCompanyID').val();
                scParam.ShipMainCompanyNameAr = $('#txtShipMainCompanyNameAr').val();
                scParam.ShipMainCompanyNameEn = $('#txtShipMainCompanyNameEn').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('ShippingMainCompanyModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#ShippingMainCompanyModal').modal('hide');
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
            if ($('#txtShipMainCompanyNameEn').val() != "" && $('#txtShipMainCompanyNameAr').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "bServerSide": true,responsive:true,
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "sAjaxSource": "ShippingMainCompanies.aspx/GetShippingMainCompanies",
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
                        "mDataProp": "ShipMainCompanyID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ShipMainCompanyNameAr",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ShipMainCompanyNameEn",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        
                        "mData": function (oObj) {
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
                        var title = "تعديل شركة الصرافه";
                        var operation = 'edit';
                        var modalDialog = 'ShippingMainCompanyModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#ShipMainCompanyID').val(aData["ShipMainCompanyID"]);
                        $('#txtShipMainCompanyNameAr').val(aData["ShipMainCompanyNameAr"]);
                        $('#txtShipMainCompanyNameEn').val(aData["ShipMainCompanyNameEn"]);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["ShipMainCompanyID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'ShippingMainCompanies', 'ShipMainCompanyID', _id);
                        })
                    }
                    else if (self.hasClass('view')) {
                        var title = "عرض الشركة الصرافه";
                        var operation = 'edit';
                        var modalDialog = 'ShippingMainCompanyModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        //assing value to hidden field
                        $('#ShipMainCompanyID').val(aData["ShipMainCompanyID"]);
                        $('#txtShipMainCompanyNameAr').val(aData["ShipMainCompanyNameAr"]);
                        $('#txtShipMainCompanyNameEn').val(aData["ShipMainCompanyNameEn"]);

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
} ();