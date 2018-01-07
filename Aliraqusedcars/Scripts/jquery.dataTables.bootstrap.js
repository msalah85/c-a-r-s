﻿/*http://datatables.net/plug-ins/pagination#bootstrap*/
$.extend(!0, $.fn.dataTable.defaults, { sDom: "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>", sPaginationType: "bootstrap", oLanguage: { sLengthMenu: "عــرض _MENU_ ســجل" } }), $.fn.dataTableExt.oApi.fnPagingInfo = function (a) { return { iStart: a._iDisplayStart, iEnd: a.fnDisplayEnd(), iLength: a._iDisplayLength, iTotal: a.fnRecordsTotal(), iFilteredTotal: a.fnRecordsDisplay(), iPage: Math.ceil(a._iDisplayStart / a._iDisplayLength), iTotalPages: Math.ceil(a.fnRecordsDisplay() / a._iDisplayLength) } }, $.extend($.fn.dataTableExt.oPagination, { bootstrap: { fnInit: function (a, i, e) { var t = (a.oLanguage.oPaginate, function (i) { i.preventDefault(), a.oApi._fnPageChange(a, i.data.action) && e(a) }); $(i).addClass("pagination").append('<ul><li class="prev disabled"><a href="#"><<i class="icon-double-angle-right"></i></a></li><li class="next disabled"><a href="#"><i class="icon-double-angle-left"></i>></a></li></ul>'); var l = $("a", i); $(l[0]).bind("click.DT", { action: "previous" }, t), $(l[1]).bind("click.DT", { action: "next" }, t) }, fnUpdate: function (a, i) { var e, t, l, n, s, o = 5, d = a.oInstance.fnPagingInfo(), g = a.aanFeatures.p, r = Math.floor(o / 2); for (d.iTotalPages < o ? (n = 1, s = d.iTotalPages) : d.iPage <= r ? (n = 1, s = o) : d.iPage >= d.iTotalPages - r ? (n = d.iTotalPages - o + 1, s = d.iTotalPages) : (n = d.iPage - r + 1, s = n + o - 1), e = 0, iLen = g.length; e < iLen; e++) { for ($("li:gt(0)", g[e]).filter(":not(:last)").remove(), t = n; s >= t; t++) l = t == d.iPage + 1 ? 'class="active"' : "", $("<li " + l + '><a data-action="reload" href="#">' + t + "</a></li>").insertBefore($("li:last", g[e])[0]).bind("click", function (e) { e.preventDefault(), a._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * d.iLength, i(a) }); 0 === d.iPage ? $("li:first", g[e]).addClass("disabled") : $("li:first", g[e]).removeClass("disabled"), d.iPage === d.iTotalPages - 1 || 0 === d.iTotalPages ? $("li:last", g[e]).addClass("disabled") : $("li:last", g[e]).removeClass("disabled") } } } });