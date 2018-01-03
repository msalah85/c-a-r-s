var ServiceTypesManager = function () {
    var 
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة نوع الخدمة";
                var modalDialog = "ServiceTypeModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#ServiceTypeID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#ServiceTypeModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'ServiceTypes.aspx/SaveServiceType';

                var scParam = {};
                scParam.ServiceTypeID = $('#ServiceTypeID').val();
                scParam.ServiceTypeNameAr = $('#txtServiceTypeNameAr').val();
                scParam.ServiceTypeNameEn = $('#txtServiceTypeNameEn').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('ServiceTypeModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#ServiceTypeModal').modal('hide');
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
            if ($('#txtServiceTypeNameEn').val() != "" && $('#txtServiceTypeNameAr').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "bServerSide": true,responsive:true,
                "sAjaxSource": "ServiceTypes.aspx/GetServiceTypes",
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
                        "mDataProp": "ServiceTypeID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ServiceTypeNameAr",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ServiceTypeNameEn",
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
                        var title = "تعديل نوع الخدمة";
                        var operation = 'edit';
                        var modalDialog = 'ServiceTypeModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#ServiceTypeID').val(aData["ServiceTypeID"]);
                        $('#txtServiceTypeNameAr').val(aData["ServiceTypeNameAr"]);
                        $('#txtServiceTypeNameEn').val(aData["ServiceTypeNameEn"]);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        //assing value to hidden field
                        alert("remove");
                    }
                    else if (self.hasClass('view')) {
                        var title = "عرض النوع الخدمة";
                        var operation = 'edit';
                        var modalDialog = 'ServiceTypeModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        //assing value to hidden field
                        $('#ServiceTypeID').val(aData["ServiceTypeID"]);
                        $('#txtServiceTypeNameAr').val(aData["ServiceTypeNameAr"]);
                        $('#txtServiceTypeNameEn').val(aData["ServiceTypeNameEn"]);

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