var ExchangeCompaniesManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة شركة الصرافه";
                var modalDialog = "ExchangeCompanyModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#ExchangeCompanyID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#ExchangeCompanyModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'ExchangeCompanies.aspx/SaveExchangeCompany';

                var scParam = {};
                scParam.ExchangeCompanyID = $('#ExchangeCompanyID').val();
                scParam.ExchangeCompanyNameAr = $('#txtExchangeCompanyNameAr').val();
                scParam.ExchangeCompanyNameEn = $('#txtExchangeCompanyNameEn').val();
                scParam.Rate = $('#Rate').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('ExchangeCompanyModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#ExchangeCompanyModal').modal('hide');
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
            if ($('#txtExchangeCompanyNameEn').val() != "" && $('#txtExchangeCompanyNameAr').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "bServerSide": true,responsive:true,responsive: true,
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "sAjaxSource": "ExchangeCompanies.aspx/GetExchangeCompanies",
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
                        "mDataProp": "ExchangeCompanyID",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ExchangeCompanyNameAr",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ExchangeCompanyNameEn",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "Rate",
                        "bSortable": false
                    },
                    {
                        "bSortable": false,
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
                if (pos != null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل شركة الصرافه";
                        var operation = 'edit';
                        var modalDialog = 'ExchangeCompanyModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#ExchangeCompanyID').val(aData["ExchangeCompanyID"]);
                        $('#txtExchangeCompanyNameAr').val(aData["ExchangeCompanyNameAr"]);
                        $('#txtExchangeCompanyNameEn').val(aData["ExchangeCompanyNameEn"]);
                        $('#Rate').val(aData["Rate"]);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["ExchangeCompanyID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'ExchangeCompanies', 'ExchangeCompanyID', _id);
                        });
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();