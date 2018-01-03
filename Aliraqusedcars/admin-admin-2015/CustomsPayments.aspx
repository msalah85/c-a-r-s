<%@ Page Title=" شركة العراق - حوالات فواتير التخليص" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="CustomsPayments.aspx.cs" Inherits="CustomsPayments" %>

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
    <script src="/Scripts/Templates/Customspaymentsmaster.min.js?v=2.0"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="InvoicesCustomsView.aspx">فواتير التخليص</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active title">حوالات فواتير التخليص</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1 class="title">حوالات فواتير التخليص</h1>
        </div>
        <div class="row-fulid">
            <form class="form-horizontal" role="form">
                <div class="control-group">
                    <label class="control-label" for="CustomsCompanyID"><span>المخلص</span></label>
                    <div class="controls">
                        <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر المخلص" id="CustomsCompanyID">
                            <option></option>
                        </select>
                        <button type="submit" tabindex="1" id="SearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>&nbsp;بحـــث</button>
                    </div>
                </div>
            </form>
            <div class="table-header title">
                عرض حوالات فواتير التخليص 
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>م
                        </th>
                        <th>التاريخ
                        </th>
                        <th>المخلص
                        </th>
                        <th>رقم سند الصرف
                        </th>
                        <th>المبلغ<sub>$</sub></th>
                        <th>المبلغ<sub>درهم</sub></th>
                        <th class="hidden-print" width="65px">طباعة</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="5"><span class="pull-left">الاجمالى</span></th>
                        <th class="col-bg"></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <script>Customspaymentsmaster.Init();</script>
</asp:Content>