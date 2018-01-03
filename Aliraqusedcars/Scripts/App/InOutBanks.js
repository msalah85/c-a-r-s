var pageManager = function () {
    var
        afterSave = function (data) {
            fillDataTableList();
        },
        Init = function () {
            $('#btnSaveItem').on('click', function (e) {
                e.preventDefault();
                var ammount = $('#Amount').val();
                if (ammount != '')
                    commonManger.saveData('anyThing', 'addForm', commonManger.successSaved, commonManger.errorException, tableName + "_Save", "1", afterSave);
                else
                    commonManger.showMessage('حقول مطلوبة:', 'برجاء ادخال جميع الحقول المطلوبة')
            });
            fillDataTableList();
        },
        showHideButton = function () {
            var cnt = $('#' + gridId + ' tbody td input[type=checkbox]:checked');
            $('.dataTables_paginate a.btnArchiveList').remove();
            if (cnt.length > 0)
                $('.dataTables_paginate').append('<a href="javascript:void(0)" onclick="pageManager.archiveExpenses();" class="btn btn-info btn-mini btnArchiveList">أرشيـف</a>')
        },
        successArchived = function (data) {
            commonManger.showMessage('تمت الأرشفة بنجاح:', 'تمت عملية الأرشفة للبيانات بنجاح.');
            $('#' + gridId).dataTable().fnDraw();
        },
        successDeleted = function (data) {
            commonManger.showMessage('تمت الأرشفة بنجاح:', 'تمت عملية الأرشفة للبيانات بنجاح.');
            $('#' + gridId).dataTable().fnDraw();
        },
        archiveExpenses = function () {
            if (confirm('هل أنت متأكد من أرشفة البيانات التى تم اختيارها؟')) {
                var sID = $('#' + gridId + ' tbody td input[type=checkbox]:checked').map(function () {
                    return $(this).val();
                }).get().join(',');
                // start archive list.
                if (sID.length > 0) {
                    commonManger.deleteMultipleData('anyThing', successArchived, commonManger.errorException, tableName + 'Archive', 'InOutID', sID);
                }
            }
        },
        fillDataTableList = function () {
            var pTable = $('#' + gridId).dataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'Tf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "language": { "url": "/Scripts/datatables/Arabic.min.js" },
                "pageLength": 25,
                "bProcessing": true,
                "bServerSide": true, responsive: true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": 'InOutBank.aspx/LoadData',
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        var result = data.d;
                        fnCallback(result);
                        // show balance
                        var bl = numeral(result.Balance).format('0,0');
                        $('strong.Balance').text(bl);
                    }, function (data) {
                        commonManger.showMessage('لقد حدث خطأ أثناء تحميل البيانات ', data.Message);
                    });
                },
                "aaSorting": [], // default none sorting none.
                "aoColumns": gridColumns
            });
            commonManger.searchData(pTable);
            $("#" + gridId + " tbody").delegate("tr button", "click", function (e) {
                e.preventDefault();
                var self = $(this);
                var pos = self.closest('tr').index();
                var aData;
                if (pos != null) {
                    if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = pTable.fnGetData(pos);
                            var _id = aData["InOutID"];
                            commonManger.deleteData('anyThing', commonManger.successDeleted, commonManger.errorException, tableName, 'InOutID', _id);
                        });
                    }
                }
            });
            //And for the first simple table, which doesn't have TableTools or dataTables
            //select/deselect all rows according to table header checkbox
            var active_class = 'success';
            $('#' + gridId + ' > thead > tr > th input[type=checkbox]').eq(0).on('click', function () {
                var th_checked = this.checked;//checkbox inside "TH" table header
                $(this).closest('table').find('tbody > tr').each(function () {
                    var row = this;
                    if (th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
                    else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
                }).promise().done(function () {
                    showHideButton();
                });
            });
            //select/deselect a row when the checkbox is checked/unchecked
            $('#' + gridId + '').on('click', 'td input[type=checkbox]', function () {
                var $row = $(this).closest('tr');
                if (this.checked) $row.addClass(active_class);
                else $row.removeClass(active_class);
                showHideButton();
            });
        };
    return {
        Init: Init,
        fillDataTable: fillDataTableList,
        archiveExpenses: archiveExpenses
    };
}();
pageManager.Init();