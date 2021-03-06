(function(i) {
  i("#back-to-top").on("click", function() {
    i("body, html").animate({
      scrollTop: 0
    }, 600)
  });
  i("#main-nav-toggle").on("click", function() {
    i(".nav-container-inner").slideToggle()
  });
  i(".article-entry").each(function(n) {
    i(this).find("img").each(function() {
      if (i(this).parent().hasClass("fancybox")) {
        return
      }
      var n = this.alt;
      if (n) {
        i(this).after('<span class="caption">' + n + "</span>")
      }
      i(this).wrap('<a href="' + this.src + '" title="' + n + '" class="fancybox"></a>')
    });
    i(this).find(".fancybox").each(function() {
      i(this).attr("rel", "article" + n)
    })
  });
  if (i.fancybox) {
    i(".fancybox").fancybox()
  }
  i("#sidebar .sidebar-toggle").click(function() {
    if (i("#sidebar").hasClass("expend")) {
      i("#sidebar").removeClass("expend")
    } else {
      i("#sidebar").addClass("expend")
    }
  });
  i(".main-nav-list > li").unwrap();
  i("#main-nav > li > .main-nav-list-link").each(function() {
    if (i(".page-title-link").length > 0) {
      if (i(this).html().toUpperCase() == i(".page-title-link").html().toUpperCase()) {
        i(this).addClass("current")
      } else if (i(this).attr("href") == i(".page-title-link").attr("data-url")) {
        i(this).addClass("current")
      }
    }
  });

  function n() {
    var n = i(".nav-container-inner").width() - 10;
    var a = i("#main-nav").width();
    var t = i("#sub-nav").width();
    if (a + t > n) {
      if (i(".main-nav-more").length == 0) {
        i(['<li class="main-nav-list-item top-level-menu main-nav-more">', '<a class="main-nav-list-link" href="javascript:;">More</a>', '<ul class="main-nav-list-child">', "</ul></li>"].join("")).appendTo(i("#main-nav"));
        i(".main-nav-more").hover(function() {
          if (i(window).width() < 480) {
            return
          }
          i(this).children(".main-nav-list-child").slideDown("fast")
        }, function() {
          if (i(window).width() < 480) {
            return
          }
          i(this).children(".main-nav-list-child").slideUp("fast")
        })
      }
      var e = i("#main-nav").children().length;
      for (var l = e - 2; l >= 0; l--) {
        var s = i("#main-nav").children().eq(l);
        if (a + t > n) {
          s.prependTo(i(".main-nav-more > ul"));
          a = i("#main-nav").width()
        } else {
          return
        }
      }
    }
    if (i(".main-nav-more").length > 0) {
      i(".main-nav-more > ul").children().appendTo(i("#main-nav"));
      i(".main-nav-more").remove()
    }
  }
  n();
  i(window).resize(function() {
    n()
  });
  i(".main-nav-list-item").hover(function() {
    if (i(window).width() < 480) {
      return
    }
    i(this).children(".main-nav-list-child").slideDown("fast")
  }, function() {
    if (i(window).width() < 480) {
      return
    }
    i(this).children(".main-nav-list-child").slideUp("fast")
  });
  i(".main-nav-list-item").each(function() {
    if (i(this).find(".main-nav-list-child").length > 0) {
      i(this).addClass("top-level-menu")
    }
  })
})(jQuery);