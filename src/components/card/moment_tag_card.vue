<template>
<transition name='fade'>
	<dl class='c_tag_card' @click='toTagPage'>
	
		<!-- <dt  :style='{backgroundImage:handleImg(inf.small_icon,{width:250,center:true,bg:true},"tag")}'>
			
		</dt> -->
		<dt :class="{default_bg:!inf.small_icon}" :style='{backgroundImage:inf.small_icon?handleImg(inf.small_icon,{width:250,center:true,bg:true}):"","background-size":inf.small_icon?"100% 100%":""}'>
			
		</dt>
		<dd :style='{width:contentWidth}'>
			
			<h5>{{title}}</h5>
			<p>{{content}}</p>
			<span>{{number}}</span>
		
		</dd>
	
	</dl>
</transition>
</template>
<script>
import $handleImg from '../../widget/handleImg.js';
	export default{
		data:function(){
			return{
				
			}
		},
		mounted:function(){
		},
		computed:{
			contentWidth(){
				return $(window).width()-13-66-30+'px';
			},
			title(){
				if(this.inf.tag_content){
					return '#'+this.inf.tag_content+'#';
				}else{
					return '热门标签'
				}
			},
			content(){
				if(this.inf.remark){
					return this.inf.remark;
				}else{
					return '一起来参与话题讨论吧';
				}
			},
			number:function(){
				return this.inf.use_num+'条动态'
				
			}
		},
		props:['inf'],
		methods:{
			handleImg:$handleImg,
			toTagPage:function(){
				var self = this;
				this.$store.state.moments.leavePlace=$(window).scrollTop();
				this.$router.push({'name':'tag_list',params:{msg:self.inf.tag_content}})
			}
		}
	}
</script>
<style lang='scss'>
.c_tag_card{
	max-width: 100%;
	padding:13px;
	font-size: 0;
	min-height: 67px;
	background: #fff;
	margin-bottom: 10px;
	dt{
		display: inline-block;
		width: 66px;height: 66px;
		/*-webkit-background-size: 100% 100%;
		background-size: 100% 100%;*/
		/*border-radius:4px;*/
		margin-right: 13px;
		background-repeat: no-repeat;vertical-align: top;
	}
	dd{
		display: inline-block;vertical-align: top;
		h5{
			height: 16px;
			line-height: 16px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-overflow:ellipsis;
			font-size: 15px;font-weight: 100;
			color:#000;margin-bottom: 6px;
		}
		p{
			font-size: 12px;
			line-height: 14px;
			color: #363636;
			/*margin-bottom: 3px;*/
			width: 100%;
			height:28px;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		span{
			color: #c4c4c4;font-size: 12px;
		}
	}
}
</style>