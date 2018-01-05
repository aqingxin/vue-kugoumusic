<template>
  <div class="searchResult">
      <div class="length">
        共找到{{resultLength}}条结果
      </div>
      <div class="result-content">
        <ul>
          <li v-for="(song,index) in result" v-on:click='resultPlay(song.hash,index)'>
            <span>{{song.filename}}</span>
            <a v-bind:href="download" download="downloadName" v-on:click='downloadMusic(song.hash,index)'>
              <i></i>
            </a>
          </li>
        </ul>
      </div>
  </div>

</template>

<script>
import middle from '../assets/middle'
export default {
  name:'searchResult',
  data() {
    return{
      result:'',
      resultLength:'',
      download:'',
      downloadName:''
    }
  },
  mounted(){
    middle.$on('searchResult',(data)=>{
      this.result=data.data.info;
      this.resultLength=data.data.info.length;
    })
  },
  methods:{
    resultPlay(hash,index){
      this.$http.get('/play?r=play/getdata&hash='+hash).then(({data})=>{
        // this.download=data.url;
        middle.$emit('musicUrl',index,data,this.result)
      })
    },
    downloadMusic(hash,index){
      this.$http.get('/play?r=play/getdata&hash='+hash).then(({data})=>{
        this.download=data.url;
        this.downloadName=data.songName
        // middle.$emit('musicUrl',index,data,this.result)
      })
    }
  }
}
</script>

<style>
  .length{
    height: 2.6rem;
    line-height: 2.6rem;
    background: #e6e6e6;
    padding-left: 1.5rem;
    font-size: 1.3rem;;
    color: #5d5d5d;
  }
  .result-content ul{
    padding-left: 1.5rem;
    list-style: none;
  }
  .result-content ul li{
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
  .result-content ul li i{
    width: 2.3rem;
    height: 2rem;
    display: block;
    background: url(../assets/images/download_icon_2.png);
    background-size: 100% 100%;
    margin-right: 1.5rem;
  }
</style>
