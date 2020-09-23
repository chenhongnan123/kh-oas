import Service from '@/plugins/axios';

// const reqConfig = { timeout: 45000 };
const reqConfig = {};
// const base = '/server/executereport';

export default {
  getReport(base,reportName, customerId, userId, postData, queryParams) {
    try {
      const query = queryParams || '';
      const url = `/server/${base}/${reportName}?customerid=${customerId}&userid=${userId}${query}`;
      return Service.post(url, postData, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },
  getElement(elementName, customerId, userId, queryParams, postData) {
    try {
      const query = queryParams || '';
      const url = `/server/elements/${elementName}/records?customerid=${customerId}&userid=${userId}${query}`;
      return Service.get(url, postData, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },
  postElement(elementName, customerId, userId, postData) {
    try {
      const url = `/server/elements/${elementName}/records?customerid=${customerId}&userid=${userId}`;
      return Service.post(url, postData, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },
  putElement(elementName, id, customerId, userId, postData) {
    try {
      const url = `/server/elements/${elementName}/records/${id}?customerid=${customerId}&userid=${userId}`;
      return Service.put(url, postData, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },
  postElementBulk(elementName, customerId, userId, postData) {
    try {
      const url = `/server/elements/${elementName}/createbulkrecords?customerid=${customerId}&userid=${userId}`;
      return Service.post(url, postData, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },
  getServe(reportName, customerId, userId, queryParams) {
    try {
      const query = queryParams || '';
      const url = `/server/${reportName}?customerid=${customerId}&userid=${userId}${query}`;
      return Service.get(url);
    } catch (e) {
      throw new Error(e);
    }
  },
  postServe(reportName, customerId, userId, queryParams, payload) {
    try {
      const query = queryParams || '';
      const url = `/server/${reportName}?customerid=${customerId}&userid=${userId}${query}`;
      return Service.post(url, payload);
    } catch (e) {
      throw new Error(e);
    }
  },
  getJson(filename) {
    try {
      const url = filename;
      return Service.get(url, reqConfig);
    } catch (e) {
      throw new Error(e);
    }
  },
};
