<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ucUserSideBar.ascx.cs" Inherits="Controls_ucUserSideBar" %>
<ul class="nav nav-pills pull-left hidden-print client-menu">
  <li role="presentation"><a href="/mypaidcars">السيارات المطلوبة</a></li>
  <li role="presentation"><a href="/myfinishedcars">السيارات المسددة</a></li>
  <li role="presentation"><a href="/mypayments">الحـوالات</a></li>
  <li role="presentation"><a href="/mycarsforsale">سياراتي المعروضة للبيع</a></li>
  <li role="presentation"><a href="/login" class="logout btn-grey" title="تسجيل الخروج"><i class="fa fa-sign-out text-danger" aria-hidden="true"></i> تسجيل خروج</a></li>
</ul>
<script>
    function setNavigation() {
        var path = location.href.toLowerCase().replace(/\/$/, "");
        path = decodeURIComponent(path);
        $(".client-menu li a").each(function () {
            var href = $(this).attr('href').toLowerCase();
            if (path.indexOf(href) > -1) {
                $(this).closest('li').addClass('active');
            }
        });
    }
    setNavigation();
</script>
