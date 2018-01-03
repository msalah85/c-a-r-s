<%@ Page Title="طلبات السيارات للعرض بالموقع" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="cars-to-active-website.aspx.cs" Inherits="CarsToActiveWebsite" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">طلبات السيارات للعرض بالموقع</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>طلبات السيارات للعرض بالموقع</h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض طلبات السيارات للعرض بالموقع
                <asp:HyperLink runat="server" data-rel="tooltip" data-placement="top" data-original-title="عرض"
                    ID="btnAddNew" ToolTip="أضــف جديد" ImageUrl="/App_Themes/iraq/images/add-new.png"
                    CssClass="pull-left icon-animated-vertical btn-add" NavigateUrl="InvoicePayAdd.aspx" />
            </div>
            <table id="listItems" class="table table-bordered table-hover table-striped" width="100%">
                <thead>
                    <tr>
                        <th width="59" title="رقم السيارة">#</th>
                        <th>صورة</th>
                        <th width="20%">السيارة</th>
                        <th>اللوت</th>
                        <th>الشاصي</th>
                        <th>العميل</th>
                        <th>السعر بالموقع <sub class="text-warning">$</sub></th>
                        <th class="hidden-print" width="59" title="عرض بالموقع">عرض</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script src="/Scripts/App/cars-to-active-website.min.js?v=1.0"></script>
    <style>
        td img{height:25px!important;}
    </style>
</asp:Content>