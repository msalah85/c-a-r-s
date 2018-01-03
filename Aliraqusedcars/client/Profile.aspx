<%@ Page Title="بيانات العميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="Profile.aspx.cs" Inherits="Profile_User" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <h1 class="page-header">تعديل بياناتى</h1>
            <div class="dashboard-block">
                <form id="client-profile">
                    <div class="row">
                        <div class="col-md-8 col-lg-offset-2">
                            <p class="text-info">يمكنك تحديث بياناتك الشخصيه، لذا يرجي التأكد من صحة البيانات الخاصه بك.</p>
                            <div class="space-10"></div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="full_name">الإسم بالكامل<span class="red-txt">*</span></label>
                                        <input type="text" id="full_name" name="a2" class="form-control notneed" disabled required />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="user_name">اسم المستخدم<span class="red-txt">*</span></label>
                                        <input id="ClientID" value="0" type="hidden" />
                                        <input type="text" id="user_name" name="a1" disabled="disabled" class="notneed form-control" required />
                                    </div>
                                </div>
                            </div>
                            <div class="space-10"></div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="phone">الجوال<span class="red-txt">*</span></label>
                                        <div class="input-group">
                                            <input type="tel" id="phone" name="phone" dir="ltr" maxlength="9" data-msg-maxlength="يرجي ادخال رقم الجوال بدون اصفار فى البداية ولا يزيد عن {0} أرقام!" class="form-control" aria-label="الهاتف" />
                                            <div class="input-group-btn">
                                                <select class="form-control" name="countryCode" required id="countryCode" style="width: 160px; padding: 2px 12px;">
                                                    <option></option>
                                                    <option value="00971">الإمارات (00971)</option>
                                                    <option value="00964">العراق (00964)</option>
                                                    <option value="00962">الأردن (00962)</option>
                                                    <option value="00968">عمان (00968)</option>
                                                    <option value="00966">السعودية (00966)</option>
                                                    <option value="00965">الكويت (00965)</option>
                                                    <option value="00974">قطر (00974)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="phone2">الجوال 2</label>
                                        <div class="input-group">
                                            <input type="tel" id="phone2" name="phone2" dir="ltr" maxlength="9" data-msg-maxlength="يرجي ادخال رقم الجوال بدون اصفار فى البداية ولا يزيد عن {0} أرقام!" class="form-control" aria-label="الهاتف 2" />
                                            <div class="input-group-btn">
                                                <select class="form-control" name="countryCode2" id="countryCode2" style="width: 160px; padding: 2px 12px;">
                                                    <option></option>
                                                    <option value="00971">الإمارات (00971)</option>
                                                    <option value="00964">العراق (00964)</option>
                                                    <option value="00962">الأردن (00962)</option>
                                                    <option value="00968">عمان (00968)</option>
                                                    <option value="00966">السعودية (00966)</option>
                                                    <option value="00965">الكويت (00965)</option>
                                                    <option value="00974">قطر (00974)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="email">البريد الإلكتروني</label>
                                        <input type="email" dir="ltr" id="email" name="a3" class="form-control" placeholder="example@gmail.com" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="country">العنوان:</label>
                                <input type="text" id="country" name="a5" placeholder="مثال: الإمارات" class="form-control" />
                            </div>
                            <div class="row">
                                <div class="col-md-2 col-sm-2">
                                    <button type="submit" class="btn btn-info">تحديث البيانات</button>
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
    <script src="/Scripts/client/user-profile.min.js"></script>
</asp:Content>
