var ModelsManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة موديل السيارة";
                var modalDialog = "ModelModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                commonManger.ResetControls('formMain');
                $('#ModelID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#ModelModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'Models.aspx/SaveModel';
                var scParam = {};
                scParam.ModelID = $('#ModelID').val();
                scParam.MakerID = $('#ddlMakerID option:selected').val();
                scParam.TypeNameAr = $('#txtTypeNameAr').val();
                scParam.TypeNameEn = $('#txtTypeNameEn').val();
                scParam.CarSizeID = $('#CarSizeID').val();
                var DTO = { 'scParam': scParam };
                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('ModelModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#ModelModal').modal('hide');
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
            if ($('#txtTypeNameEn').val() != "" && $('#txtTypeNameAr').val() != "" && $('select[id$=ddlMakerID] option:selected').val() != "")
                isValid = true;
            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').DataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'Tf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,responsive: true,
                "sAjaxSource": "Models.aspx/GetModels",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { data.d.aaData = $.parseJSON(data.d.aaData); fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "ModelID",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "TypeNameAr",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "TypeNameEn",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "MakerNameEn",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "CarSizeName",
                        "bSortable": false
                    },
                    {
                        "bSortable": false,
                        "sClass": "hidden-print",
                        "mData": function (oObj) {
                            return '<button class="btn btn-minier btn-info edit" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button> ' +
                                '<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>';
                        }
                    }
                ]
            });
            commonManger.searchData(oTable);
            $("#listItems tbody").delegate("tr button", "click", function (e) {
                e.preventDefault();
                var self = $(this), pos = self.closest('tr'), aData;
                if (pos != null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل موديل السيارة";
                        var operation = 'edit';
                        var modalDialog = 'ModelModal';

                        aData = oTable.row(pos).data(); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#ModelID').val(aData["ModelID"]);
                        $('#txtTypeNameAr').val(aData["TypeNameAr"]);
                        $('#txtTypeNameEn').val(aData["TypeNameEn"]);
                        $('select[id$=ddlMakerID]').val(aData["MakerID"]);
                        $('select[id$=ddlMakerID]').trigger('chosen:updated');
                        $('#CarSizeID').val(aData["CarSizeID"]);
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.row(pos).data();
                            var _id = aData["ModelID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'CarsModel', 'ModelID', _id);
                        })
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();