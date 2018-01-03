<%@ Page Title="رسائل الجوال" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="sms-templates.aspx.cs" Inherits="admin_admin_2015_sms_templates" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .chosen-container-multi {
            width: 270px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="Clients.aspx">العــملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">رسائل الجوال</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة رسائل الجوال</h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض رسائل الجوال                 
                <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
                <a data-toggle="modal" data-target="#checkBalance" href="javascript:;" target="_blank" class="btn btn-mini btn-purple pull-left addition" data-rel="tooltip" title="فحص رصيد الرسائل">الرصيد SMS</a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>الرسالة</th>
                        <th width="100px">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="addSMS" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="smsModalLabel"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="smsModalLabel"><i class="icon-edit"></i></h3>
            </div>
            <div class="modal-body">
                <form id="smsForm" class="form-horizontal">
                    <div class="control-group">
                        <label class="control-label" for="Clients">اختر عميل:<span class="text-error">*</span></label>
                        <div class="controls">
                            <select multiple="multiple" id="Clients" name="Clients" class="chzn-select chosen-rtl required" required data-placeholder="اختر عميل" required>
                            </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"></label>
                        <div class="controls">
                            <label class="inline">
                                <input type="checkbox" id="sendAll" />&nbsp;<span class="lbl">ارسل الرسالة لجميع العملاء.</span>
                            </label>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="msg">نص الرسالة: <span class="text-error">*</span></label>
                        <div class="controls">
                            <textarea rows="5" cols="5" class="span3 required" required id="msg" name="msg"></textarea>
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
        <div id="addModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="editModalLabel"><i class="icon-edit"></i></h3>
            </div>
            <div class="modal-body">
                <form id="aspnetForm" class="form-horizontal">
                    <div class="">
                        <div class="controls">
                            <input type="hidden" id="ID" name="ID" value="0" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="news_title">نص الرسالة:</label>
                        <div class="controls">
                            <textarea rows="5" cols="5" class="span3 limited" required id="Message" name="Message" data-toggle="tooltip" title="تنبيه: طول الرسالة 70 حرف فقط" data-maxlength="70" maxlength="70"></textarea>
                            <p id="statusCounter"></p>
                            <%--<p class="text-warning">يمكنك استخدم المتغيرات التالية فى نص الرسالة:</p>
                            <p>
                                <a href="javascript:setCode('@CarNo');">@CarNo : كود السيارة</a><br />
                                <a href="javascript:setCode('@CarModel');">@CarModel : نوع وموديل السيارة</a><br />
                                <a href="javascript:setCode('@PayPrice');">@PayPrice : سعر الشراء</a><br />
                                <a href="javascript:setCode('@PayPrice');">@PayPrice : سعر البيع</a><br />
                                <a href="javascript:setCode('@PayPrice');">@Advance : العربون</a><br />
                                <a href="javascript:setCode('@Remainder');">@Remainder : المتبقي</a><br />
                                <a href="javascript:setCode('@ArrivalDate');">@ArrivalDate : تاريخ الوصول</a><br />                                
                                <a href="javascript:setCode('@Username');">@Username : اسم الدخول للعميل</a><br />
                                <a href="javascript:setCode('@Password');">@Password : كلمة السر للعميل</a>
                            </p>--%>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-success savedate">
                    <i class="icon-save"></i>
                    حفظ
                </button>
                <button class="btn btn-small pull-left" data-dismiss="modal" aria-hidden="true">
                    إلغاء</button>
            </div>
        </div>
        <div id="deleteModal" class="modal hide fade" tabindex="-1">
            <div class="modal-header no-padding">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 id="removeModalLabel">
                    <i class="icon-remove"></i>حذف البيان
                </h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="removeForm">
                    <div class="alert alert-warning">
                        <label>هل أنت متأكد من حذف البيان  (  #<strong class="removeField"></strong>  ) الذي تم اختياره؟</label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-danger pull-right btn-delete">
                    <i class="icon-trash"></i>
                    تأكيد الحذف
                </button>
            </div>
        </div>
    </div>
    <!--balance-->
    <div id="checkBalance" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3>رصيد الرسائل</h3>
        </div>
        <div class="modal-body">
            <p class="text-info" data-rel="tooltip" title="مثال ذلك: الرصيد = 10,000 رساله &#247; تكلفة الرساله الواحدة 5.5 فلس = 550"><i class="icon-warning-sign bigger-150"></i>&nbsp;رصيد الرسائل = الباقة (عدد الرسائل) &#247; سعر الرسالة الواحدة</p>
            <iframe src="https://mshastra.com/balance.asp?user=20078016&pwd=2pnpr4" frameborder="0" scrolling="no" width="100%" height="100px"></iframe>
        </div>
        <div class="modal-footer">
            <button class="btn btn-small pull-left" data-dismiss="modal" aria-hidden="true">
                إنهاء</button>
        </div>
    </div>
    <script src="/Scripts/App/DefaultGridManager.min.js?v=1.1"></script>
    <script src="/Scripts/App/smsManager.min.js"></script>
</asp:Content>
