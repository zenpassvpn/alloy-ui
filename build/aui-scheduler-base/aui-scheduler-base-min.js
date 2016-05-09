YUI.add("aui-scheduler-base",function(e,t){var n=e.Lang,r=n.isBoolean,i=n.isFunction,s=n.isNumber,o=n.isObject,u=n.isString,a=n.isValue,f=e.Color,l=e.DataType.DateMath,c=function(e){var t=["%l"];return e.getMinutes()>0&&(t.push(":"),t.push("%M")),e.getHours()>=12&&t.push("pm"),t.join("")},h=e.getClassName,p=h("glyphicon"),d=h("scheduler-event"),v=h("scheduler-event","all","day"),m=h("scheduler-event","content"),g=h("scheduler-event","disabled"),y=h("scheduler-event","hidden"),b=h("scheduler-event","icon","disabled"),w=h("scheduler-event","icon","meeting"),E=h("scheduler-event","icon","reminder"),S=h("scheduler-event","icon","repeated"),x=h("scheduler-event","icons"),T=h("scheduler-event","meeting"),N=h("scheduler-event","past"),C=h("scheduler-event","reminder"),k=h("scheduler-event","repeated"),L=h("scheduler-event","short"),A=h("scheduler-event","title"),O="<span>",M="</span>",_=e.Component.create({NAME:"scheduler-event",ATTRS:{allDay:{setter:e.DataType.Boolean.parse,value:!1},borderColor:{value:"#FFFFFF",validator:u},borderStyle:{value:"solid",validator:u},borderWidth:{value:"2px",validator:u},content:{setter:String,validator:a},color:{lazyAdd:!1,value:"#376cd9",validator:u},colorBrightnessFactor:{value:1.4,validator:s},colorSaturationFactor:{value:.88,validator:s},titleDateFormat:{getter:"_getTitleDateFormat",value:function(){var e=this,t=e.get("scheduler"),n=t&&t.get("activeView").get("isoTime"),r={endDate:O+"&ndash;"+" "+"%H:%M"+M,startDate:"%H:%M"};return n||(r.endDate=O+"&ndash;"+" "+c(e.get("endDate"))+M,r.startDate=c(e.get("startDate"))),e.getMinutesDuration()<=30?delete r.endDate:e.get("allDay")&&(r={}),r}},endDate:{setter:"_setDate",valueFn:function(){var e=l.clone(this.get("startDate"));return e.setHours(e.getHours()+1),e}},disabled:{value:!1,validator:r},meeting:{value:!1,validator:r},node:{valueFn:function(){return e.NodeList.create(e.Node.create(this.EVENT_NODE_TEMPLATE).setData("scheduler-event",this))}},reminder:{value:!1,validator:r},repeated:{value:!1,validator:r},scheduler:{},startDate:{setter:"_setDate",valueFn:function(){return new Date}},visible:{value:!0,validator:r}},EXTENDS:e.Model,PROPAGATE_ATTRS:["allDay","startDate","endDate","content","color","colorBrightnessFactor","colorSaturationFactor","titleDateFormat","visible","disabled"],prototype:{EVENT_NODE_TEMPLATE:'<div class="'+d+'">'+'<div class="'+A+'"></div>'+'<div class="'+m+'"></div>'+'<div class="'+x+'">'+'<span class="'+[p,b].join(" ")+'"></span>'+'<span class="'+[p,w].join(" ")+'"></span>'+'<span class="'+[p,E].join(" ")+'"></span>'+'<span class="'+[p,S].join(" ")+'"></span>'+"</div>"+"</div>",initializer:function(){var e=this;e.bindUI(),e.syncUI()},bindUI:function(){var e=this;e.after({allDayChange:e._afterAllDayChange,colorChange:e._afterColorChange,disabledChange:e._afterDisabledChange,endDateChange:e._afterEndDateChange,meetingChange:e._afterMeetingChange,reminderChange:e._afterReminderChange,repeatedChange:e._afterRepeatedChange,visibleChange:e._afterVisibleChange})},syncUI:function(){var e=this;e._uiSetAllDay(e.get("allDay")),e._uiSetColor(e.get("color")),e._uiSetDisabled(e.get("disabled")),e._uiSetEndDate(e.get("endDate")),e._uiSetMeeting(e.get("meeting")),e._uiSetPast(e._isPastEvent()),e._uiSetReminder(e.get("reminder")),e._uiSetRepeated(e.get("repeated")),e._uiSetVisible(e.get("visible")),e.syncNodeTitleUI(),e.syncNodeContentUI()},destroy:function(){var e=this;e.get("node").remove(!0)},addPaddingNode:function(){var t=this;t.get("node").push(e.Node.create(t.EVENT_NODE_TEMPLATE).setData("scheduler-event",t)),t.syncUI()},clone:function(){var e=this,t=null,n=e.get("scheduler");return n&&(t=new n.eventModel,t.copyPropagateAttrValues(e,null,{silent:!0})),t},copyDates:function(e,t){var n=this;n.setAttrs({endDate:l.clone(e.get("endDate")),startDate:l.clone(e.get("startDate"))},t)},copyPropagateAttrValues:function(t,n,r){var i=this,s={};i.copyDates(t,r),e.Array.each(i.constructor.PROPAGATE_ATTRS,function(e){if(!(n||{}).hasOwnProperty(e)){var r=t.get(e);o(r)||(s[e]=r)}}),i.setAttrs(s,r)},getDaysDuration:function(){var e=this;return l.getDayOffset(e.get("endDate"),e.get("startDate"))},getHoursDuration:function(){var e=this;return l.getHoursOffset(e.get("endDate"),e.get("startDate"))},getMinutesDuration:function(){var e=this;return l.getMinutesOffset(e.get("endDate"),e.get("startDate"))},getSecondsDuration:function(){var e=this;return l.getSecondsOffset(e.get("endDate"),e.get("startDate"))},sameEndDate:function(e){var t=this;return l.compare(t.get("endDate"),e.get("endDate"))},sameStartDate:function(e){var t=this;return l.compare(t.get("startDate"),e.get("startDate"))},isAfter:function(e){var t=this,n=t.get("startDate"),r=e.get("startDate");return l.after(n,r)},isBefore:function(e){var t=this,n=t.get("startDate"),r=e.get("startDate");return l.before(n,r)},intersects:function(e){var t=this,n=t.get("endDate"),r=t.get("startDate"),i=e.get("startDate");return t.sameStartDate(e)||l.between(i,r,n)},intersectHours:function(e){var t=this,n=t.get("endDate"),r=t.get("startDate"),i=l.clone(r);return l.copyHours(i,e.get("startDate")),l.compare(r,i)||l.between(i,r,n)},isDayBoundaryEvent:function(){var e=this;return l.isDayBoundary(e.get("startDate"),e.get("endDate"))},isDayOverlapEvent:function(){var e=this;return l.isDayOverlap(e.get("startDate"),e.get("endDate"))},getClearEndDate:function(){var e=this;return l.safeClearTime(e.get("endDate"))},getClearStartDate:function(){var e=this;return l.safeClearTime(e.get("startDate"))},move:function(e,t){var n=this,r=n.getMinutesDuration();n.setAttrs({endDate:l.add(l.clone(e),l.MINUTES,r),startDate:e},t)},setContent:function(e){var t=this;t.get("node").each(function(t){var n=t.one("."+m);n.setContent(e)})},setTitle:function(e){var t=this;t.get("node").each(function(t){var n=t.one("."+A);n.setContent(e)})},syncNodeContentUI:function(){var e=this;e.setContent(e.get("content"))},syncNodeTitleUI:function(){var e=this,t=e.get("titleDateFormat"),n=e.get("startDate"),r=e.get("endDate"),
i=[];t.startDate&&i.push(e._formatDate(n,t.startDate)),t.endDate&&i.push(e._formatDate(r,t.endDate)),e.setTitle(i.join(""))},split:function(){var e=this,t=l.clone(e.get("startDate")),n=l.clone(e.get("endDate"));if(e.isDayOverlapEvent()&&!e.isDayBoundaryEvent()){var r=l.clone(t);return r.setHours(24,0,0,0),[[t,l.toMidnight(l.clone(t))],[r,l.clone(n)]]}return[[t,n]]},_afterAllDayChange:function(e){var t=this;t._uiSetAllDay(e.newVal)},_afterColorChange:function(e){var t=this;t._uiSetColor(e.newVal)},_afterDisabledChange:function(e){var t=this;t._uiSetDisabled(e.newVal)},_afterEndDateChange:function(e){var t=this;t._uiSetEndDate(e.newVal)},_afterMeetingChange:function(e){var t=this;t._uiSetMeeting(e.newVal)},_afterReminderChange:function(e){var t=this;t._uiSetReminder(e.newVal)},_afterRepeatedChange:function(e){var t=this;t._uiSetRepeated(e.newVal)},_afterVisibleChange:function(e){var t=this;t._uiSetVisible(e.newVal)},_isPastEvent:function(){var e=this,t=e.get("endDate");return t.getTime()<(new Date).getTime()},_setDate:function(e){return s(e)&&(e=new Date(e)),e},_formatDate:function(t,n){var r=this,i=r.get("locale");return e.DataType.Date.format(t,{format:n,locale:i})},_getTitleDateFormat:function(e){var t=this;return u(e)?e={endDate:e,startDate:e}:i(e)&&(e=e.call(t)),e},_uiSetAllDay:function(e){var t=this;t.get("node").toggleClass(v,!!e)},_uiSetColor:function(e){var t=this,n=t.get("node"),r=f.toHSL(e),i=f.toArray(r);i[1]*=t.get("colorSaturationFactor"),i[2]*=t.get("colorBrightnessFactor"),i=f.fromArray(i,f.TYPES.HSL),r=f.toRGB(r),i=f.toRGB(i),n&&n.setStyles({backgroundColor:i,borderColor:t.get("borderColor"),borderStyle:t.get("borderStyle"),borderWidth:t.get("borderWidth"),color:r})},_uiSetDisabled:function(e){var t=this;t.get("node").toggleClass(g,!!e)},_uiSetEndDate:function(){var e=this;e.get("node").toggleClass(L,e.getMinutesDuration()<=30)},_uiSetMeeting:function(e){var t=this;t.get("node").toggleClass(T,!!e)},_uiSetPast:function(e){var t=this;t.get("node").toggleClass(N,!!e)},_uiSetReminder:function(e){var t=this;t.get("node").toggleClass(C,!!e)},_uiSetRepeated:function(e){var t=this;t.get("node").toggleClass(k,!!e)},_uiSetVisible:function(e){var t=this;t.get("node").toggleClass(y,!e)}}});e.SchedulerEvent=_;var n=e.Lang,D=n.isArray,r=n.isBoolean,u=n.isString,P=e.Base.create("scheduler-calendar",e.ModelList,[],{model:e.SchedulerEvent,initializer:function(){var e=this;e.after("colorChange",e._afterColorChange),e.after("disabledChange",e._afterDisabledChange),e.after("visibleChange",e._afterVisibleChange),e.after(["add","remove","reset"],e._afterEventsChange),e.on(["remove","reset"],e._onRemoveEvents),e._uiSetEvents(e.toArray()),e._setModelsAttrs({color:e.get("color"),disabled:e.get("disabled"),visible:e.get("visible")})},_afterColorChange:function(e){var t=this;t._setModelsAttrs({color:t.get("color")},{silent:e.silent})},_afterDisabledChange:function(e){var t=this;t._setModelsAttrs({disabled:t.get("disabled")},{silent:e.silent})},_afterEventsChange:function(e){var t=this;t._setModelsAttrs({color:t.get("color"),disabled:t.get("disabled"),visible:t.get("visible")},{silent:!0}),t._uiSetEvents(t.toArray(),e.skipSyncUI)},_afterVisibleChange:function(e){var t=this;t._setModelsAttrs({visible:t.get("visible")},{silent:e.silent})},_onRemoveEvents:function(){var e=this,t=e.get("scheduler");t&&t.removeEvents(e)},_setModelsAttrs:function(e,t){var n=this;n.each(function(n){n.setAttrs(e,t)})},_uiSetEvents:function(e,t){var n=this,r=n.get("scheduler");r&&(r.addEvents(e),t||r.syncEventsUI())}},{ATTRS:{color:{valueFn:function(){var e=this,t=e.get("palette"),n=Math.ceil(Math.random()*t.length)-1;return t[n]},validator:u},disabled:{value:!1,validator:r},name:{value:"(no name)",validator:u},palette:{value:["#d93636","#e63973","#b22eb3","#6e36d9","#2d70b3","#376cd9","#25998c","#249960","#24992e","#6b9926","#999926","#a68f29","#b3782d","#bf6030","#bf6060","#997399","#617181","#6b7a99","#548c85","#747446","#997e5c","#b34d1b","#993d48","#802d70"],validator:D},scheduler:{},visible:{value:!0,validator:r}}});e.SchedulerCalendar=P;var H=e.getClassName("scheduler-base","view",""),B=e.getClassName("active"),l=e.DataType.DateMath,n=e.Lang,D=n.isArray,r=n.isBoolean,j=n.isDate,i=n.isFunction,s=n.isNumber,F=e.WidgetStdMod,I=function(t){return t instanceof e.ModelList},q=function(t){return t instanceof e.SchedulerView},h=e.getClassName,R=h("scheduler-base","nav"),U=h("scheduler-base","nav","date"),z=h("scheduler-base","controls"),W=h("scheduler-base","hd"),X=h("scheduler-base","icon","next"),V=h("scheduler-base","icon","prev"),$=h("scheduler-base","today"),J=h("scheduler-base","view"),H=h("scheduler-base","view",""),K=h("scheduler-base","view","date"),Q=h("btn"),G=h("btn","default"),p=h("glyphicon"),Z=h("glyphicon","chevron","right"),et=h("glyphicon","chevron","left"),tt=h("scheduler-base","views"),nt='<div class="col-xs-7 '+z+'"></div>',rt='<div class="row '+W+'"></div>',it='<button aria-label="{ariaLabel}"" role="button" type="button" class="'+[X,Q,G].join(" ")+'"><span class="'+[p,Z].join(" ")+'"></span></button>',st='<button aria-label="{ariaLabel}"" role="button" type="button" class="'+[V,Q,G].join(" ")+'"><span class="'+[p,et].join(" ")+'"></span></button>',ot='<div class="btn-group"></div>',ut='<div class="'+U+' hidden-xs"></div>',at='<button aria-label="{ariaLabel}" role="button" type="button" class="'+[$,Q,G].join(" ")+'">{today}</button>',ft='<button aria-label="{ariaLabel}" aria-pressed="false" type="button" class="hidden-xs '+[J,H].join(" ")+'{name}" data-view-name="{name}">{label}</button>',lt='<option aria-label="{ariaLabel}" aria-pressed="false" class="'+[J,H].join(" ")+'{name}" data-view-name="{name}">{label}</option>',ct='<div class="'+K+' visible-xs"></div>',ht='<div class="col-xs-5 form-inline '+tt+'"></div>',pt='<select class="form-control visible-xs"></select>';e.SchedulerEvents=e.Base.create("scheduler-events",e.ModelList,[],{initializer:function(){this._remainingItems=this.get("originalItems"),this
.after("originalItemsChange",this._afterOriginalItemsChange),this.get("scheduler").on("plotViewEvents",e.bind(this._onPlotViewEvents,this))},comparator:function(e){var t=e.get("startDate"),n=e.get("endDate");return t+1/(n-t)},_afterOriginalItemsChange:function(){this._remainingItems=this.get("originalItems"),this.remove(this.toArray()),this._updateEventsForView()},_onPlotViewEvents:function(){this._updateEventsForView()},_setOriginalItems:function(t){var n=[];for(var r=0;r<t.length;r++)e.instanceOf(t[r],this.model)?this.add(t[r]):(t[r].startDate=t[r].startDate||new Date,t[r].endDate||(t[r].endDate=l.clone(t[r].startDate),t[r].endDate.setHours(t[r].endDate.getHours()+1)),n.push(t[r]));return n},_updateEventsForView:function(){var e,t,n,r,i=[],s=this.get("scheduler").get("activeView");if(!s)return;e=s.getDateInterval();for(r=0;r<this._remainingItems.length;r++)n=this._remainingItems[r].startDate,t=this._remainingItems[r].endDate,(!e.startDate||t>=e.startDate)&&(!e.endDate||n<=e.endDate)?this.add(this._remainingItems[r]):i.push(this._remainingItems[r]);this._remainingItems=i},model:e.SchedulerEvent},{ATTRS:{originalItems:{setter:"_setOriginalItems",validator:e.Lang.isArray,value:[]},scheduler:{}}});var dt=function(){};dt.ATTRS={},e.mix(dt.prototype,{calendarModel:e.SchedulerCalendar,eventModel:e.SchedulerEvent,eventsModel:e.SchedulerEvents,initializer:function(t){var n=this,r=n._toSchedulerEvents(t.items||t.events);n._events=new n.eventsModel({after:{add:e.bind(n._afterAddEvent,n)},bubbleTargets:n,originalItems:this.get("pagination")?r:[],scheduler:n}),this.get("pagination")||this._events.add(r)},addEvents:function(e){var t=this,n=t._toSchedulerEvents(e);return t._events.add(n)},eachEvent:function(e){var t=this;return t._events.each(e)},flushEvents:function(){var e=this;e._events.each(function(e){delete e._filtered})},getEventByClientId:function(e){var t=this;return t._events.getByClientId(e)},getEvents:function(e,t){var n=this,r=n._events;return t||r.sort({silent:!0}),e?r=r.filter(e):r=r.toArray(),r},getEventsByDay:function(e,t){var n=this;return e=l.safeClearTime(e),n.getEvents(function(n){return l.compare(n.getClearStartDate(),e)||t&&l.compare(n.getClearEndDate(),e)})},getIntersectEvents:function(e){var t=this;return e=l.safeClearTime(e),t.getEvents(function(t){var n=t.getClearStartDate(),r=t.getClearEndDate();return t.get("visible")&&(l.compare(e,n)||l.compare(e,r)||l.between(e,n,r))})},removeEvents:function(e){var t=this,n=t._toSchedulerEvents(e);return t._events.remove(n)},resetEvents:function(e){var t=this,n=t._toSchedulerEvents(e);return t._events.reset(n)},_afterAddEvent:function(e){var t=this;e.model.set("scheduler",t)},_toSchedulerEvents:function(t){var n=this,r=[];return I(t)?(r=t.toArray(),t.set("scheduler",n)):D(t)?e.Array.each(t,function(e){I(e)?(r=r.concat(e.toArray()),e.set("scheduler",n)):r.push(e)}):r=t,r}}),e.SchedulerEventSupport=dt;var vt=e.Component.create({NAME:"scheduler-base",ATTRS:{activeView:{validator:q},ariaLabels:{value:{agenda:"View Agenda",day:"View by Day",month:"View by Month",next:"Go to Next",previous:"Go to Previous",today:"Go to Today",week:"View by Week"}},date:{value:new Date,validator:j},focusmanager:{value:{descendants:"button",keys:{next:"down:39",previous:"down:37"},circular:!1},writeOnce:"initOnly"},eventRecorder:{setter:"_setEventRecorder"},strings:{value:{agenda:"Agenda",day:"Day",month:"Month",table:"Table",today:"Today",week:"Week",year:"Year"}},navigationDateFormatter:{value:function(t){var n=this;return e.DataType.Date.format(t,{format:"%B %d, %Y",locale:n.get("locale")})},validator:i},pagination:{validator:e.Lang.isBoolean,value:!0,writeOnce:"initOnly"},views:{setter:"_setViews",value:[]},viewDate:{getter:"_getViewDate",readOnly:!0},firstDayOfWeek:{value:0,validator:s},controlsNode:{valueFn:function(){return e.Node.create(nt)}},viewDateNode:{valueFn:function(){return e.Node.create(ct)}},headerNode:{valueFn:function(){return e.Node.create(rt)}},iconNextNode:{valueFn:function(){var t=this;return e.Node.create(e.Lang.sub(it,{ariaLabel:t.getAriaLabel("next")}))}},iconPrevNode:{valueFn:function(){var t=this;return e.Node.create(e.Lang.sub(st,{ariaLabel:t.getAriaLabel("previous")}))}},navNode:{valueFn:function(){return e.Node.create(ot)}},navDateNode:{valueFn:function(){return e.Node.create(ut)}},showHeader:{validator:r,value:!0},viewsSelectNode:{valueFn:function(){return e.Node.create(pt)}},todayDate:{value:new Date,validator:j},todayNode:{valueFn:function(){var t=this;return e.Node.create(e.Lang.sub(this._processTemplate(at),{ariaLabel:t.getAriaLabel("today")}))}},viewsNode:{valueFn:function(){return e.Node.create(ht)}}},HTML_PARSER:{controlsNode:"."+z,viewDateNode:"."+K,headerNode:"."+W,iconNextNode:"."+X,iconPrevNode:"."+V,navNode:"."+R,navDateNode:"."+U,todayNode:"."+$,viewsNode:"."+tt},UI_ATTRS:["date","activeView","showHeader"],AUGMENTS:[e.SchedulerEventSupport,e.WidgetStdMod],prototype:{viewStack:null,initializer:function(){var e=this;e.viewStack={},e.controlsNode=e.get("controlsNode"),e.viewDateNode=e.get("viewDateNode"),e.header=e.get("headerNode"),e.iconNextNode=e.get("iconNextNode"),e.iconPrevNode=e.get("iconPrevNode"),e.navNode=e.get("navNode"),e.navDateNode=e.get("navDateNode"),e.viewsSelectNode=e.get("viewsSelectNode"),e.todayNode=e.get("todayNode"),e.viewsNode=e.get("viewsNode"),e._populateViewNodes(),e.after({activeViewChange:e._afterActiveViewChange,render:e._afterRender}),this.publish({plotViewEvents:{defaultFn:this._defPlotViewEventsFn}})},bindUI:function(){var e=this;e._bindDelegate()},syncUI:function(){var e=this;e.syncStdContent()},getViewByName:function(e){var t=this;return t.viewStack[e]},getViewTriggerNode:function(t){var n=this,r=t.get("name"),i=e.DOM.winWidth()+Y.DOM.getScrollbarWidth();return i>=768?n.viewsNode.one("."+H+r):n.viewsSelectNode.one("."+H+r)},getStrings:function(){var e=this;return e.get("strings")},getString:function(e){var t=this;return t.getStrings()[e]},getAriaLabel:function(e){var t=this,n=t.get("ariaLabels"
);return n[e]},renderView:function(e){var t=this;e&&(e.show(),e.get("rendered")||(t.bodyNode||t.setStdModContent(F.BODY,""),t.bodyNode.prepend(t.viewDateNode),e.render(t.bodyNode)))},plotViewEvents:function(e){var t=this;e.plotEvents(t.getEvents())},syncEventsUI:function(){var e=this,t=e.get("activeView");t&&this.fire("plotViewEvents")},renderButtonGroup:function(){var t=this;t.buttonGroup||(t.buttonGroup=(new e.ButtonGroup({boundingBox:t.viewsNode,on:{selectionChange:e.bind(t._onButtonGroupSelectionChange,t)}})).render())},renderDropdownList:function(){var t=this;t.viewsSelectNode.on("change",e.bind(t._onSelectionChange,t))},syncStdContent:function(){var e=this;e.get("showHeader")?(e.renderButtonGroup(),e.navNode.append(e.iconPrevNode),e.navNode.append(e.todayNode),e.navNode.append(e.iconNextNode),e.controlsNode.append(e.navNode),e.controlsNode.append(e.navDateNode),e.viewsNode.append(e.viewsSelectNode),e.header.append(e.controlsNode),e.header.append(e.viewsNode),e.setStdModContent(F.HEADER,e.header.getDOM()),e.header.show()):e.header.hide()},_afterActiveViewChange:function(e){var t=this;if(t.get("rendered")){var n=e.newVal,r=e.prevVal;r&&r.hide(),t.renderView(n);var i=t.get("eventRecorder");i&&i.hidePopover(),t._uiSetDate(t.get("date"))}},_afterRender:function(){var e=this,t=e.get("activeView");e.renderView(t),e.renderDropdownList(),e._uiSetDate(e.get("date")),e._uiSetActiveView(t),e._plugFocusManager()},_bindDelegate:function(){var e=this;e.controlsNode.delegate("click",e._onClickPrevIcon,"."+V,e),e.controlsNode.delegate("click",e._onClickNextIcon,"."+X,e),e.controlsNode.delegate("click",e._onClickToday,"."+$,e)},_createViewTriggerNode:function(t,n){var r=this,i=t.get("name");return e.Node.create(e.Lang.sub(n,{name:i,label:r.getString(i)||i,ariaLabel:r.getAriaLabel(i)}))},_defPlotViewEventsFn:function(){this.plotViewEvents(this.get("activeView"))},_getViewDate:function(){var e=this,t=e.get("date"),n=e.get("activeView");return n&&(t=n.getAdjustedViewDate(t)),t},_onButtonGroupSelectionChange:function(e){var t=this,n=e.originEvent.target.attr("data-view-name");t.set("activeView",t.getViewByName(n)),t.viewsSelectNode.one("[data-view-name="+n+"]").set("selected",!0),e.preventDefault()},_onClickToday:function(e){var t=this,n=t.get("activeView");n&&t.set("date",t.get("todayDate")),e.preventDefault()},_onClickNextIcon:function(e){var t=this,n=t.get("activeView");n&&t.set("date",n.get("nextDate")),e.preventDefault()},_onClickPrevIcon:function(e){var t=this,n=t.get("activeView");n&&t.set("date",n.get("prevDate")),e.preventDefault()},_onSelectionChange:function(e){var t=this,n=e.target,r=n.get("selectedIndex"),i=n.get("options").item(r).attr("data-view-name");t.set("activeView",t.getViewByName(i))},_populateViewNodes:function(){var t=this,n=t.get("views");e.Array.each(n,function(e){t.viewsSelectNode.append(t._createViewTriggerNode(e,lt)),t.viewsNode.append(t._createViewTriggerNode(e,ft))})},_plugFocusManager:function(){var t=this;t.viewsNode.plug(e.Plugin.NodeFocusManager,this.get("focusmanager")),t.navNode.plug(e.Plugin.NodeFocusManager,this.get("focusmanager"))},_processTemplate:function(t){var n=this;return e.Lang.sub(t,n.getStrings())},_setEventRecorder:function(e){var t=this;e&&(e.setAttrs({scheduler:t},{silent:!0}),e.addTarget(t))},_setViews:function(t){var n=this,r=[];return e.Array.each(t,function(e){q(e)&&!e.get("rendered")&&(e.setAttrs({scheduler:n}),r.push(e),n.viewStack[e.get("name")]=e)}),n.get("activeView")||n.set("activeView",t[0]),r},_uiSetActiveView:function(e){var t=this;if(e){var n=e.get("name"),r=t.viewsNode.one("."+H+n);r&&(t.viewsNode.all("button").removeClass(B).setAttribute("aria-pressed",!1),t.viewsSelectNode.one("[data-view-name="+n+"]").set("selected",!0),r.addClass(B).setAttribute("aria-pressed",!0))}},_uiSetDate:function(e){var t=this,n=t.get("navigationDateFormatter"),r=n.call(t,e);if(t.get("rendered")){var i=t.get("activeView");i&&(i._uiSetDate(e),n=i.get("navigationDateFormatter"),r=n.call(i,e)),t.navDateNode.html(r),t.viewDateNode.html(r),t.syncEventsUI()}},_uiSetShowHeader:function(){var e=this;e.syncStdContent()}}});e.Scheduler=vt;var n=e.Lang,r=n.isBoolean,i=n.isFunction,u=n.isString,l=e.DataType.DateMath,mt=e.getClassName("scheduler-view","noscroll"),gt=e.getClassName("scheduler-view","scrollable"),yt=e.Component.create({NAME:"scheduler-view",AUGMENTS:[e.WidgetStdMod],ATTRS:{bodyContent:{value:""},filterFn:{validator:i,value:function(){return!0}},height:{value:650},initialScroll:{validator:function(t){return e.Lang.isBoolean(t)||e.Lang.isDate(t)},value:!0,writeOnce:"initOnly"},isoTime:{value:!1,validator:r},name:{value:"",validator:u},navigationDateFormatter:{value:function(t){var n=this,r=n.get("scheduler");return e.DataType.Date.format(t,{format:"%A, %d %B, %Y",locale:r.get("locale")})},validator:i},nextDate:{getter:"getNextDate",readOnly:!0},prevDate:{getter:"getPrevDate",readOnly:!0},scheduler:{lazyAdd:!1,setter:"_setScheduler"},scrollable:{value:!0,validator:r},triggerNode:{getter:"_getTriggerNode",setter:e.one},visible:{value:!1}},BIND_UI_ATTRS:["scrollable"],prototype:{initializer:function(){this.after("render",this._afterRender),e.after(this._afterBasePlotEvents,this,"plotEvents")},syncUI:function(){var e=this;e.syncStdContent()},getAdjustedViewDate:function(e){return l.toMidnight(e)},flushViewCache:function(){},getDateInterval:function(){return{endDate:l.toLastHour(l.subtract(this.getNextDate(),l.DAY,1)),startDate:this.getAdjustedViewDate(this.get("scheduler").get("viewDate"))}},getNextDate:function(){},getPrevDate:function(){},getToday:function(){return l.clearTime(new Date)},limitDate:function(e,t){return l.after(e,t)&&(e=l.clone(t)),e},plotEvents:function(){},scrollToDate:function(){},syncStdContent:function(){},syncEventUI:function(){},_uiSetDate:function(){},_afterBasePlotEvents:function(){var e=this.get("initialScroll");e!==!1&&this.get("rendered")&&this.get("visible")&&!this._scrollDone&&(this.scrollToDate(e===!0?new Date:e),this._scrollDone=!0
)},_afterRender:function(){var e=this;e._uiSetScrollable(e.get("scrollable"))},_getTriggerNode:function(){return this.get("scheduler").getViewTriggerNode(this)},_setScheduler:function(t){var n=this,r=n.get("scheduler");return r&&n.removeTarget(r),t&&(n.addTarget(t),t.after(["*:add","*:remove","*:reset"],e.bind(n.flushViewCache,n))),t},_uiSetScrollable:function(e){var t=this,n=t.bodyNode;n&&(n.toggleClass(gt,e),n.toggleClass(mt,!e))}}});e.SchedulerView=yt},"3.0.3-deprecated.32",{requires:["model","model-list","widget-stdmod","color-hsl","aui-event-base","aui-node-base","aui-component","aui-datatype","aui-button","node-focusmanager"],skinnable:!0});
