<%@ Page Title="عرض ملفات الجمارك للسيارت المصدرة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ReExportInvoicesList.aspx.cs" Inherits="admin_admin_2015_ReExportInvoicesList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/DefaultGridFilterManager.min.js?v=1.1"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="ReExportCarsList.aspx">اضافة جديد</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">عرض ملفات التأمينات جمركية</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>عرض ملفات التأمينات جمركية</h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض ملفات التأمينات جمركية
                <a data-toggle="tooltip" title="اضافة جديد" data-dismiss="modal" href="ReExportCarsList.aspx"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>كود الملف</th>
                        <th>التاريخ من</th>
                        <th>التاريخ إلى</th>
                        <th># السيارات</th>
                        <th>مبلغ الجمارك</th>
                        <th># البيانات</th>
                        <th>سند القبض</th>
                        <th>المبالغ المستردة</th>
                        <th>خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script src="/Scripts/app/reexport-invoiceslist.min.js?v=1.9"></script>
    <script>DefaultGridManager.Init();</script>
</asp:Content>