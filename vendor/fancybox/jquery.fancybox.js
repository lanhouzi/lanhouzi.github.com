(function(e, t, i, n) {
  "use strict";
  var o = i("html"),
    a = i(e),
    r = i(t),
    s = i.fancybox = function() {
      s.open.apply(this, arguments)
    },
    l = navigator.userAgent.match(/msie/i),
    f = null,
    c = t.createTouch !== n,
    d = function(e) {
      return e && e.hasOwnProperty && e instanceof i
    },
    p = function(e) {
      return e && i.type(e) === "string"
    },
    u = function(e) {
      return p(e) && e.indexOf("%") > 0
    },
    h = function(e) {
      return e && !(e.style.overflow && e.style.overflow === "hidden") && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight)
    },
    g = function(e, t) {
      var i = parseInt(e, 10) || 0;
      if (t && u(e)) {
        i = s.getViewport()[t] / 100 * i
      }
      return Math.ceil(i)
    },
    m = function(e, t) {
      return g(e, t) + "px"
    };
  i.extend(s, {
    version: "2.1.5",
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      autoSize: true,
      autoHeight: false,
      autoWidth: false,
      autoResize: true,
      autoCenter: !c,
      fitToView: true,
      aspectRatio: false,
      topRatio: .5,
      leftRatio: .5,
      scrolling: "auto",
      wrapCSS: "",
      arrows: true,
      closeBtn: true,
      closeClick: false,
      nextClick: false,
      mouseWheel: true,
      autoPlay: false,
      playSpeed: 3e3,
      preload: 3,
      modal: false,
      loop: true,
      ajax: {
        dataType: "html",
        headers: {
          "X-fancyBox": true
        }
      },
      iframe: {
        scrolling: "auto",
        preload: true
      },
      swf: {
        wmode: "transparent",
        allowfullscreen: "true",
        allowscriptaccess: "always"
      },
      keys: {
        next: {
          13: "left",
          34: "up",
          39: "left",
          40: "up"
        },
        prev: {
          8: "right",
          33: "down",
          37: "right",
          38: "down"
        },
        close: [27],
        play: [32],
        toggle: [70]
      },
      direction: {
        next: "left",
        prev: "right"
      },
      scrollOutside: true,
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
      },
      openEffect: "fade",
      openSpeed: 250,
      openEasing: "swing",
      openOpacity: true,
      openMethod: "zoomIn",
      closeEffect: "fade",
      closeSpeed: 250,
      closeEasing: "swing",
      closeOpacity: true,
      closeMethod: "zoomOut",
      nextEffect: "elastic",
      nextSpeed: 250,
      nextEasing: "swing",
      nextMethod: "changeIn",
      prevEffect: "elastic",
      prevSpeed: 250,
      prevEasing: "swing",
      prevMethod: "changeOut",
      helpers: {
        overlay: true,
        title: true
      },
      onCancel: i.noop,
      beforeLoad: i.noop,
      afterLoad: i.noop,
      beforeShow: i.noop,
      afterShow: i.noop,
      beforeChange: i.noop,
      beforeClose: i.noop,
      afterClose: i.noop
    },
    group: {},
    opts: {},
    previous: null,
    coming: null,
    current: null,
    isActive: false,
    isOpen: false,
    isOpened: false,
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: {
      timer: null,
      isActive: false
    },
    ajaxLoad: null,
    imgPreload: null,
    transitions: {},
    helpers: {},
    open: function(e, t) {
      if (!e) {
        return
      }
      if (!i.isPlainObject(t)) {
        t = {}
      }
      if (false === s.close(true)) {
        return
      }
      if (!i.isArray(e)) {
        e = d(e) ? i(e).get() : [e]
      }
      i.each(e, function(o, a) {
        var r = {},
          l, f, c, u, h, g, m;
        if (i.type(a) === "object") {
          if (a.nodeType) {
            a = i(a)
          }
          if (d(a)) {
            r = {
              href: a.data("fancybox-href") || a.attr("href"),
              title: i("<div/>").text(a.data("fancybox-title") || a.attr("title")).html(),
              isDom: true,
              element: a
            };
            if (i.metadata) {
              i.extend(true, r, a.metadata())
            }
          } else {
            r = a
          }
        }
        l = t.href || r.href || (p(a) ? a : null) || a.find("img").data("url");
        f = t.title !== n ? t.title : r.title || "";
        c = t.content || r.content;
        u = c ? "html" : t.type || r.type;
        if (!u && r.isDom) {
          u = a.data("fancybox-type");
          if (!u) {
            h = a.prop("class").match(/fancybox\.(\w+)/);
            u = h ? h[1] : null
          }
        }
        if (p(l)) {
          if (!u) {
            if (s.isImage(l)) {
              u = "image"
            } else if (s.isSWF(l)) {
              u = "swf"
            } else if (l.charAt(0) === "#") {
              u = "inline"
            } else if (p(a)) {
              u = "html";
              c = a
            }
          }
          if (u === "ajax") {
            g = l.split(/\s+/, 2);
            l = g.shift();
            m = g.shift()
          }
        }
        if (!c) {
          if (u === "inline") {
            if (l) {
              c = i(p(l) ? l.replace(/.*(?=#[^\s]+$)/, "") : l)
            } else if (r.isDom) {
              c = a
            }
          } else if (u === "html") {
            c = l
          } else if (!u && !l && r.isDom) {
            u = "inline";
            c = a
          }
        }
        i.extend(r, {
          href: l,
          type: u,
          content: c,
          title: f,
          selector: m
        });
        e[o] = r
      });
      s.opts = i.extend(true, {}, s.defaults, t);
      if (t.keys !== n) {
        s.opts.keys = t.keys ? i.extend({}, s.defaults.keys, t.keys) : false
      }
      s.group = e;
      return s._start(s.opts.index)
    },
    cancel: function() {
      var e = s.coming;
      if (e && false === s.trigger("onCancel")) {
        return
      }
      s.hideLoading();
      if (!e) {
        return
      }
      if (s.ajaxLoad) {
        s.ajaxLoad.abort()
      }
      s.ajaxLoad = null;
      if (s.imgPreload) {
        s.imgPreload.onload = s.imgPreload.onerror = null
      }
      if (e.wrap) {
        e.wrap.stop(true, true).trigger("onReset").remove()
      }
      s.coming = null;
      if (!s.current) {
        s._afterZoomOut(e)
      }
    },
    close: function(e) {
      s.cancel();
      if (false === s.trigger("beforeClose")) {
        return
      }
      s.unbindEvents();
      if (!s.isActive) {
        return
      }
      if (!s.isOpen || e === true) {
        i(".fancybox-wrap").stop(true).trigger("onReset").remove();
        s._afterZoomOut()
      } else {
        s.isOpen = s.isOpened = false;
        s.isClosing = true;
        i(".fancybox-item, .fancybox-nav").remove();
        s.wrap.stop(true, true).removeClass("fancybox-opened");
        s.transitions[s.current.closeMethod]()
      }
    },
    play: function(e) {
      var t = function() {
          clearTimeout(s.player.timer)
        },
        i = function() {
          t();
          if (s.current && s.player.isActive) {
            s.player.timer = setTimeout(s.next, s.current.playSpeed)
          }
        },
        n = function() {
          t();
          r.unbind(".player");
          s.player.isActive = false;
          s.trigger("onPlayEnd")
        },
        o = function() {
          if (s.current && (s.current.loop || s.current.index < s.group.length - 1)) {
            s.player.isActive = true;
            r.bind({
              "onCancel.player beforeClose.player": n,
              "onUpdate.player": i,
              "beforeLoad.player": t
            });
            i();
            s.trigger("onPlayStart")
          }
        };
      if (e === true || !s.player.isActive && e !== false) {
        o()
      } else {
        n()
      }
    },
    next: function(e) {
      var t = s.current;
      if (t) {
        if (!p(e)) {
          e = t.direction.next
        }
        s.jumpto(t.index + 1, e, "next")
      }
    },
    prev: function(e) {
      var t = s.current;
      if (t) {
        if (!p(e)) {
          e = t.direction.prev
        }
        s.jumpto(t.index - 1, e, "prev")
      }
    },
    jumpto: function(e, t, i) {
      var o = s.current;
      if (!o) {
        return
      }
      e = g(e);
      s.direction = t || o.direction[e >= o.index ? "next" : "prev"];
      s.router = i || "jumpto";
      if (o.loop) {
        if (e < 0) {
          e = o.group.length + e % o.group.length
        }
        e = e % o.group.length
      }
      if (o.group[e] !== n) {
        s.cancel();
        s._start(e)
      }
    },
    reposition: function(e, t) {
      var n = s.current,
        o = n ? n.wrap : null,
        a;
      if (o) {
        a = s._getPosition(t);
        if (e && e.type === "scroll") {
          delete a.position;
          o.stop(true, true).animate(a, 200)
        } else {
          o.css(a);
          n.pos = i.extend({}, n.dim, a)
        }
      }
    },
    update: function(e) {
      var t = e && e.originalEvent && e.originalEvent.type,
        i = !t || t === "orientationchange";
      if (i) {
        clearTimeout(f);
        f = null
      }
      if (!s.isOpen || f) {
        return
      }
      f = setTimeout(function() {
        var n = s.current;
        if (!n || s.isClosing) {
          return
        }
        s.wrap.removeClass("fancybox-tmp");
        if (i || t === "load" || t === "resize" && n.autoResize) {
          s._setDimension()
        }
        if (!(t === "scroll" && n.canShrink)) {
          s.reposition(e)
        }
        s.trigger("onUpdate");
        f = null
      }, i && !c ? 0 : 300)
    },
    toggle: function(e) {
      if (s.isOpen) {
        s.current.fitToView = i.type(e) === "boolean" ? e : !s.current.fitToView;
        if (c) {
          s.wrap.removeAttr("style").addClass("fancybox-tmp");
          s.trigger("onUpdate")
        }
        s.update()
      }
    },
    hideLoading: function() {
      r.unbind(".loading");
      i("#fancybox-loading").remove()
    },
    showLoading: function() {
      var e, t;
      s.hideLoading();
      e = i('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body");
      r.bind("keydown.loading", function(e) {
        if ((e.which || e.keyCode) === 27) {
          e.preventDefault();
          s.cancel()
        }
      });
      if (!s.defaults.fixed) {
        t = s.getViewport();
        e.css({
          position: "absolute",
          top: t.h * .5 + t.y,
          left: t.w * .5 + t.x
        })
      }
      s.trigger("onLoading")
    },
    getViewport: function() {
      var t = s.current && s.current.locked || false,
        i = {
          x: a.scrollLeft(),
          y: a.scrollTop()
        };
      if (t && t.length) {
        i.w = t[0].clientWidth;
        i.h = t[0].clientHeight
      } else {
        i.w = c && e.innerWidth ? e.innerWidth : a.width();
        i.h = c && e.innerHeight ? e.innerHeight : a.height()
      }
      return i
    },
    unbindEvents: function() {
      if (s.wrap && d(s.wrap)) {
        s.wrap.unbind(".fb")
      }
      r.unbind(".fb");
      a.unbind(".fb")
    },
    bindEvents: function() {
      var e = s.current,
        t;
      if (!e) {
        return
      }
      a.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), s.update);
      t = e.keys;
      if (t) {
        r.bind("keydown.fb", function(o) {
          var a = o.which || o.keyCode,
            r = o.target || o.srcElement;
          if (a === 27 && s.coming) {
            return false
          }
          if (!o.ctrlKey && !o.altKey && !o.shiftKey && !o.metaKey && !(r && (r.type || i(r).is("[contenteditable]")))) {
            i.each(t, function(t, r) {
              if (e.group.length > 1 && r[a] !== n) {
                s[t](r[a]);
                o.preventDefault();
                return false
              }
              if (i.inArray(a, r) > -1) {
                s[t]();
                o.preventDefault();
                return false
              }
            })
          }
        })
      }
      if (i.fn.mousewheel && e.mouseWheel) {
        s.wrap.bind("mousewheel.fb", function(t, n, o, a) {
          var r = t.target || null,
            l = i(r),
            f = false;
          while (l.length) {
            if (f || l.is(".fancybox-skin") || l.is(".fancybox-wrap")) {
              break
            }
            f = h(l[0]);
            l = i(l).parent()
          }
          if (n !== 0 && !f) {
            if (s.group.length > 1 && !e.canShrink) {
              if (a > 0 || o > 0) {
                s.prev(a > 0 ? "down" : "left")
              } else if (a < 0 || o < 0) {
                s.next(a < 0 ? "up" : "right")
              }
              t.preventDefault()
            }
          }
        })
      }
    },
    trigger: function(e, t) {
      var n, o = t || s.coming || s.current;
      if (o) {
        if (i.isFunction(o[e])) {
          n = o[e].apply(o, Array.prototype.slice.call(arguments, 1))
        }
        if (n === false) {
          return false
        }
        if (o.helpers) {
          i.each(o.helpers, function(t, n) {
            if (n && s.helpers[t] && i.isFunction(s.helpers[t][e])) {
              s.helpers[t][e](i.extend(true, {}, s.helpers[t].defaults, n), o)
            }
          })
        }
      }
      r.trigger(e)
    },
    isImage: function(e) {
      return p(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
    },
    isSWF: function(e) {
      return p(e) && e.match(/\.(swf)((\?|#).*)?$/i)
    },
    _start: function(e) {
      var t = {},
        n, o, a, r, l;
      e = g(e);
      n = s.group[e] || null;
      if (!n) {
        return false
      }
      t = i.extend(true, {}, s.opts, n);
      r = t.margin;
      l = t.padding;
      if (i.type(r) === "number") {
        t.margin = [r, r, r, r]
      }
      if (i.type(l) === "number") {
        t.padding = [l, l, l, l]
      }
      if (t.modal) {
        i.extend(true, t, {
          closeBtn: false,
          closeClick: false,
          nextClick: false,
          arrows: false,
          mouseWheel: false,
          keys: null,
          helpers: {
            overlay: {
              closeClick: false
            }
          }
        })
      }
      if (t.autoSize) {
        t.autoWidth = t.autoHeight = true
      }
      if (t.width === "auto") {
        t.autoWidth = true
      }
      if (t.height === "auto") {
        t.autoHeight = true
      }
      t.group = s.group;
      t.index = e;
      s.coming = t;
      if (false === s.trigger("beforeLoad")) {
        s.coming = null;
        return
      }
      a = t.type;
      o = t.href;
      if (!a) {
        s.coming = null;
        if (s.current && s.router && s.router !== "jumpto") {
          s.current.index = e;
          return s[s.router](s.direction)
        }
        return false
      }
      s.isActive = true;
      if (a === "image" || a === "swf") {
        t.autoHeight = t.autoWidth = false;
        t.scrolling = "visible"
      }
      if (a === "image") {
        t.aspectRatio = true
      }
      if (a === "iframe" && c) {
        t.scrolling = "scroll"
      }
      t.wrap = i(t.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + a + " fancybox-tmp " + t.wrapCSS).appendTo(t.parent || "body");
      i.extend(t, {
        skin: i(".fancybox-skin", t.wrap),
        outer: i(".fancybox-outer", t.wrap),
        inner: i(".fancybox-inner", t.wrap)
      });
      i.each(["Top", "Right", "Bottom", "Left"], function(e, i) {
        t.skin.css("padding" + i, m(t.padding[e]))
      });
      s.trigger("onReady");
      if (a === "inline" || a === "html") {
        if (!t.content || !t.content.length) {
          return s._error("content")
        }
      } else if (!o) {
        return s._error("href")
      }
      if (a === "image") {
        s._loadImage()
      } else if (a === "ajax") {
        s._loadAjax()
      } else if (a === "iframe") {
        s._loadIframe()
      } else {
        s._afterLoad()
      }
    },
    _error: function(e) {
      i.extend(s.coming, {
        type: "html",
        autoWidth: true,
        autoHeight: true,
        minWidth: 0,
        minHeight: 0,
        scrolling: "no",
        hasError: e,
        content: s.coming.tpl.error
      });
      s._afterLoad()
    },
    _loadImage: function() {
      var e = s.imgPreload = new Image;
      e.onload = function() {
        this.onload = this.onerror = null;
        s.coming.width = this.width / s.opts.pixelRatio;
        s.coming.height = this.height / s.opts.pixelRatio;
        s._afterLoad()
      };
      e.onerror = function() {
        this.onload = this.onerror = null;
        s._error("image")
      };
      e.src = s.coming.href;
      if (e.complete !== true) {
        s.showLoading()
      }
    },
    _loadAjax: function() {
      var e = s.coming;
      s.showLoading();
      s.ajaxLoad = i.ajax(i.extend({}, e.ajax, {
        url: e.href,
        error: function(e, t) {
          if (s.coming && t !== "abort") {
            s._error("ajax", e)
          } else {
            s.hideLoading()
          }
        },
        success: function(t, i) {
          if (i === "success") {
            e.content = t;
            s._afterLoad()
          }
        }
      }))
    },
    _loadIframe: function() {
      var e = s.coming,
        t = i(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : e.iframe.scrolling).attr("src", e.href);
      i(e.wrap).bind("onReset", function() {
        try {
          i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
        } catch (e) {}
      });
      if (e.iframe.preload) {
        s.showLoading();
        t.one("load", function() {
          i(this).data("ready", 1);
          if (!c) {
            i(this).bind("load.fb", s.update)
          }
          i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
          s._afterLoad()
        })
      }
      e.content = t.appendTo(e.inner);
      if (!e.iframe.preload) {
        s._afterLoad()
      }
    },
    _preloadImages: function() {
      var e = s.group,
        t = s.current,
        i = e.length,
        n = t.preload ? Math.min(t.preload, i - 1) : 0,
        o, a;
      for (a = 1; a <= n; a += 1) {
        o = e[(t.index + a) % i];
        if (o.type === "image" && o.href) {
          (new Image).src = o.href
        }
      }
    },
    _afterLoad: function() {
      var e = s.coming,
        t = s.current,
        n = "fancybox-placeholder",
        o, a, r, l, f, c;
      s.hideLoading();
      if (!e || s.isActive === false) {
        return
      }
      if (false === s.trigger("afterLoad", e, t)) {
        e.wrap.stop(true).trigger("onReset").remove();
        s.coming = null;
        return
      }
      if (t) {
        s.trigger("beforeChange", t);
        t.wrap.stop(true).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()
      }
      s.unbindEvents();
      o = e;
      a = e.content;
      r = e.type;
      l = e.scrolling;
      i.extend(s, {
        wrap: o.wrap,
        skin: o.skin,
        outer: o.outer,
        inner: o.inner,
        current: o,
        previous: t
      });
      f = o.href;
      switch (r) {
        case "inline":
        case "ajax":
        case "html":
          if (o.selector) {
            a = i("<div>").html(a).find(o.selector)
          } else if (d(a)) {
            if (!a.data(n)) {
              a.data(n, i('<div class="' + n + '"></div>').insertAfter(a).hide())
            }
            a = a.show().detach();
            o.wrap.bind("onReset", function() {
              if (i(this).find(a).length) {
                a.hide().replaceAll(a.data(n)).data(n, false)
              }
            })
          }
          break;
        case "image":
          a = o.tpl.image.replace(/\{href\}/g, f);
          break;
        case "swf":
          a = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + f + '"></param>';
          c = "";
          i.each(o.swf, function(e, t) {
            a += '<param name="' + e + '" value="' + t + '"></param>';
            c += " " + e + '="' + t + '"'
          });
          a += '<embed src="' + f + '" type="application/x-shockwave-flash" width="100%" height="100%"' + c + "></embed></object>";
          break
      }
      if (!(d(a) && a.parent().is(o.inner))) {
        o.inner.append(a)
      }
      s.trigger("beforeShow");
      o.inner.css("overflow", l === "yes" ? "scroll" : l === "no" ? "hidden" : l);
      s._setDimension();
      s.reposition();
      s.isOpen = false;
      s.coming = null;
      s.bindEvents();
      if (!s.isOpened) {
        i(".fancybox-wrap").not(o.wrap).stop(true).trigger("onReset").remove()
      } else if (t.prevMethod) {
        s.transitions[t.prevMethod]()
      }
      s.transitions[s.isOpened ? o.nextMethod : o.openMethod]();
      s._preloadImages()
    },
    _setDimension: function() {
      var e = s.getViewport(),
        t = 0,
        n = false,
        o = false,
        a = s.wrap,
        r = s.skin,
        l = s.inner,
        f = s.current,
        c = f.width,
        d = f.height,
        p = f.minWidth,
        h = f.minHeight,
        y = f.maxWidth,
        x = f.maxHeight,
        v = f.scrolling,
        w = f.scrollOutside ? f.scrollbarWidth : 0,
        b = f.margin,
        k = g(b[1] + b[3]),
        C = g(b[0] + b[2]),
        O, W, _, S, T, E, L, H, P, R, j, M, A, I, D;
      a.add(r).add(l).width("auto").height("auto").removeClass("fancybox-tmp");
      O = g(r.outerWidth(true) - r.width());
      W = g(r.outerHeight(true) - r.height());
      _ = k + O;
      S = C + W;
      T = u(c) ? (e.w - _) * g(c) / 100 : c;
      E = u(d) ? (e.h - S) * g(d) / 100 : d;
      if (f.type === "iframe") {
        I = f.content;
        if (f.autoHeight && I.data("ready") === 1) {
          try {
            if (I[0].contentWindow.document.location) {
              l.width(T).height(9999);
              D = I.contents().find("body");
              if (w) {
                D.css("overflow-x", "hidden")
              }
              E = D.outerHeight(true)
            }
          } catch (V) {}
        }
      } else if (f.autoWidth || f.autoHeight) {
        l.addClass("fancybox-tmp");
        if (!f.autoWidth) {
          l.width(T)
        }
        if (!f.autoHeight) {
          l.height(E)
        }
        if (f.autoWidth) {
          T = l.width()
        }
        if (f.autoHeight) {
          E = l.height()
        }
        l.removeClass("fancybox-tmp")
      }
      c = g(T);
      d = g(E);
      P = T / E;
      p = g(u(p) ? g(p, "w") - _ : p);
      y = g(u(y) ? g(y, "w") - _ : y);
      h = g(u(h) ? g(h, "h") - S : h);
      x = g(u(x) ? g(x, "h") - S : x);
      L = y;
      H = x;
      if (f.fitToView) {
        y = Math.min(e.w - _, y);
        x = Math.min(e.h - S, x)
      }
      M = e.w - k;
      A = e.h - C;
      if (f.aspectRatio) {
        if (c > y) {
          c = y;
          d = g(c / P)
        }
        if (d > x) {
          d = x;
          c = g(d * P)
        }
        if (c < p) {
          c = p;
          d = g(c / P)
        }
        if (d < h) {
          d = h;
          c = g(d * P)
        }
      } else {
        c = Math.max(p, Math.min(c, y));
        if (f.autoHeight && f.type !== "iframe") {
          l.width(c);
          d = l.height()
        }
        d = Math.max(h, Math.min(d, x))
      }
      if (f.fitToView) {
        l.width(c).height(d);
        a.width(c + O);
        R = a.width();
        j = a.height();
        if (f.aspectRatio) {
          while ((R > M || j > A) && c > p && d > h) {
            if (t++ > 19) {
              break
            }
            d = Math.max(h, Math.min(x, d - 10));
            c = g(d * P);
            if (c < p) {
              c = p;
              d = g(c / P)
            }
            if (c > y) {
              c = y;
              d = g(c / P)
            }
            l.width(c).height(d);
            a.width(c + O);
            R = a.width();
            j = a.height()
          }
        } else {
          c = Math.max(p, Math.min(c, c - (R - M)));
          d = Math.max(h, Math.min(d, d - (j - A)))
        }
      }
      if (w && v === "auto" && d < E && c + O + w < M) {
        c += w
      }
      l.width(c).height(d);
      a.width(c + O);
      R = a.width();
      j = a.height();
      n = (R > M || j > A) && c > p && d > h;
      o = f.aspectRatio ? c < L && d < H && c < T && d < E : (c < L || d < H) && (c < T || d < E);
      i.extend(f, {
        dim: {
          width: m(R),
          height: m(j)
        },
        origWidth: T,
        origHeight: E,
        canShrink: n,
        canExpand: o,
        wPadding: O,
        hPadding: W,
        wrapSpace: j - r.outerHeight(true),
        skinSpace: r.height() - d
      });
      if (!I && f.autoHeight && d > h && d < x && !o) {
        l.height("auto")
      }
    },
    _getPosition: function(e) {
      var t = s.current,
        i = s.getViewport(),
        n = t.margin,
        o = s.wrap.width() + n[1] + n[3],
        a = s.wrap.height() + n[0] + n[2],
        r = {
          position: "absolute",
          top: n[0],
          left: n[3]
        };
      if (t.autoCenter && t.fixed && !e && a <= i.h && o <= i.w) {
        r.position = "fixed"
      } else if (!t.locked) {
        r.top += i.y;
        r.left += i.x
      }
      r.top = m(Math.max(r.top, r.top + (i.h - a) * t.topRatio));
      r.left = m(Math.max(r.left, r.left + (i.w - o) * t.leftRatio));
      return r
    },
    _afterZoomIn: function() {
      var e = s.current;
      if (!e) {
        return
      }
      s.isOpen = s.isOpened = true;
      s.wrap.css("overflow", "visible").addClass("fancybox-opened").hide().show(0);
      s.update();
      if (e.closeClick || e.nextClick && s.group.length > 1) {
        s.inner.css("cursor", "pointer").bind("click.fb", function(t) {
          if (!i(t.target).is("a") && !i(t.target).parent().is("a")) {
            t.preventDefault();
            s[e.closeClick ? "close" : "next"]()
          }
        })
      }
      if (e.closeBtn) {
        i(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function(e) {
          e.preventDefault();
          s.close()
        })
      }
      if (e.arrows && s.group.length > 1) {
        if (e.loop || e.index > 0) {
          i(e.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev)
        }
        if (e.loop || e.index < s.group.length - 1) {
          i(e.tpl.next).appendTo(s.outer).bind("click.fb", s.next)
        }
      }
      s.trigger("afterShow");
      if (!e.loop && e.index === e.group.length - 1) {
        s.play(false)
      } else if (s.opts.autoPlay && !s.player.isActive) {
        s.opts.autoPlay = false;
        s.play(true)
      }
    },
    _afterZoomOut: function(e) {
      e = e || s.current;
      i(".fancybox-wrap").trigger("onReset").remove();
      i.extend(s, {
        group: {},
        opts: {},
        router: false,
        current: null,
        isActive: false,
        isOpened: false,
        isOpen: false,
        isClosing: false,
        wrap: null,
        skin: null,
        outer: null,
        inner: null
      });
      s.trigger("afterClose", e)
    }
  });
  s.transitions = {
    getOrigPosition: function() {
      var e = s.current,
        t = e.element,
        i = e.orig,
        n = {},
        o = 50,
        a = 50,
        r = e.hPadding,
        l = e.wPadding,
        f = s.getViewport();
      if (!i && e.isDom && t.is(":visible")) {
        i = t.find("img:first");
        if (!i.length) {
          i = t
        }
      }
      if (d(i)) {
        n = i.offset();
        if (i.is("img")) {
          o = i.outerWidth();
          a = i.outerHeight()
        }
      } else {
        n.top = f.y + (f.h - a) * e.topRatio;
        n.left = f.x + (f.w - o) * e.leftRatio
      }
      if (s.wrap.css("position") === "fixed" || e.locked) {
        n.top -= f.y;
        n.left -= f.x
      }
      n = {
        top: m(n.top - r * e.topRatio),
        left: m(n.left - l * e.leftRatio),
        width: m(o + l),
        height: m(a + r)
      };
      return n
    },
    step: function(e, t) {
      var i, n, o, a = t.prop,
        r = s.current,
        l = r.wrapSpace,
        f = r.skinSpace;
      if (a === "width" || a === "height") {
        i = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start);
        if (s.isClosing) {
          i = 1 - i
        }
        n = a === "width" ? r.wPadding : r.hPadding;
        o = e - n;
        s.skin[a](g(a === "width" ? o : o - l * i));
        s.inner[a](g(a === "width" ? o : o - l * i - f * i))
      }
    },
    zoomIn: function() {
      var e = s.current,
        t = e.pos,
        n = e.openEffect,
        o = n === "elastic",
        a = i.extend({
          opacity: 1
        }, t);
      delete a.position;
      if (o) {
        t = this.getOrigPosition();
        if (e.openOpacity) {
          t.opacity = .1
        }
      } else if (n === "fade") {
        t.opacity = .1
      }
      s.wrap.css(t).animate(a, {
        duration: n === "none" ? 0 : e.openSpeed,
        easing: e.openEasing,
        step: o ? this.step : null,
        complete: s._afterZoomIn
      })
    },
    zoomOut: function() {
      var e = s.current,
        t = e.closeEffect,
        i = t === "elastic",
        n = {
          opacity: .1
        };
      if (i) {
        n = this.getOrigPosition();
        if (e.closeOpacity) {
          n.opacity = .1
        }
      }
      s.wrap.animate(n, {
        duration: t === "none" ? 0 : e.closeSpeed,
        easing: e.closeEasing,
        step: i ? this.step : null,
        complete: s._afterZoomOut
      })
    },
    changeIn: function() {
      var e = s.current,
        t = e.nextEffect,
        i = e.pos,
        n = {
          opacity: 1
        },
        o = s.direction,
        a = 200,
        r;
      i.opacity = .1;
      if (t === "elastic") {
        r = o === "down" || o === "up" ? "top" : "left";
        if (o === "down" || o === "right") {
          i[r] = m(g(i[r]) - a);
          n[r] = "+=" + a + "px"
        } else {
          i[r] = m(g(i[r]) + a);
          n[r] = "-=" + a + "px"
        }
      }
      if (t === "none") {
        s._afterZoomIn()
      } else {
        s.wrap.css(i).animate(n, {
          duration: e.nextSpeed,
          easing: e.nextEasing,
          complete: s._afterZoomIn
        })
      }
    },
    changeOut: function() {
      var e = s.previous,
        t = e.prevEffect,
        n = {
          opacity: .1
        },
        o = s.direction,
        a = 200;
      if (t === "elastic") {
        n[o === "down" || o === "up" ? "top" : "left"] = (o === "up" || o === "left" ? "-" : "+") + "=" + a + "px"
      }
      e.wrap.animate(n, {
        duration: t === "none" ? 0 : e.prevSpeed,
        easing: e.prevEasing,
        complete: function() {
          i(this).trigger("onReset").remove()
        }
      })
    }
  };
  s.helpers.overlay = {
    defaults: {
      closeClick: true,
      speedOut: 200,
      showEarly: true,
      css: {},
      locked: !c,
      fixed: true
    },
    overlay: null,
    fixed: false,
    el: i("html"),
    create: function(e) {
      var t;
      e = i.extend({}, this.defaults, e);
      if (this.overlay) {
        this.close()
      }
      t = s.coming ? s.coming.parent : e.parent;
      this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(t && t.lenth ? t : "body");
      this.fixed = false;
      if (e.fixed && s.defaults.fixed) {
        this.overlay.addClass("fancybox-overlay-fixed");
        this.fixed = true
      }
    },
    open: function(e) {
      var t = this;
      e = i.extend({}, this.defaults, e);
      if (this.overlay) {
        this.overlay.unbind(".overlay").width("auto").height("auto")
      } else {
        this.create(e)
      }
      if (!this.fixed) {
        a.bind("resize.overlay", i.proxy(this.update, this));
        this.update()
      }
      if (e.closeClick) {
        this.overlay.bind("click.overlay", function(e) {
          if (i(e.target).hasClass("fancybox-overlay")) {
            if (s.isActive) {
              s.close()
            } else {
              t.close()
            }
            return false
          }
        })
      }
      this.overlay.css(e.css).show()
    },
    close: function() {
      a.unbind("resize.overlay");
      if (this.el.hasClass("fancybox-lock")) {
        i(".fancybox-margin").removeClass("fancybox-margin");
        this.el.removeClass("fancybox-lock");
        a.scrollTop(this.scrollV).scrollLeft(this.scrollH)
      }
      i(".fancybox-overlay").remove().hide();
      i.extend(this, {
        overlay: null,
        fixed: false
      })
    },
    update: function() {
      var e = "100%",
        i;
      this.overlay.width(e).height("100%");
      if (l) {
        i = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth);
        if (r.width() > i) {
          e = r.width()
        }
      } else if (r.width() > a.width()) {
        e = r.width()
      }
      this.overlay.width(e).height(r.height())
    },
    onReady: function(e, t) {
      var n = this.overlay;
      i(".fancybox-overlay").stop(true, true);
      if (!n) {
        this.create(e)
      }
      if (e.locked && this.fixed && t.fixed) {
        t.locked = this.overlay.append(t.wrap);
        t.fixed = false
      }
      if (e.showEarly === true) {
        this.beforeShow.apply(this, arguments)
      }
    },
    beforeShow: function(e, t) {
      if (t.locked && !this.el.hasClass("fancybox-lock")) {
        if (this.fixPosition !== false) {
          i("*").filter(function() {
            return i(this).css("position") === "fixed" && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
          }).addClass("fancybox-margin")
        }
        this.el.addClass("fancybox-margin");
        this.scrollV = a.scrollTop();
        this.scrollH = a.scrollLeft();
        this.el.addClass("fancybox-lock");
        a.scrollTop(this.scrollV).scrollLeft(this.scrollH)
      }
      this.open(e)
    },
    onUpdate: function() {
      if (!this.fixed) {
        this.update()
      }
    },
    afterClose: function(e) {
      if (this.overlay && !s.coming) {
        this.overlay.fadeOut(e.speedOut, i.proxy(this.close, this))
      }
    }
  };
  s.helpers.title = {
    defaults: {
      type: "float",
      position: "bottom"
    },
    beforeShow: function(e) {
      var t = s.current,
        n = t.title,
        o = e.type,
        a, r;
      if (i.isFunction(n)) {
        n = n.call(t.element, t)
      }
      if (!p(n) || i.trim(n) === "") {
        return
      }
      a = i('<div class="fancybox-title fancybox-title-' + o + '-wrap">' + n + "</div>");
      switch (o) {
        case "inside":
          r = s.skin;
          break;
        case "outside":
          r = s.wrap;
          break;
        case "over":
          r = s.inner;
          break;
        default:
          r = s.skin;
          a.appendTo("body");
          if (l) {
            a.width(a.width())
          }
          a.wrapInner('<span class="child"></span>');
          s.current.margin[2] += Math.abs(g(a.css("margin-bottom")));
          break
      }
      a[e.position === "top" ? "prependTo" : "appendTo"](r)
    }
  };
  i.fn.fancybox = function(e) {
    var t, n = i(this),
      o = this.selector || "",
      a = function(a) {
        var r = i(this).blur(),
          l = t,
          f, c;
        if (!(a.ctrlKey || a.altKey || a.shiftKey || a.metaKey) && !r.is(".fancybox-wrap")) {
          f = e.groupAttr || "data-fancybox-group";
          c = r.attr(f);
          if (!c) {
            f = "rel";
            c = r.get(0)[f]
          }
          if (c && c !== "" && c !== "nofollow") {
            r = o.length ? i(o) : n;
            r = r.filter("[" + f + '="' + c + '"]');
            l = r.index(this)
          }
          e.index = l;
          if (s.open(r, e) !== false) {
            a.preventDefault()
          }
        }
      };
    e = e || {};
    t = e.index || 0;
    if (!o || e.live === false) {
      n.unbind("click.fb-start").bind("click.fb-start", a)
    } else {
      r.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", a)
    }
    this.filter("[data-fancybox-start=1]").trigger("click");
    return this
  };
  r.ready(function() {
    var t, a;
    if (i.scrollbarWidth === n) {
      i.scrollbarWidth = function() {
        var e = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
          t = e.children(),
          n = t.innerWidth() - t.height(99).innerWidth();
        e.remove();
        return n
      }
    }
    if (i.support.fixedPosition === n) {
      i.support.fixedPosition = function() {
        var e = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
          t = e[0].offsetTop === 20 || e[0].offsetTop === 15;
        e.remove();
        return t
      }()
    }
    i.extend(s.defaults, {
      scrollbarWidth: i.scrollbarWidth(),
      fixed: i.support.fixedPosition,
      parent: i("body")
    });
    t = i(e).width();
    o.addClass("fancybox-lock-test");
    a = i(e).width();
    o.removeClass("fancybox-lock-test");
    i("<style type='text/css'>.fancybox-margin{margin-right:" + (a - t) + "px;}</style>").appendTo("head")
  })
})(window, document, jQuery);