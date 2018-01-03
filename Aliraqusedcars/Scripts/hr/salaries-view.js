
formName = 'formMain'; modalDialog = "addModal"; tableName = "SalariesTotal"; pKey = "ID"; gridId = "listItems";
mainServiceUrl = 'hr/salaries.aspx/'

gridColumns = [
    {
        "mDataProp": "AddDate",
        "bSortable": true,
        "mData": function (d) {
            return commonManger.formatJSONDateCal(d.AddDate);
        }
    },
    {
        "mDataProp": function (d) {
            return d.Year + '-' + d.Month;
        },
        "bSortable": true
    },
    {
        "mDataProp": "CheckNo",
        "bSortable": false,
        "mData": function (d) {
            if (!d.CheckNo)
                return '<a href="ReceiptPaymentsAdd.aspx?ids=' + d.ID + '&salamount=' + numeral(d.TotalAmount).format('0') + '">سند صرف</a>';
            else
                return '<a href="ReceiptPaymentsPrint.aspx?id=' + d.CheckNo + '">' + d.CheckNo + '</a>';
        },
    },
    {
        "mDataProp": function (d) {
            return numeral(d.TotalAmount).format('0,0.00');
        },
        "bSortable": false
    },
    {
        "bSortable": false,
        "sClass": "center hidden-print",
        "mData": function (data) {
            if (data.Revised === 'false')
                return '<a class="btn btn-primary btn-mini edit" title="تعديل" href="hr/salaryadd.aspx?id=' + data.ID + '"><i class="icon-pencil"></i></a><button class="btn btn-danger btn-mini remove" title="حذف"><i class="icon-trash"></i></button>';
            else
                return '<i title="تمت مراجعة الرواتب" class="green icon-ok"></i>';
        }
    },
    {
        "bSortable": false,
        "sClass": "center hidden-print",
        "mData": function (data) {
            return '<a class="btn btn-grey btn-mini" title="طباعة تفاصيل الرواتب" href="hr/salaryprint.aspx?id=' + data.ID + '"><i class="icon-print"></i></a>';
        }
    }];