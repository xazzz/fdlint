(function(c,b){var a={getFormData:function(d){d=c(d);var e={},f=d.serializeArray();c.each(f,function(){e[this.name]=this.value});c(":checkbox",d).each(function(){var g=this.name;g&&(e[g]=!!e[g])});return e},setFormData:function(d,e){d=c(d);c.each(e,function(f){var g=d[f];if(!g){return}if(g.is(":checkbox,:radio")){g.attr("checked",!!this)}else{g.val(this)}})},showMessage:function(i,g,f,h){i=c(i);var d=i.data("message-advice"),e=null;if(!d){h=h||function(l,k){var j=l.closest("dd");if(!j.length){j=l.closest("div")}return j.find(".message")};d=h(i,f);i.data("message-advice",d)}e=d.data("message-type");e&&d.removeClass(e);if(g){f&&d.addClass(f).data("message-type",f);d.html(g).show()}else{d.hide()}}};b.widget.FormUtil=a;c.add("wp-formutil")})(jQuery,Platform.winport);