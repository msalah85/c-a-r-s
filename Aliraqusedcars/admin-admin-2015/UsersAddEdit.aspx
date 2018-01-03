<%@ Page Title=" اضافة/تعديل مــــوظف - " Language="C#" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="UsersAddEdit.aspx.cs" EnableSessionState="ReadOnly" Inherits="Iraq_UsersAddEdit" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
    <link href="signature/css/jquery.signature.min.css?v=1.1" rel="stylesheet" />
    <script src="signature/js/jquery.signature.min.js?v=1.4"></script>
    <script src="signature/js/canvg.min.js?v=1.1"></script>
    <style>
        #sig {
            width: 500px;
            height: 187px;
            border: 3px solid #cac5c5;
        }
        #sigView canvas {
            max-height: 188px !important;
            max-width: 350px !important;
            overflow: hidden;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="UsersView.aspx">المــــوظفين</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">اضافة/تعديل مــــوظف</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>المــــوظفين <small><i class="icon-double-angle-left"></i>&nbsp;إضافة/تعديل مــــوظف</small>
            </h1>
        </div>
        <div class="row-fluid">
            <form runat="server" id="aspnetForm" clientidmode="Static">
                <asp:Panel class="alert alert-block" ID="divError" runat="server" Visible="false">
                    <button type="button" class="close" data-dismiss="alert">
                        <i class="icon-remove"></i>
                    </button>
                    <strong>
                        <asp:Label ID="lblError" runat="server" /></strong>
                </asp:Panel>
                <table class="table table-bordered table-striped" id="addForm">
                    <tr align="center" valign="top">
                        <td>الاسم <span class="text-error">*</span>
                        </td>
                        <td>
                            <asp:TextBox ID="UserFullName" ValidationGroup="s" runat="server" required ClientIDMode="Static"></asp:TextBox>
                            &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" Display="Dynamic" CssClass="text-error" ID="RequiredFieldValidator6"
                                runat="server" ControlToValidate="UserFullName" ValidationGroup="s" ToolTip="مطلــــوب."
                                ErrorMessage="">
                                <img id="Img1" alt="Notifier" runat="server" src='/App_Themes/iraq/images/warning.png' />
                                مطلــــوب.
                            </asp:RequiredFieldValidator>
                        </td>
                        <td>البريد الإلكترونى
                        </td>
                        <td>
                            <asp:TextBox ID="Email" ValidationGroup="s" runat="server" ClientIDMode="Static"></asp:TextBox>
                            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server"
                                Display="Dynamic" SetFocusOnError="True" ControlToValidate="Email" ErrorMessage=""
                                ToolTip="يرجى تصحيح البريد الإلكترونى." CssClass="text-error"
                                ValidationGroup="s" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*">
                                <img id="Img5" alt="Notifier" runat="server" src='/App_Themes/iraq/images/warning.png' />
                                يرجى تصحيح البريد الإلكترونى.
                            </asp:RegularExpressionValidator>
                        </td>
                    </tr>
                    <tr align="center" valign="top">
                        <td>اسم المستخدم <span class="text-error">*</span>
                        </td>
                        <td>
                            <asp:TextBox ID="Username" ValidationGroup="s" dir="ltr" runat="server" ClientIDMode="Static"></asp:TextBox>
                            &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFielskjfldValidator5"
                                runat="server" ControlToValidate="Username" ValidationGroup="s" ToolTip="مطلــــوب."
                                ErrorMessage="" Display="Dynamic">
                                <img id="Img6" alt="Notifier" runat="server" src='/App_Themes/iraq/images/warning.png' />
                                مطلــــوب.
                            </asp:RequiredFieldValidator>
                        </td>
                        <td>كلمة المرور <span class="text-error">*</span>
                        </td>
                        <td>
                            <asp:TextBox ID="Password" ValidationGroup="s" runat="server" ClientIDMode="Static" dir="ltr"></asp:TextBox>
                            &nbsp;<asp:RequiredFieldValidator Display="Dynamic" SetFocusOnError="true" CssClass="text-error"
                                ID="RequirdsdsdaedFieldValidator5" runat="server" ControlToValidate="Password"
                                ValidationGroup="s" ToolTip="مطلــــوب." ErrorMessage="">
                                <img id="Img7" alt="Notifier" runat="server" src='/App_Themes/iraq/images/warning.png' />
                                مطلــــوب.
                            </asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td>الهــاتف
                        </td>
                        <td>
                            <asp:TextBox ID="Phone" runat="server" ClientIDMode="Static"></asp:TextBox>
                        </td>
                        <td>الجـــوال
                        </td>
                        <td>
                            <asp:TextBox ID="Mobile" runat="server" ClientIDMode="Static"></asp:TextBox>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td>الجنسية
                        </td>
                        <td>
                            <asp:TextBox ID="Nationality" runat="server" ClientIDMode="Static"></asp:TextBox>
                        </td>
                        <td>الوظيفة
                        </td>
                        <td>
                            <asp:DropDownList runat="server" ID="JobID" required ClientIDMode="Static">
                                <asp:ListItem Value=""></asp:ListItem>
                            </asp:DropDownList>
                            <asp:RequiredFieldValidator Display="Dynamic" SetFocusOnError="true" CssClass="text-error"
                                ID="RequiredFieldValizdator1" runat="server" ControlToValidate="JobID" InitialValue=""
                                ValidationGroup="s" ToolTip="مطلــــوب." ErrorMessage="">
                                <img id="Img2" alt="Notifier" runat="server" src='/App_Themes/iraq/images/warning.png' />
                                مطلــــوب.
                            </asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr valign="top">
                        <td>رقم الهوية
                        </td>
                        <td>
                            <asp:TextBox ID="EmpID" runat="server" ClientIDMode="Static"></asp:TextBox>
                        </td>
                        <td>تاريخ الالتحاق بالعمل</td>
                        <td>
                            <asp:TextBox ID="JoinDate" CssClass="date-picker" dir="ltr" data-date-format="dd/mm/yyyy" runat="server" ClientIDMode="Static"></asp:TextBox>
                        </td>
                    </tr>
                    <tr>
                        <td>يسمح بالدخول للنظام</td>
                        <td>
                            <label>
                                <input type="checkbox" runat="server" clientidmode="Static" id="IsActive" class="ace-switch ace-switch-6" />
                                <label class="lbl" for="IsActive">&nbsp; نعم! (✓) يسمح لهذا الموظف بالدخول على النظام</label>
                            </label>
                        </td>
                        <td><a title="أضف توقيق" data-toggle="modal" data-rel="tooltip" href="#sigModal" class="hidden-print add-sig"><i class="icon-plus-sign bigger-120"></i>
                            توقيع</a>
                        </td>
                        <td>
                            <asp:HiddenField ID="UserID" ClientIDMode="Static" runat="server" />
                            <asp:Button ID="btnAdd" ValidationGroup="s" runat="server" Text="حفـــظ" class="btn btn-small btn-success btnSaveUser" />
                            <asp:HyperLink ID="btnCancel" runat="server" Text="إلغــاء" class="btn btn-small btn-danger"
                                NavigateUrl="UsersView.aspx" /></td>
                    </tr>
                </table>
            </form>
        </div>
        <!--signature modal-->
        <div id="sigModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="sigModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="sigModalLabel"><i class="icon-pencil"></i>&nbsp;اضـف توقيع</h3>
            </div>
            <div class="modal-body">
                <fieldset id="sigForm" class="form-horizontal">
                    <p class="green">برجاء تشغيل جهاز التوقيع الإلكتروني ورسم التوقيع وسط الإطار التالى:</p>
                    <div class="center">
                        <div id="sig" runat="server" clientidmode="Static" title="ارسم التوقيع هنا"></div>
                    </div>
                </fieldset>
            </div>
            <div class="modal-footer">
                <a id="clear" runat="server" clientidmode="Static" class="pull-right btn btn-warning btn-small" href="javascript:;">إعادة التوقيع</a>
                <a class="btn btn-success" id="SaveSignature" runat="server" clientidmode="Static" aria-hidden="true">حفظ التوقيع</a>
                <button class="btn" data-dismiss="modal" aria-hidden="true">إلغاء</button>
            </div>
        </div>
        <!-- end-->
    </div>
    <script src="/Scripts/hr/users-add.min.js?v=2.0"></script>
    <style>
        select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"], .uneditable-input {
            margin-bottom: 0 !important;
        }
    </style>
</asp:Content>
