<template>
  <div class="production">
    <div class="bucket-barcode">
      <v-row>
        <v-col cols="4">
          <v-text-field
          v-model="workorder"
          label="工单号"
          :disabled="workorderConfirm"
          outlined
          height="64"
          >
          </v-text-field>
        </v-col>
        <v-col class="d-flex flex-row-reverse">
          <v-btn color="info" :disabled="!workorder" @click="workorder = '',workorderConfirm = false">重置</v-btn>
          <v-btn color="primary" class="mr-4" :disabled="!workorder" @click="handleChangeBucketNumber">提交</v-btn>
        </v-col>
      </v-row>
    </div>
    <ul class="ul mt-3">
      <li>
        <h3>工单号</h3>
        <p>{{workorderRecord.workorder}}</p>
      </li>
      <li>
        <h3>计划</h3>
        <p>{{workorderRecord.targetquantity}}</p>
      </li>
      <li class="mt-3">
        <h3>订单号</h3>
        <p>{{workorderRecord.partnumber}}</p>
      </li>
      <li class="mt-3">
        <h3>订单名</h3>
        <p>{{workorderRecord.partname}}</p>
      </li>
    </ul>
    <div class="material-barcode mt-3">
      <div class="mt-3">
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="8">
                <v-text-field
                v-model="actualquantity"
                :disabled="actualquantityConfirm"
                label="数量"
                type="number"
                outlined
                height="64"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="d-flex flex-row-reverse">
            <v-btn color="info" :disabled="!actualquantity" @click="handleBucketReset">重置</v-btn>
            <v-btn color="primary" class="mr-4" :disabled="!actualquantity" @click="handleNetWeight">提交</v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="mt-3">
        <v-row>
          <v-col cols="8"></v-col>
          <v-col cols="4"  class="d-flex flex-row-reverse">
            <v-btn
            color="primary"
            class="ml-4"
            @click="completeDialog = true"
            :disabled="!workorderRecord.workorder || !actualquantity || !operateNumber"
            >
            完成
            </v-btn>
            <v-text-field
            v-model="operateNumber"
            label="工号"
            type="text"
            outlined
            style="width:200px;"
            height="64"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </div>
      <v-dialog
        v-model="completeDialog"
        max-width="290"
        persistent
        light
      >
        <v-card>
          <v-card-title class="headline">是否确认完成？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="handleSubmit"
            >
              <v-btn color="primary">是</v-btn>
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="completeDialog = false"
            >
              <v-btn color="primary">否</v-btn>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {  mapState,mapMutations } from 'vuex';
import reportService from '@/service/reportsService';
export default {
  name: 'Production',
  data() {
    return {
      workorder: null,
      workorderConfirm: false,
      actualquantity: null,
      actualquantityConfirm: false,
      workorderRecord: {},
      operateNumber: '',
      completeDialog: false
    }
  },
  mounted() {
    this.setTitle('生产');
    this.setWarntext('');
  },
  methods: {
    ...mapMutations({
      setWarntext: 'common/SET_WARN_TEXT',
      setTitle: 'common/SET_TITLE',
    }),
    async handleChangeBucketNumber() {
      const workorder = this.workorder;
      this.setWarntext('');
      if (!workorder) return;
      const { data } = await reportService.getElement(
        'planning',
        1,
        1,
        `&query=workorder=="${this.workorder}"`
      );
      const { results } = data;
      if (results && results.length > 0) {
        console.log(results, 'results');
        this.workorderRecord = results[0];
        this.workorderConfirm = true;
      } else {
        this.setWarntext('该工单号不存在');
        this.workorder = null;
      }
    },
    handleNetWeight() {
      if (this.actualquantity <= 0) {
        this.setWarntext('数量必须大于0');
        return;
      };
      this.setWarntext('');
      this.actualquantityConfirm = true;
    },
    handleBucketReset() {
      this.actualquantity = '';
      this.setWarntext('');
      this.actualquantityConfirm = false;
    },
    async handleSubmit() {
      const {
        workorder, 
        partnumber,
        partname,
      } = this.workorderRecord;
      const payloadStock = {
        workorder, 
        partnumber,
        partname,
        actualquantity: this.actualquantity,
        operatorname: this.operateNumber,
        siteName: 'kh'
      };
      const { data } = await reportService.postElement(
        'productionrecord',
        1,
        1,
        payloadStock
      );
      console.log(data, 'results');
      const { id } = data;
      if (id) {
        this.completeDialog = false;
        this.workorderConfirm = false;
        this.actualquantityConfirm = false;
        this.workorder = null;
        this.actualquantity = null;
        this.workorderRecord = {};
        this.operateNumber = '';
      } else {
        this.setWarntext('网络错误');
      }
    }
  }
}
</script>

<style  lang="scss">
.production{
  >p{
    border: 1px solid #979797;
    height: 0;
  }
  .v-text-field__details{
    display: none;
  }
  .v-text-field__slot{
    input{
      padding: 0;
      font-size: 20px;
    }
  }
  .v-input .v-label {
    font-size: 20px;
    color: #C5D1E1;
    height: 30px;
    line-height: 30px;
  }
  .v-btn.v-size--default{
    height: 64px!important;
    font-size: 18px!important;
  }
  .v-input__slot{
    margin: 0;
  }
  >ul{
    width: 450px;
    height: 150px;
    background: #283B52;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;;
    padding: 6px 10px;
    li{
      width: 200px;
      h3{
        font-family: HelveticaNeue;
        font-size: 20px;
        line-height: 25px;
        color: #C5D1E1;
      }
      p{
        font-family: HelveticaNeue;
        font-size: 22px;
        line-height: 25px;
        color: #FFFFFF;
        margin-top: 5px!important;
      }
    }
  }
}
</style>
