<template>
  <div class="search">
      <div class="search-header">
          <div class="goback" @click='goback'>
              <i></i>
          </div>
          <span>搜索</span>
      </div>
      <div class="search-box">
          <form class="search-form" v-on:submit.prevent="searchSong">
            <span class="search-icon"></span>
            <input type="text" placeholder="歌手/歌名/拼音" v-bind:value=keyword id='keyword'>
            <input type="submit" value="搜索">
        </form>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import middle from '../assets/middle'
export default {
    name: 'search',
    data() {
        return{
            keyword:'',
        }
    },
    mounted(){
        middle.$on('keyword',(keyword)=>{
            this.keyword=keyword
        })
    },
    methods:{
        goback:function(){ //返回上一页
            this.$router.back(-1);
        },
        searchSong:function(){ //提交搜索
            var keyword=document.getElementById('keyword').value;
            if(keyword.replace(/(^\s*)|(\s*$)/g, "")){
                this.$http.get('/searchSong?format=json&keyword='+keyword+'&page=1&pagesize=30&showtype=1').then(({data})=>{
                    //   console.log(data.data.info.length);
                    middle.$emit('searchResult',data)
                })
                this.$router.push({path:'/searchResult'});
                this.keyword=keyword
            }else{
                alert('keyword不能为空')
            }
        }
    },
}
</script>

<style>
    .search-header{
        width: 100%;
        height: 5rem;
        background: white;
        box-shadow: 0px 2px 10px #f4f4f4;
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
        background: url(../assets/images/goback.png) no-repeat;
        background-size: 100% 100%;
        margin: 0.5rem auto;
    }
    .search-header span{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.7rem;
        line-height: 5rem;
    }
    .search-box{
        padding: 1.4rem;
        margin-top: 10.6rem;
    }
    .search-form{
        position: relative;
    }
    .search-form input[type=text]{
        width: 78%;
        padding: 0.7rem 0.14rem 0.7rem 3.4rem;
        border: 1px solid #e5e5e5;
        border-radius: 5px; 
        font-size: 1.65rem;
        margin-right: 3%;
        outline: none;
    }
    .search-form input[type=submit]{
        width: 17.25%;
        height: 3.4rem;
        line-height: 3.4rem;
        border-radius: 5px;
        text-align: center;
        color: #959595;
        background: #e5e5e5;
        border: none;
        font-size: 1.5rem;
    }
    .search-icon{
        width: 2rem;
        height: 3.5rem;
        display: block;
        background: url(../assets/images/search_icon.png) no-repeat;
        background-size: 100% 90%;
        position: absolute;
        top: 1px;
        left: 0.7rem;
    }
</style>
