<%@ Page Language="C#" AutoEventWireup="true" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>طباعة مبلغ الزيادة على السيارة</title>
    <link href="/App_Themes/iraq/allcss.min.css" rel="stylesheet" />
    <link href="//fonts.googleapis.com/earlyaccess/droidarabickufi.css" rel="stylesheet" />
    <script src="/App_Themes/iraq/js/app.min.js"></script>
    <style>
        body, body:before {
            background-color: #808080 !important;
        }

        .container {
            background-color: #fff;
            min-height: 600px;
            padding: 10px;
        }

        @media print {
            body,
            body:before,
            .container {
                background-color: #fff !important;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>طباعة مبلغ الزيادة
            <small class="pull-left hidden-print">
                <a href="javascript:window.close();" data-rel="tooltip" data-placement="bottom" title="اغلاق"><i class="icon-remove red"></i></a>
                <a href="javascript:window.print();" data-rel="tooltip" data-placement="bottom" title="طباعه"><i class="icon-print"></i></a>
            </small>
        </h1>
        <br />
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td width="25%" class="cel-bg">العميل</td>
                    <td class="SaleClientName"></td>
                </tr>
                <tr>
                    <td width="25%" class="cel-bg">إجمالى الزيادة</td>
                    <td class="total"></td>
                </tr>
            </tbody>
        </table>
        <br />
        <table class="table table-bordered" id="lists">
            <thead>
                <tr>
                    <th class="cel-bg">السيارة</th>
                    <th class="cel-bg">مبلغ الزيادة</th>
                    <th class="cel-bg">التاريخ</th>
                    <th class="cel-bg">السبب</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <h5 class="DeleteReason1 red"></h5>
    </div>
    <script>
        var bindCtrls = function (d) {
            var cdata = commonManger.comp2json(d.d), jsn = cdata.list, total = 0;            
            var rows = $(jsn).map(function (i, v) {
                $('.SaleClientName').text(v.SaleClientName); // set client name
                total += parseFloat(v.ExtraAmount * 1);

                return '<tr><td>' + v.MakerNameEn + ' - ' + v.TypeNameEn + ' - ' + v.Year + '</td><td>' + numeral(v.ExtraAmount).format('0,0') + '</td><td>' + moment(v.AddDate).format('YYYY/MM/DD') + '</td><td>' + v.Notes + '</td></tr>';
            }).get();
            $('#lists tbody').append(rows);
            $('.total').text(total.toFixed());
        },
        getData = function () {
            var _id = commonManger.getQueryStrs().id,
                dto = { actionName: 'ClientExtras_One', value: _id };
            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', bindCtrls, commonManger.errorException);
        };
        getData();
    </script>
</body>
</html>
