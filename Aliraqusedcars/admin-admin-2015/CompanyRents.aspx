<%@ Page Title="عرض إيجارات الشركة" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="CompanyRents.aspx.cs" Inherits="admin_admin_2015_CompanyRents" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/companyRenstsList.min.js?v=4.1"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-plus"></i><a href="CompanyRentsAdd.aspx">اضافة عقد إيجار</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">إيجارات الشركة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير إيجارات الشركة
            </h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض شيكات إيجارات الشركة
                <asp:HyperLink runat="server" data-rel="tooltip" data-placement="top" data-original-title="عرض"
                    ID="btnAddNew" ToolTip="أضــف جديد" ImageUrl="/App_Themes/iraq/images/add-new.png"
                    CssClass="pull-left icon-animated-vertical btn-add" NavigateUrl="CompanyRentsAdd.aspx" />
            </div>
            <table id="listItems" class="table table-bordered table-hover table-striped" width="100%">
                <thead>
                    <tr>
                        <th width="40">السنة</th>
                        <th width="110">تاريخ التحصيل</th>
                        <th>المبلغ <sub>درهم</sub></th>
                        <th>ملاحظات</th>
                        <th>تم الصرف</th>
                        <th class="hidden-print" width="59">خيارات</th>
                    </tr>
                </thead>
            </table>
            <div class="clearfix">&nbsp;</div>
        </div>
    </div>
    <script>pageManager.Init();</script>
</asp:Content>
