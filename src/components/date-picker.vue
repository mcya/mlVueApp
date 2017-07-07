<template>	
	<div v-show="show" class="date-picker-container">
		<div class="picker-popup-mask" @click="closeFuc()"></div>
		<div class="picker-popup-wrap">
			<div class="picker-popup">
				<div class="picker-popup-header">
					<div class="picker-popup-item picker-popup-header-left" @click="closeFuc()">取消</div>
					<div class="picker-popup-item picker-popup-title">日期选择</div>
					<div class="picker-popup-item picker-popup-header-right" @click="commitFuc()">确认</div>
				</div>
				<div class="date-picker">
					<div class="date-picker-item">
						<div class="picker" id="yearWrapper">
							<div class="picker-content">
								<div class="picker-item picker-item-selected">2016</div>
								<div class="picker-item">2017</div>
							</div>
							<div class="picker-mask"></div>
							<div class="picker-indicator"></div>
						</div>
					</div>
					<div class="date-picker-item">
						<div class="picker" id="monthWrapper">
							<div class="picker-content">
								<div class="picker-item picker-item-selected">1</div>
								<div class="picker-item">2</div>
								<div class="picker-item">3</div>
								<div class="picker-item">4</div>
								<div class="picker-item">5</div>
								<div class="picker-item">6</div>
								<div class="picker-item">7</div>
								<div class="picker-item">8</div>
								<div class="picker-item">9</div>
								<div class="picker-item">10</div>
								<div class="picker-item">11</div>
								<div class="picker-item">12</div>
							</div>
							<div class="picker-mask"></div>
							<div class="picker-indicator"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>	
	import $iscroll from '../widget/iscroll-lite.js'
	export default{
		data(){
			return{
				dateList:{

				},
				scroll:null,
				monthScroll:null,
				handle:'',
			}
		},
		props:['show','clfn','cofn','yfn','mfn'],
		mounted:function(){
			//this.handle = function (e) { e.preventDefault();}
		},
		destroyed:function(){
			document.removeEventListener('touchmove', this.handle, false);
		},
		watch:{
			show:function(value){
				var self = this;				
				if(value){
					setTimeout(function(){
						self.myscroll('yearWrapper');
						self.myscroll('monthWrapper');
					},0)
					this.initDate();				
					document.addEventListener('touchmove', this.handle , false);
				}else{
					this.scroll=null;
					document.removeEventListener('touchmove', this.handle, false);
				}
			}
		},
		methods:{
			closeFuc:function(){
				var year = $('.year').text();
				var month = $('.month').text();
				this.$emit(this.clfn);
			},
			commitFuc:function(){
				this.$emit(this.cofn);
			},
			myscroll:function(elem){
				this.scroll = new $iscroll('#'+elem,{mouseWheel: true,});
				this.scroll.scrollTo(0,-34*$("#"+elem+" .picker-item.picker-item-selected").index());
				this.scroll.on('scrollEnd', function () {
					var scrollY = this.y;
					var num = Math.abs(Math.round(scrollY / 34));
					this.scrollTo(0,-34*num);
					$("#"+elem+" .picker-item").eq(num).addClass('picker-item-selected').siblings('.picker-item').removeClass('picker-item-selected');
				});

			},
			initDate:function(){
				var yDate = $('.year').text();
				var mDate = $('.month').text();
				this.myEach('yearWrapper',yDate);
				this.myEach('monthWrapper',mDate);
			},
			myEach:function(elem,date){
				$("#"+elem+" .picker-item").each(function(index){
					if($(this).text()==date){
						$(this).addClass('picker-item-selected').siblings('.picker-item').removeClass('picker-item-selected');
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.date-picker-container{
		.picker-popup-mask{
		    position: fixed;
		    top: 0;
		    right: 0;
		    left: 0;
		    bottom: 0;
		    background-color: #373737;
		    background-color: rgba(55, 55, 55, 0.6);
		    height: 100%;
		    filter: alpha(opacity=60);
		    z-index: 1050;
		}
		.picker-popup-wrap{
			position: fixed;
		    overflow: auto;
		    right: 0;
		    bottom: 0;
		    left: 0;
		    height: 351px;
		    z-index: 1050;
		    overflow-scrolling: touch;
		    outline: 0;
		    .picker-popup{
			    left: 0;
			    bottom: 0;
			    position: fixed;
			    width: 100%;
			    background-color: #fff;
			    .picker-popup-header {
				    background-image: -webkit-linear-gradient(top, #e7e7e7, #e7e7e7, transparent, transparent);
				    background-image: linear-gradient(to bottom, #e7e7e7, #e7e7e7, transparent, transparent);
				    background-position: bottom;
				    background-size: 100% 1px;
				    background-repeat: no-repeat;
				    position: relative;
				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;
				    -webkit-box-orient: horizontal;
				    -webkit-box-direction: normal;
				    -ms-flex-direction: row;
				    flex-direction: row;
				    .picker-popup-item {
					    color: #0ae;
					    font-size: 18px;
					    height: 44px;
					    line-height: 44px;
					    cursor: pointer;
					    box-sizing: border-box;
					    text-align: center;
					    -webkit-tap-highlight-color: transparent;
					}
				    .picker-popup-header-left, .picker-popup-header-right {
					    padding-left: 15px;
					    padding-right: 15px;
					}
					.picker-popup-title {
					    -webkit-box-flex: 1;
					    -ms-flex: 1;
					    flex: 1;
					    color: #666;
					    cursor: default;
					}
				}
				.date-picker {
				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;
				    -webkit-box-align: center;
				    -ms-flex-align: center;
				    align-items: center;
				    padding: 10px 0;
				}
				.date-picker-item {
					height:250px;
				    -webkit-box-flex: 1;
				    -ms-flex: 1;
				    flex: 1;
				    text-align: center;
				    .picker {
					    position: absolute;
					    display: block;
					    top:45px;
					    bottom:0;
					    width: 50%;
					    overflow: hidden;
					    .picker-mask {
						    position: absolute;
						    left: 0;
						    top: -30px;
						    right: 0;
						    bottom: 0;
						    z-index: 3;
						    background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
						    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
						    background-position: top, bottom;
						    background-size: 100% 132px;
						    background-repeat: no-repeat;
						}
						.picker-indicator {
						    right: 0;
						    position: absolute;
						    left: 0;
						    top: 102px;
						    height: 34px;
						    z-index: 3;
						    background-image: -webkit-linear-gradient(top, #d0d0d0, #d0d0d0, transparent, transparent), -webkit-linear-gradient(bottom, #d0d0d0, #d0d0d0, transparent, transparent);
						    background-image: linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent), linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
						    background-position: top, bottom;
						    background-size: 100% 1px;
						    background-repeat: no-repeat;
						}
						.picker-content {
						    position: absolute;
						    left: 0;
						    top: 0;
						    right: 0;
						    z-index: 1;
						    padding: 102px 0 132px 0;
						    .picker-item {
							    text-align: center;
							    font-size: 16px;
							    line-height: 34px;
							    height: 34px;
							    color: #000;
							    white-space: nowrap;
							    text-overflow: ellipsis;
							    overflow: hidden;
							}
						}
					}

				}
			}
		}
	}
</style>