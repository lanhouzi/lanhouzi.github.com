(function(t){t.fn.scrollLoading=function(o){var n={attr:"data-url",container:t(window),callback:t.noop};var a=t.extend({},n,o||{});a.cache=[];t(this).each(function(){var o=this.nodeName.toLowerCase(),n=t(this).attr(a["attr"]);var c={obj:t(this),tag:o,url:n};a.cache.push(c)});var c=function(o){if(t.isFunction(a.callback)){a.callback.call(o.get(0))}};var i=function(){var o=a.container.height();if(a.container.get(0)===window){contop=t(window).scrollTop()}else{contop=a.container.offset().top}t.each(a.cache,function(t,n){var a=n.obj,i=n.tag,e=n.url,r,l;if(a){r=a.offset().top-contop,l=r+a.height();if(r>=0&&r<o||l>0&&l<=o){if(e){if(i==="img"){c(a.attr("src",e))}else{a.load(e,{},function(){c(a)})}}else{c(a)}n.obj=null}}})};i();a.container.bind("scroll",i)}})(jQuery);