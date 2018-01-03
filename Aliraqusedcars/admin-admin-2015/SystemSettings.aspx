<%@ Page Title="إعدادت النظام" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="SystemSettings.aspx.cs" Inherits="admin_admin_2015_SystemSettings" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">إعدادت النظام</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إعدادت النظام <small id="divSpinner"></small></h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal" id="aspnetForm">
                <div id="masterForm">
                    <div class="span12">
                        <div class="control-group">
                            <label class="control-label" for="Password">كلمة السر للحوالة<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required" required id="Password" name="pass" />
                                    <p class="text-info">كلمة السر المستخدمة فى حوالة العميل.</p>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ConvertAmount">عمولة مكتب الصرافة<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required" required id="ConvertAmount" name="ConvertAmount" value="0" />
                                    <p class="text-info">عمولة مكتب/شركة الصرافة بالدرهم.</p>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Storage">غرامة أرضيات<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required" required id="Storage" name="Storage" value="0" />
                                    <p class="text-info">$</p>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="Label7" for="LatePayment">غرامة تأخير الدفع<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required" required id="LatePayment" name="LatePayment" value="0" />
                                    <p class="text-info">$</p>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="Label10" for="CustomValue">قيمة الجمارك الثابتة<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required" required id="CustomValue" value="0" />
                                    <p class="text-info">مبلغ الجمارك الثابت المضاف فى فاتورة التخليص الجمركي.</p>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="Label3" for="Commission">عمولة الشركة الثابتة<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required" name="commissions" id="Commission" required value="0" />
                                    <p class="text-info">قيمة عمولة الشركة الثابتة.</p>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"></label>
                            <div class="controls">
                                <button type="submit" id="SaveAll" class="btn btn-success" title="حفـــظ"><i class="icon icon-save"></i>حفظ الإعدادات</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script src="/Scripts/App/systemSettings.min.js?v=1.1"></script>
    <style>
        #masterForm p.text-info {
            display: inline-block;margin-right:5px;
        }
    </style>
</asp:Content>