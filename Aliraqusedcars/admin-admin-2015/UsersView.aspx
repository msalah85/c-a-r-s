<%@ Page Title=" عــرض المــــوظفين " Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="UsersView.aspx.cs" Inherits="ETA_UsersView" %>

<%@ Import Namespace="Minutesuae.SystemUtilities" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">المــــوظفين</li>
        </ul>
    </div>
    <form runat="server" id="aspnetForm" clientidmode="Static">
        <div id="page-content" class="clearfix">
            <div class="page-header position-relative">
                <h1>إدارة المــــوظفين
                </h1>
            </div>
            <div class="row-fluid">
                <asp:Panel class="alert alert-block" ID="divError" runat="server" Visible="false">
                    <button type="button" class="close" data-dismiss="alert">
                        <i class="icon-remove"></i>
                    </button>
                    <strong>
                        <asp:Label ID="lblError" runat="server" /></strong>
                </asp:Panel>
            </div>
            <div class="row-fluid">
                <div class="table-header">
                    عـــــــرض المــــوظفين
            <asp:HyperLink runat="server" data-toggle="tooltip" ID="btnAddNew" ToolTip="أضــف موظــــف"
                ImageUrl="/App_Themes/iraq/images/add-new.png" CssClass="pull-left icon-animated-vertical btn-add"
                NavigateUrl="UsersAddEdit.aspx" />
                </div>
                <asp:GridView ID="gvUsers" runat="server" AutoGenerateColumns="False" EmptyDataText="عفــواً! لا توجد بيانات."
                    GridLines="None" CssClass="table table-bordered table-striped table-hover gvItems"
                    OnRowCommand="gvUsers_RowCommand" PageSize="5000" OnPageIndexChanging="gvUsers_PageIndexChanging"
                    OnRowDeleting="gvUsers_RowDeleting" ShowFooter="false">
                    <Columns>
                        <asp:TemplateField HeaderStyle-Width="55" ItemStyle-CssClass="center hidden-phone"
                            HeaderStyle-CssClass="hidden-phone" FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("UserID")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                مسلسل
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField FooterStyle-CssClass="srch">
                            <ItemTemplate>
                                <%# Eval("UserFullName")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                الاســم
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("Username")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                اسم المستخدم
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("Phone")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                الهاتــف
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-print" HeaderStyle-CssClass="hidden-print"
                            FooterStyle-CssClass="hidden-print">
                            <ItemTemplate>
                                <%# (Eval("IsActive").ToString() == "True") ? "<i data-toggle='tooltip' title='مفعل للدخول للنظام' class='green icon-ok'></i>" : "<i data-toggle='tooltip' title='غير مفعل للدخول للنظام' class='red icon-remove'></i>"%>
                                <div class="btn-group pull-left">
                                    <button data-toggle="dropdown" class="btn btn-small btn-info dropdown-toggle">
                                        اخـتـر <i class="icon-angle-down icon-on-right"></i>
                                    </button>
                                    <ul class="dropdown-menu pull-right">
                                        <li class="<%#Eval("UserID").ToString().Equals("1") ? "hidden" : "" %>"><a title="صلاحيات المستخدم" class="permission" data-id='<%#Eval("UserID") %>' data-toggle="modal" href='#user-perm'>صلاحيات المستخدم</a></li>
                                        <li>
                                            <asp:HyperLink ID="lbEdit" NavigateUrl='<%# "UsersAddEdit.aspx?userId=" + Eval("UserID") %>' runat="server">تعـديل</asp:HyperLink></li>
                                        <li><a href='hr/Advances.aspx?type=1&id=<%#Eval("UserID") %>'>القروض</a></li>
                                        <li><a title="اضافة أجازة" href='hr/vacations.aspx?id=<%#Eval("UserID") %>'>اضافة أجازة</a></li>

                                        <li><a title="اضافة شيكات الإيجار السنوى" href='EmployeeRentDetails.aspx?eid=<%#Eval("UserID") %>'>اضافة شيكات الإيجار</a></li>
                                        <li><a title="اضافة شيكات الإيجار السنوية" href='EmployeeRents.aspx?id=<%#Eval("UserID") %>'>عرض شيكات الإيجار</a></li>

                                        <li>
                                            <asp:LinkButton CommandArgument='<%# Eval("UserID") %>' Visible='<%# Convert.ToDecimal( Eval("AdvancesBalance")) < 1 && (Eval("IsActive").ToString() != "True") %>'
                                                title="حــذف" data-original-title="حــذف" ToolTip="حــذف" CommandName="Delete" OnClientClick="return DeleteConfirmation();" runat="server">حــذف</asp:LinkButton>
                                        </li>
                                    </ul>
                                </div>

                            </ItemTemplate>
                            <HeaderTemplate>
                                خيارات
                            </HeaderTemplate>
                        </asp:TemplateField>
                    </Columns>
                    <PagerSettings Mode="NumericFirstLast" />
                </asp:GridView>
            </div>
        </div>
        <!--user permissions modal-->
        <div id="user-perm" class="modal hide" tabindex="-1">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="blue bigger">يرجي تحديد صلاحيات المستخدم</h4>
            </div>
            <div class="modal-body overflow-visible" style="overflow-y: scroll;">
                <div class="row-fluid">
                    <div class="span12">
                        <input id="UserID" type="hidden" value="" />
                        <select id="treePages" multiple="multiple"></select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small" data-dismiss="modal">
                    <i class="icon-remove"></i>
                    إغلاق
                </button>
                <button class="btn btn-small btn-primary btnSave">
                    <i class="icon-ok"></i>
                    حفــظ
                </button>
            </div>
        </div>
    </form>
    <link href="/Scripts/multiselect/jquery.tree-multiselect.min.css?v=1.1" rel="stylesheet" />
    <script src="/Scripts/multiselect/jquery.tree-multiselect.min.js?v=1.1"></script>
    <script src="/Scripts/App/usersList.min.js?v=1.1"></script>
</asp:Content>
