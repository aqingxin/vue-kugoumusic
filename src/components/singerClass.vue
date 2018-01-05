<template>
    <div class="singerClass">
        <div class="singer-header">
          <div class="goback" @click='goback'>
              <i></i>
          </div>
          <p>{{className}}</p>
        </div>
        <div class="singerclass-content">
            <ul class="singer-ul panel-ul">
                <li v-for="list in singer">
                    <router-link to='/'>
                        <div class="singer-left">
                            <img v-bind:src="list.imgurl.replace(/{[^}]+}/g,'400')" alt="">
                        </div>
                        <div class="singer-right">
                            <p>{{list.singername}}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
  name:'singerClass',
  data(){
      return{
          classId:this.$route.params.id,
          className:'',
          singer:''
      }
  },
  mounted(){
    //   console.log(this.classId)
      this.$http.get('/singerClass/'+this.classId+'?json=true').then(({data})=>{
          this.className=data.classname;
          this.singer=data.singers.list.info
      })
  },

  methods:{
      goback(){
          this.$router.back(-1);
      }
  }
}
</script>


<style>
    .singer-header{
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
    .singer-header p{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.7rem;
        line-height: 5rem;
    }
    .singerclass-content{
        padding-top: 10.6rem;
    }
    .singer-ul li a{
        /* padding-left: 7.5rem; */
        display: block;
        position: relative;
        margin-left: 1.2rem;
        padding: 1.4rem 4rem 1.4rem 11rem;
        border-bottom: 1px solid #e5e5e5;
        text-decoration: none;
    }
    .panel-il li a{
        padding-left: 7.5rem; 
    }
    .singer-left{
        width: 6rem;
        height: 6rem;
        position: absolute;
        top: 1rem;
        left: 0;
    }
    .singer-left img{
        width: 100%;
    }
    .singer-right{
        min-height: 6rem;
        line-height: 6rem;
        display: block;
        font-size: 1.7rem;
        color: #333;
    }
</style>
