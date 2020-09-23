import { set } from '../../utils/helper';
import reportService from '@/service/reportsService';
import moment from "moment";

export default {
  state: {
    title: 'Paint Mixing',
    warnText: '',
    loginStatus: false,
  },
  mutations: {
    SET_WARN_TEXT: set('warnText'),
    SET_TITLE: set('title'),
    SET_LOGIN_STATUS: set('loginStatus'),
  },
  actions: {
    VERTIFYAUTHNUMBER:async ({}, authNumber ) => {
      console.log(authNumber, 'authNumber');
      const { data } = await reportService.getElement(
        'authuser',
        1,
        1,
        `&query=username=="${authNumber}"`
      );
      const { results } = data;
      if (results && results.length > 0) {
        return true;
      } else {
        return false;
      } 
    },
    GETCURRENTSHIFT:async () => {
      const { data } = await reportService.getElement(
        'shift',
        1,
        1,
      );
      const { results } = data;
      if (results && results.length > 0) {
        const currentTime = moment().format('HH:mm:ss');
        const shiftData = results.filter(i => currentTime > i.starttime && currentTime < i.endtime)[0];
        if (shiftData) {
          return shiftData.shiftname;
        } else {
          return '';
        }
      }
    },
  },
};
