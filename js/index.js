var items = [];
var itemsSrc = [];
var status = 2;
var sortState = false;
var pingBg;


var goTop = $(".go-top")
var layoutList = $(".layout-list")
var nav = $("#nav")
var navContent = $(".nav-content")
$(window).scroll(function () {
    layoutList.hide();
    if (nav.offset().top <= $(window).scrollTop()) {
        goTop.show();
        navContent.css({
            position: "fixed",
            top: 0,
            backgroundColor: "#353535",
            zIndex: 19,
        })
    } else if (nav.offset().top > $(window).scrollTop()) {
        goTop.hide();
        navContent.css({
            position: "relative",
            backgroundColor: "rgba(0,0,0,0)",
            zIndex: 19,
        })
    }
});
goTop.click(function () {
    $(window).scrollTop(0);
})





function getPage(page) {
    $.get('http://mock-api.com/vzMMo8zG.mock/live/img?page=' + page, function (res) {
        $.each(res.list, function (index, item) {
            items.push(item)
            itemsSrc.push(item.src)
        })
        for (let i = 0; i < items.length; i++) {
            var oImg = new Image();
            oImg.src = items[i].src;
        }
        $(oImg).on("load", function () {
            juzheng(true);
            pingBg = $(".pingBg")
        })
    });
}
getPage(1);
juzhengDom()


function juzhengDom() {
    var li1 = $("<li class='img-item'></li>")
    var li2 = $("<li class='img-item'></li>")
    $(".images-ul").empty().append(li1, li2)
}

function juzheng(sunxu) {
    status = 2;
    for (let i = 0; i < items.length; i++) {
        var img = $("<img id='" + items[i].id + "' src='" + items[i].src + "'>")
        var div1 = $("<div></div>");
        var div2 = $("<div class='pingBg'><span></spn></div>");
        div1.append(img, div2)
        var lHeight = $(".img-item").eq(0);
        var rHeight = $(".img-item").eq(1);
        if (lHeight.height() <= rHeight.height()) {
            if (sunxu) {
                lHeight.append(div1)
            } else {
                lHeight.prepend(div1)
            }
        } else {
            if (sunxu) {
                rHeight.append(div1)
            } else {
                rHeight.prepend(div1)
            }
        }
    }
}


function gongGeDom() {
    var li1 = $("<li class='img-item' style='width:100%;'></li>")
    $(".images-ul").empty().append(li1)
}

function gongGe(sunxu, num) {
    for (let i = 0; i < items.length; i++) {
        var img = $("<img id='" + items[i].id + "' src='" + items[i].src + "'style='height:100%;object-fit:cover;'>")
        var div1;
        var div2 = $("<div class='pingBg'><span></spn></div>");
        if (num === 3) {
            status = 3;
            div1 = $("<div style='height:33.33vw;max-height:160px;width:33.33%;float:left'></div>");
        } else {
            status = 1;
            div1 = $("<div style='height:195px;width:100%;'></div>");
        }
        div1.append(img, div2)
        var lHeight = $(".img-item").eq(0);
        if (sunxu) {
            lHeight.append(div1)
        } else {
            lHeight.prepend(div1)
        }
    }
}


$(".gongge").click(function () {
    gongGeDom()
    gongGe(true, 3);
    layoutList.hide()
})
$(".juzheng").click(function () {
    juzhengDom()
    juzheng(true);
    layoutList.hide()

})
$(".pingjie").click(function () {
    gongGeDom()
    gongGe(true);
    layoutList.hide()

})
$(".shijianzou").click(function () {
    layoutList.hide()
})



var sort = $(".sort");
sort.click(function () {
    // console.log(1)
    if (sortState) {
        juzhengDom()
        juzheng(true);
        sortState = !sortState;
    } else {
        juzhengDom()
        juzheng(false);
        sortState = !sortState;
    }
})
var carousel = $(".carousel");
var fixAlbum = $(".fix-album");
var messageFont = $(".message span").eq(0);
var messageSize = $(".message span").eq(1);
var zan = $(".zan");
var swiperBtn = $(".top-close");
var layout = $(".layout");
var albumHint = $(".album-hint");
var fixBg = $(".fix-bg");
var fixQr = $(".fix-qr");
var titleRight = $(".title-right");
var fixDetails = $(".fix-details");
var detailsClose = $(".fix-details .close");
var ping = $(".ping")
var pingPingjie = $(".ping-pingjie")
var pingGongge = $(".ping-gongge")
var pingDongtu = $(".ping-dongtu")
var pingFooter = $(".ping-footer")
var footerClose = $(".footer-close")
var box = $(".box")

$(".qr").click(function () {
    fixQr.fadeIn();
    fixBg.fadeIn()
})
carousel.click(function () {
    mySwiper.autoplay = true;
    createSwiper();
})
fixBg.click(function (e) {
    fixQr.fadeOut();
    fixBg.hide();
    ping.hide();
    fixDetails.slideUp();
})
swiperBtn.click(function () {
    fixAlbum.hide()
})
layout.click(function () {
    layoutList.show();
})
titleRight.click(function () {
    fixBg.show();
    fixDetails.slideDown();
})
detailsClose.click(function () {
    fixDetails.slideUp();
    fixBg.fadeOut();
})





pingPingjie.click(function () {
    box.hide();
    pingBg.show();
    ping.hide();
    fixBg.hide();
    pingFooter.show();
})
pingGongge.click(function () {
    ping.hide();
    fixBg.hide();
    pingFooter.show();
})
pingDongtu.click(function () {
    ping.hide();
    fixBg.hide();
    pingFooter.show();
})
footerClose.click(function () {
    pingFooter.hide();
    pingBg.hide();
    box.show();
    pingBg.attr("id", "true")
    pingBg.each(function (index, item) {
        item.children[0].style = "background-position:-279px -239px;"
    })
    $(".tolive span").eq(0).text(0)
    $(".tolive").css({
        background: "#ededed",
        color: "#747474"
    })
})

$(".images-ul").on("click", ".pingBg", function (e) {
    if (!this.id || this.id == "true") {
        $(".tolive span").eq(0).text(parseInt($(".tolive span").eq(0).text()) + 1);
        this.children[0].style = "background-position:-245px -239px"
        this.id = false;
    } else {
        $(".tolive span").eq(0).text(parseInt($(".tolive span").eq(0).text()) - 1);
        this.children[0].style = "background-position:-279px -239px;"
        this.id = true;
    }
    if(parseInt($(".tolive span").eq(0).text())>0){
        $(".tolive").css({
            background: "#0084FF",
            color: "#fff"
        })
    }else{
        $(".tolive").css({
            background: "#ededed",
            color: "#747474"
        })
    }

})
$(".tolive").click(function(){
    
})





//提示框
function hint(text) {
    albumHint.text(text)
    albumHint.fadeIn()
    setTimeout(function () {
        albumHint.fadeOut();
    }, 2000)
}

//轮播实例   -Swiper
var mySwiper = new Swiper('.swiper-container', {
    init: false,
    passiveListeners: false,
    virtual: {
        slides: [],
        renderSlide: function (slide, index) {
            return '<div class="swiper-slide"><div class="swiper-zoom-container">' + '<img src="' + slide + '">' + '</div></div>';
        },
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                '/' +
                '<span class="' + totalClass + '"></span>';
        },
    },
    on: {
        slideChangeTransitionStart: function () {
            messageFont.text("已是原图")
            messageSize.text("33kb")
            zan.text(33)
            if (mySwiper.isBeginning) {
                hint("已经滑动到第一张");
            } else if (mySwiper.isEnd) {
                hint("已经滑动到最后一张");
            }
        },
    },
    // autoHeight: true,           //高度随内容变化
    spaceBetween: 20,
    zoom: true, //调焦
    // autoplay:true,
})

//初始化轮播
$(".images-ul").on("click", "img", createSwiper)

function createSwiper() {
    var i = this.id || 1;
    fixAlbum.show();

    mySwiper.virtual.cache = []; //清除cache内的虚拟slide
    mySwiper.virtual.slides = itemsSrc; //设置新的虚拟Slide数组,重新渲染后，新的Slide即可替换掉旧的Slide
    mySwiper.init();
    mySwiper.slideTo(i - 1, 0, false);

    zan.text(22)
    messageFont.text("查看原图")
    messageSize.text("22kb")
}




$(".puzzle").click(function () {
    ping.show();
    fixBg.show();
})
$(".tolive").click(function(){
    $(".fix-jigsaw").show();
})
$(".jigsaw-footer div").eq(0).click(function(){
    $(".jigsaw-fix-title").show();
    $("textarea").val($(".info-title").text())
})
$(".title-btn").click(function(){
    $(".info-title").text($("textarea").val())
    if($(".title-val input:checked")){
        // $(".info-time").hide();
    }
    $(".jigsaw-fix-title").hide();
})

$(".jigsaw-footer div").eq(1).click(function(){
    $(".jigsaw-fix-padding").show();
})
$(".jigsaw-footer div").eq(2).click(function(){
    $(".jigsaw-fix-bg").show();
})