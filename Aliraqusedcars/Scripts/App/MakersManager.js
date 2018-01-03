var MakersManager = function () {
    var 
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة ماركة السيارة";
                var modalDialog = "MakerModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#MakerID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#MakerModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'Makers.aspx/SaveMaker';

                var scParam = {};
                scParam.MakerID = $('#MakerID').val();
                scParam.MakerNameAr = $('#txtMakerAr').val();
                scParam.MakerNameEn = $('#txtMakerEn').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('MakerModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#MakerModal').modal('hide');
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
            if ($('#txtMakerEn').val() != "" && $('#txtMakerAr').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "bServerSide": true,responsive:true,responsive: true, "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "sAjaxSource": "Makers.aspx/GetMakers",
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
                        "mDataProp": "MakerID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "MakerNameAr",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "MakerNameEn",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        
                        "bSearchable": false,
                        "bSortable": false,
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
                        var title = "تعديل الماركة السيارة";
                        var operation = 'edit';
                        var modalDialog = 'MakerModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#MakerID').val(aData["MakerID"]);
                        $('#txtMakerAr').val(aData["MakerNameAr"]);
                        $('#txtMakerEn').val(aData["MakerNameEn"]);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["MakerID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'CarsMaker', 'MakerID', _id);
                        });
                    }
                }
            });
        };
    return {
        Init: Init
    };
} ();