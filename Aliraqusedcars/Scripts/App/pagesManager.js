var targetdata; modalDialog = "addModal"; formName = 'aspnetForm';
tableName = "Articles"; pKey = "ArticleID"; gridId = "listItems";
gridColumns = [
    {
        "mDataProp": "ArticleTitle",
        "bSortable": true
    },
    {
        "mDataProp": "BriefDesc",
        "bSortable": false
    },
    {
        "bSortable": false,
        "mData": function(data) {
            if (data['Active'])
                return '<span class="btn btn-success btn-mini" title="مفعل"><i class="icon-ok"></i></span>';
            else
                return '<span class="btn btn-danger btn-mini" title="غير مفعل"><i class="icon-remove"></i></span>';
        }
    },
    {
        "bSortable": false,
        "mData": function() {
            return '<button class="btn btn-primary btn-mini edit" title="تعديل"><i class="icon-pencil"></i></button>';
        }
    }];
DefaultGridManager.Init();
$.fn.beforeSave = function() {
    if ($('#RouteURL').val().trim() == "") {
        var ArticleTitle = $('#ArticleTitle').val();
        ArticleTitle = ArticleTitle.replace(/\s+/g, '-').toLowerCase();
        $('#RouteURL').val(ArticleTitle);
        return true;
    }
    else { return true }
}
$.fn.afterLoadData = function(ArrayData) {
    targetdata = ArrayData;
}