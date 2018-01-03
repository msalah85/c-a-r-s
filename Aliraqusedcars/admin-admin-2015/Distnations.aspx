<%@ Page Title=" شركة العراق - جهات الوصول" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="Distnations.aspx.cs" Inherits="AdminDistinations" ViewStateMode="Disabled" EnableViewState="false" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">جهات الوصول</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة جهات الوصول
            </h1>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                عرض جهات الوصول <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="30px">م
                        </th>
                        <th>جهة الوصول
                        </th>
                        <th>Distination
                        </th>
                        <th width="10%">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div id="DistinationModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
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
                                    <input type="hidden" value="0" id="DistinationID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtDistinationNameAr">
                                    اسم جهة الوصول:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtDistinationNameAr" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                            Display="Dynamic" runat="server" ControlToValidate="txtDistinationNameAr" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtDistinationNameEn">
                                    Distination:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtDistinationNameEn" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="txtDistinationNameEn" ValidationGroup="s"
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
                    <button class="btn btn-success" aria-hidden="true" id="btnSave" runat="server">
                        حفظ</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/DistnationsManager.min.js?v=1.1"></script>
    <script>
        DistinationsManager.Init();
    </script>
</asp:Content>
