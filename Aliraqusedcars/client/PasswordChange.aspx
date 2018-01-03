<%@ Page Title="تغيير كلمة المرور" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="PasswordChange.aspx.cs" Inherits="PasswordChange_User" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <h1 class="page-header">الملف الشخصي - تغيير كلمة المرور</h1>
            <div class="dashboard-block">
                <form id="client-PasswordChange">
                    <div class="row">
                        <div class="col-md-8 col-lg-offset-2">
                            <p class="text-info">يمكنك تحديث كلمة المرور الخاصه بك، لذا يرجي ملئ البيانات التالية:</p>
                            <p class="text-success">تتكون كلمة المرور من 6 أو أكثر من الأحرف والأرقام وكذا الرموز الخاصه مثل & * $ # @ !.</p>
                            <div class="space-10"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="hidden" id="ClientID" value="0" />
                                        <label for="old_user_pass">كلمة المرور الحالية<span class="red-txt">*</span></label>
                                        <input id="old_user_pass" name="p1" type="password" class="form-control" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="user_pass">كلمة المرور الجديدة<span class="red-txt">*</span></label>
                                        <input id="user_pass" name="p2" type="password" class="form-control" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="user_password_c">تأكيد كلمة المرور<span class="red-txt">*</span></label>
                                        <input id="user_password_c" name="user_password_c" data-msg-required="برجاء تأكيد كلمة المرور." type="password" class="form-control" required />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 col-sm-2">
                                    <button type="submit" class="btn btn-info">تحديث كلمة المرور</button>
                                </div>
                                <div class="col-md-10 col-sm-10 myMessage">
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
    <script src="/Scripts/plugins/utilities.min.js"></script>
    <script src="/Scripts/client/user-passwordchange.min.js"></script>
</asp:Content>
