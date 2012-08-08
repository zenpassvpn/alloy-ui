/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.6.0
build: 3.6.0
*/
YUI.add("calendar-base",function(c){var E=c.ClassNameManager.getClassName,r="calendar",k=E(r,"grid"),d=E(r,"left-grid"),y=E(r,"right-grid"),A=E(r,"body"),q=E(r,"header"),n=E(r,"header-label"),s=E(r,"weekdayrow"),C=E(r,"weekday"),w=E(r,"column-hidden"),e=E(r,"day-selected"),h=E(r,"selection-disabled"),l=E(r,"row"),D=E(r,"day"),b=E(r,"prevmonth-day"),t=E(r,"nextmonth-day"),z=E(r,"anchor"),H=E(r,"pane"),g=E(r,"status"),j=c.Lang,u=c.Node,m=u.create,v=c.substitute,f=c.each,G=c.Array.hasValue,x=c.Array.indexOf,F=c.Object.hasKey,a=c.Object.setValue,i=c.Object.owns,p=c.Object.isEmpty,o=c.DataType.Date;function B(I){B.superclass.constructor.apply(this,arguments);}c.CalendarBase=c.extend(B,c.Widget,{_paneProperties:{},_paneNumber:1,_calendarId:null,_selectedDates:{},_rules:{},_filterFunction:null,_storedDateCells:{},initializer:function(){this._paneProperties={};this._calendarId=c.guid("calendar");this._selectedDates={};if(p(this._rules)){this._rules={};}this._storedDateCells={};},renderUI:function(){var I=this.get("contentBox");I.appendChild(this._initCalendarHTML(this.get("date")));if(this.get("showPrevMonth")){this._afterShowPrevMonthChange();}if(this.get("showNextMonth")){this._afterShowNextMonthChange();}this._renderCustomRules();this._renderSelectedDates();this.get("boundingBox").setAttribute("aria-labelledby",this._calendarId+"_header");},bindUI:function(){this.after("dateChange",this._afterDateChange);this.after("showPrevMonthChange",this._afterShowPrevMonthChange);this.after("showNextMonthChange",this._afterShowNextMonthChange);this.after("headerRendererChange",this._afterHeaderRendererChange);this.after("customRendererChange",this._afterCustomRendererChange);this.after("enabledDatesRuleChange",this._afterCustomRendererChange);this.after("disabledDatesRuleChange",this._afterCustomRendererChange);this.after("focusedChange",this._afterFocusedChange);this.after("selectionChange",this._renderSelectedDates);this._bindCalendarEvents();},_getSelectedDatesList:function(){var I=[];f(this._selectedDates,function(J){f(J,function(K){f(K,function(L){I.push(L);},this);},this);},this);return I;},_getSelectedDatesInMonth:function(J){var I=J.getFullYear(),K=J.getMonth();if(F(this._selectedDates,I)&&F(this._selectedDates[I],K)){return c.Object.values(this._selectedDates[I][K]);}else{return[];}},_isNumInList:function(J,M){if(M=="all"){return true;}else{var L=M.split(","),K=L.length;while(K--){var I=L[K].split("-");if(I.length==2&&J>=parseInt(I[0],10)&&J<=parseInt(I[1],10)){return true;}else{if(I.length==1&&(parseInt(L[K],10)==J)){return true;}}}return false;}},_getRulesForDate:function(S){var O=S.getFullYear(),M=S.getMonth(),K=S.getDate(),N=S.getDay(),R=this._rules,P=[],L,J,I,Q;for(L in R){if(this._isNumInList(O,L)){if(j.isString(R[L])){P.push(R[L]);}else{for(J in R[L]){if(this._isNumInList(M,J)){if(j.isString(R[L][J])){P.push(R[L][J]);}else{for(I in R[L][J]){if(this._isNumInList(K,I)){if(j.isString(R[L][J][I])){P.push(R[L][J][I]);}else{for(Q in R[L][J][I]){if(this._isNumInList(N,Q)){if(j.isString(R[L][J][I][Q])){P.push(R[L][J][I][Q]);}}}}}}}}}}}}return P;},_matchesRule:function(I,J){return(x(this._getRulesForDate(I),J)>=0);},_canBeSelected:function(K){var I=this.get("enabledDatesRule"),J=this.get("disabledDatesRule");if(I){return this._matchesRule(K,I);}else{if(J){return !this._matchesRule(K,J);}else{return true;}}},selectDates:function(I){if(o.isValidDate(I)){this._addDateToSelection(I);}else{if(j.isArray(I)){this._addDatesToSelection(I);}}},deselectDates:function(I){if(!I){this._clearSelection();}else{if(o.isValidDate(I)){this._removeDateFromSelection(I);}else{if(j.isArray(I)){this._removeDatesFromSelection(I);}}}},_addDateToSelection:function(L,J){if(this._canBeSelected(L)){var K=L.getFullYear(),M=L.getMonth(),I=L.getDate();if(F(this._selectedDates,K)){if(F(this._selectedDates[K],M)){this._selectedDates[K][M][I]=L;}else{this._selectedDates[K][M]={};this._selectedDates[K][M][I]=L;}}else{this._selectedDates[K]={};this._selectedDates[K][M]={};this._selectedDates[K][M][I]=L;}this._selectedDates=a(this._selectedDates,[K,M,I],L);if(!J){this._fireSelectionChange();}}},_addDatesToSelection:function(I){f(I,this._addDateToSelection,this);this._fireSelectionChange();},_addDateRangeToSelection:function(I,N){var J=(N.getTimezoneOffset()-I.getTimezoneOffset())*60000,L=I.getTime(),K=N.getTime();if(L>K){var P=L;L=K;K=P+J;}else{K=K-J;}for(var M=L;M<=K;M+=86400000){var O=new Date(M);O.setHours(12);this._addDateToSelection(O,M);}this._fireSelectionChange();},_removeDateFromSelection:function(L,J){var K=L.getFullYear(),M=L.getMonth(),I=L.getDate();if(F(this._selectedDates,K)&&F(this._selectedDates[K],M)&&F(this._selectedDates[K][M],I)){delete this._selectedDates[K][M][I];if(!J){this._fireSelectionChange();}}},_removeDatesFromSelection:function(I){f(I,this._removeDateFromSelection,this);this._fireSelectionChange();},_removeDateRangeFromSelection:function(I,M){var K=I.getTime(),J=M.getTime();for(var L=K;L<=J;L+=86400000){this._removeDateFromSelection(new Date(L),L);}this._fireSelectionChange();},_clearSelection:function(I){this._selectedDates={};this.get("contentBox").all("."+e).removeClass(e).setAttribute("aria-selected",false);if(!I){this._fireSelectionChange();}},_fireSelectionChange:function(){this.fire("selectionChange",{newSelection:this._getSelectedDatesList()});},_restoreModifiedCells:function(){var I=this.get("contentBox"),J;for(J in this._storedDateCells){I.one("#"+J).replace(this._storedDateCells[J]);delete this._storedDateCells[J];}},_renderCustomRules:function(){this.get("contentBox").all("."+D+",."+t).removeClass(h).setAttribute("aria-disabled",false);if(!p(this._rules)){var L=this.get("enabledDatesRule"),K=this.get("disabledDatesRule");for(var J=0;J<this._paneNumber;J++){var I=o.addMonths(this.get("date"),J);var M=o.listOfDatesInMonth(I);f(M,function(N){var P=this._getRulesForDate(N);if(P.length>0){var O=this._dateToNode(N);if((L&&x(P,L)<0)||(!L&&K&&x(P,K)>=0)){O.addClass(h).setAttribute("aria-disabled",true);}if(j.isFunction(this._filterFunction)){this._storedDateCells[O.get("id")]=O.cloneNode(true);
this._filterFunction(N,O,P);}}else{if(L){var O=this._dateToNode(N);O.addClass(h).setAttribute("aria-disabled",true);}}},this);}}},_renderSelectedDates:function(){this.get("contentBox").all("."+e).removeClass(e).setAttribute("aria-selected",false);for(var J=0;J<this._paneNumber;J++){var I=o.addMonths(this.get("date"),J);var K=this._getSelectedDatesInMonth(I);f(K,function(L){this._dateToNode(L).addClass(e).setAttribute("aria-selected",true);},this);}},_dateToNode:function(O){var I=O.getDate(),K=0,L=I%7,M=(12+O.getMonth()-this.get("date").getMonth())%12,J=this._calendarId+"_pane_"+M,N=this._paneProperties[J].cutoffCol;switch(L){case (0):if(N>=6){K=12;}else{K=5;}break;case (1):K=6;break;case (2):if(N>0){K=7;}else{K=0;}break;case (3):if(N>1){K=8;}else{K=1;}break;case (4):if(N>2){K=9;}else{K=2;}break;case (5):if(N>3){K=10;}else{K=3;}break;case (6):if(N>4){K=11;}else{K=4;}break;}return(this.get("contentBox").one("#"+this._calendarId+"_pane_"+M+"_"+K+"_"+I));},_nodeToDate:function(O){var J=O.get("id").split("_").reverse(),L=parseInt(J[2],10),I=parseInt(J[0],10);var N=o.addMonths(this.get("date"),L),K=N.getFullYear(),M=N.getMonth();return new Date(K,M,I,12,0,0,0);},_bindCalendarEvents:function(){},_normalizeDate:function(I){if(I){return new Date(I.getFullYear(),I.getMonth(),1,12,0,0,0);}else{return null;}},_getCutoffColumn:function(J,K){var L=this._normalizeDate(J).getDay()-K;var I=6-(L+7)%7;return I;},_turnPrevMonthOn:function(M){var L=M.get("id"),J=this._paneProperties[L].paneDate,K=o.daysInMonth(o.addMonths(J,-1));if(!this._paneProperties[L].hasOwnProperty("daysInPrevMonth")){this._paneProperties[L].daysInPrevMonth=0;}if(K!=this._paneProperties[L].daysInPrevMonth){this._paneProperties[L].daysInPrevMonth=K;for(var I=5;I>=0;I--){M.one("#"+L+"_"+I+"_"+(I-5)).set("text",K--);}}},_turnPrevMonthOff:function(K){var J=K.get("id");this._paneProperties[J].daysInPrevMonth=0;for(var I=5;I>=0;I--){K.one("#"+J+"_"+I+"_"+(I-5)).setContent("&nbsp;");}},_cleanUpNextMonthCells:function(J){var I=J.get("id");J.one("#"+I+"_6_29").removeClass(t);J.one("#"+I+"_7_30").removeClass(t);J.one("#"+I+"_8_31").removeClass(t);J.one("#"+I+"_0_30").removeClass(t);J.one("#"+I+"_1_31").removeClass(t);},_turnNextMonthOn:function(O){var J=1,N=O.get("id"),K=this._paneProperties[N].daysInMonth,M=this._paneProperties[N].cutoffCol;for(var I=K-22;I<M+7;I++){O.one("#"+N+"_"+I+"_"+(I+23)).set("text",J++).addClass(t);}var L=M;if(K==31&&(M<=1)){L=2;}else{if(K==30&&M===0){L=1;}}for(var I=L;I<M+7;I++){O.one("#"+N+"_"+I+"_"+(I+30)).set("text",J++).addClass(t);}},_turnNextMonthOff:function(N){var M=N.get("id"),J=this._paneProperties[M].daysInMonth,L=this._paneProperties[M].cutoffCol;for(var I=J-22;I<=12;I++){N.one("#"+M+"_"+I+"_"+(I+23)).setContent("&nbsp;").addClass(t);}var K=0;if(J==31&&(L<=1)){K=2;}else{if(J==30&&L===0){K=1;}}for(var I=K;I<=12;I++){N.one("#"+M+"_"+I+"_"+(I+30)).setContent("&nbsp;").addClass(t);}},_afterShowNextMonthChange:function(){var I=this.get("contentBox"),J=I.one("#"+this._calendarId+"_pane_"+(this._paneNumber-1));this._cleanUpNextMonthCells(J);if(this.get("showNextMonth")){this._turnNextMonthOn(J);}else{this._turnNextMonthOff(J);}},_afterShowPrevMonthChange:function(){var J=this.get("contentBox"),I=J.one("#"+this._calendarId+"_pane_"+0);if(this.get("showPrevMonth")){this._turnPrevMonthOn(I);}else{this._turnPrevMonthOff(I);}},_afterHeaderRendererChange:function(){var I=this.get("contentBox").one("."+n);I.setContent(this._updateCalendarHeader(this.get("date")));},_afterCustomRendererChange:function(){this._restoreModifiedCells();this._renderCustomRules();},_afterDateChange:function(){var K=this.get("contentBox"),M=K.one("."+q).one("."+n),L=K.all("."+k),J=this.get("date"),I=0;K.setStyle("visibility","hidden");M.setContent(this._updateCalendarHeader(J));this._restoreModifiedCells();L.each(function(N){this._rerenderCalendarPane(o.addMonths(J,I++),N);},this);this._afterShowPrevMonthChange();this._afterShowNextMonthChange();this._renderCustomRules();this._renderSelectedDates();K.setStyle("visibility","visible");},_initCalendarPane:function(O,V){var I="",K=this.get("strings.very_short_weekdays")||["Su","Mo","Tu","We","Th","Fr","Sa"],L=this.get("strings.weekdays")||["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],N=this.get("strings.first_weekday")||0,Y=this._getCutoffColumn(O,N),J=o.daysInMonth(O),U=["","","","","",""],R={};R["weekday_row"]="";for(var X=N;X<=N+6;X++){R["weekday_row"]+=v(B.WEEKDAY_TEMPLATE,{weekdayname:K[X%7],full_weekdayname:L[X%7]});}R["weekday_row_template"]=v(B.WEEKDAY_ROW_TEMPLATE,R);for(var P=0;P<=5;P++){for(var M=0;M<=12;M++){var Z=7*P-5+M;var T=V+"_"+M+"_"+Z;var W=D;if(Z<1){W=b;}else{if(Z>J){W=t;}}if(Z<1||Z>J){Z="&nbsp;";}var Q=(M>=Y&&M<(Y+7))?"":w;U[P]+=v(B.CALDAY_TEMPLATE,{day_content:Z,calendar_col_class:"calendar_col"+M,calendar_col_visibility_class:Q,calendar_day_class:W,calendar_day_id:T});}}R["body_template"]="";f(U,function(aa){R["body_template"]+=v(B.CALDAY_ROW_TEMPLATE,{calday_row:aa});});R["calendar_pane_id"]=V;R["calendar_pane_tabindex"]=this.get("tabIndex");R["pane_arialabel"]=o.format(O,{format:"%B %Y"});var S=v(v(B.CALENDAR_GRID_TEMPLATE,R),B.CALENDAR_STRINGS);this._paneProperties[V]={cutoffCol:Y,daysInMonth:J,paneDate:O};return S;},_rerenderCalendarPane:function(P,K){var I=this.get("strings.first_weekday")||0,O=this._getCutoffColumn(P,I),J=o.daysInMonth(P),M=K.get("id");K.setStyle("visibility","hidden");K.setAttribute("aria-label",o.format(P,{format:"%B %Y"}));for(var L=0;L<=12;L++){var N=K.all("."+"calendar_col"+L);N.removeClass(w);if(L<O||L>=(O+7)){N.addClass(w);}else{switch(L){case 0:var Q=K.one("#"+M+"_0_30");if(J>=30){Q.set("text","30");Q.removeClass(t).addClass(D);}else{Q.setContent("&nbsp;");Q.addClass(t).addClass(D);}break;case 1:var Q=K.one("#"+M+"_1_31");if(J>=31){Q.set("text","31");Q.removeClass(t).addClass(D);}else{Q.setContent("&nbsp;");Q.removeClass(D).addClass(t);}break;case 6:var Q=K.one("#"+M+"_6_29");if(J>=29){Q.set("text","29");Q.removeClass(t).addClass(D);
}else{Q.setContent("&nbsp;");Q.removeClass(D).addClass(t);}break;case 7:var Q=K.one("#"+M+"_7_30");if(J>=30){Q.set("text","30");Q.removeClass(t).addClass(D);}else{Q.setContent("&nbsp;");Q.removeClass(D).addClass(t);}break;case 8:var Q=K.one("#"+M+"_8_31");if(J>=31){Q.set("text","31");Q.removeClass(t).addClass(D);}else{Q.setContent("&nbsp;");Q.removeClass(D).addClass(t);}break;}}}this._paneProperties[M].cutoffCol=O;this._paneProperties[M].daysInMonth=J;this._paneProperties[M].paneDate=P;K.setStyle("visibility","visible");},_updateCalendarHeader:function(K){var J="",I=this.get("headerRenderer");if(c.Lang.isString(I)){J=o.format(K,{format:I});}else{if(I instanceof Function){J=I.call(this,K);}}return J;},_initCalendarHeader:function(I){return v(v(B.HEADER_TEMPLATE,{calheader:this._updateCalendarHeader(I),calendar_id:this._calendarId}),B.CALENDAR_STRINGS);},_initCalendarHTML:function(L){var K={},I=0;K["header_template"]=this._initCalendarHeader(L);K["calendar_id"]=this._calendarId;K["body_template"]=v(v(B.CONTENT_TEMPLATE,K),B.CALENDAR_STRINGS);function M(){var N=this._initCalendarPane(o.addMonths(L,I),K["calendar_id"]+"_pane_"+I);I++;return N;}var J=K["body_template"].replace(/\{calendar_grid_template\}/g,c.bind(M,this));this._paneNumber=I;return J;}},{CALENDAR_STRINGS:{calendar_grid_class:k,calendar_body_class:A,calendar_hd_class:q,calendar_hd_label_class:n,calendar_weekdayrow_class:s,calendar_weekday_class:C,calendar_row_class:l,calendar_day_class:D,calendar_dayanchor_class:z,calendar_pane_class:H,calendar_right_grid_class:y,calendar_left_grid_class:d,calendar_status_class:g},CONTENT_TEMPLATE:'<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">'+"{header_template}"+'<div class="yui3-u-1">'+"{calendar_grid_template}"+"</div>"+"</div>",ONE_PANE_TEMPLATE:'<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">'+"{header_template}"+'<div class="yui3-u-1">'+"{calendar_grid_template}"+"</div>"+"</div>",TWO_PANE_TEMPLATE:'<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">'+"{header_template}"+'<div class="yui3-u-1-2">'+'<div class = "{calendar_left_grid_class}">'+"{calendar_grid_template}"+"</div>"+"</div>"+'<div class="yui3-u-1-2">'+'<div class = "{calendar_right_grid_class}">'+"{calendar_grid_template}"+"</div>"+"</div>"+"</div>",THREE_PANE_TEMPLATE:'<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">'+"{header_template}"+'<div class="yui3-u-1-3">'+'<div class = "{calendar_left_grid_class}">'+"{calendar_grid_template}"+"</div>"+"</div>"+'<div class="yui3-u-1-3">'+"{calendar_grid_template}"+"</div>"+'<div class="yui3-u-1-3">'+'<div class = "{calendar_right_grid_class}">'+"{calendar_grid_template}"+"</div>"+"</div>"+"</div>",CALENDAR_GRID_TEMPLATE:'<table class="{calendar_grid_class}" id="{calendar_pane_id}" role="grid" aria-readonly="true" aria-label="{pane_arialabel}" tabindex="{calendar_pane_tabindex}">'+"<thead>"+"{weekday_row_template}"+"</thead>"+"<tbody>"+"{body_template}"+"</tbody>"+"</table>",HEADER_TEMPLATE:'<div class="yui3-g {calendar_hd_class}">'+'<div class="yui3-u {calendar_hd_label_class}" id="{calendar_id}_header" aria-role="heading">'+"{calheader}"+"</div>"+"</div>",WEEKDAY_ROW_TEMPLATE:'<tr class="{calendar_weekdayrow_class}" role="row">'+"{weekday_row}"+"</tr>",CALDAY_ROW_TEMPLATE:'<tr class="{calendar_row_class}" role="row">'+"{calday_row}"+"</tr>",WEEKDAY_TEMPLATE:'<th class="{calendar_weekday_class}" role="columnheader" aria-label="{full_weekdayname}">{weekdayname}</th>',CALDAY_TEMPLATE:'<td class="{calendar_col_class} {calendar_day_class} {calendar_col_visibility_class}" id="{calendar_day_id}" role="gridcell" tabindex="-1">'+"{day_content}"+"</td>",NAME:"calendarBase",ATTRS:{tabIndex:{value:1},date:{value:new Date(),setter:function(J){var I=this._normalizeDate(J);if(o.areEqual(I,this.get("date"))){return this.get("date");}else{return I;}}},showPrevMonth:{value:false},showNextMonth:{value:false},strings:{valueFn:function(){return c.Intl.get("calendar-base");}},headerRenderer:{value:"%B %Y"},enabledDatesRule:{value:null},disabledDatesRule:{value:null},selectedDates:{readOnly:true,getter:function(I){return(this._getSelectedDatesList());}},customRenderer:{lazyAdd:false,value:{},setter:function(I){this._rules=I.rules;this._filterFunction=I.filterFunction;}}}});},"3.6.0",{requires:["widget","substitute","datatype-date","datatype-date-math","cssgrids"],lang:["de","en","fr","ja","nb-NO","pt-BR","ru","zh-HANT-TW"]});