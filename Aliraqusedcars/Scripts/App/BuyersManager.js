var BuyersManager = function () {
    var
        Init = function () {
            $('a.btn-add').on('click', function () {
                var title = "اضــافـة بـــــايـــــر";
                var modalDialog = "BuyerModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#BuyerID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#BuyerModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'Buyers.aspx/SaveBuyer';
                var scParam = {};
                scParam.BuyerID = $('#BuyerID').val();
                scParam.AuctionID = $('#ddlAuctionID option:selected').val();
                scParam.AuctionTypeID = $('#ddlAuctionType option:selected').val();
                scParam.ClientID = $('#ddlClientID option:selected').val();
                scParam.BuyerName = $('#BuyerName').val();
                scParam.BuyerFee = $('#BuyerFee').val();
                scParam.Active = true;
                scParam.Username = $('#Username').val();
                scParam.Password = $('#Password').val();
                scParam.Puse = $('#Puse').val() === '' ? null : ($('#Puse').val() > 0 ? true : false);
                var DTO = { 'scParam': scParam };
                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('BuyerModal', form, url, DTO, successCallback, commonManger.errorException);
            });
        },
        startDisableBuyer = function (buyerId, clientId) {
            var form = 'aspnetForm', url = 'Buyers.aspx/DeleteBuyer', DTO = { 'ClientID': clientId, 'BuyerID': buyerId };
            commonManger.doWork('BuyerModal', form, url, DTO, deleteCallback, commonManger.errorException);
        },
        deleteCallback = function (data) {
            data = data.d;
            $('#BuyerModal').modal('hide');
            if (data.Status) {
                $('#listItems').DataTable().draw();
                commonManger.showMessage('تم الحذف بنجاح', 'تمت عملية الحذف بنجاح');
            } else
                commonManger.showMessage('خطأ بالحذف', 'لقد حدث خطأ أثناء عملية الحذف ، برجاء المحاولة مرة أخري.');
        },
        successCallback = function (data) {
            data = data.d;
            $('#BuyerModal').modal('hide');
            if (data.Status) {
                $('#listItems').DataTable().draw();
                commonManger.showMessage('تم الحفظ بنجاح', 'تمت عملية الحفظ بنجاح');
            } else
                commonManger.showMessage('خطأ بالحفظ', 'لقد حدث خطأ أثناء عملية الحفظ ، برجاء المحاولة مرة أخري.');
        },
        applyValidation = function (formId) {
            // Validate the form and retain the result.
            var isValid = false;
            if ($('#BuyerName').val() != "" && $('#BuyerID').val() != "" &&
                $('select[id$=ddlAuctionID] option:selected').val() != "" && $('select[id$=ddlAuctionType] option:selected').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').DataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'Tf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,responsive: true,
                "sAjaxSource": "Buyers.aspx/LoadData",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "BuyerName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "AuctionTypeName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "AuctionNameAr",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "full_name",
                        "bSortable": true,
                        "mData": function (d) {
                            return '<a title="بيرات العميل" href="clientbuyers.aspx?client=' + d.ClientID + '">' + d.full_name + '</a>';
                        }
                    },
                    {
                        "mDataProp": "Username",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "Password",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "BuyerFee",
                        "bSortable": false
                    },
                    {
                        "bSortable": false,
                        "mData": function (oObj) {
                            return oObj.Puse === null ? '' : (oObj["Puse"] ? '<i title="الباير متوقف عن العميل الآن" class="red icon-pause"></i>' : '<i title="الباير فعال لدي العميل الآن" class="green icon-ok"></i>');
                        }
                    },
                    {
                        'sClass': 'hidden-print',
                        "bSortable": false,
                        "mData": function () {
                            return '<button class="btn btn-minier btn-info edit" data-toggle="tooltip" data-placement="top" data-original-title="تعديل" title="تعديل"><i class="icon-edit"></i></button> ' +
                                   '<button class="btn btn-minier btn-danger remove" data-toggle="tooltip" data-placement="top" data-original-title="حــذف" title="حــذف"><i class="icon-remove"></i></button>';
                        }
                    }
                ]
            });
            commonManger.searchData(oTable);
            $("#listItems tbody").delegate("tr button", "click", function (e) {
                e.preventDefault();
                var self = $(this), pos = self.closest('tr'), aData;
                if (pos !== null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل المــــــــــزادات", operation = 'edit', modalDialog = 'BuyerModal';
                        aData = oTable.row(pos).data(); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#BuyerID').val(aData["BuyerID"]);
                        $('#BuyerName').val(aData["BuyerName"]);
                        $('#BuyerFee').val(aData["BuyerFee"]);
                        $('select[id$=ddlAuctionType]').val(aData["AuctionTypeID"]);
                        $('select[id$=ddlAuctionID]').val(aData["AuctionID"]);
                        $('select[id$=ddlClientID]').val(aData["ClientID"]);
                        $('#Username').val(aData.Username);
                        $('#Password').val(aData.Password);
                        $('#Puse').val(aData.Puse === null ? '' : (aData.Puse == true ? 1 : 0));
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.row(pos).data();
                            startDisableBuyer(aData["BuyerID"], aData["ClientID"])
                            //commonManger.deleteData('anyThing', successCallback, commonManger.errorException, 'Buyers', 'BuyerID', _id);
                        });
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();