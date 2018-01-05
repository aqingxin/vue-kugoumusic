<template>
    <div class="rankDetail">
        <div class="detail-header">
          <div class="goback" @click='goback'>
              <i></i>
          </div>
          <span>{{rankName}}</span>
        </div>
        <div class="detail-content">
            <div class="detail-banner">
                <img v-bind:src="bannerImg.replace(/{[^}]+}/g,'400')" alt="">
                <div class="update-time">
                    <span>上次更新时间：</span>
                </div>
            </div>
            <div class="detail-list">
                <ul>
                    <li v-for="(list,index) in songSheetList" class="list-li" @click="sheetPlay(index,list.hash)">
                        <span>{{index+1}}</span>
                        <span>{{list.filename}}</span>
                        <i></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import middle from '../assets/middle'
export default {
  name:'rankDetail',
  data(){
      return{
          rankId:this.$route.params.id, //获取歌单的id
          rankName:'',
          bannerImg:'',
          songSheetList:'',
      }
  },
  mounted(){
      this.$http.get('/rankdetail/?rankid='+this.rankId+'&page=1&json=true').then(({data})=>{
          this.rankName=data.info.rankname;
          this.bannerImg=data.info.imgurl;
          this.songSheetList=data.songs.list; 
        //   this.allData=data.songs.list
      })
  },
  methods:{
      goback:function(){ //返回上一页
          this.$router.back(-1);
      },
      sheetPlay(index,hash){
          this.$http.get('/play?r=play/getdata&hash='+hash).then(({data})=>{
            middle.$emit('musicUrl',index,data,this.songSheetList)
         })
      }
  }
}
</script>

<style>
    .rankDetail{
        margin-top: 5.4rem;
    }
    .detail-header{
        width: 100%;
        height: 5rem;
        background: -webkit-linear-gradient(top,rgba(0,0,0,.6),transparent);
        position: fixed;
        top: 5.4rem;
        z-index: 3;
    }
    .goback{
        width: 4rem;
        height: 4rem;
        cursor: pointer;
        float: left;
        margin-top: 0.5rem;
    }
    .goback i{
        display: block;
        width: 1.6rem;
        height: 2.8rem;
        background: url(../assets/images/goback_1.png) no-repeat;
        background-size: 100% 100%;
        margin: 0.5rem auto;
    }
    .detail-header span{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.7rem;
        line-height: 5rem;
        color: white;
    }
    .detail-content{
        margin-top: 5.45rem;
    }
    .detail-banner{
        width: 100%;
        height: 20.8rem;
        overflow: hidden;
        position: relative;
    }
    .detail-banner img{
        width: 100%;
        margin-top: -82px;
    }
    .update-time{
        width: 100%;
        height: 5rem;
        background: -webkit-linear-gradient(bottom,rgba(0,0,0,.6),transparent);
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .update-time span{
        position: absolute;
        bottom: 2.2rem;
        left: 2rem;
        color: #fafff2;
        font-size: 1.4rem;
    }
    .detail-list ul{
        padding-left: 1.5rem;
        list-style: none;
    }
    .list-li{
        height: 6.5rem;
        display: block;
        border-bottom: 1px solid #e5e5e5;
        color: #333;
        font-size: 1.7rem;
        text-indent: 0.3rem;
        position: relative;
        /* display: table; */
        cursor: pointer;
    }
    .list-li i{
        width: 2.3rem;
        height: 2rem;
        display: block;
        background: url(../assets/images/download_icon_2.png);
        background-size: 100% 100%;
        /* margin-right: 1.5rem; */
        position: absolute;
        right: 1.5rem;
        top: 50%;
        margin-top: -1rem;
    }
    .list-li span:nth-child(2){
        padding-right: 2rem;
        padding-left: 3.2rem;
        box-sizing: border-box;
        display: table-cell;
        vertical-align: middle;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .list-li span:first-child{
        padding: 1rem;
        height: 2rem;
        line-height: 0rem;
        border-radius: 1rem;
        text-align: center;
        font-size: 1.2rem;
        display: inline-block;
        position: absolute;
        top: 50%;
        margin-top: -1rem;
    }
     .list-li:first-child span:first-child{
         background: #e80000;
         color: #fff;
     }
     .list-li:nth-child(2) span:first-child{
         background: #ff7200;
         color: #fff;
     }
     .list-li:nth-child(3) span:first-child{
         background: #f8b300;
         color: #fff;
     }
</style>
