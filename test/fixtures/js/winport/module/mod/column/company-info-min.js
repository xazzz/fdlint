(function(d,c){var f=c.Util,e=c.UI,a=c.widget.Tabs;var b={init:function(h,g){this.div=h;this.config=g;this.initBrief();this.initSatRemarkCount();this.initVideo();this.initEquip()},initBrief:function(){var g=d("div.info-brief div.info-image",this.div);e.resizeImage(d("img",g),300);this.initImagePaging(g)},initImagePaging:function(h){var l=d("ul.info-image-list",h),m=d("li",l),k=[],g="";if(m.length<=1){return}for(var j=0,n=m.length;j<n;j++){g=d.util.substitute('<li><a href="#">{0}</a></li>',[j+1]);k.push(g)}h.append('<ul class="tabs-nav">'+k.join("\n")+"</ul>");m.hide();k=d("ul.tabs-nav li",h);autoSwitch={hoverStop:h};new a(k,m,{autoSwitch:autoSwitch})},initSatRemarkCount:function(){var g=this.config.satisfactionRateUrl,h=d("td.satisfaction-remark-count:first",this.div);if(!g||!h.length){return}d.ajax(g,{data:{memberId:c.Component.getDocConfig().uid},dataType:"jsonp",success:function(i){if(!i.success){return}var j=(i.data||{}).remarkCount;j!==undefined&&h.text(j+" ��")}})},initVideo:function(){var g=d("div.video-panel",this.div),i=this.config.companyVideoUrl,h=this.config.companyVideoSite,j=null;if(!g||!i||!h){return}j=this.Video[h];if(j){j(g,i,this.config)}else{d.error("player for "+h+" not exists")}},initEquip:function(){var g=this,h=d("div.info-equip",this.div),i=d("div.image img",h);e.resizeImage(i,110);h.delegate("div.image a,div.name a","click",function(j){j.preventDefault();g.showEquipDetail(this)})},showEquipDetail:function(i){var g=d(i).closest("li"),h=d("textarea.html-template",g).val();d.use("wp-dialog",function(){var j=c.widget.Dialog;j.open({className:"equip-detail-dialog",header:"��ϸ��Ϣ",content:h})})}};b.Video={tudou:function(g,h){d.use("ui-flash",function(){g.flash({swf:"http://marketing.tudou.com/alibaba/SPlayerStandard.swf",width:480,height:388,allowFullScreen:true,flashvars:{playList:h,autoPlay:false}})})},ku6:function(g,h){d.use("ui-flash",function(){g.flash({swf:h,width:480,height:404,allowFullScreen:true,flashvars:{color:"A01313",jump:0,fu:1,deflogo:0,adss:0,adj:0,recommend:0,bv:0,pv:0}})})}};c.ModContext.register("wp-company-info-column",b)})(jQuery,Platform.winport);