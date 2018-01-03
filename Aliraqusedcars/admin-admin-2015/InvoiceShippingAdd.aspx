<%@ Page Title="تسجيل فاتورة الشحن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoiceShippingAdd.aspx.cs" Inherits="ShippingInvoiceAddEdit"
    EnableEventValidation="false" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesShippView.aspx">الفواتير</a> <span class="divider"><i class="icon-angle-left"></i></span>
            </li>
            <li class="active">تسجيــل فاتورة الشحن</li>
        </ul>
    </div>
    <form runat="server" id="aspnetForm" clientidmode="Static">
        <div id="page-content" class="clearfix">
            <div class="page-header position-relative">
                <h1>فاتورة الشحن &nbsp; <span id="divSpinner"></span></h1>
            </div>
            <div class="row-fluid">
                <div class="form-horizontal">
                    <div class="span5">
                        <div class="control-group">
                            <label class="control-label" for="txtBol" tooltip="رقم الحجز للحاوية - Bill of Loading">BOL <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="txtBol" />
                                    <input type="hidden" id="ShippInvoiceID" value="0" />
                                    <input type="hidden" id="IsBol" value="0" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlDistination">جهة الوصول <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList class="required" ClientIDMode="Static" placeholder="اختر" Enabled="false" runat="server" ID="ddlDistination">
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator3"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlDistination" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group" id="divDepartment" runat="server">
                            <label class="control-label" for="ddlShipper">الشاحن<span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList class="required" ClientIDMode="Static" Enabled="false" data-placeholder="اختــر الشاحن"
                                        runat="server" ID="ddlShipper">
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator1"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlShipper" InitialValue=""
                                        ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlContainerSize">حجم الحاوية<span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList class="required" placeholder="اختر" runat="server" Enabled="false" ID="ddlContainerSize" ClientIDMode="Static">
                                        <asp:ListItem Text="20" Value="20" />
                                        <asp:ListItem Selected="True" Text="40" Value="40" />
                                        <asp:ListItem Text="45" Value="45" />
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator6"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlContainerSize" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CarsNo">عدد السيارات <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="CarsNo" Enabled="false" CssClass=" required" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="NavigationCoID" tooltip="شركة الملاحة">شركة الملاحة <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList ClientIDMode="Static" Enabled="false" class="required" data-placeholder="اختــر شركة الملاحة"
                                        runat="server" ID="NavigationCoID">
                                    </asp:DropDownList>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtNotes">ملاحظات</label>
                            <div class="controls">
                                <div class="span12">
                                    <textarea cols="6" rows="2" id="txtNotes"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="txtBillNo">رقم الفاتورة <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="txtBillNo" ClientIDMode="Static" required CssClass="required" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtBillDate">تاريخ الفاتورة <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <asp:TextBox Width="189" dir="ltr" runat="server" CssClass="date-picker required" required
                                                data-date-format="dd/mm/yyyy" ID="txtBillDate" ClientIDMode="Static" /><i class="icon-calendar"></i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label id="Label8" runat="server" class="control-label" for="txtArriveDate">تاريخ الوصول <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <asp:TextBox Width="189" dir="ltr" runat="server" CssClass="date-picker" data-date-format="dd/mm/yyyy"
                                                ID="txtArriveDate" ClientIDMode="Static" />
                                            <i class="icon-calendar"></i></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtContainerNo">رقم الحاوية <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="txtContainerNo" ClientIDMode="Static" dir="ltr" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label id="lbltxtLoadingCost" data-toggle="tooltip" title="السعر الافتراضي: 0" class="control-label" for="txtLoadingCost">سعر التحميل للحاوية<span class="text-error">!*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="txtLoadingCost" CssClass="required" ClientIDMode="Static" dir="ltr" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator12"
                                        Display="Dynamic" runat="server" ControlToValidate="txtLoadingCost" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label id="lbltxtShippPrice" data-toggle="tooltip" title="المبلغ الافتراضي: 0" class="control-label" for="txtShippPrice">الشحن البحرى للحاوية<span class="text-error">!*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="txtShippPrice" CssClass="required" ClientIDMode="Static" dir="ltr" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator4"
                                        Display="Dynamic" runat="server" ControlToValidate="txtShippPrice" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label id="lblTransportationPrice" data-toggle="tooltip" title="المبلغ الافتراضي: 0" class="control-label" for="TransportationPrice">قيمة النقل للحاوية<span class="text-error">!*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="TransportationPrice" CssClass=" required" ClientIDMode="Static" dir="ltr" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldV563alidator4"
                                        Display="Dynamic" runat="server" ControlToValidate="TransportationPrice" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h4 class="orange">السيارات بالحاوية</h4>
            <div class="hr hr-dotted hr-double"></div>
            <div class="row-fluid">
                <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            <th class="hidden">#</th>
                            <th class="hidden">#</th>
                            <th width="250px">السيارة</th>
                            <th>الشاصي</th>
                            <th>المدينة</th>
                            <th width="60px">Towing</th>
                            <th width="57px">التحميل</th>
                            <th width="79px">الشحن البحرى</th>
                            <th width="70px">قيمة التقطيع</th>
                            <th width="70px">قيمة النقل</th>
                            <th width="80px">مصاريف أخرى</th>
                            <th>ملاحظات</th>
                            <th width="57">الإجمالى</th>
                            <th width="30">تعديل</th>
                            <th class="hidden">التونك الافتراضي</th>
                            <th class="hidden">التقطيع الافتراضي</th>
                            <th class="hidden">النقل الافتراضي</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <table class="table table-striped table-bordered">
                    <tr class="">
                        <td class="cel-bg"><span class="pull-left">إجمالى الفاتورة <sub>$</sub>:</span></td>
                        <td style="background-color: bisque;" width="15%"><span runat="server" clientidmode="Static" id="lblInvoiceTotal">0</span></td>
                    </tr>
                </table>
                <asp:LinkButton runat="server" ID="LinkButton1" class="btn btn-app btn-success pull-left btnFinish hidden"
                    data-last="Finish" ValidationGroup="s"><i class="icon-save"></i> حفظ الفاتورة</asp:LinkButton>
            </div>
            <div class="row-fluid">
                <div id="editCarModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                    aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                        <h3 id="editModalLabel">
                            <i class="icon-edit"></i>
                            تعديل مصروفات السيارة
                        </h3>
                    </div>
                    <div class="modal-body">
                        <div class="row-fluid">
                            <div class="form-horizontal" id="divMyForm">
                                <div class="span12">
                                    <div class="control-group">
                                        <label class="control-label" for="model">السيارة</label>
                                        <div class="controls">
                                            <div class="span12">
                                                <input type="text" disabled="disabled" name="model" class="form-control car-model" value="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="ChassisNo">الشاصي</label>
                                        <div class="controls">
                                            <div class="span12">
                                                <input type="hidden" id="CarID" value="0" />
                                                <asp:TextBox runat="server" Enabled="false" ID="ChassisNo" ClientIDMode="Static" />
                                                &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredsFieldValidator10"
                                                    Display="Dynamic" runat="server" ControlToValidate="ChassisNo" ValidationGroup="car"
                                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="region">المدينة</label>
                                        <div class="controls">
                                            <div class="span12">
                                                <input type="text" disabled="disabled" name="region" class="form-control car-region" value="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="txtTowingCost">Towing <span class="text-error">*</span> <i class="icon-info-sign text-info default-towing" data-rel="tooltip" title="القيمة الافتراضية: 0"></i></label>
                                        <div class="controls">
                                            <div class="span12">
                                                <asp:TextBox runat="server" ID="txtTowingCost" data-value="0" Text="0" ClientIDMode="Static" dir="ltr" required />
                                                &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator11"
                                                    Display="Dynamic" runat="server" ControlToValidate="txtTowingCost" ValidationGroup="car"
                                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="txtCuttingCost">قيمة التقطيع <i class="icon-info-sign text-info default-part" data-rel="tooltip" title="القيمة الافتراضية: 0"></i></label>
                                        <div class="controls">
                                            <div class="span12">
                                                <asp:TextBox runat="server" ID="txtCuttingCost" data-value="0" Text="0" ClientIDMode="Static" dir="ltr" />
                                                &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator13"
                                                    Display="Dynamic" runat="server" ControlToValidate="txtCuttingCost" ValidationGroup="car"
                                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="TransOnCar">قيمة النقل <i class="icon-info-sign text-info default-trans" data-rel="tooltip" title="القيمة الافتراضية: 0"></i></label>
                                        <div class="controls">
                                            <asp:TextBox runat="server" ID="TransOnCar" data-value="0" Text="0" ClientIDMode="Static" dir="ltr" />
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="txtExtraCost">مصاريف أخرى </label>
                                        <div class="controls">
                                            <asp:TextBox runat="server" ID="txtExtraCost" Text="0" ClientIDMode="Static" dir="ltr" />
                                            &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator9"
                                                Display="Dynamic" runat="server" ControlToValidate="txtExtraCost" ValidationGroup="car"
                                                ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="Notes">ملاحظات</label>
                                        <div class="controls">
                                            <asp:TextBox TextMode="MultiLine" runat="server" ID="Notes" ClientIDMode="Static" />
                                            <input type="hidden" id="BillDetailsID" value="0" />
                                            <input id="indexUpdate" value="0" type="hidden" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id="btnSave" class="btn btn-success btnAddCar" aria-hidden="true" validationgroup="car">
                            <i class="icon-save"></i>
                            حفــظ</button>
                        <button class="btn" data-dismiss="modal" aria-hidden="true">
                            إلغاء</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <script src="/scripts/app/ShippInvoicesManager.js?v=2.9"></script>
</asp:Content>