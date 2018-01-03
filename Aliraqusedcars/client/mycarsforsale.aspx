<%@ Page Title="سياراتي المعروضة للبيع" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="mycarsforsale.aspx.cs" Inherits="mycarsforsale" %>

<asp:Content ID="Content0" ContentPlaceHolderID="head" runat="Server">
    <link href="/Content/css/user-profile.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/media/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/responsive.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/buttons/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/App_Themes/client/css/table-page.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="sub-menu">
        <ol class="breadcrumb">
            <li><a href="dashboard">منصة حسابي</a></li>
            <li><a href="requiredcars">سيارات مطلوبة</a></li>
            <li><a href="myfinishedcars">سيارات مسدده</a></li>
        </ol>
    </div>
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <h1 class="page-header">سياراتي المعروضة فى الموقع للبيع</h1>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="60">#رقم</th>
                        <th width="75">الصورة</th>
                        <th width="20%">نوع السيارة</th>
                        <th>الشاصي</th>
                        <th>اللوت</th>
                        <th>الحالة</th>
                        <th>اللون</th>
                        <th>السعر</th>
                        <th width="80">إلغاء</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script src="/Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="/Scripts/datatable/dataTables.bootstrap.min.js"></script>
    <script src="/Scripts/datatable/dataTables.responsive.min.js"></script>
    <script src="/Scripts/datatable/responsive.bootstrap.min.js"></script>
    <script src="/Scripts/datatable/buttons/dataTables.buttons.min.js"></script>
    <script src="/Scripts/datatable/buttons/buttons.flash.min.js"></script>
    <script src="/Scripts/datatable/buttons/buttons.html5.min.js"></script>
    <script src="/Scripts/datatable/buttons/jszip.min.js"></script>
    <script src="/Scripts/client/user-cars-4sale.min.js"></script>
</asp:Content>
