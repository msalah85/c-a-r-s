<%@ Page Title="أرصدة الصندوق" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="CashFundsView.aspx.cs" Inherits="CashFundsView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/CashFunds.min.js?v=2.3"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">أرصــــدة الصندوق</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <div class="row-fluid hide visible-print" id="reportHeader"></div>
            <h1>أرصــــدة الصندوق
            </h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal" role="form">
                <div class="span8">
                    <div class="control-group">
                        <label class="control-label" for="From">بحث بالتاريخ</label>
                        <div class="controls">
                            <div class="span12">
                                <span class="filter_column filter_date_range">من 
                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                    إلى
                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker current-date form-control" id="To" /></span>
                                &nbsp;
                                <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-info btn-mini">
                                    <i class="icon-search"></i>
                                    بحـــث</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض أرصــــدة الصندوق 
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="50">#</th>
                        <th width="77">التاريخ</th>
                        <th class="hidden-480 hidden-phone">البيان</th>
                        <th width="120">إيداع</th>
                        <th width="120">سحـب</th>
                        <th width="120">الرصيد
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="hr hr8 hr-double hr-dotted visible-print">
        </div>
        <div class="row-fluid visible-print">
            <div class="span11">
                <span class="pull-left">الرصيـــد الحالى: <span class="extra"></span><strong class="Balance blue">0</strong><sub class="blue">درهم</sub>
                </span>
            </div>
        </div>
    </div>
    <script>pageManager.Init();</script>
    <br />
</asp:Content>