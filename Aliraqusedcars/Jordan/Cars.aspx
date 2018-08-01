<%@ Page Title="جميع السيارات" Language="C#" MasterPageFile="~/Jordan/Site.master" AutoEventWireup="true" CodeFile="Cars.aspx.cs" Inherits="Jordan_Cars" %>

<asp:Content ID="Content1" runat="Server" ContentPlaceHolderID="head">
    <link href="/Scripts/select2/select2.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="container-padding" id="page-contents">
        <div class="sub-menu">
            <ol class="breadcrumb">
                <li><a href="home">الرئيسية</a></li>
                <li><a href="Clients">العملاء</a></li>
                <li><a href="Containers">الحاويات</a></li>
            </ol>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h1 class="page-header">قائمة السيارات
                    <span class="pull-left">
                        <a href="javascript:void(0);" class="btn btn-info clickable filter" data-toggle="tooltip" title="فتح/إخفاء مربع البحث المتقدم" data-container="body">
                            <i class="glyphicon glyphicon-filter"></i>
                            <span class="small">بحـــث</span>
                        </a>
                    </span>
                </h1>
            </div>
            <div class="col-sm-12" id="search-panel" style="display: none">
                <div class="row-fluid">
                    <div class="form-inline advanced-search">
                        <div class="form-group">
                            <label for="ClientID">بحث بالعميل</label>
                            <input type="text" id="ClientID" name="ClientID" dir="rtl" class="select2" data-fn-name="Clients_SelectNames3" />
                        </div>
                        <div class="form-group">
                            <label for="Buyer">رقم الباير</label>
                            <input type="text" id="Buyer" name="Buyer" dir="rtl" class="select2" data-fn-name="Buyers_GetNames" />
                        </div>
                        <div class="form-group">
                            <label for="Arrived">وصول السيارة</label>
                            <select class="form-control" id="Arrived">
                                <option value=""></option>
                                <option value="0">واصلة</option>
                                <option value="1">غير واصلة</option>
                            </select>
                        </div>
                        <!--<div class="form-group"><label for="From">التاريخ</label>
                            من<input type="text" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                            إلى<input type="text" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" />
                        </div>-->
                        <div class="form-group">
                            <label for="ChassisN">الشاصي</label>
                            <input class="form-control" type="text" id="ChassisN" />
                        </div>
                        <button tabindex="4" id="btnSearchAll" class="btn btn-info btn-mini">
                            <i class="fa fa-search"></i>
                            بحـــث</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            <th width="59" title="رقم السيارة">#</th>
                            <th width="33">صورة</th>
                            <th>الباير</th>
                            <th width="100">التاريخ</th>
                            <th>اللوت</th>
                            <th width="20%">السيارة</th>
                            <th>الشاصي</th>
                            <th>الشاحن</th>
                            <th width="120px">سعر الشراء <sub class="text-warning">$</sub></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="100%">جاري تحميل البيانات...</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="8"><span class="pull-left">الإجمالى$</span></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <div class="alert alert-block alert-info">
                    <p>إجمالى جميع النتائج: <strong class="sum-total-all"></strong></p>
                </div>
                <div class="clearfix">&nbsp;</div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentScripts" runat="Server">
    <script src="/Scripts/jordan/InvoicePayView.js?v=0.1"></script>
    <script src="/Scripts/select2/select2.min.js"></script>
    <script src="/Scripts/select2/select2-optinal.js"></script>
</asp:Content>
