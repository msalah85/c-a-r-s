<%@ Page Title="نتيجة بحث إيداعات العملاء" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="SearchPayments.aspx.cs" Inherits="SearchPayments" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">نتيجة بحث إيداعات العملاء</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>نتيجة بحث إيداعات العملاء</h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض نتيجة بحث إيداعات العملاء
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th width="30%">إسم العميل
                        </th>
                        <th>تاريخ الدفع
                        </th>
                        <th>شركة الصرافة
                        </th>
                        <th>رقم الايصال
                        </th>
                        <th>المبلغ <sub>$</sub>
                        </th>
                        <th width="60">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script type="text/javascript" src="/Scripts/Templates/searchPayments.min.js"></script>
    <script type="text/javascript">
        ClientsPayments.Init();
    </script>
</asp:Content>
