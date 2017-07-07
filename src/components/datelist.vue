<template>
	<article class="dateList " >
		<div class='dalist-bg' @click='onHide' v-if='showValue'></div>
		<div class='datelist-content' v-if='showValue'>
			<header><button @click='changeMonth(-1)'>上一个月</button><span>{{year()}}年{{month()}}月</span><button @click='changeMonth(1)'>下一个月</button></header>	
			<div >
				<ul>
					<li class="firstline">
						<span style="color:#e02d2d">周日</span>
						<span >周一</span>
						<span >周二</span>
						<span >周三</span>
						<span >周四</span>  
						<span >周五</span>
						<span style="color:#e02d2d">周六</span>
				    </li>
				    <li v-for='n in line' >
				    	<section v-for='x in 7' v-on:click='isClick((7*(n-1)) +(x)-1)' 
				    	:class='{unChecked:unChecked[(7*(n-1)) +(x)-1]}'>
				    		<div class="listoverlay">
				    			<div class="date" :class='{weekend:weekendGroup[(7*(n-1)) +(x)-1]}'>{{date[(7*(n-1)) +(x)-1]}}</div>
					    		<div class="nong" :class='{specialDay:specialGroup[(7*(n-1)) +(x)-1]}'>{{nongli[(7*(n-1)) +(x)-1]}}</div>
					    		<div class="flag" v-if='false'>{{date[(7*(n-1)) +(x)]?'旗子':''}}</div>
				    		</div>
				    		
				    	</section> 
				    </li>
				</ul>
			</div>
		</div>
		
	</article> 
</template>
<script>
	import {initial,changeCld} from '../widget/datelist/datelist.js'
	export default{
		data(){
			return{
				line:6,
				GZ:'',
				date:[],
				nongli:[],
				changeTime:'',
				curTime:'',
				showValue:false,
			}
		},
		watch:{
			value(value){
				
			    this.showValue = this.value
			    if(value){
			    	window.addEventListener('touchmove',this.handle,false);
			    }else{
			    	window.removeEventListener('touchmove',this.handle);
			    }

			}
		},
		props: {
			value: Boolean,
		},
		computed:{
			weekendGroup:function(){
				var arr = new Array(42);
				for(var i=0;i<42;i++){
					if(i%7==0 ||(i+1)%7==0){
						arr[i]='specialClass';
					}
				}
				return arr;
			},
			specialGroup:function(){
				var arr = new Array(42);
				return arr;
			},
			unChecked:function(){
				var arr = new Array(42);
				return arr;
			},
		},
		created:function(){
		      	this.curTime = new Date();
				this.changeTime = new Date(this.curTime);
			
		},
		destroyed:function(){
			window.removeEventListener('touchmove',this.handle);
		},
		mounted:function(){
			if (typeof this.value !== 'undefined') {
		      this.showValue = this.value;
		    }		
				for(var i=0;i<42;i++){
					this.date.push('');
					this.nongli.push('');
				}
				var obj = initial(this);
				this.date = obj.date;
				this.nongli = obj.nong;
				this.checkSpecial();
				this.removeSpace();
		},
		methods:{
			onHide(){
				this.showValue=false;
				window.removeEventListener('touchmove',this.handle);
				this.$emit('on-date-hide',false);
			},
			handle:function(e){
				e.preventDefault();
			},
			computedAbletoCheck(){//判断能否选择，过时间就不能选
				if(this.changeTime.getFullYear()<this.curTime.getFullYear()){//年份少于的肯定不能选
					for(var i=0;i<this.unChecked.length;i++){
					
						this.unChecked[i]=true;
					}
				}else if(this.changeTime.getMonth()<this.curTime.getMonth() && this.changeTime.getFullYear()==this.curTime.getFullYear()){
					for(var i=0;i<this.unChecked.length;i++){
					
						this.unChecked[i]=true;
					}
				}else if(this.changeTime.getMonth()==this.curTime.getMonth() && this.changeTime.getFullYear()==this.curTime.getFullYear()){//判断天数
					var index,isFind=false;
					for(var i=0;i<this.date.length;i++){
						if(this.date[i]==this.curTime.getDate()){//如果当前是31号，就会遍历不到
							index=i;
							isFind=true;
							break;
						}
					}
					//小于这个天数的都加fasle
					for(var x=0;x<(isFind?index:42);x++){
						this.unChecked[x]=true;
					}
				}
			},
			isClick:function(index){
				if(this.unChecked[index]==true){
					return
				}
				this.showValue = false;
				this.$emit('on-check-date',this.changeTime.getFullYear()+'-'+(this.changeTime.getMonth()+1)+'-'+this.date[index]);
			},
			checkSpecial:function(){
				for(var i=0;i<this.specialGroup.length;i++){
					this.specialGroup[i]='';
					
					this.unChecked[i]='';
				}
				for(var x=0;x<this.nongli.length;x++){
					
					var reg = /[初十廿三][一二三四五六七八九十]/;
					if(reg.test(this.nongli[x])){
						this.specialGroup[x]=false;
					}else{
						this.specialGroup[x]=true;
					}
					
				}
				this.computedAbletoCheck();
				
			},
			removeSpace:function(){
				if(this.date[35]==''){
					this.line = 5;
				}
			},
			month:function(){
				return this.changeTime.getMonth()+1;
			},
			year:function(){
				return this.changeTime.getFullYear();
			},
			changeMonth:function(val){
				this.changeTime.setMonth(this.changeTime.getMonth()+val);
				var obj = changeCld();
				this.line = 6;
				this.date = obj.date;
				this.nongli = obj.nong;
				this.checkSpecial();
				this.removeSpace();
			}
		}
	}
</script>
<style lang='scss'>
	.dateList{

		.dalist-bg{
			height: 100%;
			width: 100%;
			position: fixed;
			background-color: rgba(0,0,0,0.68);
			top:0;left: 0;
			z-index: 500;
		}
		.datelist-content{
			padding-top:3px;
			position: fixed;
			z-index: 501;
			left: 0;
			top:50%;
			margin-top: -(2.65*6+1.3)/2+rem;
			background-color: #fff;
			width: 100%;
		}
		
		padding-top:5px;background-color: #fff;
		.specialDay{/*特殊节日*/ 
				color:#e02d2d!important;
		}
		.weekend{/*休息日*/ 
				color: #e02d2d!important;
		}
		header{
			fontsize:18px;color:#000;text-align: center;height:  1.3rem;line-height: 1.3rem;
			span{margin:20px;}
			button{
				height: 1.3rem;line-height: 0.9rem;padding:0.2rem;
			}
		}
		.firstline{
			height: 2.1rem;
		}
		li{
			height: (53/20)+rem;font-size:0;border-bottom: 2px solid #e9e9e9;width: 100%;
			section,span{
				width:14.28574%;display: inline-block;text-align: center;font-size: 13px;vertical-align: middle;position: relative;height: 100%;color:#000;
			}
			section:before,span:before{
				display: inline-block;content: '';height: 100%;width: 0;vertical-align: middle;
			}
			.listoverlay{
				display: inline-block;vertical-align: middle;
			}
		}
		.date,.nong,.flag{
			font-size: 13px;line-height: 16px;color:#000;
		}
		li:before{
			display: inline-block;content: '';height: 100%;width: 0;vertical-align: middle;
		}
		.unChecked{
			opacity: 0.3;
		}
	}

</style>