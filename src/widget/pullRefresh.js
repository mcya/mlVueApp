import Zepto from '../core/Zepto';
Zepto();
var start,
end,
isLock = false,//是否锁定整个操作
isCanDo = false,//是否移动滑块
isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
hasTouch = 'ontouchstart' in window && !isTouchPad;


var dom = $('<div></div>');
dom.addClass('pull-refresh');
dom.css({'height':'80px',
        'lineHeight':'100px',
         'textAlign':'center',
         width:'100%',
    });

var domHeight =80;
var obj;
//1.下拉刷新
//2.上拉
//3.加载中
var fn =
        {
            //移动容器
            translate: function (diff) {
            	dom.text('下拉刷新...');
                obj.css({
                    "-webkit-transform": "translate3d(0," + diff + "px,0px)",
                    "transform": "translate3d(0," + diff + "px,0px)",
                });
            },
            //设置效果时间
            setTranslition: function (time) {

                obj.css({
                    "-webkit-transition": "all " + time + "s",
                    "transition": "all " + time + "s"
                });
            },
            //返回到初始位置
            back: function () {

               // fn.setTranslition(0.4);
               // fn.translate(0 - domHeight-3);
            	dom.text('加载完成...');
                setTimeout(function(){
                    //fn.setTranslition(0.2)
                	fn.translate(0 - domHeight);
                	dom.text('加载完成...');
                    setTimeout(function(){
                        fn.setTranslition(0)
                        isLock = false;
                        end='',
                        start='';
                    },300)
                },600)
                //标识操作完成
                
            },
            cancel:function(){
            	if(end-start>30){
            		fn.translate(0 - domHeight-2);
            	}
            	dom.text('取消');
            	fn.setTranslition(0.5);
            	fn.translate(0 - domHeight);
                //标识操作完成
                isLock = false;
                end='',
                start='';
            }
        };
    var slide = function (el,callback,that) {
        obj = $(el);
       var objparent = $(window);
        obj[0].insertBefore(dom[0],obj[0].childNodes[0]);//插入节点
        obj.css({
             "-webkit-transform": "translate3d(0,-"+domHeight+"px,0px)",
             "transform":"translate3d(0,-"+domHeight+"px,0px)",
        });


        /*操作方法*/
       
        //滑动开始
        obj.bind("touchstart", function (e) {
            if (objparent.scrollTop() <= 0 && !isLock) {

                var even = typeof event == "undefined" ? e : event;
                //标识操作进行中
                isLock = true;
                isCanDo = true;
                //保存当前鼠标Y坐标
                start = hasTouch ? even.touches[0].pageY : even.pageY;
                //消除滑块动画时间
               // fn.setTranslition(0);
            }
        });
        //滑动中
        obj.bind("touchmove", function (e) { 
            if (objparent.scrollTop() <= 0 && isCanDo) {
                var even = typeof event == "undefined" ? e : event;
                //保存当前鼠标Y坐标
                end = hasTouch ? even.touches[0].pageY : even.pageY;
                if (start < end) {
                    even.preventDefault();
                    //消除滑块动画时间
                    fn.setTranslition(0);

                    //移动滑块
                    // if(end - start - domHeight<0){
                      var offset = Math.abs(end - start);
                      var  pos = Math.pow(offset*12,1/2);
                        fn.translate(pos-80-8);
                    // }
                    
                }
            }
        });
        //滑动结束
       var  winHeight=$(window).height()/2
        obj.bind("touchend", function (e) {
             
            if (isCanDo) {
                isCanDo = false;
                //判断滑动距离是否大于等于指定值
                // var offset = Math.abs(end - start);
                // var  pos = Math.pow(offset*12,1/2);
               
                if (end - start>(winHeight>330?330:winHeight)) {
                    //设置滑块回弹时间
                    fn.setTranslition(0.4);
                    //保留提示部分
                    var reg = /\,.+\,/g;
                    var  resilience = obj.css('transform');
                    if(resilience==null){
                        resilience = obj.css('-webkit-transform')
                    }
                    resilience=resilience.match(reg)[0].replace(/\,/g,'').slice(0,-2);
                    fn.translate(resilience-10);
                    //执行回调函数
                    if (typeof callback == "function") {
                    	dom.text('正在加载...');
                        callback.call(that,'');
                    }
                } else {
                    //返回初始状态
                    fn.setTranslition(0.6);
                    fn.cancel();
                }
            }
        });
    }
export default function(el,fn,that){
	slide(el,fn,that);  
}
var $init = slide;
var $back = fn.back;
export {$init,$back}


// slide("#container",function (e) {
// 	    var that = this;
// 	    setTimeout(function () {
// 	        that.back.call();
// 	    }, 2000);
// 	});        
	   