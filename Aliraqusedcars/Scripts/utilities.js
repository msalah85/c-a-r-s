//Sys.Application.add_load(FirejQuery);
//function FirejQuery() {
/*function page_Load(sender, args) {*/
//$(document).ready(function () {
$().ready(function () {
    // assign date range
    $('#From.date-picker').change(function () { $('#To.date-picker').val($(this).val()); })
    $('form').validate({
        //onfocusout: true,
        // This prevents validation from running on every
        //  form submission by default.
        onsubmit: false,
        highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
            $(e).closest('.required-items').removeClass('info').addClass('error');
        },
        success: function (e) {
            $(e).closest('.control-group').removeClass('error').addClass('info');
            $(e).closest('.required-items').removeClass('error').addClass('info');
            $(e).remove();
        },
        showErrors: function (errorMap, errorList) {
            // Clean up any tooltips for valid elements
            $.each(this.validElements(), function (i, element) {
                var $element = $(element);
                $element.data("title", "") // Clear the title - there is no error associated anymore
                    .removeClass("error").tooltip("destroy");
                $element.closest('.control-group').removeClass('error').addClass('info');
                $element.closest('.required-items').removeClass('error').addClass('info');
            });
            // Create new tooltips for invalid elements
            $.each(errorList, function (i, error) {
                var $element = $(error.element);
                $element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                    .data("title", error.message).addClass("error").tooltip(); // Create a new tooltip based on the error messsage we just set in the title
                $element.closest('.control-group').removeClass('info').addClass('error');
                $element.closest('.required-items').removeClass('info').addClass('error');
            });
        },
        //errorPlacement: function (error, element) {
        //    if (element.is(':checkbox') || element.is(':radio')) {
        //        var controls = element.closest('.controls');
        //        if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
        //        else error.insertAfter(element.nextAll('.lbl').eq(0));
        //    }
        //    else if (element.is('.chzn-select')) {
        //        error.insertAfter(element.nextAll('[class*="chosen-container"]').eq(0));
        //    }
        //    else error.insertAfter(element);
        //},
        submitHandler: function (form) {
            //if (self.action) {
            //}
        },
        invalidHandler: function (form) {
        }
    });
    $(".btn-success").click(function (evt) {
        // Validate the form and retain the result.
        var isValid = $("#aspnetForm").valid();
        // If the form didn't validate, prevent the
        //  form submission.
        if (!isValid) {
            evt.preventDefault();
            // Show error message
            $.gritter.add({ title: 'حقول مطلوبه!', text: 'يرجى التأكد من ادخال جميع الحقول الإجبارية.', sticky: false });
        }
    }); // End validation
    setTimeout(function () { $("div[id$=divError]").hide(1000); }, 20000);
    var $selectorItem = $('.gvItems');
    var tableColCount = $selectorItem.children('thead').children('tr:first').length;
    if ($selectorItem.length > 0 && tableColCount > 0) {
        var oTable = $selectorItem.DataTable({
            "iDisplayLength": 50, "aaSorting": [], "language": { "url": "/Scripts/datatable/Arabic.min.js" }, "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
            buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                        { extend: 'copy', text: 'نسـخ', },
                        {
                            text: 'طباعة',
                            action: function (e, dt, node, config) {
                                $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                                window.print();
                            }
                        }
            ],
        });
    }
    //$('.currency').autoNumeric('init');
    $('.date-picker').datepicker({ autoclose: true, dateFormat: 'mm/dd/yyyy' });
    // set current date 
    $('.current-date').datepicker('setDate', new Date());
    $('.radioList').find('label').addClass('lbl');
    //$('.color-picker').ace_colorpicker({ pull_right: true }).on('change', function () {
    //    var color_class = $(this).find('option:selected').data('class');
    //    var new_class = 'widget-header';
    //    if (color_class != 'default') new_class += ' header-color-' + color_class;
    //    $(this).closest('.widget-header').attr('class', new_class);
    //});
    $('[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip').tooltip();
    $('[data-toggle="popover"]').popover();
    $(".chzn-select").chosen({ allow_single_deselect: true, no_results_text: "اختـــر", search_contains: true }).on('change', function () {
        if ($(this).attr('required')) { $(this).closest('form').validate().element($(this)); }
    });
    //$('textarea[class*=autosize]').autosize({ append: "\n" });
    //$('textarea[class*=limited]').each(function () {
    //    var limit = parseInt($(this).attr('data-maxlength')) || 100;
    //    $(this).inputlimiter({
    //        "limit": limit,
    //        remText: '%n حرف متبقى...',
    //        limitText: 'عدد الأحرف المطلوبة : %n.'
    //    });
    //});
    //$.mask.definitions['~'] = '[+-]';
    //$('.input-mask-date').mask('99/99/9999');
    $('.attachments').ace_file_input({
        style: 'well',
        btn_choose: 'اسحب الصور هنا ، أو انقر وحدد إختياراتك',
        btn_change: null,
        no_icon: 'icon-cloud-upload',
        droppable: true,
        thumbnail: 'large',
        whitelist: 'gif|png|jpg|jpeg',
        blacklist: 'exe|php|txt|asp|aspx',
        before_change: function (files, dropped) {
            var allowed_files = [];

            for (var i = 0 ; i < files.length; i++) {
                var file = files[i];
                if (typeof file === "string") {
                    //ie8 and browsers that don't support file object
                    if (!(/\.(jpe?g|png|gif|bmp)$/i).test(file)) return false;
                }
                else {
                    var type = $.trim(file.type);
                    if ((type.length > 0 && !(/^image\/(jpe?g|png|gif|bmp)$/i).test(type))
                            || (type.length == 0 && !(/\.(jpe?g|png|gif|bmp)$/i).test(file.name))//for android's default browser which gives an empty string for file.type
                        ) continue;//not an image so don't keep this file
                }
                allowed_files.push(file);
            }
            if (allowed_files.length == 0) return false;


            return allowed_files;
        }
    }).on('change', function () {
        //console.log($(this).data('ace_input_files'));//console.log($(this).data('ace_input_method'));
    });
});
$('.printme').live('click', function (e) { e.preventDefault(); $("#sidebar").addClass("menu-min"); window.print(); });
//var colorbox_params = {
//    reposition: true,
//    scalePhotos: true,
//    scrolling: false,
//    previous: '<i class="icon-arrow-left"></i>',
//    next: '<i class="icon-arrow-right"></i>',
//    close: '&times;',
//    current: '{current} of {total}',
//    maxWidth: '80%',
//    maxHeight: '80%',
//    onOpen: function () {
//        document.body.style.overflow = 'hidden';
//    },
//    onClosed: function () {
//        document.body.style.overflow = 'auto';
//    },
//    onComplete: function () {
//        $.colorbox.resize();
//    }
//};
//$('.ace-thumbnails [data-rel="colorbox"]').colorbox(colorbox_params);
//}
// color the select Hexa Code
function colorChanged(sender) { sender.get_element().style.color = "#" + sender.get_selectedColor(); }
// Confirm alert.
function DeleteConfirmation() {
    return confirm("هل أنت متأكد من حذف هذا السجل الذى تم اختياره؟");
}
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
// Animate page title
var msg = document.title != null ? document.title : " شركة العراق لتجارة السيارات المستعمله ";
var pos = 0; var spacer = " -";
var time_length = 200;
function RunTitle() {
    document.title = msg.substring(pos, msg.length) + spacer + msg.substring(0, pos); pos++;
    if (pos > msg.length) pos = 0;
    window.setTimeout("RunTitle()", time_length);
} RunTitle();
// Assign latest page skin
var skin = $.cookie("Taj.Skin");
if (skin != undefined && skin != null && skin != "") {
    $(document.body).addClass(skin + " navbar-fixed");
    $(".navbar-inverse").addClass("navbar-fixed-top");
    $("#ace-settings-header").attr("checked", "checked");
    $("option[data-class='" + skin + "']").attr("selected", true);
}
//$("#sidebar ul.nav-list li:first").addClass("open").find('ul').css('display', 'block');
function setNavigation() {
    var path = location.href.toLowerCase().replace(/\/$/, ""); path = decodeURIComponent(path); $('.nav-list li.active').removeClass('active'); $("#sidebar ul.nav-list a").each(function () { var href = $(this).attr('href').toLowerCase(); if (path.indexOf(href) > -1) { $(this).closest('li').addClass('active').parent().parent().addClass("active open"); } });
}
setNavigation();