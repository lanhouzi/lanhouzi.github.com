(function(t) {
  var s = t.fancybox;
  s.helpers.buttons = {
    defaults: {
      skipSingle: false,
      position: "top",
      tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
    },
    list: null,
    buttons: null,
    beforeLoad: function(t, s) {
      if (t.skipSingle && s.group.length < 2) {
        s.helpers.buttons = false;
        s.closeBtn = true;
        return
      }
      s.margin[t.position === "bottom" ? 2 : 0] += 30
    },
    onPlayStart: function() {
      if (this.buttons) {
        this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn")
      }
    },
    onPlayEnd: function() {
      if (this.buttons) {
        this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn")
      }
    },
    afterShow: function(l, i) {
      var e = this.buttons;
      if (!e) {
        this.list = t(l.tpl).addClass(l.position).appendTo("body");
        e = {
          prev: this.list.find(".btnPrev").click(s.prev),
          next: this.list.find(".btnNext").click(s.next),
          play: this.list.find(".btnPlay").click(s.play),
          toggle: this.list.find(".btnToggle").click(s.toggle),
          close: this.list.find(".btnClose").click(s.close)
        }
      }
      if (i.index > 0 || i.loop) {
        e.prev.removeClass("btnDisabled")
      } else {
        e.prev.addClass("btnDisabled")
      }
      if (i.loop || i.index < i.group.length - 1) {
        e.next.removeClass("btnDisabled");
        e.play.removeClass("btnDisabled")
      } else {
        e.next.addClass("btnDisabled");
        e.play.addClass("btnDisabled")
      }
      this.buttons = e;
      this.onUpdate(l, i)
    },
    onUpdate: function(t, s) {
      var l;
      if (!this.buttons) {
        return
      }
      l = this.buttons.toggle.removeClass("btnDisabled btnToggleOn");
      if (s.canShrink) {
        l.addClass("btnToggleOn")
      } else if (!s.canExpand) {
        l.addClass("btnDisabled")
      }
    },
    beforeClose: function() {
      if (this.list) {
        this.list.remove()
      }
      this.list = null;
      this.buttons = null
    }
  }
})(jQuery);