
// get employee name
var showName = function (data) {
    var jsnData = commonManger.comp2json(data.d),
        name = jsnData.list;

    if (name) {
        $('.username').text(name.Name);
    }
},
getName = function (id) {
    var t = JSON.stringify({ actionName: "Advances_Properties", names: ['id', 'type'], values: [id, 1] }), e = sUrl + "GetDataList";
    dataService.callAjax("Post", t, e, showName, commonManger.errorException)
};


// grid
formName = 'formMain'; modalDialog = "addModal"; tableName = "Vacations"; pKey = "ID";
gridId = "listItems"; gridColumns = [], mainServiceUrl = 'hr/Vacations.aspx/', TitlePage = 'أجازة';

gridColumns.push(
    {
        "mDataProp": "StartDate",
        "bSortable": true,
        "mData": function (d) {
            return commonManger.formatJSONDateCal(d.StartDate);
        }
    },
    {
        "mDataProp": "EndDate",
        "bSortable": true,
        "mData": function (d) {
            return commonManger.formatJSONDateCal(d.EndDate);
        }
    },
    {
        "mDataProp": "Notes",
        "bSortable": false
    },
    {
        "bSortable": false,
        "sClass": "center hidden-print",
        "mData": function (data) {
            return '<button class="btn btn-primary btn-mini edit" title="تعديل"><i class="icon-pencil"></i></button><button class="btn btn-danger btn-mini remove" title="حذف"><i class="icon-trash"></i></button>';
        }
    });


// 
var qs = commonManger.getUrlVars(),
    obj = {
        id: qs['id'],
        type: qs['type']
    };


$.fn.beforeSave = function (data) {
    $('#UserID').val(obj.id);
    $('#AdvanceTypeID').val(obj.type);
    return true;
}


// initialize
getName(obj.id);
DefaultGridManager.fillItemsDataTable(obj);
DefaultGridManager.Init();