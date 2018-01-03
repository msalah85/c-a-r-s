
// get employee name
formName = 'formMain';
modalDialog = "addModal";
tableName = "UsersLoans";
pKey = "UserID";
gridId = "listItems";
mainServiceUrl = 'hr/AdvanceOutsideMemebers.aspx/';



gridColumns = [
    {
        "mDataProp": "UserID",
        "bSortable": true
    },
    {
        "mDataProp": "UserFullName",
        "bSortable": false,
        'mData': function (d) {
            return '<a href="hr/Advances.aspx?type=1&id=' + d.UserID + '">' + d.UserFullName + '</a>';
        }
    },
    {
        "mData": function (d) {
            return d.AdvancesBalance ? numeral(d.AdvancesBalance).format('0,0') : "0";
        },
        "bSortable": false
    }
];


var footerTotal = function (nFoot, aData, iStart, iEnd, aiDisplay) {

    var tot = 0;
    for (var i = 0; i < aData.length; i++) {
        tot += (parseFloat(aData[i]["AdvancesBalance"] * 1));
    }

    $('.loans-total').text(numeral(tot).format('0,0'));

};