<%@ Page Title="" Language="C#" MasterPageFile="~/SiteAr.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Default2" EnableSessionState="ReadOnly" %>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <!--news-->
    <div class="news-bar">
        <div class="marquetopp">
            <div id="layosut1" class="ltstnews-slider">
                <div class="ticker modern-ticker mt-round">
                    <div class="mt-body">
                        <div class="mt-label">أخر الأخبار:</div>
                        <div class="mt-news" id="home-news">
                            <ul></ul>
                        </div>
                        <div class="mt-controls">
                            <div class="mt-prev" title="عرض التالي"><span class="glyphicon glyphicon-triangle-left"></span></div>
                            <div class="mt-play" title="تشغيل/إيقاف"><span class="glyphicon glyphicon-pause"></span></div>
                            <div class="mt-next" title="عرض السابق"><span class="glyphicon glyphicon-triangle-right"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="space-35"></div>
    <!--marque-->
    <!-- right panel -->
    <button type="button" class="navbar-toggle collapsed right-pane-btn-collapse" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
        <span class="glyphicon glyphicon-search yellow-txt"></span>
        بـــــحـــث</button>
    <div class="col-md-3 right-pane collapse navbar-collapse" id="bs-example-navbar-collapse-2">
        <div class="filter-container">
            <div class="filter-box-hdr">
                <h1>بحث السيارات</h1>
            </div>
            <div class="filter-box-body">
                <form id="search-fast">
                    <ul>
                        <li class="form-group">
                            <label>نوع السيارة</label>
                            <select name="make" class="form-control selectpicker" data-live-search="true" title="اختر نوع السيارة" data-size="5">
                                <option value="">عرض الكل</option>
                            </select>
                        </li>
                        <li class="form-group">
                            <label>موديل السيارة</label>
                            <select name="model" class="form-control selectpicker" data-live-search="true" title="اختر موديل السيارة" data-size="5">
                                <option value="">عرض الكل</option>
                            </select>
                        </li>
                        <li class="form-group">
                            <label>سنة الصنع</label>
                            <div class="box-container">
                                <select name="minyear" class="form-control selectpicker widthhalf" data-live-search="true" title="السنة من" data-width="49%" data-size="5">
                                    <option value="">عرض الكل</option>
                                </select>
                                <select name="maxyear" class="form-control selectpicker widthhalf" data-live-search="true" title="السنة إلى" data-width="49%" data-size="5">
                                    <option value="">عرض الكل</option>
                                </select>
                            </div>
                        </li>
                    </ul>
                    <button type="button" class="btn btn-primary btn-lg btn-block btnSearchFast"><span class="glyphicon glyphicon-search pulse"></span>&nbsp;إبحث الآن </button>
                </form>
            </div>
            <div class="space-50"></div>
            <div class="filter-box-body">
                <form action="search-car-store-images.aspx">
                    <ul>
                        <li class="form-group">
                            <h1>بحث صور المخزن للسيارة:</h1>
                        </li>
                        <li class="form-group">
                            <label>الشاصي</label>
                            <input type="text" name="vin" placeholder="ادخل الشاصي / VIN" class="form-control" />
                        </li>
                    </ul>
                    <button type="submit" class="btn btn-primary btn-lg btn-block"><span class="glyphicon glyphicon-search pulse"></span>&nbsp;بحث صور الشحن / المخزن </button>
                </form>
            </div>
        </div>
        <div class="space-50"></div>
        <div class="filter-container right-side-adition">
            <div class="filter-box-hdr" id="adv-search">
                <h2>بحث سيارات متقدم</h2>
            </div>
            <div class="filter-box-body">
                <form id="search-no">
                    <ul>
                        <li>
                            <label>رقم اللوت</label><input dir="ltr" type="text" name="lot" class="widthfull form-control" />
                        </li>
                        <li>
                            <label>رقم الشاصي</label><input dir="ltr" type="text" name="ch" class="widthfull form-control" />
                        </li>
                        <li>
                            <label>رقم السيارة</label><input dir="ltr" type="text" name="id" class="widthfull form-control" />
                        </li>
                    </ul>
                    <button type="button" class="btn btn-primary btn-lg btn-block btnSearchNo"><span class="glyphicon glyphicon-search"></span>&nbsp;إبحث الآن</button>
                </form>
            </div>
        </div>
        <div class="filter-container right-side-adition">
            <div class="panel panel-default collpase-filter">
                <div class="panel-heading collpase-filter-title" id="headingone">
                    <h4 class="panel-title "><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseone" aria-expanded="false" aria-controls="collapseTwo">بحث بنوع السيارة </a></h4>
                </div>
                <div id="collapseone" class="panel-collapse collapse" aria-labelledby="headingone">
                    <div class="panel-body">
                        <ul class="myul makes"></ul>
                    </div>
                </div>
            </div>
            <div class="panel panel-default collpase-filter">
                <div class="panel-heading collpase-filter-title" id="headingTwo">
                    <h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">بحث بالموديل </a></h4>
                </div>
                <div id="collapseTwo" class="panel-collapse collapse" aria-labelledby="headingTwo">
                    <div class="panel-body">
                        <ul class="myul models"></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="filter-container right-side-adition">
            <div class="filter-box-hdr"><span>المـــــــزادات</span> </div>
            <div class="filter-box-body">
                <ul class="myul text-center">
                    <li class="margin-bottom">
                        <a title="مزاد IAA" href="http://iaai.com" target="_blank">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAtCAMAAAAz4X3mAAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOXRSTlMA0xVy9TlWCWNFJvvmhSwj7uridtmLbiAdDMdoWU737MyhUkoEsJB9PbheGhAHApcz3sK+qZuVgPBz0NAQAAAChUlEQVR4XpWXZ5uiMBRGg42qKEoXe2Hsro5u/v8f2x15M0gklPstcHM4T24aRBCL5iuG7aQp75qIC6kdWou+QgesMaKIr1Vt2Bxd5wQwicH0qC6rB7GJ9gGjN7km7I6OG/IJo4t6rDbEpmYe7HaoBVujW5fwsPpqKsQMLR8W1FA7MbEnyYfRTnXYcgIxUwSbVS7o8QtdtkQEo7vKYuhwbYhhUsVl4P9BhyERw6hSDbZgH/fFMLwtFwuQ7uDB6hOG1+UxZp9GwXrtDGwQ1CiozAwUiM7VDMxwZtXVQiZ2TNpRP2vWipn6qHTU/BG3/GZ/OZgK9wpqQyQGK4hR3qzzK281ill7JrbEg4AOPmAyG7VmMWyLtK8jK20OjCg61LwilsuJnYIcWPIYa6QgnkhaYw7t9DxYOhetfYHYFeePijk3o/kwwtS2YliXiaGtUBEsQqYhLKg5RT7O3YMkhBG2s9gC1slGwj2zGKYcLJnNMVPzis/d6QVzTqK6rlODg4UNz/P2Zonag7sQyJrpuq7pHTMw2reM/2H10bS0IrF+j/ABWH5sim4qZ1IVJla7TDAmphBWXW1dUmsxbPqhFut444lhldX4c7djd5Owt2YGNjmPlSTGzQFGhivZEmJXF4vBoixaanaeLdNe30h5nHLFhmjbVAjrvM0mA7YvtQOuRmzdjiCmpWK0L4aRM3K+CZGX9lNdEUJWN24f3tAKMGwNUGs/lF1Xe7sQjBoQM0ph3HDMSfusdJ0LSQ8IhxMrh+0HUHN76ziam28XAp+t0nIYfwLdSRQ60Sr99whx10PFuWoiSx9nYJ6FxzHRtJ/2MPlJUnCK+GHzLYahm/l3crjFo6J3/Gr9A2yFA0R3UnbmAAAAAElFTkSuQmCC" alt="IAA" />
                        </a>
                    </li>
                    <li class="margin-bottom">
                        <a title="مزاد Manheim" href="http://manheim.com" target="_blank">
                            <img src="data:image/png;base64,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" alt="Manheim" />
                        </a>
                    </li>
                    <li class="margin-bottom">
                        <a href="http://www.copart.com/" title="مزاد Copart" target="_blank">
                            <img src="data:image/png;base64,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" alt="Copart Auction" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- end right pane -->
    <!-- left pane -->
    <div class="col-md-9 left-pane">
        <div class="row">
            <div class="white-area-filter">
                <div class="filter-marque hidden">
                    <div class="hatrow">
                        <div class="col-lg-3 logo-maruq">
                            <div class="view-format-maruq">
                                <a class="list-view-btn filtericon-sole fltrformat pull-left">
                                    <span class="glyphicon glyphicon-list"></span>
                                </a>
                                <a class="filtericon-sole fltrformat pull-left filtericon-sole-active grid-view-btn">
                                    <span class="glyphicon  glyphicon-th-large"></span>
                                </a>
                            </div>
                        </div>
                        <div class="active car-model-slider">
                            <input type="hidden" id="carMakerFilter" value="" />
                            <div class="ticker modern-ticker mt-round">
                                <div class="mt-body">
                                    <div class="mt-label">نوع السيارة:</div>
                                    <div class="mt-news">
                                        <ul id="makers">
                                            <li><a href="#make=9" title="BMW">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/bmw-small.png" alt="BMW" /></a>
                                            </li>
                                            <li><a href="#make=18" title="LEXUS">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/lex-small.png" alt="LEXUS" /></a>
                                            </li>
                                            <li><a href="#make=4" title="HYUNDAI">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/hyund-small.png" alt="HYUNDAI" /></a>
                                            </li>
                                            <li><a href="#make=5" title="TOYOTA">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/toyota-small.png" alt="TOYOTA" /></a>
                                            </li>
                                            <li><a href="#make=10" title="CHEVORLATE">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/chly-small.png" alt="CHEVORLATE" /></a>
                                            </li>
                                            <li><a href="#make=16" title="JEEP">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/jeep-small.png" alt="JEEP" /></a>
                                            </li>
                                            <li><a href="#make=24" title="MITSUBISHI">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/mits-small.png" alt="MITSUBISHI" /></a>
                                            </li>
                                            <li><a href="#make=17" title="Landrover">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/landrover-small.png" alt="Landrover" /></a>
                                            </li>
                                            <li><a href="#make=25" title="OPEL">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/opel-small.png" alt="OPEL" /></a>
                                            </li>
                                            <li><a href="#make=11" title="FORD">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/ford-small.png" alt="FORD" /></a>
                                            </li>
                                            <li><a href="#make=7" title="DODGE">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/dodge-small.png" alt="DODGE" /></a>
                                            </li>
                                            <li><a href="#make=2" title="MERCEDES">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/merc-small.png" alt="MERCEDES" /></a>
                                            </li>
                                            <li><a href="#make=10" title="Chevorlet">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/chev-small.png" alt="Chevorlet" /></a>
                                            </li>
                                            <li><a href="#make=26" title="Mini">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/mini-small.png" alt="Mini" /></a>
                                            </li>
                                            <li><a href="#make=19" title="Nissan">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/nissan-small.png" alt="Nissan" /></a>
                                            </li>
                                            <li><a href="#make=15" title="Infinti">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/infint-small.png" alt="Infinti" /></a>
                                            </li>
                                            <li><a href="#make=3" title="Kia">
                                                <img src="<%: Settings.Config.CDN %>/content/images/makers/kia-small.png" alt="Kia" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="mt-controls">
                                        <div class="mt-prev" title="عرض التالي"><span class="glyphicon glyphicon-triangle-left"></span></div>
                                        <div class="mt-play" title="تشغيل/إيقاف"><span class="glyphicon glyphicon-pause"></span></div>
                                        <div class="mt-next" title="عرض السابق"><span class="glyphicon glyphicon-triangle-right"></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filter-iconss" id="cars-type-filter">
                    <a href="#type=0" class="filtericon-sole homefltr type filtericon-sole-active" data-value="0"><span>عرض</span>
                        جميع السيارات
                    </a>
                    <a href="#type=1" class="filtericon-sole carsfltr type" data-value="1"><span>عرض</span>
                        سيارات الشركة
                    </a>
                    <a href="#type=4" class="filtericon-sole sparefltr type hidden" data-value="4"><span>عرض</span>
                        قطع الغيار
                    </a>
                    <a href="#type=2" class="filtericon-sole clientsfltr type" data-value="2"><span>عرض</span>
                        سيارات العملاء
                    </a>
                    <a href="#type=5" class="filtericon-sole auctionfltr type" data-value="5"><span>عرض</span>
                        سيارات المزادات
                    </a>
                    <a class="list-view-btn filtericon-sole fltrformat pull-left">
                        <span class="glyphicon glyphicon-list"></span>
                    </a>
                    <a class="filtericon-sole fltrformat pull-left filtericon-sole-active grid-view-btn">
                        <span class="glyphicon glyphicon-th-large"></span>
                    </a>
                </div>
            </div>
            <div class="white-area" id="search-result">
                <div class="row" id="cars-search-result"></div>
                <div id="UpdateProgress1" class="loadmoree waiting">
                    <img src="<%: Settings.Config.CDN %>/content/images/loaderr.GIF" alt="جارى التحميل" />
                </div>
            </div>
        </div>
    </div>
    <script src="<%: Settings.Config.CDN %>/Scripts/app-home.min.js?v=1.12"></script>
</asp:Content>
