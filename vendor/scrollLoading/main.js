(function(a) {
  a(".main-body-content img").each(function() {
    a(this).attr("data-url", a(this).attr("src"));
    a(this).removeAttr("src");
    a(this).addClass("scrollLoading");
    a(this).wrap('<div class="scrollLoading-wrap"></div>')
  });
  var t, i = setInterval(function() {
    if (t <= 0) clearInterval(i);
    r()
  }, 500);
  var r = function() {
    a(".scrollLoading").each(function(t, i) {
      if (a(this).height() > 0 && a(this).parents(".scrollLoading-wrap").length) {
        if (a(this).parent().hasClass("scrollLoading-wrap")) a(this).unwrap();
        else a(this).parent().unwrap()
      }
    });
    t = a(".scrollLoading-wrap").length
  };
  a(".scrollLoading").scrollLoading()
})(jQuery);