<%@ Page Title="حساب الأردن" Language="C#" MasterPageFile="~/Jordan/Site.master" AutoEventWireup="true" CodeFile="Home.aspx.cs" Inherits="Jordan_Home" %>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="container" id="page-contents">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="page-header">إدارة حساب الأردن
                <a class="btn btn-warning pull-left" runat="server" id="btnSelectAccount" visible="false" href="accounts">اختر حساب آخر <i class="fa fa-arrow-circle-o-left"></i></a>
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <blockquote class="blockquote-info">
                    <h3>مرحبا بك
                        <asp:Label ID="lblName" runat="server" class="full_name text-info"></asp:Label>
                        فى الصفحة الرئيسية لحساب الأردن</h3>
                    <p>
                        نتطلع دائماً إلى التطوير، وأنت بالطبع جزء من هذا النظام لذا نسعد بآراءكم ومقترحاتكم.. <a class="chat-us btn btn-primary" href="javascript:void(0);">قدم مقترح</a>
                    </p>
                </blockquote>
            </div>
        </div>
        <div class="space-10"></div>
        <h3>ملخص سيارات الشركة بالأردن</h3>
        <div class="row">
            <div class="col-md-6 col-sm-12">
                <a class="tile-stats tile-red" href="Cars" title="جميع سيارات الأردن">
                    <div class="icon"><i class="entypo-users"></i></div>
                    <div class="num cars">0</div>
                    <h3>جميع السيارات</h3>
                    <p>عرض جميع السيارات الواصلة والتى بالطريق إلى الأردن.</p>
                </a>
            </div>
            <div class="col-md-6 col-sm-12">
                <a class="tile-stats tile-green" href="Clients" title="العملاء بالأردن">
                    <div class="icon"><i class="entypo-chart-bar"></i></div>
                    <div class="num clients">0</div>
                    <h3>جميع العملاء</h3>
                    <p>عرض قائمة العملاء بالأردن وحساباتهم.</p>
                </a>
            </div>
            <div class="col-md-6 col-sm-12">
                <a class="tile-stats tile-blue" href="Containers" title="الحاويات إلى الأردن">
                    <div class="icon"><i class="entypo-rss"></i></div>
                    <div class="num containers">0</div>
                    <h3>الحــاويـــــــــــــات</h3>
                    <p>عرض قائمة الحاويات التى بالطريق إلى الأردن.</p>
                </a>
            </div>
            <div class="col-md-6 col-sm-12">
                <div class="tile-stats tile-gray">
                    <h3>بحث السيارات</h3>
                    <form method="get" action="Car.aspx" id="frmSearchBox">
                        <div class="input-group">
                            <div class="input-group-btn search-options">
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">اختر نوع البحث <span class="caret"></span></button>
                                <ul class="dropdown-menu">
                                    <li><a data-id="id" href="javascript:void(0);">بحث برقم السيارة</a></li>
                                    <li><a data-id="lot" href="javascript:void(0);">بحث برقم اللوت</a></li>
                                    <!--<li><a data-id="ChassisNo" href="javascript:void(0);">بحث برقم الشاصي</a></li>-->
                                </ul>
                            </div>
                            <input type="text" class="form-control searchNo" placeholder="يرجي ادخال الرقم" required>
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="submit" id="btnSearch">
                                    <i class="fa fa-search"></i>
                                    بحث</button>
                            </span>
                        </div>
                    </form>
                    <div class="num">&nbsp;</div>
                </div>
            </div>
        </div>
        <div class="space-50"></div>
        <div class="space-10"></div>
    </div>
    <script src="/Scripts/jordan/dashboard.js"></script>
</asp:Content>
