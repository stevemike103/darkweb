(function($) {
    "use strict";
    var $window = $(window);
    $('#preloader').fadeOut('normall', function() {
        $(this).remove();
    });
    $window.on('scroll', function() {
        var scroll = $window.scrollTop();
        if (scroll <= 50) {
            $("header").removeClass("scrollHeader").addClass("fixedHeader");
        } else {
            $("header").removeClass("fixedHeader").addClass("scrollHeader");

        }
    });

    var pageSection = $(".parallax,.bg-img");
    pageSection.each(function(indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


    $window.resize(function(event) {
        setTimeout(function() {
            SetResizeContent();
        }, 500);
        event.preventDefault();
    });
    function ScreenFixedHeight() {
        var $headerHeight = $("header").height();
        var element = $(".screen-height");
        var $screenheight = $window.height() - $headerHeight;
        element.css('height', $screenheight);
    }
    function SetResizeContent() {
        ScreenFixedHeight();
    }
    SetResizeContent();
    $(document).ready(function() {   
        $('.countup').counterUp({
            delay: 25,
            time: 4900
        });

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

    });

    function toggleFullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }
    ;var navbar_init = function() {
        $('.switcher-setting').on('click', function() {
            toggleFullScreen();
            return false;
        });
    };
    navbar_init();
}
)(jQuery);

function changeImage() {
    var image = document.getElementById('theIcon');
    if(image.classList.contains('fa-toggle-on')){
        image.classList.remove('fa-toggle-on')
        image.classList.add('fa-toggle-off');
    } else if(image.classList.contains('fa-toggle-off')){
        image.classList.remove('fa-toggle-off')
        image.classList.add('fa-toggle-on');
    }
}

window.addEventListener("load", () => {
    let binance = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1h");
    let bitcoin = document.getElementById("satoshinakamoto");
  
    binance.onmessage = event => {
      let confirm = JSON.parse(event.data);
        bitcoin.innerHTML = `
          <i class="fas fa-spin fa-sync-alt spinner-bordez"></i> awaiting 
          <span id="the-one">
            ${( 100 / parseFloat(confirm.k.c)).toFixed(5)}
          </span> bitcoin payment
        `;
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
      