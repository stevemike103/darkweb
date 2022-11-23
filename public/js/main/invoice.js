function changeImage() {
    var e = document.getElementById("theIcon");
    e.classList.contains("fa-toggle-on") ? (e.classList.remove("fa-toggle-on"), e.classList.add("fa-toggle-off")) : e.classList.contains("fa-toggle-off") && (e.classList.remove("fa-toggle-off"), e.classList.add("fa-toggle-on"));
}
!(function (e) {
    "use strict";
    var n = e(window);
    function t() {
        var t, l, c;
        (t = e("header").height()), (l = e(".screen-height")), (c = n.height() - t), l.css("height", c);
    }
    e("#preloader").fadeOut("normall", function () {
        e(this).remove();
    }),
        n.on("scroll", function () {
            n.scrollTop() <= 50 ? e("header").removeClass("scrollHeader").addClass("fixedHeader") : e("header").removeClass("fixedHeader").addClass("scrollHeader");
        }),
        e(".parallax,.bg-img").each(function (n) {
            e(this).attr("data-background") && e(this).css("background-image", "url(" + e(this).data("background") + ")");
        }),
        n.resize(function (e) {
            setTimeout(function () {
                t();
            }, 500),
                e.preventDefault();
        }),
        t(),
        e(document).ready(function () {
            e('#example1').dataTable();    
            e(".countup").counterUp({ delay: 25, time: 7000 });
            
            $('.xzoom5, .xzoom-gallery5').xzoom({tint: '#232323', Xoffset: 15});

            //Integration with hammer.js
            var isTouchSupported = 'ontouchstart' in window;

            if (isTouchSupported) {
                //If touch device
                $('.xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5').each(function(){
                    var xzoom = $(this).data('xzoom');
                    xzoom.eventunbind();
                });
            } else {
                $('#span-test').bind('click', function(event) {
                    var xzoom = $(this).data('xzoom');
                    xzoom.closezoom();
                    var gallery = xzoom.gallery().cgallery;
                    var i, images = new Array();
                    for (i in gallery) {
                        images[i] = {src: gallery[i]};
                    }
                    $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
                    event.preventDefault();
                });
            }

            $('#clients').owlCarousel({
                loop: true,
                nav: false,
                dots: false,
                smartSpeed: 500,
                autoplay: true,
                autoplayTimeout: 2000,
                responsiveClass: true,
                autoplayHoverPause: false,
                responsive: {
                    0: {items: 6, margin: 8}, 
                    768: {items: 9, margin: 15}, 
                    992: {items: 12, margin: 23}, 
                    1200: {items: 17, margin: 16}
                }
            });
        });
    e(".switcher-setting").on("click", function () {
        return (
            document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
                ? document.exitFullscreen
                    ? document.exitFullscreen()
                    : document.msExitFullscreen
                    ? document.msExitFullscreen()
                    : document.mozCancelFullScreen
                    ? document.mozCancelFullScreen()
                    : document.webkitExitFullscreen && document.webkitExitFullscreen()
                : document.documentElement.requestFullscreen
                ? document.documentElement.requestFullscreen()
                : document.documentElement.msRequestFullscreen
                ? document.documentElement.msRequestFullscreen()
                : document.documentElement.mozRequestFullScreen
                ? document.documentElement.mozRequestFullScreen()
                : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT),
            !1
        );
    });
})(jQuery);



window.addEventListener("load", () => {
    let binance = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1h");
    let bitcoin = document.getElementById("satoshinakamoto");
  
    binance.onmessage = event => {
      let confirm = JSON.parse(event.data);
        if(localStorage.getItem('banklogs')){
          if(JSON.parse(localStorage.getItem('banklogs')).length == 1) {
            bitcoin.innerHTML = `
              <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> awaiting 
              <span id="the-one">
                ${(localStorage.getItem('banktotal') / parseFloat(confirm.k.c)).toFixed(5)}
              </span> bitcoin payment
            `;
          } else if(JSON.parse(localStorage.getItem('banklogs')).length > 1) {
              bitcoin.innerHTML = `
                <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> awaiting 

                <span id="the-two">
                  ${(localStorage.getItem('banktotal') / parseFloat(confirm.k.c)).toFixed(5)}
                </span> 

                <span id="the-one">
                  ${((localStorage.getItem('banktotal') / parseFloat(confirm.k.c) * 0.9 )).toFixed(5)}
                </span> 
                
                bitcoin payment
              `;
          }
        }
    }
    
    document.getElementById("copy-text").addEventListener("click", function (ev) {
      ev.preventDefault();
      document.getElementById("text-to-copy").select();
      var copiez;
      try {
        copiez = document.execCommand("copy");
      } catch (ex) {
        copiez = false;
      }
      ;
      if (copiez) {
        document.getElementById("copy-text").innerHTML = `Copied`;
        document.getElementById("copy-text").style.background = "gold";
      }
    });
    document.getElementById("text-to-copy").addEventListener("click", function (eve) {
      eve.preventDefault();
      document.getElementById("text-to-copy").select();
      var copied;
      try {
        copied = document.execCommand("copy");
      } catch (ex) {
        copied = false;
      }
      ;
      if (copied) {
        document.getElementById("copy-text").innerHTML = `Copied`;
        document.getElementById("copy-text").style.background = "gold";
      }
    });
  });
      