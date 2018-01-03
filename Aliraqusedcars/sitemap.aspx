<%@ Page Title="خريطة الموقع" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/SiteAr.master" AutoEventWireup="true" CodeFile="sitemap.aspx.cs" Inherits="sitemap" %>

<%@ OutputCache Duration="60" VaryByParam="None" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Content/vendor/sitemap/slickmap.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="row white-area" role="main">
        <h1 class="page-header">خريطة الموقع</h1>
        <div id="content" class="content full">
            <div class="col-md-12">
                <p class="lead" id="page-brief">
                    خريطة موقع شركة العراق لتجارة السيارات المستعملة وقطع الغيار:
                </p>
                <div id="page-content">
                    <ul id="utilityNav">
                        <li><a href="/login">دخول العملاء</a></li>
                        <li><a href="#/sitemap">خريطة الموقع</a></li>
                    </ul>
                    <ul id="primaryNav" class="col5">
                        <li id="home"><a href="/#home-news">بحث السيارات</a></li>
                        <li>
                            <a href="/">عن الشركة</a>
                            <ul>
                                <li><a href="/page/العراق-لتجارة-السيارات-المستعمله-وقطع-غيارها">نبذه عن الشركة</a></li>
                                <li><a href="/page/فريق-العمل">فريق العمل</a></li>
                                <li><a href="/page/أفرع-الشركة">أفرع الشركة</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/page/طرق-البيع">طرق البيع</a>
                        </li>
                        <li>
                            <a href="#/services">خدمات وتكاليف</a><ul>
                                <li><a href="/page/أسعار-تهمك">أسعار تهمك</a></li>
                                <li><a href="/page/شركات-الصرافة-المعتمدة">شركات الصرافة المعتمدة</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/login">حساب العميل</a><ul>
                                <li><a href="/Profile">الملف الشخصي للعميل</a></li>
                                <li><a href="/mypaidcars">السيارات المطلوبة</a></li>
                                <li><a href="/myfinishedcars">السيارات المسددة</a></li>
                                <li><a href="/mypayments">الحوالات والرصيد</a></li>
                                <li><a href="/mycarsforsale">السيارات المعروضة للبيع</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="/contact-us">اتصل بنا</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

