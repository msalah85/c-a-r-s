<%@ Page Title="شركة العراق - أرقام المزادات للعميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    ViewStateMode="Disabled" EnableViewState="false" AutoEventWireup="true" CodeFile="ClientBuyers.aspx.cs"
    Inherits="ClientBuyers" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .chzn-select {
            width: 300px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="Buyers.aspx" title="إدارة أرقام المزادات">إدارة أرقام المزادات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="Clients.aspx">العـملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">أرقام المزادات للعميل</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>أرقام المزادات للعميل
            </h1>
        </div>
        <form id="aspnetForm" runat="server" clientidmode="Static">
            <div class="row-fluid">
                <asp:Panel class="alert alert-block" ID="divError" runat="server" Visible="false">
                    <button type="button" class="close" data-dismiss="alert">
                        <i class="icon-remove"></i>
                    </button>
                    <strong>
                        <asp:Label ID="lblError" runat="server" /></strong>
                </asp:Panel>
            </div>
            <div class="row-fulid">
                <div class="table-header">
                    عرض أرقام المزادات للعميل
                    <a href="Clients.aspx" class="btn btn-mini btn-primary pull-left addition" data-dismiss="modal" aria-hidden="true" data-rel="tooltip" data-original-title="الرجوع للعملاء"><i class="icon-group"></i>&nbsp;العملاء</a>
                </div>
                <table id="listItems" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>العميل
                            </th>
                            <th>رقم الباير
                            </th>
                            <th>اسم المزاد
                            </th>
                            <th>الحالة</th>
                            <th>تاريخ البداية</th>
                            <th>تاريخ الانتهاء
                            </th>
                        </tr>
                    </thead>
                </table>
                <div id="BuyerModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                    aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                        <h3 id="editModalLabel">
                            <i class="icon-edit"></i>
                        </h3>
                    </div>
                    <div class="modal-body">
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="control-group">
                                <label>
                                </label>
                                <div class="controls">
                                    <input type="hidden" id="ClientBuyerID" value="0" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ddlBuyerID">
                                    رقم الباير:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:DropDownList runat="server" Enabled="false" ID="ddlBuyerID" ClientIDMode="Static" class="required"
                                            data-placeholder="اختــر">
                                        </asp:DropDownList>
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator4"
                                            Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ddlBuyerID"
                                            ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ddlClientID">
                                    العميل:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:DropDownList runat="server" Enabled="false" ID="ddlClientID" ClientIDMode="Static" class="required"
                                            data-placeholder="اختــر">
                                        </asp:DropDownList>
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequisssssFieldValidator5"
                                            Display="Dynamic" runat="server" ControlToValidate="ddlClientID" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="cbActive">
                                    مفعل:</label>
                                <div class="controls">
                                    <div>
                                        <label>
                                            <input runat="server" clientidmode="Static" id="cbActive" class="" type="checkbox" />
                                            <span class="lbl"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="modal-footer">
                        <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                            إجبارية. </span><span class="sinpper"></span>
                        <button class="btn btn-success" aria-hidden="true">
                            حفظ</button>
                        <button class="btn" data-dismiss="modal" aria-hidden="true">
                            إلغاء</button>
                    </div>
                </div>
            </div>
            <asp:HiddenField ID="hndExpandedChild" runat="server" Value="" />
        </form>
    </div>
    <script src="/Scripts/App/ClientBuyersManager.min.js?v=1.0"></script>
    <script>
        $('#cbActive').click(function () {
            if ($(this).prop("checked"))
                $('#txtToDate').val('').attr('disabled', 'disabled');
            else
                $('#txtToDate').removeAttr("disabled");
        });
    </script>
</asp:Content>
