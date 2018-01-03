$(function () {
    // bind admin page as a tree shape.
    var bindTree = function (data) {
        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list; // data as a json.
        // tree eaf (options)
        var options = $(jsn).map(function (i, v) { if (!v.ParentCaption && v.ChildCount != '0') { return; } return $('<option ' + ((v.Checked) ? 'selected="selected"' : '') + ' data-section="' + ((v.ParentCaption) ? v.ParentCaption : 'أســـاسيـــــات') + '" data-index="' + v.Priority + '" />').val(v.MenuID).text(v.Caption); }).get();
        // append options to tree
        $('#treePages').html('').append(options).treeMultiselect({
            sortable: true, hideSidePanel: true,
            //onChange: function (selections) { // selected event
            //    console.log(selections);
            //}
        });
    },
    loadUserPages = function (id) {
        DTO = { 'actionName': 'Menus_SelectList', value: id }
        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData', bindTree, commonManger.errorException);
    },
    resetTree = function () {
        $('.tree-multiselect').remove();
    },
    successSaveData = function (d) {
        d = d.d;
        if (d.Status) {
            $('.modal').modal('hide');
            commonManger.showMessage('تم التحديث بنجاح', 'تم تحديد صلاحيات المستخدم بنجاح.');
        }
    };

    // events
    //modal open
    $('a.permission').click(function () {
        var _id = $(this).data('id'); resetTree();
        $('#UserID').val(_id);
        loadUserPages(_id);
    });

    // save permissions button
    $('.btnSave').click(function (e) {
        e.preventDefault();
        var selected = $('.tree-multiselect .item :checkbox:checked').map(function (v, i) {
            return $(this).parent('.item').data('value');
        }).get();

        // save
        DTO = { 'actionName': 'Menus_Save', names: ['UserID', 'MenuIDs'], values: [$('#UserID').val(), selected.join(',')] };
        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successSaveData, commonManger.errorException);
    });
});