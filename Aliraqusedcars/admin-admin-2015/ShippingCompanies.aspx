<%@ Page Title=" شركة العراق - شركات الشحن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ShippingCompanies.aspx.cs" Inherits="ShippingCompanies" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">شركات الشحن</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة شركات الشحن
            </h1>
        </div>
        <div class="row-fluid">
            <div class="row-fluid">
                <div class="table-header">
                    عرض شركات الشحن <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                        aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                        <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
                </div>
                <table id="listItems" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>مسلسل
                            </th>
                            <th>شركة الشحن
                            </th>
                            <th>الشركة بالعربى
                            </th>
                            <th>الشركة الأم
                            </th>
                            <th width="10%">خيارات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <!-- Edit Template -->
                <div id="ShipCompanyModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                    aria-hidden="true">
                    <form runat="server" id="aspnetForm" clientidmode="Static">
                        <asp:ScriptManager ID="ScriptManager1" runat="server" />
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                    ×</button>
                                <h3 id="editModalLabel">
                                    <i class="icon-edit"></i>
                                </h3>
                            </div>
                            <div class="modal-body">
                                <div class="control-group">
                                    <label>
                                    </label>
                                    <div class="controls">
                                        <input type="hidden" value="0" id="ShipCompanyID" />
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="ShipCompanyNameAr">
                                        اسم الشركة <span title='حقل إجبارى' class="text-error">*</span>
                                    </label>
                                    <div class="controls">
                                        <input type="text" id="ShipCompanyNameAr" class="required text-input" />
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="ShipCompanyNameEn">
                                        Ship. Company <span title='حقل إجبارى' class="text-error">*</span>
                                    </label>
                                    <div class="controls">
                                        <input type="text" id="ShipCompanyNameEn" class="required text-input" />
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="ShipMainCompanyID">
                                        الشركة الأم <span title='حقل إجبارى' class="text-error">*</span>
                                    </label>
                                    <div class="controls">
                                        <asp:DropDownList runat="server" ID="ShipMainCompanyID" CssClass="required">
                                        </asp:DropDownList>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em> إجبارية. </span>
                                <span class="sinpper"></span>
                                <button class="btn btn-success" aria-hidden="true">
                                    حفظ</button>
                                <button class="btn" data-dismiss="modal" aria-hidden="true">
                                    إلغاء</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/ShipCompanyManager.min.js?v=1.1"></script>
    <script>
        ShipCompanyManager.Init();
    </script>
</asp:Content>
