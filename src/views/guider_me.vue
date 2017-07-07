<template>
    <div id="guider_me">
        <c-alert :event-name="alertData.eventName" v-on:on-props-change="onPropsChange" :is-show="alertData.isShow" :title="alertData.title" :tips="alertData.tips" :primary-url="alertData.primaryUrl"></c-alert>
        <c-nav active='4'></c-nav>
        <div class="gm_header">
            <img src="../data/guider_hbg.png" alt=""/>
            <div class="gm_header_nav">
                <div class="man_img">
                    <img :src="headImg"/>
                </div>
                <div class="man_data">
                    <p class="user_name">
                        {{$store.state.nickname}}
                    </p>
                    <p class="user_id">
                        {{$store.state.mid=="-1"?"":"美丽行ID:"+$store.state.mid}}
                    </p>
                    <!--<div class="user_star">-->
                        <!--星级：<div class="stars">＊＊＊＊＊</div>-->
                    <!--</div>-->
                </div>
                <!--<a href="http://static.mlxing.com/index.html#/players_me" class="person_center">-->
                    <!--<img src="../icon/arrow-right-white.png"/>-->
                    <!--<span>个人中心</span>-->
                <!--</a>-->
            </div>
            <div class="bottom_bar">
              <div class="bottom_box">
                <a href="http://static.mlxing.com/index.html#/player_qrcode" @click="checkState(true,$event)">
                  <img src="../icon/red-packet.png"/>
                  <p>分享得红包</p>
                </a>
              </div>
              <div class="bottom_line"></div>
              <div class="bottom_box">
                <a href="#/lottery" @click="checkState(true,$event)">
                  <img src="../icon/looting.png"/>
                  <p>夺宝</p>
                </a>
              </div>
              <div class="bottom_line"></div>
              <div class="bottom_box">
                <a href="#/dingdan" @click="checkState(true,$event)">
                  <img src="../icon/bill.png"/>
                  <p>订单</p>
                </a>
              </div>
            </div>
        </div>
        <div class="gm_btn">
            <a :href="$store.state.is_dy=='-1'?'#/find_team':'#/find_guide'" @click="checkState(true,$event)">
              {{$store.state.is_dy=="-1"?"找团":"我要发布"}}
            </a>
        </div>
        <div class="gm_body">
            <ul>
                <li v-for="item in userData.body_lists" :class="item.margin_b" v-if="!isDy||(!item.needCheckDy&&isDy)">
                    <a @click="checkState(item.mustCheck,item.isShowNoCheck,$event)" :href="item.url">
                        <span v-if="!item.margin_b" class="white_bottom"></span>
                        <img v-if="item.imgUrl" v-bind:src="item.imgUrl" class="icon"/>
                        <span class="list-l">
                          {{item.listName}}
                          <span v-if="item.tips" class="dot"></span>
                        </span>
                        <span class="list-r-txt">
                          {{item.isShowNoCheck?"认证后开启":""}}
                        </span>
                        <span class="list-r"></span>
                    </a>
            </ul>
        </div>
    </div>
</template>
<script>
  import c_nav from '../components/nav/bottomNav.vue'
  import $handleImg from '../widget/handleImg'
  import defaultImg from '../icon/face.png'
  import c_alert from '../components/alert_p.vue'

  /*导入图片*/
  import wallet from '../icon/wallet.png'
  import g_apply from '../icon/g-apply.png'
  import assistant from '../icon/assistant.png'
  import training from '../icon/training.png'
  import setting from '../icon/setting.png'
  import share_pic from '../icon/share-pic.png'
  import grade from '../icon/grade.png'
  import books from '../icon/books.png'
  import find_more from '../icon/find-more.png'
  import icon_rb_money_big from '../icon/icon_rb_money_big.png'


  var userData = {
    //margin_b：控制下方间隙；url：跳转地址；imgUrl：图片地址；isShowNoCheck：是否显示“未验证”，true则提示“认证后开启”；needCheckDy: 需要验证是导游
    body_lists: [
      {listName: "我的钱包",mustCheck:true, margin_b: "margin-b", balance: "0.00", url: "#/my_wallet", imgUrl: wallet, tips: true},
      {listName: "导游申请",mustCheck:true, url: "http://weixin.mlxing.com/mlx/dy", imgUrl: g_apply, needCheckDy:true},
      //      {listName:"我的出团",isShowNoCheck:true,url:"#",imgUrl:""},
      //      {listName:"导游工具",url:"#",imgUrl:""},
      {listName: "带团助手", isShowNoCheck:true,mustCheck:true, url: "http://static.mlxing.com/page/groupAss/index.html?userType=1", imgUrl: assistant},
      {listName: "发现", url: "http://static.mlxing.com/index.html#/tour", imgUrl: find_more},
      {
        listName: "分享二维码",
        margin_b: "margin-b",
        url: "http://static.mlxing.com/index.html#/player_qrcode",
        imgUrl: share_pic
      },
      {listName: "题库",mustCheck:true, url: "http://static.mlxing.com/travelApp/html/index.html", imgUrl: books},
      //      {listName:"直播",margin_b:"margin-b",isShowNoCheck:true,url:"#",imgUrl:""},
      {listName: "培训",mustCheck:true, isShowNoCheck:true, url: "#/trained", imgUrl: training},
      //      {listName:"我的消息",url:"#",imgUrl:""},
      {
        listName: "赚取更多",
        mustCheck:true,
        margin_b: "margin-b",
        url: "http://static.mlxing.com/index.html#/player_user_point",
        imgUrl: icon_rb_money_big
      },
      //      {listName:"商城",url:"#",imgUrl:""},
      //      {listName:"意见反馈",url:"#",imgUrl:""},
      {listName: "导游评分机制", margin_b: "margin-b", url: "#/guide_rating", imgUrl: grade},
      {listName: "设置",margin_b: "margin-b",mustCheck:true, url: "#/profile", imgUrl: setting},
    ]
  };
//  var agencyData = {
//    body_lists: [
//      {listName: "我的钱包", margin_b: "margin-b", url: "#/my_wallet", imgUrl: ""},
//      {listName: "旅行社申请", balance: "0.00", url: "http://weixin.mlxing.com/mlx/dy", imgUrl: ""},
//      //      {listName:"我的出团",margin_b:"margin-b-min",url:"http://weixin.mlxing.com/mlx/dy",imgUrl:""},
//      //      {listName:"导游工具",margin_b:"margin-b",isShowNoCheck:true,url:"#/trained",imgUrl:""},
//      {listName: "分享二维码", url: "http://static.mlxing.com/index.html#/player_qrcode", imgUrl: ""},
//      {listName: "导游评分机制", url: "#/guide_rating", imgUrl: ""},
//      {listName: "培训", url: "#/trained", imgUrl: ""},
//      {
//        listName: "题库",
//        margin_b: "margin-b",
//        isShowNoCheck: true,
//        url: "http://static.mlxing.com/travelApp/html/index.html",
//        imgUrl: ""
//      },
//      {listName: "意见反馈", url: "http://weixin.mlxing.com/ashop/bill", imgUrl: ""},
//      {listName: "创建群组", url: "http://weixin.mlxing.com/ashop/createGroup", imgUrl: ""},
//      //      {listName:"更多",url:"#",imgUrl:""},
//      {listName: "设置", margin_b: "margin-b", url: "#/profile", imgUrl: ""},
//    ]
//  };
  export default {
    data: function () {
      return {
        userData: userData,
        alertData:{
          isShow:false,
          title:"请先登陆",
          tips:"点击右上角 -> 设置 -> 登陆",
//          primaryUrl:"http://static.mlxing.com/zhaotuan/index.html#/guider_me",
          eventName:"on-props-change"
        },
        isDy:false,
        test:"测试"
      }
    },
    components: {
      'c-nav': c_nav,
      'c-alert': c_alert
    },
    methods: {
      //弹窗自定义事件触发的回调
      onPropsChange:function(){
        this.alertData.isShow=false;
      },
      //判断登陆、是否验证状态，并弹窗提示
      checkState: function (mustCheck,isShowNoCheck,$event) {
        if(!mustCheck)return;

        if (this.$store.state.mid == -1) {
          console.log("未登录")
          //未登录
          $event.preventDefault();
          this.alertData={
            isShow:true,
            title:"请先登陆",
            tips:"点击右上角 -> 设置 -> 登陆",
//            primaryUrl:"http://static.mlxing.com/zhaotuan/index.html#/guider_me",  //跳转到登陆页面
            eventName:"on-props-change"
          };
        } else if (isShowNoCheck&&this.$store.state.is_dy == -1) {
          //不是导游
          $event.preventDefault();
          this.alertData={
            isShow:true,
            title:"验证后开启",
//             primaryUrl:"http://static.mlxing.com/zhaotuan/index.html#/guider_me",
            eventName:"on-props-change"
          };
        }
      }
    },
    computed: {
      headImg: function () {
        if (this.$store.state.mid == -1) {
          return defaultImg
        } else {
          return $handleImg(this.$store.state.headimgurl, {width: 92, height: 92});
        }
      }
    },
    mounted: function () {
      document.title = "我的"
      if (this.$store.state.mid == -1) {
        //未登录
        this.alertData={
          isShow:true,
          title:"请先登陆",
          tips:"点击右上角 -> 设置 -> 登陆",
//          primaryUrl:"http://static.mlxing.com/zhaotuan/index.html#/guider_me",
          eventName:"on-props-change"
        }
      }else if(this.$store.state.is_dy != -1){
        //已登陆，并且已验证是导游，隐藏“导游申请”
        this.isDy=true;
      }
    },
    watch:{

    }
  }
</script>
<style lang='scss'>
    #guider_me {
        width: 100%;
        position: relative;
        background:#ececec;
    /*小点样式，通过tips控制*/
        .dot{
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 50%;
          position: absolute;
          background-color: #d23838;
          top: 0.1rem;
          right: -0.35rem;
        }
    /*header开始*/
        .gm_header {
            width: 100%;
            height: 9.8rem;
            position: relative;
            img{
                width: 100%;
                height: 9.8rem;
            }
            .gm_header_nav{
                width: 16.75rem;
                height: 4.0rem;
                line-height: 4.0rem;
                position: absolute;
                bottom: 3.85rem;
                padding: 0.1rem 0.9rem 0.1rem 1.1rem;
                .man_img{
                    float: left;
                    width: 3.8rem;
                    height: 3.8rem;
                    border-radius: 50%;
                    border: 0.05rem solid #ffffff;
                    position: relative;
                    /*overflow: hidden;*/
                    img{
                        width: 3.8rem;
                        height: 3.8rem;
                        border-radius: 50%;
                    }
                }
                .man_data{
                    width: 7.0rem;
                    height: 1.7rem;
                    position: absolute;
                    top: 1.0rem;
                    left: 6.0rem;
                    .user_name{
                        font-size: 0.9rem;
                        line-height: 1.2rem;
                        color: #ffffff;
                    }
                    .user_id{
                        font-size: 0.8rem;
                        height: 0.8rem;
                        line-height: 0.8rem;
                        color: #ffffff;
                        /*.stars{*/
                            /*float: right;*/
                            /*line-height: 1.2rem;*/
                            /*color: #ffffff;*/
                            /*font-size: 0.9rem;*/
                        /*}*/
                    }
                    p{
                      margin-bottom: 0.3rem;
                    }
                }

                .person_center{
                    float: right;
                    width: 4.5rem;
                    height: 1.4rem;
                    line-height: 1.4rem;
                    margin-top: 1.3rem;
                    span{
                        float: right;
                        width: 3.5rem;
                        height: 0.9rem;
                        font-family:PingFangSC-Regular;
                        font-size:0.8rem;
                        color:#ffffff;
                        text-align: right;
                    }
                    img{
                        float: right;
                        width: 0.45rem;
                        height: 0.75rem;
                        margin-left: 0.3rem;
                        margin-top: 0.4rem;
                    }
                }
            }
            .bottom_bar {
                width: 100%;
                height: 3.2rem;
                background:rgba(92,92,92,0.43);
                position: absolute;
                bottom: 0;
                .bottom_box{
                    float: left;
                    width: 6.15rem;
                    height: 3.2rem;
                    text-align: center;
                    a{
                        display: block;
                        width: 4.0rem;
                        height: 2.7rem;
                        text-align: center;
                        margin-left: 1.1rem;
                        img{
                            display: block;
                            width: 1.5rem;
                            height: 1.5rem;
                            margin: 0.25rem 1.25rem;
                        }
                        p{
                            width: 100%;
                            height: 0.7rem;
                            font-family:PingFangSC-Regular;
                            font-size:0.6rem;
                            color:#ffffff;
                            line-height: 0.6rem;
                            letter-spacing: 0;
                        }
                    }
                }
                .bottom_line{
                    float: left;
                    width: 0.1rem;
                    height: 1.45rem;
                    margin-top: 0.9rem;
                    background-color: #ffffff;
                }
            }
        }
    /*header结束*/
    /*btn开始*/
        .gm_btn {
            width: 100%;
            height: 3.7rem;
            a {
                display:block;
                width:17.3rem;
                height:2.35rem;
                line-height: 2.35rem;
                text-align: center;
                margin: 0.7rem 0.7rem 0.65rem 0.75rem;
                background:#f5594d;
                border-radius:4.5rem;
                font-family:PingFangSC-Regular;
                font-size:0.9rem;
                color:#ffffff;
                letter-spacing:0;
            }
        }
    /*btn结束*/
    /*body开始*/
        .gm_body {
            width: 100%;
            padding-bottom: 6.4rem;
            /*padding-bottom: 2.4rem;*/
            ul{
                width: 100%;
                height: 100%;
                margin-top: -0.6rem;
                padding-bottom: 0.2rem;
                .margin-b{
                    margin-bottom: 0.55rem;
                }
                .margin-b-min{
                    margin-bottom: 0.2rem;
                }
                li{
                    width:100%;
                    height:2.15rem;
                    background:#ffffff;
                    margin-bottom:1px;
                    /*margin-bottom:0.03rem;*/
                    a{
                        height: 2.15rem;
                        display: block;
                        position:relative;
                        span{
                            position: absolute;
                            font-family:PingFangSC-Regular;
                        }
                        .white_bottom{
                          width: 2.2rem;
                          height: 3rem;
                          float: left;
                          background-color: #ffffff;
                        }
                        .icon{
                            width: 1.1rem;
                            height: 1.1rem;
                            /*width: 22px;*/
                            /*height: 22px;*/
                            position: absolute;
                            top: 0.6rem;
                            left: 0.7rem;
                        }
                        .list-l{
                            font-size:0.75rem;
                            color:#4f4f4f;
                            text-align:left;
                            left: 2.3rem;
                            top: 0.6rem;
                        }
                        .list-r-txt{
                            right: 1.3rem;
                            top: 0.65rem;
                            font-size:0.6rem;
                            color:#a8a8a8;
                            text-align:right;
                        }
                        .list-r{
                            width:0.4rem;
                            height:0.8rem;
                            background: url("../icon/arrow-right.png") no-repeat;
                            background-size: 100%;
                            position:absolute;
                            right: 0.8rem;
                            top: 0.7rem;
                        }
                    }
                }
            }
        }
    /*body结束*/
    }
</style>
