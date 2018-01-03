<%@ Page Title="كشف فواتير الشحن الغير مدفوعة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="ShipPaymentsReportPrint.aspx.cs" Inherits="ShipPaymentsReportPrint"
    EnableEventValidation="false" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="/Scripts/Templates/ShipPaymentsReportPrint.min.js?v=1.2"></script>
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="rpt/ShipPaymentsReport.aspx">فواتير الشحن الغير مدفوعة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">تنبيه فواتير الشحن الغير مدفوعة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تنبيه فواتير الشحن الغير مدفوعة</h1>
        </div>
        <div class="row-fluid">
            <div class="span10 offset1">
                <div class="pull-left no-border invoice-info">
                    <span class="invoice-info-label">التاريخ:</span> <span class="blue">
                        <%= DateTime.UtcNow.ToShortDateString() %></span>
                </div>
                <div class="pull-left hidden-480">
                    <a class="printme hidden-print" href="javascript:void(0);"><i class="bigger-150 icon-print"></i>
                    </a>
                </div>
                <table id="listItems" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>#
                            </th>
                            <th>رقم الحاوية
                            </th>
                            <th>تاريخ الفاتورة
                            </th>
                            <th>رقم الفاتورة 
                            </th>
                            <th>الشاحن
                            </th>
                            <th>تاريخ الوصول
                            </th>
                            <th>قيمة الفاتورة $
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div class="span12">
                    <p>العدد: <span class="no"></span> فاتورة</p>
                </div>
                <div class="hr hr8 hr-double hr-dotted"></div>
            </div>
        </div>
    </div>
    <script>
        ShipPaymentsReportPrint.Init();
    </script>
</asp:Content>
