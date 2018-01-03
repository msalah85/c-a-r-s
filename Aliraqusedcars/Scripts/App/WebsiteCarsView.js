var pageManager = function () {
    var buyer = '', paid = '', chassis = '', from = null, to = null,
        Init = function () {
            filllistItems();
            $('#btnSearchAll').click(function (e) {
                e.preventDefault();
                buyer = $('#Buyer').val(), chassis = $('#ChassisN').val(), paid = $('#Paid').val(), from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val());
                // show header title for print
                commonManger.showOptionPrintTitle($('#Paid option:selected').text());
                filllistItems();
            });
        },
        filllistItems = function () {
            var pTable = $('#listItems').dataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    { extend: 'copy', text: 'نسـخ', },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }
                ],
                "bProcessing": true,
                "bServerSide": true,
                responsive: true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": "WebsiteCarsView.aspx/LoadData",
                "fnServerParams": function (aoData) {
                    aoData.push({ "name": "chassis", "value": chassis },
                                { "name": "From", "value": from },
                                { "name": "To", "value": to });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        fnCallback(data.d);
                    }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aaSorting": [],
                "aoColumns": [
                    {
                        "mDataProp": "CarID",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "MainPicture",
                        "bSearchable": false,
                        "bSortable": false,
                        "sClass": "text-center",
                        "mData": function (oObj) {
                            return '<a title="صور السيارة رقم: ' + oObj["CarID"] + '" href="images.aspx?id=' + oObj["CarID"] + '">' + (oObj["MainPicture"] != null ? '<img alt=\"car\" width=\"60\" src=\"/public/cars/' + oObj["CarID"] + '/_thumb/' + oObj["MainPicture"] + '\" />' : '<img alt=\"car\" width=\"60\" src="/public/cars/noimage.gif" />') + '</a>';
                        }
                    },
                    {
                        "mDataProp": "InvoiceDate",
                        "bSearchable": true,
                        "bSortable": true,
                        "mData": function (oObj) {
                            return commonManger.formatJSONDate(oObj['InvoiceDate']);
                        }
                    },
                    {
                        "mDataProp": "TypeNameEn",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + oObj["CarID"] + '">' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + (oObj['PayInvTypeID'] == 3 ? ' - Relist' : '') + '</a>';
                        }
                    },
                    {
                        "mDataProp": "LotNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "ChassisNo",
                        "bSortable": false
                    },
                    {
                        "mData": "PayPrice",
                        "bSortable": false
                    },
                    {
                        "mData": "WesitePrice",
                        "bSortable": false
                    },
                    {

                        "bSortable": false,
                        "sClass": "hidden-print",
                        "mData": function (oObj) {
                            return '<div class="tools pull-left hidden-print"><a href="pay/' + oObj["CarID"] + '/InvoicePayAdd.aspx" class="hidden-print btn btn-mini btn-info" data-rel="tooltip" data-placement="top" title="تعــديل" data-original-title="تعــديل"><i class="icon-edit icon-only"></i></a> ' +
                                   '<button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف" title="حــذف"><i class="icon-remove icon-only"></i></button></div>';
                        }
                    }
                ]
            });
            commonManger.searchData(pTable);
            $("#listItems tbody").delegate("tr button", "click", function (e) {
                e.preventDefault();
                var self = $(this);
                var pos = self.closest('tr').index();
                var aData;
                if (pos != null) {
                    if (self.hasClass('remove')) {
                        DeleteConfirmation(function () {
                            aData = pTable.fnGetData(pos);
                            var _id = aData["CarID"];
                            commonManger.deleteData('anyThing', commonManger.successDeleted, commonManger.errorException, 'CarsData', 'CarID', _id);
                        })
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();