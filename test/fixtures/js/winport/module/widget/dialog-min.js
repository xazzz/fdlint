(function(c,b){var a=new b.Class({__$template:'<div class="d-body">			<% if (header) { %>			<div class="d-header">				<h3><%= header %></h3>				<% if (hasClose) { %>				<a class="d-close" href="#"></a>				<% } %>			</div>			<% } %>			<div class="d-content">				<%= content %>			</div>			<% if (hasFooter) { %>			<div class="d-footer">				<div class="d-confirm-loading"></div>				<div class="d-btn-wrap">				<% foreach (buttons as button) { %>					<a href="#" class="<%= button["class"] %>" href="javascript:;">						<span><%= button.value %></span>					</a>				<% } %>				</div>			<% } %>			</div>		</div>',init:function(d){d=this.config=c.extend({header:false,center:true,hasClose:true,buttons:[]},d);var e=d.content;if(typeof e!=="string"){d.content='<div class="d-loading">���ڼ���...</div>';this.__$contentLoader=e}d.hasFooter===undefined&&(d.hasFooter=!!d.buttons.length);if(d.contentUrl){this.__$contentLoader=c.proxy(this,"__$ajaxContentLoader")}this.__$loadTemplate(c.proxy(this,"__$openDialog"))},__$ajaxContentLoader:function(g){var f=this.config,e=function(){g(false)},d=c.extend({cache:false},f.ajaxParams);d.data=d.data||f.contentParams;c.extend(d,{success:function(h){if(!h||/<html[^>]*>/i.test(h)){e();return}g(h)},error:e});c.ajax(f.contentUrl,d)},__$loadTemplate:function(f){var d=this,e=a._template;if(e){return f(e)}c.use("web-sweet",function(){var g=a._template=FE.util.sweet(d.__$template);f(g)})},__$openDialog:function(g){var e=this,f=this.config,h=null,d=["ui-dialog"];h=this.node=c("<div>").html(g.applyData(f));this.__$configNode(h,f);if(f.beforeOpen&&f.beforeOpen(this)!==false){return}if(f.draggable){d.push("ui-draggable")}c.use(d,function(){h.dialog(e.__$getDialogConfig(f));e.__$handleEvents();if(e.__$contentLoader){e.__$loadContent()}else{e.__$contentSuccess()}})},__$configNode:function(e,d){e.addClass((d.defaultClassName||"wp-dialog")+" "+(d.className||""));d.width&&c("div.d-body",e).css("width",d.width);d.height&&c("div.d-loading",e).css({height:d.height,"line-height":d.height});d.centerFooter&&c("div.d-footer",e).addClass("align-center")},__$getDialogConfig:function(g){var e=this,f={shim:true,center:g.center},d=g.draggable;if(d){f.draggable=c.isPlainObject(d)?d:{handle:"div.d-header"}}if(g.beforeClose){f.beforeClose=function(){return g.beforeClose(e)}}return f},__$handleEvents:function(){this.__$handleBtnEvents();this.__$handleDefaultEvents()},__$handleBtnEvents:function(){var d=this,e=this.config,f=this.node;c.each(["close","cancel","confirm"],function(g,h){c(".d-"+h,f).bind("click",function(i){i.preventDefault();var j=c(this);if(j.data("dialog-running")){return}j.data("dialog-running",true);setTimeout(function(){j.data("dialog-running",false)},500);e[h]?e[h](d):d.close()})})},__$handleDefaultEvents:function(){var d=this,e=c(".d-default",this.node).eq(0);if(!e.length){return}this.__$defaultEventHandler=function(f){if(f.keyCode===13){e.click();return false}};c(document).bind("keydown",this.__$defaultEventHandler)},__$loadContent:function(d){var f=this,g=this.config,e=this.getContainer(),d=d||this.__$contentLoader;d(function(h){h=h||'<div class="d-error">���緱æ����ˢ�º�����</div>';e.html(h);f.__$contentSuccess()})},__$contentSuccess:function(){var d=this,e=this.config;if(!e.contentSuccess){return}c.util.ua.ie6?setTimeout(function(){e.contentSuccess(d)},0):e.contentSuccess(this)},reload:function(d){return this.__$loadContent(d)},setTitle:function(d){c("d-header h3",this.node).text(d)},setContent:function(d){this.getContainer().html(d)},getContainer:function(){if(!this.__$container){this.__$container=c("div.d-content",this.node)}return this.__$container},close:function(){this.__$defaultEventHandler&&c(document).unbind("keydown",this.__$defaultEventHandler);return this.node.dialog("close")},submit:function(){this.config.confirm&&this.config.confirm(this)},showLoading:function(h){var e=this,g=this.node,i=c("div.d-confirm-loading",g),d=c("div.d-btn-wrap",g),f=c("a.d-confirm",g);if(h===false){i.hide();d.show()}else{i.html(h);d.hide();i.show()}}});a.open=function(d){return new a(d)};b.widget.Dialog=a;c.add("wp-dialog")})(jQuery,Platform.winport);