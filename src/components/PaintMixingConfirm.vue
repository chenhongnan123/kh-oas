<template>
  <div class="paint-mixing-confirm">
    <p>
      <span>Material 2 - Material ID does not match Recipe</span>
      <span>Material Required: Material 2</span>
      <span>Material Scanned: Material 9</span>
    </p>
    <div>
      <v-btn color="error">REJECT</v-btn>
      <v-btn class="ml-4" color="success">APPROVE</v-btn>
    </div>
    <img src="../assets/close.svg" />
    <AuthLogin/>
  </div>
</template>

<script>
import AuthLogin from './AuthLogin';
export default {
  name: 'PaintMixingConfirm',
  data() {
    return {
    }
  },
  components: {
    AuthLogin
  }
}
</script>

<style  lang="scss">
.paint-mixing-confirm{
  height: 235px;
  background: #5F6D7E;
  border-radius: 2px;
  border-radius: 2px;
  padding-top: 50px;
  // position: relative;
  p{
    background: rgba(0,0,0,.46);
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    border-radius: 4px;
    width: 430px;
    height: 95px;
    margin-left: 50%!important;
    transform: translate(-50%);
    padding: 10px 5px!important;
    span{
      font-family: ArialMT;
      font-size: 15px;
      line-height: 25px;
      color: #FFFFFF;
      display: block;
    }
  }
  >div:nth-child(2){
    margin-top: 20px;
    margin-left: 313px;
    .v-btn{
      height: 64px!important;
      font-size: 18px!important;
    }
  }
  img{
    position: absolute;
    width: 32px;
    top: 31px;
    right: 31px;
  }
}
</style>
