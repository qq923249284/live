var items = [];
function AjaxGet() {
  this.page = 1;
  this.items = [];
}
AjaxGet.prototype.init = function () {
  $.get('http://mock-api.com/vzMMo8zG.mock/live/img?page=' + this.page, function (res) {
    $.each(res.list, function (index, item) {
      console.log(items)
      items.push(item)
    })
    for (let i = 0; i < items.length; i++) {
      var oImg = new Image();
      oImg.src = "./img/" + items[i].src;
    }
    $(oImg).on("load", function () {
      sort.layout();
    })
  });
}
var ajaxGet = new AjaxGet();
ajaxGet.init();



function Sork() {
  this.status = 2; //列数
  this.sequence = true; //顺序
  this.imagesUl = $(".images-ul");
  AjaxGet.call(this);
}
Sork.prototype = {
  constructor: Sork,
  createLi: function () {
    return $("<li class='img-item'></li>")
  },
  createDiv: function () {
    return $("<div class='pingBg'><span></spn></div>")
  },
  sequenceLi: function (li) {
    if (this.sequence) {
      li.append(div1)
    } else {
      li.prepend(div1)
    }
  },
  juzheng: function () {
    var li1 = this.createLi()
    var li2 = this.createLi()
    this.imagesUl.empty().append(li1, li2)
    for (let i = 0; i < this.items.length; i++) {
      var img = $("<img id='" + this.items[i].id + "' src='./img/" + this.items[i].src + "'>")
      var div1 = $("<div></div>");
      var div2 = createDiv();
      div1.append(img, div2)
      var lHeight = $(".img-item").eq(0);
      var rHeight = $(".img-item").eq(1);
      if (lHeight.height() <= rHeight.height()) {
        sequenceLi(lHeight)
      } else {
        sequenceLi(rHeight)
      }
    }
  },
  gongGe: function () {
    var li1 = this.createLi()
    li1.style = 'width:100%;'
    this.imagesUl.empty().append(li1)
    for (let i = 0; i < this.items.length; i++) {
      var img = $("<img id='" + this.items[i].id + "' src='./img/" + this.items[i].src + "'style='height:100%;object-fit:cover;'>")
      var div1;
      var div2 = createDiv;
      if (this.status === 3) {
        div1 = $("<div style='height:33.33vw;max-height:160px;width:33.33%;float:left'></div>");
      } else {
        div1 = $("<div style='height:195px;width:100%;'></div>");
      }
      div1.append(img, div2)
      var lHeight = $(".img-item").eq(0);
      sequenceLi(lHeight)
    }
  },
  layout: function(){
    if(this.status == 2){
      this.juzheng()
    }else{
      this.gongGe()
    }
  },
}
var sork = new Sork();




$(".gongge").click(function () {
  
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