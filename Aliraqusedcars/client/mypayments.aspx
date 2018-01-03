<%@ Page Title="حوالاتي" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="mypayments.aspx.cs" Inherits="mypayments" %>

<asp:Content ID="Content10" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/datatable/buttons/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/media/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/responsive.bootstrap.min.css" rel="stylesheet" />
    <link href="/App_Themes/client/css/table-page.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="sub-menu">
        <ol class="breadcrumb">
            <li><a href="dashboard">منصة حسابي</a></li>
            <li><a href="requiredcars">سيارات مطلوبة</a></li>
            <li><a href="myfinishedcars">سيارات مسددة</a></li>
            <li><a href="mycarsforsale">سيارات معروضه بالموقع</a></li>
        </ol>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <h1 class="page-header">الحوالات</h1>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>م</th>
                        <th>رقم الايصال/الحوالة</th>
                        <th>التاريخ</th>
                        <th>شركة الصرافة</th>
                        <th>المبلغ <sub>$</sub></th>
                    </tr>
                </thead>
            </table>
            <div class="alert alert-info" style="text-align: left; margin-top: 10px;">
                إجمالى الحوالات: <strong class="debit text-green">0</strong><sub>$</sub>
            </div>
        </div>
    </div>
    <link href="/Content/css/user-profile.min.css" rel="stylesheet" />
    <script src="/Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="/Scripts/datatable/dataTables.bootstrap.min.js"></script>
    <script src="/Scripts/datatable/dataTables.responsive.min.js"></script>
    <script src="/Scripts/datatable/responsive.bootstrap.min.js"></script>
    <script src="/Scripts/datatable/buttons/dataTables.buttons.min.js"></script>
    <script src="/Scripts/datatable/buttons/buttons.flash.min.js"></script>
    <script src="/Scripts/datatable/buttons/buttons.html5.min.js"></script>
    <script src="/Scripts/datatable/buttons/jszip.min.js"></script>
    <script src="/Scripts/client/user-payments.min.js"></script>
</asp:Content>

