<%@ Page Title="سيارات تأخر موعد شحنها" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="CarsDataLateShippingView.aspx.cs" Inherits="CarsDataLateShippingView" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="InvoiceShippingAdd.aspx">اضف فاتورة شحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">سيارات تأخر موعد شحنها</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير سيارات تأخر موعد شحنها</h1>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                تقرير سيارات تأخر موعد شحنها
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="75px"># السيارة
                        </th>
                        <th>نوع السيارة
                        </th>
                        <th>الموديل
                        </th>
                        <th>الشاصي
                        </th>
                        <th>تاريخ الشراء
                        </th>
                        <th>سعر الشراء
                        </th>
                        <th>الشاحن
                        </th>
                        <th>رقم الباير
                        </th>
                        <th>الحالة</th>
                        <th width="55px">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <script src="/Scripts/Templates/cars-late-shipping.min.js?v=1.0"></script>
</asp:Content>