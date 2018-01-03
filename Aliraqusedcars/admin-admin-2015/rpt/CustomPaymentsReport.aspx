<%@ Page Title=" شركة العراق - كشف بفواتير التخليص الغير مدفوعة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/Templates/CustomPaymentsReport.min.js?v=1.1"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesCustomsView.aspx">فواتير التخليص</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">فواتير التخليص الغير مدفوعه</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تنبيه فواتير التخليص الغير مدفوعه</h1>
        </div>
        <div class="row-fluid">
            <a class="btn btn-small btn-info" href="InvoicesCustomsView.aspx">فواتير التخليص</a>

            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>شركة التخليص
                        </th>
                        <th>رقم الحاوية
                        </th>
                        <th>تاريخ الفاتورة
                        </th>
                        <th>رقم الفاتورة 
                        </th>
                        <th>المبلغ <sub>درهم</sub>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="100%">جاري التحميل...</td>
                    </tr>
                </tbody>
            </table>
            <div class="hr hr-double"></div>
            العدد: <span class="blue bolder list-count"></span>
        </div>
    </div>
    <script>
        CustomPaymentsReport.Init();
    </script>
</asp:Content>
