<%@ Page Title="تسجيل دخول العملاء" Language="C#" MasterPageFile="~/SiteAr.master" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="white-area" role="main">
        <h1 class="page-header">تسجيل دخول العملاء</h1>
        <div class="col-md-6 col-md-offset-3">
            <div class="alert-message"></div>
        </div>
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="accordion" id="accordionArea">
                    <div class="accordion-group panel panel-info">
                        <div class="panel-heading">
                            <h4 class="panel-title"><a class="active" data-toggle="collapse" data-parent="#accordionArea" href="#oneArea">تسجيل دخــول العملاء <i class="fa fa-angle-down pull-left"></i></a></h4>
                        </div>
                        <div id="oneArea" class="in collapse panel-body">
                            <p>ادخل اسم المستخدم وكلمة المرور للدخول على حسابك</p>
                            <form class="login-form" dir="rtl" runat="server">
                                <div class="form-group">
                                    <label class="control-label">اسم المستخدم<span class="red-txt">*</span></label>
                                    <div class="col-sm-8">
                                        <asp:TextBox runat="server" ID="username" class="form-control" placeholder="اسـم المستخدم" />
                                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" Display="Dynamic"
                                            runat="server" ControlToValidate="username" ForeColor="Red" ValidationGroup="login"
                                            SetFocusOnError="true" ErrorMessage="مطلـــــــــوب اســــــم المستــــــخدم!."></asp:RequiredFieldValidator>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">كلمة المرور<span class="red-txt">*</span></label>
                                    <div class="col-sm-8">
                                        <asp:TextBox runat="server" ID="password" class="form-control" placeholder="كلمـة المرور" />
                                        <asp:RequiredFieldValidator ValidationGroup="login"
                                            SetFocusOnError="true" ForeColor="Red" ID="RequiredFieldValidator2" runat="server"
                                            ErrorMessage="مطلـــــــــوب كلمــــــة المــــرور!." ControlToValidate="password"></asp:RequiredFieldValidator>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-9">
                                        <asp:Button runat="server" OnClick="Login_Click" ValidationGroup="login" class="btn btn-info center-block" Text="تسجيـــل الدخــــول" />
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div runat="server" id="lblWarning">
                                        <asp:Label runat="server" ID="lblError" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="panel panel-success">
                        <div class="panel-heading">
                            <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordionArea" href="#twoArea">استرجاع بيانات الدخول عن طريق الايميل <i class="fa fa-angle-down pull-left"></i></a></h4>
                        </div>
                        <div id="twoArea" class="panel-body collapse">
                            <p>برجاء ادخال البريد الإلكتروني المسجل لدينا بالنظام</p>
                            <form id="email-form">
                                <div class="form-group">
                                    <label class="control-label">البريد الإلكتروني المسجل<span class="red-txt">*</span></label>
                                    <div class="col-sm-8">
                                        <input type="email" id="email" required class="form-control" data-msg-email="برجاء تصحيح البريد الإلكتروني." data-msg-required="برجاء ادخال بريدك الإلكتروني المسجل لدينا بالنظام." placeholder="البريد الإلكتروني" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btn btn-success center-block" value="ارســـل إيمــيل" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="panel-warning panel">
                        <div class="panel-heading">
                            <h4 class="panel-title"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordionArea" href="#threeArea">استرجاع بيانات الدخول عن طريق الجـــوال <i class="fa fa-angle-down pull-left"></i></a></h4>
                        </div>
                        <div id="threeArea" class="panel-body collapse">
                            <p>برجاء ادخال رقم الجوال المسجل لدينا بالنظام.</p>
                            <form id="sms-form">
                                <div class="form-group">
                                    <label class="control-label">رقم الجوال المسجل<span class="red-txt">*</span></label>
                                    <div class="col-sm-8">
                                        <input type="tel" id="phone" required class="form-control" data-msg-required="برجاء ادخال رقم الجوال المسجل لدينا بالنظام." placeholder="رقم الجوال" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btn btn-warning center-block" value="ارســـل رســـالة" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        .accordion .col-sm-8 {
            float: left;
        }

        .accordion form {
            text-align: left;
        }
    </style>
</asp:Content>
