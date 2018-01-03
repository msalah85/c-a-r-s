$(document).ready(function () {
    setTimeout("animation()", 300);
});
function animation() {
    cloud1();
    cloud2();
    cloud3();
    cloud4();
}
function cloud1() {
    $("#cloud1").animate({ left: "+=80%" }, 50000).animate({ left: "-0px" }, 0, function () {
        $("#cloud2").animate({ left: "+=50%" }, 40000).animate({ left: "-0px" }, 0)
    });
    setTimeout("cloud1()", 50000);
}
function cloud2() {
    $("#cloud2").animate({ left: "+=70%" }, 40000).animate({ left: "-0px" }, 0)
    setTimeout("cloud2()", 30000);
}
function cloud3() {
    $("#cloud3").animate({ left: "+=70%" }, 60000).animate({ left: "-0px" }, 0)
    setTimeout("cloud3()", 20000);
}
function cloud4() {
    $("#cloud4").animate({ left: "+=70%" }, 75000).animate({ left: "-0px" }, 0)
    setTimeout("cloud4()", 75000);
}	