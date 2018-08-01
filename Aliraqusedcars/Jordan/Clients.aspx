<%@ Page Title="العملاء بالأردن" Language="C#" MasterPageFile="~/Jordan/Site.master" AutoEventWireup="true" CodeFile="Clients.aspx.cs" Inherits="Jordan_Clients" %>

<asp:Content ID="Content3" runat="Server" ContentPlaceHolderID="head">
    <link href="/Scripts/select2/select2.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBanner" runat="Server">
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="container-padding" id="page-contents">
        <div class="sub-menu">
            <ol class="breadcrumb">
                <li><a href="home">الرئيسية</a></li>
                <li><a href="Cars">السيارات</a></li>
                <li><a href="Containers">الحاويات</a></li>
            </ol>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h1 class="page-header">قائمة العملاء</h1>
            </div>
            <div class="col-sm-12">
                <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            <th width="25%">اسم العميل</th>
                            <th class="hidden-480">الهاتف</th>
                            <th class="hidden-480">Username</th>
                            <th>الرصيد</th>
                            <th title="المطلوب حالياً">المطلوب</th>
                            <th>الصافي</th>
                            <th class="hidden-480" title="المطلوب على العميل كاملاً">مدين</th>
                            <th width="40" class="hidden-print">خيارات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="100%">جاري تحميل البيانات...</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th><span class="netTotal red"></span></th>
                            <th class="all-required"></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <div class="clearfix">&nbsp;</div>
            </div>
        </div>
    </div>
    <div id="ClientModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div id="wizardClient" class="modal-header" data-target="#modal-step-contents">
                    <h4>بيانات العميل
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                    </h4>
                </div>
                <div class="modal-body step-content" id="modal-step-contents" style="overflow-y: auto;">
                    <fieldset id="formMain" class="form-horizontal">
                        <div class="control-group">
                            <label class="control-label" for="txtName">
                                اسم العميل/الحساب:</label>
                            <span id="txtName"></span>
                        </div>
                        <br />
                        <div class="client-options">
                            <div class="control-group">
                                <label class="control-label" for="txtPhone">
                                    الجوال:</label>
                                <span id="countryCode"></span>-<span id="txtPhone"></span>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="phone2">الجوال 2:</label>
                                <span id="countryCode2"></span>-<span id="phone2"></span>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtUsername">
                                    اسم المستخدم:</label>
                                <span id="txtUsername"></span>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtPassword">
                                    كلمة المرور:</label>
                                <span id="txtPassword"></span>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-small" data-dismiss="modal" aria-hidden="true" id="cancelModal">
                        إنهاء</button>
                </div>
            </div>
        </div>
    </div>
    <!--send sms-->
    <div id="addSMS" class="modal fade" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 id="smsModalLabel"><i class="icon-edit"></i>ارسل رسالة للعميل</h4>
                </div>
                <div class="modal-body">
                    <form id="smsForm" class="form-horizontal">
                        <div class="control-group">
                            <label class="control-label" for="msg">رقم الجوال:  </label>
                            <div class="controls">
                                <span class="mobileNo"></span>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="msg">نص الرسالة: <span class="text-error">*</span></label>
                            <div class="controls">
                                <textarea rows="5" cols="5" class="form-control span12 required limited required" required id="msg" name="msg" data-toggle="tooltip" title="تنبيه: طول الرسالة 70 حرف فقط" data-maxlength="70" maxlength="70">اسم المستخدم:@username
كلمة السر:@password
www.iraqusedcars.ae</textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-small btn-primary" id="send-sms">
                        <i class="icon-envelope"></i>
                        ارسل الرسالة
                    </button>
                    <button class="btn btn-small pull-left" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentScripts" runat="Server">
    <script src="/Scripts/jordan/Clients.js?v=0.3"></script>
    <script src="/Scripts/select2/select2.min.js"></script>
    <script src="/Scripts/select2/select2-optinal.js"></script>
</asp:Content>
