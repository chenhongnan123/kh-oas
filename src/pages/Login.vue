<template>
  <div class="login">
    <div class="login-left">
      <div class="login-body">
        <div style="">
          <!-- <v-text-field label="Enter Employee ID" outlined height="64"></v-text-field>
          <p><span>OR</span></p> -->
          <v-text-field label="用户名" outlined height="64" style="margin-top:20px;"></v-text-field>
          <v-text-field label="密码" outlined height="64"></v-text-field>
          <v-btn color="primary" style="margin-top:20px;height:64px;">SUBMIT</v-btn>
          <!-- <v-btn color="info" style="margin-top:15px;height:64px;"><img src="../assets/settings-32.svg" style="height:20px;margin-right:10px;"> SUBMIT</v-btn> -->
        </div>
      </div>
      <div class="login-alert"></div>
    </div>
    <div  class="login-right"><SideView/></div>
  </div>
</template>

<script>
import SideView from "../components/SideView";
export default {
  name: 'Login',
  mounted(){
    this.$i18n.locale = 'eh'
  },
  components: {
    SideView
  }
}
</script>

<style lang="scss">
.login{
  height: 100%;
  display: flex;
  justify-content: space-between;
  .v-btn{
    font-size: 24px!important;
  }
  .v-label {
    font-size: 24px;
    color: #C5D1E1;
    line-height: 29px!important;
    height: 32px!important;
  }
  .v-text-field__slot{
    input{
      padding: 0;
      font-size: 24px;
      color: #fff;
    }
  }
  .login-left{
    width: 676px;
    height: 100%;
    .login-body{
      height: 90%;
      background: #283B52;
      border-radius: 2px;
      border-radius: 2px;
      >div{
        width:288px;
        padding-top:80px;
        margin-left: 50%;
        transform: translate(-50%);
      }
      p{
        width: 400px;
        height: 2px;
        background: #13253C;
        border-radius: 2px;
        border-radius: 2px;
        position: relative;
        top: -10px;
        left: 50%;
        transform: translate(-50%);
        span{
          font-family: Helvetica;
          font-size: 20px;
          width: 50px;
          height: 30px;
          color: #C5D1E1;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          background: #283B52;
          text-align: center;
        }
      }
      .v-btn.v-size--default{
        font-size: 20px;
        width: 100%;
        height: 64px;
      }
    }
    .login-alert{
      height: 8%;
      background: #283B52;
      margin-top: 10px;
    }
  }
  .login-right{
    width: 296px;
  }
}
</style>
