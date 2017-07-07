<template>
  <div id="city_search">
    <div id="search_bar" :style="searchStyle">
      <div class="inner_box">
        <img src="../../icon/find_gray.png" :style="innerImgStyle"/>
        <input type="search" v-model="innerContent" @focus="onFocus" @blur="onBlur()" :style="innerInputStyle"/>
      </div>
      <div v-if="isOnBlur!=undefined&&!isOnBlur&&(resultList.length!=0)" class="search_list">
        <ul>
          <li v-for="cityN in resultList" @click="selectCity(cityN)">{{cityN}}</li>
        </ul>
      </div>
    </div>
    <!--点击省份对应的城市（这个是第二页在下面）-->
    <div @touchmove="stopTouchMove">
      <city-box class="fixTop" :title1="cityBoxData_r.title1" :title1Box="cityBoxData_r.title1Box" :title2="cityBoxData_r.title2" :hotCityItems="cityBoxData_r.hotCityItems" :provinceName="cityBoxData_r.provinceName" :isOnBlur="isOnBlur" :eventName="clickEvent" @click-event="changeOnBlur"></city-box>
    </div>

    <!--右侧字母导航-->
    <ul v-show="!(page==2||page==0)" class="indexLists">
      <li v-for="item in cityIndex" @click="clickIndexList(item.index)">{{item.index}}</li>
    </ul>

    <!--过渡动画↓-->
    <div @touchmove="stopTouchMove" :class="['leftPage','animated',{'showLeft':(page!=0&&!page),'slideInLeft':(page==1),'slideInRight':(page==2),'showRight':(page==0)}]">
      <div class="c_body">
        <!--热门城市-->
        <city-box :title1="cityBoxData.title1" :title1Box="cityBoxData.title1Box" :title2="cityBoxData.title2" :hotCityItems="cityBoxData.hotCityItems" :isOnBlur="isOnBlur" :eventName="clickEvent" @click-event="changeOnBlur"></city-box>
        <!--点击省份对应的城市(这个是两页都左浮动的)-->
        <!--<city-box :class="{'page2':page==2}" :title1="cityBoxData_r.title1" :title1Box="cityBoxData_r.title1Box" :title2="cityBoxData_r.title2" :hotCityItems="cityBoxData_r.hotCityItems" :isOnBlur="isOnBlur" :eventName="clickEvent" @click-event="changeOnBlur"></city-box>-->
      </div>

      <!--省份列表-->
      <div class="cityList" v-for="item in cityIndex">
        <p :id="'city_'+item.index">{{item.index}}</p>
        <ul>
          <li class="cityName" v-for="city in item.cities" @click="selectProvince(city)">
            {{city}}
            <div class="bottomLine"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

  import cityBox from './city_box.vue'
  import cityList from '../../data/city_list.json'  //导入省市目录的json文件

  const hotCityItems = [
    {name:"北京"},
    {name:"上海"},
    {name:"广州"},
    {name:"深圳"},
    {name:"成都"},
    {name:"武汉"},
    {name:"杭州"},
    {name:"重庆"},
    {name:"郑州"},
    {name:"南京"},
    {name:"西安"},
    {name:"苏州"},
    {name:"天津"},
    {name:"长沙"},
    {name:"福州"}
  ];
  const cityIndex = [
    {index:"A",cities:["安徽","澳门"]},
    {index:"B",cities:["北京"]},
    {index:"C",cities:["重庆"]},
//    {index:"D",cities:["钓鱼岛"]},
    {index:"F",cities:["福建"]},
    {index:"G",cities:["广东","广西","贵州","甘肃"]},
    {index:"H",cities:["河北","黑龙江","河南","湖北","湖南","海南"]},
    {index:"J",cities:["吉林","江苏"]},
    {index:"L",cities:["辽宁"]},
    {index:"N",cities:["内蒙古","宁夏"]},
    {index:"Q",cities:["青海"]},
    {index:"S",cities:["上海","山西","山东","四川","陕西"]},
    {index:"T",cities:["天津","台湾"]},
    {index:"X",cities:["西藏","新疆","香港"]},
    {index:"Y",cities:["云南"]},
    {index:"Z",cities:["浙江"]}
  ];
  export default {
    data: function () {
      return {
        innerContent:"输入城市名查询",
        innerInputStyle:"",
        innerImgStyle:"",
        hotCityItems:hotCityItems,
        cityIndex:cityIndex,
        page:NaN,   //默认页为省份页，此属性控制页面切换效果
        isOnBlur:undefined, //输入框是否失去焦点
        resultList:[],  //输入内容后 检索到的地名列表
        clickEvent:"click-event",
        allCityList:[], //所有城市名
        searchStyle:"",
        cityBoxData:{
          title1:"当前城市",
          title1Box:"广州",
          title2:"热门城市",
          hotCityItems:hotCityItems
        },
        cityBoxData_r:{
          title1:"当前省份",
          title1Box:"",
          title2:"请选择：",
          hotCityItems:[],
          provinceName:""
        }
      }
    },
    components:{
      'city-box':cityBox
    },
    methods:{
      //搜索框获取/失去焦点
      onFocus: function () {
        this.innerContent="";
        this.innerInputStyle="text-align:left;color:black";
        this.innerImgStyle="left:0.4rem";
        this.isOnBlur=false;
        this.searchStyle="position:absolute";  //在微信端与UC浏览器下，focus时，fixed定位失效
        $(window).scrollTop(0,0);
      },
      onBlur: function () {
        var _this=this;
        setTimeout(function () {
          _this.innerContent="输入城市名查询";
          _this.innerInputStyle="";
          _this.innerImgStyle="";
          _this.isOnBlur=true;
          _this.searchStyle="position:fixed";
        },20);

      },
      //输入框focus时，阻止其他地方的默认事件(禁止滚动)
      stopTouchMove:function(event) {
        if(this.isOnBlur==false){
          if(event.target.type == 'range') return;
          event.preventDefault();
        }
      },
      //点击选择省份
      selectProvince: function (province) {
        //防止 点击界面 取消编辑时的误操作
        if(this.isOnBlur==false){
          this.isOnBlur=undefined;
          return;
        };
        this.getCities(province);
        location.hash="city_search_p2"  //跳转到城市页
      },
      //获取省份对应的市级目录
      getCities: function (province) {
        var cities = [];
        for(var i=0;i<cityList.length;i++){
          if(cityList[i].name==province){
            var Province = cityList[i].city;
            for(var j=0;j<Province.length;j++){
              cities.push({name:Province[j].name});
            }
          }
        }
        this.cityBoxData_r={
          title1:"当前省份",
          title1Box:province,
          title2:"请选择：",
          hotCityItems:cities,
          provinceName:province
        }
      },
      //点击右侧拼音索引，屏幕滚动至相应位置
      clickIndexList: function (index) {
        var bar = $('#city_'+index),
            fontSize=$('html').css('font-size').slice(0,2),
            offsetTop=bar.offset().top-2.4*fontSize;
        $(window).scrollTop(offsetTop,0);
      },

      changeOnBlur: function () {
          this.isOnBlur=undefined;
      },
      filterCity: function (val,arrData) {
        if(val!=""&&val!="输入城市名查询"){
          var cResult = [];
          for(var i=0;i<arrData.length;i++){
            if(eval("/"+val+"/").test(arrData[i].cityN)){
              cResult.push(arrData[i].cityN);
            }
          }
          this.resultList=cResult;
        }else{
          this.resultList=[];
        }

      },
      //点击搜索栏结果里的选项
      selectCity: function (name) {
        //得到的地址保存在store中
        this.$store.commit("saveLocCity",name)
        //这里做跳转↓
        location.hash="guider_me";

      }
    },
    mounted: function () {
      document.title = "热门";
      window.scrollTo(0,0);

      console.log(cityList);

//      this.searchBarTop=$("#search_bar").css("top");
//      this.searchBarTop=document.body.scrollTop;
//      console.log(this.searchBarTop);

      //生成包含所有城市名的数组
      if(this.allCityList.length==0){
        var allCityList = [];
        for(var i=0;i<cityList.length;i++){
          for(var j=0;j<cityList[i].city.length;j++){
            var cityObj={};
            cityObj.cityN=(cityList[i].city)[j].name;
            cityObj.__proto__=cityList[i];    //把原型指向父级，方便之后向上查找省名
            allCityList.push(cityObj);
          }
        }
        this.allCityList=allCityList;
      }
      console.log(this.allCityList);

    },
    watch:{
      page: function (val,oldVal) {
        if(val==1){
          this.cityBoxData_r.hotCityItems=[];
        }

      },
      $route:function(){
        if(this.$route.name=="city_search"){
          this.page=1;
          window.scrollTo(0,0); //回到上一页前，先滚到顶部
        }else if(this.$route.name=="city_search_p2"){
          this.page=2;
        }
      },
      innerContent:function(){  //输入框内容
        this.filterCity(this.innerContent,this.allCityList);
      }
//      ,
//      searchBarTop: function (val,oVal) {
//        console.log(val);
//        console.log(oVal);
//      }
    },
    beforeMount: function () {
      //从city_search_p2跳转到下一页，再后退回来的时候，保持city_search_p2的样式
      if(this.$route.name=="city_search_p2"){
        this.page=0;
        //通过市名向上找到省名，获取到对应的列表
        var _this = this;
        setTimeout(function () {
          var locCity = _this.$store.getters.getLocCity;
          var cityList = _this.allCityList;
          for(var a=0;a<cityList.length;a++){
            if(cityList[a].cityN==locCity){
              _this.getCities(cityList[a].__proto__.name);
            }
          }
        },20);
      }
    }

  }
</script>
<style lang="scss">
  .animated {
    -webkit-animation-duration: .4s;
    animation-duration: .4s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes slideInRight {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes slideInRight {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }

  @-webkit-keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes slideInLeft {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @-webkit-keyframes showRight {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes showRight {
    from {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
  .showRight {
    -webkit-animation-name: showRight;
    animation-name: showRight;
  }

  @-webkit-keyframes showLeft {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes showLeft {
    from {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }
  .showLeft {
    -webkit-animation-name: showLeft;
    animation-name: showLeft;
  }



  #city_search{
    width: 100%;
    padding-bottom: 4.85rem;
    padding-top: 2.4rem;
    background-color: #f6f6f6;
    /*overflow: hidden;*/
    #search_bar{
      width: 100%;
      height: 2.4rem;
      background-color: #dedede;
      position: fixed;
      top:0rem;
      left:0.0rem;
      z-index:5;
      .inner_box{
        width: 17.75rem;
        height: 1.6rem;
        background-color: #ffffff;
        border-radius: 0.2rem;
        position: absolute;
        top: 0.45rem;
        left: 0.5rem;
        img{
          width: 0.8rem;
          height: 0.8rem;
          position: absolute;
          top: 0.45rem;
          left: 5.9rem;
        }
        input{
          width: 100%;
          height: 100%;
          font-size: 0.7rem;
          color: #bcbcbc;
          text-align: center;
          padding-left: 1.5rem;
        }
      }
      .search_list{
        width: 17.75rem;
        min-height: 0;
        max-height: 14.7rem;
        position: absolute;
        top: 1.9rem;
        left: 0.45rem;
        border-radius: 0 0 0.2rem 0.2rem;
        background-color: #f6f6f6;
        border: 0.05rem solid #dedede;
        border-top: none;
        overflow: scroll;
        ul{
          position:relative;
          top:0;
          leftL:0;
          li{
            height: 1.8rem;
            line-height: 1.8rem;
            font-size: 0.8rem;
            text-align: left;
            border-bottom: 0.05rem solid #dedede;
            padding-left: 1.5rem;
          }
        }
      }
    }
    .fixTop{
      position: fixed;
      top: 2.4rem;
      left: 0;
      /*z-index: -1;*/
    }
    .indexLists{
      display: block;
      width: 0.6rem;
      height: 10.0rem;
      position: fixed;
      top: 10.9rem;
      right: 0;
      z-index:10;
      li{
        font-size: 0.55rem;
        color: #3a73ce;
      }
    }
    .leftPage{
      z-index: 3;
      .c_body{
        width: 100%;
        height: 18.85rem;
        background-color: #f6f6f6;
        position: relative;
        /*z-index:2;*/
        .hotCity{
          float: left;
          height: 18.45rem;
        }
        /*.page2{*/
        /*left: 100%;*/
        /*}*/
      }
      .cityList{
        position: relative;
        /*z-index: 2;*/
        width:18.75rem;
        background-color: #f5f5f5;
        overflow: hidden;
        p{
          width: 100%;
          height: 1.5rem;
          line-height: 1.5rem;
          font-size: 0.65rem;
          padding-left: 0.65rem;
          color: #808080;
        }
          ul{
            display:block;
            position: relative;
            top:0.1rem;
            background-color: #ffffff;
            .cityName{
              display: block;
              width: 100%;
              height: 2.15rem;
              line-height: 2.15rem;
              font-size: 0.85rem;
              color: #000000;
              position: relative;
              left: 0.65rem;
              border-bottom:0.1rem solid #f4f4f4;
            .bottomLine{
              width: 2.3rem;
              height: 0.2rem;
              position: absolute;
              bottom: -0.1rem;
              background-color: #ffffff;
            }
          }
        }
      }
    }

  }
</style>
