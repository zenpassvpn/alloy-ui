AUI.add("aui-media-viewer-plugin",function(c){var g=c.Lang,h=c.Do,a="body",k="href",e="image",m="loading",j="providers",n="mediaViewerPlugin",d="data-options",b={height:360,width:640,wmode:"embed"},i="https?://(?:www\\.)?{domain}",l="(?:[\\?&]|^){param}=([^&#]*)";var f=c.Component.create({NAME:n,NS:"media",ATTRS:{providers:{validator:g.isObject,value:{"flash":{container:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{media}" /><embed src="{media}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',matcher:/\b.swf\b/i,options:b,mediaRegex:/([^?&#]+)/},"youtube":{container:'<iframe width="{width}" height="{height}" src="http://www.youtube.com/embed/{media}" frameborder="0" allowfullscreen></iframe>',matcher:new RegExp(g.sub(i,{domain:"youtube.com"}),"i"),options:b,mediaRegex:/[\?&]v=([^&#]*)/i},"vimeo":{container:'<iframe src="http://player.vimeo.com/video/{media}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="{width}" height="{height}" frameborder="0"></iframe>',matcher:new RegExp(g.sub(i,{domain:"vimeo.com"}),"i"),options:b,mediaRegex:/\/(\d+)/}}}},EXTENDS:c.Plugin.Base,prototype:{initializer:function(p){var o=this;var q=o._handles;q.loadMedia=o.beforeHostMethod("loadImage",o.loadMedia);q.preloadImage=o.beforeHostMethod("preloadImage",o.preloadImage);},loadMedia:function(r){var u=this;var v=u.get("host");var w=u._getMediaType(r);var y=true;if(w!=e){var s=u.get(j)[w];var o=v.getCurrentLink();var x=u._updateOptions(o,c.clone(s.options));var q=s.mediaRegex.exec(r);if(q){x.media=q[1];}var p=g.sub(s.container,x);v.setStdModContent(a,p);v._syncImageViewerUI();u._uiSetContainerSize(x.width,x.height);v._setAlignCenter(true);v.set(m,false);u.fire("load",{media:q});if(v.get("preloadNeighborImages")){var t=v.get("currentIndex");v.preloadImage(t+1);v.preloadImage(t-1);}y=new h.Prevent();}return y;},preloadImage:function(r){var p=this;var t=p.get("host");var s=t.getLink(r);var o=new h.Prevent();if(s){var u=s.attr(k);var q=p._getMediaType(u);if(q==e){o=true;}}return o;},_getMediaType:function(r){var o=this;var q=o.get(j);var p=e;c.some(q,function(t,s,u){return t.matcher.test(r)&&(p=s);});return p;},_uiSetContainerSize:function(r,p){var o=this;var s=o.get("host");var q=s.bodyNode;q.setStyles({height:p,width:r});},_updateOptions:function(p,o){var r=p.attr(d);var q=p.attr(k);c.each(o,function(v,u,w){var t=new RegExp(g.sub(l,{param:u}));var s=t.exec(r)||t.exec(q);if(s){o[u]=s[1];}});return o;},_handles:{}},DATA_OPTIONS:d,DEFAULT_OPTIONS:b,REGEX_DOMAIN:i,REGEX_PARAM:l});c.MediaViewerPlugin=f;c.MediaViewer=c.ImageViewer;},"@VERSION@",{skinnable:false,requires:["aui-image-viewer-base"]});