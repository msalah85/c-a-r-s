var 
    notesListManager = function () {
        var fillDataTable = function () {
            $('#' + gridId).DataTable({
                "sDom": "t",
                "bServerSide": true, //responsive: true,
                "processing": true,
                "bDestroy": true,
                "fnServerParams": function (aoData) {
                    aoData.push({ 'name': 'sSearch', 'value': $('#CarID').val() });
                },
                "sAjaxSource": mainServiceUrl + "LoadData?funName=" + tableName + '_SelectList',
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 1000,
                "aaSorting": [], // default none sorting none.
                "aoColumns": [{
                    "mDataProp": "UserFullName",
                    "bSortable": false
                },
                {
                    "mDataProp": "AddDate",
                    "bSortable": false,
                    "mData": function (data) {
                        return commonManger.formatJSONDate(data.AddDate);
                    }
                },
                {
                    "mDataProp": "Notes",
                    "bSortable": false
                }]
            });
        },
        init = function () {
            formName = 'formMain'; modalDialog = "addModal";
            tableName = "CarNotes"; pKey = "NoteID";
            gridId = "commentsList";

            fillDataTable()
        };
        return {
            // initialize me
            init: init
        };
    }();

// refill notes list
notesListManager.init();
