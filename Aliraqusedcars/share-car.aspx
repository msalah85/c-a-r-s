<%@ Page Language="C#" AutoEventWireup="true" CodeFile="share-car.aspx.cs" Inherits="share_car2" EnableSessionState="ReadOnly" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="ar-AE" xmlns:fb="http://ogp.me/ns/fb#">
<head runat="server">
    <meta charset="UTF-8" />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="dns-prefetch" href="//connect.facebook.net" />
    <title>مشاركة السيارة على صفحات الشركةالتواصل الاجتماعي</title>
    <meta property="fb:app_id" content="478748692311716" />
    <meta property="fb:admins" content="aliraqusedcars" />
    <base id="appUrl" href="/admin-admin-2015/" />
    <link href="/App_Themes/iraq/allcss.min.css" rel="stylesheet" />
    <style>
        .shareme table {
            width: 99%;
            border: 0;
            font-family: 'Droid Arabic Kufi',Tahoma,Verdana;
        }

            .shareme table td {
                border: 0;
                padding: 5px;
                vertical-align: top;
            }

        .shareme img {
            max-height: 300px;
        }

        input, textarea {
            width: 98%;
            padding: 5px;
            min-height: 20px;
        }

        textarea {
            min-height: 70px !important;
        }
    </style>
</head>
<body dir="rtl">
    <div class="message"></div>
    <form id="ShareMeForm" class="shareme" runat="server">
        <table>
            <tr>
                <td class="cel-bg text-left" width="20%">موديل السيارة</td>
                <td>
                    <asp:TextBox ID="name" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="cel-bg text-left">نص الرسالة</td>
                <td>
                    <asp:TextBox ID="message" TextMode="MultiLine" Height="100" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="cel-bg text-left">الصورة</td>
                <td>
                    <asp:Image runat="server" ID="imgMain" alt="car" ImageUrl="/public/cars/noimage.gif" />
                    <asp:TextBox ID="picture" runat="server" CssClass="hidden"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="cel-bg text-left">عنوان الصورة</td>
                <td>
                    <asp:TextBox ID="caption" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="cel-bg text-left">تفاصيل السيارة</td>
                <td>
                    <asp:TextBox ID="link" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="cel-bg text-left">مشاركة</td>
                <td>
                    <a href="javascript:void(0);" class="btn btn-small btn-primary btnSocial">شارك فيس بوك - تويتر - انستجرام</a>
                    <a href="javascript:window.close();" class="btn btn-small"><i class="icon-remove"></i>اغلاق الصفحة</a>
                </td>
            </tr>
        </table>
    </form>
    <script src="/App_Themes/iraq/js/app.min.js?v=5.9"></script>
    <script>
        var potingToSocial = function () {
            var data = {
                title: $('#name').val(),
                message: $('#message').val(),
                url: $('#link').val(),
                image: $('#picture').val(),
            },
            showMessage = function (typeID, message) {
                var msg = "<div class='alert alert-" + (typeID > 1 ? "danger" : "success") + "'>" + message + "</div>";
                $('.message').html(msg);
            },
            PostedSocialCallBack = function (d) {
                d = d.d;

                console.log(d);
                showMessage(1, 'تم نشر الصورة على صفحات الشركة على فيس بوك - تويتر - انستجرام.');

                //if (d.Status === true) {
                //    showMessage(1, 'تم نشر الصورة على صفحات الشركة على فيس بوك - تويتر - انستجرام.');
                //} else {
                //    showMessage(2, 'خطأ أثناء نشر الصورة على صفحات الشركة على فيس بوك - تويتر - انستجرام. يرجي المحاولة فى وقت لاحق أو الاتصال بادارة النظام.');
                //}
            };

            console.log(data);

            dataService.callAjax('Post', JSON.stringify(data), '/api/social.aspx/postToAll', PostedSocialCallBack, commonManger.errorException);
        };

        // start post to all pages
        $('.btnSocial').click(function (e) {
            e.preventDefault();

            potingToSocial();

        });
    </script>
</body>
</html>
