/*!Bootstrap-select v1.9.3*/ ! function (a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function (a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function (a) {
    ! function (a) {
        "use strict";

        function b(b) {
            var c = [{
                re: /[\xC0-\xC6]/g,
                ch: "A"
            }, {
                re: /[\xE0-\xE6]/g,
                ch: "a"
            }, {
                re: /[\xC8-\xCB]/g,
                ch: "E"
            }, {
                re: /[\xE8-\xEB]/g,
                ch: "e"
            }, {
                re: /[\xCC-\xCF]/g,
                ch: "I"
            }, {
                re: /[\xEC-\xEF]/g,
                ch: "i"
            }, {
                re: /[\xD2-\xD6]/g,
                ch: "O"
            }, {
                re: /[\xF2-\xF6]/g,
                ch: "o"
            }, {
                re: /[\xD9-\xDC]/g,
                ch: "U"
            }, {
                re: /[\xF9-\xFC]/g,
                ch: "u"
            }, {
                re: /[\xC7-\xE7]/g,
                ch: "c"
            }, {
                re: /[\xD1]/g,
                ch: "N"
            }, {
                re: /[\xF1]/g,
                ch: "n"
            }];
            return a.each(c, function () {
                b = b.replace(this.re, this.ch)
            }), b
        }

        function c(a) {
            var b = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
                c = "(?:" + Object.keys(b).join("|") + ")",
                d = new RegExp(c),
                e = new RegExp(c, "g"),
                f = null == a ? "" : "" + a;
            return d.test(f) ? f.replace(e, function (a) {
                return b[a]
            }) : f
        }

        function d(b, c) {
            var d = arguments,
                f = b,
                g = c;
            [].shift.apply(d);
            var h, i = this.each(function () {
                var b = a(this);
                if (b.is("select")) {
                    var c = b.data("selectpicker"),
                        i = "object" == typeof f && f;
                    if (c) {
                        if (i)
                            for (var j in i) i.hasOwnProperty(j) && (c.options[j] = i[j])
                    } else {
                        var k = a.extend({}, e.DEFAULTS, a.fn.selectpicker.defaults || {}, b.data(), i);
                        k.template = a.extend({}, e.DEFAULTS.template, a.fn.selectpicker.defaults ? a.fn.selectpicker.defaults.template : {}, b.data().template, i.template), b.data("selectpicker", c = new e(this, k, g))
                    }
                    "string" == typeof f && (h = c[f] instanceof Function ? c[f].apply(c, d) : c.options[f])
                }
            });
            return "undefined" != typeof h ? h : i
        }
        String.prototype.includes || ! function () {
            var a = {}.toString,
                b = function () {
                    try {
                        var a = {},
                            b = Object.defineProperty,
                            c = b(a, a, a) && b
                    } catch (d) { }
                    return c
                }(),
                c = "".indexOf,
                d = function (b) {
                    if (null == this) throw new TypeError;
                    var d = String(this);
                    if (b && "[object RegExp]" == a.call(b)) throw new TypeError;
                    var e = d.length,
                        f = String(b),
                        g = f.length,
                        h = arguments.length > 1 ? arguments[1] : void 0,
                        i = h ? Number(h) : 0;
                    i != i && (i = 0);
                    var j = Math.min(Math.max(i, 0), e);
                    return g + j > e ? !1 : -1 != c.call(d, f, i)
                };
            b ? b(String.prototype, "includes", {
                value: d,
                configurable: !0,
                writable: !0
            }) : String.prototype.includes = d
        }(), String.prototype.startsWith || ! function () {
            var a = function () {
                try {
                    var a = {},
                        b = Object.defineProperty,
                        c = b(a, a, a) && b
                } catch (d) { }
                return c
            }(),
                b = {}.toString,
                c = function (a) {
                    if (null == this) throw new TypeError;
                    var c = String(this);
                    if (a && "[object RegExp]" == b.call(a)) throw new TypeError;
                    var d = c.length,
                        e = String(a),
                        f = e.length,
                        g = arguments.length > 1 ? arguments[1] : void 0,
                        h = g ? Number(g) : 0;
                    h != h && (h = 0);
                    var i = Math.min(Math.max(h, 0), d);
                    if (f + i > d) return !1;
                    for (var j = -1; ++j < f;)
                        if (c.charCodeAt(i + j) != e.charCodeAt(j)) return !1;
                    return !0
                };
            a ? a(String.prototype, "startsWith", {
                value: c,
                configurable: !0,
                writable: !0
            }) : String.prototype.startsWith = c
        }(), Object.keys || (Object.keys = function (a, b, c) {
            c = [];
            for (b in a) c.hasOwnProperty.call(a, b) && c.push(b);
            return c
        }), a.fn.triggerNative = function (a) {
            var b, c = this[0];
            c.dispatchEvent ? ("function" == typeof Event ? b = new Event(a, {
                bubbles: !0
            }) : (b = document.createEvent("Event"), b.initEvent(a, !0, !1)), c.dispatchEvent(b)) : (c.fireEvent && (b = document.createEventObject(), b.eventType = a, c.fireEvent("on" + a, b)), this.trigger(a))
        }, a.expr[":"].icontains = function (b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.text()).toUpperCase();
            return f.includes(d[3].toUpperCase())
        }, a.expr[":"].ibegins = function (b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.text()).toUpperCase();
            return f.startsWith(d[3].toUpperCase())
        }, a.expr[":"].aicontains = function (b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.data("normalizedText") || e.text()).toUpperCase();
            return f.includes(d[3].toUpperCase())
        }, a.expr[":"].aibegins = function (b, c, d) {
            var e = a(b),
                f = (e.data("tokens") || e.data("normalizedText") || e.text()).toUpperCase();
            return f.startsWith(d[3].toUpperCase())
        };
        var e = function (b, c, d) {
            d && (d.stopPropagation(), d.preventDefault()), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = c, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = e.prototype.val, this.render = e.prototype.render, this.refresh = e.prototype.refresh, this.setStyle = e.prototype.setStyle, this.selectAll = e.prototype.selectAll, this.deselectAll = e.prototype.deselectAll, this.destroy = e.prototype.destroy, this.remove = e.prototype.remove, this.show = e.prototype.show, this.hide = e.prototype.hide, this.init()
        };
        e.VERSION = "1.9.3", e.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function (a, b) {
                return 1 == a ? "{0} item selected" : "{0} items selected"
            },
            maxOptionsText: function (a, b) {
                return [1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: !1,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: "btn-default",
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: !1,
            container: !1,
            hideDisabled: !1,
            showSubtext: !1,
            showIcon: !0,
            showContent: !0,
            dropupAuto: !0,
            header: !1,
            liveSearch: !1,
            liveSearchPlaceholder: null,
            liveSearchNormalize: !1,
            liveSearchStyle: "contains",
            actionsBox: !1,
            iconBase: "glyphicon",
            tickIcon: "glyphicon-ok",
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: !1,
            mobile: !1,
            selectOnTab: !1,
            dropdownAlignRight: !1
        }, e.prototype = {
            constructor: e,
            init: function () {
                var b = this,
                    c = this.$element.attr("id");
                this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof c && (this.$button.attr("data-id", c), a('label[for="' + c + '"]').click(function (a) {
                    a.preventDefault(), b.$button.focus()
                })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
                    "hide.bs.dropdown": function (a) {
                        b.$element.trigger("hide.bs.select", a)
                    },
                    "hidden.bs.dropdown": function (a) {
                        b.$element.trigger("hidden.bs.select", a)
                    },
                    "show.bs.dropdown": function (a) {
                        b.$element.trigger("show.bs.select", a)
                    },
                    "shown.bs.dropdown": function (a) {
                        b.$element.trigger("shown.bs.select", a)
                    }
                }), b.$element[0].hasAttribute("required") && this.$element.on("invalid", function () {
                    b.$button.addClass("bs-invalid").focus(), b.$element.on({
                        "focus.bs.select": function () {
                            b.$button.focus(), b.$element.off("focus.bs.select")
                        },
                        "shown.bs.select": function () {
                            b.$element.val(b.$element.val()).off("shown.bs.select")
                        },
                        "rendered.bs.select": function () {
                            this.validity.valid && b.$button.removeClass("bs-invalid"), b.$element.off("rendered.bs.select")
                        }
                    })
                }), setTimeout(function () {
                    b.$element.trigger("loaded.bs.select")
                })
            },
            createDropdown: function () {
                var b = this.multiple ? " show-tick" : "",
                    d = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                    e = this.autofocus ? " autofocus" : "",
                    f = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                    g = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + c(this.options.liveSearchPlaceholder) + '"') + "></div>" : "",
                    h = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                    i = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
                    j = '<div class="btn-group bootstrap-select' + b + d + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + e + '><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open">' + f + g + h + '<ul class="dropdown-menu inner" role="menu"></ul>' + i + "</div></div>";
                return a(j)
            },
            createView: function () {
                var a = this.createDropdown(),
                    b = this.createLi();
                return a.find("ul")[0].innerHTML = b, a
            },
            reloadLi: function () {
                this.destroyLi();
                var a = this.createLi();
                this.$menuInner[0].innerHTML = a
            },
            destroyLi: function () {
                this.$menu.find("li").remove()
            },
            createLi: function () {
                var d = this,
                    e = [],
                    f = 0,
                    g = document.createElement("option"),
                    h = -1,
                    i = function (a, b, c, d) {
                        return "<li" + ("undefined" != typeof c & "" !== c ? ' class="' + c + '"' : "") + ("undefined" != typeof b & null !== b ? ' data-original-index="' + b + '"' : "") + ("undefined" != typeof d & null !== d ? 'data-optgroup="' + d + '"' : "") + ">" + a + "</li>"
                    },
                    j = function (a, e, f, g) {
                        return '<a tabindex="0"' + ("undefined" != typeof e ? ' class="' + e + '"' : "") + ("undefined" != typeof f ? ' style="' + f + '"' : "") + (d.options.liveSearchNormalize ? ' data-normalized-text="' + b(c(a)) + '"' : "") + ("undefined" != typeof g || null !== g ? ' data-tokens="' + g + '"' : "") + ">" + a + '<span class="' + d.options.iconBase + " " + d.options.tickIcon + ' check-mark"></span></a>'
                    };
                if (this.options.title && !this.multiple && (h--, !this.$element.find(".bs-title-option").length)) {
                    var k = this.$element[0];
                    g.className = "bs-title-option", g.appendChild(document.createTextNode(this.options.title)), g.value = "", k.insertBefore(g, k.firstChild), void 0 === a(k.options[k.selectedIndex]).attr("selected") && (g.selected = !0)
                }
                return this.$element.find("option").each(function (b) {
                    var c = a(this);
                    if (h++, !c.hasClass("bs-title-option")) {
                        var g = this.className || "",
                            k = this.style.cssText,
                            l = c.data("content") ? c.data("content") : c.html(),
                            m = c.data("tokens") ? c.data("tokens") : null,
                            n = "undefined" != typeof c.data("subtext") ? '<small class="text-muted">' + c.data("subtext") + "</small>" : "",
                            o = "undefined" != typeof c.data("icon") ? '<span class="' + d.options.iconBase + " " + c.data("icon") + '"></span> ' : "",
                            p = this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled;
                        if ("" !== o && p && (o = "<span>" + o + "</span>"), d.options.hideDisabled && p) return void h--;
                        if (c.data("content") || (l = o + '<span class="text">' + l + n + "</span>"), "OPTGROUP" === this.parentNode.tagName && c.data("divider") !== !0) {
                            var q = " " + this.parentNode.className || "";
                            if (0 === c.index()) {
                                f += 1;
                                var r = this.parentNode.label,
                                    s = "undefined" != typeof c.parent().data("subtext") ? '<small class="text-muted">' + c.parent().data("subtext") + "</small>" : "",
                                    t = c.parent().data("icon") ? '<span class="' + d.options.iconBase + " " + c.parent().data("icon") + '"></span> ' : "";
                                r = t + '<span class="text">' + r + s + "</span>", 0 !== b && e.length > 0 && (h++, e.push(i("", null, "divider", f + "div"))), h++, e.push(i(r, null, "dropdown-header" + q, f))
                            }
                            e.push(i(j(l, "opt " + g + q, k, m), b, "", f))
                        } else c.data("divider") === !0 ? e.push(i("", b, "divider")) : c.data("hidden") === !0 ? e.push(i(j(l, g, k, m), b, "hidden is-hidden")) : (this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName && (h++, e.push(i("", null, "divider", f + "div"))), e.push(i(j(l, g, k, m), b)));
                        d.liObj[b] = h
                    }
                }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), e.join("")
            },
            findLis: function () {
                return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
            },
            render: function (b) {
                var c, d = this;
                b !== !1 && this.$element.find("option").each(function (a) {
                    var b = d.findLis().eq(d.liObj[a]);
                    d.setDisabled(a, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, b), d.setSelected(a, this.selected, b)
                }), this.tabIndex();
                var e = this.$element.find("option").map(function () {
                    if (this.selected) {
                        if (d.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
                        var b, c = a(this),
                            e = c.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + c.data("icon") + '"></i> ' : "";
                        return b = d.options.showSubtext && c.data("subtext") && !d.multiple ? ' <small class="text-muted">' + c.data("subtext") + "</small>" : "", "undefined" != typeof c.attr("title") ? c.attr("title") : c.data("content") && d.options.showContent ? c.data("content") : e + c.html() + b
                    }
                }).toArray(),
                    f = this.multiple ? e.join(this.options.multipleSeparator) : e[0];
                if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                    var g = this.options.selectedTextFormat.split(">");
                    if (g.length > 1 && e.length > g[1] || 1 == g.length && e.length >= 2) {
                        c = this.options.hideDisabled ? ", [disabled]" : "";
                        var h = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + c).length,
                            i = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(e.length, h) : this.options.countSelectedText;
                        f = i.replace("{0}", e.length.toString()).replace("{1}", h.toString())
                    }
                }
                void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (f = this.options.title), f || (f = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", a.trim(f.replace(/<[^>]*>?/g, ""))), this.$button.children(".filter-option").html(f), this.$element.trigger("rendered.bs.select")
            },
            setStyle: function (a, b) {
                this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                var c = a ? a : this.options.style;
                "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c))
            },
            liHeight: function (b) {
                if (b || this.options.size !== !1 && !this.sizeInfo) {
                    var c = document.createElement("div"),
                        d = document.createElement("div"),
                        e = document.createElement("ul"),
                        f = document.createElement("li"),
                        g = document.createElement("li"),
                        h = document.createElement("a"),
                        i = document.createElement("span"),
                        j = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
                        k = this.options.liveSearch ? document.createElement("div") : null,
                        l = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        m = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                    if (i.className = "text", c.className = this.$menu[0].parentNode.className + " open", d.className = "dropdown-menu open", e.className = "dropdown-menu inner", f.className = "divider", i.appendChild(document.createTextNode("Inner text")), h.appendChild(i), g.appendChild(h), e.appendChild(g), e.appendChild(f), j && d.appendChild(j), k) {
                        var n = document.createElement("span");
                        k.className = "bs-searchbox", n.className = "form-control", k.appendChild(n), d.appendChild(k)
                    }
                    l && d.appendChild(l), d.appendChild(e), m && d.appendChild(m), c.appendChild(d), document.body.appendChild(c);
                    var o = h.offsetHeight,
                        p = j ? j.offsetHeight : 0,
                        q = k ? k.offsetHeight : 0,
                        r = l ? l.offsetHeight : 0,
                        s = m ? m.offsetHeight : 0,
                        t = a(f).outerHeight(!0),
                        u = "function" == typeof getComputedStyle ? getComputedStyle(d) : !1,
                        v = u ? null : a(d),
                        w = parseInt(u ? u.paddingTop : v.css("paddingTop")) + parseInt(u ? u.paddingBottom : v.css("paddingBottom")) + parseInt(u ? u.borderTopWidth : v.css("borderTopWidth")) + parseInt(u ? u.borderBottomWidth : v.css("borderBottomWidth")),
                        x = w + parseInt(u ? u.marginTop : v.css("marginTop")) + parseInt(u ? u.marginBottom : v.css("marginBottom")) + 2;
                    document.body.removeChild(c), this.sizeInfo = {
                        liHeight: o,
                        headerHeight: p,
                        searchHeight: q,
                        actionsHeight: r,
                        doneButtonHeight: s,
                        dividerHeight: t,
                        menuPadding: w,
                        menuExtras: x
                    }
                }
            },
            setSize: function () {
                if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), this.options.size !== !1) {
                    var b, c, d, e, f = this,
                        g = this.$menu,
                        h = this.$menuInner,
                        i = a(window),
                        j = this.$newElement[0].offsetHeight,
                        k = this.sizeInfo.liHeight,
                        l = this.sizeInfo.headerHeight,
                        m = this.sizeInfo.searchHeight,
                        n = this.sizeInfo.actionsHeight,
                        o = this.sizeInfo.doneButtonHeight,
                        p = this.sizeInfo.dividerHeight,
                        q = this.sizeInfo.menuPadding,
                        r = this.sizeInfo.menuExtras,
                        s = this.options.hideDisabled ? ".disabled" : "",
                        t = function () {
                            d = f.$newElement.offset().top - i.scrollTop(), e = i.height() - d - j
                        };
                    if (t(), "auto" === this.options.size) {
                        var u = function () {
                            var i, j = function (b, c) {
                                return function (d) {
                                    return c ? d.classList ? d.classList.contains(b) : a(d).hasClass(b) : !(d.classList ? d.classList.contains(b) : a(d).hasClass(b))
                                }
                            },
                                p = f.$menuInner[0].getElementsByTagName("li"),
                                s = Array.prototype.filter ? Array.prototype.filter.call(p, j("hidden", !1)) : f.$lis.not(".hidden"),
                                u = Array.prototype.filter ? Array.prototype.filter.call(s, j("dropdown-header", !0)) : s.filter(".dropdown-header");
                            t(), b = e - r, f.options.container ? (g.data("height") || g.data("height", g.height()), c = g.data("height")) : c = g.height(), f.options.dropupAuto && f.$newElement.toggleClass("dropup", d > e && c > b - r), f.$newElement.hasClass("dropup") && (b = d - r), i = s.length + u.length > 3 ? 3 * k + r - 2 : 0, g.css({
                                "max-height": b + "px",
                                overflow: "hidden",
                                "min-height": i + l + m + n + o + "px"
                            }), h.css({
                                "max-height": b - l - m - n - o - q + "px",
                                "overflow-y": "auto",
                                "min-height": Math.max(i - q, 0) + "px"
                            })
                        };
                        u(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", u), i.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", u)
                    } else if (this.options.size && "auto" != this.options.size && this.$lis.not(s).length > this.options.size) {
                        var v = this.$lis.not(".divider").not(s).children().slice(0, this.options.size).last().parent().index(),
                            w = this.$lis.slice(0, v + 1).filter(".divider").length;
                        b = k * this.options.size + w * p + q, f.options.container ? (g.data("height") || g.data("height", g.height()), c = g.data("height")) : c = g.height(), f.options.dropupAuto && this.$newElement.toggleClass("dropup", d > e && c > b - r), g.css({
                            "max-height": b + l + m + n + o + "px",
                            overflow: "hidden",
                            "min-height": ""
                        }), h.css({
                            "max-height": b - q + "px",
                            "overflow-y": "auto",
                            "min-height": ""
                        })
                    }
                }
            },
            setWidth: function () {
                if ("auto" === this.options.width) {
                    this.$menu.css("min-width", "0");
                    var a = this.$menu.parent().clone().appendTo("body"),
                        b = this.options.container ? this.$newElement.clone().appendTo("body") : a,
                        c = a.children(".dropdown-menu").outerWidth(),
                        d = b.css("width", "auto").children("button").outerWidth();
                    a.remove(), b.remove(), this.$newElement.css("width", Math.max(c, d) + "px")
                } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
                this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
            },
            selectPosition: function () {
                this.$bsContainer = a('<div class="bs-container" />');
                var b, c, d = this,
                    e = function (a) {
                        d.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", a.hasClass("dropup")), b = a.offset(), c = a.hasClass("dropup") ? 0 : a[0].offsetHeight, d.$bsContainer.css({
                            top: b.top + c,
                            left: b.left,
                            width: a[0].offsetWidth
                        })
                    };
                this.$button.on("click", function () {
                    var b = a(this);
                    d.isDisabled() || (e(d.$newElement), d.$bsContainer.appendTo(d.options.container).toggleClass("open", !b.hasClass("open")).append(d.$menu))
                }), a(window).on("resize scroll", function () {
                    e(d.$newElement)
                }), this.$element.on("hide.bs.select", function () {
                    d.$menu.data("height", d.$menu.height()), d.$bsContainer.detach()
                })
            },
            setSelected: function (a, b, c) {
                c || (c = this.findLis().eq(this.liObj[a])), c.toggleClass("selected", b)
            },
            setDisabled: function (a, b, c) {
                c || (c = this.findLis().eq(this.liObj[a])), b ? c.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1) : c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0)
            },
            isDisabled: function () {
                return this.$element[0].disabled
            },
            checkDisabled: function () {
                var a = this;
                this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled")), -1 != this.$button.attr("tabindex") || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function () {
                    return !a.isDisabled()
                })
            },
            tabIndex: function () {
                this.$element.data("tabindex") !== this.$element.attr("tabindex") && -98 !== this.$element.attr("tabindex") && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98)
            },
            clickListener: function () {
                var b = this,
                    c = a(document);
                this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function (a) {
                    a.stopPropagation()
                }), c.data("spaceSelect", !1), this.$button.on("keyup", function (a) {
                    /(32)/.test(a.keyCode.toString(10)) && c.data("spaceSelect") && (a.preventDefault(), c.data("spaceSelect", !1))
                }), this.$button.on("click", function () {
                    b.setSize(), b.$element.on("shown.bs.select", function () {
                        if (b.options.liveSearch || b.multiple) {
                            if (!b.multiple) {
                                var a = b.liObj[b.$element[0].selectedIndex];
                                if ("number" != typeof a || b.options.size === !1) return;
                                var c = b.$lis.eq(a)[0].offsetTop - b.$menuInner[0].offsetTop;
                                c = c - b.$menuInner[0].offsetHeight / 2 + b.sizeInfo.liHeight / 2, b.$menuInner[0].scrollTop = c
                            }
                        } else b.$menuInner.find(".selected a").focus()
                    })
                }), this.$menuInner.on("click", "li a", function (c) {
                    var d = a(this),
                        e = d.parent().data("originalIndex"),
                        f = b.$element.val(),
                        g = b.$element.prop("selectedIndex");
                    if (b.multiple && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled")) {
                        var h = b.$element.find("option"),
                            i = h.eq(e),
                            j = i.prop("selected"),
                            k = i.parent("optgroup"),
                            l = b.options.maxOptions,
                            m = k.data("maxOptions") || !1;
                        if (b.multiple) {
                            if (i.prop("selected", !j), b.setSelected(e, !j), d.blur(), l !== !1 || m !== !1) {
                                var n = l < h.filter(":selected").length,
                                    o = m < k.find("option:selected").length;
                                if (l && n || m && o)
                                    if (l && 1 == l) h.prop("selected", !1), i.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                                    else if (m && 1 == m) {
                                        k.find("option:selected").prop("selected", !1), i.prop("selected", !0);
                                        var p = d.parent().data("optgroup");
                                        b.$menuInner.find('[data-optgroup="' + p + '"]').removeClass("selected"), b.setSelected(e, !0)
                                    } else {
                                        var q = "function" == typeof b.options.maxOptionsText ? b.options.maxOptionsText(l, m) : b.options.maxOptionsText,
                                            r = q[0].replace("{n}", l),
                                            s = q[1].replace("{n}", m),
                                            t = a('<div class="notify"></div>');
                                        q[2] && (r = r.replace("{var}", q[2][l > 1 ? 0 : 1]), s = s.replace("{var}", q[2][m > 1 ? 0 : 1])), i.prop("selected", !1), b.$menu.append(t), l && n && (t.append(a("<div>" + r + "</div>")), b.$element.trigger("maxReached.bs.select")), m && o && (t.append(a("<div>" + s + "</div>")), b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function () {
                                            b.setSelected(e, !1)
                                        }, 10), t.delay(750).fadeOut(300, function () {
                                            a(this).remove()
                                        })
                                    }
                            }
                        } else h.prop("selected", !1), i.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                        b.multiple ? b.options.liveSearch && b.$searchbox.focus() : b.$button.focus(), (f != b.$element.val() && b.multiple || g != b.$element.prop("selectedIndex") && !b.multiple) && (b.$element.triggerNative("change"), b.$element.trigger("changed.bs.select", [e, i.prop("selected"), j]))
                    }
                }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function (c) {
                    c.currentTarget == this && (c.preventDefault(), c.stopPropagation(), b.options.liveSearch && !a(c.target).hasClass("close") ? b.$searchbox.focus() : b.$button.focus())
                }), this.$menuInner.on("click", ".divider, .dropdown-header", function (a) {
                    a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus()
                }), this.$menu.on("click", ".popover-title .close", function () {
                    b.$button.click()
                }), this.$searchbox.on("click", function (a) {
                    a.stopPropagation()
                }), this.$menu.on("click", ".actions-btn", function (c) {
                    b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).hasClass("bs-select-all") ? b.selectAll() : b.deselectAll(), b.$element.triggerNative("change")
                }), this.$element.change(function () {
                    b.render(!1)
                })
            },
            liveSearchListener: function () {
                var d = this,
                    e = a('<li class="no-results"></li>');
                this.$button.on("click.dropdown.data-api touchstart.dropdown.data-api", function () {
                    d.$menuInner.find(".active").removeClass("active"), d.$searchbox.val() && (d.$searchbox.val(""), d.$lis.not(".is-hidden").removeClass("hidden"), e.parent().length && e.remove()), d.multiple || d.$menuInner.find(".selected").addClass("active"), setTimeout(function () {
                        d.$searchbox.focus()
                    }, 10)
                }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function (a) {
                    a.stopPropagation()
                }), this.$searchbox.on("input propertychange", function () {
                    if (d.$searchbox.val()) {
                        var f = d.$lis.not(".is-hidden").removeClass("hidden").children("a");
                        f = d.options.liveSearchNormalize ? f.not(":a" + d._searchStyle() + '("' + b(d.$searchbox.val()) + '")') : f.not(":" + d._searchStyle() + '("' + d.$searchbox.val() + '")'), f.parent().addClass("hidden"), d.$lis.filter(".dropdown-header").each(function () {
                            var b = a(this),
                                c = b.data("optgroup");
                            0 === d.$lis.filter("[data-optgroup=" + c + "]").not(b).not(".hidden").length && (b.addClass("hidden"), d.$lis.filter("[data-optgroup=" + c + "div]").addClass("hidden"))
                        });
                        var g = d.$lis.not(".hidden");
                        g.each(function (b) {
                            var c = a(this);
                            c.hasClass("divider") && (c.index() === g.first().index() || c.index() === g.last().index() || g.eq(b + 1).hasClass("divider")) && c.addClass("hidden")
                        }), d.$lis.not(".hidden, .no-results").length ? e.parent().length && e.remove() : (e.parent().length && e.remove(), e.html(d.options.noneResultsText.replace("{0}", '"' + c(d.$searchbox.val()) + '"')).show(), d.$menuInner.append(e))
                    } else d.$lis.not(".is-hidden").removeClass("hidden"), e.parent().length && e.remove();
                    d.$lis.filter(".active").removeClass("active"), d.$searchbox.val() && d.$lis.not(".hidden, .divider, .dropdown-header").eq(0).addClass("active").children("a").focus(), a(this).focus()
                })
            },
            _searchStyle: function () {
                var a = {
                    begins: "ibegins",
                    startsWith: "ibegins"
                };
                return a[this.options.liveSearchStyle] || "icontains"
            },
            val: function (a) {
                return "undefined" != typeof a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val()
            },
            changeAll: function (b) {
                "undefined" == typeof b && (b = !0), this.findLis();
                for (var c = this.$element.find("option"), d = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden").toggleClass("selected", b), e = d.length, f = [], g = 0; e > g; g++) {
                    var h = d[g].getAttribute("data-original-index");
                    f[f.length] = c.eq(h)[0]
                }
                a(f).prop("selected", b), this.render(!1)
            },
            selectAll: function () {
                return this.changeAll(!0)
            },
            deselectAll: function () {
                return this.changeAll(!1)
            },
            keydown: function (c) {
                var d, e, f, g, h, i, j, k, l, m = a(this),
                    n = m.is("input") ? m.parent().parent() : m.parent(),
                    o = n.data("this"),
                    p = ":not(.disabled, .hidden, .dropdown-header, .divider)",
                    q = {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        96: "0",
                        97: "1",
                        98: "2",
                        99: "3",
                        100: "4",
                        101: "5",
                        102: "6",
                        103: "7",
                        104: "8",
                        105: "9"
                    };
                if (o.options.liveSearch && (n = m.parent().parent()), o.options.container && (n = o.$menu), d = a("[role=menu] li", n), l = o.$newElement.hasClass("open"), !l && (c.keyCode >= 48 && c.keyCode <= 57 || c.keyCode >= 96 && c.keyCode <= 105 || c.keyCode >= 65 && c.keyCode <= 90) && (o.options.container ? o.$button.trigger("click") : (o.setSize(), o.$menu.parent().addClass("open"), l = !0), o.$searchbox.focus()), o.options.liveSearch && (/(^9$|27)/.test(c.keyCode.toString(10)) && l && 0 === o.$menu.find(".active").length && (c.preventDefault(), o.$menu.parent().removeClass("open"), o.options.container && o.$newElement.removeClass("open"), o.$button.focus()), d = a("[role=menu] li" + p, n), m.val() || /(38|40)/.test(c.keyCode.toString(10)) || 0 === d.filter(".active").length && (d = o.$menuInner.find("li"), d = o.options.liveSearchNormalize ? d.filter(":a" + o._searchStyle() + "(" + b(q[c.keyCode]) + ")") : d.filter(":" + o._searchStyle() + "(" + q[c.keyCode] + ")"))), d.length) {
                    if (/(38|40)/.test(c.keyCode.toString(10))) e = d.index(d.find("a").filter(":focus").parent()), g = d.filter(p).first().index(), h = d.filter(p).last().index(), f = d.eq(e).nextAll(p).eq(0).index(), i = d.eq(e).prevAll(p).eq(0).index(), j = d.eq(f).prevAll(p).eq(0).index(), o.options.liveSearch && (d.each(function (b) {
                        a(this).hasClass("disabled") || a(this).data("index", b)
                    }), e = d.index(d.filter(".active")), g = d.first().data("index"), h = d.last().data("index"), f = d.eq(e).nextAll().eq(0).data("index"), i = d.eq(e).prevAll().eq(0).data("index"), j = d.eq(f).prevAll().eq(0).data("index")), k = m.data("prevIndex"), 38 == c.keyCode ? (o.options.liveSearch && e--, e != j && e > i && (e = i), g > e && (e = g), e == k && (e = h)) : 40 == c.keyCode && (o.options.liveSearch && e++, -1 == e && (e = 0), e != j && f > e && (e = f), e > h && (e = h), e == k && (e = g)), m.data("prevIndex", e), o.options.liveSearch ? (c.preventDefault(), m.hasClass("dropdown-toggle") || (d.removeClass("active").eq(e).addClass("active").children("a").focus(), m.focus())) : d.eq(e).children("a").focus();
                    else if (!m.is("input")) {
                        var r, s, t = [];
                        d.each(function () {
                            a(this).hasClass("disabled") || a.trim(a(this).children("a").text().toLowerCase()).substring(0, 1) == q[c.keyCode] && t.push(a(this).index())
                        }), r = a(document).data("keycount"), r++, a(document).data("keycount", r), s = a.trim(a(":focus").text().toLowerCase()).substring(0, 1), s != q[c.keyCode] ? (r = 1, a(document).data("keycount", r)) : r >= t.length && (a(document).data("keycount", 0), r > t.length && (r = 1)), d.eq(t[r - 1]).children("a").focus()
                    }
                    if ((/(13|32)/.test(c.keyCode.toString(10)) || /(^9$)/.test(c.keyCode.toString(10)) && o.options.selectOnTab) && l) {
                        if (/(32)/.test(c.keyCode.toString(10)) || c.preventDefault(), o.options.liveSearch) /(32) /.test(c.keyCode.toString(10)) || (o.$menuInner.find(".active a").click(), m.focus());
                        else {
                            var u = a(":focus");
                            u.click(), u.focus(), c.preventDefault(), a(document).data("spaceSelect", !0)
                        }
                        a(document).data("keycount", 0)
                    } (/(^9$|27)/.test(c.keyCode.toString(10)) && l && (o.multiple || o.options.liveSearch) || /(27)/.test(c.keyCode.toString(10)) && !l) && (o.$menu.parent().removeClass("open"), o.options.container && o.$newElement.removeClass("open"), o.$button.focus())
                }
            },
            mobile: function () {
                this.$element.addClass("mobile-device")
            },
            refresh: function () {
                this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
            },
            hide: function () {
                this.$newElement.hide()
            },
            show: function () {
                this.$newElement.show()
            },
            remove: function () {
                this.$newElement.remove(), this.$element.remove()
            },
            destroy: function () {
                this.$newElement.remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
            }
        };
        var f = a.fn.selectpicker;
        a.fn.selectpicker = d, a.fn.selectpicker.Constructor = e, a.fn.selectpicker.noConflict = function () {
            return a.fn.selectpicker = f, this
        }, a(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', e.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function (a) {
            a.stopPropagation()
        }), a(window).on("load.bs.select.data-api", function () {
            a(".selectpicker").each(function () {
                var b = a(this);
                d.call(b, b.data())
            })
        })
    }(a)
});
! function (e) {
    e.fn.selectpicker.defaults = {
        noneSelectedText: "لم يتم إختيار شئ",
        noneResultsText: "لا توجد نتائج مطابقة لـ {0}",
        countSelectedText: function (e, t) {
            return 1 == e ? "{0} خيار تم إختياره" : "{0} خيارات تمت إختيارها"
        },
        maxOptionsText: function (e, t) {
            return [1 == e ? "تخطى الحد المسموح ({n} خيار بحد أقصى)" : "تخطى الحد المسموح ({n} خيارات بحد أقصى)", 1 == t ? "تخطى الحد المسموح للمجموعة ({n} خيار بحد أقصى)" : "تخطى الحد المسموح للمجموعة ({n} خيارات بحد أقصى)"]
        },
        selectAllText: "إختيار الجميع",
        deselectAllText: "إلغاء إختيار الجميع",
        multipleSeparator: "، "
    }
}(jQuery);
/*search-properties.js*/
var funName = "SiteSearchProperties",
    mk1 = $('select[name="make"]'),
    mk2 = $('input[name="make"]'),
    mdl = $('select[name="model"]'),
    mdl2 = $("ul.models"),
    $carsFeatured = $("#vehicle-slider");
featuredCarBlock = '<li class="results-list-view"><div class="result-item format-image"><div class="result-item-image"><a href="#featured"><img class="home-car-height" src="https://www.iraqusedcars.ae/public/cars/noimage.png" alt="عروض مميزة"></a></div><div class="result-item-in"><h4 class="result-item-title"><a class="car-link" href="#"><span class="Year"></span><span class="CarType"></span><i class="fa fa-external-link"></i></a></h4><div class="result-item-cont"><div class="result-item-block col2"><div class="result-item-pricing"><div class="price">$0</div></div></div></div><div class="result-item-features"><div class="dealer-block-add"><span>رقم السيـارة: <strong class="car-info-theme CarID">---</strong></span><span>رقم الشاصي: <strong class="car-info-theme ChassisNo">---</strong></span><span>لـون السيــارة: <strong class="car-info-theme Color">---</strong></span><span>رقــم اللـــــوت: <strong class="car-info-theme LotNo">---</strong></span><span>حالة السيـارة: <strong class="car-info-theme Status">---</strong></span><span>تاريخ الوصول: <strong class="car-info-theme ArrivalDate">---</strong></span></div></div></div></div></li>', refreshSelect = function () {
    $(".selectpicker").selectpicker("refresh")
}, disableControl = function (e, a) {
    a ? (e.attr("disabled", "disabled"), mdl2.empty(), e.empty().append('<option selected="selected" value="">جارى التحميل...</option>'), refreshSelect()) : e.removeAttr("disabled")
}, showPageData = function (e) {
    var dt = LZString.decompressFromUTF16(e.d),
        a = $.parseXML(dt),
        t = $.xml2json(a).list4,
        l = $.xml2json(a).list3;
    if (t) {
        var s = $("#home-news ul");
        s.html(""), $(t).each(function (e, a) {
            s.append('<li class="item"><a>' + a.news_title + "</a></li>")
        }).promise().done(function () {
            IRAQCARS.modernTicker()
        })
    } else {
        $('#layosut1').addClass('hidden');
    }
    if (l) {
        var i = "features-cars";
        $(l).each(function (e, a) {
            var t = 0 == e ? ' class="active"' : "",
                l = a.MakerNameEn + " - " + a.TypeNameEn + " - " + a.Year,
                s = "/car/" + a.CarID + "-" + a.MakerNameEn + "-" + a.TypeNameEn + "-" + a.Year;
            $("#" + i + " ol.carousel-indicators").append('<li data-target="#' + i + '" data-slide-to="' + e + '" ' + t + "></li>"), $("#" + i + " div.carousel-inner").append('<div class="item ' + t + '"> <a href="' + s + '" class="fets-img-a"><img src="https://www.iraqusedcars.ae/public/cars/' + a.CarID + "/_thumb/" + a.MainPicture + '" class="fets-img" alt="' + l + '" /></a><div class="carousel-caption"><h4 class="pull-right fets-car-title"><a href="' + s + '">' + l + '</a></h4><div class="pull-left pricetxt">$' + numeral(a.WesitePrice).format("0,0") + "</div></div></div>")
        })
    }
    var n = $(a).find("list");
    n.length > 0 && $(n).each(function (e, a) {
        $('select[name="color"]').append('<option value="' + $(a).find("ColorID").text() + '">' + $(a).find("ColorNameAr").text() + "</option>")
    });
    var r = $(a).find("list1");
    r.length > 0 && $(r).each(function (e, a) {
        var t = $(a).find("MakerNameEn").text(),
            l = $(a).find("MakerID").text();
        mk1.append('<option value="' + l + '">' + t + "</option>"), $("ul.makes").append('<li><i class="fa fa-caret-left"></i> <span class="label label-success pull-left">' + $(a).find("CarsCount").text() + '</span><label><input type="radio" name="make" value="' + l + '"> ' + t + "</label></li>")
    });
    var c = $(a).find("list2");
    c.length > 0 && $(c).each(function (e, a) {
        var t = $(a).find("TypeNameEn").text(),
            l = $(a).find("ModelID").text();
        mdl.append('<option value="' + l + '">' + t + "</option>"), mdl2.append('<li><i class="fa fa-caret-left"></i> <span class="label label-success pull-left">' + $(a).find("CarsCount").text() + '</span><label><input type="checkbox" name="model" value="' + l + '"> ' + t + "</label></li>")
    });
    for (var o = (new Date).getFullYear(), d = o; d >= 2e3; d--) $('select[name="minyear"],select[name="maxyear"]').append('<option value="' + d + '">' + d + "</option>");
    refreshSelect(), window.location.href.indexOf("/search-cars") > 0 && showSearchPrm()
}, searchFormProp = function () {
    var e = sURL + "GetData",
        a = JSON.stringify({
            actionName: funName,
            value: ""
        });
    dataService.callAjax("Post", a, e, showPageData, errorException)
}, showSearchPrm = function () {
    for (var e = getQueryStrs(), a = 0; a < e.length; a++) {
        var t = e[a];
        $('#topSearch [name="' + t + '"]').val(e[t]), $('#sideSearch [name="' + t + '"]:not(:radio)').val(e[t]), $("#sideSearch :radio[name=" + t + "][value=" + e[t] + "]").prop("checked", !0)
    }
}, showModelData = function (e) {
    var dt = LZString.decompressFromUTF16(e.d),
        a = $.parseXML(dt),
        t = $(a).find("list");
    mdl.html($("<option />", {
        value: "",
        text: "عرض الكل"
    })), t.length > 0 && $(t).each(function (e, a) {
        var t = $(a).find("TypeNameEn").text(),
            l = $(a).find("ModelID").text();
        mdl.append($("<option/>", {
            value: l,
            text: t
        })), mdl2.append('<li><i class="fa fa-caret-left"></i> <span class="label label-success pull-left">' + $(a).find("CarsCount").text() + '</span><label><input type="checkbox" name="model" value="' + l + '"> ' + t + "</label></li>")
    }), disableControl(mdl, !1), refreshSelect()
}, getModels = function (e) {
    var a = sURL + "GetData",
        t = "CarsModel_Make",
        l = JSON.stringify({
            actionName: t,
            value: e
        });
    dataService.callAjax("Post", l, a, showModelData, errorException)
}, searchFormProp(), mk1.change(function () {
    var e = $(this),
        a = e.val();
    mk1.val(a), "" != a && (disableControl(mdl, !0), getModels(a))
}), $("ul.makes").on("click", 'input[name="make"]', function () {
    var e = $(this),
        a = e.val();
    "" != a && (mdl2.empty(), getModels(a))
}), $('select[name="minyear"]').change(function () {
    $('select[name="maxyear"]').val($(this).val()).selectpicker("refresh")
});
/*!jQuery hashchange event - v1.3 - 7/21/2010*/
(function ($, e, b) {
    var c = "hashchange",
        h = document,
        f, g = $.event.special,
        i = h.documentMode,
        d = "on" + c in e && (i === b || i > 7);

    function a(j) {
        j = j || location.href;
        return "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
    }
    $.fn[c] = function (j) {
        return j ? this.bind(c, j) : this.trigger(c)
    };
    $.fn[c].delay = 50;
    g[c] = $.extend(g[c], {
        setup: function () {
            if (d) {
                return false
            }
            $(f.start)
        },
        teardown: function () {
            if (d) {
                return false
            }
            $(f.stop)
        }
    });
    f = (function () {
        var j = {},
            p, m = a(),
            k = function (q) {
                return q
            },
            l = k,
            o = k;
        j.start = function () {
            p || n()
        };
        j.stop = function () {
            p && clearTimeout(p);
            p = b
        };

        function n() {
            var r = a(),
                q = o(m);
            if (r !== m) {
                l(m = r, q);
                $(e).trigger(c)
            } else {
                if (q !== m) {
                    location.href = location.href.replace(/#.*/, "") + q
                }
            }
            p = setTimeout(n, $.fn[c].delay)
        }
        $.browser.msie && !d && (function () {
            var q, r;
            j.start = function () {
                if (!q) {
                    r = $.fn[c].src;
                    r = r && r + a();
                    q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                        r || l(a());
                        n()
                    }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
                    h.onpropertychange = function () {
                        try {
                            if (event.propertyName === "title") {
                                q.document.title = h.title
                            }
                        } catch (s) { }
                    }
                }
            };
            j.stop = k;
            o = function () {
                return a(q.location.href)
            };
            l = function (v, s) {
                var u = q.document,
                    t = $.fn[c].domain;
                if (v !== s) {
                    u.title = h.title;
                    u.open();
                    t && u.write('<script>document.domain="' + t + '"<\/script>');
                    u.close();
                    q.location.hash = v
                }
            }
        })();
        return j
    })()
})(jQuery, this);
/*!moment.js*/
! function (a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b()
}(this, function () {
    "use strict";
    function a() {
        return Uc.apply(null, arguments)
    }

    function b(a) {
        Uc = a
    }

    function c(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }

    function d(a) {
        return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
    }

    function e(a, b) {
        var c, d = [];
        for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
        return d
    }

    function f(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function g(a, b) {
        for (var c in b) f(b, c) && (a[c] = b[c]);
        return f(b, "toString") && (a.toString = b.toString), f(b, "valueOf") && (a.valueOf = b.valueOf), a
    }

    function h(a, b, c, d) {
        return Da(a, b, c, d, !0).utc()
    }

    function i() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }

    function j(a) {
        return null == a._pf && (a._pf = i()), a._pf
    }

    function k(a) {
        if (null == a._isValid) {
            var b = j(a);
            a._isValid = !(isNaN(a._d.getTime()) || !(b.overflow < 0) || b.empty || b.invalidMonth || b.invalidWeekday || b.nullInput || b.invalidFormat || b.userInvalidated), a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour)
        }
        return a._isValid
    }

    function l(a) {
        var b = h(NaN);
        return null != a ? g(j(b), a) : j(b).userInvalidated = !0, b
    }

    function m(a) {
        return void 0 === a
    }

    function n(a, b) {
        var c, d, e;
        if (m(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), m(b._i) || (a._i = b._i), m(b._f) || (a._f = b._f), m(b._l) || (a._l = b._l), m(b._strict) || (a._strict = b._strict), m(b._tzm) || (a._tzm = b._tzm), m(b._isUTC) || (a._isUTC = b._isUTC), m(b._offset) || (a._offset = b._offset), m(b._pf) || (a._pf = j(b)), m(b._locale) || (a._locale = b._locale), Wc.length > 0)
            for (c in Wc) d = Wc[c], e = b[d], m(e) || (a[d] = e);
        return a
    }

    function o(b) {
        n(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), Xc === !1 && (Xc = !0, a.updateOffset(this), Xc = !1)
    }

    function p(a) {
        return a instanceof o || null != a && null != a._isAMomentObject
    }

    function q(a) {
        return 0 > a ? Math.ceil(a) : Math.floor(a)
    }

    function r(a) {
        var b = +a,
            c = 0;
        return 0 !== b && isFinite(b) && (c = q(b)), c
    }

    function s(a, b, c) {
        var d, e = Math.min(a.length, b.length),
            f = Math.abs(a.length - b.length),
            g = 0;
        for (d = 0; e > d; d++) (c && a[d] !== b[d] || !c && r(a[d]) !== r(b[d])) && g++;
        return g + f
    }

    function t() { }

    function u(a) {
        return a ? a.toLowerCase().replace("_", "-") : a
    }

    function v(a) {
        for (var b, c, d, e, f = 0; f < a.length;) {
            for (e = u(a[f]).split("-"), b = e.length, c = u(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                if (d = w(e.slice(0, b).join("-"))) return d;
                if (c && c.length >= b && s(e, c, !0) >= b - 1) break;
                b--
            }
            f++
        }
        return null
    }

    function w(a) {
        var b = null;
        if (!Yc[a] && "undefined" != typeof module && module && module.exports) try {
            b = Vc._abbr, require("./locale/" + a), x(b)
        } catch (c) { }
        return Yc[a]
    }

    function x(a, b) {
        var c;
        return a && (c = m(b) ? z(a) : y(a, b), c && (Vc = c)), Vc._abbr
    }

    function y(a, b) {
        return null !== b ? (b.abbr = a, Yc[a] = Yc[a] || new t, Yc[a].set(b), x(a), Yc[a]) : (delete Yc[a], null)
    }

    function z(a) {
        var b;
        if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return Vc;
        if (!c(a)) {
            if (b = w(a)) return b;
            a = [a]
        }
        return v(a)
    }

    function A(a, b) {
        var c = a.toLowerCase();
        Zc[c] = Zc[c + "s"] = Zc[b] = a
    }

    function B(a) {
        return "string" == typeof a ? Zc[a] || Zc[a.toLowerCase()] : void 0
    }

    function C(a) {
        var b, c, d = {};
        for (c in a) f(a, c) && (b = B(c), b && (d[b] = a[c]));
        return d
    }

    function D(a) {
        return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a)
    }

    function E(b, c) {
        return function (d) {
            return null != d ? (G(this, b, d), a.updateOffset(this, c), this) : F(this, b)
        }
    }

    function F(a, b) {
        return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN
    }

    function G(a, b, c) {
        a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
    }

    function H(a, b) {
        var c;
        if ("object" == typeof a)
            for (c in a) this.set(c, a[c]);
        else if (a = B(a), D(this[a])) return this[a](b);
        return this
    }

    function I(a, b, c) {
        var d = "" + Math.abs(a),
            e = b - d.length,
            f = a >= 0;
        return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d
    }

    function J(a, b, c, d) {
        var e = d;
        "string" == typeof d && (e = function () {
            return this[d]()
        }), a && (bd[a] = e), b && (bd[b[0]] = function () {
            return I(e.apply(this, arguments), b[1], b[2])
        }), c && (bd[c] = function () {
            return this.localeData().ordinal(e.apply(this, arguments), a)
        })
    }

    function K(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }

    function L(a) {
        var b, c, d = a.match($c);
        for (b = 0, c = d.length; c > b; b++) bd[d[b]] ? d[b] = bd[d[b]] : d[b] = K(d[b]);
        return function (e) {
            var f = "";
            for (b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
            return f
        }
    }

    function M(a, b) {
        return a.isValid() ? (b = N(b, a.localeData()), ad[b] = ad[b] || L(b), ad[b](a)) : a.localeData().invalidDate()
    }

    function N(a, b) {
        function c(a) {
            return b.longDateFormat(a) || a
        }
        var d = 5;
        for (_c.lastIndex = 0; d >= 0 && _c.test(a) ;) a = a.replace(_c, c), _c.lastIndex = 0, d -= 1;
        return a
    }

    function O(a, b, c) {
        td[a] = D(b) ? b : function (a, d) {
            return a && c ? c : b
        }
    }

    function P(a, b) {
        return f(td, a) ? td[a](b._strict, b._locale) : new RegExp(Q(a))
    }

    function Q(a) {
        return R(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
            return b || c || d || e
        }))
    }

    function R(a) {
        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function S(a, b) {
        var c, d = b;
        for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function (a, c) {
                c[b] = r(a)
        }), c = 0; c < a.length; c++) ud[a[c]] = d
    }

    function T(a, b) {
        S(a, function (a, c, d, e) {
            d._w = d._w || {}, b(a, d._w, d, e)
        })
    }

    function U(a, b, c) {
        null != b && f(ud, a) && ud[a](b, c._a, c, a)
    }

    function V(a, b) {
        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
    }

    function W(a, b) {
        return c(this._months) ? this._months[a.month()] : this._months[Ed.test(b) ? "format" : "standalone"][a.month()]
    }

    function X(a, b) {
        return c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[Ed.test(b) ? "format" : "standalone"][a.month()]
    }

    function Y(a, b, c) {
        var d, e, f;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
            if (e = h([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
            if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
            if (!c && this._monthsParse[d].test(a)) return d
        }
    }

    function Z(a, b) {
        var c;
        return a.isValid() ? "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), V(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a) : a
    }

    function $(b) {
        return null != b ? (Z(this, b), a.updateOffset(this, !0), this) : F(this, "Month")
    }

    function _() {
        return V(this.year(), this.month())
    }

    function aa(a) {
        return this._monthsParseExact ? (f(this, "_monthsRegex") || ca.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex
    }

    function ba(a) {
        return this._monthsParseExact ? (f(this, "_monthsRegex") || ca.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex
    }

    function ca() {
        function a(a, b) {
            return b.length - a.length
        }
        var b, c, d = [],
            e = [],
            f = [];
        for (b = 0; 12 > b; b++) c = h([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, ""));
        for (d.sort(a), e.sort(a), f.sort(a), b = 0; 12 > b; b++) d[b] = R(d[b]), e[b] = R(e[b]), f[b] = R(f[b]);
        this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")$", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")$", "i")
    }

    function da(a) {
        var b, c = a._a;
        return c && -2 === j(a).overflow && (b = c[wd] < 0 || c[wd] > 11 ? wd : c[xd] < 1 || c[xd] > V(c[vd], c[wd]) ? xd : c[yd] < 0 || c[yd] > 24 || 24 === c[yd] && (0 !== c[zd] || 0 !== c[Ad] || 0 !== c[Bd]) ? yd : c[zd] < 0 || c[zd] > 59 ? zd : c[Ad] < 0 || c[Ad] > 59 ? Ad : c[Bd] < 0 || c[Bd] > 999 ? Bd : -1, j(a)._overflowDayOfYear && (vd > b || b > xd) && (b = xd), j(a)._overflowWeeks && -1 === b && (b = Cd), j(a)._overflowWeekday && -1 === b && (b = Dd), j(a).overflow = b), a
    }

    function ea(b) {
        a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b)
    }

    function fa(a, b) {
        var c = !0;
        return g(function () {
            return c && (ea(a + "\nArguments: " + Array.prototype.slice.call(arguments).join(", ") + "\n" + (new Error).stack), c = !1), b.apply(this, arguments)
        }, b)
    }

    function ga(a, b) {
        Jd[a] || (ea(b), Jd[a] = !0)
    }

    function ha(a) {
        var b, c, d, e, f, g, h = a._i,
            i = Kd.exec(h) || Ld.exec(h);
        if (i) {
            for (j(a).iso = !0, b = 0, c = Nd.length; c > b; b++)
                if (Nd[b][1].exec(i[1])) {
                    e = Nd[b][0], d = Nd[b][2] !== !1;
                    break
                }
            if (null == e) return void (a._isValid = !1);
            if (i[3]) {
                for (b = 0, c = Od.length; c > b; b++)
                    if (Od[b][1].exec(i[3])) {
                        f = (i[2] || " ") + Od[b][0];
                        break
                    }
                if (null == f) return void (a._isValid = !1)
            }
            if (!d && null != f) return void (a._isValid = !1);
            if (i[4]) {
                if (!Md.exec(i[4])) return void (a._isValid = !1);
                g = "Z"
            }
            a._f = e + (f || "") + (g || ""), wa(a)
        } else a._isValid = !1
    }

    function ia(b) {
        var c = Pd.exec(b._i);
        return null !== c ? void (b._d = new Date(+c[1])) : (ha(b), void (b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))))
    }

    function ja(a, b, c, d, e, f, g) {
        var h = new Date(a, b, c, d, e, f, g);
        return 100 > a && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h
    }

    function ka(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        return 100 > a && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b
    }

    function la(a) {
        return ma(a) ? 366 : 365
    }

    function ma(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }

    function na() {
        return ma(this.year())
    }

    function oa(a, b, c) {
        var d = 7 + b - c,
            e = (7 + ka(a, 0, d).getUTCDay() - b) % 7;
        return -e + d - 1
    }

    function pa(a, b, c, d, e) {
        var f, g, h = (7 + c - d) % 7,
            i = oa(a, d, e),
            j = 1 + 7 * (b - 1) + h + i;
        return 0 >= j ? (f = a - 1, g = la(f) + j) : j > la(a) ? (f = a + 1, g = j - la(a)) : (f = a, g = j), {
            year: f,
            dayOfYear: g
        }
    }

    function qa(a, b, c) {
        var d, e, f = oa(a.year(), b, c),
            g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
        return 1 > g ? (e = a.year() - 1, d = g + ra(e, b, c)) : g > ra(a.year(), b, c) ? (d = g - ra(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), {
            week: d,
            year: e
        }
    }

    function ra(a, b, c) {
        var d = oa(a, b, c),
            e = oa(a + 1, b, c);
        return (la(a) - d + e) / 7
    }

    function sa(a, b, c) {
        return null != a ? a : null != b ? b : c
    }

    function ta(b) {
        var c = new Date(a.now());
        return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]
    }

    function ua(a) {
        var b, c, d, e, f = [];
        if (!a._d) {
            for (d = ta(a), a._w && null == a._a[xd] && null == a._a[wd] && va(a), a._dayOfYear && (e = sa(a._a[vd], d[vd]), a._dayOfYear > la(e) && (j(a)._overflowDayOfYear = !0), c = ka(e, 0, a._dayOfYear), a._a[wd] = c.getUTCMonth(), a._a[xd] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) a._a[b] = f[b] = d[b];
            for (; 7 > b; b++) a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            24 === a._a[yd] && 0 === a._a[zd] && 0 === a._a[Ad] && 0 === a._a[Bd] && (a._nextDay = !0, a._a[yd] = 0), a._d = (a._useUTC ? ka : ja).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[yd] = 24)
        }
    }

    function va(a) {
        var b, c, d, e, f, g, h, i;
        b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = sa(b.GG, a._a[vd], qa(Ea(), 1, 4).year), d = sa(b.W, 1), e = sa(b.E, 1), (1 > e || e > 7) && (i = !0)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = sa(b.gg, a._a[vd], qa(Ea(), f, g).year), d = sa(b.w, 1), null != b.d ? (e = b.d, (0 > e || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f), 1 > d || d > ra(c, f, g) ? j(a)._overflowWeeks = !0 : null != i ? j(a)._overflowWeekday = !0 : (h = pa(c, d, e, f, g), a._a[vd] = h.year, a._dayOfYear = h.dayOfYear)
    }

    function wa(b) {
        if (b._f === a.ISO_8601) return void ha(b);
        b._a = [], j(b).empty = !0;
        var c, d, e, f, g, h = "" + b._i,
            i = h.length,
            k = 0;
        for (e = N(b._f, b._locale).match($c) || [], c = 0; c < e.length; c++) f = e[c], d = (h.match(P(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && j(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), k += d.length), bd[f] ? (d ? j(b).empty = !1 : j(b).unusedTokens.push(f), U(f, d, b)) : b._strict && !d && j(b).unusedTokens.push(f);
        j(b).charsLeftOver = i - k, h.length > 0 && j(b).unusedInput.push(h), j(b).bigHour === !0 && b._a[yd] <= 12 && b._a[yd] > 0 && (j(b).bigHour = void 0), b._a[yd] = xa(b._locale, b._a[yd], b._meridiem), ua(b), da(b)
    }

    function xa(a, b, c) {
        var d;
        return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b
    }

    function ya(a) {
        var b, c, d, e, f;
        if (0 === a._f.length) return j(a).invalidFormat = !0, void (a._d = new Date(NaN));
        for (e = 0; e < a._f.length; e++) f = 0, b = n({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], wa(b), k(b) && (f += j(b).charsLeftOver, f += 10 * j(b).unusedTokens.length, j(b).score = f, (null == d || d > f) && (d = f, c = b));
        g(a, c || b)
    }

    function za(a) {
        if (!a._d) {
            var b = C(a._i);
            a._a = e([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) {
                return a && parseInt(a, 10)
            }), ua(a)
        }
    }

    function Aa(a) {
        var b = new o(da(Ba(a)));
        return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b
    }

    function Ba(a) {
        var b = a._i,
            e = a._f;
        return a._locale = a._locale || z(a._l), null === b || void 0 === e && "" === b ? l({
            nullInput: !0
        }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), p(b) ? new o(da(b)) : (c(e) ? ya(a) : e ? wa(a) : d(b) ? a._d = b : Ca(a), k(a) || (a._d = null), a))
    }

    function Ca(b) {
        var f = b._i;
        void 0 === f ? b._d = new Date(a.now()) : d(f) ? b._d = new Date(+f) : "string" == typeof f ? ia(b) : c(f) ? (b._a = e(f.slice(0), function (a) {
            return parseInt(a, 10)
        }), ua(b)) : "object" == typeof f ? za(b) : "number" == typeof f ? b._d = new Date(f) : a.createFromInputFallback(b)
    }

    function Da(a, b, c, d, e) {
        var f = {};
        return "boolean" == typeof c && (d = c, c = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = e, f._l = c, f._i = a, f._f = b, f._strict = d, Aa(f)
    }

    function Ea(a, b, c, d) {
        return Da(a, b, c, d, !1)
    }

    function Fa(a, b) {
        var d, e;
        if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return Ea();
        for (d = b[0], e = 1; e < b.length; ++e) (!b[e].isValid() || b[e][a](d)) && (d = b[e]);
        return d
    }

    function Ga() {
        var a = [].slice.call(arguments, 0);
        return Fa("isBefore", a)
    }

    function Ha() {
        var a = [].slice.call(arguments, 0);
        return Fa("isAfter", a)
    }

    function Ia(a) {
        var b = C(a),
            c = b.year || 0,
            d = b.quarter || 0,
            e = b.month || 0,
            f = b.week || 0,
            g = b.day || 0,
            h = b.hour || 0,
            i = b.minute || 0,
            j = b.second || 0,
            k = b.millisecond || 0;
        this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = z(), this._bubble()
    }

    function Ja(a) {
        return a instanceof Ia
    }

    function Ka(a, b) {
        J(a, 0, 0, function () {
            var a = this.utcOffset(),
                c = "+";
            return 0 > a && (a = -a, c = "-"), c + I(~~(a / 60), 2) + b + I(~~a % 60, 2)
        })
    }

    function La(a, b) {
        var c = (b || "").match(a) || [],
            d = c[c.length - 1] || [],
            e = (d + "").match(Ud) || ["-", 0, 0],
            f = +(60 * e[1]) + r(e[2]);
        return "+" === e[0] ? f : -f
    }

    function Ma(b, c) {
        var e, f;
        return c._isUTC ? (e = c.clone(), f = (p(b) || d(b) ? +b : +Ea(b)) - +e, e._d.setTime(+e._d + f), a.updateOffset(e, !1), e) : Ea(b).local()
    }

    function Na(a) {
        return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
    }

    function Oa(b, c) {
        var d, e = this._offset || 0;
        return this.isValid() ? null != b ? ("string" == typeof b ? b = La(qd, b) : Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Na(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? cb(this, Za(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Na(this) : null != b ? this : NaN
    }

    function Pa(a, b) {
        return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
    }

    function Qa(a) {
        return this.utcOffset(0, a)
    }

    function Ra(a) {
        return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Na(this), "m")), this
    }

    function Sa() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(La(pd, this._i)), this
    }

    function Ta(a) {
        return this.isValid() ? (a = a ? Ea(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0) : !1
    }

    function Ua() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function Va() {
        if (!m(this._isDSTShifted)) return this._isDSTShifted;
        var a = {};
        if (n(a, this), a = Ba(a), a._a) {
            var b = a._isUTC ? h(a._a) : Ea(a._a);
            this._isDSTShifted = this.isValid() && s(a._a, b.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    }

    function Wa() {
        return this.isValid() ? !this._isUTC : !1
    }

    function Xa() {
        return this.isValid() ? this._isUTC : !1
    }

    function Ya() {
        return this.isValid() ? this._isUTC && 0 === this._offset : !1
    }

    function Za(a, b) {
        var c, d, e, g = a,
            h = null;
        return Ja(a) ? g = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : "number" == typeof a ? (g = {}, b ? g[b] = a : g.milliseconds = a) : (h = Vd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = {
            y: 0,
            d: r(h[xd]) * c,
            h: r(h[yd]) * c,
            m: r(h[zd]) * c,
            s: r(h[Ad]) * c,
            ms: r(h[Bd]) * c
        }) : (h = Wd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = {
            y: $a(h[2], c),
            M: $a(h[3], c),
            d: $a(h[4], c),
            h: $a(h[5], c),
            m: $a(h[6], c),
            s: $a(h[7], c),
            w: $a(h[8], c)
        }) : null == g ? g = {} : "object" == typeof g && ("from" in g || "to" in g) && (e = ab(Ea(g.from), Ea(g.to)), g = {}, g.ms = e.milliseconds, g.M = e.months), d = new Ia(g), Ja(a) && f(a, "_locale") && (d._locale = a._locale), d
    }

    function $a(a, b) {
        var c = a && parseFloat(a.replace(",", "."));
        return (isNaN(c) ? 0 : c) * b
    }

    function _a(a, b) {
        var c = {
            milliseconds: 0,
            months: 0
        };
        return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
    }

    function ab(a, b) {
        var c;
        return a.isValid() && b.isValid() ? (b = Ma(b, a), a.isBefore(b) ? c = _a(a, b) : (c = _a(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
            milliseconds: 0,
            months: 0
        }
    }

    function bb(a, b) {
        return function (c, d) {
            var e, f;
            return null === d || isNaN(+d) || (ga(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Za(c, d), cb(this, e, a), this
        }
    }

    function cb(b, c, d, e) {
        var f = c._milliseconds,
            g = c._days,
            h = c._months;
        b.isValid() && (e = null == e ? !0 : e, f && b._d.setTime(+b._d + f * d), g && G(b, "Date", F(b, "Date") + g * d), h && Z(b, F(b, "Month") + h * d), e && a.updateOffset(b, g || h))
    }

    function db(a, b) {
        var c = a || Ea(),
            d = Ma(c, this).startOf("day"),
            e = this.diff(d, "days", !0),
            f = -6 > e ? "sameElse" : -1 > e ? "lastWeek" : 0 > e ? "lastDay" : 1 > e ? "sameDay" : 2 > e ? "nextDay" : 7 > e ? "nextWeek" : "sameElse",
            g = b && (D(b[f]) ? b[f]() : b[f]);
        return this.format(g || this.localeData().calendar(f, this, Ea(c)))
    }

    function eb() {
        return new o(this)
    }

    function fb(a, b) {
        var c = p(a) ? a : Ea(a);
        return this.isValid() && c.isValid() ? (b = B(m(b) ? "millisecond" : b), "millisecond" === b ? +this > +c : +c < +this.clone().startOf(b)) : !1
    }

    function gb(a, b) {
        var c = p(a) ? a : Ea(a);
        return this.isValid() && c.isValid() ? (b = B(m(b) ? "millisecond" : b), "millisecond" === b ? +c > +this : +this.clone().endOf(b) < +c) : !1
    }

    function hb(a, b, c) {
        return this.isAfter(a, c) && this.isBefore(b, c)
    }

    function ib(a, b) {
        var c, d = p(a) ? a : Ea(a);
        return this.isValid() && d.isValid() ? (b = B(b || "millisecond"), "millisecond" === b ? +this === +d : (c = +d, +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))) : !1
    }

    function jb(a, b) {
        return this.isSame(a, b) || this.isAfter(a, b)
    }

    function kb(a, b) {
        return this.isSame(a, b) || this.isBefore(a, b)
    }

    function lb(a, b, c) {
        var d, e, f, g;
        return this.isValid() ? (d = Ma(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = B(b), "year" === b || "month" === b || "quarter" === b ? (g = mb(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : q(g)) : NaN) : NaN
    }

    function mb(a, b) {
        var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
            f = a.clone().add(e, "months");
        return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d)
    }

    function nb() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function ob() {
        var a = this.clone().utc();
        return 0 < a.year() && a.year() <= 9999 ? D(Date.prototype.toISOString) ? this.toDate().toISOString() : M(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : M(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function pb(b) {
        var c = M(this, b || a.defaultFormat);
        return this.localeData().postformat(c)
    }

    function qb(a, b) {
        return this.isValid() && (p(a) && a.isValid() || Ea(a).isValid()) ? Za({
            to: this,
            from: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function rb(a) {
        return this.from(Ea(), a)
    }

    function sb(a, b) {
        return this.isValid() && (p(a) && a.isValid() || Ea(a).isValid()) ? Za({
            from: this,
            to: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function tb(a) {
        return this.to(Ea(), a)
    }

    function ub(a) {
        var b;
        return void 0 === a ? this._locale._abbr : (b = z(a), null != b && (this._locale = b), this)
    }

    function vb() {
        return this._locale
    }

    function wb(a) {
        switch (a = B(a)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
        }
        return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function xb(a) {
        return a = B(a), void 0 === a || "millisecond" === a ? this : this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms")
    }

    function yb() {
        return +this._d - 6e4 * (this._offset || 0)
    }

    function zb() {
        return Math.floor(+this / 1e3)
    }

    function Ab() {
        return this._offset ? new Date(+this) : this._d
    }

    function Bb() {
        var a = this;
        return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
    }

    function Cb() {
        var a = this;
        return {
            years: a.year(),
            months: a.month(),
            date: a.date(),
            hours: a.hours(),
            minutes: a.minutes(),
            seconds: a.seconds(),
            milliseconds: a.milliseconds()
        }
    }

    function Db() {
        return this.isValid() ? this.toISOString() : "null"
    }

    function Eb() {
        return k(this)
    }

    function Fb() {
        return g({}, j(this))
    }

    function Gb() {
        return j(this).overflow
    }

    function Hb() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }

    function Ib(a, b) {
        J(0, [a, a.length], 0, b)
    }

    function Jb(a) {
        return Nb.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }

    function Kb(a) {
        return Nb.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4)
    }

    function Lb() {
        return ra(this.year(), 1, 4)
    }

    function Mb() {
        var a = this.localeData()._week;
        return ra(this.year(), a.dow, a.doy)
    }

    function Nb(a, b, c, d, e) {
        var f;
        return null == a ? qa(this, d, e).year : (f = ra(a, d, e), b > f && (b = f), Ob.call(this, a, b, c, d, e))
    }

    function Ob(a, b, c, d, e) {
        var f = pa(a, b, c, d, e),
            g = ka(f.year, 0, f.dayOfYear);
        return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this
    }

    function Pb(a) {
        return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
    }

    function Qb(a) {
        return qa(a, this._week.dow, this._week.doy).week
    }

    function Rb() {
        return this._week.dow
    }

    function Sb() {
        return this._week.doy
    }

    function Tb(a) {
        var b = this.localeData().week(this);
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function Ub(a) {
        var b = qa(this, 1, 4).week;
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function Vb(a, b) {
        return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10)
    }

    function Wb(a, b) {
        return c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()]
    }

    function Xb(a) {
        return this._weekdaysShort[a.day()]
    }

    function Yb(a) {
        return this._weekdaysMin[a.day()]
    }

    function Zb(a, b, c) {
        var d, e, f;
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; 7 > d; d++) {
            if (e = Ea([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;
            if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
            if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
            if (!c && this._weekdaysParse[d].test(a)) return d
        }
    }

    function $b(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != a ? (a = Vb(a, this.localeData()), this.add(a - b, "d")) : b
    }

    function _b(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == a ? b : this.add(a - b, "d")
    }

    function ac(a) {
        return this.isValid() ? null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7) : null != a ? this : NaN
    }

    function bc(a) {
        var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == a ? b : this.add(a - b, "d")
    }

    function cc() {
        return this.hours() % 12 || 12
    }

    function dc(a, b) {
        J(a, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), b)
        })
    }

    function ec(a, b) {
        return b._meridiemParse
    }

    function fc(a) {
        return "p" === (a + "").toLowerCase().charAt(0)
    }

    function gc(a, b, c) {
        return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
    }

    function hc(a, b) {
        b[Bd] = r(1e3 * ("0." + a))
    }

    function ic() {
        return this._isUTC ? "UTC" : ""
    }

    function jc() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function kc(a) {
        return Ea(1e3 * a)
    }

    function lc() {
        return Ea.apply(null, arguments).parseZone()
    }

    function mc(a, b, c) {
        var d = this._calendar[a];
        return D(d) ? d.call(b, c) : d
    }

    function nc(a) {
        var b = this._longDateFormat[a],
            c = this._longDateFormat[a.toUpperCase()];
        return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
            return a.slice(1)
        }), this._longDateFormat[a])
    }

    function oc() {
        return this._invalidDate
    }

    function pc(a) {
        return this._ordinal.replace("%d", a)
    }

    function qc(a) {
        return a
    }

    function rc(a, b, c, d) {
        var e = this._relativeTime[c];
        return D(e) ? e(a, b, c, d) : e.replace(/%d/i, a)
    }

    function sc(a, b) {
        var c = this._relativeTime[a > 0 ? "future" : "past"];
        return D(c) ? c(b) : c.replace(/%s/i, b)
    }

    function tc(a) {
        var b, c;
        for (c in a) b = a[c], D(b) ? this[c] = b : this["_" + c] = b;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }

    function uc(a, b, c, d) {
        var e = z(),
            f = h().set(d, b);
        return e[c](f, a)
    }

    function vc(a, b, c, d, e) {
        if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b) return uc(a, b, c, e);
        var f, g = [];
        for (f = 0; d > f; f++) g[f] = uc(a, f, c, e);
        return g
    }

    function wc(a, b) {
        return vc(a, b, "months", 12, "month")
    }

    function xc(a, b) {
        return vc(a, b, "monthsShort", 12, "month")
    }

    function yc(a, b) {
        return vc(a, b, "weekdays", 7, "day")
    }

    function zc(a, b) {
        return vc(a, b, "weekdaysShort", 7, "day")
    }

    function Ac(a, b) {
        return vc(a, b, "weekdaysMin", 7, "day")
    }

    function Bc() {
        var a = this._data;
        return this._milliseconds = se(this._milliseconds), this._days = se(this._days), this._months = se(this._months), a.milliseconds = se(a.milliseconds), a.seconds = se(a.seconds), a.minutes = se(a.minutes), a.hours = se(a.hours), a.months = se(a.months), a.years = se(a.years), this
    }

    function Cc(a, b, c, d) {
        var e = Za(b, c);
        return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble()
    }

    function Dc(a, b) {
        return Cc(this, a, b, 1)
    }

    function Ec(a, b) {
        return Cc(this, a, b, -1)
    }

    function Fc(a) {
        return 0 > a ? Math.floor(a) : Math.ceil(a)
    }

    function Gc() {
        var a, b, c, d, e, f = this._milliseconds,
            g = this._days,
            h = this._months,
            i = this._data;
        return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 864e5 * Fc(Ic(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = q(f / 1e3), i.seconds = a % 60, b = q(a / 60), i.minutes = b % 60, c = q(b / 60), i.hours = c % 24, g += q(c / 24), e = q(Hc(g)), h += e, g -= Fc(Ic(e)), d = q(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this
    }

    function Hc(a) {
        return 4800 * a / 146097
    }

    function Ic(a) {
        return 146097 * a / 4800
    }

    function Jc(a) {
        var b, c, d = this._milliseconds;
        if (a = B(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + Hc(b), "month" === a ? c : c / 12;
        switch (b = this._days + Math.round(Ic(this._months)), a) {
            case "week":
                return b / 7 + d / 6048e5;
            case "day":
                return b + d / 864e5;
            case "hour":
                return 24 * b + d / 36e5;
            case "minute":
                return 1440 * b + d / 6e4;
            case "second":
                return 86400 * b + d / 1e3;
            case "millisecond":
                return Math.floor(864e5 * b) + d;
            default:
                throw new Error("Unknown unit " + a)
        }
    }

    function Kc() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * r(this._months / 12)
    }

    function Lc(a) {
        return function () {
            return this.as(a)
        }
    }

    function Mc(a) {
        return a = B(a), this[a + "s"]()
    }

    function Nc(a) {
        return function () {
            return this._data[a]
        }
    }

    function Oc() {
        return q(this.days() / 7)
    }

    function Pc(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }

    function Qc(a, b, c) {
        var d = Za(a).abs(),
            e = Ie(d.as("s")),
            f = Ie(d.as("m")),
            g = Ie(d.as("h")),
            h = Ie(d.as("d")),
            i = Ie(d.as("M")),
            j = Ie(d.as("y")),
            k = e < Je.s && ["s", e] || 1 >= f && ["m"] || f < Je.m && ["mm", f] || 1 >= g && ["h"] || g < Je.h && ["hh", g] || 1 >= h && ["d"] || h < Je.d && ["dd", h] || 1 >= i && ["M"] || i < Je.M && ["MM", i] || 1 >= j && ["y"] || ["yy", j];
        return k[2] = b, k[3] = +a > 0, k[4] = c, Pc.apply(null, k)
    }

    function Rc(a, b) {
        return void 0 === Je[a] ? !1 : void 0 === b ? Je[a] : (Je[a] = b, !0)
    }

    function Sc(a) {
        var b = this.localeData(),
            c = Qc(this, !a, b);
        return a && (c = b.pastFuture(+this, c)), b.postformat(c)
    }

    function Tc() {
        var a, b, c, d = Ke(this._milliseconds) / 1e3,
            e = Ke(this._days),
            f = Ke(this._months);
        a = q(d / 60), b = q(a / 60), d %= 60, a %= 60, c = q(f / 12), f %= 12;
        var g = c,
            h = f,
            i = e,
            j = b,
            k = a,
            l = d,
            m = this.asSeconds();
        return m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D"
    }
    var Uc, Vc, Wc = a.momentProperties = [],
        Xc = !1,
        Yc = {},
        Zc = {},
        $c = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        _c = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        ad = {},
        bd = {},
        cd = /\d/,
        dd = /\d\d/,
        ed = /\d{3}/,
        fd = /\d{4}/,
        gd = /[+-]?\d{6}/,
        hd = /\d\d?/,
        id = /\d\d\d\d?/,
        jd = /\d\d\d\d\d\d?/,
        kd = /\d{1,3}/,
        ld = /\d{1,4}/,
        md = /[+-]?\d{1,6}/,
        nd = /\d+/,
        od = /[+-]?\d+/,
        pd = /Z|[+-]\d\d:?\d\d/gi,
        qd = /Z|[+-]\d\d(?::?\d\d)?/gi,
        rd = /[+-]?\d+(\.\d{1,3})?/,
        sd = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        td = {},
        ud = {},
        vd = 0,
        wd = 1,
        xd = 2,
        yd = 3,
        zd = 4,
        Ad = 5,
        Bd = 6,
        Cd = 7,
        Dd = 8;
    J("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
    }), J("MMM", 0, 0, function (a) {
        return this.localeData().monthsShort(this, a)
    }), J("MMMM", 0, 0, function (a) {
        return this.localeData().months(this, a)
    }), A("month", "M"), O("M", hd), O("MM", hd, dd), O("MMM", function (a, b) {
        return b.monthsShortRegex(a)
    }), O("MMMM", function (a, b) {
        return b.monthsRegex(a)
    }), S(["M", "MM"], function (a, b) {
        b[wd] = r(a) - 1
    }), S(["MMM", "MMMM"], function (a, b, c, d) {
        var e = c._locale.monthsParse(a, d, c._strict);
        null != e ? b[wd] = e : j(c).invalidMonth = a
    });
    var Ed = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,
        Fd = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        Gd = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        Hd = sd,
        Id = sd,
        Jd = {};
    a.suppressDeprecationWarnings = !1;
    var Kd = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        Ld = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,
        Md = /Z|[+-]\d\d(?::?\d\d)?/,
        Nd = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, !1],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
            ["YYYYDDD", /\d{7}/]
        ],
        Od = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/]
        ],
        Pd = /^\/?Date\((\-?\d+)/i;
    a.createFromInputFallback = fa("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (a) {
        a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
    }), J("Y", 0, 0, function () {
        var a = this.year();
        return 9999 >= a ? "" + a : "+" + a
    }), J(0, ["YY", 2], 0, function () {
        return this.year() % 100
    }), J(0, ["YYYY", 4], 0, "year"), J(0, ["YYYYY", 5], 0, "year"), J(0, ["YYYYYY", 6, !0], 0, "year"), A("year", "y"), O("Y", od), O("YY", hd, dd), O("YYYY", ld, fd), O("YYYYY", md, gd), O("YYYYYY", md, gd), S(["YYYYY", "YYYYYY"], vd), S("YYYY", function (b, c) {
        c[vd] = 2 === b.length ? a.parseTwoDigitYear(b) : r(b)
    }), S("YY", function (b, c) {
        c[vd] = a.parseTwoDigitYear(b)
    }), S("Y", function (a, b) {
        b[vd] = parseInt(a, 10)
    }), a.parseTwoDigitYear = function (a) {
        return r(a) + (r(a) > 68 ? 1900 : 2e3)
    };
    var Qd = E("FullYear", !1);
    a.ISO_8601 = function () { };
    var Rd = fa("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
        var a = Ea.apply(null, arguments);
        return this.isValid() && a.isValid() ? this > a ? this : a : l()
    }),
        Sd = fa("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
            var a = Ea.apply(null, arguments);
            return this.isValid() && a.isValid() ? a > this ? this : a : l()
        }),
        Td = function () {
            return Date.now ? Date.now() : +new Date
        };
    Ka("Z", ":"), Ka("ZZ", ""), O("Z", qd), O("ZZ", qd), S(["Z", "ZZ"], function (a, b, c) {
        c._useUTC = !0, c._tzm = La(qd, a)
    });
    var Ud = /([\+\-]|\d\d)/gi;
    a.updateOffset = function () { };
    var Vd = /(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,
        Wd = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    Za.fn = Ia.prototype;
    var Xd = bb(1, "add"),
        Yd = bb(-1, "subtract");
    a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var Zd = fa("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) {
        return void 0 === a ? this.localeData() : this.locale(a)
    });
    J(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
    }), J(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
    }), Ib("gggg", "weekYear"), Ib("ggggg", "weekYear"), Ib("GGGG", "isoWeekYear"), Ib("GGGGG", "isoWeekYear"), A("weekYear", "gg"), A("isoWeekYear", "GG"), O("G", od), O("g", od), O("GG", hd, dd), O("gg", hd, dd), O("GGGG", ld, fd), O("gggg", ld, fd), O("GGGGG", md, gd), O("ggggg", md, gd), T(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
        b[d.substr(0, 2)] = r(a)
    }), T(["gg", "GG"], function (b, c, d, e) {
        c[e] = a.parseTwoDigitYear(b)
    }), J("Q", 0, "Qo", "quarter"), A("quarter", "Q"), O("Q", cd), S("Q", function (a, b) {
        b[wd] = 3 * (r(a) - 1)
    }), J("w", ["ww", 2], "wo", "week"), J("W", ["WW", 2], "Wo", "isoWeek"), A("week", "w"), A("isoWeek", "W"), O("w", hd), O("ww", hd, dd), O("W", hd), O("WW", hd, dd), T(["w", "ww", "W", "WW"], function (a, b, c, d) {
        b[d.substr(0, 1)] = r(a)
    });
    var $d = {
        dow: 0,
        doy: 6
    };
    J("D", ["DD", 2], "Do", "date"), A("date", "D"), O("D", hd), O("DD", hd, dd), O("Do", function (a, b) {
        return a ? b._ordinalParse : b._ordinalParseLenient
    }), S(["D", "DD"], xd), S("Do", function (a, b) {
        b[xd] = r(a.match(hd)[0], 10)
    });
    var _d = E("Date", !0);
    J("d", 0, "do", "day"), J("dd", 0, 0, function (a) {
        return this.localeData().weekdaysMin(this, a)
    }), J("ddd", 0, 0, function (a) {
        return this.localeData().weekdaysShort(this, a)
    }), J("dddd", 0, 0, function (a) {
        return this.localeData().weekdays(this, a)
    }), J("e", 0, 0, "weekday"), J("E", 0, 0, "isoWeekday"), A("day", "d"), A("weekday", "e"), A("isoWeekday", "E"), O("d", hd), O("e", hd), O("E", hd), O("dd", sd), O("ddd", sd), O("dddd", sd), T(["dd", "ddd", "dddd"], function (a, b, c, d) {
        var e = c._locale.weekdaysParse(a, d, c._strict);
        null != e ? b.d = e : j(c).invalidWeekday = a
    }), T(["d", "e", "E"], function (a, b, c, d) {
        b[d] = r(a)
    });
    var ae = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        be = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        ce = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    J("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), A("dayOfYear", "DDD"), O("DDD", kd), O("DDDD", ed), S(["DDD", "DDDD"], function (a, b, c) {
        c._dayOfYear = r(a)
    }), J("H", ["HH", 2], 0, "hour"), J("h", ["hh", 2], 0, cc), J("hmm", 0, 0, function () {
        return "" + cc.apply(this) + I(this.minutes(), 2)
    }), J("hmmss", 0, 0, function () {
        return "" + cc.apply(this) + I(this.minutes(), 2) + I(this.seconds(), 2)
    }), J("Hmm", 0, 0, function () {
        return "" + this.hours() + I(this.minutes(), 2)
    }), J("Hmmss", 0, 0, function () {
        return "" + this.hours() + I(this.minutes(), 2) + I(this.seconds(), 2)
    }), dc("a", !0), dc("A", !1), A("hour", "h"), O("a", ec), O("A", ec), O("H", hd), O("h", hd), O("HH", hd, dd), O("hh", hd, dd), O("hmm", id), O("hmmss", jd), O("Hmm", id), O("Hmmss", jd), S(["H", "HH"], yd), S(["a", "A"], function (a, b, c) {
        c._isPm = c._locale.isPM(a), c._meridiem = a
    }), S(["h", "hh"], function (a, b, c) {
        b[yd] = r(a), j(c).bigHour = !0
    }), S("hmm", function (a, b, c) {
        var d = a.length - 2;
        b[yd] = r(a.substr(0, d)), b[zd] = r(a.substr(d)), j(c).bigHour = !0
    }), S("hmmss", function (a, b, c) {
        var d = a.length - 4,
            e = a.length - 2;
        b[yd] = r(a.substr(0, d)), b[zd] = r(a.substr(d, 2)), b[Ad] = r(a.substr(e)), j(c).bigHour = !0
    }), S("Hmm", function (a, b, c) {
        var d = a.length - 2;
        b[yd] = r(a.substr(0, d)), b[zd] = r(a.substr(d))
    }), S("Hmmss", function (a, b, c) {
        var d = a.length - 4,
            e = a.length - 2;
        b[yd] = r(a.substr(0, d)), b[zd] = r(a.substr(d, 2)), b[Ad] = r(a.substr(e))
    });
    var de = /[ap]\.?m?\.?/i,
        ee = E("Hours", !0);
    J("m", ["mm", 2], 0, "minute"), A("minute", "m"), O("m", hd), O("mm", hd, dd), S(["m", "mm"], zd);
    var fe = E("Minutes", !1);
    J("s", ["ss", 2], 0, "second"), A("second", "s"), O("s", hd), O("ss", hd, dd), S(["s", "ss"], Ad);
    var ge = E("Seconds", !1);
    J("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
    }), J(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
    }), J(0, ["SSS", 3], 0, "millisecond"), J(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond()
    }), J(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond()
    }), J(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond()
    }), J(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond()
    }), J(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond()
    }), J(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond()
    }), A("millisecond", "ms"), O("S", kd, cd), O("SS", kd, dd), O("SSS", kd, ed);
    var he;
    for (he = "SSSS"; he.length <= 9; he += "S") O(he, nd);
    for (he = "S"; he.length <= 9; he += "S") S(he, hc);
    var ie = E("Milliseconds", !1);
    J("z", 0, 0, "zoneAbbr"), J("zz", 0, 0, "zoneName");
    var je = o.prototype;
    je.add = Xd, je.calendar = db, je.clone = eb, je.diff = lb, je.endOf = xb, je.format = pb, je.from = qb, je.fromNow = rb, je.to = sb, je.toNow = tb, je.get = H, je.invalidAt = Gb, je.isAfter = fb, je.isBefore = gb, je.isBetween = hb, je.isSame = ib, je.isSameOrAfter = jb, je.isSameOrBefore = kb, je.isValid = Eb, je.lang = Zd, je.locale = ub, je.localeData = vb, je.max = Sd, je.min = Rd, je.parsingFlags = Fb, je.set = H, je.startOf = wb, je.subtract = Yd, je.toArray = Bb, je.toObject = Cb, je.toDate = Ab, je.toISOString = ob, je.toJSON = Db, je.toString = nb, je.unix = zb, je.valueOf = yb, je.creationData = Hb, je.year = Qd, je.isLeapYear = na, je.weekYear = Jb, je.isoWeekYear = Kb, je.quarter = je.quarters = Pb, je.month = $, je.daysInMonth = _, je.week = je.weeks = Tb, je.isoWeek = je.isoWeeks = Ub, je.weeksInYear = Mb, je.isoWeeksInYear = Lb, je.date = _d, je.day = je.days = $b, je.weekday = _b, je.isoWeekday = ac, je.dayOfYear = bc, je.hour = je.hours = ee, je.minute = je.minutes = fe, je.second = je.seconds = ge, je.millisecond = je.milliseconds = ie, je.utcOffset = Oa, je.utc = Qa, je.local = Ra, je.parseZone = Sa, je.hasAlignedHourOffset = Ta, je.isDST = Ua, je.isDSTShifted = Va, je.isLocal = Wa, je.isUtcOffset = Xa, je.isUtc = Ya, je.isUTC = Ya, je.zoneAbbr = ic, je.zoneName = jc, je.dates = fa("dates accessor is deprecated. Use date instead.", _d), je.months = fa("months accessor is deprecated. Use month instead", $), je.years = fa("years accessor is deprecated. Use year instead", Qd), je.zone = fa("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Pa);
    var ke = je,
        le = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        me = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "dd/MM/yyyy",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        },
        ne = "Invalid date",
        oe = "%d",
        pe = /\d{1,2}/,
        qe = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        re = t.prototype;
    re._calendar = le, re.calendar = mc, re._longDateFormat = me, re.longDateFormat = nc, re._invalidDate = ne, re.invalidDate = oc, re._ordinal = oe, re.ordinal = pc, re._ordinalParse = pe, re.preparse = qc, re.postformat = qc, re._relativeTime = qe, re.relativeTime = rc, re.pastFuture = sc, re.set = tc, re.months = W, re._months = Fd, re.monthsShort = X, re._monthsShort = Gd, re.monthsParse = Y, re._monthsRegex = Id, re.monthsRegex = ba, re._monthsShortRegex = Hd, re.monthsShortRegex = aa, re.week = Qb, re._week = $d, re.firstDayOfYear = Sb, re.firstDayOfWeek = Rb, re.weekdays = Wb, re._weekdays = ae, re.weekdaysMin = Yb, re._weekdaysMin = ce, re.weekdaysShort = Xb, re._weekdaysShort = be, re.weekdaysParse = Zb, re.isPM = fc, re._meridiemParse = de, re.meridiem = gc, x("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (a) {
            var b = a % 10,
                c = 1 === r(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        }
    }), a.lang = fa("moment.lang is deprecated. Use moment.locale instead.", x), a.langData = fa("moment.langData is deprecated. Use moment.localeData instead.", z);
    var se = Math.abs,
        te = Lc("ms"),
        ue = Lc("s"),
        ve = Lc("m"),
        we = Lc("h"),
        xe = Lc("d"),
        ye = Lc("w"),
        ze = Lc("M"),
        Ae = Lc("y"),
        Be = Nc("milliseconds"),
        Ce = Nc("seconds"),
        De = Nc("minutes"),
        Ee = Nc("hours"),
        Fe = Nc("days"),
        Ge = Nc("months"),
        He = Nc("years"),
        Ie = Math.round,
        Je = {
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        },
        Ke = Math.abs,
        Le = Ia.prototype;
    Le.abs = Bc, Le.add = Dc, Le.subtract = Ec, Le.as = Jc, Le.asMilliseconds = te, Le.asSeconds = ue, Le.asMinutes = ve, Le.asHours = we, Le.asDays = xe, Le.asWeeks = ye, Le.asMonths = ze, Le.asYears = Ae, Le.valueOf = Kc, Le._bubble = Gc, Le.get = Mc, Le.milliseconds = Be, Le.seconds = Ce, Le.minutes = De, Le.hours = Ee, Le.days = Fe, Le.weeks = Oc, Le.months = Ge, Le.years = He, Le.humanize = Sc, Le.toISOString = Tc, Le.toString = Tc, Le.toJSON = Tc, Le.locale = ub, Le.localeData = vb, Le.toIsoString = fa("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Tc), Le.lang = Zd, J("X", 0, 0, "unix"), J("x", 0, 0, "valueOf"), O("x", od), O("X", rd), S("X", function (a, b, c) {
        c._d = new Date(1e3 * parseFloat(a, 10))
    }), S("x", function (a, b, c) {
        c._d = new Date(r(a))
    }), a.version = "2.11.1", b(Ea), a.fn = ke, a.min = Ga, a.max = Ha, a.now = Td, a.utc = h, a.unix = kc, a.months = wc, a.isDate = d, a.locale = x, a.invalid = l, a.duration = Za, a.isMoment = p, a.weekdays = yc, a.parseZone = lc, a.localeData = z, a.isDuration = Ja, a.monthsShort = xc, a.weekdaysMin = Ac, a.defineLocale = y, a.weekdaysShort = zc, a.normalizeUnits = B, a.relativeTimeThreshold = Rc, a.prototype = ke;
    var Me = a;
    return Me
});
/*iraq-home.js*/
var pageIndex = 1,
    pageCount = 0,
    prm = [],
    vl = [],
    sort = 0,
    dir = 'desc',
    $carsHome = $('#cars-search-result'),
    $loader = $(".loadmoree"),
    $maker = $('#carMakerFilter'),
    //
    carBlock = '<div class="item-car-box col-lg-4 col-md-6 col-xs-12 animated fadeInUp">\
                        <div class="carousel slide items-cars-slider" id="car-box">\
                            <div class="carousel-inner" role="listbox">\
                                <div class="item active">\
                                    <a href="javascript:void(0);" class="itemm-img-a">\
                                        <img src="https://www.iraqusedcars.ae/public/cars/noimage.gif" class="itemm-img" alt="car"></a>\
                                </div>\
                            </div>\
                        </div>\
                        <ul class="item-car-ul">\
                            <li>\
                                <h2 class="item-car-title"><span class="Year" title="سنة الصنع"></span> <a data-toggle="tooltip" href="#car-details" class="CarType"></a></h2>\
                            </li>\
                            <li class="pricetxt" title="سعر السيارة">$0</li>\
                            <li>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">رقـم السيـارة: </div>\
                                    <div class="label-desc CarID"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">رقـم اللـــــــوت: </div>\
                                    <div class="label-desc LotNo"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">رقـم الشاصي: </div>\
                                    <div class="label-desc ChassisNo" data-toggle="tooltip"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">لـون الســـيارة: </div>\
                                    <div class="label-desc Color"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">حـالة السيــارة: </div>\
                                    <div class="label-desc Status"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">وصول السيارة:</div>\
                                    <div class="label-desc ArrivalDate"></div>\
                                </div>\
                            </li>\
                            <li><a class="btn btn-default call-btn car-detls pull-left" data-toggle="tooltip" role="button"><span class="glyphicon glyphicon glyphicon-menu-left"></span> التفاصيل</a></li>\
                        </ul>\
                    </div>', //methods
    scrollToCars = function () {
        $('html,body').animate({
            scrollTop: $("#cars-type-filter").offset().top - 27
        }, 'slow');
    },
    //region home cars
    OnRecordsSuccess = function (data) {
        var dt = LZString.decompressFromUTF16(data.d),
            xml = $.parseXML(dt),
            carslist = $.xml2json(xml).list,
            jsnCount = $.xml2json(xml).PageCount,
            carImages = $.xml2json(xml).list1;
        pageCount = parseInt(jsnCount.PageCount);

        $(carslist).each(function (i, item) {
            var carblk = $(carBlock).clone(true),
                carId = item.CarID,
                boxID = 'slides_car_' + carId;
            $(".CarID", carblk).html(carId);
            if (item.OwnerID === '2') { // سيارة عميل
                $("ul.item-car-ul", carblk).addClass('car-client');
                $(".CarID", carblk).append(' <a href="tel:' + item.phone + '"><i class="fa fa-phone fa-sm" data-toggle="tooltip" title="هذه السيارة معروضه لعميل شركة العراق، جوال:' + item.phone + '"></i></a>');
            }
            $(".items-cars-slider", carblk).attr('id', boxID).children('.carousel-control').attr('href', '#' + boxID);
            $(".ChassisNo", carblk).html(item.ChassisNo).attr('title', item.ChassisNo);
            $(".LotNo", carblk).html(item.LotNo);
            $(".Year", carblk).html(item.Year);
            $(".Status", carblk).html(item.WorkingStatusName + (item.AccidentType ? '، ' + item.AccidentType : ''));
            var url = '/car/' + (carId + '-' + item.MakerNameEn + '-' + item.TypeNameEn + '-' + item.Year).replace(/[_\W]+/g, "-"),
                title = item.MakerNameEn + ' - ' + item.TypeNameEn;
            $(".CarType", carblk).html('<i class="fa fa-external-link fa-small"></i> ' + (title.length > 21 ? title.substring(0, 21) : title)).attr('href', url).attr('title', title);
            $(".car-detls", carblk).attr('href', url);
            $(".Color", carblk).html(item.ColorNameAr);
            $(".pricetxt", carblk).html(numeral(item.WesitePrice).format('0,0') + ' $');
            var placeFlag = '<img src="/App_Themes/iraq/images/' + (!item.DistinationNameEn || item.DistinationNameEn.toLowerCase() === 'gulfauto' ? 'usa' : item.DistinationNameEn) + '.jpg" width="20" title="إلى: ' + (item.DistinationNameEn ? item.DistinationNameAr : 'أمريكا') + '" /> ';
            $(".ArrivalDate", carblk).append(placeFlag);
            if (item.ArrivalDate) {
                var now = moment(new Date(), 'DD/MM/YYYY'), to = moment(item.ArrivalDate, 'DD/MM/YYYY');
                if (now.diff(to) > 0) // today > arriveDate
                    $(".ArrivalDate", carblk).append('واصــــــلة');
                else {
                    $(".ArrivalDate", carblk).append(to.format('YYYY-MM-DD'));
                }
            } else if (item.WithoutShipping === 'true') {
                $(".ArrivalDate", carblk).append('واصــــــلة');
            }
            else if (item.DistinationNameEn && item.DistinationNameEn.toLowerCase() !== 'gulfauto' && !item.ArrivalDate) {
                $(".ArrivalDate", carblk).append('قيد الشحن');
            }

            $(".contact-phone", carblk).html(item.phone).attr('title', item.OwnerName);
            $(".car-detls", carblk).attr('title', title);
            $carsHome.animate({ opacity: 1 }).append(carblk);


            // bind car images
            if (item.MainPicture !== undefined) {
                var thumbImgUrl = '//www.iraqusedcars.ae/public/cars/' + carId + '/_thumb/' + item.MainPicture;

                $(".itemm-img-a", carblk).attr('href', url);
                $(".itemm-img", carblk).attr('src', thumbImgUrl);
            }


            //-------------------------------
            //if (carImages) {
            //    // filter images
            //    var _carImages = $.grep(carImages, function (v, i) {
            //        return v.CarID == carId;
            //    });
            //    GetImages2(carId, _carImages, item.MainPicture); // car images
            //}

        }).promise().done(function () { // fire sorting & filter
            IRAQCARS.toolTip();
            // page info
            if (pageCount > 1)
                $('#back-to-top span').text(pageIndex - 1 + '/' + pageCount);
            else
                $('#back-to-top span').text('');
            // show empty message
            if ($carsHome.is(':empty')) {
                $carsHome.append('<li class="col-md-12 col-sm-12 scroll_effect animated fadeInUp"><div class="alert alert-warning fade in"><a class="close" data-dismiss="alert" href="#remove">×</a> <strong>عفواً!</strong> ' + messagesAr.noDataFound + '</div></li>');
            }

            // hide loading
            $(".waiting").hide();
            $loader.hide();


            //apply view type
            var savedViewType = $.cookie("homeview");
            savedViewType = (savedViewType !== undefined && savedViewType !== null) ? savedViewType : false;
            gridListViewHome(savedViewType);
        });

        $loader.hide();
        $(".waiting").hide();
    },
    GetRecords = function () {
        if (pageIndex == 1 || pageIndex <= pageCount) {
            var _url = sURL + "GetCarsList",
                data = {
                    'param': prm,
                    'values': vl
                };
            $loader.show();
            $(".waiting").fadeIn();
            dataService.callAjax('Post', JSON.stringify(data), _url, OnRecordsSuccess, errorException);
        }
        pageIndex++;
    },
    startGetResult = function (sorting, direction) {
        sort = sorting;
        dir = direction;
        pageIndex = 1;
        pageCount = 0;
        $carsHome.empty(); // reset
        if (prm.indexOf('sort') == -1) {
            prm.push('sort', 'dir');
            vl.push(sort, dir);
        } else {
            vl[prm.indexOf('sort')] = sort;
            vl[prm.indexOf('dir')] = dir;
        }
    };
homeCarsFilter = function (typ) {
    $carsHome.empty();
    pageIndex = 1; // reset
    // prepare paramters
    prm = ['PageIndex', 'PageSize', 'type'], vl = [pageIndex, 6, '0'];
    if (typ == 1) { // search by type
        _type = $('#cars-type-filter a.filtericon-sole-active').attr('data-value');
        vl[2] = _type;
    } else if (typ == 2) { // search by maker
        prm.push('make');
        var mk = getNumbersFromString($maker.val()); // get only numbers
        mk = (mk == 0 ? '' : mk);
        vl.push(mk);
    } else if (typ == 3) { // fast search
        var sp = getFieldsValues('search-fast');
        prm.push.apply(prm, sp[0]);
        vl.push.apply(vl, sp[1]);
    } else if (typ == 4) { // fast search car no
        var sp = getFieldsValues('search-no');
        prm.push.apply(prm, sp[0]);
        vl.push.apply(vl, sp[1]);
    } else if (typ == 6) { // search car by make
        prm.push('make', 'model');
        var mdlVal = $('.models :checkbox:checked').map(function () {
            return this.value;
        }).get().join(','),
            mker = $('.makes input[name="make"]:checked').val();
        if (mker === undefined || mker === '' || mker === '0')
            mker = null;
        vl.push(mker, mdlVal);
    }
    GetRecords(); // get cars
},
//endregion

//region car images
OnImagesSuccess = function (data, cid, mainPic) {
    var imgID = '#slides_car_' + cid,
        $img = $(imgID);
    if (data.length > 0) // reset gallery
        $img.children('.carousel-inner').html('');
    $img.children('.carousel-indicators').html('');
    $(data).each(function (i, item) {
        var pointer = '<li data-target="' + imgID + '" data-slide-to="' + i + '" class="' + (((mainPic !== null && mainPic !== '' && item == mainPic) || (mainPic == null && i == 0)) ? ' active' : '') + '"></li>';
        //var img = '<div class="item' + (i == 0 ? ' active' : '') + '"><a href="/public/cars/' + cid + '/' + item + '" data-rel="prettyPhoto[car_' + cid + ']" class="itemm-img-a"><img src="/public/cars/' + cid + '/_thumb/' + item + '" class="itemm-img" alt=""></a></div>';
        var img = '<div class="item' + (((mainPic !== null && mainPic !== '' && item == mainPic) || (mainPic == null && i == 0)) ? ' active' : '') + '"><a href="https://www.iraqusedcars.ae/public/cars/' + cid + '/' + item + '" data-rel="prettyPhoto[car_' + cid + ']" class="itemm-img-a"><img src="https://www.iraqusedcars.ae/public/cars/' + cid + '/_thumb/' + item + '" class="itemm-img" alt=""></a></div>';
        $img.children('div.carousel-inner').append(img);
        $img.children('ol.carousel-indicators').append(pointer);
        $img.find('a[href="#carousel-id"]').attr('href', imgID);
    }).promise().done(function () { // fire sorting & filter
        //$('a.right[data-slide="next"]').trigger('click');
        IRAQCARS.PrettyPhoto();

        // hide loading
        $(".waiting").hide();
        $loader.hide();
    });
},
GetImages2 = function (cid, pics, mainPic) {
    var imgID = '#slides_car_' + cid,
        $img = $(imgID);
    if (pics.length > 0) {
        $img.find('.carousel-inner').html('');
        $img.find('.carousel-indicators').html('');
        $(pics).each(function (i, value) {
            var item = value.URL,
                pointer = '<li data-target="' + imgID + '" data-slide-to="' + i + '" class="' + (((mainPic !== null && mainPic !== '' && item == mainPic) || (mainPic == null && i == 0)) ? ' active' : '') + '"></li>',
                img = '<div class="item' + (((mainPic !== null && mainPic !== '' && item == mainPic) || (mainPic == null && i == 0)) ? ' active' : '') + '"><a href="https://www.iraqusedcars.ae/public/cars/' + cid + '/' + item + '" data-rel="prettyPhoto[car_' + cid + ']" class="itemm-img-a"><img src="https://www.iraqusedcars.ae/public/cars/' + cid + '/_thumb/' + item + '" class="itemm-img" alt=""></a></div>';

            $img.children('div.carousel-inner').append(img);
            $img.children('ol.carousel-indicators').append(pointer);
            $img.find('a[href="#carousel-id"]').attr('href', imgID);

        }).promise().done(function () {
            //$('a.right[data-slide="next"]').trigger('click');
            IRAQCARS.PrettyPhoto();
            // hide loading
            $(".waiting").hide();
            $loader.hide();
        });
    }
},
GetImages = function (id, mainPicture) {
    var _url = sURL + "ShowCarImages",
        data = {
            'id': id
        };

    dataService.callAjax('Post', JSON.stringify(data), _url, success = function (data) {
        OnImagesSuccess(data.d, id, mainPicture)
    }, errorException);

};
//endregion

// initialize data & event.
$(function () {
    // filter by type.
    $('#cars-type-filter a.type').on("click", function (e) {
        //e.preventDefault();
        $('#cars-type-filter a.type').removeClass('filtericon-sole-active');
        $(this).addClass('filtericon-sole-active'); // assign active        
    });
    // fats search.
    $('.btnSearchFast').on("click", function (e) {
        e.preventDefault();
        homeCarsFilter(3);
        scrollToCars();
    });
    // fats search car no.
    $('.btnSearchNo').on("click", function (e) {
        e.preventDefault();
        homeCarsFilter(4);
    });
    // serach cars by checked make from side bar
    $(".makes").on("click", 'input[name="make"]', function () {
        var mker = $(this).val();
        $maker.val(mker);
        homeCarsFilter(2);
    });
    $(".models").on("click", 'input[name="model"]', function () {
        homeCarsFilter(6);
    });
    // get more by scroll    
    $(window).scroll(function () {
        if ($('.waiting').is(':visible')) {
            $(".waiting").hide();
        }
        // fill by scroll window
        //if (($(window).scrollTop() == $(document).height() - $(window).height()) && $(".item-car-box").length > 0 && pageIndex <= pageCount) {
        if (($(window).scrollTop() >= $(document).height() - $(window).height() - 250) && $(".item-car-box").length > 0 && pageIndex <= pageCount) {
            vl[0] = pageIndex;
            GetRecords();
        }
    });
    // sort result
    $('.results-sorter ul li a').click(function (e) {
        e.preventDefault();
        // get new sorting option
        var $this = $(this),
            sort = $this.data('id'),
            dir = $this.data('sort');
        // clear existing data
        startGetResult(sort, dir);
        // show selected text
        var sortText = $this.html();
        $('.listing-sort-btn').html(sortText);
        // show selected item style
        $this.closest('ul').find('li').removeClass('active');
        $this.closest('li').addClass('active');
    });
    // filter by makers in carousel
    $(window).hashchange(function (e) {
        e.preventDefault();
        var hash = location.hash;
        hash = hash.replace(/^#/, '');
        if (hash.indexOf('ake=') > 0) {
            var mker = getHashQueryStrs()['make'];
            mker = getNumbersFromString(mker);
            $maker.val(mker);
            scrollToCars();
            homeCarsFilter(2);
        } else if (hash.indexOf('ype=') > 0) {
            $carsHome.empty();
            scrollToCars();
            homeCarsFilter(1);
        }
        return false;
    });
});
homeCarsFilter(0);

/*!jquery.carousel.min.js*/
(function (c) {
    function ga(z, s) {
        function m() { u = j.length; p = v * 2 / u; for (var b = 0; b < u; b++) ha(b); o(g); c.browser.msie || N(0); c(document).bind("mousemove", function (d) { k = d.pageX; q = d.pageY }); z.onselectstart = function () { return false }; a.settings.autoScroll && A(); a.settings.mouseScroll && O(); a.settings.mouseDrag && X(); a.settings.mouseWheel && Y(); a.settings.scrollbar && ia(); a.settings.tooltip && c('<div class="tooltip"><p></p></div>').css("opacity", 0).appendTo(i) } function ha(b) {
            var d = c('<img class="carousel-item"/>').appendTo(i);
            Z.push(d); d.css({ width: a.settings.itemWidth, h: a.settings.itemHeight }).data({ w: a.settings.itemWidth, h: a.settings.itemHeight, index: b }).addClass("out").bind({
                mouseover: function () { c(this).hasClass("out") && c(this).removeClass("out").addClass("over"); a.settings.tooltip && ja(b); if (a.settings.mouseScroll) B = a.settings.mouseScrollSpeedHover; var e = { type: "itemMouseOver", index: b, data: j[b] }; c.isFunction(a.settings.itemMouseOver) && a.settings.itemMouseOver.call(this, e) }, mouseout: function () {
                    c(this).hasClass("over") &&
                    c(this).removeClass("over").addClass("out"); a.settings.tooltip && ka(); if (a.settings.mouseScroll) B = a.settings.mouseScrollSpeed; var e = { type: "itemMouseOut", index: b, data: j[b] }; c.isFunction(a.settings.itemMouseOut) && a.settings.itemMouseOut.call(this, e)
                }, click: function () {
                    i.find(".click").removeClass("click").addClass("out"); c(this).removeClass("over").addClass("click"); a.settings.scrollOnClick && C(b); if (j[b].link) window.open(j[b].link, j[b].linkTarget || a.settings.linkTarget); var e = {
                        type: "itemClick", index: b,
                        data: j[b]
                    }; c.isFunction(a.settings.itemClick) && a.settings.itemClick.call(this, e)
                }
            }); j[b].link && d.css("cursor", "pointer"); c.browser.msie && N(b)
        } function N(b) {
            var d = j[b].path, e = Z[b]; c("<img/>").load(function () {
                var h = parseInt(c(this).attr("width") || c(this).prop("width")), f = parseInt(c(this).attr("height") || c(this).prop("height")); if (a.settings.crop) e.css("background-image", "url(" + d + ")"); else { e.attr("src", d); e.css("background-image", "none") } if (a.settings.resize) if (a.settings.maintainAspectRatio) {
                    scaleX =
                    a.settings.itemWidth / h; scaleY = a.settings.itemHeight / f; if (scaleX < scaleY) { h *= scaleX; f *= scaleX } else { h *= scaleY; f *= scaleY }
                } else { h = a.settings.itemWidth; f = a.settings.itemHeigh } e.css({ width: h, height: f }); e.data({ w: h, h: f }); o(g); c.browser.msie || b < u - 1 && N(++b)
            }).attr("src", d)
        } function o(b) {
            i.find(".carousel-item").each(function (d) {
                var e = c(this), h = e.data("w"), f = e.data("h"), D = Math.sin(-(p * d) + v * 0.5 + b * w) * a.settings.verticalRadius + P - f * 0.5, r = (D - ($ - f * 0.5)) / (aa - $) * (1 - a.settings.scaleRatio) + a.settings.scaleRatio; e.css({
                    width: h *
                    r, height: f * r, left: Math.cos(-(p * d) + v * 0.5 + b * w) * a.settings.horizontalRadius + Q - h * 0.5 + h * (1 - r) / 2, top: D + f * (1 - r) / 2, "z-index": Math.floor(r * 10 * u)
                })
            }); a.settings.scrollbar && !x && la(R())
        } function C(b) { l = b; var d = p * (180 / v) * b % 360; g %= 360; if (Math.abs(d - g) > 180) d += d > g ? -360 : 360; if (d - g > 180 && d > g) d -= 360; E(); S = setInterval(function () { if (Math.abs(d - g) > 0.5) { g += (d - g) * (a.settings.scrollSpeed / 100); o(g) } else F() }, 30); b = { type: "itemSelect", index: l, data: j[l] }; c.isFunction(a.settings.itemSelect) && a.settings.itemSelect.call(this, b) }
        function ba() { C(l == j.length - 1 ? 0 : l + 1) } function ca() { C(l == 0 ? j.length - 1 : l - 1) } function A() { if (!(G && a.settings.pauseAutoScrollIfTooltip)) { a.settings.autoScroll = true; t = setTimeout(function () { if (a.settings.autoScrollDirection == "next") ba(); else a.settings.autoScrollDirection == "previous" && ca() }, a.settings.autoScrollDelay) } } function O() {
            a.settings.mouseScroll = true; B = a.settings.mouseScrollSpeed; var b = 0, d = a.settings.mouseScrollReverse ? -1 : 1; H = setInterval(function () {
                if (k > i.offset().left && k < i.offset().left + a.settings.width &&
                q > i.offset().top && q < i.offset().top + a.settings.height) { b = d * (k - (i.offset().left + Q)) * (B / 1E3); g += b; o(g) } else if (Math.abs(b) > 0.1) { b *= a.settings.mouseScrollEase / 100; g += b; o(g) } else b = 0
            }, 30)
        } function X() {
            function b(f) { T = f.pageX; if (!I) { E(); d() } } function d() { I = true; J = setInterval(function () { var f = (360 * (h * (T - da) / (100 * a.settings.mouseDragSpeed)) + e - g) * (a.settings.mouseDragEase / 100); if ((f >= 0 ? f : -f) > 0.1) { g += f; l = Math.round(g * w / p); o(g) } else F() }, 30) } a.settings.mouseDrag = true; var e = 0, h = a.settings.mouseDragReverse ? 1 :
            -1; c(document).bind("mousedown", function (f) { if (k > i.offset().left && k < i.offset().left + a.settings.width && q > i.offset().top && q < i.offset().top + a.settings.height) { T = da = f.pageX; e = g; c(document).bind("mousemove", b) } }); c(document).bind("mouseup", function () { c(document).unbind("mousemove", b) })
        } function Y() {
            a.settings.mouseWheel = true; var b = 0, d = a.settings.mouseWheelReverse ? -1 : 1; i.bind("mousewheel", function (e, h) {
                e.preventDefault(); if (!K) {
                    E(); K = true; b = g; L = setInterval(function () {
                        if (Math.abs(b - g) > 0.5) {
                            g += (b - g) * (a.settings.mouseWheelSpeed /
                            100); l = Math.round(g * w / p); o(g)
                        } else F()
                    }, 30)
                } b += d * h * 10
            })
        } function ia() {
            function b() { n = k - h.offset().left - ea; d() } function d() { if (n < 0) n = 0; else if (n > parseInt(h.css("width")) - parseInt(f.css("width"))) n = parseInt(h.css("width")) - parseInt(f.css("width")); x && f.css("left", n); U = n / (parseInt(h.css("width")) - parseInt(f.css("width"))); if (!M) { E(); M = true; g %= 360; V = setInterval(function () { if (Math.abs(R() - U) > 0.0010) { var W = (U - R()) * (a.settings.scrollbarEase / 100); g += W * 360; l = Math.round(g * w / p); o(g) } else M && F() }, 30) } } var e =
            c('<div class="scrollbar"></div>').appendTo(i), h = c('<div class="track"></div>').appendTo(e), f = c('<div class="thumb"></div>').appendTo(h), D = c('<div class="left"></div>').appendTo(e), r = c('<div class="right"></div>').appendTo(e), n = 0, ea; e.css({ top: aa, left: Q - parseInt(e.css("width")) / 2 }); f.bind("mousedown", function (W) { W.preventDefault(); ea = k - f.offset().left; x = true; c(document).bind("mousemove", b) }); c(document).bind("mouseup", function () { if (x) { x = false; c(document).unbind("mousemove", b) } }); D.bind("click", function () {
                n =
                parseInt(f.css("left")) - a.settings.arrowScrollAmount; d()
            }); r.bind("click", function () { n = parseInt(f.css("left")) + a.settings.arrowScrollAmount; d() })
        } function la(b) { var d = i.find(".scrollbar").find(".track"), e = d.find(".thumb"); e.css("left", b * (parseInt(d.css("width")) - parseInt(e.css("width")))) } function R() { var b = g % 360 / 360; if (b < 0) b += 1; return b } function E() { fa(); if (!y) { y = true; c.isFunction(a.settings.scrollStart) && a.settings.scrollStart.call(this) } } function F() {
            fa(); if (y) {
                y = false; c.isFunction(a.settings.scrollComplete) &&
                a.settings.scrollComplete.call(this)
            } a.settings.mouseScroll && O(); a.settings.autoScroll && A()
        } function fa() { H && clearInterval(H); if (J) { I = false; clearInterval(J) } if (L) { K = false; clearInterval(L) } if (V) { M = false; clearInterval(V) } S && clearInterval(S); t && clearTimeout(t) } function ja(b) {
            if (b = j[b].tooltip) {
                G = true; var d = i.find(".tooltip"); d.find("p").html(b); d.stop().animate({ opacity: 1 }, 300); var e = -d.outerWidth() / 2, h = 0 - d.outerHeight() - parseInt(d.css("marginBottom")); d.css({
                    left: k - i.offset().left + e, top: q - i.offset().top +
                    h
                }); c(document).bind("mousemove.tooltip", function () { d.css({ left: k - i.offset().left + e, top: q - i.offset().top + h }) }); t && a.settings.pauseAutoScrollIfTooltip && clearTimeout(t)
            }
        } function ka() { if (G) { G = false; var b = i.find(".tooltip"); b.stop().animate({ opacity: 0 }, 200, function () { c(document).unbind("mousemove.tooltip"); b.css("left", -9999) }); a.settings.autoScroll && a.settings.pauseAutoScrollIfTooltip && A() } } this.settings = c.extend({}, c.fn.carousel.defaults, s); var i = c(z), a = this, l = 0, j = [], Z = [], v = Math.PI, w = v / 180, S, t, H, J,
        L, V, B = a.settings.mouseScrollSpeed, k, q, T = 0, da = 0, I = false, K = false, x = false, M = false, U = 0, g = 0, Q = a.settings.width / 2, P = a.settings.height / 2, $ = P - a.settings.verticalRadius, aa = P + a.settings.verticalRadius, p, u, y = false, G = false; (function () {
            i.addClass("carousel").css({ width: a.settings.width, height: a.settings.height }); if (a.settings.xmlSource) {
                i.empty(); c.ajax({
                    type: "GET", url: a.settings.xmlSource, dataType: c.browser.msie ? "text" : "xml", success: function (b) {
                        var d; if (c.browser.msie) {
                            d = new ActiveXObject("Microsoft.XMLDOM");
                            d.async = false; d.loadXML(b)
                        } else d = b; c(d).find("item").each(function () { for (var e = {}, h = 0; h < c(this).children().length; h++) { var f = c(this).children()[h]; e[f.nodeName] = c(this).find(f.nodeName).text() } j.push(e) }); m()
                    }
                })
            } else {
                i.children().each(function () {
                    for (var b = {}, d = 0; d < c(this).children().length; d++) {
                        var e = c(this).children()[d]; if (c(e).is("a")) { b.path = c(e).find("img").attr("src"); b.link = c(e).attr("href"); if (c(e).attr("target")) b.linkTarget = c(e).attr("target") } else if (c(e).is("img")) b.path = c(e).attr("src");
                        else b[c(e).attr("class")] = c(e).html()
                    } j.push(b)
                }); i.empty(); m()
            }
        })(); this.startAutoScroll = A; this.stopAutoScroll = function () { a.settings.autoScroll = false; clearTimeout(t) }; this.startMouseScroll = O; this.stopMouseScroll = function () { a.settings.mouseScroll = false; clearInterval(H) }; this.startMouseDrag = X; this.stopMouseDrag = function () { I = a.settings.mouseDrag = false; clearInterval(J) }; this.startMouseWheel = Y; this.stopMouseWheel = function () { K = a.settings.mouseWheel = false; clearInterval(L) }; this.scrollToItem = C; this.scrollToNext =
        ba; this.scrollToPrevious = ca; this.isScrolling = function () { return y }
    } c.fn.carousel = function (z) { for (var s = [], m = 0; m < this.length; m++) if (!this[m].carousel) { this[m].carousel = new ga(this[m], z); s.push(this[m].carousel) } return s.length > 1 ? s : s[0] }; c.fn.carousel.defaults = {
        xmlSource: null, width: 500, height: 300, itemWidth: 100, itemHeight: 100, horizontalRadius: 250, verticalRadius: 100, resize: true, maintainAspectRatio: true, crop: false, scaleRatio: 0.5, mouseScroll: false, scrollOnClick: true, mouseDrag: false, scrollbar: false, arrowScrollAmount: 50,
        tooltip: true, mouseScrollEase: 90, mouseDragEase: 10, scrollbarEase: 10, scrollSpeed: 10, mouseDragSpeed: 20, mouseScrollSpeed: 10, mouseScrollSpeedHover: 3, mouseWheel: false, mouseWheelSpeed: 10, mouseScrollReverse: false, mouseDragReverse: false, mouseWheelReverse: false, autoScroll: false, autoScrollDirection: "next", autoScrollDelay: 3E3, pauseAutoScrollIfTooltip: true, linkTarget: "_blank", itemSelect: null, itemClick: null, itemMouseOver: null, itemMouseOut: null, scrollStart: null, scrollComplete: null
    }
})(jQuery);
/*!jQuery Mousewheel 3.1.13*/

/*!home-init.js*/
var gridListViewHome = function (isList) {
    if (isList === true || isList === 'true') {
        var _btn = $(".list-view-btn");
        _btn.addClass("filtericon-sole-active"), $(".grid-view-btn").removeClass("filtericon-sole-active"), $(".item-car-box").removeClass("col-lg-4 col-md-6 col-xs-12").addClass("list-itemscars col-lg-12"), $(".items-cars-slider").addClass("col-lg-4"), $(".item-car-ul").addClass("col-lg-8")
    } else { // default view
        var _btn = $(".grid-view-btn");
        _btn.addClass("filtericon-sole-active"), $(".list-view-btn").removeClass("filtericon-sole-active"), $(".item-car-box").removeClass("list-itemscars col-lg-12").addClass("col-lg-4 col-md-6 col-xs-12"), $(".items-cars-slider").removeClass("col-lg-4"), $(".item-car-ul").removeClass("col-lg-8")
    }

    $.cookie("homeview", isList/*, { expires: 1, path: '/', secure: true }*/);
};
jQuery(document).ready(function (l) {
    var _wWidth = $(window).width();
    var carousel = $('#carousel').carousel({
        height: 350,
        itemWidth: 200,
        horizontalRadius: (_wWidth <= 870) ? (_wWidth < 750 ? 300 : 370) : 430,
        verticalRadius: 140,
        scaleRatio: 0.4,
        mouseScroll: true,
        scrollOnClick: false,
        mouseDrag: true,
        autoScroll: true,
        scrollbar: false,
        tooltip: false,
        linkTarget: "_self",
        resize: true,
        mouseWheel: true,
        mouseWheelReverse: true
    });
    $('#carousel').removeClass('hide');
}),
$(function () {
    $(".list-view-btn").click(function () {
        gridListViewHome(true);
    })
}), $(function () {
    $(".grid-view-btn").click(function () {
        gridListViewHome(false); // default view is grid
    })
}), $(".mt-play").click(function () {
    var l = $(this);
    l.hasClass("mt-pause") ? l.children("span").addClass("glyphicon-play").removeClass("glyphicon-pause") : l.children("span").addClass("glyphicon-pause").removeClass("glyphicon-play")
}), $("#minyear").change(function () {
    $("#maxyear").val($(this).val())
});
/*!sticky.js*/
! function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    var e = Array.prototype.slice,
        i = Array.prototype.splice,
        r = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: "is-sticky",
            wrapperClassName: "sticky-wrapper",
            center: !1,
            getWidthFrom: "",
            widthFromWrapper: !0,
            responsiveWidth: !1
        },
        n = t(window),
        s = t(document),
        o = [],
        c = n.height(),
        a = function () {
            for (var e = n.scrollTop(), i = s.height(), r = i - c, a = e > r ? r - e : 0, p = 0, l = o.length; l > p; p++) {
                var d = o[p],
                    u = d.stickyWrapper.offset().top,
                    h = u - d.topSpacing - a;
                if (d.stickyWrapper.css("height", d.stickyElement.outerHeight()), h >= e) null !== d.currentTop && (d.stickyElement.css({
                    width: "",
                    position: "",
                    top: ""
                }), d.stickyElement.parent().removeClass(d.className), d.stickyElement.trigger("sticky-end", [d]), d.currentTop = null);
                else {
                    var g = i - d.stickyElement.outerHeight() - d.topSpacing - d.bottomSpacing - e - a;
                    if (0 > g ? g += d.topSpacing : g = d.topSpacing, d.currentTop !== g) {
                        var m;
                        d.getWidthFrom ? m = t(d.getWidthFrom).width() || null : d.widthFromWrapper && (m = d.stickyWrapper.width()), null == m && (m = d.stickyElement.width()), d.stickyElement.css("width", m).css("position", "fixed").css("top", g), d.stickyElement.parent().addClass(d.className), null === d.currentTop ? d.stickyElement.trigger("sticky-start", [d]) : d.stickyElement.trigger("sticky-update", [d]), d.currentTop === d.topSpacing && d.currentTop > g || null === d.currentTop && g < d.topSpacing ? d.stickyElement.trigger("sticky-bottom-reached", [d]) : null !== d.currentTop && g === d.topSpacing && d.currentTop < g && d.stickyElement.trigger("sticky-bottom-unreached", [d]), d.currentTop = g
                    }
                    var y = d.stickyWrapper.parent(),
                        f = d.stickyElement.offset().top + d.stickyElement.outerHeight() >= y.offset().top + y.outerHeight() && d.stickyElement.offset().top <= d.topSpacing;
                    f ? d.stickyElement.css("position", "absolute").css("top", "").css("bottom", 0) : d.stickyElement.css("position", "fixed").css("top", g).css("bottom", "")
                }
            }
        },
        p = function () {
            c = n.height();
            for (var e = 0, i = o.length; i > e; e++) {
                var r = o[e],
                    s = null;
                r.getWidthFrom ? r.responsiveWidth && (s = t(r.getWidthFrom).width()) : r.widthFromWrapper && (s = r.stickyWrapper.width()), null != s && r.stickyElement.css("width", s)
            }
        },
        l = {
            init: function (e) {
                var i = t.extend({}, r, e);
                return this.each(function () {
                    var e = t(this),
                        n = e.attr("id"),
                        s = n ? n + "-" + r.wrapperClassName : r.wrapperClassName,
                        c = t("<div></div>").attr("id", s).addClass(i.wrapperClassName);
                    e.wrapAll(c);
                    var a = e.parent();
                    i.center && a.css({
                        width: e.outerWidth(),
                        marginLeft: "auto",
                        marginRight: "auto"
                    }), "right" === e.css("float") && e.css({
                        "float": "none"
                    }).parent().css({
                        "float": "right"
                    }), i.stickyElement = e, i.stickyWrapper = a, i.currentTop = null, o.push(i), l.setWrapperHeight(this), l.setupChangeListeners(this)
                })
            },
            setWrapperHeight: function (e) {
                var i = t(e),
                    r = i.parent();
                r && r.css("height", i.outerHeight())
            },
            setupChangeListeners: function (t) {
                if (window.MutationObserver) {
                    var e = new window.MutationObserver(function (e) {
                        (e[0].addedNodes.length || e[0].removedNodes.length) && l.setWrapperHeight(t)
                    });
                    e.observe(t, {
                        subtree: !0,
                        childList: !0
                    })
                } else t.addEventListener("DOMNodeInserted", function () {
                    l.setWrapperHeight(t)
                }, !1), t.addEventListener("DOMNodeRemoved", function () {
                    l.setWrapperHeight(t)
                }, !1)
            },
            update: a,
            unstick: function (e) {
                return this.each(function () {
                    for (var e = this, r = t(e), n = -1, s = o.length; s-- > 0;) o[s].stickyElement.get(0) === e && (i.call(o, s, 1), n = s); -1 !== n && (r.unwrap(), r.css({
                        width: "",
                        position: "",
                        top: "",
                        "float": ""
                    }))
                })
            }
        };
    window.addEventListener ? (window.addEventListener("scroll", a, !1), window.addEventListener("resize", p, !1)) : window.attachEvent && (window.attachEvent("onscroll", a), window.attachEvent("onresize", p)), t.fn.sticky = function (i) {
        return l[i] ? l[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : l.init.apply(this, arguments)
    }, t.fn.unstick = function (i) {
        return l[i] ? l[i].apply(this, e.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist on jQuery.sticky") : l.unstick.apply(this, arguments)
    }, t(function () {
        setTimeout(a, 0)
    })
});
$(function () {
    $(".filter-marque").sticky({ topSpacing: 0 }) // home makers bar
    .on('sticky-start', function () { $(".filter-marque").removeClass('hidden'); }).on('sticky-end', function () { $(".filter-marque").addClass('hidden'); });
});