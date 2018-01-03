var ShipCompanyManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة شركة شحن جديدة";
                var modalDialog = "ShipCompanyModal";
                var operation = "insert";
                $('#ShipCompanyID').val('0');
                $('#aspnetForm')[0].reset();
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#ShipCompanyModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'ShippingCompanies.aspx/SaveShipCompany';

                var scParam = {};
                scParam.ShipCompanyID = $('#ShipCompanyID').val();
                scParam.ShipCompanyNameEn = $('#ShipCompanyNameEn').val();
                scParam.ShipCompanyNameAr = $('#ShipCompanyNameAr').val();
                scParam.ShipMainCompanyID = $('select[id$=ShipMainCompanyID] :selected').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('ShipCompanyModal', form, url, DTO, successCallback, errorCallBack);
            });

        },
        successCallback = function (data) {
            data = data.d;
            $('#ShipCompanyModal').modal('hide');
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
            if ($('#ShipCompanyID').val() != "" && $('#ShipCompanyNameEn').val() != "" && $('select[id$=ShipMainCompanyID] :selected').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "bServerSide": true,responsive:true,
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "sAjaxSource": "ShippingCompanies.aspx/GetShipCompanies",
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
                        "mDataProp": "ShipCompanyID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ShipCompanyNameEn",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ShipCompanyNameAr",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ShipMainCompanyNameAr",
                        "bSearchable": true,
                        "bSortable": false
                    },
                    {
                        "mDataProp": "ShipMainCompanyID",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return '<input type="hidden" value="' + oObj["ShipMainCompanyID"] + '" />' +
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
                if (pos != null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل شركة الشحن";
                        var operation = 'edit';
                        var modalDialog = 'ShipCompanyModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#ShipCompanyID').val(aData["ShipCompanyID"]);
                        $('#ShipCompanyNameEn').val(aData["ShipCompanyNameEn"]);
                        $('#ShipCompanyNameAr').val(aData["ShipCompanyNameAr"]);
                        var mainCoID = self.parent().find('input').val();
                        $('select[id$=ShipMainCompanyID]').val(mainCoID);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["ShipCompanyID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'ShippingCompanies', 'ShipCompanyID', _id);
                        })
                    }
                    else if (self.hasClass('view')) {
                        var title = "عرض شركة الشحن";
                        var operation = 'edit';
                        var modalDialog = 'ShipCompanyModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        //assing value to hidden field
                        $('#ShipCompanyID').val(aData["ShipCompanyID"]);
                        $('#ShipCompanyNameEn').val(aData["ShipCompanyNameEn"]);
                        $('#ShipCompanyNameAr').val(aData["ShipCompanyNameAr"]);
                        var mainCoID = self.parent().find('input').val();
                        $('select[id$=ShipMainCompanyID]').val(mainCoID);
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