<%@ Page Title=" شركة العراق - شركات الصرافه" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ExchangeCompanies.aspx.cs" Inherits="ExchangeCompanies" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">شركات الصرافه</li>
        </ul>
        <!--.breadcrumb-->
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة شركات الصرافه
            </h1>
        </div>
        <asp:Panel class="alert alert-block" ID="divError" runat="server" Visible="false">
            <button type="button" class="close" data-dismiss="alert">
                <i class="icon-remove"></i>
            </button>
            <strong>
                <asp:Label ID="lblError" runat="server" /></strong>
        </asp:Panel>
        <!--/.page-header-->
        <div class="row-fulid">
            <div class="table-header">
                عرض شركات الصرافه <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="30px">م
                        </th>
                        <th>شركة الصرافه
                        </th>
                        <th>Exchange Company
                        </th>
                        <th>Rate USD => AED
                        </th>
                        <th width="50">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <!-- Edit Template -->
            <div id="ExchangeCompanyModal" class="modal hide fade" tabindex="-1" role="dialog"
                aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="editModalLabel">
                        <i class="icon-edit"></i>
                    </h3>
                </div>
                <div class="modal-body">
                    <form runat="server" id="aspnetForm" clientidmode="Static">
                        <asp:ScriptManager ID="ScriptManager1" runat="server" />
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="control-group">
                                <label>
                                </label>
                                <div class="controls">
                                    <input type="hidden" value="0" id="ExchangeCompanyID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtExchangeCompanyNameAr">
                                    شركة الصرافه:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtExchangeCompanyNameAr" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                            Display="Dynamic" runat="server" ControlToValidate="txtExchangeCompanyNameAr"
                                            ValidationGroup="s">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtExchangeCompanyNameEn">
                                    Exchange Company:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtExchangeCompanyNameEn" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="txtExchangeCompanyNameEn"
                                            ValidationGroup="s">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Rate">
                                    Rate USD => AED:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="Rate" Text="0" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequRateiredFieldVssalidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="Rate"
                                            ValidationGroup="s">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div class="modal-footer">
                    <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                        إجبارية. </span><span class="sinpper"></span>
                    <button type="submit" class="btn btn-success" aria-hidden="true" id="btnSave">حفظ</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/Scripts/App/ExchangeCompaniesManager.min.js?v=1.1"></script>
    <script>
        ExchangeCompaniesManager.Init();
    </script>
</asp:Content>
