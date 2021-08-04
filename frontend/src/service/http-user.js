import { instance } from './http-instance';

class HttpUser {
  constructor(instance) {
    this.instance = instance;
  }

  async getUser() {
    try {
      const res = await this.instance.get('/auth/me');
      console.log(res);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 401) {
        return res;
      }
      throw new Error(`auth me error ${error}`);
    }
  }

  async getUserInfo(nickname) {
    try {
      const res = await this.instance.get(`/users/${nickname}`);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 401) {
        return res;
      }
      throw new Error(`getUserInfo ${error}`);
    }
  }

  async setInterestArea(area) {
    try {
      console.log(this.instance.defaults);
      const res = await this.instance.post('/interest', area);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 401) {
        return res;
      }
      throw new Error(`set interest area error ${error}`);
    }
  }
}

export default new HttpUser(instance);
