(function(c,b){var d=b.UI;var a={init:function(g,f){g=c(g);if(g.closest("div.grid-main").length){var e=c("div.info-image img",g);d.resizeImage(e,{size:300,success:function(){g.trigger("afterinit")}})}}};b.ModContext.register("wp-company-info",a)})(jQuery,Platform.winport);