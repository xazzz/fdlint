(function(b,a){var c=a.UI;a.mod.unit.Offers={resizeImage:function(d,e){var g=b("#doc").data("doc-config").imageServer,f=b.util.substitute("/images/app/platform/winport/mod/offers/nopic-{0}.png",[e]);return c.resizeImage(d,e,g+f)},initFiltersPanel:function(e){var m=this,g=e.data("filter-config"),d=b("div.filter",e),i=b("input.price-filter",d),l=b("input.mix-filter",d),j=b("input.private-filter",d),k=b("input.group-filter",d),f="input.price-filter,input.mix-filter,input.private-filter,input.group-filter",h=function(n){return n.prop("checked")?"true":"false"};d.delegate(f,"click",function(){var n=g.noneFilterUrl;n=n.replace(/priceFilter=false/,"priceFilter="+h(i));n=n.replace(/mixFilter=false/,"mixFilter="+h(l));n=n.replace(/privateFilter=false/,"privateFilter="+h(j));n=n.replace(/groupFilter=false/,"groupFilter="+h(k));window.location.href=n})}}})(jQuery,Platform.winport);