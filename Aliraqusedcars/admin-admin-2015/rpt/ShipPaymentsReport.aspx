<%@ Page Title=" شركة العراق - كشف بفواتير الشحن المدفوعة/المدفوعة/الغير مدفوعة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ShipPaymentsReport.aspx.cs" Inherits="ShipPaymentsReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .chosen-container {
            width: 238px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="rpt/ShipPaymentsReport.aspx">عرض كشف بفواتير الشحن المدفوعة/الغير مدفوعة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">كشف بفواتير الشحن المدفوعة/الغير مدفوعة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>كشف بفواتير الشحن المدفوعة/الغير مدفوعة</h1>
        </div>

        <div class="row-fluid">
            <asp:Panel class="alert alert-block" ID="divError" runat="server" Visible="false">
                <button type="button" class="close" data-dismiss="alert">
                    <i class="icon-remove"></i>
                </button>
                <strong>
                    <asp:Label ID="lblError" runat="server" /></strong>
            </asp:Panel>
            <div class="form-horizontal">
                <div id="masterForm">
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="fromdate"><span>من تاريخ  </span></label>
                            <div class="controls">
                                <input type="text" dir="ltr" class="date-picker required vaild"
                                    data-date-format="dd/mm/yyyy" id="fromdate" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="PaymentsDates"><span>من تاريخ  </span></label>
                            <div class="controls">
                                <input type="text" dir="ltr" class="date-picker required vaild"
                                    data-date-format="dd/mm/yyyy" id="todate" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ShipCompanyID"><span>شركة الشحن</span></label>
                            <div class="controls">
                                <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر شركة الشحن" id="ShipCompanyID">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="PaymentFlag"><span>المدفوعة/غير المدفوعة</span></label>
                            <div class="controls">
                                <span class="block input-icon input-icon-right">
                                    <label>
                                        <input name="switch-field-1" class="ace ace-switch ace-switch-6 " type="checkbox" id="PaymentFlag" />
                                        <span class="lbl"></span>
                                    </label>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fulid">
            <span class="hr hr8 hr-double hr-dotted"></span>
            <button type="submit" id="PrintAll" class="btn btn-success pull-left" title="حفـــظ"><i class="icon icon-print"></i>طباعة مشتريات السيارات المدفوعة/الغير مدفوعة</button>
        </div>
    </div>
    <script type="text/javascript" src="/Scripts/Templates/ShipPaymentsReport.js?v=1.0"></script>
    <script>
        ShipPaymentsReport.Init();
    </script>
</asp:Content>
