<%@ Page Title="شركة العراق - أرقام الباير" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="Buyers.aspx.cs" Inherits="ETA_Buyers" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .chzn-select {
            width: 300px !important;
        }
    </style>
    <script type="text/javascript" src="/Scripts/App/BuyersManager.min.js?v=1.0"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">أرقام الباير</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة أرقام الباير
            </h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض الباير <a data-toggle="tooltip" data-placement="top" id="divAddEdit" data-original-title="اضافة جديد"
                    data-dismiss="modal" aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>رقم الباير
                        </th>
                        <th>تصنيف الباير
                        </th>
                        <th>اسم المزاد
                        </th>
                        <th width="30%">العميل
                        </th>
                        <th>اسم المستخدم</th>
                        <th>كلمة المرور</th>
                        <th>الرســوم</th>
                        <th width="40px" title="حالة الباير فعال/متوقف عند العميل">مفعل !</th>
                        <th width="70px" class="hidden-print">خيارات
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <!-- add/Edit Template -->
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
                <form runat="server" id="aspnetForm" clientidmode="Static">
                    <fieldset id="formMain" class="form-horizontal">
                        <div class="control-group">
                            <label>
                            </label>
                            <div class="controls">
                                <input type="hidden" value="0" id="BuyerID" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="BuyerName">
                                رقم الباير:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:TextBox runat="server" ID="BuyerName" CssClass="required" ClientIDMode="Static" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValisdfdator5"
                                        Display="Dynamic" runat="server" ControlToValidate="BuyerName" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlAuctionType">
                                تصنيف المزاد:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:DropDownList runat="server" ID="ddlAuctionType" ClientIDMode="Static" class="required"
                                        data-placeholder="اختــر">
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator1"
                                        Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ddlAuctionType"
                                        ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlAuctionID">
                                اسم المزاد:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:DropDownList runat="server" ID="ddlAuctionID" ClientIDMode="Static" class="required"
                                        data-placeholder="اختــر">
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator4"
                                        Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ddlAuctionID"
                                        ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlClientID">
                                العميل:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:DropDownList runat="server" ID="ddlClientID" ClientIDMode="Static" class="required"
                                        data-placeholder="اختــر">
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequisssssFieldValidator5"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlClientID" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="BuyerFee">عمولة الباير:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:TextBox runat="server" ID="BuyerFee" Text="0" CssClass="required" ClientIDMode="Static" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator2"
                                        Display="Dynamic" runat="server" ControlToValidate="BuyerFee" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Username" data-toggle="tooltip" title="اسم المستخدم فى موقع المزاد">اسم المستخدم !:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <input type="text" id="Username" name="Username" class="required" required />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Password" data-toggle="tooltip" title="كلمة المرور فى موقع المزاد">كلمة المرور !:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <input type="text" id="Password" name="Password" class="required" required />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Puse" data-toggle="tooltip" title="استخدام الباير فعال/متوقف لدي العميل">الباير فعال/متوقف !:</label>
                            <div class="controls">
                                <div>
                                    <select id="Puse" name="Puse">
                                        <option value="">خالى</option>
                                        <option value="0">الباير فعال لدى العميل</option>
                                        <option value="1">الباير متوقف عن العميل</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <asp:HiddenField ID="hndExpandedChild" runat="server" Value="" />
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
    <script type="text/javascript">
        BuyersManager.Init();
    </script>
</asp:Content>
