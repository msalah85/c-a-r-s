<%@ Page Title="عرض السيارة فى الموقع للبيع" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="mycarsetforsale.aspx.cs" Inherits="mycarsetforsale" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/App_Themes/client/css/table-page.min.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="sub-menu">
        <ol class="breadcrumb">
            <li><a href="dashboard">منصة حسابي</a></li>
            <li><a href="requiredcars">سيارات مطلوبة</a></li>
            <li><a href="myfinishedcars">سيارات مسددة</a></li>
            <li><a href="mycarsforsale">سيارات معروضه بالموقع</a></li>
        </ol>
    </div>
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <h1 class="page-header">عرض السيارة فى الموقع للبيع</h1>
            <div class="row">
                <div class="col-md-10 col-lg-offset-1">
                    <form id="car-Price">
                        <div class="row">
                            <p class="text-info">يمكنك عرض السيارة فى الموقع بغرض البيع لحين وصولها، لذا يرجي اضافة سعر البيع بالموقع.</p>
                            <div class="space-10"></div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <img id="main-image" width="100%" src="/noimage.png" alt="main image" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <form class="form-horizontal" role="form">
                                    <div class="form-group row">
                                        <label class="col-xs-3 col-form-label" for="CarID">رقم السيارة</label>
                                        <div class="col-xs-9">
                                            <input type="text" id="CarID" disabled="disabled" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="model" class="col-xs-3 col-form-label">نوع السيارة</label>
                                        <div class="col-xs-9">
                                            <input type="text" id="Carmodel" class="form-control" disabled />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="ChassisNo" class="col-xs-3 col-form-label">رقم الشاصي</label><div class="col-xs-9">
                                            <input type="text" id="ChassisNo" class="form-control" disabled />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="LotNo" class="col-xs-3 col-form-label">رقم اللوت</label><div class="col-xs-9">
                                            <input type="text" id="LotNo" class="form-control" disabled />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="CarColor" class="col-xs-3 col-form-label">لون السيارة</label><div class="col-xs-9">
                                            <input type="text" id="CarColor" class="form-control" disabled />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="CarStatus" class="col-xs-3 col-form-label">حالة السيارة</label><div class="col-xs-9">
                                            <input type="text" id="CarStatus" class="form-control" disabled />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="WesitePrice" class="col-xs-5">سعر البيع بالموقع $<span class="text-danger">*</span></label>
                                        <div class="col-xs-7">
                                            <input type="text" dir="ltr" id="WesitePrice" name="WesitePrice" required class="form-control" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="view_website" class="col-xs-5 col-form-label">تفعيل عرض السيارة بالموقع <i class="fa fa-warning text-warning" data-toggle="tooltip" title="طلب تفعيل عرض السيارة: يتم مراجعته أولاً من قبل إدارة الموقع."></i></label>

                                        <div class="col-xs-7">
                                            <div class="">
                                                <label>
                                                    <input type="radio" id="need-view-website" value="true" name="view_website" />
                                                    طلب العرض بالموقع
                                                </label>
                                                <label>
                                                    <input type="radio" id="hide" name="view_website" value="false" checked="checked" />
                                                    إخفاء العرض من الموقع</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-xs-8 myMessage">
                                        </div>
                                        <div class="col-xs-4">
                                            <button type="submit" class="btn btn-info">طلب عرض بالموقع</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/plugins/persian.min.js"></script>
    <script src="/Scripts/plugins/urlManager.min.js"></script>
    <script src="/Scripts/client/user-set-car-4sale.min.js?v=1.3"></script>
</asp:Content>
