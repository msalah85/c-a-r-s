<%@ Page Title="طباعة فاتورة قطع الغيار" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="PartsPrint.aspx.cs" Inherits="admin_admin_2015_PartsPrint" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .widget-box.transparent > .widget-header-large {
            min-height: 50px;
            padding-bottom: 0;
        }

        #itemsList thead:first-child tr {
            background: #f2f2f2;
            background-color: #f3f3f3;
            background-image: -moz-linear-gradient(top,#f8f8f8,#ececec);
            background-image: -webkit-gradient(linear,0 0,0 100%,from(#f8f8f8),to(#ececec));
            background-image: -webkit-linear-gradient(top,#f8f8f8,#ececec);
            background-image: -o-linear-gradient(top,#f8f8f8,#ececec);
            background-image: linear-gradient(to bottom,#f8f8f8,#ececec);
            background-repeat: repeat-x;
        }@media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                font-size: 14px;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><a href="PartsAdd.aspx">فاتورة قطع غيار جديدة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="Partsview.aspx">عرض فواتير قطع الغيار</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طبــاعة فاتورة قطع الغيار</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="widget-box transparent invoice-box">
                    <div class="widget-header widget-header-large">
                        <h3 class="grey lighter pull-left position-relative">فاتورة قطع الغيار
                        </h3>
                        <div class="widget-toolbar no-border invoice-info">
                            <span class="invoice-info-label">مسلسل:</span> <span class="red"
                                id="ID"></span>
                            <br />
                            <span class="invoice-info-label">التاريخ:</span> <span class="blue">
                                <%= DateTime.UtcNow.ToShortDateString() %></span>
                        </div>
                        <div class="widget-toolbar hidden-480">
                            <a class="printme hidden-print" href="javascript:void(0);"><i class="icon-print"></i>
                            </a>
                            <a class="hidden-print edit-me hidden" title="تعديل الفاتورة" href="PartsAdd.aspx?id=0"><i class="icon-edit"></i></a>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main padding-24">
                            <div class="row-fluid">
                                <div class="row-fluid">
                                    <div class="span6">
                                        <div class="row-fluid">
                                            <table class="table table-bordered">
                                                <tr>
                                                    <td class="cel-bg">العميل</td>
                                                    <td><a href="ClientCars.aspx?id=0" id="ClientName"></a></td>
                                                </tr>
                                                <tr>
                                                    <td width="30%" class="cel-bg">التاريخ</td>
                                                    <td id="AddDate"></td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">رقم الفاتورة</td>
                                                    <td id="InvoiceNo"></td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">التفاصيل</td>
                                                    <td id="Notes"></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="span6">
                                        <div class="row-fluid">
                                            <table class="table table-bordered">
                                                <tr>
                                                    <td class="cel-bg">إجمالى الفاتورة <sub>$</sub></td>
                                                    <td class="TotalAmount"></td>
                                                </tr>
                                                <tr>
                                                    <td class="cel-bg">مبلغ الخصم <sub>$</sub></td>
                                                    <td id="Discount"></td>
                                                </tr>
                                                <tr>
                                                    <td width="30%" class="cel-bg">صافي الفاتورة <sub>$</sub></td>
                                                    <td id="NetAmount"></td>
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
                                                <th>م</th>
                                                <th>القطعه / البيان
                                                </th>
                                                <th>العدد
                                                </th>
                                                <th>سعر القطعة <sub>$</sub>
                                                </th>
                                                <th>الاجمالى <sub>$</sub> </th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="hr hr8 hr-double hr-dotted">
                                </div>
                                <div class="row-fluid">
                                    <div class="span4 pull-right">
                                        <h4 class="pull-right">إجمالى الفاتورة : <span class="red TotalAmount"></span><sub>$</sub>
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
        // get data to print
        var id = commonManger.getQueryStrs()['id'], functionName = "PartsInvoices_SelectOne", DTO = { 'actionName': functionName, 'value': ((id) ? id : 0) }, $details = $('#itemsList tbody');
        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
          function (data) {
              var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;
              if (jsn) {
                  $('#ID').text(jsn.ID);
                  $('#ClientName').text(jsn.full_name).attr('href', 'ClientCars.aspx?id=' + jsn.ClientID);
                  $('#InvoiceNo').text(jsn.InvoiceNo);
                  $('#AddDate').text(moment(jsn.AddDate).format('YYYY/MM/DD'));
                  $('#Notes').text(jsn.Notes);
                  $('.TotalAmount').text(numeral(jsn.TotalAmount).format('0,0.00'));
                  $('#Discount').text(numeral(jsn.Discount).format('0,0.00'));
                  $('#NetAmount').text(numeral(jsn.NetAmount).format('0,0.00'));
                  if (jsn.PayAmount <= 0)
                      $('.edit-me').removeClass('hidden').attr('href', 'PartsAdd.aspx?id=' + jsn.ID);
              }
              if (jsn1) {
                  $(jsn1).each(function (i, item) {
                      $details.append('<tr><td>' + (i + 1) + '</td><td>' + item.PartName + '</td><td>' + item.Quantity + '</td><td>' + numeral(item.Price).format('0,0.00') + '</td><td>' + numeral(item.SubTotal).format('0,0.00') + '</td></tr>');
                  });
              }
          }, commonManger.errorException);
    </script>
</asp:Content>