import { set } from '../../utils/helper';
import reportService from '@/service/reportsService';

export default {
  state: {
    dashboardData: [],
    servetime: '',
  },
  mutations: {
    SET_DASHBOARDDATA: set('dashboardData'),
    SET_SERVETIME: set('servetime'),
  },
  actions: {
    GET_DASHBOARDDATA:async ({ commit }) => {
      // const { data } = await reportService.getServe(
      //   'dashboardreport',
      //   '1',
      //   '1',
      // );
      const { data } = await reportService.getJson('./mask.json');
      const { results } = data;
      const { reportdata } = results[0];
      const dashboardData = JSON.parse(reportdata).reportData;
      console.log(dashboardData, 'data');
      commit('SET_DASHBOARDDATA',dashboardData);
    },
    GET_SERVETIME:async ({ commit }) => {
      const { data } = await reportService.getTime(
        'servertime',
        '1',
        '1',
      );
      // const { data } = await reportService.getJson('./servetime.json');
      const servetime = data.results;
      console.log(data, 'servetime');
      commit('SET_SERVETIME' ,servetime);
    },
  },
};
