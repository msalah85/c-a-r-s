var
    CarShopExpenses = function () {

        var carid = 0, outOfRequired = 0,

            Init = function () {
                var
                    qs = commonManger.getUrlVars(),
                    urlIds = decodeURIComponent(qs.id);
                outOfRequired = qs.out ? qs.out : 0;

                if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
                    carid = urlIds;
                    $('#CarIDNo').val(carid);
                    $('#CarID').val(carid);
                }
                else {
                    carid = 0;
                    $('#CarIDNo').val(0);
                    $('#CarID').val(0);
                }

                // assign out of required flag on the client.
                console.log(outOfRequired)
                if (outOfRequired * 1 > 0) {
                    $('#OutOfRequired').val(outOfRequired);
                }

                setDataToControlandGrid();
                filllistItems();
                doEvents();
            },
            doEvents = function () {
                $('.printcar').on('click', function (e) {
                    e.preventDefault();
                    window.open("CarShopExpensesPrint.aspx?id=" + $('#CarIDNo').val(), "_self");
                });

                $('#UnitPrice,#UnitsCount').on('keyup', function () {
                    $('#TotalPrice').val(parseInt($('#UnitPrice').val()) * parseInt($('#UnitsCount').val()));
                });

                $('a#divAddEdit').on('click', function () {
                    $('#CarShopExpenseID').val("0");
                    $('#CarIDNo').val(carid);
                    $('#CarID').val(carid);

                    var titleedit = "تعديل مصروف الشحن ", operation = 'save';
                    commonManger.ResetControls("aspnetForm");
                    commonManger.showPopUpDialog(titleedit, operation, "addModal");
                });

                $('#SaveAll').click(function (e) {
                    e.preventDefault();
                    var valid = commonManger.applyValidation();
                    if (valid) {
                        commonManger.saveData("addModal", "aspnetForm", saveSuccess, errorSave, "CarShopExpenses_save", "1", aftersave);
                    }
                });

                $.fn.afterLoadDatawithdata = function (data) {
                    var _out = data.OutOfRequired == true ? 1 : 0;
                    $('#OutOfRequired').val(_out);
                }
            },
            saveSuccess = function (d) { if (d.Status) { updateGrid(); } }, errorSave = function () { },
            setDataToControlandGrid = function () {
                DTO = { 'actionName': "CarShopExpenses_Properties", 'value': carid };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
                    function (data) {
                        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;


                        if (jsn1) {
                            $('#model').val(jsn1.model);
                            if (jsn1.ClientID)
                                $('#full_name,.client-Acc').html('<a href="ClientCars.aspx?id=' + jsn1.ClientID + '">' + ((jsn1.full_name && jsn1.full_name != '') ? jsn1.full_name : jsn1.SaleClientName) + '</a>');
                        }

                    }, commonManger.errorException);
            },
            aftersave = function (d) { },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                var oTable = $('#listItems').DataTable({
                    "bServerSide": true,
                    "bDestroy": true,
                    "oTableTools": { "aButtons": [] },
                    "sAjaxSource": "CarShopExpenses.aspx/GetCarShippExpenses?id=" + carid,
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aoColumns": [
                        {
                            "mDataProp": "ExpenseSubject",
                            "bSortable": true
                        }, {
                            "mDataProp": "UnitPrice",
                            "bSortable": true
                        },
                        {
                            "mDataProp": "UnitsCount",
                            "bSortable": true
                        },

                        {
                            "mDataProp": "TotalPrice",
                            "bSortable": true
                        },
                        {
                            "mDataProp": "ExpenseDetails",
                            "bSortable": true
                        },
                        {
                            "bSortable": false,
                            "mData": function () {
                                return '<button class="btn btn-minier btn-info edit" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button> ' +
                                    '<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>';
                            }
                        }
                    ]
                });

                //commonManger.searchData(oTable);
                $("#listItems tbody").delegate("tr button", "click", function (e) {
                    e.preventDefault();
                    var self = $(this);
                    var pos = self.closest('tr');
                    var aData;
                    if (pos != null) {
                        if (self.hasClass('edit')) {
                            var titleedit = "تعديل مصروف الشحن ", operation = 'save';

                            aData = oTable.row(pos).data(); // get data of the clicked row
                            commonManger.ResetControls("aspnetForm");
                            commonManger.getDataForUpdate(aData, "aspnetForm");
                            commonManger.showPopUpDialog(titleedit, operation, "addModal");
                        }
                        else if (self.hasClass('remove')) {
                            DeleteConfirmation(function () {
                                aData = oTable.row(pos).data(); // get data of the clicked row

                                var
                                    DTO = {
                                        actionName: 'CarShopExpenses_Delete',
                                        names: ['ExpenseID'],
                                        values: [aData.CarShopExpenseID]
                                    },
                                    successDeleted = function (data) {
                                        console.log(data);
                                        updateGrid();
                                    };

                                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'SaveData', successDeleted, commonManger.errorException);
                            });
                        }
                    }
                });
            };

        return {
            Init: Init,
            aftersave: aftersave
        };
    }();
