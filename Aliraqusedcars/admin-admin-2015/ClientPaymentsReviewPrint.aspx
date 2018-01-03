<%@ Page Title="طباعة إيداع بنكي" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .widget-box.transparent > .widget-header-large {
            min-height: 50px;
            padding-bottom: 0;
        }

        .table th, .col-bg {
            background-color: #f1eee9 !important;
        }

        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><a href="ClientPaymentsReview.aspx">ترحيل سندات القبض</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ClientPaymentsReviewList.aspx">عرض الإيداعات البنكية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طبــاعة إيداع بنكي</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="widget-box transparent invoice-box">
                    <div class="widget-header widget-header-large">
                        <h3 class="grey lighter pull-left position-relative">
                            <img id="divMainPic" visible="false" runat="server" alt="car" width="77" src="/public/cars/noimage.gif" />
                            إيداع بنكي
                        </h3>
                        <div class="widget-toolbar no-border invoice-info">
                            <span class="invoice-info-label">#:</span> <span class="red"
                                id="ReviewPaymentID"></span>
                            <br />
                            <span class="invoice-info-label">التاريخ:</span> <span class="blue">
                                <%= DateTime.UtcNow.ToShortDateString() %></span>
                        </div>
                        <div class="widget-toolbar hidden-480">
                            <a class="printme hidden-print" href="javascript:void(0);"><i class="icon-print bigger-150"></i>
                            </a>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main padding-24">
                            <div class="row-fluid">
                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="row-fluid">
                                            <table class="table table-bordered">
                                                <col class="col-bg" />
                                                <tr>
                                                    <td>رقم</td>
                                                    <td id="ReviewPaymentID2"></td>
                                                </tr>
                                                <tr>
                                                    <td>التاريخ</td>
                                                    <td id="PaymentDate"></td>
                                                </tr>
                                                <tr>
                                                    <td width="30%">رقم الايداع/الشيك</td>
                                                    <td id="CheckNo"></td>
                                                </tr>
                                                <tr>
                                                    <td>البيان</td>
                                                    <td id="Notes"></td>
                                                </tr>
                                                <tr>
                                                    <td>المبلغ <sub>$</sub></td>
                                                    <td id="Amount"></td>
                                                </tr>
                                                <tr>
                                                    <td>المبلغ <sub>درهم</sub></td>
                                                    <td id="AmountDhs"></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="space">
                                </div>
                                <div class="row-fluid">
                                    <table class="table table-striped table-bordered" id="itemsList">
                                        <thead>
                                            <tr>
                                                <th>رقم السند</th>
                                                <th>من</th>
                                                <th>التاريخ</th>
                                                <th>المبلغ <sub>$</sub></th>
                                                <th>المبلغ <sub>درهم</sub></th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="hr hr8 hr-double hr-dotted">
                                </div>
                                <div class="row-fluid">
                                    <div class="span4 pull-right">
                                        <h4 class="pull-right">إجمالى الإيداع : <span class="red" id="Total"></span><sub>درهم</sub>
                                        </h4>
                                    </div>
                                    <div class="span9 pull-left">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        var
            id = commonManger.getQueryStrs()['id'],
            functionName = "ClientPaymentsReview_Print",
            DTO = { 'actionName': functionName, 'value': id },
            bindReport = function (data) {
                var jsnData = commonManger.comp2json(data.d),
                    jsn = jsnData.list, jsn1 = jsnData.list1;
                
                if (jsn) {
                    $.each(jsn, function (i, v) {
                        $('#' + i).text(v);
                    });

                    $('#Total,#AmountDhs').text(numeral(jsn.AmountDhs).format('0,0.00'));
                    $('#PaymentDate').text(moment(jsn.PaymentDate).format('DD/MM/YYYY'));
                    $('#ReviewPaymentID2').text(jsn.ReviewPaymentID);
                }

                if (jsn1) {

                    var _totalAmount = 0,
                        rows = $(jsn1).map(function (i, v) {
                            _totalAmount += (v.Amount * 1);

                            return $('<tr><td><a title="تفاصيل سند القبض" href="ReceiptVoucherPrint.aspx?id=' + v.ReceiptID + '">' + v.ReceiptID + '</a></td><td>' + v.FromName + '</td><td>' + moment(jsn.AddDate).format('DD/MM/YYYY') + '</td><td>' + numeral(v.Amount).format('0,0.0') + '</td><td>' + numeral(v.AmountDhs).format('0,0.0') + '</td></tr>');
                        }).get();

                    $('#itemsList tbody').append(rows);
                    $('#Amount').text(numeral(_totalAmount).format('0,0.00'));
                }
            };


        //
        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
            bindReport, commonManger.errorException);
    </script>
</asp:Content>
