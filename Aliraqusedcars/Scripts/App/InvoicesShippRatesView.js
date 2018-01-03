var pageManager = function () {
    var shipper = null, Distination = '', from = null, to = null,
        Init = function () {
            setDataToSearch();
            // start search
            $('#btnSearchAll').click(function (e) {
                e.preventDefault();
                shipper = $('#Shipper').val(), Distination = $('#Distination').val(), from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val());
                filllistItems();
            });
        },
        BindListSearch = function (list) {            
            var jsnData = commonManger.comp2json(list.d), jsn0 = jsnData.list, jsn1 = jsnData.list1;

            // shipping co.
            $(jsn0).each(function (i, item) {
                $('#Shipper').append($("<option></option>").attr("value", item.ID).text(item.Name));
            });
            $('#Shipper').chosen().trigger('chosen:updated').trigger("liszt:updated");
            // distination list
            $('#Distination').append($("<option />"));
            $(jsn1).each(function (i, item) {
                $('#Distination').append($("<option></option>").attr("value", item.ID).text(item.Name));
            });
        },
        setDataToSearch = function () {
            var DTO = { 'actionName': "ShippInvoices_RatesProperties" };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', BindListSearch, commonManger.errorException);
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
                "bServerSide": true,responsive:true,responsive: true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": "InvoicesShippRatesView.aspx/LoadData",
                "fnServerParams": function (aoData) {
                    aoData.push({ "name": "Shipper", "value": shipper },
                                { "name": "Distination", "value": Distination },
                                { "name": "From", "value": from },
                                { "name": "To", "value": to });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        fnCallback(data.d);
                    }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "ContainerNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "LoadingPrice",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.LoadingPrice).format('0,0.00');
                        }
                    },
                    {
                        "mDataProp": "ShippPrice",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.ShippPrice).format('0,0.00');
                        }
                    },
                    {
                        "mDataProp": "TotalAmount",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.TotalAmount).format('0,0.00');
                        }
                    },
                    {
                        "mDataProp": "DefaultAmount",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.DefaultAmount).format('0,0.00');
                        }
                    },
                    {
                        "bSortable": false,
                        "mData": function (data) {
                            return numeral(parseFloat(data.DefaultAmount) - parseFloat(data.TotalAmount)).format('0,0.00');
                        }
                    }
                ]
            });
        };
    return {
        Init: Init
    };
}();