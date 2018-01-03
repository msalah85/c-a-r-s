<%@ Page Title="نتيجة بحث فواتير الشحن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="SearchShipping.aspx.cs" Inherits="SearchShipping" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">نتيجة بحث الشحن</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>نتيجة بحث فواتير الشحن
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
                عـــــــرض نتيجة بحث فواتير الشحن
            </div>
            <form id="aspnetForm" runat="server" clientidmode="Static">
                <asp:GridView ID="gvItems" runat="server" AutoGenerateColumns="False" EmptyDataText="عفــواً! لا توجد بيانات."
                    GridLines="None" CssClass="table table-bordered table-striped table-hover gvItems" PageSize="5000">
                    <Columns>
                        <asp:TemplateField HeaderStyle-Width="80" ItemStyle-CssClass="center hidden-phone"
                            HeaderStyle-CssClass="hidden-phone" FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <a data-rel="tooltip" title="طباعة" href='InvoiceShippingPrint.aspx?id=<%#Eval("ShippInvoiceID")%>'><%# Eval("ShippInvoiceNo")%></a>
                            </ItemTemplate>
                            <HeaderTemplate>
                                م
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField FooterStyle-CssClass="srch">
                            <ItemTemplate>
                                <%# Convert.ToDateTime(Eval("InvoiceDate")).ToShortDateString()%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                تاريخ الفاتورة
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("ShipCompanyNameAr") + " - " + Eval("ShipMainCompanyNameAr")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                الشاحن
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("BOL")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                BOL
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("DistinationNameAr") +" - "+ string.Format("{0: dd/MM/yyyy}",Eval("ArrivalDate"))%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                بلد وتاريخ الوصول
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("ContainerNo") + " - " + Eval("ContainerSize")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                رقم وحجم الكونتينر
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%# Eval("CarsNo")%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                عدد السيارات
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-phone" HeaderStyle-CssClass="hidden-phone"
                            FooterStyle-CssClass="hidden-phone srch">
                            <ItemTemplate>
                                <%#string.Format("{0:0,0}", Eval("TotalAmount"))%>
                            </ItemTemplate>
                            <HeaderTemplate>
                                المبلغ <sub>$</sub>
                            </HeaderTemplate>
                        </asp:TemplateField>
                        <asp:TemplateField ItemStyle-CssClass="hidden-print" HeaderStyle-CssClass="hidden-print"
                            FooterStyle-CssClass="hidden-print" AccessibleHeaderText="طباعة">
                            <ItemTemplate>
                                <%# Eval("InvoiceNo")%>
                                <div class="tools pull-left">
                                    <asp:HyperLink ID="lbPrint" class="btn btn-minier btn-grey" NavigateUrl='<%# "InvoiceShippingPrint.aspx?id=" + Eval("ShippInvoiceID")%>'
                                        runat="server" data-rel="tooltip" data-placement="top" data-original-title="طباعه"
                                        ToolTip="طباعه"><i class="icon-print icon-only"></i></asp:HyperLink>
                                </div>
                            </ItemTemplate>
                            <HeaderTemplate>
                                رقم الفاتورة
                            </HeaderTemplate>
                        </asp:TemplateField>
                    </Columns>
                    <PagerSettings Mode="NumericFirstLast" />
                </asp:GridView>
            </form>
        </div>
    </div>
</asp:Content>
