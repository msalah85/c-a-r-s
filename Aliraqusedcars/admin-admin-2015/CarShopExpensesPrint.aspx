<%@ Page Title="حوالة مصروف ورشة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="CarShopExpensesPrint.aspx.cs" Inherits="CarShopExpensesPrint"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a class="linkList" href="CarShopExpenses.aspx">عرض مصروفات الورشة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طباعة مصروف الورشة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="space-6">
            </div>
            <div class="row-fluid">
                <div class="span10 offset1">
                    <div class="widget-box transparent invoice-box">
                        <div class="widget-header widget-header-large">
                            <h3 class="grey lighter pull-left position-relative">مصروف ورشة على السيارة
                            </h3>
                            <div class="widget-toolbar no-border invoice-info">
                                <span class="invoice-info-label"># السيارة:</span>
                                <label class="ID"></label>
                                <br />
                                <span class="invoice-info-label">التاريخ:</span> <span class="blue">
                                    <%= DateTime.UtcNow.ToShortDateString() %></span>
                            </div>
                            <div class="widget-toolbar hidden-480">
                                <a class="printme hidden-print" href="javascript:void(0);"><i class="icon-print"></i>
                                </a>
                            </div>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main padding-24">
                                <div class="row-fluid">
                                    <div class="row-fluid">
                                        <div class="span12">
                                            <div class="row-fluid">
                                                <ul class="unstyled spaced">
                                                    <li><i class="icon-caret-left blue"></i>
                                                        رقم السيارة: 
                                                        <span class="ID"></span>
                                                    </li>
                                                    <li><i class="icon-caret-left blue"></i>العميل:                                                         
                                                        <span class="client"></span>
                                                    </li>
                                                    <li><i class="icon-caret-left blue"></i>موديل السيارة
                                                        <span class="model"></span>
                                                    </li>
                                                    <li class="divider"></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="space">
                                    </div>
                                    <table id="listItems" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>المادة
                                                </th>
                                                <th>سعر الوحدة
                                                </th>
                                                <th>العدد
                                                </th>
                                                <th>إجمالى
                                                </th>
                                                <th>التفاصيل
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <div class="hr hr8 hr-double hr-dotted">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/Templates/CarShopExpensesPrint.min.js?v=1.1"></script>
    <script>
        CarShopExpensesPrint.Init();
    </script>
</asp:Content>
