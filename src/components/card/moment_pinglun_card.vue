<template>
	<section class="moments_pl_card">
		
		<div class="left_part">
			<i :style='{backgroundImage:handleImg(inf.headimgurl)}'></i>
		</div>
		<div class="right_part">
			<span>{{(typeof inf=='object')?inf.comment_user:'小林'}}</span>
			<b>{{(typeof inf=='object')?handleTime(inf.comment_time):'2222 22:22:22'}}<em @click='beginReply(inf.id)'>回复</em></b>
			<p>{{(typeof inf=='object')?inf.comment_content:'我是内容区'}}</p>
			
		</div>
		<ol v-if='replyisShow'>
			<li v-for='item in inf.reply'>
			<div class="replyName">{{item.comment_user}}</div> <i>回复：</i>{{item.comment_content}}</li>
		</ol>
		<footer v-if='inf.reply&&inf.reply.length&&!replyisShow>0?true:false'>
			<span style="marginRight:0.2rem">{{(typeof inf=='object')?inf.reply[0].comment_user:''}}</span>等人<span @click='replyShow()'>共<b>{{(typeof inf=='object')?inf.reply.length:'0'}}</b>条回复></span>
			
		</footer>
		
	</section>
</template>
<!-- 动态评论列表的一个card -->
<script>
	import $headerimg from '../../icon/find_team.png'
	export default{
		data:function(){
			return{
				replyisShow:false,
			}
		},
		methods:{
			replyShow:function(){//显示回复
				this.replyisShow=true;
			},
			beginReply:function(res){
				this.$emit(this.fn,res);
			},
			handleTime:function(res){
		
				var time =res.split(':');
				return time[0]+':'+time[1];
			},
			handleImg:function(res){
				   
				if(res==''|| res==null){
					return 'url('+$headerimg+')';
				}else{
					if(res.indexOf('http')>-1){//有具体链接
						if(res.indexOf('oss')){//是阿里的图片
							if(res.indexOf('?')){//已经处理
								return 'url('+res+')';
							}else{
								return 'url('+res+'?x-oss-process=image/resize,w_'+54+')';
							}
						}else{//非阿里
							return	'url('+res+')';
						}
					}else{
						return 'url('+'http://mlx.oss.mlxing.com/'+res+'?x-oss-process=image/resize,w_'+54+')';
					}
					
				}
			}
		},
		computed:{
			
		},
		created:function(){
			
			console.log(this.inf );
		},
		props:['inf','fn']
	}
</script>
<style lang='scss'>
.moments_pl_card{
	ol{
		background-color: #f6f6f6;padding: 0.2rem;margin-bottom: 0.3rem;position: relative;top:(-6/20)+rem;margin-left: (0.65+1.9)+rem;max-width: 80%;
		.replyName{
			    font-size: 14px;
			    color: #f74d3f;
			    letter-spacing: 0;
			    display: inline-block;
		}
		i{font-style: normal;color: #ababab;}
	}
	>footer{
		margin-left: (74/20)+rem;padding-bottom:(22/20)+rem;
		font-size:14px;
		color:#000;
		letter-spacing:0;
		
		b,span{
			font-size:14px;
			color:#f74d3f;
			letter-spacing:0;
			font-weight: 200;
		}
		span:nth-of-type(2){margin-left: 10px;}
	}
	/*min-height: 120px;*/padding-top: (18/20)+rem;padding-left: (13/20)+rem;
	background-color: #fff;margin-top: 10px;font-size: 0;position:relative;
	.left_part{
		display: inline-block;margin-right: (13/20)+rem;
		i{width: (38/20)+rem;height:(38/20)+rem;border-radius: 50%; display: inline-block;-webkit-background-size: 100% 100%;
		background-size: 100% 100%;}
	}
	.right_part{
		vertical-align: top;
		max-width: ((249+52)/20)+rem;min-height: 20px;
		display: inline-block;
		
		span{font-size: 14px;color:#f74d3f;letter-spacing:0;display: block;}
		b{
			font-size:14px;line-height: 14px;
			color:#ababab;display: block;
			letter-spacing:0;font-weight: 200;
			text-align:left;margin-bottom:(2/20)+rem;margin-top:(5/20)+rem;
			em{
				font-style: normal;color:inherit;display: inline-block;font-size: inherit;margin-left: 0.5rem;
			}
			em:active{
				color: #000;
			}
		}
		p{
			font-size:15px;display: block;position: relative;
			color:#2a2a2a;line-height: 18px;
			letter-spacing:0;
			text-align:left;margin-bottom: 1rem;
		}
	}
}
</style>
