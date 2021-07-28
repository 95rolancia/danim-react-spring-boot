import { instance } from './http-instance';

class HttpUser {
  constructor(instance) {
    this.instance = instance;
  }

  async getUser() {
    try {
      const res = await this.instance.get('/auth/me');
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 401) {
        return res;
      }
      throw new Error(`auth email error ${error}`);
    }
  }
}

export default new HttpUser(instance);
