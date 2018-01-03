<%@ Page Title=" شركة العراق - أنواع الخدمات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ServiceTypes.aspx.cs" Inherits="ETA_ServiceTypes" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left">
            </i></span></li>
            <li class="active">أنواع الخدمات</li>
        </ul>
        <!--.breadcrumb-->
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>
                إدارة أنواع الخدمات
            </h1>
        </div>
        <!--/.page-header-->
        <div class="row-fulid">
            <div class="table-header">
                عرض أنواع الخدمات <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="30px">
                            م
                        </th>
                        <th>
                            اسم الخدمة
                        </th>
                        <th>
                            Service Type
                        </th>
                        <th width="10%">
                            خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <!-- Edit Template -->
            <div id="ServiceTypeModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
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
                                <input type="hidden" value="0" id="ServiceTypeID" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtServiceTypeNameAr">
                                اسم الخدمة:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:TextBox runat="server" ID="txtServiceTypeNameAr" CssClass="required" ClientIDMode="Static" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                        Display="Dynamic" runat="server" ControlToValidate="txtServiceTypeNameAr" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtServiceTypeNameEn">
                                Service type:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:TextBox runat="server" ID="txtServiceTypeNameEn" CssClass="required" ClientIDMode="Static" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                        Display="Dynamic" runat="server" ControlToValidate="txtServiceTypeNameEn" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
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
    </div>
    <!--page specific plugin scripts-->
    <script type="text/javascript" src="/Scripts/App/ServiceTypesManager.min.js?v=1.1"></script>
    <script>
        ServiceTypesManager.Init();
    </script>
</asp:Content>
