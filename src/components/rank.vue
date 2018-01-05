<template>
  <div class="rank">
      <div class="rank-content">
        <ul>
          <li v-for="rankName in rankList">
            <router-link :to="'/rankDetail/'+rankName.rankid">
              <img v-bind:src="rankName.imgurl.replace(/{[^}]+}/g,'400')" alt="img" class="rankImg">
              <span>{{rankName.rankname}}</span>
              <i></i>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'rank',
  data() {
    return{
      rankList:''
    }
  },
  mounted(){
    this.$http.get('/ranking&json=true').then(({data})=>{
      this.rankList=data.rank.list;
    })
  },
}
</script>


<style scoped>
  .rank{
    margin-top: 10.3rem;
  }
  .rank-content{
    margin-top: 0;
  }
  .rank-content li{
    box-sizing: border-box;
  }
  .rank-content li a{
    /* margin-top: -1%; */
    display: block;
    padding: 0.7rem 2rem 0.7rem 1rem;
    border-bottom: 1px solid #e5e5e5;
    margin-left: 1.4rem;
    font-size: 2rem;
    color: #333;
    text-decoration: none;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
  }
  .rank-content li a img{
    width: 8.9rem;
    height: 8.9rem;
    margin-left: -2%;
  }
  
  .rank-content li a i{
    width: 1rem;
    height: 2rem;
    /* position: absolute; */
    /* top: 40%; */
    /* right: 1.4rem; */
    background: url(../assets/images/arrow_icon.png);
    background-size: 100% 100%;
  }
</style>
