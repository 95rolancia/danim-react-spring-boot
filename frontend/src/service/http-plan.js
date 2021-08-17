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

  async getDetailPlan(planNo) {
    try {
      const res = await this.instance.get(`/plan/${planNo}`);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status !== 200) {
        return res;
      }
      throw new Error(`get detail plan error ${error}`);
    }
  }

  async updatePlan(newPlan, planNo) {
    try {
      const res = await this.instance.put(`/plan/${planNo}`, newPlan);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status !== 200) {
        return res;
      }
      throw new Error(`update plan error ${error}`);
    }
  }
  updatePlan;
}

export default new HttpPlan(instance);
