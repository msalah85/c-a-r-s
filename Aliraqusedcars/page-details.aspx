<%@ Page Title="تفاصيل الصفحة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/SiteAr.master" AutoEventWireup="true" CodeFile="page-details.aspx.cs" Inherits="page_details" %>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="row white-area">
        <div class="col-md-12">
            <h1 class="strong page-header" id="page-header">شركة العراق لتجارة السيارات المستعملة وقطع غيارها ذ.م.م</h1>
            <p class="lead" id="page-brief"></p>
            <div id="page-content"></div>
            <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                <a class="a2a_button_facebook"></a>
                <a class="a2a_button_twitter"></a>
                <a class="a2a_button_google_plus"></a>
                <a class="a2a_button_whatsapp"></a>
                <a class="a2a_button_linkedin"></a>
                <a class="a2a_button_gmail"></a>
                <a class="a2a_button_wordpress"></a>
            </div>
        </div>
    </div>
    <script src="<%:Settings.Config.CDN%>/Scripts/plugins/persian.min.js"></script>
    <script src="<%:Settings.Config.CDN%>/Scripts/plugins/urlManager.min.js"></script>
    <script src="<%:Settings.Config.CDN%>/Scripts/plugins/articles.min.js"></script>
    <script>loadPage();</script>
</asp:Content>

