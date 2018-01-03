var targetdata; modalDialog = "addModal"; formName = 'aspnetForm';
        tableName = "tbl_news_n";
        pKey = "id";
        gridId = "listItems";
        gridColumns = [];
        gridColumns.push(
        {
            "mDataProp": "news_title",
            "bSearchable": true,
            "bSortable": true
        },
        {
            "mDataProp": "active",
            "bSortable": false,
            "mData": function (data) {
                if (data['active'])
                    return '<span class="btn btn-success btn-mini" title="مفعل"><i class="icon-ok"></i></span>';
                else
                    return '<span class="btn btn-danger btn-mini" title="غير مفعل"><i class="icon-remove"></i></span>';
            }
        },
        {
            "bSortable": false,
            "mData": function () {
                return '<button class="btn btn-primary btn-mini edit" title="تعديل"><i class="icon-pencil"></i></button> ' +
                       '<button class="btn btn-danger btn-mini remove" title="حذف"><i class="icon-trash"></i></button>'
            }
        });
        DefaultGridManager.Init();
        $.fn.beforeSave = function () {
            if ($('#RouteURL').val().trim() == "") {
                var news_title = $('#news_title').val();
                news_title = news_title.replace(/\s+/g, '-').toLowerCase();
                $('#RouteURL').val(news_title);
                return true;
            }
            else { return true }
        }
        $.fn.afterLoadData = function (ArrayData) {
            targetdata = ArrayData;
        }