var pageManager = pageManager || {},
    pageManager = function () {
        var
            auction = '', exchCo = '', from = null, to = null,

            Init = function () {

                filllistItems();
                setDataToSearch();
                pageEvents();

            },
            pageEvents = function () {
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    auction = $('#auction').val(), exchCo = $('#ExchangeCompanyID').val(),
                    from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val());

                    updateGrid();
                });
            },
            bindListSearch = function (data) { // shippers for search
                var selectList = JSON.parse(data.d);
                $(selectList).each(function (index, Basicdata) {
                    if (Basicdata.List == 2) {
                        $('#auction').append("<option value='" + Basicdata.AuctionID + "'>" + Basicdata.AuctionName + "</option>");
                    }
                });
                $('#auction').chosen().trigger('chosen:updated').trigger("liszt:updated");
                $(selectList).each(function (index, Basicdata) {
                    if (Basicdata.List == 0) {
                        $('#ExchangeCompanyID').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                    }
                });
                $('#ExchangeCompanyID').chosen().trigger('chosen:updated').trigger("liszt:updated");
            },
            setDataToSearch = function () {
                var functionName = "AuctionCommPayments_Properties", DTO = { 'actionName': functionName, 'value': '' };

                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData', bindListSearch, commonManger.errorException);
            },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                var pTable = $('#listItems').DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'T>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                    "bProcessing": true,
                    "bServerSide": true, responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": "AuctionCommissionPaymentView.aspx/LoadData",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "auction", "value": auction }, { "name": "exchangeCo", "value": exchCo },
                                    { "name": "From", "value": from }, { "name": "To", "value": to });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            var result = data.d;
                            fnCallback(result);
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "ACommPaymentID",
                            "bSearchable": true,
                            "bSortable": true
                        },
                        {
                            "mDataProp": "ACommPaymentDate",
                            "bSearchable": true,
                            "bSortable": true,
                            "mData": function (oObj) {
                                return commonManger.formatJSONDate(oObj['ACommPaymentDate']);
                            }
                        },
                        {
                            "mDataProp": "AuctionName",
                            "bSearchable": true,
                            "bSortable": true
                        },
                        {
                            "mDataProp": "ExchangeCompanyNameAr",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "CheckNo",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "ACommAmount",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "ACommAmountDhs",
                            "bSortable": false
                        },
                        {

                            "bSortable": false,
                            "sClass": "hidden-print",
                            "mData": function (oObj) {
                                return '<button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف" title="حــذف"><i class="icon-remove icon-only"></i></button></div>';
                            }
                        }
                    ]
                });


                $("#listItems tbody").delegate("tr button", "click", function (e) {
                    e.preventDefault();

                    var self = $(this), pos = self.closest('tr'), aData;

                    if (pos != null) {
                        if (self.hasClass('remove')) {

                            var doDelete = function () {

                                aData = pTable.row(pos).data();
                                var _id = aData.ACommPaymentID;

                                commonManger.deleteData('anyThing', commonManger.successDeleted, commonManger.errorException, 'AuctionCommPayments', 'ACommPaymentID', _id);
                            };


                            DeleteConfirmation(doDelete);
                        }
                    }
                });
            };
        return {
            Init: Init
        };
    }();