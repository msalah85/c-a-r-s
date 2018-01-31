<%@ Page Title="سياراتي قيد الشحن" Language="C#" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="ClientShippingCars.aspx.cs" Inherits="client_ClientShippingCars" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/datatable/media/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/responsive.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/buttons/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/App_Themes/client/css/table-page.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="sub-menu">
        <ol class="breadcrumb">
            <li><a href="dashboard">منصة حسابي</a></li>
            <li><a href="requiredcars">سيارات مطلوبه</a></li>
            <li><a href="myfinishedcars">سيارات مسددة</a></li>
        </ol>
    </div>
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <h1 class="page-header">السيارات قيد الشحن</h1>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="60">#رقم</th>
                        <th width="75">صورة</th>
                        <th width="20%">السيارة</th>
                        <th>سعر البيع</th>
                        <th>تاريخ الشراء</th>
                        <th>تاريخ الوصول</th>
                        <th>موقع الشحن</th>
                        <th width="30" class="hidden-print" title="عرض السيارة بالموقع">عرض</th>
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
    <script src="/Scripts/moment.min.js"></script>
    <script src="/Scripts/numeral.min.js"></script>
    <script src="/Scripts/jquery.gritter.min.js"></script>
    <script src="/Scripts/App/Common.min.js"></script>
    <script src="/Scripts/client/ClientShippingCarsManager.js?v=1.0"></script>
</asp:Content>
