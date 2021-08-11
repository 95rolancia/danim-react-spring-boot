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
      throw new Error(`auth me error ${error}`);
    }
  }

  async getUserInfo(nickname) {
    try {
      const res = await this.instance.get(`/users/${nickname}`);
      return res;
    } catch (error) {
      const res = error.response;
      if (res.status === 404) {
        return res;
      }
      throw new Error(`getUserInfo ${error}`);
    }
  }

  async setInterestArea(area) {
    try {
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

  async updateAvatar(newAvatar) {
    try {
      const res = await this.instance.post('/account/avatar', newAvatar);
      return res;
    } catch (error) {
      throw new Error(`updateAvatar Error ${error.response}`);
    }
  }

  async updateUserInfo(newUserInfo) {
    try {
      const res = await this.instance.put('/account/info', newUserInfo);
      return res;
    } catch (error) {
      throw new Error(`updateUserInfo Error ${error.response}`);
    }
  }

  async follow(nickname) {
    try {
      const res = await this.instance.post('/follow', nickname);
      return res;
    } catch (error) {
      const res = error.response;
      console.log(res);
      if (res.status === 400) {
        return res;
      }
      throw new Error(`Follow Error ${error.response}`);
    }
  }

  async unfollow(nickname) {
    try {
      const res = await this.instance.delete('/follow', {
        data: {
          nickname: nickname.nickname,
        },
      });
      return res;
    } catch (error) {
      const res = error.response;
      console.log(res);
      if (res.status === 400) {
        return res;
      }
      throw new Error(`Follow Error ${error.response}`);
    }
  }
}

export default new HttpUser(instance);
