<%@ Page Title="شركة العراق - نوع السيارة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="Makers.aspx.cs" Inherits="ETA_CarsMakers" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">أنوع السيارات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة أنوع السيارات
            </h1>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                عرض أنوع السيارات <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="30px">م
                        </th>
                        <th>نوع السيارة
                        </th>
                        <th>Maker
                        </th>
                        <th width="10%">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div id="MakerModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
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
                                    <input type="hidden" value="0" id="MakerID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtMakerAr">
                                    نوع السيارة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtMakerAr" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                            Display="Dynamic" runat="server" ControlToValidate="txtMakerAr" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtMakerEn">
                                    Maker:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtMakerEn" CssClass="required" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="txtMakerEn" ValidationGroup="s"
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
    <script src="/Scripts/App/MakersManager.min.js?v=1.1"></script>
    <script>
        MakersManager.Init();
    </script>
</asp:Content>
