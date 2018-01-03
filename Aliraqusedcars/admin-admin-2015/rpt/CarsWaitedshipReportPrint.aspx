<%@ Page Title="عرض السيارات المنتظرة شحنها" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="CarsWaitedshipReportPrint.aspx.cs" Inherits="CarsWaitedshipReportPrint"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        #page-content {
            font-family: Tahoma,Verdana;
        }
        .control-group {
            margin-bottom: 10px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="rpt/CarsWaitedshipReport.aspx">اختر الشاحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">تقرير السيارات المنتظرة شحنها</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!--PAGE CONTENT BEGINS HERE-->
            <div class="space-6">
            </div>
            <div class="row-fluid">
                <div class="span10 offset1">
                    <div class="widget-box transparent invoice-box">
                        <div class="widget-header widget-header-large">
                            <h3 class="grey lighter pull-left position-relative">
                                <img id="divMainPic" visible="false" runat="server" alt="car" width="77" src="/public/cars/noimage.gif" />
                                عرض السيارات المنتظرة شحنها
                            </h3>
                            <div class="widget-toolbar no-border invoice-info">
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
                                    <div class="space">
                                    </div>
                                    <div id="masterForm">
                                        <div class="row-fluid">
                                            <table class="table table-striped table-bordered">
                                                <thead>
                                                    <tr id="ShipCompanyIDIDtr" class="hide">
                                                        <th width="25%">الشاحن
                                                        </th>
                                                        <th>
                                                            <label dir="ltr" class="required hasfunction" id="ShipCompanyID"></label>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <table id="listItems" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>رقم السيارة
                                                </th>
                                                <th>رقم اللوت
                                                </th>
                                                <th>الشاصية 
                                                </th>
                                                <th>تاريخ الشراء
                                                </th>
                                                <th>جهة الوصول 
                                                </th>
                                                <th>الشاحن 
                                                </th>
                                                <th>Title</th>
                                                <th>حجز للحاوية</th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div class="hr hr8 hr-double hr-dotted">
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12 well">
                                            نشكركم على ثقتكم فى شركة العراق لتجارة السيارات ، ونرجو أن تنال خدماتنا رضاكم.                                            
                                        </div>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12 pull-left">
                                            <a href="InvoiceShippingAdd.aspx?bol=1" id="bookingNow" class="btn btn-primary hidden hidden-print pull-left">+ انشاء رقم حجز الحاوية BOL</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--/row-->
            </div>
        </div>
        <input type="hidden" id="shipperId" value="0" />
    </div>
    <script type="text/javascript" src="/Scripts/Templates/CarsWaitedshipReportPrint.js?v=1.0"></script>
</asp:Content>
