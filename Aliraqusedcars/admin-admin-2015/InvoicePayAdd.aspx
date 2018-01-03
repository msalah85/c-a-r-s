<%@ Page Title="تسجيل فاتورة الشراء" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" EnableEventValidation="false" Culture="ar-AE"
    AutoEventWireup="true" CodeFile="InvoicePayAdd.aspx.cs" Inherits="TransactionAddEdit" EnableViewState="false" ViewStateMode="Disabled" EnableViewStateMac="true" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <style type="text/css">
        .chosen-container {
            min-width: 99.9% !important;
        }

        .control-group {
            margin-bottom: 10px !important;
        }

        .client-not-has-abuyer input[type=checkbox] {
            opacity: 1;
            margin-right: -10px;
        }

        .client-not-has-abuyer label {
            display: inline;
            margin-right: 10px;
            font-size: 16px;
            font-weight: 700;
            color: darkcyan;
        }
        /*select, input[type="text"], textarea {
            border: 1px solid #d5d5d5;
        }*/
        .chosen-container > .chosen-single, [class*="chosen-container"] > .chosen-single {
            line-height: 27px;
            height: 27px;
        }
    </style>
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesPayView.aspx">فواتير الشراء</a> <span class="divider"><i class="icon-angle-left"></i></span>
            </li>
            <li class="active">تسجيــل بيانات سيــارة</li>
        </ul>
    </div>
    <form runat="server" id="aspnetForm" clientidmode="Static">
        <div id="page-content" class="clearfix">
            <div class="page-header position-relative">
                <h1>اضافة/تعديل سيــارة
                </h1>
            </div>
            <div class="row-fluid">
                <asp:Panel class="alert alert-block" ID="divError" runat="server" Visible="false">
                    <button type="button" class="close" data-dismiss="alert">
                        <i class="icon-remove"></i>
                    </button>
                    <strong>
                        <asp:Label ID="lblError" runat="server" />
                    </strong>
                </asp:Panel>
                <div class="form-horizontal">
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="ddlInvoiceType">نوع الفاتورة <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:RadioButtonList ID="ddlInvoiceType" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow" CssClass="radioList" ClientIDMode="Static">
                                    <asp:ListItem Selected="True" Value="1" Text="شراء"></asp:ListItem>
                                    <asp:ListItem data-rel="tooltip" title="سوف تنتقل السيارة إلى قائمة سيارات البيع السريع - ويتم عرضها بالموقع مباشرة" Value="2" Text="بيع سريع !. "></asp:ListItem>
                                    <asp:ListItem Value="3" Text="ملغاه - Relist."></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtTrxDate">تاريـخ الشـراء<span class="text-error">*</span></label>
                            <div class="controls">
                                <label>
                                    <span class="block input-icon input-icon-right">
                                        <asp:TextBox Width="189" dir="ltr" runat="server" CssClass="required date-picker current-date span6" ClientIDMode="Static"
                                            data-date-format="dd/mm/yyyy" ID="txtTrxDate" /><i class="icon-calendar"></i><asp:RequiredFieldValidator
                                                SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator2" Display="Dynamic"
                                                runat="server" ControlToValidate="txtTrxDate" ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator></span>
                                </label>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlDocTypes">شراء بواسطة<span class="text-error">*<i data-rel="tooltip" title="الشراء الخاص أو بواسطة العميل تعنى أنه تم دفع ثمن شراء السيارة خارج الشركة ، ويتم جعل فاتورة البيع لهذه السيارة نقدأ إجبارياً وتنزيل قيمة الشراء من حساب العميل اوتوماتيكياً." class="icon-warning-sign"></i></span></label>
                            <div class="controls">
                                <asp:DropDownList class="required span12" placeholder="اختر" runat="server" ID="ddlDocTypes" ClientIDMode="Static">
                                </asp:DropDownList>
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator3"
                                    Display="Dynamic" runat="server" ControlToValidate="ddlDocTypes" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="lbltxtPayPrice" for="txtPayPrice">سعر الشراء<span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:TextBox runat="server" dir="ltr" ID="txtPayPrice" class="required" ClientIDMode="Static" />
                                <a title="اضف إلى السعر بالموقع" data-rel="tooltip" href="javascript:void(0);" id="addPayPrice" clientidmode="Static" runat="server" class="btn btn-success btn-mini" visible="false"><i class="icon-ok"></i></a>
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator4"
                                    Display="Dynamic" runat="server" ControlToValidate="txtPayPrice" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="hr hr-dotted">
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlCarStatus">حالة السيارة <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:DropDownList placeholder="اختر" CssClass="required span12" runat="server" ID="ddlCarStatus" ClientIDMode="Static">
                                </asp:DropDownList>
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator8"
                                    Display="Dynamic" runat="server" ControlToValidate="ddlCarStatus" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="control-group hide" id="divAccidentStatusID" runat="server" clientidmode="Static">
                            <label class="control-label" for="AccidentStatusID">نوع الحادث<span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:ListBox SelectionMode="Multiple" placeholder="اختر" CssClass="required chosen-select chzn-select chosen-rtl" data-placeholder="اختر أنواع الحادث..." runat="server" ID="AccidentStatusID" ClientIDMode="Static"></asp:ListBox>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtLotNo">رقم اللوت <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:TextBox runat="server" ID="txtLotNo" CssClass="required span12" ClientIDMode="Static" data-rel="tooltip" title="تحقق من رقم اللوت" />
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator9"
                                    Display="Dynamic" runat="server" ControlToValidate="txtLotNo" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtChassisNo">الشاصي <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:TextBox runat="server" ID="txtChassisNo" CssClass="required span12" ClientIDMode="Static" data-rel="tooltip" title="تحقق من رقم الشاصي" />
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator10"
                                    Display="Dynamic" runat="server" ControlToValidate="txtChassisNo" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlMaker">نوع السيارة <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:DropDownList placeholder="اختر" CssClass="chzn-select chosen-rtl required" runat="server" ClientIDMode="Static"
                                    ID="ddlMaker">
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlModel">موديل السيارة <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:DropDownList placeholder="اختر" CssClass="chzn-select chosen-rtl required" runat="server" ClientIDMode="Static"
                                    ID="ddlModel">
                                </asp:DropDownList>
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator12"
                                    Display="Dynamic" runat="server" ControlToValidate="ddlModel" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlYear">سنة الصنع <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:DropDownList placeholder="اختر" CssClass="required span12" runat="server" ID="ddlYear" ClientIDMode="Static">
                                </asp:DropDownList>
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator14"
                                    Display="Dynamic" runat="server" ControlToValidate="ddlYear" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlColor">لون السيارة <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:DropDownList placeholder="اختر" CssClass="required span12" runat="server" ID="ddlColor" ClientIDMode="Static">
                                </asp:DropDownList>
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator13"
                                    Display="Dynamic" runat="server" ControlToValidate="ddlColor" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ddlTransmission">الجير <span class="text-error">*</span></label>
                            <div class="controls">
                                <asp:DropDownList placeholder="اختر" CssClass="required span12" runat="server" ID="ddlTransmission" ClientIDMode="Static">
                                </asp:DropDownList>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtWebsitePrice">السعر بالموقع</label>
                            <div class="controls">
                                <asp:TextBox runat="server" dir="ltr" ID="txtWebsitePrice" Text="0" ClientIDMode="Static" />
                                <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator15"
                                    Display="Dynamic" runat="server" ControlToValidate="txtWebsitePrice" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="hr hr-dotted">
                        </div>
                    </div>
                    <div class="span6">
                        <div id="divCity">
                            <div class="control-group">
                                <label class="control-label" for="WithoutShipping" title="نعم ✓ تعني تسجيل السيارة من داخل بلد الوصول بدون فاتورة شحن أو تخليص" data-rel="tooltip">بدون شحن <i class="icon-warning-sign"></i></label>
                                <div class="controls">
                                    <input type="checkbox" id="WithoutShipping" runat="server" clientidmode="Static" />
                                    <span class="lbl">&nbsp; بدون فاتورة شحن - تخليص</span>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ddlDistination"><span class="destinTitle">جهة الوصول</span> <span class="text-error">*</span></label>
                                <div class="controls">
                                    <asp:DropDownList class="required span12" placeholder="اختر" runat="server" ID="ddlDistination" ClientIDMode="Static">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator16"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlDistination" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                            <div class="control-group region">
                                <label class="control-label" for="ddlRegion">المدينة <span class="text-error">*</span></label>
                                <div class="controls">
                                    <asp:DropDownList placeholder="اختر" CssClass="chzn-select chosen-rtl required" runat="server" ClientIDMode="Static"
                                        ID="ddlRegion">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator6"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlRegion" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                            <div class="control-group withShipping" id="divDepartment" runat="server">
                                <label class="control-label" for="ddlShipper">الشاحن</label>
                                <div class="controls">
                                    <asp:DropDownList class="chzn-select chosen-rtl" data-placeholder="اختــر الشاحن" ClientIDMode="Static"
                                        runat="server" ID="ddlShipper">
                                        <asp:ListItem Value=""></asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </div>
                            <div class="control-group withShipping">
                                <label class="control-label" data-toggle="tooltip" title="يتم اضافة مبلغ على السيارات السكراب/تقطيع فقط فى فاتورة الشحن - وحساب العمولة حسب بلد الوصول أو عمولة السكراب فى فاتورة البيع" for="rblHowToCalcShipping">طريقة الحساب <i class="icon-warning-sign"></i></label>
                                <div class="controls">
                                    <asp:RadioButtonList ID="rblHowToCalcShipping" runat="server" RepeatDirection="Horizontal"
                                        RepeatLayout="Flow" CssClass="radioList" ClientIDMode="Static">
                                        <asp:ListItem Selected="True" Value="1" data-toggle="tooltip" Text="سيارة كاملة" title="سيارة كاملة"></asp:ListItem>
                                        <asp:ListItem Value="2" Text="تقطيع" data-toggle="tooltip" title="سيارة تقطيع - سكراب"></asp:ListItem>
                                    </asp:RadioButtonList>
                                </div>
                            </div>
                        </div>
                        <div id="divSuplier">
                            <div class="hr hr-dotted">
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="IsGulfOldCars" title="نعم ✓ تعني سيارة مشتراه قديماً ومدفوعه مسبقاً وليس لها حوالة شراء أو مصروف Towing." data-rel="tooltip">بدون دفع <i class="icon-warning-sign"></i></label>
                                <div class="controls">
                                    <label>
                                        <input type="checkbox" id="IsGulfOldCars" runat="server" clientidmode="Static" />
                                        <span class="lbl">سيارة بدون حوالة شراء أو Towing</span></label>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ddlSupplier">المورد <span class="text-error">*</span></label>
                                <div class="controls">
                                    <asp:DropDownList placeholder="اختر" runat="server" ID="ddlSupplier" CssClass=" span12" ClientIDMode="Static">
                                    </asp:DropDownList>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ddlBuyer">رقم الباير <span class="text-error">*</span></label>
                                <div class="controls">
                                    <asp:DropDownList placeholder="اختر" CssClass="chzn-select chosen-rtl required" runat="server" ClientIDMode="Static"
                                        ID="ddlBuyer">
                                        <asp:ListItem Value=""></asp:ListItem>
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator7"
                                        Display="Dynamic" runat="server" ControlToValidate="ddlBuyer" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ToSaleClientID" data-rel="tooltip" title="سوف يتم اختيار هذا العميل افتراضيا فى فاتورة البيع لهذه السيارة">العميل <span class="text-error">*</span></label>
                                <div class="controls">
                                    <asp:DropDownList placeholder="اختر" CssClass="chzn-select chosen-rtl required" runat="server" ClientIDMode="Static"
                                        ID="ToSaleClientID">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequireeldValidator7"
                                        Display="Dynamic" runat="server" ControlToValidate="ToSaleClientID" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="hr hr-dotted">
                        </div>
                        <div class="control-group" id="divSaleTypeID">
                            <label class="control-label blue" for="SaleTypeID" data-rel="tooltip" title="اختر طريقة البيع نقداً أو آجل">طريقة البيع</label>
                            <div class="controls">
                                <asp:RadioButtonList ID="SaleTypeID" runat="server" RepeatDirection="Horizontal" ClientIDMode="Static"
                                    RepeatLayout="Flow" CssClass="radioList required" required>
                                    <asp:ListItem Value="1" Text="نقداً" required></asp:ListItem>
                                    <asp:ListItem Value="2" Text="آجل" required></asp:ListItem>
                                </asp:RadioButtonList>
                                <label class="inline">
                                    <input type="checkbox" id="SalePriceDemand" runat="server" clientidmode="Static" />
                                    <span data-rel="popover" data-placement="top" title="سعر البيع فورى/مُرحَّل" data-content="فورى: طلب مبلغ السيارة وأجور الشركة كاملاً عند الشراء - للبيع نقداً. &emsp;&emsp;&emsp;&emsp; مُرحَّل: طلب مبلغ السيارة وأجور الشركة كاملاً عند الوصول - للبيع آجل." class="lbl">سعر البيع فورى/مُرحَّل؟ 
                                            &nbsp;<i class="icon-info-sign icon-align-center bigger-110"></i></span>
                                </label>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label red" for="view_website" data-rel="tooltip" title="اختر نعم عرض السيارة بواجهة الموقع">عرض بالموقع </label>
                            <div class="controls">
                                <asp:RadioButtonList ID="view_website" runat="server" RepeatDirection="Horizontal" ClientIDMode="Static"
                                    RepeatLayout="Flow" CssClass="radioList">
                                    <asp:ListItem Value="True" Text="نعم"></asp:ListItem>
                                    <asp:ListItem Selected="True" Value="False" Text="لا"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="view_offer">عروض خاصة</label>
                            <div class="controls">
                                <asp:RadioButtonList ID="view_offer" runat="server" RepeatDirection="Horizontal" ClientIDMode="Static"
                                    RepeatLayout="Flow" CssClass="radioList">
                                    <asp:ListItem Value="True" Text="نعم"></asp:ListItem>
                                    <asp:ListItem Selected="True" Value="False" Text="لا"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="txtNotes">ملاحظات</label>
                            <div class="controls">
                                <asp:TextBox runat="server" ID="txtNotes" TextMode="MultiLine" class="span12" ClientIDMode="Static" />
                            </div>
                        </div>
                        <div class="control-group hidden">
                            <label class="control-label" for="ddlOwnerID" tooltip="لتوضيح مالك السيارة أثناء العرض بالموقع">مالك السيارة الآن</label>
                            <div class="controls">
                                <asp:RadioButtonList ID="ddlOwnerID" runat="server" RepeatDirection="Horizontal" ClientIDMode="Static" ToolTip="لتوضيح مالك السيارة أثناء العرض بالموقع"
                                    RepeatLayout="Flow" CssClass="radioList">
                                    <asp:ListItem Selected="True" Value="1" Text="شركة العراق"></asp:ListItem>
                                    <asp:ListItem Value="2" Text="سيارة عميل"></asp:ListItem>
                                </asp:RadioButtonList>
                            </div>
                        </div>
                        <div class="form-actions">
                            <asp:LinkButton runat="server" ID="btnSave" class="btn btn-success" data-last="Finish" ClientIDMode="Static"
                                ValidationGroup="s"><i class="icon-save"></i> حفـــظ الفاتورة</asp:LinkButton>
                            <asp:HiddenField runat="server" ID="hfId" Value="0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/Scripts/App/InvoicePayAdd.min.js?v=3.6"></script>
        <script>
            var buyerSelectedVal = '0', $calclShipp = $('#rblHowToCalcShipping'); buyerSelectedVal = '<%= buyerSelectID %>'; // init
            buyInvoiceAddManager.Init();
            if (buyerSelectedVal.indexOf('|') > 0)
                buyInvoiceAddManager.$auctionElement.change();

            //activate popover by mouse over.
            $('[data-rel="popover"]').mouseover(function () {
                $(this).popover('show');
            }).mouseout(function () {
                $(this).popover('hide');
            });
            $('input[id]').on("click focus", function () {
                $(this).select();
            });
        </script>
    </form>
</asp:Content>
