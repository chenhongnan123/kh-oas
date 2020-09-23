<template>
  <header>
    <div class="header-left">
      <img src="../assets/shopworx.png" style="height:100%;"/>
      <span>{{title}}</span>
    </div>
    <div class="header-right">
      <span>{{currenttime}}</span>
      <span>{{currentshift}}</span>
    </div>
  </header>
</template>

<script>
import moment from "moment";
import {  mapState, mapActions } from 'vuex';
export default {
  name: 'charts',
  data() {
    return {
      currenttime: '',
      currentshift: '',
    }
  },
  computed:{
    ...mapState({
      title: state => state.common.title,
    })
  },
  methods:mapActions({
    getCurrentShift: 'common/GETCURRENTSHIFT',
  }),
  mounted(){
    this.$i18n.locale = 'eh';
    moment.locale('en');
    setInterval(async () => {
      this.currenttime = moment().format('MM') + ' ' + moment().format('MMM') + ',' + moment().format('YYYY HH:mm:ss');
      this.currentshift = await this.getCurrentShift();
    },1000);
  }
}
</script>

<style scoped lang="scss">
  header{
    position: fixed;
    width: 100%;
    height: 60px;
    background: #fff;
    top: 0;
    color: rgba(0, 0, 0,.7);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    line-height:60px;
    z-index: 100;
    .header-left{
      height: 100%;
      width: 50%;
      img{
        vertical-align: middle;
      }
      span{
        font-size: 20px;
        color: #283B52;
        letter-spacing: 0;
        line-height: 60px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;;
        font-weight: 700;
      }
    }
    .header-right{
      font-family: HelveticaNeue;
      font-size: 20px;
      line-height: 40px;
      color: #222222;
      span{
        display: inline-block;
        padding: 0 20px;
        border-left: 1px solid #9EABB9;
      }
      span:nth-child(1){
        font-family: Arial-BoldMT;
      }
    }
    h2{
      font-size: 20px;
      color: rgba(0,0,0,0.87);
    }
  }
</style>
