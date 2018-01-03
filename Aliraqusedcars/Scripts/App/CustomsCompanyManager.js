var CustomsCompanyManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة شركة شحن جديدة";
                var modalDialog = "CustomsCompanyModal";
                var operation = "insert";
                $('#CustomsCompanyID').val('0');
                $('#aspnetForm')[0].reset();
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#CustomsCompanyModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'CustomsCompanies.aspx/SaveCustomsCompany';

                var scParam = {};
                scParam.CustomsCompanyID = $('#CustomsCompanyID').val();
                scParam.CustomsCompanyNameEn = $('#CustomsCompanyNameEn').val();
                scParam.CustomsCompanyNameAr = $('#CustomsCompanyNameAr').val();
                scParam.DistinationID = $('select[id$=DistinationID] :selected').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('CustomsCompanyModal', form, url, DTO, successCallback, errorCallBack);
            });

        },
        successCallback = function (data) {
            data = data.d;
            $('#CustomsCompanyModal').modal('hide');
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
            if ($('#CustomsCompanyID').val() != "" && $('#CustomsCompanyNameEn').val() != "" && $('select[id$=DistinationID] :selected').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,responsive: true,
                "sAjaxSource": "CustomsCompanies.aspx/GetCustomsCompanies",
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
                        "mDataProp": "CustomsCompanyID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "CustomsCompanyNameEn",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "CustomsCompanyNameAr",
                        "bSearchable": true,
                        "bSortable": true//,
                        //                        "sWidth":"50",
                        //                        "mData": function (oObj) {
                        //                            if (oObj["Status"]) {
                        //                                return '<span class="label label-success">Enable</span>';
                        //                            } else {
                        //                                return '<span class="label label-important">Disable</span>';
                        //                            }
                        //                        }
                    },
                    {
                        "mDataProp": "DistinationNameAr",
                        "bSearchable": true,
                        "bSortable": false
                    },
                    {
                        "mDataProp": "DistinationID",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return '<input type="hidden" value="' + oObj["DistinationID"] + '" />' +
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
                        var modalDialog = 'CustomsCompanyModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#CustomsCompanyID').val(aData["CustomsCompanyID"]);
                        $('#CustomsCompanyNameEn').val(aData["CustomsCompanyNameEn"]);
                        $('#CustomsCompanyNameAr').val(aData["CustomsCompanyNameAr"]);
                        var mainCoID = self.parent().find('input').val();
                        $('select[id$=DistinationID]').val(mainCoID);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["CustomsCompanyID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'CustomsCompanies', 'CustomsCompanyID', _id);
                        });
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();
CustomsCompanyManager.Init();