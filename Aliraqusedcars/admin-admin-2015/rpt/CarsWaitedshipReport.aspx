<%@ Page Title=" شركة العراق - السيارات المنتظرة شحنها" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="CarsWaitedshipReport.aspx.cs" Inherits="CarsWaitedshipReport" %>

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
            <li><a href="rpt/CarsWaitedshipReport.aspx">عرض السيارات المنتظرة شحنها</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">السيارات المنتظرة شحنها</li>
        </ul>
        <!--.breadcrumb-->
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>السيارات المنتظرة شحنها</h1>
        </div>
        <div class="row-fluid">
            <!--PAGE CONTENT BEGINS HERE-->
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
                            <label class="control-label" id="Label2" for="ShipCompanyID"><span>الشاحن</span></label>
                            <div class="controls">
                                <span class="block input-icon input-icon-right">
                                    <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر الشاحن" id="ShipCompanyID">
                                        <option></option>
                                    </select>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <button type="submit" id="PrintAll" class="btn btn-success" title="عرض"><i class="icon icon-print"></i>عرض</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fulid">
            <span class="hr hr8 hr-double hr-dotted"></span>
        </div>
    </div>
    <script type="text/javascript" src="/Scripts/Templates/CarsWaitedshipReport.js?v=1.0"></script>
    <script>
        CarsWaitedshipReport.Init();
    </script>
</asp:Content>
