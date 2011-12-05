(function(e,c){var f=c.Util,a=c.mod.unit.Paging,b=c.widget.FormUtil;var d={init:function(h,g){this.div=h;this.formPanel=e("div.feedback-form",h);this.form=e("form",this.formPanel);this.successPanel=e("dl.feedback-success",h);this.isLogin=e("#doc").data("doc-config").isLogin;this.initNotice();this.initPaging();this.form&&this.initForm()},initNotice:function(){var k=e("div.feedback-notice",this.div),h=e("a.login",k),i=e("a.register",k),j=null,g=null;if(h.length){j=f.formatUrl(h.attr("href"),{targetUrl:window.location.href});h.attr("href",j)}if(i.length){g=f.formatUrl(i.attr("href"),{leadUrl:j});i.attr("href",g)}},initPaging:function(){var g=e("div.wp-paging-unit",this.div);new a(g)},initForm:function(){this.feedbackText=e("dl.feedback-content textarea:first",this.form);this.checkCodeText=e("dl.check-code input.input-text:first",this.form);this.submitBtn=e("div.form-footer a.submit:first",this.form);this.checkCodeImg=e("a.refresh-img img",this.form);this.checkCodeUrl=this.checkCodeImg.attr("src");this.initFloagLogin();this.handleValidate();this.handleSubmit();this.handleSuccessPanel();this.handleCheckCode()},initFloagLogin:function(){var g=this,h=[this.feedbackText[0],this.checkCodeText[0],this.submitBtn[0]];e(h).click(function(i){if(g.isLogin){return}FD.Member.LR.show({onLoginSuccess:function(){window.location.reload()},onRegistSuccess:function(){window.location.reload()}});return false})},handleValidate:function(){var g=this,h=[this.feedbackText,this.checkCodeText],i=["validateFeedback","validateCheckCode"];e.each(h,function(k){var l=this,j=i[k];l.blur(function(){g[j]()});l.focus(function(){g.showError(l,false)})})},validateFeedback:function(){var h=this.feedbackText,g=e.trim(h.val());this.showError(h,false);if(!g){this.showError(h,"请输入您的留言内容");h.val("");return false}if(g.length<10||g.length>1500){this.showError(h,"留言内容请控制在10-1500个字符");return false}return true},validateCheckCode:function(){var h=this.checkCodeText,g=e.trim(h.val());this.showError(h,false);if(!g){this.showError(h,"请输入校验码");h.val("");return false}return true},handleSubmit:function(){var g=this,h=function(i){i.preventDefault();if(!g.isLogin||g.running){return}g.validate()&&g.submit()};this.form.submit(h);this.submitBtn.click(h)},validate:function(){this.showError(this.submitBtn,false);return this.validateFeedback()&&this.validateCheckCode()},showError:function(h,g){b.showMessage(h,g,"error")},submit:function(){var g=this,h=this.form.attr("action"),i=this.form.serialize();this.running=true;e("span",this.submitBtn).html("正在发送...");this.submitBtn.addClass("sending");e.ajax(f.formatUrl(h,"_input_charset=UTF-8"),{type:"POST",dateType:"json",data:i,success:e.proxy(this,"submitSuccess"),complete:e.proxy(this,"submitComplete")})},submitSuccess:function(g){if(g.success){this.form[0].reset();this.formPanel.hide();this.successPanel.show()}else{this.showErrorMessage(g.data||[])}},submitComplete:function(){this.running=false;e("span",this.submitBtn).html("发送留言");this.submitBtn.removeClass("sending");this.refreshCheckCode()},showErrorMessage:function(j){j=j[0]||{};var g={checkCodeFailure:this.checkCodeText,content:this.feedbackText},i={checkCodeFailure:"校验码不正确，请重新输入"},h=j.message||i[j.errorCode]||"留言发送失败，请刷新后重试",k=g[j.errorCode]||g[j.fieldName]||this.submitBtn;this.showError(k,h)},handleSuccessPanel:function(){var g=this,h=e("a.continue",this.successPanel);h.click(function(){g.formPanel.show();g.successPanel.hide();return false})},handleCheckCode:function(){var h=this,g=e("a.refresh-img,a.refresh-link",this.form);g.click(function(){h.refreshCheckCode();return false})},refreshCheckCode:function(){var g=f.formatUrl(this.checkCodeUrl,{_:e.now()});this.checkCodeImg.attr("src",g);this.checkCodeText.val("")}};c.ModContext.register("wp-feedback-detail",d)})(jQuery,Platform.winport);