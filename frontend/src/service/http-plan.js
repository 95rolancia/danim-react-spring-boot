import { instance } from './http-instance';

class HttpPlan {
  constructor(instance) {
    this.instance = instance;
  }

  async createPlan(plan) {
    try {
      const res = await this.instance.post('/plan', plan);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status !== 200) {
        return res;
      }
      throw new Error(`create plan error ${error}`);
    }
  }
}

export default new HttpPlan(instance);
