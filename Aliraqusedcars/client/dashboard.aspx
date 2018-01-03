<%@ Page Title="حساب العميل" Language="C#" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="dashboard.aspx.cs" Inherits="client_dashboard" %>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="row">
        <div class="col-sm-12">
            <h1 class="page-header">حساب العميل
                <a class="btn btn-warning pull-left" runat="server" id="btnSelectAccount" visible="false" href="accounts">اختر حساب آخر <i class="fa fa-arrow-circle-o-left"></i></a>
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <blockquote class="blockquote-info">
                <h3>مرحبا بك فى الصفحة الرئيسية لحسابك [<span class="full_name text-info"></span>]</h3>
                <p>
                    نتطلع دائماً إلى التطوير، وأنت بالطبع جزء من هذا النظام لذا نسعد بآراءكم ومقترحاتكم.. <a class="chat-us btn btn-primary" href="javascript:void(0);">قدم مقترح</a>
                </p>
            </blockquote>
        </div>
    </div>
    <h3>مختصر الحساب</h3>
    <div class="row">
        <div class="col-md-6 col-sm-12">
            <a class="tile-title tile-plum" href="requiredcars" title="السيارات المطلوبة">
                <div class="icon"><span class="Balance">0 $</span></div>
                <div class="title">
                    <h3>الرصيــــــد</h3>
                    <p>إجمالى رصيدك الحالى فى النظام</p>
                </div>
            </a>
        </div>
        <div class="col-md-6 col-sm-12">
            <a class="tile-title tile-purple" href="mypayments">
                <div class="icon"><span class="Payments">0 $</span></div>
                <div class="title">
                    <h3>حـــــــوالات</h3>
                    <p>إجمالى الحوالات المسجله لدينا بالنظام</p>
                </div>
            </a>
        </div>
        <div class="col-md-6 col-lg-4 col-sm-12">
            <a class="tile-title" href="ClientDiscounts">
                <div class="icon"><span class="Discounts">0 $</span></div>
                <div class="title">
                    <h3>خصـــــومات</h3>
                    <p>إجمالى قيم الخصومات على السيارات.</p>
                </div>
            </a>
        </div>
        <div class="col-md-6 col-lg-4 col-sm-12">
            <a class="tile-title tile-orange" href="ClientExtras">
                <div class="icon"><span class="Extras">0 $</span></div>
                <div class="title">
                    <h3>زيـــــادات</h3>
                    <p>إجمالى المبالغ الزياده على السيارات.</p>
                </div>
            </a>
        </div>
        <div class="col-md-6 col-lg-4 col-sm-12">
            <a class="tile-title tile-brown" href="ClientMoneyBack">
                <div class="icon"><span class="MoneyBacks">0 $</span></div>
                <div class="title">
                    <h3>مرتــــجعات</h3>
                    <p>إجمالى المبالغ المسترده إليك من رصيدك.</p>
                </div>
            </a>
        </div>
    </div>
    <div class="space-50"></div>
    <h3>ملخص عدد السيارات</h3>
    <div class="row">
        <div class="col-md-6 col-lg-3 col-sm-12">
            <a class="tile-stats tile-red" href="requiredcars" title="السيارات المطلوبة">
                <div class="icon"><i class="entypo-users"></i></div>
                <div class="num RequiredCars">0</div>
                <h3>سيارات مطلوبة</h3>
                <p>عدد السيارات المطلوبة عربون أو متبقي عليها.</p>
            </a>
        </div>
        <div class="col-md-6 col-lg-3 col-sm-12">
            <a class="tile-stats tile-green" href="myfinishedcars">
                <div class="icon"><i class="entypo-chart-bar"></i></div>
                <div class="num FinishedCars">0</div>
                <h3>سيارات مسددة</h3>
                <p>عدد السيارات المسددة حساباتها.</p>
            </a>
        </div>
        <div class="clear visible-xs"></div>
        <div class="col-md-6 col-lg-3 col-sm-12">
            <a class="tile-stats tile-aqua" href="mycarsforsale">
                <div class="icon"><i class="entypo-mail"></i></div>
                <div class="num ViewToSaleCars">0</div>
                <h3>معروض للبيع</h3>
                <p>عدد السيارات المعروضه فى الموقع للبيع.</p>
            </a>
        </div>
        <div class="col-md-6 col-lg-3 col-sm-12">
            <a class="tile-stats tile-blue" href="ClientShippingCars">
                <div class="icon"><i class="entypo-rss"></i></div>
                <div class="num ShippingCars">0</div>
                <h3>قيد الشحن</h3>
                <p>عدد السيارات قيد الشحن</p>
            </a>
        </div>
    </div>
    <script src="/Scripts/client/dashboard.min.js"></script>
    <div class="space-10"></div>
    <a class="btn btn-block btn-primary" title="الصفحة الرئيسية للموقع" style="background: #005b74" href="/" target="_blank">الصفحة الرئيسية للموقع</a>
    <a class="btn btn-block btn-warning" style="background: #b29539" href="http://aliraqusedcars.com/ar/login.asp" target="_blank">حسابى على الموقع القديم</a>    
    <script>
        $('.chat-us').click(function () {
            var iframe = $('.zopim iframe:eq(0)').contents();
            if (iframe) {
                var chat = iframe.find('.meshim_widget_components_chatButton_Button');
                if (chat)
                    chat.trigger('click');
            }
        });
    </script>
</asp:Content>

