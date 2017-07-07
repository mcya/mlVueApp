<template>
	<ul class="moment_zanshare_card">
		<li v-for='item in inf'>
			<b :style='{backgroundImage:handleImg(item.headimgurl,{width:42,height:42,bg:"true"})}' 
			v-on:click='returnImg([handleImg(item.headimgurl,{width:winWidth})],0)'
			></b>
			<span>{{item.nickname||'神秘的用户'}}</span>
		</li>
	</ul>
</template>

<script>
import $handleImg from '../../widget/handleImg.js'
	export default{
		name:'moment_zanshare_card',
		data:function(){
			return {

			}
		},
		props:['inf','fn'],
		created:function(){
		},
		methods:{
			handleImg:$handleImg,
			returnImg:function(images,idx){//返回图片的信息,用于放大镜
				this.$emit(this.fn,{images,idx});
			}
		},
		computed:{
			winWidth:function(){
				return $(window).width();
			}
		}

	}
</script>
<style lang='scss'>
.moment_zanshare_card{
	width: 100%;background-color: #fff;margin-top: 0.4rem;padding-top: 3px;
	li{
		height: (50/20)+rem;border-top: 1px solid #ddd;line-height: (50/20)+rem;
		b{
			height: 42px;width: 42px;background-color: #ccc;border-radius: 50%;vertical-align: middle;
			display: inline-block;margin-left:10px;margin-right:0.6rem;
			-webkit-background-size: 100% 100%;
			background-size: 100% 100%;
		}
	}
}
</style>