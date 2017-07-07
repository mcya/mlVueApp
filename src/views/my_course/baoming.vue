<template>
	<div class="my_course_baoming">
		<div class="leibiao">
			<ul>
				<!--<li v-on:click="click_li(1)">已报名</li>-->
				<li v-on:click="click_li(1)">已购买</li>
				<li v-on:click="click_li(2)">收藏</li>
				<li v-on:click="click_li(3)">历史</li>
			</ul>
		</div>
		<div class="red_xian"></div>
		
		<div class="baoming" :class="{btn_checked:checkNum==1}">
			<div class="xian"></div>
			<div class="intro" v-for="yibao in yibaom" v-on:click="baoming_go_play(yibao,yibaom)">
				<div class="left"><img src="img_url+yibao.icon_url"></div>
				<div class="right">
					<p>{{yibao.title}}</p>
					<p class="p2"><img src="../../data/眼.png">{{yibao.browse_num}}人学过</p>
				</div>
				<div class="xixian"></div>
			</div>
			<div v-show=ft class="tishi"><p>{{tishi}}</p></div>
		</div>
		<div :class="{btn_checked:checkNum==2}" class="goumai" >
			<div class="xian"></div>
			<div class="intro" v-for="shou in shouc" v-on:click="go_play(shou,shouc)">
				<div class="left"><img :src="img_url+shou.covers_url"></div>
				<div class="right">
					<p>{{shou.title}}</p>
					<p class="p2"><img src="../../data/眼.png">{{shou.browse_num}}人学过</p>
				</div>
				<div class="xixian"></div>
			</div>
			<div v-show=ft_shouc class="tishi"><p>{{shouc_tishi}}</p></div>
		</div>
		<!--<div class="shoucang" :class="{btn_checked:checkNum==4}">
			<div class="xian"></div>
			<div class="intro" >
				<div class="left"></div>
				<div class="right">
					<p></p>
					<p class="p2"><img src="../../data/眼.png">人学过</p>
				</div>
				<div class="xixian"></div>
			</div>
		</div>-->
		<div class="lishi" :class="{btn_checked:checkNum==3}">
			<div class="my_xian2">
				<p class="red_btn" v-on:click="qingkong">一键清空</p>	
			</div>
			<div class="intro" v-for="lis in lishi" v-on:click="lishi_go_play(lis,lishi)">
				<div class="left"><img :src="img_url+lis.covers_url"></div>
				<div class="right">
					<p>{{lis.title}}</p>
					<p class="p2"><img src="../../data/眼.png">{{lis.browse_num}}人学过</p>
				</div>
				<div class="xixian"></div>
			</div>
			<div v-show=ft_lishi class="tishi"><p>{{lishi_tishi}}</p></div>
		</div>
		<!--<div class="intro">
			<div class="left"></div>
			<div class="right">
				<p>美丽行学院00期</p>
				<p class="p2">000人学过</p>
			</div>
			<div class="xixian"></div>
		</div>
		<div class="intro">
			<div class="left"></div>
			<div class="right">
				<p>美丽行学院00期</p>
				<p class="p2">000人学过</p>
			</div>
			<div class="xixian"></div>
		</div>
		<div class="intro">
			<div class="left"></div>
			<div class="right">
				<p>美丽行学院00期</p>
				<p class="p2">000人学过</p>
			</div>
			<div class="xixian"></div>
		</div>-->
	</div>
</template>
<script>
export default{
	data:function(){
		return {
			checkNum:1,//用于控制切换	
			yibaom:[],
			tishi:'您没有购买任何课程',
			ft:true,//用于控制提示的显示隐藏
			mid:96,
			shouc:[],
			img_url:'http://mlx.oss-cn-hangzhou.aliyuncs.com/',
			lishi:[],
			ft_lishi:true,
			ft_shouc:true,
			lishi_tishi:'',
			shouc_tishi:'',
			id:96,
		}
	},
	mounted:function(){//挂载时候执行的函数
		$(window).scrollTop(0);
		var self=this;
		//从cookie中获取mid
		this.mid = this.$store.state.mid;
		//alert(this.mid);
		//获取购买的数据
		$.ajax({
			url:baseUrl+'/course_info/join_list',
			data:{
				data:'{"biz_type":'+'"t_course_info"'+',"myself":'+true+'}',	
				page:1
			},
			dataType:'jsonp',
			success:function(data){
				//alert(JSON.stringify(data));
				console.log(data);
				self.yibaom=data.list;
				if(data.list.length==0){
					self.tishi='您没有购买任何课程';
					self.ft=true;
				}else{
					self.ft=false;
				}
			}	
		});
		//获取收藏数据
		$.ajax({
			url:baseUrl+'/course_info/collect_self_list',
			data:{
				data:'{"biz_type":'+'"t_course_info"'+',"biz_user":'+this.mid+'}',	
				page:1
			},
			dataType:'jsonp',
			success:function(data){
				//alert(JSON.stringify(data));
				console.log(data);
				self.shouc=data;
				if(data==0){
					self.shouc='您没有收藏任何课程';
					self.ft_shouc=true;
				}else{
					self.ft_shouc=false;
				}
			}	
		});
		//获取用户浏览历史数据
		
		$.ajax({
			url:baseUrl+'/browse/browseListMyself',
			data:{
				data:'{"biz_type":'+'"t_course_info"'+'}',	
				page:1
			},
			dataType:'jsonp',
			success:function(data){
				//alert(JSON.stringify(data));
				console.log(data);
				self.lishi=data;
				if(data==0){
					self.lishi='您没有浏览过任何课程';
					self.ft_lishi=true;
				}else{
					self.ft_lishi=false;
				}
			}	
		});
	},　　
	methods:{
		click_li:function(num){
			$(window).scrollTop(0);
			this.checkNum=num;
			switch (num)
			{
			case 1:
			  $('.red_xian').css('left','8.5%');
			  break;
			case 2:
			 $('.red_xian').css('left','42.5%');
			  break;
			case 3:
			 $('.red_xian').css('left','75.5%');
			  break;
			case 4:
			 $('.red_xian').css('left','79.73333%');
			  break;
			}
		},
		qingkong:function(){
			//alert("清空");
			this.lishi=[];
			$.ajax({
				url:baseUrl+'/browse/browseListMyselfDelete',
				data:{
					data:'{"biz_type":'+'"t_course_info"'+',"biz_id":'+0+'}',	
				},
				dataType:'jsonp',
				success:function(data){
					//alert(JSON.stringify(data));
					console.log(data.msg);
				}	
			});
		},
		go_play:function(shou_l){
			var self=this;
			//alert(JSON.stringify(shou_l));
			self.id=shou_l.id;
			//alert(self.id);
			this.$router.push({name:'play',params:{id:self.id}});
		},
		lishi_go_play:function(lis){
			var self=this;
			//alert(JSON.stringify(shou_l));
			self.id=lis.id;
			//alert(self.id);
			this.$router.push({name:'play',params:{id:self.id}});
		},
		baoming_go_play:function(baoming){
			var self=this;
			//alert(JSON.stringify(shou_l));
			self.id=baoming.id;
			//alert(self.id);
			this.$router.push({name:'play',params:{id:self.id}});
		}
	},
}
</script>
<style lang='scss'>
	
	.my_course_baoming{
		.xian{
			width: 100%;
			height: 13px;
			background-color:#EAEAEA;
		}
		position: relative;
		.baoming,.lishi,.goumai,.shoucang{
			display: none;
			margin-top: 44px;
		}
		.red_xian{
			width: 60/375*100%;
			height: 1px;
			background-color: #fc5a5c;
			position: fixed;
			top: 44px;
			left: 8.5%;
		}
		width: 100%;
		.my_xian2{
			width: 100%;
			height: 44px;
			background-color: #EAEAEA;
			display: inline-block;
			.red_btn{
				width: 127/375*100%;
				height: 30px;
				background-color: #ed3f2f;
				text-align: center;
				line-height: 30px;
				border-radius:4px;
				margin: 0 auto;
				margin-top: 7px;
				font-size: 14px;
				color: #FFFFFF;
			}
		}
		
		.leibiao{
			position: fixed;
			top: 0;
			background-color: #FFFFFF;
			z-index: 999;
			width: 100%;
			height: 44px;
			li{
				width: 33.33%;
				text-align: center;
				float: left;
				line-height: 44px;
				color: #000000;
				font-size: 15px;
			}
		}
		
		.btn_checked{
			display: block;
		}
		.intro{
			width: 100%;
			height: 52px;
			.left{
				width: 34px;
				height: 34px;
				border-radius: 4px;
				background-color: #E5E5E5;
				margin-left: (13/375)*100%;
				margin-top: 9px;
				margin-right: 13/375*100%;
				float: left;
				img{
					width: 34px;
					height: 34px;
					border-radius: 4px;
				}
			}
			.right{
				width: 213/375*100%;
				float:left;
				margin-top:8px;
				p{
					font-size: 14px;
					color: #707070;
				}
				.p2{
					font-size: 12px;
					margin-bottom: 10px;
				}
				img{
					width: 11px;
					height: 8px;
					margin-right: 4px;
				}
				
			}
			.tishi{
					margin-top: 50px;
					width: 100%;
					p{
						width: 50%;
						margin: 0 auto;
						
					}
				}
		}
		.xixian{
			width: 313/375*100%;
			height: 1px;
			background: #bbbbbb;
			float: right;
		}
	}
</style>