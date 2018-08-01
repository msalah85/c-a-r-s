<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Jordan_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>تسجيل الدخول - الأردن</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0" />
    <link rel="alternate" href="https://www.iraqusedcars.ae/jordan" hreflang="ar-ae" />
    <meta name="description" content="شركة العراق لتجارة السيارات المستعملة دودج كيا فورد هيونداي شيفروليه وقطع غيار  والمحركات وارد أمريكي إلى ميناء دبي بالامارات العربية المتحدة والشارقه المنطقه الصناعيه وأم قصر بالبصرة بالعراق وعبر ميناء العقبه الحرة بالاردن." />
    <meta name="keywords" content="سيارات, مستعملة, سكراب,قطع غيار,مصدومة,الخليج,الامارات,العراق,الأردن,السعودية,دبي,الشارقة,وارد امريكي,كيا,هيونداي,دودج,فورد,GMC,شيفروليه,jeep,kia,ford" />
    <meta name="format-detection" content="telephone=00971506406641" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="16x16 24x24 32x32 48x48" />
    <meta name="author" content="www.share-web-design.com, eng.msalah.abdullah@gmail.com" />
    <link rel="publisher" href="https://plus.google.com/+aliraqusedcars/" />
    <link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/droidarabickufi.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link href="/Content/iraq/iraq-styles.min.css?v=1.5" rel="stylesheet" />
    <!--[if lt IE 9]><script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script><script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script><![endif]-->
</head>
<body>
    <div class="myheader">
        <div class="container">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="row">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">تغيير القائمة</span> <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                            <a class="navbar-brand" href="/" title="شركة العراق لتجارة السيارات المستعملة وقطع الغيار">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAABHCAMAAABLRZfvAAACOlBMVEUAAAAnZn6sohAnXnInXnInXnKsohAnXnKsohCsog8nXnGsohCsohAnXnGsog8mXnKsohCsohCsohCsohCsohCsog+sohCtog+sohAnXnImXXGsog+sohAnXnKsohCsohAnXnKsohAmXXImXnInXnImX3OsohAmX3MmYHQmYHQmXnMnXnKsohAmXnEmX3SsohCsohAnXnInXnEnXnInXXEnXnKsohAmXnMnXnKsohAmXnImXnMnXnI0haOsohCsohCsohCsohAmX3MmXXEmXnKsohAnXnImXnMmX3WsohASh7OsohA6p9GsohAnXnItgKCsog+sohAzj7EkYHglV2msohA0haMifZ82l7ysohA0haMmXnKsohAmXnI0hqUnXnI0haM0haOsog8nXnIpg6YnXnIzhaM0haM5pMw0haM4nMIfbIk6qNE0haM6p9A0haMZep8edJM0haM6qNEhfJ4qg6Q0haM6qtQWgKc6qNIlY3k0haM6qNI6qNIzhaM6p9A6p9A0haMWgKchaoUga4cVgakcgaY6p9AUha4ad5oThrEWf6YUhbA6p9Aad5ohc5EhaoUTh7Mjc5Aha4YqkrkjZX4bdpgSibYZe6AiZ4EZeJwhaYMcdZU2lrsSiLSsohA0haMmXnI6p9AjZX0kYHYWgaclYnkYe58gbIgVg6siaIIXfqQdcZE0iKY7rdgUha8iaoUaeJsbdZc9st4fboscc5MecI02jKsmW24pZ344n8Y1lroxf5ssdZE6hJcLAAAAn3RSTlMAB8Wfk3j3pnGccQXPrjCGOOLaGXsVWQruEcNgpZuIR45/VDEj2LE8KB4VmI5/LB7CtItZ3M64aVAq9+K5tE6ralNB0siRTUgZD/7oskA3KiYkHQ3+lT8yDb2NXSDm0rxxamVjWO3ffFBOEtJkYC3IrZKGckkY8OTjv7Sflzjo1MqmgHFjOyTx6OLVv56GclPlwb+5j4yJamPy06Du26sRQvgkAAALxElEQVRo3szUz0v6cBzH8ff4Ch47d/heKsmEPAVB0aWCossgDztE0EGC2GWLBWOHDm5KauSv/NEPQnFq5sRNnF3qf+vttmYEUemWPv6AD09eezNwTiwcYZIJ/gIlMg/Xxeg+TCGCY28bqNWq1WrN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" class="logo animate pullDown" alt="Iraqsedcars شركة العراق لتجارة السيارات المستعملة وقطع الغيار" />
                            </a>
                        </div>
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <div class="">
                                <ul class="nav navbar-nav">
                                    <li id="home-link"><a href="/" title="الصفحة الرئيسية">الرئيسية </a></li>
                                    <li class="dropdown">
                                        <a href="#Aboutus" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" title="عن الشركة">عن الشركة <i class="fa fa-caret-down"></i></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="/page/العراق-لتجارة-السيارات-المستعمله-وقطع-غيارها" title="نبذه عن الشركة">نبذه عن الشركة</a></li>
                                            <li><a href="/page/أفرع-الشركة" title="أفرع الشركة">أفرع الشركة</a></li>
                                            <li><a href="/page/فريق-العمل" title="فريق العمل">فريق العمل</a></li>
                                            <li><a href="/sitemap" title="خريطة الموقع">خريطة الموقع</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="/page/طرق-البيع" title="طرق البيع">طرق البيع </a></li>
                                    <li><a href="#Account" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" title="أسعار خدمات">خدمات وتكاليف <span class="label label-pill label-danger">جديد</span> <i class="fa fa-caret-down"></i></a>
                                        <ul class="dropdown-menu">
                                            <li><a href="#searchShipperImages" data-toggle="modal" data-target="#searchShipperImages" title="صور الشحن/المخزن">صور الشحن/المخزن
                                                <span class="label label-pill label-danger pull-left">جديد</span></a></li>
                                            <li><a href="/page/أسعار-تهمك" title="أسعار تهمك">أسعار تهمك</a></li>
                                            <li><a href="/page/شركات-الصرافة-المعتمدة" title="شركات الصرافة المعتمدة">شركات الصرافة المعتمدة</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="/contact-us" title="تواصل معنا">تواصل معنا </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div class="working-area">
        <div class="container" id="page-contents">
            <div class="white-area" role="main">
                <h1 class="page-header">تسجيل الدخول لإدارة الأردن</h1>
                <div class="col-md-6 col-md-offset-3">
                    <div class="alert-message"></div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <div class="accordion" id="accordionArea">
                            <div class="accordion-group panel panel-info">
                                <div class="panel-heading">
                                    <h4 class="panel-title">تسجيل دخــول إدارة الأردن</h4>
                                </div>
                                <div id="oneArea" class="in collapse panel-body">
                                    <p>يرجي إدخال اسم المستخدم وكلمة المرور للدخول على حسابك</p>
                                    <div class="form-group">&nbsp;</div>
                                    <form class="login-form" dir="rtl" runat="server">
                                        <div class="form-group">
                                            <label class="control-label">اسم المستخدم<span class="red-txt">*</span></label>
                                            <div class="col-sm-8">
                                                <asp:TextBox runat="server" ID="username" class="form-control" placeholder="اسـم المستخدم" />
                                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" Display="Dynamic"
                                                    runat="server" ControlToValidate="username" ForeColor="Red" ValidationGroup="login"
                                                    SetFocusOnError="true" ErrorMessage="مطلـــــــــوب اســــــم المستــــــخدم!."></asp:RequiredFieldValidator>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label">كلمة المرور<span class="red-txt">*</span></label>
                                            <div class="col-sm-8">
                                                <asp:TextBox runat="server" ID="password" TextMode="Password" class="form-control" placeholder="كلمـة المرور" />
                                                <asp:RequiredFieldValidator ValidationGroup="login"
                                                    SetFocusOnError="true" ForeColor="Red" ID="RequiredFieldValidator2" runat="server"
                                                    ErrorMessage="مطلـــــــــوب كلمــــــة المــــرور!." ControlToValidate="password"></asp:RequiredFieldValidator>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="col-sm-8">
                                                <asp:Button runat="server" OnClick="Login_Click" ValidationGroup="login" class="btn btn-info pull-right" Text="تسجيـــل الدخــــول" />
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div runat="server" id="lblWarning">
                                                <asp:Label runat="server" ID="lblError" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="myfooter">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-sm-6 col-xs-12">
                    <ul class="ftr-ul">
                        <li><a href="/page/العراق-لتجارة-السيارات-المستعمله-وقطع-غيارها" title="نبذه عن الشركة"><span class="glyphicon  glyphicon-menu-left"></span>من نحن؟</a></li>
                        <li><a href="/login" title="تسجيل دخول العملاء"><span class="glyphicon  glyphicon-menu-left"></span>دخــول العمــلاء</a></li>
                        <li><a href="/page/أسعار-تهمك" title="أسعار تهمك"><span class="glyphicon  glyphicon-menu-left"></span>أسعار تهمك</a></li>
                        <li><a href="/page/شركات-الصرافة-المعتمدة" title="شركات الصرافة المعتمدة"><span class="glyphicon  glyphicon-menu-left"></span>شركات الصرافة</a></li>
                        <li><a href="/page/طرق-البيع" title="طرق البيع"><span class="glyphicon  glyphicon-menu-left"></span>طـــرق البـــيع </a></li>
                        <li><a href="/sitemap" title="خريطة الموقع"><span class="glyphicon  glyphicon-menu-left"></span>خريـطة المـوقـع</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-sm-6 col-xs-12 right-brdr">
                    <a href="tel:00971559857503" title="أنقر واتصل الآن">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAAAlCAMAAADVwpOcAAACplBMVEUAAAD///////////////9Kzv////////////////9Kzv////////////////////9Kzv////9Kzv9Kzv9Kzv9Kzv////9Kzv9Kzv9Kzv9Kzv9Kzv/m0GhKzv/r2YZKzv/kzFr///39+vDjyVHq1nv+/fn79uL27cVKzv/r2IDx5qv48tP79+T8+u7cvSf27sfdvizfwjjv4Zz///7+/vn+/fr27sbdvirv4qHt3I7fwjr06bjdvy7q2H3z6bbp1nfv4p/cvSf8+e7+/fr9+/Xo1XX///79+/Ldvir8+ev79+XkzFj79uTfwz3cvirewTf69d7cvSn27sfewTPhxkXbuyL48tTfwjn48dH17cT1673jy1fdwDHlzFvv4Z3cvSXy5q7x5azo0m/u3pXs24rz6bXdvy7x5an9+u/38dH278rp1nvp1nrn0WrjylH17cX79+XcvSfn0WrcviviyVD7+Oj59Nvr2ob9+u/cvSj+/PTZthLs2ofmz2Lw5Kffwjnu4Jnz57Lz57Lm0WndwDH7+er69eD589rt3I/u35f278z48tPiylL59d7378zq2ID9/Pbn0m7ky1fp13zcvir17cTt3ZH8+e7fwTfy5q3t3I7x5az9/PP06rzq137r2YXn02/06r3dvSvm0Wf9/Pf///9Kzv/cvCXcvSjdvizcvSd+bh7dvzDdvy/dvy7cvSrbuh/fwTPjyU/fwjfmzmDhxkTgwzzkzFr79+X378v167/w4qLt3I7n0WjStSiOeyDauRvz6LLx5ajv35fs24vr2YHq133cuyP7+er69d727sby5q7o1njo027ApSa9oiWWgiGGdR+BcR738M3o1HLky1Xix0nNsSvIrSe5oCWxmSObhyLauBn589jt3pPavC2lkCWIdx+4+6Z4AAAApXRSTlMAQL9/778QIDDfQM9gj59Qf3AwIJ8Qr1Dv33CPAWAErwf+/hEL/v79zxcW/srIwlpLGf749emCcU0zLSooIyIdEPX04uLg18/Pvrq2s62on52Wj4yGhnx4dXNnZFxVU1NNSERAPTMxKff29PHx8PDt7Ovo6Obh39zW1tPSzMzIyMXCuLewqqiop6SdmJeVkY6Mg4F9fHl3bWlhX11WVlBNPDo6Lyc33xQ3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" alt="+971559857503 - إتصل الآن" />
                    </a>
                </div>
                <div class="col-lg-3 col-sm-6 col-xs-12 text-right right-brdr">
                    <div class="display-block sociall-cont">
                        <div class="pull-right">تابعنا:</div>
                        <ul class="social-buttons" id="social-footer">
                            <li>
                                <a href="https://twitter.com/iraqusedcars" target="_blank" title="تابعنا على تويتر" data-toggle="tooltip" class="brandico-twitter-bird"><i class="fa fa-twitter"></i></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.facebook.com/aliraqusedcars" title="تابعنا على الفيس بوك" data-toggle="tooltip" class="brandico-facebook"><i class="fa fa-facebook"></i></a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.instagram.com/aliraqusedcars/" title="تابعنا على انسجرام" data-toggle="tooltip" class="brandico-instagram"><i class="fa fa-instagram"></i></a></li>
                            <li>
                                <a target="_blank" href="https://plus.google.com/101194357801988219718/posts" title="تابعنا على جوجل بلس" data-toggle="tooltip" class="brandico-gplus"><i class="fa fa-google-plus"></i></a>
                            </li>
                        </ul>
                        <div class="a2a_kit a2a_default_style">
                            <a class="a2a_button_facebook_like"></a>
                            <a class="a2a_button_twitter_tweet"></a>
                            <a class="a2a_button_google_plusone"></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-12 col-xs-12 text-right right-brdr">
                    <div class="display-block bluecolor">
                        <p style="margin: 0">© 1999 - <%: DateTime.Now.Year %> جميع الحقوق محفوظة.</p>
                        <p class="no-margin">شركة العراق لتجارة السيارات المستعملة وقطع الغيار ذ.م.م.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>(function (i, s, o, g, r, a, m) { i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () { (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date(); a = s.createElement(o), m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m) })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga'); ga('create', 'UA-70786195-1', 'auto'); ga('send', 'pageview');</script>
    <style>
        .accordion .col-sm-8 {
            float: left;
        }

        .accordion form {
            text-align: left;
        }
        .alert-warning{
            text-align:right
        }
    </style>
</body>
</html>
