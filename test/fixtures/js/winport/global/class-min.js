(function(b,a){a.Class=function(d,f){if(!f){f=d;d=null}d=typeof d==="function"?d.prototype:d;var c=function(){this.parent=this.parent||d;this.init&&this.init.apply(this,arguments)},e=d?b.extend({},d,f):f;c.prototype=e;return c}})(jQuery,Platform.winport);