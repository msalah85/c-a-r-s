<%@ Page Title="تواصل معنا" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/SiteAr.master" AutoEventWireup="true" CodeFile="contact-us.aspx.cs" Inherits="contact_us" %>

<asp:Content ID="Contedsdsn1t1" ContentPlaceHolderID="head" runat="Server">
    <meta name="geo.placename" content="شركة العراق لتجارة السيارات Industrial Area 4 إمارة الشارقة" />
    <meta name="geo.position" content="25.3353615, 55.404959" />
    <meta name="geo.region" content="AE-Sharjah" />
    <meta name="ICBM" content="25.3353615, 55.404959" />
</asp:Content>
<asp:Content ID="Conten1t1" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="white-area" role="main">
        <div class="listing-header">
            <h1 class="page-header">تواصل معنا</h1>
        </div>
        <div class="col-md-5 col-sm-6 contact-info">
            <span><i class="fa fa-car"></i></span><b>شركة العراق لتجارة السيارات المستعملة وقطع الغيار ذ.م.م.</b><br />
            <br />
            <i class="fa fa-map-marker"></i><a href="https://goo.gl/oqORy3" title="العنوان على الخريطة" target="_blank">الإمارات العربية المتحدة - الشارقة - المنطقة الصناعية الرابعة</a>
            <br />
            شارع دجلة خلف شركة تاكسي الإمارات  -
            <abbr title="صندوق بريد">ص.ب</abbr>: 33930
            <br />
            <br />
            <i class="fa fa-mobile"></i><a href="tel:00971506751025" title="رقم الجوال 1">00971-506751025</a> - <a href="tel:+971559857503" title="رقم الجوال 2">00971-559857503</a><br />
            <i class="fa fa-phone"></i><a href="tel:0097165320814" title="رقم الهاتف">00971-65320814</a><br />
            <i class="fa fa-fax"></i><b title="الفاكس">00971-65321475</b><br />
            <i class="fa fa-envelope"></i><a class="tahoma" title="البريد الإلكتروني" href="mailto:iraqusedcar@gmail.com">iraqusedcar@gmail.com</a><br />
            <br />
            <i class="fa fa-calendar"></i><b title="أيام العمل">أيام العمل: من السبت - إلى الخميس</b><br />
            <i class="fa fa-clock-o"></i><b title="ساعات الدوام">ساعات الدوام: من: 8.30ص - 1.30م ومن: 4.30م - 9.30م.</b>
        </div>
        <div class="col-md-7 col-sm-6">
            <form method="post" id="contactform" name="contactform" class="contact-form clearfix" action="contact-us.aspx/SendMessage">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <input type="text" required id="fname" name="name" title="برجاء ادخال اسمك" class="form-control input-lg" placeholder="الاسم*" />
                        </div>
                        <div class="form-group">
                            <input type="email" required id="email" name="email" title="برجاء ادخال بريدك الإلكتروني صحيحاً" class="form-control input-lg" placeholder="الإيميل*" />
                        </div>
                        <div class="form-group">
                            <input type="tel" required id="phone" name="phone" title="برجاء ادخال هاتفك" class="form-control input-lg" placeholder="الهاتف*" />
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="form-group">
                            <textarea cols="6" required rows="4" style="height: 178px;" title="برجاء ادخال رسالتك." id="comments" name="comments" class="form-control input-lg" placeholder="نص الرسالة"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <input id="submit" name="submit" type="submit" class="btn btn-primary btn-lg pull-left" value="ارسـل الآن" />
                    </div>
                </div>
            </form>
            <div class="clearfix"></div>
            <div id="message"></div>
        </div>
        <div class="space-10"></div>
        <div class="row">
            <div class="google-map" data-lat="25.3353615" data-lng="55.404959" style="width: 100%; height: 400px;"></div>
        </div>
    </div>
    <script src="/Scripts/plugins/jquery.lazy-load-google-maps.min.js"></script>
    <script>
        ; (function ($, window, document, undefined) {
            var $window = $(window),
                mapInstances = [],
                $pluginInstance = $('.google-map').lazyLoadGoogleMaps(
                    {
                        callback: function (container, map) {
                            var $container = $(container),
                                center = new google.maps.LatLng($container.attr('data-lat'), $container.attr('data-lng'));

                            map.setOptions({ zoom: 14, center: center, scrollwheel: false });
                            new google.maps.Marker({ position: center, map: map });

                            $.data(map, 'center', center);
                            mapInstances.push(map);

                            var updateCenter = function () { $.data(map, 'center', map.getCenter()); };
                            google.maps.event.addListener(map, 'dragend', updateCenter);
                            google.maps.event.addListener(map, 'zoom_changed', updateCenter);
                            google.maps.event.addListenerOnce(map, 'idle', function () { $container.addClass('is-loaded'); });
                        }
                    });
            $window.on('resize', $pluginInstance.debounce(1000, function () {
                $.each(mapInstances, function () {
                    this.setCenter($.data(this, 'center'));
                });
            }));

        })(jQuery, window, document);
    </script>
    <style>
        .iwContent {
            color: #5e5e5e;
            padding-right: 15px;
        }

        .gm-style-iw {
            display: inline-block;
            overflow: auto;
            max-height: 259px;
            max-width: 654px;
        }

        .contact-info .fa {
            margin-left: 5px;
        }

        .tahoma, input[type=email] {
            font-family: Tahoma,sans-serif;
        }
    </style>
</asp:Content>
