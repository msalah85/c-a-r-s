<%@ Page Title=" شركة العراق - نوع السيارة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="Models.aspx.cs" Inherits="CarsModels" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .chosen-container {
            width: 340px !important;
        }

        .modal-body input[type="text"] {
            width: 325px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">نوع السيارة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة نوع السيارة
            </h1>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                عرض موديل السيارة <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="30px">م
                        </th>
                        <th>موديل السيارة
                        </th>
                        <th>Model
                        </th>
                        <th>نوع السيارة</th>
                        <th>حجم السيارة</th>
                        <th width="60">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <!-- Edit Template -->
            <div id="ModelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
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
                                    <input type="hidden" value="0" id="ModelID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ddlMakerID">
                                    نوع السيارة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="">
                                        <asp:DropDownList runat="server" ID="ddlMakerID" ClientIDMode="Static" CssClass="chzn-select chosen-rtl required">
                                        </asp:DropDownList>
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator4"
                                            Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ddlMakerID"
                                            ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtTypeNameAr">
                                    موديل السيارة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="">
                                        <asp:TextBox runat="server" ID="txtTypeNameAr" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                            Display="Dynamic" runat="server" ControlToValidate="txtTypeNameAr" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtTypeNameEn">
                                    Car Model:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="">
                                        <asp:TextBox runat="server" ID="txtTypeNameEn" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="txtTypeNameEn" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="CarSizeID">
                                    حجم السيارة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="">
                                        <select id="CarSizeID" class="required" required name="CarSizeID">
                                            <option value="1">عادى</option>
                                            <option value="2">كبير</option>
                                        </select>
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
    <script src="/Scripts/App/ModelsManager.min.js?v=1.1"></script>
    <script>
        ModelsManager.Init();
    </script>
</asp:Content>