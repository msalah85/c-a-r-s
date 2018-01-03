<%@ Page Title=" شركة العراق - المـــدن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="Regions.aspx.cs" Inherits="ETA_Regions" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">المـــدن</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة المـــدن</h1>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                عرض المدن <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="30px">م
                        </th>
                        <th>المدينة
                        </th>
                        <th>Region
                        </th>
                        <th>عمولة البيع للأردن نقداً
                        </th>
                        <th width="60" class="hidden-print">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div id="RegionModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                aria-hidden="true">
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
                                    <input type="hidden" value="0" id="RegionID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtRegionAr">اسم المدينة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtRegionAr" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                            Display="Dynamic" runat="server" ControlToValidate="txtRegionAr" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtRegionEn">Region:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtRegionEn" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="txtRegionEn" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="RegionCommissionJor">عمولة البيع للأردن:</label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="RegionCommissionJor" Text="0" ClientIDMode="Static" CssClass="required" />
                                        <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator1"
                                            Display="Dynamic" runat="server" ControlToValidate="RegionCommissionJor" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
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
    </div>
    <script src="/Scripts/App/RegionsManager.min.js?v=1.1"></script>
    <script>
        RegionsManager.Init();
    </script>
</asp:Content>
