var ClientBuyersManager = function () {
    var
        Init = function () {
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#BuyerModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm', url = 'ClientBuyers.aspx/SaveClientBuyer', scParam = {};
                scParam.ClientBuyerID = $('#ClientBuyerID').val();
                scParam.BuyerID = $('#ddlBuyerID option:selected').val();
                scParam.ClientID = $('#ddlClientID option:selected').val();
                scParam.Active = $('#cbActive').is(':checked') ? true : false;
                scParam.EndDate = $('#txtToDate').val();
                var DTO = { 'scParam': scParam };
                var validFlag = applyValidation(); // check 4 validation

                if (validFlag)
                    commonManger.doWork('BuyerModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#BuyerModal').modal('hide');
            commonManger.showMessage('تمت عملية الإضافه بنجاح.', data.Message); // save alert

            if (data.Status) {
                $('#listItems').dataTable().fnDraw();
            }
        },
        errorCallBack = function (jqXhr, textStatus, errorThrown) {
            var title = textStatus + ": " + errorThrown;
            var message = JSON.parse(jqXhr.responseText).Message;
            $("span[id$=lblError]").html(message).closest('div').removeClass('hide').removeClass('alert-success').addClass('alert-danger');
        },
        applyValidation = function (formId) {
            // Validate the form and retain the result.
            var isValid = false;
            if ($('select[id$=ddlBuyerID] option:selected').val() != "" && $('select[id$=ddlClientID] option:selected').val() != "")
                isValid = true;

            return isValid;
        },
        getValueByKey = function (k) {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        filllistItems = function () {
            var clientID = getValueByKey()["client"];
            var oTable = $('#listItems').dataTable({
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,responsive: true,
                "sAjaxSource": "ClientBuyers.aspx/GetBuyers?clientID=" + clientID,
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "full_name",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "BuyerName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "AuctionName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "Active",
                        "bSortable": false,
                        "sWidth": "50",
                        "mData": function (oObj) {
                            if (oObj["Active"]) {
                                return '<span class="label label-success">مفعل</span>';
                            } else {
                                return '<span class="label label-important">غير مفعل</span>';
                            }
                        }
                    },
                    {
                        "mDataProp": "StartDate",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "EndDate",
                        "bSortable": true
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
                        var title = "تعديل رقم المــزاد للعميل";
                        var operation = 'edit';
                        var modalDialog = 'BuyerModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        //commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#ClientBuyerID').val(aData['ClientBuyerID']);
                        $('#txtToDate').val(aData["EndDate"]);
                        if (aData['EndDate'] != '') {
                            $('#txtToDate').removeAttr("disabled");
                        }
                        else
                            $('#txtToDate').val('').attr('disabled', 'disabled');
                        $('input[id$=cbActive]').attr("checked", $(aData["Active"]).html() == 'مفعل' ? true : false);
                        $('select[id$=ddlBuyerID]').val(self.parent().find('input[id$=aID_' + aData["BuyerID"] + ']').val());
                        $('select[id$=ddlClientID]').val(self.parent().find('input[id$=cID_' + aData["ClientID"] + ']').val());

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["ClientID"] + ',' + aData["BuyerID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'ClientBuyers', 'ClientID,BuyerID', _id);
                        });
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();
// Initialize me.
ClientBuyersManager.Init();