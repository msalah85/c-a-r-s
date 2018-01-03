<%@ Page Title="خطأ أثناء تحميل الصفحة" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="error.aspx.cs" Inherits="admin_admin_2015_error" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="breadcrumbs" id="breadcrumbs">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home home-icon"></i>
                <a href="home.aspx">الرئيسية</a>
                <span class="divider">
                    <i class="icon-angle-right arrow-icon"></i>
                </span>
            </li>
            <li class="active">خطأ !</li>
        </ul>
    </div>
    <div class="page-content">
        <div class="row-fluid">
            <div class="span12">
                <br />
                <br />
                <div class="error-container">
                    <div class="well">
                        <h1 class="red lighter smaller">
                            <span class="bigger-125">
                                <i class="icon-sitemap"></i>
                            </span>
                            خطأ أثناء تحميل الصفحة
                        </h1>
                        <hr />
                        <h3 class="lighter smaller">لقد حدث خطأ أثناء تحميل الصفحة، ربما ليس لديك صلاحية لفتح هذه الصفحة.</h3>
                        <div>
                            <div class="space"></div>
                            <h4 class="smaller">يرجي التواصل مع إدارة البرنامج وإعادة المحاولة مرة أخري.</h4>
                        </div>
                        <hr />
                        <div class="space"></div>
                        <div class="row-fluid">
                            <div class="center">
                                <a href="home.aspx" class="btn btn-primary">
                                    <i class="icon-home"></i>
                                    الرئيسية
                                </a>
                                <a href="javascript:window.history.back();" class="btn btn-grey">
                                    <i class="icon-arrow-right"></i>
                                    الرجوع للخلف
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

