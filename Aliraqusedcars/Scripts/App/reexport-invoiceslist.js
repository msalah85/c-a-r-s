// get employee name
tableName = "ReExportInvoices"; pKey = "ExportID"; gridId = "listItems"; filterNames = '', filterValues = '';
gridColumns = [
    {
        "mDataProp": "ExportID",
        "bSortable": false,
        "mData": function (d) {
            return '<a title="طباعة" href="ReExportCarsPrint.aspx?id=' + d.ExportID + '">' + d.ExportID + '</a>';
        }
    },
    {
        "mDataProp": "DateFrom",
        "bSortable": false,
        "mData": function (d) {
            return commonManger.formatJSONDateCal(d.DateFrom);
        }
    },
    {
        "mDataProp": "DateTo",
        "bSortable": false,
        "mData": function (d) {
            return commonManger.formatJSONDateCal(d.DateTo);
        }
    },
    {
        "mDataProp": "NoCars",
        "bSortable": false
    },
    {
        "mData": function (d) {
            return d.TotalAmount ? numeral(d.TotalAmount).format('0,0.00') : 0;
        },
        "bSortable": false
    },
    {
        "mDataProp": "NoCustoms",
        "bSortable": false
    },
    {
        "bSortable": false,
        "mData": function (d) {
            if (d.ReceiptID)
                return '<a href="ReceiptVoucherPrint.aspx?id=' + d.ReceiptID + '" title="عرض سند القبض">' + d.ReceiptID + '</a>';
            else
                return '<a title="إنشاء سند قبض" href="ReceiptVoucherAdd.aspx?ramount=' + numeral(d.RealAmount).format('0') + '&&ids=' + d.ExportID + '">+ سند قبض</a>';
        }
    },
    {
        "mDataProp": "RealAmount",
        "mData": function (d) {
            return d.RealAmount ? numeral(d.RealAmount).format('0,0.00') : 0;
        },
        "bSortable": false
    },
    {
        "mData": function (d) {
            return '<a class="btn btn-mini btn-default" title="طباعة" href="ReExportCarsPrint.aspx?id=' + d.ExportID + '"><i class="icon-print"></i></a> ' +
                   '<a class="btn btn-mini btn-info" title="تعديل" href="ReExportCarsList.aspx?re=' + d.Revised + '&id=' + d.ExportID + '&from=' + commonManger.formatJSONDateCal(d.DateFrom) + '&to=' + commonManger.formatJSONDateCal(d.DateTo) + '"><i class="icon-edit"></i></a>';
        },
        "bSortable": false
    }];