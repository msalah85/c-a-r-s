<%@ Page Title="تواصل معنا" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/SiteAr.master" AutoEventWireup="true" CodeFile="search-car-store-images.aspx.cs" Inherits="search_car_store_images" %>

<asp:Content ID="Conten1t0" ContentPlaceHolderID="ContentBanner" runat="Server">
    <link href="Content/shipperImages.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Conten1t1" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="white-area" role="main">
        <div class="listing-header">
            <h1 class="page-header">صور المخزن / الشحن للسيارة</h1>
        </div>
        <section>
            <form name="vinSearch" class="navbar-form navbar-right clearfix" role="search" method="post" action="search-car-store-images">
                <b>بحث صور المخزن/الشحن للسيارة:</b>
                <div class="form-group">
                    <input type="text" required name="vin" title="برجاء ادخال الشاصي / VIN للسيارة" class="form-control input-lg" placeholder="الشاصي / VIN" />
                </div>
                <button type="submit" class="btn btn-info btn-lg pull-left srchChass">
                    <i class="fa fa-search"></i>
                    بـحث</button>
                <span class="sinpper"></span>
            </form>
            <div class="clearfix space-10"></div>
            <div class="tab-content">
                <div id="atlantic" class="tab-pane fade in active">
                    <div class="space-10"></div>
                    <div id="atl"></div>
                </div>
                <div id="w8Shipp" class="tab-pane fade in active">
                    <div id="w8Results"></div>
                </div>
            </div>
        </section>
    </div>
    <script src="Scripts/lz-string/lz-string.min.js"></script>
    <script src="Scripts/plugins/persian.min.js"></script>
    <script src="Scripts/plugins/urlManager.min.js"></script>
    <script src="Scripts/plugins/shippersImages.min.js?v=1.4"></script>
    <script>shipperImages.init();</script>
</asp:Content>
