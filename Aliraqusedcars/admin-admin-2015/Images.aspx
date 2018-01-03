<%@ Page Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="Images.aspx.cs"
    Inherits="ProjectImages" Title="صور " %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesPayView.aspx">السيارات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">اضافة/تعديل صورة للسيارة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>صور السيارة <small>&nbsp;إضافة/تعديل صورة للسيارة</small> <span id="divTitle"></span>
            </h1>
        </div>
        <div id="divMessage"></div>
        <table cellpadding="10">
            <tbody>
                <tr>
                    <td class="center" colspan="3">
                        <h5 class="center carInfo purple no-margin no-padding"></h5>
                    </td>
                </tr>
                <tr>
                    <td width="30%" valign="top">اختر صور السيارة:
                        <h5 class="text-warning">يمكنك اختيار صورة أو أكتر لرفعها مرة واحدة.</h5>
                    </td>
                    <td align="right" valign="top">
                        <input type="file" class="ace-file-input ace-file-multiple attachments" multiple="" accept="image/png, .png, .jpg, .jpeg, .gif" id="FileUpload2" required />
                    </td>
                    <td valign="top" style="padding-top: 35px">
                        <button id="btnUpload" class="btn btn-success"><i class="icon-save"></i>ارفع الآن</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="hr hr-dotted"></div>
        <div class="row-fluid">
            <ul class="ace-thumbnails clearfix" id="divIMagesList">
                <li>
                    <img alt="" style="width: 150px; height: 150px" src="/public/cars/noimage.gif" />
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="span12">
                <p></p>
                <a href="javascript:void(0);" id="UpdatePriority" class="btn btn-info"><i class="icon-refresh"></i>تحديث ترتيب العرض بالمرقع</a>
                <a href="javascript:void(0);" id="updateOldPics" class="btn"><i class="icon-refresh"></i>تحديث للصور القديمه فقط</a><div class="space-12 clearfix"></div>
                <button id="deleteAll" class="btn btn-danger btn-minier"><i class="icon-remove"></i>حذف جميع الصور</button>
                <a target="_blank" href="/share-car.aspx?carid=" id="ShareCar" class="btn btn-primary btn-minier ShareCar"><i class="icon-facebook"></i>مشاركة فى صفحة الشركة على الفيس بوك</a>
                <!--<select class="form-control" id="AuctionName"><option value="1">IAII</option><option value="1">COPART</option></select><a href="javascript:void(0);" id="getPicsFromAuction" class="btn btn-grey"><i class="icon-refresh"></i>سحب الصور من المزاد</a>-->
            </div>
            <style>
                .thumb-index {
                    width: 50px;
                    height: 18px !important;
                }
            </style>
        </div>
        <div id="shareModal" class="modal container hide fade" tabindex="-1" data-focus-on="input:first" aria-labelledby="myModalLabel" style="right: 35%;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <strong>
                    <i class="icon-share"></i>&nbsp;مشاركة السيارة على صفحة الفيس بوك
                </strong>
            </div>
            <div class="modal-body" style="overflow-y: scroll;">
                <iframe id="car-share-div" src="/loading.html" scrolling="no" frameborder="0" style="width: 100%; height: 600px;"></iframe>
                <div id="error-message"></div>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                    إنهاء</button>
            </div>
        </div>
    </div>
    <form id="aspnetForm" runat="server" clientidmode="Static">
        <asp:HiddenField ID="carId" ClientIDMode="Static" runat="server" />
        <input type="hidden" id="hfMainImage" />
    </form>
    <script src="/Scripts/jquery.colorbox-min.js"></script>
    <script src="/Scripts/App/ImagesManager.min.js?v=2.7"></script>
</asp:Content>
