<%@ Page Title="" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" CodeFile="Home.aspx.cs" Inherits="Admin_Iraq_home" EnableSessionState="ReadOnly" ViewStateMode="Disabled" EnableViewState="false" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home home-icon"></i>
                <a>الرئيسية</a>
                <span class="divider">
                    <i class="icon-angle-left arrow-icon"></i>
                </span>
            </li>
            <li class="active">البحث السريع فى النظام</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <form runat="server" id="aspnetForm" clientidmode="Static">
            <div class="page-header position-relative">
                <h1>الرئيسية</h1>
            </div>
            <div class="row-fluid" id="divNormalContents" runat="server" clientidmode="Static">
                <div class="span3 widget-container-span">
                    <div class="widget-box">
                        <div class="widget-header header-color-purple">
                            <h5 class="smaller">بحـــث الســيارات</h5>
                            <div class="widget-toolbar">
                                <a href="#" data-action="collapse">
                                    <i class="1 icon-chevron-up bigger-125"></i>
                                </a>
                            </div>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main padding-6">
                                <fieldset id="SearchCars">
                                    <div class="row-fluid">
                                        <label for="rblcarID">بحـث برقـم:</label>
                                        <asp:RadioButtonList ID="rblcarID" runat="server" RepeatDirection="Horizontal"
                                            RepeatLayout="Flow" CssClass="radioList" ClientIDMode="Static">
                                            <asp:ListItem Selected="True" Value="CarID" Text="السيـارة"></asp:ListItem>
                                            <asp:ListItem Value="LotNo" Text="اللـوت"></asp:ListItem>
                                            <asp:ListItem Value="ChassisNo" Text="الشـاصي"></asp:ListItem>
                                        </asp:RadioButtonList>
                                    </div>
                                    <div class="space"></div>
                                    <div class="row-fluid">
                                        <label for="carID">ادخـل الرقم:</label>
                                        <input type="text" class="span12" id="carID" autocomplete="off" />
                                    </div>
                                    <div class="form-actions center">
                                        <button onclick="return false;" class="btn btn-small btn-success">
                                            <i class="icon-search nav-search-icon"></i>بـحـــث
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span3">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="widget-container-span">
                                <div class="widget-box collapsed">
                                    <div class="widget-header header-color-grey">
                                        <h5 class="smaller">بحث إيداعات العملاء</h5>
                                        <div class="widget-toolbar">
                                            <a href="#" data-action="collapse">
                                                <i class="1 icon-chevron-down bigger-125"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main padding-6">
                                            <fieldset id="SearchPayments">
                                                <div class="row-fluid">
                                                    <label for="rblpaymentID">بحـث برقـم:</label>
                                                    <asp:RadioButtonList ID="rblpaymentID" runat="server" RepeatDirection="Horizontal"
                                                        RepeatLayout="Flow" CssClass="radioList" ClientIDMode="Static">
                                                        <asp:ListItem Selected="True" Value="ReceiptID" Text="الإيداع"></asp:ListItem>
                                                        <asp:ListItem Value="CheckNo" Text="إيصال الحوالة"></asp:ListItem>
                                                    </asp:RadioButtonList>
                                                </div>
                                                <div class="space"></div>
                                                <div class="row-fluid">
                                                    <label for="paymentID">ادخـل الرقـم:</label>
                                                    <input type="text" class="span12" id="paymentID" autocomplete="off" />
                                                </div>
                                                <div class="form-actions center">
                                                    <button onclick="return false;" class="btn btn-small btn-success">
                                                        <i class="icon-search nav-search-icon"></i>بـحـــث
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="widget-container-span">
                                <div class="widget-box">
                                    <div class="widget-header header-color-green2">
                                        <h5 class="smaller">بحـــث سنــــدات القـــبض</h5>
                                        <div class="widget-toolbar">
                                            <a href="#" data-action="collapse">
                                                <i class="1 icon-chevron-up bigger-125"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="widget-body">
                                        <div class="widget-main padding-6">
                                            <fieldset id="receiptvoucherprint">
                                                <div class="space"></div>
                                                <div class="row-fluid">
                                                    <label for="carID">ادخـل رقــم السنــد:</label>
                                                    <input type="text" class="span12" id="id" autocomplete="off" />
                                                </div>
                                                <div class="form-actions center">
                                                    <button onclick="return false;" class="btn btn-small btn-success">
                                                        <i class="icon-search nav-search-icon"></i>بـحـــث
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span3 widget-container-span">
                    <div class="widget-box">
                        <div class="widget-header header-color-orange">
                            <h5 class="smaller">بحث فواتير المبيعات</h5>
                            <div class="widget-toolbar">
                                <a href="#" data-action="collapse">
                                    <i class="1 icon-chevron-up bigger-125"></i>
                                </a>
                            </div>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main padding-6">
                                <fieldset id="SearchSales">
                                    <div class="row-fluid">
                                        <label for="rblsaleID">بحـث برقـم:</label>
                                        <asp:RadioButtonList ID="rblsaleID" runat="server" RepeatDirection="Horizontal"
                                            RepeatLayout="Flow" CssClass="radioList" ClientIDMode="Static">
                                            <asp:ListItem Selected="True" Value="SaleInvoiceID" Text="الفاتورة"></asp:ListItem>
                                            <asp:ListItem Value="CarID" Text="السيارة"></asp:ListItem>
                                            <asp:ListItem Value="LotNo" Text="اللوت "></asp:ListItem>
                                        </asp:RadioButtonList>
                                    </div>
                                    <div class="space"></div>
                                    <div class="row-fluid">
                                        <label for="saleID">ادخـل الرقـم:</label>
                                        <input type="text" class="span12" id="saleID" autocomplete="off" />
                                    </div>
                                    <div class="form-actions center">
                                        <button onclick="return false;" class="btn btn-small btn-success">
                                            <i class="icon-search nav-search-icon"></i>بـحـــث
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span3 widget-container-span">
                    <div class="widget-box">
                        <div class="widget-header header-color-pink">
                            <h5 class="smaller">بحث فواتير الشحن</h5>
                            <div class="widget-toolbar">
                                <a href="#" data-action="collapse">
                                    <i class="icon-chevron-up bigger-125"></i>
                                </a>
                            </div>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main padding-6">
                                <fieldset id="SearchShipping">
                                    <div class="row-fluid">
                                        <label for="rblshippingID">بحـث برقـم:</label>
                                        <asp:RadioButtonList ID="rblshippingID" runat="server" RepeatDirection="Horizontal"
                                            RepeatLayout="Flow" CssClass="radioList" ClientIDMode="Static">
                                            <asp:ListItem Selected="True" Value="ShippInvoiceNo" Text="الفاتورة"></asp:ListItem>
                                            <asp:ListItem Value="ContainerNo" Text="الحاوية"></asp:ListItem>
                                        </asp:RadioButtonList>
                                    </div>
                                    <div class="space"></div>
                                    <div class="row-fluid">
                                        <label for="shippingID">ادخـل الرقـم:</label>
                                        <input type="text" class="span12" id="shippingID" autocomplete="off" />
                                    </div>
                                    <div class="form-actions center">
                                        <button onclick="return false;" class="btn btn-small btn-success">
                                            <i class="icon-search nav-search-icon"></i>بـحـــث
                                        </button>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="spacer-50"></div>
            </div>
        </form>
        <div class="hr hr32 hr-dotted"></div>
        <div class="row-fluid" id="statistics" runat="server">
            <div class="span12">
                <div class="row-fluid">
                    <div class="span6">
                        <div class="widget-box transparent collapsed">
                            <div class="widget-header widget-header-flat">
                                <h4 class="lighter">
                                    <i class="icon-signal"></i>
                                    إحصائيات الشاحنين (التحميل - الشحن البحري)
                                </h4>
                                <div class="widget-toolbar">
                                    <a href="#" data-action="collapse">
                                        <i class="icon-chevron-down"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="widget-body">
                                <div class="widget-main padding-4">
                                    <div class="form-actions">
                                        <form class="form-inline">
                                            <select class="ExpTypes">
                                                <option value="loading">متوسطات التحميل</option>
                                                <option value="of">متوسطات الشحن البحري</option>
                                            </select>
                                            <select class="YearMonth">
                                                <option value="month">تقرير شهري</option>
                                                <option value="year">تقرير سنوى</option>
                                            </select>
                                            <select class="Year input-small">
                                                <option value="2016">2016</option>
                                                <option value="2017">2017</option>
                                            </select>

                                            <div class="space-10"></div>
                                            <div id="choices" class="pull-left inline"></div>
                                        </form>
                                    </div>
                                    <div id="shippers-charts"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6 widget-container-span">
                        <div class="widget-box transparent collapsed">
                            <div class="widget-header widget-header-flat">
                                <h4 class="lighter">
                                    <i class="icon-signal"></i>
                                    إحصائيات الشاحنين (الحاويات)
                                </h4>
                                <div class="widget-toolbar">
                                    <a href="#" data-action="collapse">
                                        <i class="icon-chevron-down"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="widget-body">
                                <div class="widget-main padding-4">
                                    <div class="shippers-counts-charts"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/flot/jquery.flot.min.js"></script>
    <script src="/Scripts/flot/jquery.flot.resize.min.js"></script>
    <script src="/Scripts/flot/jquery.flot.time.js"></script>
    <script src="/Scripts/flot/jquery.flot.selection.js"></script>
    <script src="/Scripts/underscore/underscore-min.js"></script>
    <script src="/Scripts/flot/jquery.flot.pie.min.js"></script>
    <script src="/Scripts/statistics/dashboardManager.min.js?v=1.5"></script>
    <script src="<%:Settings.Config.CDN%>/Scripts/home-search-boxes.min.js?v=1.1"></script>
    <style>
        .form-actions {
            margin: 0;
        }

        .stickyFooter {
            display: none;
        }
    </style>
    <div class="space-24"></div>
</asp:Content>
