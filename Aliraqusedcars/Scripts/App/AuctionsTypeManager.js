var AuctionsTypeManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة تصنــيف المــــــــــزادات";
                var modalDialog = "AuctionModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#AuctionTypeID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#AuctionModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'AuctionsTypes.aspx/SaveAuctionType';
                var scParam = {};
                scParam.AuctionTypeID = $('#AuctionTypeID').val();
                scParam.AuctionTypeName = $('#AuctionTypeName').val();
                scParam.AuctionCharge = 0; //$('#AuctionCharge').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('AuctionModal', form, url, DTO, successCallback, errorCallBack);
                // else
                // commonManger.showMessage("حقول مطلوبه!", "يرجى التأكد من ادخال جميع الحقول الإجبارية.");
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#AuctionModal').modal('hide');
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
            if ($('#AuctionCharge').val() != "" && $('#AuctionTypeName').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,responsive: true,
                "sAjaxSource": "AuctionsTypes.aspx/GetAuctionsType",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "AuctionTypeID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "AuctionTypeName",
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
                if (pos != null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل تصنــيف المــــــــــزاد";
                        var operation = 'edit';
                        var modalDialog = 'AuctionModal';
                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#AuctionTypeID').val(aData["AuctionTypeID"]);
                        $('#AuctionTypeName').val(aData["AuctionTypeName"]);
                        //$('#AuctionCharge').val(aData["AuctionCharge"]);
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["AuctionTypeID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'AuctionsTypes', 'AuctionTypeID', _id);
                        });
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();