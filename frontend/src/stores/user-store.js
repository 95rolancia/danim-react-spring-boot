import { makeAutoObservable, runInAction } from 'mobx';
import HttpUser from '../service/http-user';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getUser() {
    const res = await HttpUser.getUser();
    if (res.status !== 200) {
      return false;
    }
    runInAction(() => {
      this.user = { ...res.data };
    });
    return true;
  }

  async getUserInfo(nickname) {
    const res = await HttpUser.getUserInfo(nickname);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  }

  async setInterestArea(area) {
    const res = await HttpUser.setInterestArea(area);
    if (res.status !== 200) {
      return;
    }

    runInAction(() => {
      this.user = { ...this.user, areas: [...area.areas] };
    });
  }

  async updateUserInfo(newUserInfo) {
    const res = await HttpUser.updateUserInfo(newUserInfo);
    if (res.status !== 200) {
      return false;
    }
    await this.getUser();
    return true;
  }

  async updateAvatar(newAvatar) {
    const res = await HttpUser.updateAvatar(newAvatar);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  }

  async follow(nickname) {
    const res = await HttpUser.follow(nickname);
    if (res.status === 400 && res.data === 'follow user already exists') {
      return 'exist';
    }
    return true;
  }

  async unfollow(nickname) {
    const res = await HttpUser.unfollow(nickname);
    if (res.status === 400) {
      return 'exist';
    }
    return true;
  }
}

export default new UserStore();
