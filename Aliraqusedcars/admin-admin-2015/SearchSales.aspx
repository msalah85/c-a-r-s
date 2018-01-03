<%@ Page Title="نتيجة بحث فواتير البيع" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="SearchSales.aspx.cs" Inherits="SearchSales" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">نتيجة بحث فواتير البيع</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>نتيجة بحث فواتير البيع
            </h1>
        </div>
        <div class="row-fluid">
            <asp:Panel class="alert alert-block" ID="divError" runat="server" Visible="false">
                <button type="button" class="close" data-dismiss="alert">
                    <i class="icon-remove"></i>
                </button>
                <strong>
                    <asp:Label ID="lblError" runat="server" /></strong>
            </asp:Panel>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض نتيجة بحث فواتير البيع
            </div>
            <form id="aspnetForm" runat="server" clientidmode="Static">
                <asp:GridView ID="gvItems" runat="server" AutoGenerateColumns="False" EmptyDataText="عفــواً! لا توجد بيانات."
                    GridLines="None" CssClass="table table-bordered table-striped table-hover gvItems"
                    PageSize="5000" ShowFooter="false">
                    <Columns>
                        <asp:TemplateField HeaderStyle-Width="100">
                            <ItemTemplate>
                                <a target="_blank" href="InvoiceSalePrint.aspx?id=<%#Eval("SaleInvoiceID") %>" title="طباعه الفاتورة">
                                    <%# Eval("SaleInvoiceID")%></a>
                            </ItemTemplate>
                            <HeaderTemplate>
                                م. فاتورة البيع
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField HeaderStyle-Width="90">
                            <ItemTemplate>
                                <a target="_blank" href="InvoiceSalePrint.aspx?id=<%#Eval("SaleInvoiceID") %>" title="طباعه الفاتورة">
                                    <%# Eval("CarID")%></a>
                            </ItemTemplate>
                            <HeaderTemplate>
                                رقم السيارة
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Convert.ToDateTime(Eval("InvoiceDate")).ToShortDateString()%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                تاريخ الفاتورة
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <%# Eval("full_name")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                العميل
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%#string.Format("{0:0,0}", Eval("SalePrice"))%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                سعر البيع<sub>$</sub>
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="center hidden-phone"
                            HeaderStyle-CssClass="hidden-phone" FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("ArrivalDate") != null ? Convert.ToDateTime(Eval("ArrivalDate")).ToShortDateString() : ""%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                تاريخ الوصول
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("DistinationNameEn")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                جهة الوصول
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("LotNo")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                رقم اللوت
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField>
                            <ItemTemplate>
                                <%# Eval("TypeNameEn") + " - " + Eval("Year") + " - " + Eval("WorkingStatusName")%>
                                <%# Eval("IsDeleted").ToString().Equals("False") ? "" : "<b class='red pull-left'>فاتورة ملغاه</b>"%>
                                <a class="btn btn-grey btn-mini pull-left btn-print" href="InvoiceSalePrint.aspx?sig=1&id=<%#Eval("SaleInvoiceID") %>" title="طباعه الفاتورة">طباعة</a>
                            </ItemTemplate>
                            <HeaderTemplate>
                                نوع السيارة
                            </HeaderTemplate>
                        </asp:TemplateField>
                    </Columns>
                    <PagerSettings Mode="NumericFirstLast" />
                </asp:GridView>
            </form>
        </div>
    </div>
    <style>
        .dt-buttons {
            display: none;
        }
    </style>
    <script>
        $('.btn-print').click(function (e) {
            e.preventDefault();
            var myWindow = window.open($(this).attr('href'), "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=30,left=100,width=800,height=800");
        });
        $.extend(true, $.fn.DataTable.defaults, {
            buttons: [],
            "searching": false,
            "ordering": false
        });
    </script>
</asp:Content>
