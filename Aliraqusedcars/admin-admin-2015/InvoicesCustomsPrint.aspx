<%@ Page Title="طباعة فاتورة التخليص" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="InvoicesCustomsPrint.aspx.cs" Inherits="InvoicesCustomsPrint" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesCustomsView.aspx">فواتير التخليص</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طبــاعة فاتورة التخليص</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="row-fluid">
                <div class="span10 offset1">
                    <div class="widget-box transparent invoice-box">
                        <div class="widget-header widget-header-large">
                            <h2 class="grey lighter pull-left position-relative">فاتورة تخليص جمركي
                            </h2>
                            <div class="widget-toolbar no-border invoice-info">
                                <span class="invoice-info-label">رقم الفاتورة:</span> <span class="red bolder" id="divInvoiceNo"></span>
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
                                <div class="row-fluid" id="masterForm">
                                    <div class="row-fluid">
                                        <div class="span6">
                                            <div class="row-fluid">
                                                <ul class="unstyled">
                                                    <li><i class="icon-caret-left green"></i>شركة التخلـيص:
                                                        <label style="display: inline;" id="CustomsCompanyNameAr"></label>
                                                    </li>
                                                    <li><i class="icon-caret-left green"></i>رقــــم الفـــاتورة:
                                                        <label style="display: inline;" id="InvoiceNo"></label>
                                                    </li>
                                                    <li><i class="icon-caret-left green"></i>تــاريخ الفـــاتورة:
                                                        <label style="display: inline;" id="InvoiceDate"></label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="span6">
                                            <div class="row-fluid">
                                                <ul class="unstyled">
                                                    <li><i class="icon-caret-left green"></i>رقـــــم الحـــــاوية:
                                                        <label style="display: inline;" id="ContainerNo"></label>
                                                    </li>
                                                    <li><i class="icon-caret-left green"></i>إجمالى الفاتورة <sub class="red">$</sub>:
                                                     <label class="red" style="display: inline; font-weight: bold;" id="TotalAmount"></label>
                                                    </li>
                                                    <li><i class="icon-caret-left green"></i>إجمالى الفاتورة <sub class="orange">درهم</sub>:
                                                     <label class="orange" style="display: inline; font-weight: bold;" id="TotalAmountDhs"></label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hr hr8 hr-double hr-dotted">
                                    </div>
                                    <h4>بيانات الحاوية</h4>
                                    <div class="row-fluid">
                                        <table id="listItems2" class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>النوع
                                                    </th>
                                                    <th>الموديل
                                                    </th>
                                                    <th>السنة
                                                    </th>
                                                    <th>اللوت
                                                    </th>
                                                    <th>سعر الشراء
                                                    </th>
                                                    <th>مبلغ الجمرك
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="row-fluid">
                                        <h5 class="pull-left">إجمالى الجمارك : <span class="red" id="TotalCustoms"></span>$
                                        </h5>
                                    </div>
                                    <h4>بيانات المصروفات</h4>
                                    <div class="row-fluid">
                                        <table id="listItems" class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th width="30%">نوع المصروف
                                                    </th>
                                                    <th>المصروف على السيارة
                                                    </th>
                                                    <th>عدد السيارات
                                                    </th>
                                                    <th>المصروف على الفاتورة
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="row-fluid">
                                        <h5 class="pull-left">إجمالى المصروفات : <span class="red" id="TotalExpenses"></span>$</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            var urlIds = commonManger.getUrlVars()["id"];
            $('#divInvoiceNo').text(urlIds);
            if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
                var functionName = "CustomInvoices_SelectPrint";
                DTO = { 'actionName': functionName, 'value': urlIds };
                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
                  function (data) {
                      var selectList = JSON.parse(data.d);
                      $.each(selectList, function (index, Basicdata) {
                          if (Basicdata.tbl_name == 0) {
                              commonManger.getDataForUpdate(Basicdata, "masterForm");
                          }
                      });
                      // fill child table // change grid fields
                      var valuesids = [];
                      valuesids.push('ExpenseTypeNameAr', 'CustomsExpenseValue', 'CarsNo', 'TotalExpensesValue');
                      // get data of grid 1
                      var expensesList = $.grep(selectList, function (n, i) {
                          return n.tbl_name == "1";
                      });
                      // show first grid
                      fillitemsDataTable(expensesList, valuesids, "listItems", "TotalExpenses", 3);

                      // fill container cars grid 2
                      valuesids = ['MakerNameEn', 'TypeNameEn', 'Year', 'LotNo', 'PayPrice', 'CustomsOnCar'];
                      // get data of grid 2
                      var carsList = $.grep(selectList, function (n, i) {
                          return n.tbl_name == "2";
                      });
                      // show grid 2
                      fillitemsDataTable(carsList, valuesids, "listItems2", "TotalCustoms", 5);


                      $('label[id*=Amount]').text(function () {
                          return numeral($(this).text()).format('0,0');
                      });

                      $('label[id^=InvoiceDate]').text(function () {
                          return commonManger.formatJSONDate($(this).text());
                      });

                  }, commonManger.errorException);
            }
            // show invoice details grid.
            var fillitemsDataTable = function (gridData, valuesids, gridId, divTotalAmount, totalCalcIndex) {
                var oTable = $('#' + gridId).DataTable({
                    "sDom": "<'row'>t<'row'>",
                    bDestroy: true,
                    bLengthChange: false,
                    bFilter: false,
                    searching: false,
                    retrieve: true,
                    paging: false
                });
                var _total = 0;
                $.each(gridData, function (index, Basicdata) {
                    var Elements = [];
                    for (var i = 0; i < valuesids.length; i++) {
                        Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                        if (i == totalCalcIndex) { // sum expens column
                            _total += parseFloat(Basicdata[valuesids[i]]);
                            $('#' + divTotalAmount).text(_total.toFixed(2)); // show invoice total by sum all of expenses & customs.
                        }
                    }
                    oTable.row.add(Elements);
                });
            };
        </script>
        <style>
            .table thead:first-child tr:first-child th, .cel-bg {
                background-color: #f1eee9 !important;
            }

            @media print {
                #masterForm .span6 {
                    width: 50% !important;
                    float: right;
                }
            }

            @media (max-width: 600px) {
                #masterForm .span6 {
                    width: 50% !important;
                    float: right;
                }
            }
        </style>
</asp:Content>
