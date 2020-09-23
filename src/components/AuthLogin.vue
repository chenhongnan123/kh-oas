<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
    persistent
    light
    class="auth-login"
  >
    <v-card>
      <v-card-title class="headline d-flex justify-space-between">
        <span>登录验证</span>
        <v-icon color="333" @click="dialog = false">mdi-cancel</v-icon>
      </v-card-title>
      <v-card-text>
        <v-text-field
        v-model="username"
        label="用户名"
        outlined
        light
        @input="errorMessages = ''"
        :error="!!errorMessages"
        >
        </v-text-field>
        <v-text-field
        v-model="password"
        label="密码"
        outlined
        light
        @input="errorMessages = ''"
        :error-messages="errorMessages"
        type="password"
        >
        </v-text-field>
        <v-btn
        color="primary"
        @click="handleLogin"
        style="width:100%;height:56px;"
        :disabled="!username || !password"
        >
        登录
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import reportService from '@/service/reportsService';
import {  mapState,mapMutations,mapActions } from 'vuex';
export default {
  name: 'AuthLogin',
  data() {
    return {
      username: '',
      password: '',
      errorMessages: ''
    }
  },
  props: ['loginDialog'],
  computed:{
    dialog:{
      get(){
        return this.loginDialog;
      },
      set(val){
        this.$emit('handleDialog');
      }
    }
  },
  methods:{
    ...mapMutations({
      setLoginStatus: 'common/SET_LOGIN_STATUS'
    }),
     ...mapActions({
      vertifAuthNumber: 'common/VERTIFYAUTHNUMBER',
    }),
    async handleLogin(){
      const isLegalAuth = await this.vertifAuthNumber(this.username);
      if (!isLegalAuth) {
        this.errorMessages = '该用户无权限';
        this.username = '';
        this.password = '';
        return;
      };
      if (!this.username.includes('@')) {
        this.errorMessages = '用户名或密码错误';
        return;
      };
      const payload = {
        "username": this.username.split('@')[0],
        "customername": this.username.split('@')[1],
        "password": this.password
      }
      const { data } = await reportService.postServe(
        'authenticate',
        null,
        null,
        null,
        payload
      );
      console.log(data, 'data');
      const { sessionId } = data;
      if (sessionId) {
        this.setLoginStatus(true);
        this.dialog = false; 
        this.username = '';
        this.password = '';
      } else {
        this.errorMessages = '用户名或密码错误';
      }
    }
  }
}
</script>

<style  lang="scss">
.auth-login{
  .v-btn.v-size--default{
    font-size: 18px!important;
  }
  .v-label {
    font-size: 18px;
    color: #333;
  }
}
</style>
