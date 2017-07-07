<template>
  <div id="contact">
    <div id="sea_bar">
      <search v-model="value"
              @result-click="resultClick" @on-change="getResult"
              :results="results" :autoFixed="searchBar.autoFixed"
              auto-scroll-to-top="searchBar.autoScrollToTop"
              :position="relative"
              @is-focus-change="isFocusChange(val,val2)"
              placeholder="搜索" cancelText="取消">
      </search>
    </div>

    <!--右侧字母导航-->
    <ul class="index_nav">
      <li v-for="index in indexData" @click="clickIndexList(index)">{{index}}</li>
    </ul>

    <p class="list_index">A</p>
      <group id="g_list_A" class="gp">
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
      </group>

      <p class="list_index">B</p>
      <group id="g_list_B" class="gp">
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
      </group>

      <p class="list_index">C</p>
      <group id="g_list_C" class="gp">
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
      </group>

      <p class="list_index">D</p>
      <group id="g_list_D" class="gp">
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
      </group>
      <p class="list_index">E</p>
      <group id="g_list_E" class="gp">
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
      </group>
      <p class="list_index">F</p>
      <group id="g_list_F" class="gp">
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
      </group>
      <p class="list_index">G</p>
      <group id="g_list_G" class="gp">
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
        <cell class="person" :title="$t('张三')" inline-desc="13846722328">
          <div slot="child">
            <div class="circle"></div>
            <!--<div class="white_bg"></div>-->
          </div>
        </cell>
      </group>




    <div id="list">
      <!--<div id="item_indexA">A</div>-->
      <!--<ul>-->
        <!--<li>文字</li>-->
        <!--<li>文字</li>-->
        <!--<li>文字</li>-->
      <!--</ul>-->
      <!--<div id="item_indexB">B</div>-->
      <!--<ul>-->
        <!--<li>文字</li>-->
        <!--<li>文字</li>-->
        <!--<li>文字</li>-->
      <!--</ul>-->
      <!--<div id="item_indexC">C</div>-->
      <!--<ul>-->
        <!--<li>文字</li>-->
        <!--<li>文字</li>-->
        <!--<li>文字</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>
<script>
  import { Group, Cell } from 'vux'
  import Search from '../search/search_bar/search'

  var listData = [
    {name:"张三",phoneNum:13864247668},
    {name:"李四",phoneNum:13864247668},
    {name:"碧哥",phoneNum:13864247668},
    {name:"小智",phoneNum:13864247668},
    {name:"若风",phoneNum:13864247668},
    {name:"miss",phoneNum:13864247668},
    {name:"PDD",phoneNum:13864247668},
    {name:"五五开",phoneNum:13864247668},
  ];
  var indexData = ["A","B","C","D","E","F","G","H","I","J","K"];

  export default{
    name: '',
    components: {
      Search,
      Group,
      Cell
    },
    data: function () {
      return {
        value:'',
        results:[],
        isFocus:false,
        searchBar:{
          autoFixed:true,
          autoScrollToTop:true
        },
        indexData:indexData
      }
    },
    methods: {
      //点击搜索结果
      resultClick:function(item) {
        console.log(item)
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      //获取输入内容并搜索
      getResult:function(val) {
        console.log(val);

        //将最后结果导入this.results里即可
      },
      //点击右侧拼音索引，屏幕滚动至相应位置
      clickIndexList: function (index) {
        var bar = $('#g_list_'+index),
            fontSize=$('html').css('font-size').slice(0,2),
//            isSearchFixed=this.isFocus?1:0,
            isSearchFixed=$('#sea_bar .vux-search-box').css('position')=='fixed'?1:0,
            offsetTop=bar.offset().top-(isSearchFixed?3.5:1.3)*fontSize;
        $(window).scrollTop(offsetTop,0);
        console.log(isSearchFixed);
      },
      isFocusChange: function (val,val2) {
        this.isFocus=val2;
        console.log(val2);
      }
    },
    watch: {

    },
    beforeMout: function () {

    },
    mounted: function () {
      document.title="通讯录";
//      $('#search_input').attr('onfocus',this.onFocus)
//      console.log($('#search_input'))

    },
    created: function () {

    }
  }


</script>
<style lang="scss">
  #contact{
    height: 100%;
    width: 100%;
    background-color: #F5F5F5;
    position:relative;
    #sea_bar{
      width: 100%;
      height: 44px;
      position: relative;
      .vux-search-box{
        /*border-radius: 6px;*/
        .weui_search_bar{
          background-color: #DEDEDE;
          /*background-color: #fff;*/
          .weui_search_outer{
            background-color: #fff;
            border-radius: 4px;
          }
        }
      }

      .weui_search_bar::before,::after{
        display: none;
      }
    }
    .index_nav{
      position: fixed;
      top: 160px;
      right: 4px;
      z-index: 10;
      li{
        font-size: 12px;
        color: #3D72D0;
      }
    }
    .list_index{
      width: 361px;
      height: 26px;
      line-height: 26px;
      padding-left: 14px;
      color: #7E7E7E;
      background-color: #F5F5F5;
      position: relative;
      z-index:3;
    }
    .gp{
      width: 356px;
      height:auto;
      .vux-no-group-title{
        margin: 0;
      }
      .vux-no-group-title::before,::after{
        display: none;
      }
      .person{
        position: relative;
        .weui_cell_bd{
          padding-left: 48px;
          p{
            color: #000000;
          }
          .vux-label-desc{
            color: #949494;
          }
        }
        .circle{
          width: 44px;
          height: 44px;
          border-radius: 50%;
          position: absolute;
          top: 8px;
          left: 10px;
          z-index: 2;
          background-color: #D8D8D8;
        }
        .white_bg{
          width: 50px;
          height: 64px;
          background-color: white;
          position: absolute;
          top: -2px;
          left: 0px;
          z-index: 1;
        }
      }
    }



    #list{
      width: 100%;
      height: auto;
      #item_indexA #item_indexB #item_indexC{


      }
    }

    .box{
      width: 100%;
      height: 2000px;
      background-color: skyblue;
      /*position: relative;*/
    }
  }
</style>
