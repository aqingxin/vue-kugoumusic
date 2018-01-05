<template>
  <div class="audioBar">
      <audio v-bind:src="musicUrl" id='audio' ref="player" preload>
          <source v-bind:src="musicUrl" type='audio/mepg'>
      </audio>
      <div class="audioDiv" v-if='barStyle'>
          <img v-bind:src="imgUrl" alt="singerImg" class="singerImg" @click="showLrc">
          <div class="songInfomartion">
              <p class="song">{{songName}}</p>
              <p class="singer">{{singerName}}</p>
          </div>
          <div class="musicIcon">
              <i v-bind:class='{"pause":!pause,"play":pause}' class='playOrpause' @click="toggle"></i>
              <i class="next" @click="nextSong"></i>
          </div>
      </div>
      <!-- <transition name="fade"> -->
          <div class="fadediv" id="fadediv">
              <div class="detail-header">
                <div class="goback" @click='goback'>
                    <i></i>
                </div>
                <span>{{songName}}</span>
              </div>
              <div class="content-img" @click="shows" v-if="lrcNone">
                  <img v-bind:src="imgUrl" alt="">
              </div>
              <div class="lrc"  @click="imgShows" v-if="imgNone">
                  <div style="transition: -webkit-transform 0.3s ease-out; transform-origin: 0px 0px 0px;" :style="{'transform':' translate3d(0px,'+ lrcOffset +'px, 0px)'}">
                    <p v-for="(item,index) in afterLrc" :id="'line-'+index" :key="index"  class="lrcP"  :class="{on: index==lrcIndex}">{{item.txt}}</p>
                  </div>
              </div>
              <div class="time-wrap">
                  <div class="timeshow">{{timeNow}}</div>
                  <div class="progress-wrap">
                      <div class="progress-bar">
                          <div class="preview-progress" id="preview"></div>
                          <div class="progress" id="progress">
                              <span v-on:touchstart="touchDown" v-on:touchend="touchEnd" id="crle"></span>
                          </div>
                      </div>
                  </div>
                  <div class="time">
                      {{allTime}}
                  </div>
              </div>
              <div class="musicIcons">
                  <i class="prev" @click="prevSong"></i>
                  <i class="playPause" v-bind:class='{"pauseIcon":!pause,"playIcon":pause}' @click="toggle"></i>
                  <i class="nextsong" @click="nextSong"></i>
              </div>
              <div class="faded-bg" v-bind:style="{backgroundImage:`url(${imgUrl})`,backgroundSize:`cover`,backgroundRepeat:`no-repeat`,backgroundPosition:`50%`}">
              </div>
              <div class="fade-bg2">

              </div>
          </div>
      <!-- </transition> -->
  </div>
</template>

<script>
import middle from './../assets/middle'
export default {
    name: 'audioBar',
    data() {
        return{
            musicUrl:'',
            songName:'',
            singerName:'',
            imgUrl:'',
            songIndex:'',
            nextSongHash:'',
            allData:'',
            barStyle:false,
            pause:false,
            show:false,
            allTime:'',
            timeNow:'',
            timeLength:'',
            allLengtth:'',
            lenght:'',
            downLeft:'',
            changeLeft:'',
            lyrc:'',
            afterLrc:[],
            lrcIndex:0,
            lrcNone:true,
            imgNone:false,
        }
    },
    mounted(){
        middle.$on('musicUrl',(index,musicData,allData)=>{  //从另一个组件接收值并且播放
            this.musicUrl=musicData.data.play_url;
            this.songName=musicData.data.song_name;
            this.singerName=musicData.data.author_name;
            this.lyrc=musicData.data.lyrics;
            // console.log(audio)
            this.$http.get('/img/?hash='+musicData.data.hash+'&size=200&format=jsonp').then(({data})=>{
                this.imgUrl=data.url
            })
            // audio.play();
            this.songIndex=index;
            this.allData=allData;
            this.allTime=audio.duration;

            audio.addEventListener("loadedmetadata",function(){
                this.play();
            });
            this.addEventListeners();
        })
    },
    methods:{
        toggle(){  //切换播放和暂停按钮
            this.pause=!this.pause;
            var audio=document.getElementById('audio');
            if(this.pause==false){
                audio.play();
            }else{
                audio.pause();
            }
        },
        nextSong(){  //切换下一首歌曲
            this.songIndex++;
            this.nextSongHash=this.allData[this.songIndex].hash;
            this.$http.get('/play?r=play/getdata&hash='+this.nextSongHash).then(({data})=>{
                this.musicUrl=data.data.play_url;
                this.songName=data.data.song_name;
                this.singerName=data.data.author_name;
                this.lyrc=data.data.lyrics;
                this.$http.get('/img/?hash='+this.nextSongHash+'&size=200&format=jsonp').then(({data})=>{
                    this.imgUrl=data.url;
                })
                audio.addEventListener("loadedmetadata",function(){
                    this.play();
                });
            })
        },
        prevSong(){ //切换上一首歌曲
            this.songIndex--;
            if(this.songIndex<=0){
                this.songIndex=0;
            }
            this.nextSongHash=this.allData[this.songIndex].hash;
            this.$http.get('/play/?r=play/getdata&hash='+this.nextSongHash).then(({data})=>{
                this.musicUrl=data.data.play_url;
                this.songName=data.data.song_name;
                this.singerName=data.data.author_name;
                this.lyrc=data.data.lyrics;
                this.$http.get('/img/?hash='+this.nextSongHash+'&size=200&format=jsonp').then(({data})=>{
                    this.imgUrl=data.url;
                    // console.log(data.url);
                })
                audio.addEventListener("loadedmetadata",function(){
                    this.play();
                });
            })
        },

        //显示或不显示歌词
        showLrc(){
            // this.show=true;
            var fadediv=document.getElementById('fadediv');
            fadediv.style.cssText+='transform:translateY(0);height:100%';
        },
        goback(){
            // this.show=false;
            fadediv.style.cssText+='transform:translateY(200%)'
        },
        shows(){
            this.imgNone=true;//歌词显示与否
            this.lrcNone=false;//图片显示与否
        },
        imgShows(){
            this.lrcNone=true;
            this.imgNone=false;
        },
        //audio的播放时间和总时间
        addEventListeners:function(){
            this.$refs.player.addEventListener('timeupdate',this._currentTime);
            this.$refs.player.addEventListener('canplay',this._durationTime);
        },
        removeEventListeners:function(){
            // const self = this;
            this.$refs.player.removeEventListener('timeupdate', this._currentTime);
        },
        _currentTime:function(){
            var progress=document.getElementById('progress');
            var preview=document.getElementById('preview');
            this.timeNow=parseInt(this.$refs.player.currentTime);
            this.timeLength=this.timeNow;
            this.timeNow=Math.floor(this.timeNow/60)+":"+((this.timeNow%60/100).toFixed(2).slice(-2));
            this.lenght=this.timeLength/this.allLengtth*preview.offsetWidth;        
            if(this.timeLength>=this.allLengtth&&this.allLengtth!=''){
                this.nextSong();
            }
            progress.style.cssText+='width:'+this.lenght+'px';
            crle.style.cssText+='left:'+this.lenght+'px';
            if(this.lyrc!=''){

                this.lyrcRoll();
            }
        },
        _durationTime:function(){
            this.allTime=parseInt(this.$refs.player.duration);
            this.allLengtth=this.allTime;
            this.allTime=Math.floor(this.allTime/60)+":"+((this.allTime%60/100).toFixed(2).slice(-2));
        },
        //鼠标点击的时候
        touchDown(e){
            var crle=document.getElementById('crle');
            this.downLeft=e.touches[0].pageX-crle.offsetLeft;
            var downLeft=this.downLeft;
            var changeLeft;
            var self=this;
            crle.addEventListener('touchmove',function(e){
                changeLeft=e.changedTouches[0].pageX-downLeft;
                crle.style.cssText+='left:'+(changeLeft-7.5)+'px';
                progress.style.cssText+='width:'+changeLeft+'px';
                self.$refs.player.currentTime=changeLeft/self.allLengtth*preview.offsetWidth;
                self.removeEventListeners();
            })
        },
        touchEnd(){
            this.addEventListeners();
        },
        //鼠标滑动的时候
        // timeChange(e){
        //     e.preventDefault();
        //     this.changeLeft=e.changedTouches[0].pageX-this.downLeft;
        //     if(this.changeLeft<=0){
        //         this.changeLeft=0;
        //     }
        //     this.$refs.player.currentTime=this.changeLeft/this.allLengtth*preview.offsetWidth;
        //     progress.style.cssText+='width:'+this.changeLeft+'px';
        //     crle.style.cssText+='left:'+(this.changeLeft-7.5)+'px';
        // },
        //将歌词的时间和文字一同push进一个数组
        lyrcRoll(){
            var lyrics=this.lyrc.split('\n');
            var lrcObj=[];
            var timeReg=/\[\d*:\d*((\.|\:)\d*)*\]/g;
            for(var i=0;i<lyrics.length;i++){
                var timeRegExpArr=lyrics[i].match(timeReg);
                if(!timeRegExpArr) continue;
                var txt=lyrics[i].replace(timeReg,'');
                for(var k=0;k<timeRegExpArr.length;k++){
                    var array={};
                    var t=timeRegExpArr[k];
                    var min=Number(String(t.match(/\[\d*/i)).slice(1)),
                        sec = Number(String(t.match(/\:\d*/i)).slice(1));
                    var time=min * 60 + sec
                    array.time=time;
                    array.txt=txt;
                    lrcObj.push(array);
                }
            }
            this.afterLrc=lrcObj
            console.log(this.afterLrc);
        }
    },
    watch:{
        musicUrl:function(){
            if(this.musicUrl!=0){  //判断audio的src是否为0，如果不为0，audio的样式则出现
                this.barStyle=true;
                // this.lyrcRoll();
            }
            if(audio.paused){
                this.pause=false;
            }else if(audio.playing){
                this.pause=true;
            }
        },
        imgUrl:function(){
            if(this.imgUrl==undefined){
                console.log('dfd')
            }
        },
    },
    computed:{
        //歌词滚动  根据当前的时间进行匹配歌词
        lrcOffset(){
            if(this.afterLrc){
                var current=Math.round(this.timeLength);
                for(var i=0;i<this.afterLrc.length;i++){
                    if(this.afterLrc[i].time===current){
                        this.lrcIndex=i
                    }
                }
                return -(this.lrcIndex)*40
            }
        }
    }
}
</script>

<style scoped>
    audio{
        display: none;
    }
    .audioDiv{
        width: 100%;
        height: 8.4rem;
        position: fixed;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.9);
        color:#fff;
        box-sizing: border-box;
        padding: 0.5rem 1rem 0.5rem 0.5rem;
        display: flex;
    }
    .audioDiv img{
        width: 7.5rem;
        height: 7.5rem;
        border-radius: 5px;
    }
    .songInfomartion{
        width: 65%;
    }
     .songInfomartion p{
        width: 100%;
        margin-left: 1rem;
        /* font-size: 1.6rem; */
     }
     .songInfomartion p:nth-child(1){
        font-size: 1.6rem;
        text-align: left;
        text-overflow: ellipsis;
        color: #fff;
        line-height: 5.4rem;
     }
     .songInfomartion p:nth-child(2){
        margin-top: -1.4rem;
        font-size: 1.4rem;
        text-align: left;
        text-overflow: ellipsis;
        color: #888;
     }
     .audioDiv i{
        width: 3.2rem;
        height: 3.2rem;
        margin-left: 2rem;
        vertical-align: middle;
        cursor: pointer;
        display: inline-block;
     }
     .musicIcon{
        position: absolute;
        right: 1rem;
        top: 3rem;
        display: flex;
     }
     .pause{
        background: url(./../assets/images/pause_icon.png);
        background-size: 100% 100%;
     }
     .play{
        background: url(./../assets/images/play_icon.png);
        background-size: 100% 100%;
     }
     .next{
        background: url(./../assets/images/next_icon.png);
        background-size: 100% 100%;
     }
     .fadediv{
        width: 100%;
        padding-top: 10rem;
        padding-bottom: 5rem;
        position: fixed;
        top: 5.4rem;
        left: 0;
        z-index: 4;
        overflow: hidden;
        background: white;
        transform: translateY(200%);
        transition: 0.5s;
        box-sizing: border-box;
        /* background-size: 100% 100%; */
     }
     .faded-bg{
         width: 100%;
         height: 100%;
         position: absolute;
         top: 0;
         left: 0;
         z-index: -1;
         overflow: hidden;
         filter: blur(15px);
         /* background-size: 100% 100%; */
     }
     .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
     }
     .fade-enter, .fade-leave-to {
        opacity: 0
     }
     .detail-header{
        width: 100%;
        height: 5rem;
        background: -webkit-linear-gradient(top,rgba(0,0,0,.6),transparent);
        position: absolute;
        top: 0;
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
    .content-img{
        width: 18rem;
        height: 18rem;
        margin: 0rem auto;
    }
    .content-img img{
        width: 100%;
    }
    .lrc{
        height: 72px;
        overflow: hidden;
    }
    .time-wrap{
        width: 100%;
        padding: 1.4rem 1.2rem;
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: justify;
        -webkit-box-orient: horizontal;
        -webkit-box-flex: 1;
        color: white;
        position: fixed;
        bottom: 20rem;
    }
    .progress-wrap{
        height: .2rem;
        margin: 1rem;
        background: #232228;
        position: relative;
        z-index: 2;
        -webkit-box-flex: 1;
    }
    .progress-bar{
        width: 100%;
        height: 100%;
    }
    .preview-progress{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #6c6b70;
    }
    .progress{
        /* width: 10%; */
        height: 100%;
        background: #3195fb;
        position: absolute;
        top: 0;
        left: 0;
    }
    .progress span{
        width: 1.3rem;
        height: 1.3rem;
        position: absolute;
        top: 50%;
        /* left:7.5px; */
        margin-top: -.6rem;
        background: #3195fd;
        display: block;
        border-radius: 50%;
    }
    .musicIcons{
        margin: 0 auto;
        text-align: center;
        width: 100%;
        position: fixed;
        bottom: 10rem;
        /* left: 50%; */
        /* transform: translateX(22%); */
    }
    .prev,.nextsong{
        width: 4rem;
        height: 4rem;
        margin: 1.6rem;
        display: inline-block;
        vertical-align: middle;
        background: url(../assets/images/play_prev.png) no-repeat;
        background-size: 100%;
    }
    .playPause{
        width: 6rem;
        height: 6rem;
        margin: 1.6rem;
        display: inline-block;
        vertical-align: middle;
        background: url(../assets/images/play_pause.png) no-repeat;
        background-size: 100%;
    }
    .nextsong{
        background: url(../assets/images/play_next.png) no-repeat;
        background-size: 100%;
    }
    .playIcon{
        background: url(../assets/images/play_play.png) no-repeat;
        background-size: 100%;
    }
    .fade-bg2{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        position: absolute;
        top:0;
        left: 0;
        z-index: -1;
    }
    .lrc{
        /* margin-top: 1rem; */
        color: #afabac;
        text-align: center;
        font-size: 1.5rem;
        overflow-y: auto;
        height: 24rem;
        /* height: 6rem; */
        /* position: relative; */
        
    }
    .lrc div{
        width: 100%;
        margin-top: 11rem;
        /* position: absolute */
        
    }
    .lrc p{
        height: 40px;
    }
    .on{
        color: #2ca2f9;
    }
</style>
