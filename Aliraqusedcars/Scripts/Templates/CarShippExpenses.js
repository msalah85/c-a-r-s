var CarShippExpenses = function () {
    var carid = 0,

    Init = function () {
        var urlIds = decodeURIComponent(commonManger.getUrlVars()["id"]);
        if (urlIds !== undefined && urlIds !== null && urlIds !== '') {
            carid = urlIds;
            $('#CarIDNo').val(carid);
            $('#CarID').val(carid);
        }
        else {
            carid = 0;
            $('#CarIDNo').text(0);
            $('#CarID').val(0);
        }

        filllistItems();
        setDataToControlandGrid();

        pageEvents();
    },
    pageEvents = function () {

        $('.printExp').on('click', function (e) {
            e.preventDefault();
            window.open("CarShippExpensesPrint.aspx?id=" + $('#CarIDNo').val(), "_self");
        });

        $('#divAddEdit').on('click', function () {
            $('#ExpenseID').val("0");
            $('#CarIDNo').text(carid);
            $('#CarID').val(carid);
            var titleedit = "اضافة مصروف الشحن ", operation = 'save';
            commonManger.ResetControls("aspnetForm");
            commonManger.showPopUpDialog(titleedit, operation, "addModal");
        });


        $('#SaveAll').click(function (e) {
            e.preventDefault();
            var valid = commonManger.applyValidation();
            if (valid) {
                commonManger.saveData("addModal", "aspnetForm", saveSuccess, saveError, "CarShippExpenses_save", "1", aftersave);
            }
        });

    },
    saveSuccess = function (d) { if (d.Status) { $("#listItems").dataTable().fnDraw(); } }, saveError = function () { },
    aftersave = function (d) { },
    setDataToControlandGrid = function () {
        var functionName = "CarShippExpenses_Properties", DTO = { 'actionName': functionName, 'value': carid };
        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
          function (data) {
              var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1, jsn2 = jsnData.list2;
              if (jsn1) {
                  $('#CarShippExpenseTypeID').append(
                      $.map(jsn1, function (v, i) {
                          return $('<option />').val(v.ID).text(v.Name);
                      }));
              }
              if (jsn2) {
                  $('#model').val(jsn2.model);
                  if (jsn2.full_name)
                      $('#full_name,.client-Acc').html('<a href="ClientCars.aspx?id=' + jsn2.ClientID + '">' + jsn2.full_name + '</a>');
              }
          }, commonManger.errorException);
    },
    filllistItems = function () {
        var oTable = $('#listItems').dataTable({
            "bServerSide": true,
            "oTableTools": { "aButtons": [] },
            "sAjaxSource": "CarShippExpenses.aspx/GetCarShippExpenses?id=" + carid,
            "fnServerData": function (sSource, aoData, fnCallback) {
                dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
            },
            "iDisplayLength": 150,
            "aoColumns": [
                {
                    "mDataProp": "CarShippExpenseTypeName",
                    "bSortable": true
                }, {
                    "mDataProp": "ExpenseDate",
                    "bSortable": true
                },
                {
                    "mDataProp": "ExpenseCost",
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

        $("#listItems tbody").delegate("tr button", "click", function (e) {
            e.preventDefault();
            var self = $(this), pos = self.closest('tr').index(), aData;
            if (pos != null) {
                if (self.hasClass('edit')) {
                    var titleedit = "تعديل مصروف الشحن ", operation = 'save';
                    aData = oTable.fnGetData(pos); // get data of the clicked row
                    commonManger.ResetControls("aspnetForm");
                    commonManger.getDataForUpdate(aData, "aspnetForm");
                    commonManger.showPopUpDialog(titleedit, operation, "addModal");
                }
                else {
                    DeleteConfirmation(function () {
                        aData = oTable.fnGetData(pos); //get data of the clicked row
                        DTO = { 'value': aData["ExpenseID"] };
                        dataService.callAjax('Post', JSON.stringify(DTO), 'CarShippExpenses.aspx/updatedate',
                          function (data) {
                              $("#listItems").dataTable().fnDraw();
                          }, commonManger.errorException);
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
