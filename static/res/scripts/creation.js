var adverts = {
	init:function(){
		this.events();	
		this.methods();
	},
	events:function(){
		
		//显示更改预算ui
		$("#adverts .show-preview").click(function(){
			$("#adverts .budget").toggle();
		})
		
		//广告系列取消预算更改
		$("#adverts .budget-clean").click(function(){
			$("#adverts .budget").hide();
			$("#adverts .preview-content").hide();
		})
		
		//更改预算操作转换
		$("#adverts .budget-type").change(function(){
			switch(parseInt($(this).val())){
				case 0:
					$(this).siblings('span').eq(0).show().siblings('span').hide();
				break;
				case 1:
					$(this).siblings('span').eq(1).show().siblings('span').hide();
				break;
				case 2:
					$(this).siblings('span').eq(2).show().siblings('span').hide();
				break;
			}
		})
		
		//广告系列，更改预览展开隐藏
		$("#adverts .preview").click(function(){
			$("#adverts .preview-content").toggle();
		})

		//广告组，显隐更改出价ui
		$("#advert_group .offer-btn").click(function(){
			$("#advert_group .offer").toggle();
			$("#advert_group .website").hide();
			$("#advert_group .website-preview-content").hide();
		})
		
		//广告组，更改出价的设置
		$("#advert_group .offer-type").change(function(){
			console.log(parseInt($(this).val()));
			switch(parseInt($(this).val())){
				case 0:
					$(this).siblings('span').eq(0).show().siblings('span').hide();
				break;
				case 1:
					$(this).siblings('span').eq(1).show().siblings('span').hide();
				break;
				case 2:
					$(this).siblings('span').eq(2).show().siblings('span').hide();
				break;
			}
		})
		
		//广告组，更改预览展开隐藏
		$("#advert_group .offer-preview").click(function(){
			$("#advert_group .offer-preview-content").toggle();
		})
		
		//广告组取消预算更改
		$("#advert_group .offer-clean").click(function(){
			$("#advert_group .offer").hide();
			$("#advert_group .offer-preview-content").hide();
		})
		
		//广告组，更改网址选项
		$("#advert_group .website-btn").click(function(){
			$("#advert_group .website").toggle();
			$("#advert_group .offer").hide();
			$("#advert_group .offer-preview-content").hide();
		})
		
		//广告组，更改网址选项预览展开隐藏
		$("#advert_group .website-preview").click(function(){
			$("#advert_group .website-preview-content").toggle();
		})
		//广告组，取消预算更改
		$("#advert_group .website-clean").click(function(){
			$("#advert_group .website").hide();
			$("#advert_group .website-preview-content").hide();
		})
		//广告组，添加另一过滤条件
		$("#advert_group .add-condition").click(function(){
			var condition = '<div class="condition-list mt-5">{_<span><input type="text"placeholder="<无变化>"value=""></span>}=<span class="padding-l"><input type="text"placeholder="<无变化>"value=""></span><i title="删除该条过滤条件" class="clean-condition">X</i></div>';
			$(this).before(condition);
		})
		
		$("#advert_group").delegate(".clean-condition","click",function(){
			$(this).parent().remove();
		})
		
		
		
		
		
		
		
	},
	methods:function(){
		
	},
	ajax:function(){
		
	}
}
adverts.init();

//function getData(data){
//	
//	$.ajax({
//		type:"get",
//		url:"http://192.168.31.79:8081/ad/campaign/loadAllCampaign.do",
//		dataType:'jsonp',
//		jsonp: 'callback',
//  	jsonpCallback: 'callbackfunction',
//		contentType: "application/json;utf-8",
//		data:{
//			mcc:"3485762114",
//			accountId:"6730809291",
//			start:"20170312", 
//			end:"20170505"
//		},
//		success:function(res){
//			console.log(res);
//		},
//		error:function(err){
//			console.log(err)
//		}
//		
//	});
//	
//}
//
//getData();
