$designStrip = false;
if (typeof HEADER_GRAY == 'undefined') HEADER_GRAY = false;

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top < $(window).height() &&
        rect.bottom > 0
    );
}

jQuery(function($) {
  FastClick.attach(document.body);
  $('.selectpicker').selectpicker();

  // handle going from mobile to desktop resize
  $(window).on('resize', function(e) {
    // currently only matters for homepage:
    if ($('#landing').length) {
        if ($(window).width() > 991) {
          $('.header').addClass('whiten');
        } else {
          $('.pop-in').hide();
          $('.male-female .female').css({left: 1});
          $('.male-female .male').css({right: 1});
        }
    }
  });

  if ($(window).width() <= 767) {
    $('.use-case-icon').on('click', function(e){
      e.preventDefault();
      $('.use-case-icon').removeClass('active');
      $(this).addClass('active');
    })
  }


  // Parallax
  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();

    $('.parallax').each(function() {
      if ($(this).hasClass('homepage-slide') && !$(this).is(':visible')) {
        // ignore non-visible slides -- they'll be bumped later
        return;
      }

      if ($(window).width() > 991 && isElementInViewport($(this))) {
        var xpos = $(this).hasClass('home-parallax') ? '175px ' : '50% '
            , speed = $(this).data('speed') ? $(this).data('speed') : 0.01
            , top = $(this).data('top') ? $(this).data('top') : $(this).offset().top;
        if (scrollTop < 0) return false;
        var diff = scrollTop - top,
          yPos;

        diff = $(this).offset().top - scrollTop;
        movement = speed * diff;
        yPos = (-1 * $(this).data('top')) + movement;

        // Put together our final background position
        var coords = xpos + parseInt(yPos) + 'px';


        // Move the background
        if ($(this).hasClass('homepage-slide') && $(this).hasClass('active')) {
          $('.homepage-slide.parallax').css({
            backgroundPosition: coords
          });
        } else {
          $(this).css({
            backgroundPosition: coords
          });
        }
      } else {
        $(this).css({
          // make sure this matches up to the CSS!
          backgroundPosition: '50% 0px'
        });
      }
    });

    if ($('.male-female').length && $(window).width() > 991) {
      var top = $('.male-female').offset().top - 650
        , scrollTop = $(window).scrollTop();
      var diff = scrollTop - top;

      if (diff > 0) {
        // $('.male-female img').show()
        var xPos = (Math.sqrt(diff)*16 - 350);
        // don't allow anything less than -350
        var dx = Math.max( xPos, -350);
        // ... or more than 1
        var shift = Math.round(Math.min(dx, 1));
        $('.male-female .female').css({left: shift});
        $('.male-female .male').css({right: shift});
      } else {
        shift = -350;
        $('.male-female .female').css({left: shift});
        $('.male-female .male').css({right: shift});
        // $('.male-female img').hide()
      }
    }
  });
  // <----- END window scroll

  // set up initial parallax stuff on page load
  $(window).trigger('scroll');


  // ----- Modernizr ------
  if (!Modernizr.svg) {
    $('img.svg').each(function(){
      $(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
    });
  }

  // ------- landing page ------
  if ($('#landing').length) {
    $('#homepage-slides-carousel').carousel({
      interval: 6000,
      pause: '',
      wrap: true
    });
  } else {
    $('.header').addClass('whiten');
  }

  if (HEADER_GRAY) {
   $('.header').addClass('gray');
  }

  // -- subnav + support pages
  if ($('#support-subnav').length) {
    $('#support-subnav').waypoint('sticky', {
      stuckClass: 'fixed',
      offset: 78,
    });
  }

  // make the whole "buy now" button group activate the same hover
  $('.buy-now.btn-group').hover(
    function(e) {
      // hover in
      $(this).find('.btn').addClass('hover')
    },
    function(e) {
      // hover out
      $(this).find('.btn').removeClass('hover')
    }
  )

  $("a.mini-nav").click(function(){
    $("ul.nav2").slideToggle("fast", function() {
      if ($(this).css('display') == 'none')
        $(this).css('display', '');
    });
    return false;
  });

  // ------ Owl Carousel ----
  $(".owl-carousel.three-across").owlCarousel({
    items: 3,
    itemsDesktop: false,
    itemsCustom:    [[0, 1], [767, 2], [1200, 3]]
  });
  $(".owl-carousel.three-across-partners").owlCarousel({
    items: 3,
    itemsDesktop: false,
    autoPlay: 4800,
    slideSpeed: 500,
    itemsCustom:    [[0, 1], [480, 2], [650, 3], [1200, 3]]
  });
  $("#holiday-carousel .owl-carousel").owlCarousel({
    items: 6,
    itemsDesktop: false,
    autoPlay: 4800,
    slideSpeed: 500,
    itemsCustom:    [[0, 3], [480, 3], [840, 4], [1200, 6]]
  });

  $(".press-clips .owl-carousel").owlCarousel({
    items:          1,
    itemsCustom:    [[0, 1]],
    pagination:     false,
    navigation:     true,
    autoPlay:       5000,
    slideSpeed:     550,
    navigationText: [
      "<div class='left-arrow'></div>",
      "<div class='right-arrow'></div>"
      ]
  });

  // http://lazcreative.com/blog/adding-swipe-support-to-bootstrap-carousel-3-0/
  //Enable swiping...
  $(".carousel-inner").swipe( {
    //Generic swipe handler for all directions
    swipeLeft:function(event, direction, distance, duration, fingerCount) {
      $(this).parent().carousel('prev');
    },
    swipeRight: function() {
      $(this).parent().carousel('next');
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold:0
  });
})

// // https://github.com/chrissrogers/jquery-deparam
// // An extraction of the deparam method from Ben Alman's jQuery BBQ
// (function(h){h.deparam=function(i,j){var d={},k={"true":!0,"false":!1,"null":null};h.each(i.replace(/\+/g," ").split("&"),function(i,l){var m;var a=l.split("="),c=decodeURIComponent(a[0]),g=d,f=0,b=c.split("]["),e=b.length-1;/\[/.test(b[0])&&/\]$/.test(b[e])?(b[e]=b[e].replace(/\]$/,""),b=b.shift().split("[").concat(b),e=b.length-1):e=0;if(2===a.length)if(a=decodeURIComponent(a[1]),j&&(a=a&&!isNaN(a)?+a:"undefined"===a?void 0:void 0!==k[a]?k[a]:a),e)for(;f<=e;f++)c=""===b[f]?g.length:b[f],m=g[c]=
// f<e?g[c]||(b[f+1]&&isNaN(b[f+1])?{}:[]):a,g=m;else h.isArray(d[c])?d[c].push(a):d[c]=void 0!==d[c]?[d[c],a]:a;else c&&(d[c]=j?void 0:"")});return d}})(jQuery);
