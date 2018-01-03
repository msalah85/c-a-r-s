<%@ Page Title="الخصومات على السيارات" Language="C#" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="ClientDiscounts.aspx.cs" Inherits="client_ClientDiscounts" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link href="/Scripts/datatable/buttons/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/media/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/responsive.bootstrap.min.css" rel="stylesheet" />
    <link href="/App_Themes/client/css/table-page.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" Runat="Server">
    <div class="sub-menu">
        <ol class="breadcrumb">
            <li><a href="dashboard">منصة حسابي</a></li>
            <li><a href="requiredcars">سيارات مطلوبة</a></li>
            <li><a href="myfinishedcars">سيارات مسددة</a></li>
            <li><a href="ClientExtras">الزيادات</a></li>
            <li><a href="ClientMoneyBack">المرتجعات</a></li>
        </ol>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <h1 class="page-header">الخصومات على السيارات</h1>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th data-rel="tooltip" title="مسلسل">#</th>
                        <th>سيارة رقم</th>
                        <th>التاريخ</th>
                        <th>السبب</th>
                        <th>المبلغ <sub>$</sub></th>
                    </tr>                    
                </thead>
                <tfoot>
                    <tr>
                        <td colspan="4"><strong class="pull-left">الإجمالى</strong></td>
                        <td><strong class="total">0</strong>
                            <sub>$</sub></td>
                    </tr>
                </tfoot>
            </table>
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
    <script src="/Scripts/jquery.gritter.min.js"></script>
    <script src="/Scripts/moment.js"></script>
    <script src="/Scripts/App/Common.min.js"></script>
    <script src="/Scripts/client/ClientDiscountsManager.min.js"></script>
</asp:Content>

