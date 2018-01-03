var
    successSaveEditableNo = function (data) {
        $('.message').html(''); // reset 

        if (!data.Status || data.ID === 0) {
            commonManger.showMessage('خطأ بالحفظ', 'حدث خطأ أثناء عملية الحفظ، يرجي اعادة تحميل الصفحة والمحاولة مرة أخري.')
            window.location.reload();
        } else {
            if (data.ID > 1) { // exist before

                var msg = {
                    title: 'رقم الحوالة مكرر',
                    messg: 'رقم الحوالة الذي ادخلته موجود بالفعل مع حوالة أخري برقم: <a href="PayInvoicePaymentsPrint.aspx?id=' + data.ID + '" >' + data.ID + '</a>'
                }

                commonManger.showMessage(msg.title, msg.messg);
                $('.message').html('<div class="alert alert-block alert-warning"><strong>' + msg.title + '</strong> ' + msg.messg + '</div>');


            } else {
                commonManger.showMessage('تم الحفظ بنجاح', 'تم حفظ رقم الحوالة بنجاح.');
            }
        }
    },
    applyEditableControlNo = function () {

        $('a.editable-no').editable({
            emptytext: 'لا يوجــد',
            value: $(this).data('currentVal'),
            validate: function (value) { // required fields
                if ($.trim(value) === '') {
                    return 'مطلوب.';
                }
            },
            url: function (params) {
                params.table = $(this).data('table');

                // save paramters
                var odt = {
                    fnName: params.table + '_SavPayNo',
                    no: params.value,
                    pk: params.pk,
                    date: commonManger.dateFormat($('#PaymentsDates').text())
                };

                // start save current No
                return commonManger.saveEditable(odt, successSaveEditableNo, 'PayInvoicePaymentsPrint.aspx/savePayNo');
            }
        });

    };
