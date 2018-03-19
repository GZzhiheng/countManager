/**
 * ngTree is custom plugin
 * 2017/06/21
 */
function ngTree(object  = {}){
	
	var _this = this;							//当前ngTree对象
	this.ele =object.ele ? object.ele : '';   	//结构对象
	this.data =object.data ? object.data : [{}];//树形数据
	this.icon = object.icon==false ? object.icon : true;//默认显示icon，false为全部不显示
	this.defaultIcon =object.defaultIcon ? object.defaultIcon : 'glyphicon-tag'; //默认全局icon
	
	//事件绑定
	this.events = function(){					
		
		//折叠
		$(this.ele).delegate('.fold','click',function(){
			if($(this).hasClass('last'))return;
			$(this).toggleClass('open');
			$(this).siblings('ul').toggle();
			if($(this).data('load') == 'true')return;
			$(this).data('load','true');
			//获取子数据
			var pid = $(this).data('id');
			var tree = _this.build(pid);
			$(this).parent().append(tree);
		});
		
		//跳转uri
		$(this.ele).delegate('.title','click',function(){
			var url = $(this).data('url');
			window.location.href = url;
		})
		
		//hover
		$(this.ele).delegate('.title','mouseover',function(){
			$(this).addClass('hover');
		})
		$(this.ele).delegate('.title','mouseout',function(){
			$(this).removeClass('hover');
		})
		
	}
	
	//设置数据
	this.setData = function(data){
		_this.data = data;
		//避免多次设置重复数据，以覆盖形式解析
		if(object.data || _this.data!=[{}]){
			$(this.ele).html('');
		}
		_this.loadRoot();
		
	}
	
	//解析HTML
	this.build = function(id){
		var tree = $('<ul class="tree"></ul>');
		$.each(this.data,function(a,k){
			if(k.pid == id){
				var fold_flg = false;
				var isLast = 'last';//是否是最后一个节点
				var isShowIcon = ''; //自定义是否显示icon
				var icon = ''; //icon
				for(var i=0; i<_this.data.length; i++){
					if(k.id == _this.data[i].pid){
						fold_flg = true;
					}
				}
				if(fold_flg){
					isLast = '';
				}
				
				icon = k.icon ? k.icon : _this.defaultIcon;//default icon
				if(k.icon===false){
					isShowIcon = 'hide';
				}
				if(_this.icon == false){isShowIcon = 'hide';}
				
				var li = $('<li><i data-id="'+k.id+'" data-load="false" class="fold '+isLast+'"></i><div title="'+k.title+'" data-url="'+k.url+'" class="title"><i class="icon '+isShowIcon+' glyphicon '+icon+'"></i>'+k.title+'</div></li>');
				tree.append(li);
			}
		})
		return tree;
	}
	
	//初始化根列表
	this.loadRoot = function(){ 
		var tree = this.build(0);
		$(this.ele).append(tree);
	}
	
	//初始化状态
	this.init = (function(){	
		if(_this.ele == ''){
			console.log('ngTree未绑定dom结构（容器）(；′⌒`)');
			return;
		} 
		_this.loadRoot();
		_this.events();
	})();
	
}

