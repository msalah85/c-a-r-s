<%@ Page Title="ادارة السلف للموظف" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="Advances.aspx.cs" Inherits="admin_admin_2015_hr_Advances" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .cel-bg {
            background-color: #f1eee9 !important;
        }
    </style>
    <script src="/Scripts/hr/gridManager.min.js?v=1.5"></script>
    <script src="/Scripts/hr/advances.min.js?v=1.8"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="hr/AdvanceOutsideMemebers.aspx">جهات السلف</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="usersview.aspx">الموظفين</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">القروض</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>القروض</h1>
        </div>
        <div class="row-fluid">
            <div class="span6 offset3">
                <table class="table table-bordered">
                    <col class="cel-bg" />
                    <tr>
                        <td width="15%">الاسم</td>
                        <td>
                            <span class="username"></span>
                            <a class="btn btn-link pull-left receipt-out" href="#">
                                <i class="icon-arrow-up bigger-110 pink"></i>
                                سند صرف
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>الرصيد</td>
                        <td>
                            <strong class="balance red currency">0</strong> <sub>درهم</sub>
                            <a class="btn btn-link pull-left receipt-in" href="#">
                                <i class="icon-arrow-down bigger-110 green"></i>
                                سند قبض
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12 widget-container-span">
                <div class="widget-box widget-box-tabs" id="advances-widget-box">
                    <div class="widget-header">
                        <div class="widget-toolbar no-border">
                            <ul class="nav nav-tabs" id="advancesTabs">
                                <li class="active">
                                    <a data-toggle="tab" data-id="0" data-action="reload" href="advances.aspx#Inadvances"><i class="icon-arrow-up pink"></i>
                                        القروض - صرف</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" data-id="1" data-action="reload" href="advances.aspx#Inadvances"><i class="icon-arrow-down green"></i>
                                        السدادات - قبض</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main no-padding">
                            <div class="tab-content no-padding">
                                <div id="Inadvances" class="tab-pane in active">
                                    <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                                        <thead>
                                            <tr>
                                                <th width="90">التاريخ</th>
                                                <th>طريقة الدفع</th>
                                                <th>ملاحظات</th>
                                                <th width="110">المبلغ <sub>درهم</sub></th>
                                                <th width="70" class="hidden-print">خيارات</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th class="total"></th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>pageManager.Init();</script>
</asp:Content>
