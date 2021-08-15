import { instance } from './http-instance';

class HttpSearch {
  constructor(instance) {
    this.instance = instance;
  }

  async searchStory(keyword) {
    try {
      const res = await this.instance.get(`/search/area/${keyword}`);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 404) {
        return res;
      }
      throw new Error(`search area error ${(res, error)}`);
    }
  }

  async searchUser(keyword) {
    try {
      const res = await this.instance.get(`/search/nickname/${keyword}`);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 404) {
        return res;
      }
      throw new Error(`search nickname error ${(res, error)}`);
    }
  }
}

export default new HttpSearch(instance);
