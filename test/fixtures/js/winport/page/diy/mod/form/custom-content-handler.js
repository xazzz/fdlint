(function(e,d){var b=d.widget.FormUtil,c=d.diy.form.SimpleHandler;var a=e.extendIf({init:function(){c.init.apply(this,arguments);this.contentInput=e("div.html-editor-panel textarea",this.div);e.use("wp-htmleditor",e.proxy(this,"initHtmlEditor"))},initHtmlEditor:function(){var h=this,j=this.config.requestUrl,g=this.config.detailInfoId,k=this.box.data("boxConfig").cid,i=e.extend({},this.config),f=this.contentInput;i.focus=true;if(g==="0"){this.createHtmlEditor(false,i);return}e.ajax(j,{dataType:"jsonp",data:{detailInfoId:g,cid:k,_env_mode_:e("#doc").data("docConfig").isEdit?"EDIT":"VIEW"},success:function(l){h.createHtmlEditor(l.success?l.data:false,i)}})},createHtmlEditor:function(g,f){this.contentInput.val(g||"");this.editor=new d.widget.HtmlEditor(this.contentInput,f)},validate:function(){var f=c.validate.apply(this,arguments);return f&&this.validateContent()},validateContent:function(){if(!this.editor){this.showError(this.contentInput,"编辑器未初始化成功, 请刷新后重试");return false}this.editor.update();var f=e.trim(this.contentInput.val());this.showError(this.contentInput,false);if(!this.validateEmpty(f)){this.showError(this.contentInput,"请输入内容");return false}f=this.filterValue(f);if(f.length>30000){this.showError(this.contentInput,"最多可输入30000个字符，请重新输入");return false}return true},validateEmpty:function(g){var f=/<img\s+/i;return f.test(g)||g.replace(/<[^>]+>/g,"").length>0},filterValue:function(f){return(f||"").replace(/<[^\/][^>]+>/g,function(g){return g.replace(/id=['"][^'"]*['"]/g,"").replace(/class=['"][^'"]*['"]/g,"")})},beforeClose:function(){this.editor&&this.editor.close()},showError:function(g,f){return b.showMessage(g,f,"error")}},c);d.diy.form.CustomContentHandler=a})(jQuery,Platform.winport);