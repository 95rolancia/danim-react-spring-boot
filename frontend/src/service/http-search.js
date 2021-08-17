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

  async searchPlace(keyword) {
    try {
      const res = await this.instance.get(`/plan/place/${keyword}`);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 404) {
        return res;
      }
      throw new Error(`search place error ${(res, error)}`);
    }
  }

  async getPlaceInfo(keyword) {
    try {
      const res = await this.instance.get(`/plan/place/detail/${keyword}`);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 404) {
        return res;
      }
      throw new Error(`search place error ${(res, error)}`);
    }
  }
}

export default new HttpSearch(instance);
