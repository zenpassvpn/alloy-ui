YUI.add("aui-modal",function(e,t){var n=e.Lang,r=e.UA,i=e.WidgetStdMod,s=e.getClassName,o=s("modal-body"),u=s("modal-footer"),a=s("modal-header"),f=s("modal-open");e.Modal=e.Base.create("modal",e.Widget,[e.WidgetCssClass,e.WidgetPosition,e.WidgetStdMod,e.WidgetToggle,e.WidgetAutohide,e.WidgetToolbars,e.WidgetPositionAlign,e.WidgetPositionConstrain,e.WidgetStack,e.WidgetModality],{CONTENT_TEMPLATE:'<div class="modal-content"></div>',initializer:function(){var t=this,n;n=[e.after(t._afterFillHeight,t,"fillHeight"),e.after("windowresize",e.bind("_afterWindowResize",t)),t.after("render",t._afterRender),t.after("draggableChange",t._afterDraggableChange),t.after("visibleChange",t._afterVisibleChange)],t._applyPlugin(t._plugDrag),t._eventHandles=n},destructor:function(){var t=this;(new e.EventHandle(t._eventHandles)).detach(),t._userInteractionHandle&&t._userInteractionHandle.detach(),e.all("body,html").removeClass(f)},_addBubbleTargets:function(t){var r=this;return n.isObject(t)||(t={}),e.mix(t,{bubbleTargets:r})},_afterFillHeight:function(){var e=this;e._fillMaxHeight(e.get("height"))},_afterDraggableChange:function(t){var n=this;t.newVal?n._applyPlugin(n._plugDrag):n.unplug(e.Plugin.Drag)},_afterRender:function(){this.get("visible")&&e.all("body,html").addClass(f)},_afterVisibleChange:function(t){var n=this;!t.newVal&&n.get("destroyOnHide")&&e.soon(e.bind("destroy",n)),e.all("body,html").toggleClass(f,t.newVal)},_afterWindowResize:function(){var e=this;e.get("centered")&&e.align()},_applyPlugin:function(e){var t=this;r.touchEnabled?e.call(t):t._userInteractionHandle||(t._userInteractionHandle=t.once(["click","mousemove"],t._onUserInitInteraction,t))},_fillMaxHeight:function(e){var t=this,n=t.get("fillHeight"),r=t.getStdModNode(n,!0);r&&r.setStyle("maxHeight",e)},_getStdModTemplate:function(t){return e.Node.create(e.Modal.TEMPLATES[t],this._stdModNode.get("ownerDocument"))},_onUserInitInteraction:function(){var e=this;e._plugDrag(),e._userInteractionHandle.detach(),e._userInteractionHandle=null},_plugDrag:function(){var t=this,n=t.get("draggable");n&&t.plug(e.Plugin.Drag,t._addBubbleTargets(n))}},{CSS_PREFIX:s("modal-dialog"),ATTRS:{bodyContent:{value:""},destroyOnHide:{validator:n.isBoolean,value:!1},draggable:{value:{handles:["."+a],plugins:[{fn:e.Plugin.DDConstrained}]}},toolbars:{valueFn:function(){var e=this;return{header:[{cssClass:"close",discardDefaultButtonCssClasses:!0,labelHTML:"<span> \u00d7 </span>",on:{click:function(t){e.hide(),t.domEvent.stopPropagation()}},render:!0}]}}},toolbarCssClass:{value:{header:"pull-right"}}},TEMPLATES:{header:'<div class="'+i.SECTION_CLASS_NAMES[i.HEADER]+" "+a+'"></div>',body:'<div class="'+i.SECTION_CLASS_NAMES[i.BODY]+" "+o+'"></div>',footer:'<div class="'+i.SECTION_CLASS_NAMES[i.FOOTER]+" "+u+'"></div>'}})},"3.0.3-deprecated.54",{requires:["widget","widget-autohide","widget-buttons","widget-modality","widget-position","widget-position-align","widget-position-constrain","widget-stack","widget-stdmod","dd-plugin","dd-constrain","timers","aui-classnamemanager","aui-widget-cssclass","aui-widget-toggle","aui-widget-toolbars"],skinnable:!0});
