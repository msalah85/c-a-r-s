<%@ Page Title="" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/SiteAr.master" AutoEventWireup="true" CodeFile="car-details.aspx.cs" Inherits="car_details"
    EnableViewState="false" ViewStateMode="Disabled" %>

<asp:Content ID="pageHead" ContentPlaceHolderID="head" runat="Server">
    <script src="<%:Settings.Config.CDN%>/Content/js/jssor.js"></script>
    <link href="<%:Settings.Config.CDN%>/Content/css/jssor.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="row white-area" role="main">
        <h1 class="page-header"><span class="post-title" id="pageTitle" runat="server"></span>
            <a class="btn btn-info pull-left hidden-print go-home" href="/#cars-type-filter">الرجوع للرئيسية <i class="fa fa-chevron-left"></i></a>
        </h1>
        <div runat="server" id="myMessage" class="myMessage"></div>
        <article class="single-vehicle-details">
            <div class="btn-group pull-left move-top-10" role="group">
                <button onclick="window.print();" class="btn btn-default" title="Print"><i class="fa fa-print"></i><span>طباعة</span></button>
                <button data-toggle="modal" data-target="#sendModal" class="btn btn-default" title="ارسل السيارة لصديق"><i class="fa fa-send"></i><span>ارسل السيارة لصديق</span></button>
            </div>
            <div class="btn btn-warning price" id="orangePrice" runat="server">$ 0</div>
            <div class="row">
                <div class="col-md-8 col-sm-12 col-xs-12">
                    <div id="jssor_1" style="position: relative; margin: 0 auto; top: 0; left: 15px; width: 640px; height: 512px; overflow: hidden; visibility: hidden; background-color: #24262e;">
                        <div data-u="loading" style="position: absolute; top: 0; left: 0;">
                            <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0; left: 0; width: 100%; height: 100%;"></div>
                            <div style="position: absolute; display: block; background: url('/content/images/jssor/loading.gif') no-repeat center center; top: 0; left: 0; width: 100%; height: 100%;"></div>
                        </div>
                        <div id="divCarImages" runat="server" data-u="slides" style="cursor: default; position: relative; top: 0; left: 0; width: 640px; height: 440px; overflow: hidden;"></div>
                        <div data-u="thumbnavigator" class="jssort01" style="position: absolute; left: 0; bottom: 0; width: 640px; height: 70px;" data-autocenter="1">
                            <div data-u="slides" style="cursor: default;">
                                <div data-u="prototype" class="p">
                                    <div class="w">
                                        <div data-u="thumbnailtemplate" class="t"></div>
                                    </div>
                                    <div class="c"></div>
                                </div>
                            </div>
                        </div>
                        <span data-u="arrowleft" class="jssora05l" style="top: 158px; left: 8px; width: 40px; height: 40px;"></span>
                        <span data-u="arrowright" class="jssora05r" style="top: 158px; right: 8px; width: 40px; height: 40px;"></span>
                    </div>
                    <p class="notes" id="notes" runat="server"></p>
                    <div class="sharethis-inline-share-buttons"></div>
                </div>
                <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="sidebar-widget widget">
                        <ul class="list-group">
                            <li class="list-group-item"><span class="inf">رقم السيارة</span> <b id="_id" runat="server" class="_id">---</b></li>
                            <li class="list-group-item"><span class="inf">الماركة</span> <b id="mker" runat="server" class="mker">---</b></li>
                            <li class="list-group-item"><span class="inf">الموديل</span> <b id="model" runat="server" class="model">---</b></li>
                            <li class="list-group-item"><span class="inf">سنة الصنع</span> <b id="year" runat="server" class="year">---</b></li>
                            <li class="list-group-item"><span class="inf">لون السيارة</span> <b id="color" runat="server" class="color">---</b></li>
                            <li class="list-group-item"><span class="inf">رقم اللوت</span> <b id="lotno" runat="server" class="lotno">---</b></li>
                            <li class="list-group-item"><span class="inf">رقم الشاصي</span> <b id="chassisno" runat="server" class="chassisno">---</b></li>
                            <li class="list-group-item"><span class="inf">حالة السيارة</span> <b id="status" runat="server" class="status">---</b></li>
                            <li class="list-group-item"><span class="inf">الجير</span> <b id="transmi" runat="server" class="transmi">---</b></li>
                            <li class="list-group-item"><span class="inf">تاريخ الوصول</span> <b id="arrive" runat="server" class="arrive-date">---</b></li>
                            <li class="list-group-item"><span class="inf">السعر</span> <b id="price" runat="server" class="price">---</b></li>
                            <asp:Literal ID="divExtraInfo" runat="server"></asp:Literal>
                        </ul>
                        <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                            <div class="fb-messengermessageus"
                                messenger_app_id="1006139766099265"
                                page_id="277926952269690"
                                color="blue"
                                size="standard">
                            </div>
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
            </div>
            <div class="spacer-50"></div>
        </article>
        <div class="modal fade" id="sendModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">ارسل السيارة لصديق</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form" id="send-friend">
                            <div class="alert-message"></div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="name">اسمك:<span class="red-txt">*</span></label>
                                <div class="col-sm-8">
                                    <input type="text" id="name" name="name" required class="form-control" data-msg-required="برجاء ادخال اسمك" placeholder="اسمك" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="email">إيميل صديقك: <span class="red-txt">*</span></label>
                                <div class="col-sm-8">
                                    <input type="email" id="email" name="email" required class="form-control" data-msg-required="برجاء ادخال إيميل صديقك" data-msg-email="برجاء تصحيح الإيميل." placeholder="إيميل صديقك" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label" for="comment">التعليق: <span class="red-txt">*</span></label>
                                <div class=" col-sm-9">
                                    <textarea class="form-control" id="comment" name="comment" required data-msg-required="برجاء كتابة التعليق" placeholder="تعليقك على السيارة"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class=" col-sm-3"></div>
                                <div class="col-sm-8">
                                    <input type="submit" class="btn btn-primary pull-right" data-loading-text="جارى ارسال الإيميل.." value="ارسل السيارة لصديق" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix space-10 hidden-print"></div>
        <div class="col-lg-12 hidden-print">
            <div class="row">
                <div class="col-lg-6 col-sm-6 col-xs-12">
                    <a class="btn btn-info nextCar hidden" id="nextCar" runat="server" href="#" title="عرض السيارة التالية"><i class="fa fa-arrow-right"></i>السيارة التالية</a>
                </div>
                <div class="col-lg-6 col-sm-6 col-xs-12">
                    <a class="pull-left btn btn-info prevCar hidden" id="prevCar" runat="server" title="عرض السيارة السابقة" href="#">السيارة السابقة <i class="fa fa-arrow-left"></i></a>
                </div>
            </div>
        </div>
        <!--comments-->
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="fb-comments" id="divCarComments" runat="server" data-mobile="true" data-width="100%" data-numposts="10"></div>
            </div>
        </div>
    </div>
    <style>
        .btn-default, .inf {
            color: #838A89;
            float: right;
        }

        .list-group li {
            display: block;
        }

        @media print {
            .working-area {
                margin-top: 0;
            }

            h1.page-header::before {
                content: url('<%:Settings.Config.CDN%>/content/images/iraq-cars-logo.png');
                float: left;
            }
        }
    </style>
    <script> $('.sidebar-widget ul li b:empty').each(function (i, item) { $(item).html('---'); }); document.title = $('.post-title').text() + ' - ' + $('.price:eq(0)').text() + ' - ' + document.title; jssor_1_slider_init();</script>
    <div id="fb-root"></div>
    <script>(function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v2.8&appId=1006139766099265";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
    <script type='text/javascript' src='//platform-api.sharethis.com/js/sharethis.js#property=5a47959e7820fd001360b4ba&product=inline-share-buttons' async='async'></script>
</asp:Content>
