<template>
	<div class="lottery-start">
		<div v-for="list in activeList">
			<c-btn class="green" v-show="!list.flag" :text="'激活 '+list.name" fn="sfn" @sfn="startFun(list.id)"></c-btn>
			<c-btn v-show="list.flag" :text="'关闭 '+list.name" fn="sfn" @sfn="stopFun(list.id)"></c-btn>
		</div>
	</div>
</template>
<script>
	import c_btn from '../../components/btn.vue'
	export default{
		data(){
			return{
				activeList:[],
			}
		},
		mounted:function(){
			this.getActive();
		},
		components:{
			"c-btn":c_btn,
		},
		methods:{
			startFun:function(activeId){
				var self = this;
				$.ajax({
					url:'http://mall.mlxing.com/api/prize/activityState',
					data:{
						"activityId":activeId,
						"flag":1
					},
					dataType:'jsonp',
					success:function(res){
						if(res.code==0){
							/*console.log(self.activeList);
							for(var i=0;i<self.activeList.length;i++){
								if(self.activeList[i].id = activeId){
									self.activeList[i].flag = 1
								}
							}	*/	
							self.getActive();					
						}else{
							alert(res.msg)
						}
					}
				})
			},
			stopFun:function(activeId){
				var self = this;
				$.ajax({
					url:'http://mall.mlxing.com/api/prize/activityState',
					data:{
						"activityId":activeId,
						"flag":0
					},
					dataType:'jsonp',
					success:function(res){
						if(res.code==0){
							self.getActive();
							/*alert(213);
							console.log(self.activeList);
							for(var i=0;i<self.activeList.length;i++){
								if(self.activeList[i].id = activeId){
									self.activeList[i].flag = 0
								}
							}*/
						}else{
							alert(res.msg)
						}
					}
				})
			},
			getActive:function(){
				var self = this;
				$.ajax({
					url:'http://mall.mlxing.com/api/prize/getActivity',
					data:{
						"flag":2
					},
					dataType:'jsonp',
					success:function(res){
						if(res.code==0){
							self.activeList = res.response;
							console.log(self.activeList);
						}else{
							alert(res.msg)
						}
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.lottery-start{
		.green{
			background-color: rgba(62, 160, 59,0.65);
			&:active{
				background-color: rgba(62, 160, 59,1);
			}
		}
	}
</style>