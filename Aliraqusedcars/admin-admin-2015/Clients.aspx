<%@ Page Title=" شركة العراق - العملاء" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="Clients.aspx.cs" Inherits="Clients" ViewStateMode="Disabled" EnableViewState="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="<%: Settings.Config.CDN%>/App_Themes/iraq/clients-manager.min.css?v=1.0" rel="stylesheet" />
    <link href="<%: Settings.Config.CDN%>/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="available/1/carslist.aspx">فاتورة بيع</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ClientsPaymentsAdd.aspx">إيداع عميل</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">عــرض العــملاء</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>عــرض العـــملاء
            </h1>
        </div>
        <div class="row-fluid">
            <div class="span3">
                <a href="javascript:void(0);" class="btn btn-mini btn-primary addition" data-dismiss="modal" aria-hidden="true" data-rel="tooltip" data-original-title="اضافة عميل جديد"><i class="icon-plus"></i>&nbsp;عميل جديد</a>
            </div>
            <div class="span9 bolder">
                <a class="by-char" data-toggle="tooltip" title="بحث بحرف ا" href="clients.aspx#c=ا">ا</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ب" href="clients.aspx#c=ب">ب</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ت" href="clients.aspx#c=ت">ت</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ث" href="clients.aspx#c=ث">ث</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ج" href="clients.aspx#c=ج">ج</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ح" href="clients.aspx#c=ح">ح</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف خ" href="clients.aspx#c=خ">خ</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف د" href="clients.aspx#c=د">د</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ذ" href="clients.aspx#c=ذ">ذ</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ر" href="clients.aspx#c=ر">ر</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ز" href="clients.aspx#c=ز">ز</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف س" href="clients.aspx#c=س">س</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ش" href="clients.aspx#c=ش">ش</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ص" href="clients.aspx#c=ص">ص</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ض" href="clients.aspx#c=ض">ض</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ط" href="clients.aspx#c=ط">ط</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ظ" href="clients.aspx#c=ظ">ظ</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ع" href="clients.aspx#c=ع">ع</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف غ" href="clients.aspx#c=غ">غ</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ف" href="clients.aspx#c=ف">ف</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ق" href="clients.aspx#c=ق">ق</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ك" href="clients.aspx#c=ك">ك</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ل" href="clients.aspx#c=ل">ل</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف م" href="clients.aspx#c=م">م</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ن" href="clients.aspx#c=ن">ن</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف هـ" href="clients.aspx#c=ه">هـ</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف و" href="clients.aspx#c=و">و</a>&nbsp;
                        <a class="by-char" data-rel="tooltip" title="بحث بحرف ي" href="clients.aspx#c=ي">ي</a>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12 widget-container-span">
                <div class="widget-box widget-box-tabs" id="clients-widget-box">
                    <div class="widget-header">
                        <div class="widget-toolbar no-border">
                            <ul class="nav nav-tabs" id="clientsTabs">
                                <li class="active">
                                    <a data-toggle="tab" data-id="0" data-action="reload" href="clients.aspx#activeClients"><i class="icon-group"></i>العملاء ذوى الحساب المفتوح</a>
                                </li>
                                <li class="hidden-480">
                                    <a data-toggle="tab" data-id="1" data-action="reload" href="clients.aspx#finishedClients">العملاء ذوى الحساب المسدد</a>
                                </li>
                                <li class="hidden-480">
                                    <a data-toggle="tab" data-id="2" data-action="reload" href="clients.aspx#allClients">نتيجه بحث العملاء</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main no-padding">
                            <div class="tab-content no-padding">
                                <div id="activeClients" class="tab-pane in active">
                                    <table id="listItems" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="25%">اسم العميل</th>
                                                <th class="hidden-480">الهاتف</th>
                                                <th class="hidden-480">Username</th>
                                                <th>الرصيد</th>
                                                <th title="المطلوب حالياً">المطلوب</th>
                                                <th>الصافي:
                                                    <span class="netTotal red"></span>
                                                </th>
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
                                                <th></th>
                                                <th class="all-required"></th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <form runat="server" id="aspnetForm" clientidmode="Static">
                <div id="ClientModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                    aria-hidden="true">
                    <div id="wizardClient" class="modal-header" data-target="#modal-step-contents">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                        <h3>بيانات العميل</h3>
                    </div>
                    <div class="modal-body step-content" id="modal-step-contents" style="overflow-y: auto;">
                        <fieldset id="formMain" class="form-horizontal">
                            <input type="hidden" value="0" id="ClientID" />
                            <div class="control-group">
                                <label class="control-label" for="user_type">
                                    نوع العميل:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <select id="user_type" required class="required span10">
                                            <option value="1">دائم</option>
                                            <option value="2">مؤقت</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtName">
                                    اسم العميل/الحساب:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="txtName" CssClass="required span10" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValisdfdator5"
                                            Display="Dynamic" runat="server" ControlToValidate="txtName" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ParentID">الحساب الرئيسي:</label>
                                <div class="controls">
                                    <input type="text" id="MasterID" name="MasterID" class="select2 form-control" data-placeholder="اختياري" data-fn-name="ClientsMasterChilds_Names" />
                                </div>
                            </div>
                            <div class="client-options">
                                <div class="control-group">
                                    <label class="control-label" for="txtPhone">
                                        الجوال:<span title='حقل إجبارى' class="text-error">*</span></label>
                                    <div class="controls">
                                        <div>
                                            <asp:TextBox runat="server" ID="txtPhone" CssClass="required span5" ClientIDMode="Static" />&nbsp;
                                            <select class="form-control span5" id="countryCode">
                                                <option value="00971">الإمارات (00971)</option>
                                                <option value="00964">العراق (00964)</option>
                                                <option value="00962">الأردن (00962)</option>
                                                <option value="00968">عمان (00968)</option>
                                                <option value="00966">السعودية (00966)</option>
                                                <option value="00965">الكويت (00965)</option>
                                                <option value="00974">قطر (00974)</option>
                                                <option value="0020">مصر (0020)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="phone2">الجوال 2:</label>
                                    <div class="controls">
                                        <div>
                                            <input type="text" id="phone2" class="span5" />&nbsp;
                                            <select class="form-control span5" id="countryCode2">
                                                <option value="00971">الإمارات (00971)</option>
                                                <option value="00964">العراق (00964)</option>
                                                <option value="00962">الأردن (00962)</option>
                                                <option value="00968">عمان (00968)</option>
                                                <option value="00966">السعودية (00966)</option>
                                                <option value="00965">الكويت (00965)</option>
                                                <option value="00974">قطر (00974)</option>
                                                <option value="0020">مصر (0020)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="txtUsername">
                                        اسم المستخدم:<span title='حقل إجبارى' class="text-error">*</span></label>
                                    <div class="controls">
                                        <div>
                                            <asp:TextBox runat="server" ID="txtUsername" CssClass="required span10" ClientIDMode="Static" />
                                            &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequisssssFieldValidator5"
                                                Display="Dynamic" runat="server" ControlToValidate="txtUsername" ValidationGroup="s"
                                                ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="txtPassword">
                                        كلمة المرور:<span title='حقل إجبارى' class="text-error">*</span></label>
                                    <div class="controls">
                                        <div>
                                            <asp:TextBox runat="server" ID="txtPassword" CssClass="required span10" ClientIDMode="Static" />
                                            &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequisasassssFieldValidator5"
                                                Display="Dynamic" runat="server" ControlToValidate="txtPassword" ValidationGroup="s"
                                                ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="cbSMS">
                                        ارسال رسالة موبايل:</label>
                                    <div class="controls">
                                        <div>
                                            <input type="checkbox" runat="server" clientidmode="Static" id="cbSMS" />
                                            <label class="lbl" for="cbSMS">
                                                نعم! ارسل رسالة موبايل، فى حالة الرسائل الجماعية.</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Notes">
                                    ملاحظات:</label>
                                <div class="controls">
                                    <div class="span12">
                                        <textarea id="Notes" class="span10" cols="4" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="modal-footer">
                        <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                            إجبارية. </span><span class="sinpper"></span>
                        <asp:LinkButton ValidationGroup="s" ID="btnSave" class="btn btn-success btn-small btn-save" ClientIDMode="Static"
                            aria-hidden="true" runat="server">حفــظ <i class="icon-save"></i></asp:LinkButton>
                        <button class="btn btn-small" data-dismiss="modal" aria-hidden="true" id="cancelModal">
                            إلغاء</button>
                    </div>
                </div>
            </form>
            <!--send sms-->
            <div id="addSMS" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="smsModalLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="smsModalLabel"><i class="icon-edit"></i>ارسل بيانات الدخول للعميل</h3>
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
            <!--contract-->
            <div id="contracts" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="contractLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="contractLabel"><i class="icon-list-ul"></i>
                        عقود البيع للعميل</h3>
                </div>
                <div class="modal-body">
                    <h4 class="grey">عقود سيارات كاملة</h4>
                    <div class="row-fluid list-contracts full-Contracts"></div>
                    <div class="space"></div>
                    <hr class="hr hr-18" />
                    <h4 class="grey">عقود سيارات سكراب/تقطيع</h4>
                    <div class="row-fluid list-contracts part-Contracts"></div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-small pull-left" data-dismiss="modal" aria-hidden="true">
                        إنهـــاء</button>
                </div>
            </div>
            <!--end contract-->
        </div>
    </div>
    <script src="<%: Settings.Config.CDN%>/Scripts/App/ClientsManager.min.js?v=4.3"></script>
    <script>ClientsManager.Init();</script>
    <script src="<%: Settings.Config.CDN%>/Scripts/select2/select2.min.js?v=1.5"></script>
    <script async src="<%: Settings.Config.CDN%>/Scripts/select2/select2-optinal.min.js?v=2.1"></script>
    <script src="<%: Settings.Config.CDN%>/Scripts/utilities/stickyTableHeader.min.js"></script>
    <style>
        .list-contracts.row-fluid .span4,
        list-contracts.row-fluid .span4:first-child {
            margin: 3px !important;
        }

        #contracts .modal-body {
            overflow-y: auto;
        }

        .widget-box {
            margin: 0 !important
        }
    </style>
</asp:Content>
