<%@ Page Title="تقرير حصر حاويات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/shipper-containers.min.js?v=1.4"></script>
    <link href="/Scripts/select2/select2.min.css?v=1.7" rel="stylesheet" />
    <style>
        input.date_range_filter {
            width: 99px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="InvoicesShippView.aspx">فواتير الشحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ContainersToCome.aspx">حاويات بالطريق</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">تقرير حصر حاويات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير حصر حاويات</h1>
        </div>
        <div class="row-fluid">
            <form class="form-inline search-form" role="form">
                <input id="MainShipper" class="form-control select2" data-fn-name="MainShippers_GetNames" type="text" data-placeholder="بحث بالشاحن الرئيسي" />
                <input id="Shipper" name="Shipper" class="form-control select2" data-fn-name="Shippers_GetNames" type="text" data-placeholder="الشاحن" />
                <span class="filter_column filter_date_range">
                    <div class="input-prepend">
                        <span class="add-on"><i class="icon-calendar"></i></span>
                        <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" placeholder="الوصول من" />
                    </div>
                    <div class="input-prepend">
                        <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" placeholder="الوصول إلى" />
                    </div>
                </span>
                <input id="Distin" style="width: 228px" class="form-control select2" data-fn-name="Distinations_GetNames" type="text" data-placeholder="جهة الوصول" />
                <span class="filter_column filter_date_range">
                    <div class="input-prepend">
                        <span class="add-on"><i class="icon-calendar"></i></span>
                        <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="BolFrom" placeholder="الحجز من" />
                    </div>
                    <div class="input-prepend">
                        <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="BolTo" placeholder="الحجز إلى" />
                    </div>
                </span>
                <button type="submit" tabindex="2" id="btnSearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>بحـــث</button>
                <button type="reset" id="btnResetSearch" class="btn btn-small"><i class="icon-remove"></i>إعادة تعيين</button>
            </form>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                قائمة حصر حاويات 
            </div>
            <table id="listItems" class="table table-bordered" width="100%">
                <thead>
                    <tr>
                        <th>تاريخ الحجز</th>
                        <th>الشاحن</th>
                        <th>BOL</th>
                        <th>رقـم الحـاويـة</th>
                        <th>تاريخ الوصول</th>
                        <th>مكان الحاوية</th>
                        <th>شركة الملاحة</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script>CarsLateShipping.Init();</script>
    <script src="/Scripts/select2/select2.min.js?v=1.7"></script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=2.6"></script>
</asp:Content>