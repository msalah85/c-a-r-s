var AuctionsManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضافة مــــــــــزاد";
                var modalDialog = "AuctionModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#AuctionID').val('0');
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
                var url = 'Auctions.aspx/SaveAuction';
                var scParam = {};
                scParam.AuctionID = $('#AuctionID').val();
                //scParam.AuctionTypeID = $('#ddlAuctionType option:selected').val();
                scParam.AuctionNameAr = $('#txtAuctionAr').val();
                scParam.AuctionName = $('#txtAuctionEn').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('AuctionModal', form, url, DTO, successCallback, errorCallBack);
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
            if ($('#txtAuctionEn').val() != "" && $('#txtAuctionAr').val() != "" && $('select[id$=ddlAuctionType] option:selected').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,responsive: true,
                "sAjaxSource": "Auctions.aspx/GetAuctions",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "AuctionID",
                        "bSearchable": false,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "AuctionName",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "AuctionNameAr",
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
            /*.makeEditable({
            sUpdateURL: "Auctions.aspx/UpdateData",
            //sUpdateHttpMethod: "GET",
            //sDeleteURL: "Auctions.aspx/DeleteData",
            //"aoColumns": [{}, { cssclass: "required" },
            //{ indicator: 'جارى الحفظ...', tooltip: 'انقر لتعديل القيمة', type: 'textarea', submit: 'حفظ التعديلات' }//,
            //{ indicator: 'Saving Engine Version...', tooltip: 'Click to select engine version', loadtext: 'loading...', type: 'select', onblur: 'cancel', submit: 'Ok'}
            //],
            fnShowError: function (message, action) {
            switch (action) {
            case "update":
            //jAlert(message, "Update failed");
            alert("Update failed" + message);
            break;
            case "delete":
            //jAlert(message, "Delete failed");
            alert("Delete failed");
            break;
            //                        case "add":    
            //                            $("#lblAddError").html(message);    
            //                            $("#lblAddError").show();    
            //                            break;    
            }
            }
            });*/
            commonManger.searchData(oTable);
            $("#listItems tbody").delegate("tr button", "click", function (e) {
                e.preventDefault();
                var self = $(this);
                var pos = self.closest('tr').index();
                var aData;
                if (pos != null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل المــــــــــزاد";
                        var operation = 'edit';
                        var modalDialog = 'AuctionModal';
                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#AuctionID').val(aData["AuctionID"]);
                        $('#txtAuctionAr').val(aData["AuctionNameAr"]);
                        $('#txtAuctionEn').val(aData["AuctionName"]);
                        //$('select[id$=ddlAuctionType]').val(self.parent().find('input[id$=atID_' + aData["AuctionTypeID"] + ']').val());
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["AuctionID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'Auctions', 'AuctionID', _id);
                        });
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();