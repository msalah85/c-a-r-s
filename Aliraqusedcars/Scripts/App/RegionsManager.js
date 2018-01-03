var RegionsManager = function () {
    var
        Init = function () {
            $('input[type="text"],.input-sm').on('focus click', function () { $(this).select(); });
            $('a.btn-add').on('click', function () {
                var title = "اضافة مــــــــــدينة";
                var modalDialog = "RegionModal";
                var operation = "insert";
                $('#aspnetForm')[0].reset();
                $('#RegionID').val('0');
                commonManger.enableAllFormElements('aspnetForm');
                commonManger.showPopUpDialog(title, operation, modalDialog);
            });
            filllistItems();
            workPerform();
        },
        workPerform = function () {
            $('#RegionModal .modal-footer .btn-success').on('click', function (e) {
                e.preventDefault();
                var form = 'aspnetForm';
                var url = 'Regions.aspx/SaveRegion';
                var scParam = {};
                scParam.RegionID = $('#RegionID').val();
                scParam.RegionAr = $('#txtRegionAr').val();
                scParam.RegionEn = $('#txtRegionEn').val();
                scParam.RegionCommissionJor = $('#RegionCommissionJor').val();
                var DTO = { 'scParam': scParam };

                var validFlag = applyValidation(); // check 4 validation
                if (validFlag)
                    commonManger.doWork('RegionModal', form, url, DTO, successCallback, errorCallBack);
            });
        },
        successCallback = function (data) {
            data = data.d;
            $('#RegionModal').modal('hide');
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
            if ($('#txtRegionEn').val() != "" && $('#txtRegionAr').val() != "")
                isValid = true;

            return isValid;
        },
        filllistItems = function () {
            var oTable = $('#listItems').dataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'Tf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,responsive:true,
                "sAjaxSource": "/api/general.aspx/LoadData?funName=Regions_SelectList",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {var result = data.d;fnCallback(result);}, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "drawCallback": function (settings) {
                    //var api = this.api(), rows = api.rows({ page: 'current' }).nodes(), last = null;                   
                    // editable row
                    $('a.editable').editable({
                        validate: function (value) {
                            if ($.trim(value) === '') {
                                return 'مطلوب.';
                            } else if (isNaN(value)) {
                                return 'أرقام فقط.';
                            }
                        },
                        url: function (params) {
                            params.table = $(this).data('table'); params.id = $(this).data('id');
                            return $.ajax({
                                type: 'POST',
                                url: sUrl + 'InlineEdit',
                                data: JSON.stringify(params),
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                async: true,
                                cache: false,
                                timeout: 10000,
                                success: function () {
                                    commonManger.showMessage('تم الحفظ:', 'تم حفظ عمولة البيع للأردن نقداً بنجاح.');
                                },
                                error: function () {
                                    commonManger.showMessage('خطأ:', 'لقد حدث خطأ فى تنفيذ الإجراء.');
                                }
                            });
                        }
                    });
                },
                "aoColumns": [
                    {
                        "mDataProp": "RegionID",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "RegionAr",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "RegionEn",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "RegionCommissionJor",
                        "bSortable": false,
                        "mData": function (d) {
                            return '<a title="تعديل المبلغ" data-type="text" data-id="RegionID" data-pk="' + d.RegionID + '" data-table="Regions" data-name="RegionCommissionJor" class="editable" href="#" data-placeholder="أدخل المبلغ">' + d.RegionCommissionJor + '</a>';
                        }
                    },
                    {
                        
                        "bSortable": false,
                        "sClass": 'hidden-print',
                        "mData": function (oObj) {
                            return '<button class="btn btn-mini btn-info edit" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button>\
                                    <button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>';
                        }
                    }
                ]
            });
            commonManger.searchData(oTable);
            $("#listItems tbody").delegate("tr button.btn-mini", "click", function (e) {
                e.preventDefault();
                var self = $(this);
                var pos = self.closest('tr').index();
                var aData;
                if (pos != null) {
                    if (self.hasClass('edit')) {
                        var title = "تعديل المــــــــــدينة";
                        var operation = 'edit';
                        var modalDialog = 'RegionModal';

                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        $('#aspnetForm')[0].reset();
                        // enable the all elements of a form
                        commonManger.enableAllFormElements('aspnetForm');
                        //assing value to hidden field
                        $('#RegionID').val(aData["RegionID"]);
                        $('#txtRegionAr').val(aData["RegionAr"]);
                        $('#txtRegionEn').val(aData["RegionEn"]);
                        $('#RegionCommissionJor').val(aData["RegionCommissionJor"]);

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                    else if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = oTable.fnGetData(pos);
                            var _id = aData["RegionID"];
                            commonManger.deleteData('anyThing', successCallback, errorCallBack, 'Regions', 'RegionID', _id);
                        })
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();