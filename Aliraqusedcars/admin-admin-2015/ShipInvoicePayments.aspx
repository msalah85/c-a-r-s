<%@ Page Title=" شركة العراق - حوالة فواتير الشحن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ShipInvoicePayments.aspx.cs" Inherits="ShipInvoicePayments" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
        .table thead th, .col-bg {
            background-color: #f1eee9;
        }
        @media print {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
            }
            .table thead th, .col-bg {
                background-color: #f1eee9 !important;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="ShipInvoicePaymentsDetails.aspx">حوالة جديدة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active title">حوالات فواتير الشحن</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1 class="title">حوالات فواتير الشحن</h1>
        </div>
        <div class="row-fulid">
            <div class="form-horizontal">
                <div class="control-group">
                    <label class="control-label" id="Label1" for="ShipCompanyID">بحث بالشاحن</label>
                    <div class="controls">
                        <div class="span6">
                            <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر الشاحن" id="ShipCompanyID">
                                <option></option>
                            </select>
                            <button type="submit" tabindex="1" id="btnSearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>بحـــث</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-header">
                <span class="title">عرض حوالات فواتير الشحن</span>
                <a data-toggle="tooltip" title="اضافة جديد" data-dismiss="modal" href="ShipInvoicePaymentsDetails.aspx"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="90"># الحوالة
                        </th>
                        <th>التاريخ
                        </th>
                        <th>مكتب الصرافة
                        </th>
                        <th>الشاحن
                        </th>
                        <th>المبلغ
                        </th>
                        <th width="60" class="hidden-print">خيارات
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script src="/Scripts/Templates/ShipInvoicePayments.js?v=2.1"></script>
</asp:Content>