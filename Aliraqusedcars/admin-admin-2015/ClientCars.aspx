<%@ Page Title="سيارات العميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ClientCars.aspx.cs" Inherits="ClientCars" %>

<asp:Content ID="Contenst2" ContentPlaceHolderID="head" runat="Server">
    <link href="<%: Settings.Config.CDN%>/App_Themes/iraq/client-cars-custom.min.css?v=1.1" rel="stylesheet" />
    <link href="<%: Settings.Config.CDN%>/Scripts/select2/select2.min.css?v=1.1" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <input type="hidden" value="0" id="doneFlag" />
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="clients.aspx">العـــملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="Home.aspx" class="lnk-pay">حوالات العميل</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">حـسـاب العميل</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>حـسـاب العميل: <span class="clientName orange"></span>
            </h1>
        </div>
        <div class="row-fluid">
            <div class="span4 hidden-print">
                <a data-toggle="tooltip" href="ClientDiscounts.aspx?id=0" id="addnew-dicount" data-rel="tooltip" title="اضافة خصم للعميل" class="btn btn-small btn-danger addition">+ خصم</a>
                <a href="ClientExtras.aspx?id=0" id="addnew-extra" class="btn btn-small btn-warning addition" data-dismiss="modal" aria-hidden="true" data-rel="tooltip" title="اضافة زيادة على العميل">+ زيادة</a>
                <a class="btn btn-small btn-info addition lnk-pay" data-dismiss="modal" aria-hidden="true" data-rel="tooltip" title="حوالات العميل">الحوالات</a>
                <a href="ClientsPaymentsAdd.aspx" class="btn btn-small btn-success addition addPay" data-dismiss="modal" aria-hidden="true" data-rel="tooltip" title="اضافة إيداع للعميل">+ إيداع</a>
                <a href="ClientBonusAdd.aspx" class="btn btn-small btn-pink addition addBonus" data-dismiss="modal" aria-hidden="true" data-rel="tooltip" title="اضافة تخفيض/تعويض/بونص/منحة للعميل">+ تخفيض
                    <span class="badge badge-warning badge-right newBonus hidden">1</span>
                </a>
            </div>
            <div class="span4 hidden-print">
                <form class="form-inline">
                    <label for="clients">عميل آخر:</label>
                    <input id="clients" name="id" class="select2 rtl" data-fn-name="Clients_SelectNames3" type="text" value="" dir="rtl" />
                    <button type="submit" id="clients_search" class="btn btn-mini btn-info">فتح <i class="icon-double-angle-left"></i></button>
                </form>
                <script>
                    $('#clients_search').click(function (e) {
                        e.preventDefault();
                        var selected_client = $('#clients.select2').val();
                        if (selected_client != '') {
                            window.location.href = 'clientcars.aspx?id=' + selected_client;
                        }
                    });
                </script>
            </div>
            <div class="span4">
                <div class="alert alert-block">
                    <div class="clearfix">
                        <span class="grid3">الرصيد: <a href="#" title="حوالات العميل" class="lnk-pay"><strong class="debit green">0</strong></a>
                        </span>
                        <span class="grid3">المطلوب: <strong class="totalRequired red">0</strong></span>
                        <span class="grid3">الصافى: <strong data-toggle="tooltip" title="الصافي= المطلوب - الرصيد" class="clear orange">0</strong>
                            <a class="btn-money-back hidden" data-rel="tooltip" data-toggle="modal" data-target="#moneyBack" href="#moneyBack" title="استرداد مبلغ للعميل"><i class="icon-money"></i></a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12 widget-container-span">
                <div class="widget-box widget-box-tabs" id="clients-widget-box">
                    <div class="widget-header hidden-print">
                        <div class="widget-toolbar no-border">
                            <ul class="nav nav-tabs" id="carTabs">
                                <li class="active">
                                    <a data-toggle="tab" data-id="0" data-action="reload" href="ClientCars.aspx#cars"><i class="icon-car"></i>سيارات العميل</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" data-id="1" data-action="reload" href="ClientCars.aspx#cars">السيارات المسددة</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main no-padding">
                            <div class="tab-content no-padding">
                                <div id="cars" class="tab-pane in active">
                                    <table id="listItems" class="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th width="80" title="رقم السيارة"># السيارة</th>
                                                <th width="55">صورة</th>
                                                <th width="20%">نوع السيارة</th>
                                                <th>سعر البيع</th>
                                                <th>العربون</th>
                                                <th>المتبقي</th>
                                                <th>الشحن</th>
                                                <th>الورشة</th>
                                                <th>المطلوب</th>
                                                <th width="85">الموقع</th>
                                                <th width="120">ورق السيارة</th>
                                                <th width="40" title="إلغاء الفاتورة" class="hidden-print center">إلغاء</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="100%">جاري تحميل البيانات...</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="3"><span class="pull-left">الإجمالى:</span></th>
                                                <th title="إجمالى سعر البيع"></th>
                                                <th title="إجمالى العربون"></th>
                                                <th title="إجمالى المتبقي على السيارات">
                                                    <div class="btn-group dropup">
                                                        <button data-toggle="dropdown" class="btn btn-small dropdown-toggle">
                                                            <span class="caret"></span>&nbsp;
                                                        </button>
                                                        <ul class="dropdown-menu dropdown-default pull-right">
                                                            <li>
                                                                <a>واصل: <span class="arrived-delayed"></span></a>
                                                            </li>
                                                            <li>
                                                                <a>غير واصل: <span class="not-arrived-delayed"></span></a>
                                                            </li>
                                                            <li>
                                                                <a>الاجمالى: <span class="total-delayed"></span></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </th>
                                                <th colspan="5"></th>
                                                <th></th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div id="parts" class="tab-pane">
                                    <table id="listItems2" class="table table-bordered table-hover" width="100%">
                                        <thead>
                                            <tr>
                                                <th width="59">م
                                                </th>
                                                <th width="100">التاريخ
                                                </th>
                                                <th>رقم الفاتورة
                                                </th>
                                                <th>المبلغ <sub>$</sub>
                                                </th>
                                                <th>الخصم <sub>$</sub>
                                                </th>
                                                <th colspan="2">المطلوب <sub>$</sub>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="100%">جاري تحميل البيانات...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="hr hr8 hr-double hr-dotted">
                                </div>
                                <div class="row-fluid hidden-print">
                                    <div class="span12">
                                        <span class="pull-left footer-summary">رصيد العميل: <a href="#" title="حوالات العميل" class="lnk-pay"><strong class="debit green">0</strong></a>،  وإجمالى المطلوب: <strong class="totalRequired red">0</strong>،   والصافى: <strong data-toggle="tooltip" title="الصافي= المطلوب - الرصيد" class="clear orange">0</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- next prev-->
                <a class="pull-left btn btn-info nextCar hidden hidden-print" id="nextClient" title="صفحة العميل التالي"><i class="icon-arrow-left"></i>التالي</a>
                <a class="btn btn-info prevCar hidden hidden-print" id="prevClient" title="صفحة العميل السابق">السابق <i class="icon-arrow-right"></i></a>
            </div>
        </div>
        <form id="aspnetForm">
            <div id="paymentModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="addModalLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="addModalLabel">
                        <i class="icon-edit"></i>
                    </h3>
                </div>
                <div class="modal-body">
                    <fieldset id="formMain" class="form-horizontal">
                        <div class="control-group">
                            <div class="alert alert-warning">
                                <strong>تأكيد:</strong>
                                هل أنت متأكد من سداد المبلغ الحالى؟  <span class="Amount"></span>
                                <input type="hidden" value="0" id="CarID" />
                                <input type="hidden" value="0" id="InstallmentTypeID" />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="submit" tabindex="0" class="btn btn-success" id="paycar" aria-hidden="true" data-text="سداد">سـداد</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
            <div id="placeModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="placeModalLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="placeModalLabel">
                        <i class="icon-location"></i>وصول السيارة
                    </h3>
                </div>
                <div class="modal-body">
                    <fieldset id="placeForm" class="form-horizontal">
                        <div class="control-group">
                            <input type="hidden" value="0" name="CarID" />
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Arrived"><span>واصله</span></label>
                            <div class="controls">
                                <label style="display: inline">
                                    <input id="Arrived" class="ace ace-switch ace-switch-6" type="checkbox" />
                                    <span class="lbl"></span>
                                    <span class="text-warning">علامة &radic; تعنى واصله</span>
                                </label>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ReceiveWithPaper"><span>تاريخ الوصول الفعلى</span></label>
                            <div class="controls">
                                <input type="text" class="date-picker" id="ReceiveWithPaper" disabled value="" />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="submit" tabindex="0" class="btn btn-success" aria-hidden="true">تأكيد وصول السيارة</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
            <div id="paperModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="paperModalLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="paperModalLabel">
                        <i class="icon-location"></i>تسليم أوراق السيارة
                    </h3>
                </div>
                <div class="modal-body">
                    <fieldset id="paperForm" class="form-horizontal">
                        <p class="text-warning">برجاء اختيار تسليم السيارة بأوراقها أو بدون أوراقها للعميل.</p>
                        <div class="control-group">
                            <input type="hidden" value="0" id="paperCarID" />
                            <input type="hidden" value="0" id="paperInvoiceID" />
                            <input type="hidden" value="0" id="paperDestID" />
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ReceiveWithPaperNULL"><span>تسليم السيارة</span></label>
                            <div class="controls">
                                <span class="radioList">
                                    <input disabled id="ReceiveWithPaperNULL" type="radio" name="ReceiveWithPaper" value="NULL" checked />
                                    <label for="ReceiveWithPaperNULL" class="lbl">لم تسلم</label>
                                    <input id="ReceiveWithPaperTrue" type="radio" name="ReceiveWithPaper" value="false" />
                                    <label for="ReceiveWithPaperTrue" class="lbl">بدون الورق</label>
                                    <input id="ReceiveWithPaperFalse" type="radio" name="ReceiveWithPaper" value="true" />
                                    <label for="ReceiveWithPaperFalse" class="lbl">بالورق </label>
                                </span>
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="alert alert-block alert-info savedPaper">
                                &nbsp;<strong>نوع الورق:</strong>
                                <p class="inline"></p>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="submit" tabindex="0" class="btn btn-success" aria-hidden="true">تسليم السيارة</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
            <div id="partsDiscountModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="partsDiscountLbl"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="partsDiscountLbl">اضافة خصم على الفاتورة
                    </h3>
                </div>
                <div class="modal-body">
                    <fieldset id="partsDiscountForm" class="form-horizontal">
                        <p class="text-warning">ادخل مبلغ الخصم على الفاتورة، وسوف يتم خصمه من المبلغ المتبقي.</p>
                        <div class="control-group">
                            <input type="hidden" value="0" id="PartID" />
                            <input type="hidden" value="0" id="invVal" />
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="partDiscountVal">مبلغ الخصم</label>
                            <div class="controls">
                                <input id="partDiscountVal" type="text" name="partDiscountVal" value="0" />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="submit" tabindex="0" class="btn btn-success bntPartsDiscount" aria-hidden="true">حفــــظ</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
            <div id="partsPaymentModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="partsPayLbl"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="partsPayLbl">سداد الفاتورة
                    </h3>
                </div>
                <div class="modal-body">
                    <fieldset id="partsPayForm" class="form-horizontal">
                        <p class="text-warning bolder">تنبـيه: سوف يتم خصم المبلغ من رصيد العميل، وترحيلها إلى الفواتير المسددة.</p>
                        <div class="control-group">
                            <input type="hidden" value="0" id="PID" />
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="partPayVal">مبلغ الفاتورة $</label>
                            <div class="controls">
                                <input id="partPayVal" type="text" name="partPayVal" value="0" readonly />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="submit" tabindex="0" class="btn btn-success bntPartsPay" aria-hidden="true">حفــــظ</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
            <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="cancelLbl">إلغاء الفاتورة
                    </h3>
                </div>
                <div class="modal-body">
                    <div id="cancelForm" class="form-horizontal">
                        <div class="control-group">
                            <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء فاتـــورة البـــيع وحـذفـها من حســـاب العمـــيل تماماً، ونقل السيارة إلى قائمة السيارات المعروضه للبيع.</p>
                        </div>
                        <div class="control-group">
                            <label class="control-label">رقم السيارة</label>
                            <div class="controls">
                                <input id="cancelCarID" class="form-control" type="text" value="0" readonly />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">نوع السيارة</label>
                            <div class="controls">
                                <input id="cancelCarModel" class="form-control" type="text" value="0" readonly />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">رقم فاتورة البيع</label>
                            <div class="controls">
                                <input id="cancelInvoiceID" class="form-control" type="text" value="0" readonly />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="cancelNotes">السبب: <span class="red">*</span></label>
                            <div class="controls">
                                <textarea class="form-control required" name="cancelNotes" required id="cancelNotes" cols="5" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-danger bntCancelInvoice" aria-hidden="true" data-text="تنفيذ الحذف">تنفيذ الحذف</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        تجاهل</button>
                </div>
            </div>
            <div id="undoInstallmentModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="undoModalLabel" aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="undoModalLabel"><i class="icon-undo"></i>تراجع عن السداد</h3>
                </div>
                <div class="modal-body">
                    <fieldset id="undoForm" class="form-horizontal">
                        <p class="red">برجاء تأكيد إلغاء (تراجع عن) السداد</p>
                        <div class="control-group">
                            <input type="hidden" value="0" id="undoClientID" />
                            <input type="hidden" value="0" id="undoInstallmentTypeID" />
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="undoCarID"><span>رقم السيارة:</span></label>
                            <div class="controls">
                                <label id="undoCarID">0</label>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="undoCarModel"><span>الموديل:</span></label>
                            <div class="controls">
                                <label id="undoCarModel"></label>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="undoNotes">السبب:</label>
                            <div class="controls">
                                <textarea id="undoNotes" cols="5" rows="5"></textarea>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-danger" aria-hidden="true" data-text="تراجع عن السداد">تراجع عن السداد</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">إلغاء</button>
                </div>
            </div>
            <!--client`s money back modal-->
            <div id="moneyBack" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4><i class="icon-money"></i>
                        استرداد مبلغ من الرصيد للعميل</h4>
                </div>
                <div class="modal-body">
                    <fieldset id="moneyBackForm" class="form-horizontal">
                        <p class="alert alert-danger">استرداد مبلغ من الرصيد للعميل، يرجي مراجعة القيمة المستردة:</p>
                        <div class="control-group">
                            <input type="hidden" value="0" name="clientID" />
                        </div>
                        <div class="control-group">
                            <label class="control-label">العميل:</label>
                            <div class="controls">
                                <label class="clientName"></label>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">المبلغ <sub>$</sub></label>
                            <div class="controls">
                                <input type="number" name="money" class="form-control required" required />
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="modal-footer">
                    <a class="btn btn-success" href="ReceiptPaymentsAdd.aspx?ids=" aria-hidden="true">سند صرف</a>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">تراجع</button>
                </div>
            </div>
            <!--end client`s money back modal-->
        </form>
    </div>
    <script src="<%: Settings.Config.CDN%>/Scripts/App/ClientCarsManager.js?v=1.8"></script>
    <script type="text/javascript">
        pageManager.Init();
        $('#Arrived').change(function () {
            if ($(this).prop("checked"))
                $('#ReceiveWithPaper').removeAttr('disabled', 'disabled');
            else
                $('#ReceiveWithPaper').attr('disabled', 'disabled');
        });
    </script>
    <script src="<%: Settings.Config.CDN%>/Scripts/select2/select2.min.js?v=1.5"></script>
    <script async src="<%: Settings.Config.CDN%>/Scripts/select2/select2-optinal.min.js?v=1.5"></script>
    <script src="<%: Settings.Config.CDN%>/Scripts/utilities/stickyTableHeader.min.js"></script>
</asp:Content>
