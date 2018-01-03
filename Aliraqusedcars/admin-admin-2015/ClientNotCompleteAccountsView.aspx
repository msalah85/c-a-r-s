<%@ Page Title="تقرير تسوية حساب سيارات العملاء" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ClientNotCompleteAccountsView.aspx.cs" Inherits="ClientNotCompleteAccountsView" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="clients.aspx">العملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">السيارات المستلمة بدون الورق</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>السيارات المستلمة بدون الورق</h1>
        </div>
        <!--/.page-header-->
        <div class="row-fulid">
            <div class="table-header">
                عرض السيارات المستلمة بدون الورق
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>اسم العميل
                        </th>
                        <th>رصيد العميل
                        </th>
                        <th>اجمالى المطلوب</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <script src="/Scripts/Templates/ClientNotCompleteAccountsView.min.js?v=1.1"></script>
</asp:Content>