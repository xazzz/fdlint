(function(b,a){var c={validate:function(d,g){var f=this,e=this._getValidator(g);if(!e){b.error("validator is not exist")}d=b(d);d.bind("input propertychange",function(){var h=b(this),i=h.data("instant-validator-value")||"",j=h.val();if(!j||e.test(j)){h.data("instant-validator-value",j)}else{setTimeout(function(){h.val(i)},50)}});d.triggerHandler("input")},_getValidator:function(e){var d=b.type(e);return d==="string"?this.types[e]:d==="regexp"?e:d==="function"?{test:e}:null}};c.types={price:/^[\d]{0,9}(\.[\d]{0,2})?$/,pagenum:/^[1-9]\d*$/};a.widget.InstantValidator=c;b.add("wp-instantvalidator")})(jQuery,Platform.winport);