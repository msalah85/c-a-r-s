$.extend(true, $.fn.dataTable.defaults, {
    "orderCellsTop": true,
    "rowsGroup": [1],
    "sDom": "<'row-fluid hidden-print'<'span6 'l><'span6 lft-pane'BfT>r>t<'row-fluid'<'span6'i><'span6'p>>",
    'language': { 'search': 'بحث', 'searchPlaceholder': 'برقم السيارة' }
});

modalDialog = "addModal";
tableName = "ClientDiscounts";
pKey = "ClientDiscountID";
gridId = "listItems";

gridColumns = [],
    formName = 'aspnetForm',
    filterNames = 'ClientID',
    clientId = commonManger.getQueryStrs().id,
    filterValues = clientId,

    getClientName = function () {
        var functionName = tableName + "_Properties",
            DTO = {
                actionName: functionName,
                value: clientId
            },
            bindingData = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
                if (jsn) {
                    $('.client-name').text(jsn.full_name);
                }
            };

        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData', bindingData, commonManger.errorException);
    };

$.fn.beforeSave = function () {
    var cID = $('#CarID').val(),
        reason = $('#Notes').val();

    if (!$.isNumeric(cID) && !(cID * 1 > 0)) {
        commonManger.showMessage('بيانات مطلوبة', 'يرجي اختيار رقم السيارة أولاً.');
        DefaultGridManager.btnProceessing($('.btn[type="submit"]'), false);
        return false;
    }

    if (reason === '') {
        DefaultGridManager.btnProceessing($('.btn[type="submit"]'), false);
        return false;
    }

    return true;
}

// get client name
getClientName();

// Bind clientid
$('#ClientID').val(clientId);
$('#clientLink,.client-name').attr('href', 'ClientCars.aspx?id=' + clientId);

// grid paramters
gridColumns.push(
    {
        "mDataProp": "ClientDiscountID",
        "bSortable": true
    },
    {
        "mDataProp": "CarID",
        "bSortable": true,
        "mData": function (d) {
            return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + d.CarID + '">' + d.CarID + '</a>';
        }
    },
    {
        "mDataProp": "AddDate",
        "bSortable": true,
        "mData": function (d) {
            return commonManger.formatJSONDateCal(d.AddDate, 'dd/MM/yyyy');
        }
    },
    {
        "mDataProp": "Notes",
        "bSortable": false
    },
    {
        "mDataProp": "DiscountAmount",
        "bSortable": false,
        "mData": function (d) {
            return numeral(d.DiscountAmount).format('0,0');
        }
    },
    {
        "bSortable": false,
        "mData": function () {
            var _delBtn = '<button class="btn btn-danger btn-mini remove" title="حذف"><i class="icon-trash"></i></button>', deleteMe = commonManger.fullRoles();
            return deleteMe ? _delBtn : '';
        }
    });

DefaultGridManager.Init();

// delete row with reason
$('#btnDelete').click(function (e) {
    e.preventDefault();

    // delete 
    var
        dltObj = {
            id: $('.removeField').text(),
            reason: $('#Reason'),
        },
        dto = {
            actionName: tableName + '_Delete',
            names: ['id', 'reason'],
            values: [dltObj.id, dltObj.reason.val()]
        },
        savedDataCall = function (data) {
            data = data.d;

            if (data.Status) {
                commonManger.showMessage('تم الحذف', data.message);
            }
            else {
                commonManger.showMessage('لم يتم الحذف', 'حدث خطأ اثناء الحذف' + data.message);
            }

            // hide modal & refresh list
            DefaultGridManager.updateGrid();
            $('.modal').modal('hide');

        };

    // start delete row
    if (dltObj.reason.val() !== '') {
        dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', savedDataCall, commonManger.errorException);
    }
    else {
        dltObj.reason.focus();
        commonManger.showMessage('بيانات مطلوبة', 'يرجي ادخال سبب الحذف');
    }
});

// reset delete form while opeining
$('.modal').on('hide.bs.modal', function () {
    $('#Reason').val('');
    $('#Reason').focus();
});