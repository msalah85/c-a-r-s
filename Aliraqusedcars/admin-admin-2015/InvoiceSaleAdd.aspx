<%@ Page Title="تسجيل فاتورة البيع" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="InvoiceSaleAdd.aspx.cs" Inherits="IraqInvoiceSale_AddNew"
    EnableEventValidation="false" UICulture="en-GB" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="InvoicesSaleview.aspx">فواتير البيع</a> <span class="divider"><i class="icon-angle-left"></i></span>
            </li>
            <li><a href="available/1/carslist.aspx">بيع سيارة أخري</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">اضافة فاتورة البيع</li>
        </ul>
    </div>
    <form runat="server" id="aspnetForm" clientidmode="Static">
        <div id="page-content" class="clearfix">
            <div class="page-header position-relative">
                <h1>فاتورة البيع <small>للسيارة رقم: <span class="carid"></span></small>
                </h1>
            </div>
            <div class="row-fluid">
                <div class="sale-message">
                    <asp:Panel class="alert alert-block hidden" ID="divError" runat="server">
                        <button type="button" class="close" data-dismiss="alert">
                            <i class="icon-remove"></i>
                        </button>
                        <strong>
                            <asp:Label ID="lblError" runat="server" /></strong>
                    </asp:Panel>
                </div>
            </div>
            <div class="row-fluid">
                <div class="form-horizontal">
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="lblPayType">نوع الشراء</label>
                            <div class="controls">
                                <div class="span12">
                                    <label class="form-control" id="lblPayType" runat="server">
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtTrxDate">تاريخ الفاتورة<span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <asp:TextBox Width="189" dir="ltr" runat="server" CssClass="required date-picker current-date" ClientIDMode="Static"
                                                data-date-format="dd/mm/yyyy" ID="txtTrxDate" /><i class="icon-calendar"></i>&nbsp;<asp:RequiredFieldValidator
                                                    SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator2" Display="Dynamic"
                                                    runat="server" ControlToValidate="txtTrxDate" ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlSaleTypes">طريقة البيع <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:RadioButtonList class="required radioList" RepeatDirection="Horizontal" runat="server" ClientIDMode="Static"
                                        ID="ddlSaleTypes" RepeatLayout="Flow">
                                        <asp:ListItem Text="نقداً" Value="1" />
                                        <asp:ListItem Text="آجل" Value="2" />
                                    </asp:RadioButtonList>
                                    <asp:Label runat="server" CssClass="inline" ID="lblDemandAmount"></asp:Label>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator3"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlSaleTypes" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtSalePrice">سعر البيع <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="txtSalePrice" Enabled="false" class="required" data-toggle="tooltip" ToolTip="سعر بيع السيارة الافتراضى" ClientIDMode="Static" />
                                    <asp:Image ID="CarCostTotal" title="الـربـح: 0" CssClass="profit" data-toggle="tooltip" runat="server" ImageUrl="/App_Themes/iraq/images/warning.png" />
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator4"
                                        Display="Dynamic" runat="server" ControlToValidate="txtSalePrice" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="hr hr-dotted">
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlClient">اسم العميل <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList placeholder="اختر" CssClass="chzn-select chosen-rtl required" runat="server" ClientIDMode="Static"
                                        ID="ddlClient">
                                    </asp:DropDownList><!-- add new -->
                                    <a data-toggle="modal" href="#ClientModal"><i class="icon-plus-sign-alt"></i>اضافة عميل</a>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator6"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlClient" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlDistination">جهة الوصول </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList Enabled="false" class="required" placeholder="اختر" runat="server" ClientIDMode="Static"
                                        ID="ddlDistination">
                                    </asp:DropDownList>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtArriveDate">تاريخ الوصول </label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <asp:TextBox Enabled="false" dir="ltr" runat="server" CssClass="date-picker" data-date-format="dd/mm/yyyy" ClientIDMode="Static"
                                            ID="txtArriveDate" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Shipper">الشاحن</label>
                            <div class="controls">
                                <div class="span12">
                                    <label runat="server" id="Shipper"></label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="RegionEn">المدينة</label>
                            <div class="controls">
                                <div class="span12">
                                    <label runat="server" id="RegionEn"></label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtNotes">ملاحظات </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="txtNotes" TextMode="MultiLine" Height="70" class="span12" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                        <div class="hr hr-dotted">
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="ddlChassisNo">الشاصي </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:Label ID="ddlChassisNo" runat="server" CssClass="text-success" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlLotNo">رقم اللوت</label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:Label ID="ddlLotNo" runat="server" CssClass="text-warning" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="lblCarModel">موديل السيارة </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:Label ID="lblCarModel" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="lblCarColor">لون السيارة </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:Label ID="lblCarColor" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="lblContainerNo">رقم الحاوية </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:Label ID="lblContainerNo" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group hidden">
                            <label class="control-label" for="ddlCarSize">حجم السيارة <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="ddlCarSize" ClientIDMode="Static">
                                        <asp:ListItem Value="1" Text="عادى" />
                                        <asp:ListItem Value="2" Text="كبير" />
                                    </asp:DropDownList>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlCarSize">حساب السيارة</label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:HiddenField ID="ShippingCalcIDID" Value="1" runat="server" ClientIDMode="Static" />
                                    <asp:Label ID="ShippingCalcID" runat="server"></asp:Label>
                                </div>
                            </div>
                        </div>
                        <div class="hr hr-dotted">
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="lblPayPrice">سعر الشراء </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox Enabled="false" runat="server" ID="lblPayPrice" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group" id="DivlblCarSizePrice" runat="server">
                            <label class="control-label" for="lblCarSizePrice">كلفة حجم السيارة </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox Enabled="false" runat="server" ID="lblCarSizePrice" Text="0" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label id="divlblPayTypePriceSum" class="control-label" for="lblPayTypePriceSum">عمولة الشركة </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox Enabled="false" runat="server" ID="lblPayTypePriceSum" Text="0" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CarDiscount">مبلغ الخصم</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="CarDiscount" class="form-control required" name="CarDiscount" data-rule-number="true" required value="0" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CarMoreCost">مبلغ الزيادة</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="CarMoreCost" name="CarMoreCost" class="form-control required" data-rule-number="true" required value="0" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label id="lblFullPriceTitle" title="الـربـح: 0" data-toggle="tooltip" class="control-label profit" for="lblFullPrice">الإجمالى !</label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox Enabled="false" runat="server" ID="lblFullPrice" Text="0" ClientIDMode="Static" />
                                    <a href="javascript:void(0);" title="اعتمد سعر البيع" data-toggle="tooltip" class="btn btn-mini btn-success btnApprove"><i class="icon-ok"></i></a>
                                </div>
                            </div>
                        </div>
                        <!--/row-->
                        <div class="form-actions">
                            <asp:LinkButton runat="server" ID="btnSave" ClientIDMode="Static" class="btn btn-success" data-last="Finish"
                                ValidationGroup="s"><i class="icon-save"></i> حفـــظ</asp:LinkButton>
                            <asp:HiddenField runat="server" ID="hfId" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="hfCarID" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="lblCarPrice" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="lblPayTypePrice" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="hfRegionJoCoast" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="hfClientCashComm" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="hfClientCreditComm" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="hfExtraCashComm" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="hfExtraCreditComm" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="hfUserType1CarCost" Value="0" ClientIDMode="Static" />
                            <asp:HiddenField runat="server" ID="hfTowingLoadingOF" Value="0" ClientIDMode="Static" />
                            <input type="hidden" value="1" id="user_type" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:HiddenField runat="server" ID="hfCarDefaultCosts" Value="0" ClientIDMode="Static" />
        <asp:HiddenField runat="server" ID="PayTypeID" Value="0" ClientIDMode="Static" />
        <div class="row-fluid">
            <div id="ClientModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="editModalLabel">
                        <i class="icon-plus"></i>
                        اضافة عميل جديد
                    </h3>
                </div>
                <div class="modal-body">
                    <fieldset id="formMain" class="form-horizontal">
                        <div class="control-group">
                            <label class="control-label" for="txtName">اسم العميل:<span title="حقل إجبارى" class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="txtName" name="txtName" class="required span10" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtPhone">
                                رقم الجوال:</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="txtPhone" class="span5" />&nbsp;
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
                    <button id="btnSaveClient" class="btn btn-success btn-small btnSaveClient" data-last="إنهاء "
                        aria-hidden="true">
                        <i class="icon-save"></i>
                        حفظ 
                    </button>
                    <button class="btn btn-small" data-dismiss="modal" aria-hidden="true" id="cancelModal">
                        إلغاء</button>
                </div>
            </div>
        </div>
    </form>
    <script src="/Scripts/App/InvoiceSaleAdd.min.js?v=3.1" type="text/javascript"></script>
    <script src="/Scripts/App/add-client-fast.min.js?v=2.1"></script>
    <script>
        $('#CarDiscount,#CarMoreCost').on('focus click', function () { $(this).select(); });
    </script>
</asp:Content>