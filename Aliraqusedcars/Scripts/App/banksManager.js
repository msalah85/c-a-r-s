var targetdata; modalDialog = "addModal"; tableName = "BanksNames"; pKey = "BankID"; gridId = "listItems"; gridColumns = [], formName = 'aspnetForm';
gridColumns.push(
    {
        "mDataProp": "BankName",
        "bSortable": true
    },
    {
        "bSortable": false,
        "mData": function() {
            return '<button class="btn btn-primary btn-mini edit" title="تعديل"><i class="icon-pencil"></i></button> ' +
                '<button class="btn btn-danger btn-mini remove" title="حذف"><i class="icon-trash"></i></button>'
        }
    });

DefaultGridManager.Init();
$.fn.beforeSave = function() {
    return true;
}
$.fn.afterLoadData = function(ArrayData) {
    targetdata = ArrayData;
}