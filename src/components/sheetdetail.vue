<template>
    <div class="sheetdetail">
        <div class="detail-header">
          <div class="goback" @click='goback'>
              <i></i>
          </div>
          <p>{{sheetName}}</p>
        </div>
        <div class="detail-content">
            <div class="detail-banner">
                <img v-bind:src="sheetImg.replace(/{[^}]+}/g,'400')" alt="">
            </div>
            <div class="detail-list">
                <ul>
                    <li v-for="(list,index) in detailList" @click='play(list.hash,index)'>
                        <span>{{list.filename}}</span>
                        <a>
                            <i></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import middle from '../assets/middle'
export default {
    name:'sheetdetail',
    data(){
        return{
            sheetId:this.$route.params.id,
            sheetName:'',
            sheetImg:'',
            detailList:''
        }
    },

    mounted(){
        this.$http.get('sheetDetail/'+this.sheetId+'?json=true').then(({data})=>{
            this.sheetName=data.info.list.specialname;
            this.sheetImg=data.info.list.imgurl;
            this.detailList=data.list.list.info
        })
    },

    methods:{
        goback:function(){
            this.$router.back(-1);
        },
        play:function(hash,index){
            this.$http.get('/play?r=play/getdata&hash='+hash).then(({data})=>{
                middle.$emit('musicUrl',index,data,this.detailList)
            })
        }
    }
}
</script>


<style>
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
    .detail-header p{
       color: white;
       height: 5rem;
       line-height: 5rem;
       font-size: 1.7rem;
        
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
    .detail-list ul li{
        height: 6.5rem;
        display: block;
        border-bottom: 1px solid #e5e5e5;
        color: #333;
        font-size: 1.7rem;
        text-indent: 0.3rem;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .detail-list ul li i{
        width: 2.3rem;
        height: 2rem;
        display: block;
        background: url(../assets/images/download_icon_2.png);
        background-size: 100% 100%;
        margin-right: 1.5rem;
    }
</style>
