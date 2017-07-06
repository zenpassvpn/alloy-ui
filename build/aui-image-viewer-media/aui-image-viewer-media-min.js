YUI.add("aui-image-viewer-media",function(e,t){var n=e.Lang,r=e.Do,i=e.getClassName("image","viewer","base","image"),s=e.getClassName("image","viewer","base","loading"),o={height:360,width:640,wmode:"embed"},u="https?://(?:www\\.)?{domain}",a="(?:[\\?&]|^){param}=([^&#]*)",f=e.Component.create({NAME:"mediaViewerPlugin",NS:"media",ATTRS:{providers:{validator:n.isObject,value:{flash:{container:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{media}" /><embed src="{media}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',matcher:/\b.swf\b/i,options:o,mediaRegex:/([^?&#]+)/},youtube:{container:'<iframe width="{width}" height="{height}" src="http://www.youtube.com/embed/{media}" frameborder="0" allowfullscreen></iframe>',matcher:new RegExp(n.sub(u,{domain:"youtube.com"}),"i"),options:o,mediaRegex:/[\?&]v=([^&#]*)/i},vimeo:{container:'<iframe src="http://player.vimeo.com/video/{media}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="{width}" height="{height}" frameborder="0"></iframe>',matcher:new RegExp(n.sub(u,{domain:"vimeo.com"}),"i"),options:o,mediaRegex:/\/(\d+)/}}}},EXTENDS:e.Plugin.Base,prototype:{initializer:function(){this._eventHandles=[this.beforeHostMethod("_loadImage",this._beforeLoadImage),this.beforeHostMethod("_renderImage",this._beforeRenderImage)]},destructor:function(){(new e.EventHandle(this._eventHandles)).detach()},_getMediaType:function(t){var n=this,r=n.get("providers"),i="image";return e.some(r,function(e,n){return e.matcher.test(t)&&(i=n)}),i},_beforeLoadImage:function(t){var o=this.get("host"),u=o._getCurrentImageContainer(),a=o.get("links").item(t),f=a.getAttribute("href"),l,c,h=this._getMediaType(f),p,d;if(h!=="image")return c=o._getCurrentImage(),c||(d=this.get("providers")[h],p=this._updateOptions(a,e.clone(d.options)),l=d.mediaRegex.exec(f),l&&(p.media=l[1]),c=e.Node.create(n.sub(d.container,p)),c.addClass(i),c.setData("loaded",!0),u.removeClass(s),u.prepend(c)),new r.Prevent},_beforeRenderImage:function(e){var t=this.get("host"),n=t.get("links").item(e),i=n.getAttribute("href");if(this._getMediaType(i)!=="image")return new r.Prevent},_updateOptions:function(t,r){var i=t.attr("data-options"),s=t.attr("href");return e.each(r,function(e,t){var o=new RegExp(n.sub(a,{param:t})),u=o.exec(i)||o.exec(s);u&&(r[t]=u[1])}),r}},DATA_OPTIONS:"data-options",DEFAULT_OPTIONS:o,REGEX_DOMAIN:u,REGEX_PARAM:a});e.MediaViewerPlugin=f,e.MediaViewer=e.ImageViewer},"3.0.3-deprecated.54",{requires:["plugin","aui-component","aui-image-viewer"]});
