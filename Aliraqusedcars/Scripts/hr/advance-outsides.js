
// get employee name
formName = 'formMain';
modalDialog = "addModal";
tableName = "AdvanceOutsideMemebers";
pKey = "ID";
gridId = "listItems";
mainServiceUrl = 'hr/AdvanceOutsideMemebers.aspx/';



gridColumns = [
    {
        "mDataProp": "ID",
        "bSortable": true
    },
    {
        "mDataProp": "Name",
        "bSortable": false
    },
    {
        "mData": function (d) {
            return d.Phone ? d.Phone : "";
        },
        "bSortable": false
    },
    {
        "mData": function (d) {
            return d.AdvancesBalance ? numeral(d.AdvancesBalance).format('0,0') : "0";
        },
        "bSortable": false
    },
    {
        "bSortable": false,
        "sClass": "hidden-print",
        "mData": function (data) {
            var delIco = '';
            if (parseFloat(data.AdvancesBalance) < 1) {
                delIco = '<li><button class="remove btn-small btn-danger btn btn-block">حذف</button></li>';
            }
            return '<div class="btn-group"><button data-toggle="dropdown" class="btn btn-small btn-info dropdown-toggle">اخـتـر <i class="icon-angle-down icon-on-right"></i></button>\
                                    <ul class="dropdown-menu pull-right">\
                                        <li>\
                                            <button class="edit btn-small btn btn-block">تعديل</button>\
                                        </li>\
                                        <li>\
                                            <a class="btn btn-small btn-primary btn-block" href="hr/Advances.aspx?type=2&id=' + data.ID + '">القروض</a>\
                                        </li>' + delIco + '</div>';
        }
    }
];


var footerTotal = function (nFoot, aData, iStart, iEnd, aiDisplay) {

    var tot = 0;
    for (var i = 0; i < aData.length; i++) {
        tot += (parseFloat(aData[i]["AdvancesBalance"] * 1));
    }

    $('.loans-total').text(numeral(tot).format('0,0'));

};