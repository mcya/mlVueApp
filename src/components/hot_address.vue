<template>
	<div class="hot_address" ref='root'>
		<c-alter :text='showLetter' :show='showLetter'></c-alter>
		<div class="cur_add">当前位置 {{curCity}}</div>
		
		<div class="closeParent">
			<div class="add_search icon-sousuo iconfont" v-bind:class='{foucus_search:add_search}' v-on:click.stop='focusSearchWin("div")'>
				<input type="text" @blur='blurSearchWin' @change='blurSearchWin' v-model='searchVal'  ref='searchInput' 
				v-on:click.stop='focusSearchWin("input")' />
			</div>
			<div class='close'  v-on:click='isClick("")'>清空</div>
		</div>
		<ul class="hot_city" v-show='hotcityShow'>
			<h3>热门城市</h3>
			<li v-for='city in hotCitys' v-on:click='isClick(city)' >{{city}}</li>
		</ul>
		<ul class="chinese_city">
			<h3>国内城市</h3>
			<li v-for='city in chineseCity' class="city" v-on:click='isClick(city)' ref='each_city' v-show='isSearch(city)'>{{city}}</li>
			<li class="city" v-if='notFind'>未找到对应城市</li>
		</ul>
		<div class="initials">
			<ul>
				<li :style="{height:sideBarHeight}" v-on:click='toTop()'><img src="../icon/c_sort.png"></li>
				<li :style="{height:sideBarHeight}"  v-for='list in sideBar'  v-on:click='moveToClass(list)'>{{list}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
import c_alter from '../components/alert'
import $citys from '../data/city_data.json'; 
import $all_citys from '../data/new_city_data.json'; 
import $scrollTo from '../widget/scrollTo';

	export default{
		data(){
			return{
				notFind:false,
				hotcityShow:true,
				searchVal:'',
				hotCitys:'',
				chineseCity:[],
				sideBar:[],// 侧边搜索栏
				sideBarHeight:'',
				sideBarId:'',
				showLetter:'',
				alertTime:'',//选择过快的问题 
				add_search:false,//搜索框无值
				searchResult:0,
			}
		},
		mounted:function(){
			var self = this;
			$(this.$refs.root).css('min-height',$(window).height());
			self.initCitys();

		},
		components:{
			'c-alter':c_alter
		},
		props:['fn'],
		computed:{
			curCity:function(){
				return this.$store.state.address.curCity;
				
			},
			hotCitys:function(){
			
				var arr=[];
				for(var i =0;i<15;i++){
					arr.push($citys[i]);
				}
				return arr;
			},
			chineseCity:function(){
			
				var arr=[];
				for(var i =0;i<$all_citys.length;i++){
					arr.push($all_citys[i]);
				}
				return arr;
			},
		},
		methods:{
			isSearch:function(city){
				if(this.searchVal==''){//没有搜索内容的时候
					this.hotcityShow = true;
					this.searchResult=0;
					this.notFind=false;
					return true
				}else{//有搜索内容的时候
					this.hotcityShow = false;
					if(city.indexOf(this.searchVal)>-1){//对应的数据
						
						
						if(this.searchResult==0 && this.notFind){
							this.searchResult=1;
							this.notFind=false;
						}
						return true
					}else{
						if(this.searchResult==0){
							this.notFind=true;
						}
						return false
					}
					
				}
			},
			filCity:function(val){
				if(val.indexOf(this.searchVal)){
					return true;
				}
			},
			blurSearchWin:function(){//开始过滤
				if(this.searchVal==''){
					this.add_search=false;
				}
		
			},
			focusSearchWin:function(res){
			
				if(res!='input'){
					this.$refs.searchInput.focus();;
				}
				
				this.add_search=true;
			},
			toTop:function(){
				$(window).scrollTop(0);
			},
			moveToClass:function(val){//跳转到对应的字母
				this.showLetter = val;

				var self =this;
				clearTimeout(self.alertTime);
				this.alertTime = setTimeout(function(){
					self.showLetter = undefined;
				},1000)
				var obj;

				for(var i=0;i<this.$refs.each_city.length;i++ ){
					if(this.chineseCity[i]==val){
						obj = this.$refs.each_city[i];
					}
				}
				$scrollTo({toT:$(obj).position().top,durTime:300})
				//$(window).scrollTop($(obj).position().top);
			},
			isClick:function(res){
				if(res.charCodeAt()<100){
					return
				}
				this.searchVal = '';
				this.blurSearchWin();
				this.$emit(this.fn,res);
				

			},
			initCitys:function(){//生成sideBar
				for(var i=0;i<this.chineseCity.length;i++){
					if(this.chineseCity[i].charCodeAt()<100){
						this.sideBar.push(this.chineseCity[i]);
					}
				}
				this.sideBarHeight = ($(window).height()/25)+'px';
			},
		}
	}
</script>
<style>
	.hot_address .add_search{
		position: relative;
		display: inline-block;
		width: 10.9rem;height: 1.9rem;line-height: 1.9rem;margin-left: 0.7rem;border:1px solid #bbb;background-color: #fff;
	}
	
	.hot_address .foucus_search:before{
		left:9%!important;
	}
	.hot_address .add_search input{
		display: block;height: 100%;width: 83%;margin-left: 17%;text-align: center;text-indent: -9%;background: none;
	}
	.hot_address .add_search:before{
		display: inline-block;position: absolute;height: 100%;line-height: 37px;left: 50%;top:0;transform: translateX(-8px);
	}
	.hot_city li,.hot_address .close{  
		display: inline-block;background-color: #fff;margin-left: 0.7rem;
		line-height: 1.9rem;text-align: center;margin-bottom:0.6rem;
		width: 5rem;height: 1.9rem;border:1px solid #bbb;
	}
	.hot_address header.fixed{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
	}
	.hot_address .header{
	    margin:0 1rem;
	    text-align: center;
	    color: #4e4a49;
	    font-size: 1em;
	    height: 45px;
	    line-height: 45px;
	    position: relative;
	}
	.hot_address .sort_box{
	    width: 100%;
	    padding-top: 45px;
	    overflow: hidden;
	}
	.hot_address .sort_list{
	    padding:10px 60px 10px 80px;
	    position: relative;
	    height: 40px;
	    line-height: 40px;
	    border-bottom:1px solid #ddd;
	}

	.hot_address .sort_list .num_logo{
	    width: 50px;
	    height: 50px;
	    border-radius: 10px;
	    overflow: hidden;
	    position: absolute;
	    top: 5px;
	    left: 20px;
	}
	.hot_address .sort_list .num_logo img{
	    width: 50px;
	    height: 50px;
	}
	.hot_address .sort_list .num_name{
	    color: #000;
	}
	.hot_address .initials{
	    position: fixed;
	    top: 10px;
	    right: 0px;
	    height: 100%;
	    width: 20px;
	    padding-right: 4px;
	    text-align: center;
	    font-size: 12px;
	    z-index: 99;
	    background: rgba(145,145,145,0);
	}
	.hot_address .initials li img{
	    width: 14px;
	}
	.hot_address .chinese_city li{
		background: #fff;border-top:1px solid #eee;height: 2.3rem;width: 100%;
		line-height: 2.3rem;text-indent: 15px;
	}
	.hot_address .cur_add{
		height: 36px;
		line-height: 36px;
		text-indent: 27px;
		font-size: 13px;
		color: #666;background-color: #fff;
		margin-bottom:14px;
		display: inline-block;
	}
	.hot_city{
		font-size: 0;
	}
	
	.hot_address .closeParent{
		width: 100%;height: 1.9rem;
		margin-bottom:0.8rem;  font-size: 0;
	}
	
	.hot_address h3{
		font-size: 13px;font-weight: 200; 
		margin-left: 0.9rem;margin-bottom:0.7rem;
	}
	.hot_address{
		background-color: #fff;width: 100%;position:absolute;z-index: 99999;left: 0;top:0;
	}
</style>