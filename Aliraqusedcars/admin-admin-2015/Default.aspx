<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="admin_eta_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>تسجيل الدخول - المبيعات والمشتريات - شركة العراق</title>
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <link type="image/x-icon" href="/favicon.ico" rel="shortcut icon" />
    <meta name="author" content="Mohamed Salah: eng.msalah.abdullah@gmail.com" />
    <meta name="generator" content="eng.msalah.abdullah@gmail.com" />
    <meta name="copyright" content="شركة العراق لتجارة السيارات المستعملة وقطع الغيار" />
    <asp:PlaceHolder runat="server">
        <link href="/App_Themes/iraq/login.min.css" rel="stylesheet" type="text/css" />
    </asp:PlaceHolder>
</head>
<body>
    <div class="alpha-bg"></div>
    <form id="login" runat="server" class="login" autocomplete="off">
        <h1>تسجيل الدخول
        </h1>
        <fieldset id="message">
            <asp:Label ID="lblError" runat="server" Font-Bold="true" ForeColor="Red"></asp:Label>
        </fieldset>
        <fieldset id="inputs">
            <asp:TextBox ID="txtUsername" AutoCompleteType="None" CssClass="username" runat="server" placeholder="اسم المستخدم"
                autofocus required></asp:TextBox><asp:RequiredFieldValidator ID="RequiredFieldValidator1" Display="Dynamic"
                    runat="server" ControlToValidate="txtUsername" ForeColor="Red" ValidationGroup="login"
                    SetFocusOnError="true" ToolTip="مطلـــــــــوب!.">مطلـــــــــوب اســــــم المستــــــخدم!.</asp:RequiredFieldValidator>
            <asp:TextBox ID="txtPassword" AutoCompleteType="None" CssClass="password" TextMode="Password" placeholder="كلمة المرور"
                required runat="server"></asp:TextBox><asp:RequiredFieldValidator ValidationGroup="login"
                    SetFocusOnError="true" ForeColor="Red" ID="RequiredFieldValidator2" runat="server"
                    ToolTip="مطلـــــــــوب!." ControlToValidate="txtPassword">مطلـــــــــوب كلمــــــة المــــرور!.</asp:RequiredFieldValidator>
        </fieldset>
        <fieldset id="actions">
            <asp:Button ID="bntLogin" CssClass="btn" ValidationGroup="login" runat="server" Text="تسجيـــــل الدخـــــول"
                OnClick="bntLogin_Click" />
            <p>&copy; <%= DateTime.Now.Year %> جميع الحقوق محفوظة لشركة <a href="/" title="العراق لتجارة السيارات المستعملة" target="_blank">العراق لتجارة السيارات المستعملة، وقطع الغيار</a></p>
        </fieldset>
        <fieldset>
        </fieldset>
    </form>
</body>
</html>
