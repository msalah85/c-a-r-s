


// get employee name
var pageManager = pageManager || {},
    pageManager = function () {

        var
            qs = commonManger.getUrlVars(),
            obj = { id: qs['id'], type: qs['type'] },


            initProperties = function () {

                // grid
                formName = 'formMain'; tableName = "Advances"; pKey = "ID";
                gridId = "listItems"; mainServiceUrl = 'hr/advances.aspx/';


                gridColumns = [
                    {
                        "mDataProp": "AddDate",
                        "bSortable": true,
                        "mData": function (d) {
                            return commonManger.formatJSONDateCal(d.AddDate);
                        }
                    },
                    {
                        "mData": function (d) {
                            var activeTab = $('#advancesTabs li.active a').data('id');

                            if (d.CheckNo)
                                return d.AdvancePayType + '، برقم: <a title="تفاصيل السند" href="Receipt' + (activeTab === 1 ? 'Voucher' : 'Payments') + 'Print.aspx?id=' + d.CheckNo + '">' + d.CheckNo + '</a>';
                            else
                                return d.AdvancePayType;
                        },
                        "bSortable": false
                    },
                    {
                        "mData": function (d) {
                            return d.Notes ? d.Notes : '';
                        },
                        "bSortable": false
                    },
                    {
                        "mData": function (d) { return numeral(d.Amount).format('0,0.00'); }, // RepayAmount
                        "bSortable": false
                    },
                    {
                        "bSortable": false,
                        "sClass": "center hidden-print",
                        "mData": function (a) {
                            var activeTab = $('#advancesTabs li.active a').data('id');

                            if (a.Revised === 'true') {
                                return '<i class="icon-ok green" title="تمت المراجعة"></i>';
                            } else {
                                return '<a href="Receipt' + (activeTab === 1 ? 'Voucher' : 'Payments') + 'Add.aspx?id=' + d.CheckNo + '" class="btn btn-primary btn-mini" title="تعديل"><i class="icon-pencil"></i></a>';
                            }
                        }
                    }];


                // footer total
                $.extend(true, $.fn.dataTable.defaults, {
                    "footerCallback": function (tfoot, data, start, end, display) {

                        // get total
                        var api = this.api(),
                            total = api.column(3).data().reduce(function (a, b) {
                                return (numeral().unformat(a) * 1) + (numeral().unformat(b) * 1);
                            }, 0);


                        // show total in footer
                        $(api.column(3).footer()).html(
                            numeral(total).format('0,0.00')
                        );
                    }
                });

            },
            getName = function () {
                var t = JSON.stringify({ actionName: "Advances_Properties", names: ['id', 'type'], values: [obj.id, obj.type] }), e = sUrl + "GetDataList",
                    showName = function (data) {
                        var jsnData = commonManger.comp2json(data.d), a = jsnData.list; if (a) {
                            var $member = $('#UserID'), $type = $('#AdvanceTypeID');
                            // fill emp/outsides list
                            $(a).each(function (i, item) {
                                $member.append($('<option />').val(item.ID).text(item.Name));
                                if (item.ID === obj.id) {
                                    $('.username').text(item.Name);
                                    $('.balance').text(numeral(item.AdvancesBalance).format('0,0.00'));
                                }
                            });
                            // bind current member
                            if (obj.id > 0) {
                                $member.val(obj.id).attr('disabled', true);
                                $type.val(obj.type).attr('disabled', true);;
                            }
                        }
                    };


                dataService.callAjax("Post", t, e, showName, commonManger.errorException)
            },
            footerTotal = function (nFoot, aData, iStart, iEnd, aiDisplay) {
                var tot = 0;
                for (var i = 0; i < aData.length; i++) {
                    tot += (parseFloat(aData[i]["Amount"] * 1));
                }

                $('.total').text(numeral(tot).format('0,0'));
            },
            pageEvents = function () {

                // receipts (in, out) add links
                $('a.receipt-in').attr('href', 'ReceiptVoucherAdd.aspx?loanid=' + obj.id + '&loantype=' + obj.type);
                $('a.receipt-out').attr('href', 'ReceiptPaymentsAdd.aspx?loanid=' + obj.id + '&loantype=' + obj.type);


                $.fn.afterLoadDatawithdata = function (d) {
                    $('#UserID').val(obj.id);
                    $('#AdvancePayTypeID').change();
                    $('#CheckNo').val(d['CheckNo']);
                }

                $.fn.afterSave = function (d) {
                    getName();
                }

                //// events
                $('#advancesTabs li a').click(function (e) {
                    e.preventDefault();

                    var _this = $(this), _data = _this.data('id');
                    if (!_this.closest('li').hasClass('active')) {

                        if (_data === 1) {
                            tableName = "AdvanceRepays";
                            DefaultGridManager.fillItemsDataTable(obj, footerTotal);
                            //DefaultGridManager.updateGrid();
                        }
                        else {
                            tableName = "Advances";
                            DefaultGridManager.fillItemsDataTable(obj, footerTotal);
                            //DefaultGridManager.updateGrid();
                        }
                    }
                });

            },
            init = function () {
                initProperties();
                pageEvents();


                // initialize
                getName();


                DefaultGridManager.fillItemsDataTable(obj, footerTotal);
                DefaultGridManager.Init();
            };


        return {
            Init: init,

        };

    }();