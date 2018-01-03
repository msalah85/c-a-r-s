var qs = commonManger.getUrlVars(),
    urlIds = qs.id;



if (urlIds !== '' && urlIds !== 'undefined' && urlIds !== null) {
    var functionName = "ShipInvoices_SelectPrint", DTO = { 'actionName': functionName, 'value': urlIds };
    dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
        function (data) {
            data = JSON.parse(data.d);

            var headFields = $.grep(data, function (v) {
                return v.Bol !== undefined
            }),
                detailsData = $.grep(data, function (v) {
                    return v.Towing !== undefined
                });

            bindBillHeader(headFields);

            // fill details table
            fillitemsDataTable(detailsData);

        }, commonManger.errorException);
}



// show invoice details grid.
var
    fillitemsDataTable = function (gridData) {
        table = $('#listItems').DataTable({
            "sDom": "<'row'>t<'row'>",
            bDestroy: true,
            bLengthChange: false,
            bFilter: false,
            searching: false,
            retrieve: true,
            paging: false,
            sort: false
        });

        var valuesids = ['MakerNameEn', 'TypeNameEn', 'Year', 'LotNo', 'Towing', 'SeaTrans', 'Loading', 'Partitioning', 'Transportation', 'Extra', 'TotalCost'], _total = 0;
        $.each(gridData, function (index, Basicdata) {
            var row = [];
            for (var i = 0; i < valuesids.length; i++) {
                row.push(Basicdata[valuesids[i]]);
                if (i === 10) {
                    _total += parseFloat(Basicdata[valuesids[i]]);
                }
            }

            table.row.add(row).draw(false);
            $('#divTotalAll').text(numeral(_total).format('0,0'));
        })
    },
    bindBillHeader = function (data) {
        $('#masterForm span[id]').each(function () {
            var iD = $(this).attr('id');
            if (iD === 'ArrivalDate' || iD === 'InvoiceDate')
                $(this).text(commonManger.formatJSONDate(data[0][iD]));
            else
                $(this).text(data[0][iD]);
        });
        $('#divInvoiceNo').text(data[0].ShippInvoiceNo);
    };