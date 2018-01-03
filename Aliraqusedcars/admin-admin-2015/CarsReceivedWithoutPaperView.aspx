<%@ Page Title="السيارت المستلمة بدون الورق" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="CarsReceivedWithoutPaperView.aspx.cs" Inherits="CarsReceivedWithoutPaperView" %>

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
                        <th width="80">رقم السيارة
                        </th>
                        <th width="80">صورة السيارة
                        </th>
                        <th>نوع السيارة
                        </th>
                        <th>رقم اللوت
                        </th>
                        <th>اسم العميل
                        </th>
                        <th width="80">مكان السيارة
                        </th>
                        <th>ورق السيارة</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <script type="text/javascript" src="/Scripts/Templates/CarsReceivedWithoutView.min.js?v=1.0"></script>
</asp:Content>