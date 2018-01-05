<template>
  <div class="newSong">
      <div class="banner">
          <img src="./../assets/images/banner.jpg" alt="banner">
      </div>
      <div class="list-content">
          <ul>
              <li v-for="(item,index) in newList" v-on:click='play(item.hash,index)'>{{item.filename}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
import middle from './../assets/middle'
export default {
    name: 'newSong',
    data() {
        return{
            newList:''
        }
    },
    mounted(){ //获取首页新歌的歌曲
        this.$http.get('/proxy/?json=true').then(({data})=>{
            this.newList=data.data
        })
    },
    methods:{
        play(hash,index){ //点击歌曲列表传值到另一个兄弟组件
            this.$http.get('/play?r=play/getdata&hash='+hash).then(({data})=>{
                middle.$emit('musicUrl',index,data,this.newList)
            })
        }
    }
}
</script>


<style scoped>
    .newSong{
        margin-top: 5.8rem;
    }
    .banner{
        width: 100%;
        height: 12.25rem;
       margin-top: 11rem;
    }
    .banner img{
        width: 100%;
        height: 100%;
    }
    .list-content ul{
        width: 100%;
        list-style: none;
        padding-left: 1.4rem;
        overflow: hidden;
        padding-bottom: 8.4rem;
        box-sizing: border-box;
    }
    .list-content li{
        font-size: 1.6rem;
        text-align: left;
        width: 100%;
        height: 6.8rem;
        border-bottom: 1px solid #e5e5e5;
        line-height: 6.8rem;
        overflow: hidden;
    }
</style>
