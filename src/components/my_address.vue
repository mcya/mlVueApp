<template>
	<div class='my_address'>
		<div class='search'><b class='icon-sousuo iconfont'></b><span>搜索</span></div>
		<article>不显示位置</article>
		<section>
			<p>广州市</p>
			<span>当前所在区域</span>
		</section>
		<section>
			<p>广州市</p>
			<span>当前所在区域</span>
		</section>
		<section>
			<p>广州市</p>
			<span>当前所在区域</span>
		</section>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
	}
</script>
<style lang='scss'>
	.my_address{
		padding-top:7px;
		.search{
			border:2px solid #ddd;height: 27px;margin:0 auto;margin-bottom: 5px;
			width: (357/20)+rem;border-radius: 4px;line-height: 27px;text-align: center;
			span{color: #888888;margin-left: 6px;}
			b{color: #888888;}
		}
		article{height: 2rem;line-height: 2rem;font-size: 15px;color: #646464;padding-left: (11/20)+rem;border-top:2px solid #ddd;border-bottom:2px solid #ddd;}
		section{
			border-bottom:2px solid #ddd;padding-left: (11/20)+rem;
			padding-bottom: 7px;
			p{line-height: 30px;color: #646464;font-size: 15px;}
			span{line-height: 12px;font-size: 12px;color:#aaa;}
		}
	}
</style>