import { instance } from './http-instance';

class HttpSearch {
  constructor(instance) {
    this.instance = instance;
  }

  async searchArea(keyword) {
    try {
      const res = await this.instance.post('/search/area', keyword);
      return res;
    } catch (error) {
      const res = error.response;
      throw new Error(`search area error ${(res, error)}`);
    }
  }

  async searchUser(keyword) {
    try {
      const res = await this.instance.post('/search/nickname', keyword);
      return res;
    } catch (error) {
      const res = error.response;
      throw new Error(`search user error ${(res, error)}`);
    }
  }
}

export default new HttpSearch(instance);
