if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/aui-tpl-snippets-checkbox-deprecated/aui-tpl-snippets-checkbox-deprecated.js']) {
   __coverage__['build/aui-tpl-snippets-checkbox-deprecated/aui-tpl-snippets-checkbox-deprecated.js'] = {"path":"build/aui-tpl-snippets-checkbox-deprecated/aui-tpl-snippets-checkbox-deprecated.js","s":{"1":0,"2":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":48},"end":{"line":1,"column":67}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":13,"column":78}},"2":{"start":{"line":3,"column":0},"end":{"line":10,"column":2}}},"branchMap":{},"code":["(function () { YUI.add('aui-tpl-snippets-checkbox-deprecated', function (A, NAME) {","","A.Template.register(","    'checkbox', [","  '<input class=\"{[A.TplSnippets.getClassName(values.auiCssClass, values.cssClass)]}\" <tpl if=\"values.disabled\">disabled=\"disabled\"</tpl> id=\"{id}\" name=\"{name}\" placeholder=\"{placeholder}\" size=\"{size}\" style=\"{style}\" type=\"checkbox\" value=\"{value}\" />',","  '<tpl if=\"values.label !== undefined\">',","   '<label class=\"{[A.TplSnippets.getClassName(values.auiLabelCssClass, values.labelCssClass)]}\" for=\"{id}\" id=\"{labelId}\" name=\"{labelName}\" style=\"{labelStyle}\">{label}</label>',","  '</tpl>'"," ]",");","","","}, '3.0.3-deprecated.32', {\"requires\": [\"aui-tpl-snippets-base-deprecated\"]});","","}());"]};
}
var __cov_AKO1kGQcvV1VhceBq2BMww = __coverage__['build/aui-tpl-snippets-checkbox-deprecated/aui-tpl-snippets-checkbox-deprecated.js'];
__cov_AKO1kGQcvV1VhceBq2BMww.s['1']++;YUI.add('aui-tpl-snippets-checkbox-deprecated',function(A,NAME){__cov_AKO1kGQcvV1VhceBq2BMww.f['1']++;__cov_AKO1kGQcvV1VhceBq2BMww.s['2']++;A.Template.register('checkbox',['<input class="{[A.TplSnippets.getClassName(values.auiCssClass, values.cssClass)]}" <tpl if="values.disabled">disabled="disabled"</tpl> id="{id}" name="{name}" placeholder="{placeholder}" size="{size}" style="{style}" type="checkbox" value="{value}" />','<tpl if="values.label !== undefined">','<label class="{[A.TplSnippets.getClassName(values.auiLabelCssClass, values.labelCssClass)]}" for="{id}" id="{labelId}" name="{labelName}" style="{labelStyle}">{label}</label>','</tpl>']);},'3.0.3-deprecated.32',{'requires':['aui-tpl-snippets-base-deprecated']});
