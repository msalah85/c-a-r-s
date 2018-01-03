var $clients = $('#Clients'),
    successData = function(d) {
        var jsnData = commonManger.comp2json(d.d), jsn = jsnData.list;

        if (jsn) {
            $(jsn).each(function(i, n) {
                $clients.append($('<option />').text(n.full_name).val(n.phone));
            });
            $clients.trigger('chosen:updated');
        }
    },
    enaleControl = function(control, enabled) {
        if (enabled) {
            $('#' + control).removeAttr('disabled').html('<i class="icon-save"></i> ارسـل رسالة');
        } else {
            $('#' + control).removeAttr('disabled').text('جاري التنفيذ ...');
        }
    },
    setCode = function(code) {
        var $msg = $('#Message'); $msg.val($msg.val() + ' ' + code);
    },
    fillClients = function() {
        var url = sUrl + "/GetDataDirect", dtoObject = { actionName: 'SMSTemplates_Properties' };
        dataService.callAjax('Post', JSON.stringify(dtoObject), url, successData, commonManger.errorException);
    },
    targetdata; modalDialog = "addModal"; tableName = "SMSTemplates"; pKey = "ID"; gridId = "listItems"; gridColumns = [], formName = 'aspnetForm';
gridColumns.push(
    {
        "mDataProp": "Message",
        "bSortable": true
    },
    {
        "bSortable": false,
        "mData": function() {
            return '<button class="btn btn-primary btn-mini edit" title="تعديل"><i class="icon-pencil"></i></button> ' +
                '<button class="btn btn-warning btn-mini sms" title="ارسل SMS"><i class="icon-envelope"></i></button> ' +
                '<button class="btn btn-danger btn-mini remove" title="حذف"><i class="icon-trash"></i></button>'
        }
    }),
    successSentData = function(data) {
        data = data.d;

        if (data.indexOf('Successful') > 0) {
            commonManger.showMessage('تم الارسال بنجاح.', 'تم ارسال الرسالة بنجاح.');
            $('.modal').modal('hide');
        } else {
            commonManger.showMessage('خطأ بالارسال:', 'لقد حدث خطأ أثناء تنفيذ العملية:' + data);
        }
    },
    SendingSMS = function(clients, smsMessage) {
        var url = "sms-templates.aspx/SendSMS", dtoObject = { phones: clients.join(), message: smsMessage };
        dataService.callAjax('Post', JSON.stringify(dtoObject), url, successSentData, commonManger.errorException);
        enaleControl('send-sms', true);
    };
DefaultGridManager.Init();
$.fn.beforeSave = function() {
    return true;
}
$.fn.afterLoadData = function(ArrayData) {
    targetdata = ArrayData;
}
// fill clients select
fillClients();

// fire sms modal
$("#" + gridId + " tbody").delegate("tr button.sms", "click", function(event) {
    event.preventDefault();
    $('#smsForm')[0].reset(); // reset form
    var self = $(this), _msg = self.closest('tr').find('td:eq(0)').text();
    $('#msg').val('').val(_msg);
    commonManger.showPopUpDialog('ارسال رسالة', 'sms', 'addSMS');
});
// active send to all clients
$('#sendAll').on('click', function() {
    var inp = $('select[id$=Clients]').get(0);
    if (inp.hasAttribute('disabled')) { inp.removeAttribute('disabled'); }
    else { inp.setAttribute('disabled', 'disabled'); }
    $('select[id$=Clients]').trigger('chosen:updated').trigger("liszt:updated");
});

// send sms to clients
$('#addSMS .modal-footer .btn-primary').click(function(e) {
    e.preventDefault();
    var inp = $('select[id$=Clients]'), _clientsId = (inp.is(':disabled')) ? $.map(inp.find('option'), function(el) { return el.value; }) : inp.chosen().val();

    // validate data
    if (!_clientsId) {
        commonManger.showMessage('بيانات مطلوبة', 'برجاء اختيار العميل والتأكد من نص الرسالة.');
    } else {
        // start sending
        enaleControl('send-sms', false);
        SendingSMS(_clientsId, $('#msg').val());
    }
});