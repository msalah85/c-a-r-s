<%@ Page Title=" عــرض معدل أسعار الشحن الفعلية " Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoicesShippRatesView.aspx.cs" Inherits="InvoicesShippRatesView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/InvoicesShippRatesView.min.js?v=1.1" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">معدل أسعار الشحن الفعلية</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير معدل أسعار الشحن الفعلية
            </h1>
        </div>
        <div class="row-fluid">
            <asp:Panel class="alert alert-block" ID="divError" runat="server" Visible="false">
                <button type="button" class="close" data-dismiss="alert">
                    <i class="icon-remove"></i>
                </button>
                <strong>
                    <asp:Label ID="lblError" runat="server" /></strong>
            </asp:Panel>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="Shipper"><span>بحث بالشاحن</span></label>
                        <div class="controls">
                            <div class="span12">
                                <select class="form-control chzn-select chosen-rtl" data-placeholder="اختــر" id="Shipper">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Distination"><span>جهو الوصول</span></label>
                        <div class="controls">
                            <div class="span12">
                                <select class="form-control" data-placeholder="اختــر" id="Distination">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="From"><span>التاريخ</span></label>
                        <div class="controls">
                            <div class="span12">
                                <span class="filter_column filter_date_range">من 
                                    <input type="text" dir="ltr" data-date-format="mm/dd/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                    إلى
                                    <input type="text" dir="ltr" data-date-format="mm/dd/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <div class="span12">
                                <a tabindex="4" href="javascript:void(0);" id="btnSearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>بحــــــــــث</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header hidden-print">
                عـــــــرض معدل أسعار الشحن الفعلية
            </div>
            <table id="listItems" class="table table-bordered table-striped" width="100%">
                <thead>
                    <tr>
                        <th># الحاوية</th>
                        <th>التحميل<sub>$</sub></th>
                        <th>الشحن البحري<sub>$</sub></th>
                        <th>الاجمالى<sub>$</sub></th>
                        <th>السعر الافتراضي<sub>$</sub></th>
                        <th>الفرق<sub>$</sub></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div><script>pageManager.Init();</script>
</asp:Content>