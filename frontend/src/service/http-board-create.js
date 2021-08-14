import { instance } from './http-instance';

class HttpBoardCreate {
  constructor(instance) {
    this.instance = instance;
  }

  async setStoryPhoto(file) {
    try {
      const res = await this.instance.post('/story/upload', file)
      return res;
    } catch (error) {
      const res = error.response;
      console.log(res)
      if (res.status === 401) {
        return res;
      }
      throw new Error(`set Stroy Photo error ${error}`);
    }
  }
  
}

export default new HttpBoardCreate(instance)