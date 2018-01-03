var NavigationCoManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة شركة ملاحة";
                var modalDialog = "NavigationCoModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#NavigationCoID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#NavigationCoModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm',
                 url = '/api/data.aspx/saveData', names = ['NavigationCoID', 'NavigationCoName'], values = [$('#NavigationCoID').val(), $('#NavigationCoName').val()],
                 DTO = { 'actionName': 'NavigationCos_Save', 'names': names, 'values': values };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('NavigationCoModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#NavigationCoModal').modal('hide');
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
            if ($('#NavigationCoName').val() !== "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "bServerSide": true,responsive:true,responsive: true,
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "sAjaxSource": "/api/data.aspx/LoadDataTables?funName=NavigationCos_SelectList",
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
                        "mDataProp": "NavigationCoID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "NavigationCoName",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        
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
                if (pos !== null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل شركة الملاحة";
                        var operation = 'edit';
                        var modalDialog = 'NavigationCoModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#NavigationCoID').val(aData["NavigationCoID"]);
                        $('#NavigationCoName').val(aData["NavigationCoName"]);
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["NavigationCoID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'NavigationCos', 'NavigationCoID', _id);
                        })
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();

// initialization
NavigationCoManager.Init();