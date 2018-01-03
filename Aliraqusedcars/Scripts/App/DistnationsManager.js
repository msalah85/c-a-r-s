var DistinationsManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة جهة الوصول";
                var modalDialog = "DistinationModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#DistinationID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#DistinationModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'Distnations.aspx/SaveDistination';
                var scParam = {};
                scParam.DistinationID = $('#DistinationID').val();
                scParam.DistinationNameAr = $('#txtDistinationNameAr').val();
                scParam.DistinationNameEn = $('#txtDistinationNameEn').val();
                var DTO = { 'scParam': scParam };
                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('DistinationModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#DistinationModal').modal('hide');
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
            if ($('#txtDistinationNameEn').val() != "" && $('#txtDistinationNameAr').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,responsive: true,
                "sAjaxSource": "Distnations.aspx/GetDistinations",
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
                "aaSorting": [],
                "aoColumns": [
                    {
                        "mDataProp": "DistinationID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "DistinationNameAr",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "DistinationNameEn",
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
                        var title = "تعديل جهة الوصول";
                        var operation = 'edit';
                        var modalDialog = 'DistinationModal';
                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#DistinationID').val(aData["DistinationID"]);
                        $('#txtDistinationNameAr').val(aData["DistinationNameAr"]);
                        $('#txtDistinationNameEn').val(aData["DistinationNameEn"]);
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["DistinationID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'Distinations', 'DistinationID', _id);
                        });
                    }
                    else if (self.hasClass('view')) {
                        var title = "عرض جهة الوصول";
                        var operation = 'edit';
                        var modalDialog = 'DistinationModal';
                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        //assing value to hidden field
                        $('#DistinationID').val(aData["DistinationID"]);
                        $('#txtDistinationNameAr').val(aData["DistinationNameAr"]);
                        $('#txtDistinationNameEn').val(aData["DistinationNameEn"]);
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