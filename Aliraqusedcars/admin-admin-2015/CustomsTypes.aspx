<%@ Page Title=" شركة العراق - أنواع مصروفات التخليص الجمركى" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="CustomsTypes.aspx.cs" Inherits="MinutesuaeCustomsTypes" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">أنواع مصروفات التخليص الجمركى</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة أنواع مصروفات التخليص الجمركى
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
                عرض أنواع مصروفات التخليص الجمركى <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="30px">م
                        </th>
                        <th>اسم المصروف
                        </th>
                        <th>Customs Type
                        </th>
                        <th width="10%">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <!-- Edit Template -->
            <div id="ExpenseTypeModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
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
                                <input type="hidden" value="0" id="ExpenseTypeID" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtExpenseTypeNameAr">
                                اسم المصروف:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:TextBox runat="server" ID="txtExpenseTypeNameAr" CssClass="required" ClientIDMode="Static" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                        Display="Dynamic" runat="server" ControlToValidate="txtExpenseTypeNameAr" ValidationGroup="s">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtExpenseTypeNameEn">
                                Expense type:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:TextBox runat="server" ID="txtExpenseTypeNameEn" CssClass="required" ClientIDMode="Static" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                        Display="Dynamic" runat="server" ControlToValidate="txtExpenseTypeNameEn" ValidationGroup="s">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                        إجبارية. </span><span class="sinpper"></span>
                    <asp:LinkButton class="btn btn-success" aria-hidden="true" ID="btnSave" runat="server"
                        ValidationGroup="s">حفظ</asp:LinkButton>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/CustomsTypesManager.min.js?v=1.1"></script>
</asp:Content>
